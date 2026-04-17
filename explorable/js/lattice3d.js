import { palette } from './common.js';

/*
 * lattice3d.js — minimal 3D scene renderer for lattice visualisations.
 *
 * Pure 2D canvas: no WebGL, no external deps. Handles:
 *   - camera rotation via mouse/touch drag (yaw + pitch)
 *   - perspective projection onto 2D screen
 *   - depth sorting of atoms and bonds (painter's algorithm)
 *   - rendering atoms as circles (depth-faded) and bonds as line segments
 *
 * The scene is defined by:
 *   - `atoms`:  [{ pos: [x,y,z], color, radius, label? }]
 *   - `bonds`:  [{ a: atomIndex, b: atomIndex, color, width? }]
 *
 * Call `renderScene(ctx, W, H, scene, camera)` on every frame.
 * Call `attachCameraControls(canvas, camera)` once to wire up drag-to-rotate.
 *
 * Diamond-lattice helpers included:
 *   - `diamondAtoms(nCells, a)` generates a cubic region of diamond lattice
 *   - `diamondBonds(atoms, a)` returns the nearest-neighbour bond list
 */

// ---------------------------------------------------------------------
// Vector / matrix helpers — minimal, local, no generic 3D library.
// ---------------------------------------------------------------------

function vec3(x, y, z) { return [x, y, z]; }

function rotateVec(v, yaw, pitch) {
  // First yaw about world-Y, then pitch about world-X.
  const [x, y, z] = v;
  const cy = Math.cos(yaw),  sy = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  // Yaw around Y: (x, y, z) -> (cy*x + sy*z, y, -sy*x + cy*z)
  const x1 = cy * x + sy * z;
  const y1 = y;
  const z1 = -sy * x + cy * z;
  // Pitch around X: (x, y, z) -> (x, cp*y - sp*z, sp*y + cp*z)
  const x2 = x1;
  const y2 = cp * y1 - sp * z1;
  const z2 = sp * y1 + cp * z1;
  return [x2, y2, z2];
}

// Perspective project a camera-space point (xC, yC, zC) to screen (px, py).
// Camera looks down -Z; screen center is at (cx, cy), offset by (panX, panY).
// Focal length f controls field of view; zNear clips points too close to eye.
function project(p, camDist, f, cx, cy, panX = 0, panY = 0) {
  const z = p[2] + camDist;  // distance from eye to point along view axis
  if (z < 0.01) return null;  // behind eye → cull
  return [cx + panX + f * p[0] / z, cy + panY + f * p[1] / z, z];
}

// ---------------------------------------------------------------------
// Camera — orbit around world origin
// ---------------------------------------------------------------------

export function makeCamera({ yaw = 0.5, pitch = -0.4, distance = 7, focalLength = 520, panX = 0, panY = 0 } = {}) {
  return { yaw, pitch, distance, focalLength, panX, panY };
}

// Attach drag-to-rotate + shift-drag-to-pan + wheel-to-zoom (mouse +
// touch). Returns a cleanup function.
export function attachCameraControls(canvas, camera, {
  sensitivity = 0.005,
  panSpeed = 1.0,
  zoomSpeed = 0.15,
  minDist = 2,
  maxDist = 60,
} = {}) {
  let dragging = false;
  let panning = false;
  let lastX = 0, lastY = 0;

  function down(e) {
    dragging = true;
    panning = !!(e.shiftKey);
    lastX = (e.touches ? e.touches[0].clientX : e.clientX);
    lastY = (e.touches ? e.touches[0].clientY : e.clientY);
    canvas.style.cursor = panning ? 'move' : 'grabbing';
    e.preventDefault();
  }
  function move(e) {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const y = (e.touches ? e.touches[0].clientY : e.clientY);
    const dx = x - lastX, dy = y - lastY;
    if (panning || e.shiftKey) {
      camera.panX += dx * panSpeed;
      camera.panY += dy * panSpeed;
    } else {
      camera.yaw   += dx * sensitivity;
      camera.pitch += dy * sensitivity;
      camera.pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, camera.pitch));
    }
    lastX = x; lastY = y;
    e.preventDefault();
  }
  function up() {
    dragging = false;
    panning = false;
    canvas.style.cursor = 'grab';
  }
  function wheel(e) {
    const k = Math.exp(e.deltaY * 0.001 * (zoomSpeed / 0.15));
    camera.distance = Math.max(minDist, Math.min(maxDist, camera.distance * k));
    e.preventDefault();
  }

  canvas.addEventListener('mousedown', down);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
  canvas.addEventListener('touchstart', down, { passive: false });
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', up);
  canvas.addEventListener('wheel', wheel, { passive: false });

  canvas.style.cursor = 'grab';

  return () => {
    canvas.removeEventListener('mousedown', down);
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
    canvas.removeEventListener('touchstart', down);
    window.removeEventListener('touchmove', move);
    window.removeEventListener('touchend', up);
    canvas.removeEventListener('wheel', wheel);
  };
}

// ---------------------------------------------------------------------
// Scene rendering
// ---------------------------------------------------------------------

export function renderScene(ctx, W, H, scene, camera) {
  const cx = W / 2;
  const cy = H / 2;
  const { yaw, pitch, distance, focalLength, panX = 0, panY = 0 } = camera;

  // Transform atoms to camera space, project, and pack with depth.
  const atoms = scene.atoms;
  const n = atoms.length;
  const proj = new Array(n);
  for (let i = 0; i < n; i++) {
    const cam = rotateVec(atoms[i].pos, yaw, pitch);
    const p = project(cam, distance, focalLength, cx, cy, panX, panY);
    proj[i] = p === null ? null : { x: p[0], y: p[1], z: p[2], cam };
  }

  // Build a combined list of draw items (atoms and bonds), each tagged with
  // a sortable depth. Then sort far→near and render.
  const items = [];

  // Bonds
  if (scene.bonds) {
    for (const b of scene.bonds) {
      const pa = proj[b.a], pb = proj[b.b];
      if (!pa || !pb) continue;
      items.push({
        kind: 'bond',
        depth: (pa.z + pb.z) / 2,
        pa, pb,
        color: b.color || palette.bondDefault,
        width: b.width || 1,
      });
    }
  }

  // Atoms
  for (let i = 0; i < n; i++) {
    const p = proj[i];
    if (!p) continue;
    const a = atoms[i];
    items.push({
      kind: 'atom',
      depth: p.z,
      p,
      color: a.color || palette.textFaint,
      baseRadius: a.radius || 0.18,
      label: a.label,
      strokeColor: a.strokeColor,
    });
  }

  // Painter's algorithm: draw furthest first.
  items.sort((a, b) => b.depth - a.depth);

  // Compute depth range across all visible items for consistent fog/outline scaling.
  let zMin = Infinity, zMax = -Infinity;
  for (const it of items) {
    const z = it.depth;
    if (z < zMin) zMin = z;
    if (z > zMax) zMax = z;
  }
  const zRange = Math.max(0.001, zMax - zMin);
  // "closeness" maps zMin → 1 (closest), zMax → 0 (farthest).
  const closenessOf = (z) => 1 - (z - zMin) / zRange;

  for (const it of items) {
    const close = closenessOf(it.depth);  // 0 (far) … 1 (close)

    if (it.kind === 'bond') {
      // Far bonds fade toward the background so they don't muddy the foreground.
      const alpha = 0.22 + 0.55 * close;
      const m = it.color.match(/rgba?\(([^)]+)\)/);
      if (m) {
        const parts = m[1].split(',').map(s => s.trim());
        ctx.strokeStyle = `rgba(${parts[0]},${parts[1]},${parts[2]},${alpha.toFixed(2)})`;
      } else {
        ctx.strokeStyle = it.color;
        ctx.globalAlpha = alpha;
      }
      ctx.lineWidth = it.width * (0.7 + 0.6 * close);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(it.pa.x, it.pa.y);
      ctx.lineTo(it.pb.x, it.pb.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      // Atom radius scales with perspective (closer = bigger).
      const r = (it.baseRadius * camera.focalLength) / Math.max(0.5, it.p.z);
      // Foreground atoms at full saturation; background atoms fog toward
      // the panel background so the near/far cue is strong even when
      // the lattice is monochromatic (non-bipartite cases).
      const fog = 0.3 + 0.7 * close;
      ctx.globalAlpha = fog;
      ctx.fillStyle = it.color;
      ctx.beginPath();
      ctx.arc(it.p.x, it.p.y, r, 0, 2 * Math.PI);
      ctx.fill();
      if (it.strokeColor) {
        // Outline width and darkness scale with closeness — the single
        // biggest readability gain on grey lattices.
        ctx.globalAlpha = 0.35 + 0.65 * close;
        ctx.strokeStyle = it.strokeColor;
        ctx.lineWidth = 0.5 + 3.0 * Math.pow(close, 1.5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (it.label) {
        ctx.save();
        ctx.globalAlpha = 0.35 + 0.5 * close;
        ctx.fillStyle = palette.text;
        ctx.font = '9px "SF Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(it.label, it.p.x, it.p.y);
        ctx.restore();
      }
    }
  }
}

// ---------------------------------------------------------------------
// Diamond lattice generator
// ---------------------------------------------------------------------

// The diamond lattice has two interpenetrating FCC sublattices:
//   A-sublattice sites: (0,0,0) + FCC basis, per conventional unit cell of side a
//   B-sublattice sites: A positions + (a/4, a/4, a/4)
//
// Conventional cell FCC basis (in units of a):
//   (0, 0, 0), (1/2, 1/2, 0), (1/2, 0, 1/2), (0, 1/2, 1/2)
//
// Each atom has 4 nearest neighbours on the OTHER sublattice at distance a·√3/4,
// along the directions (1,1,1)/4, (1,-1,-1)/4, (-1,1,-1)/4, (-1,-1,1)/4.
export function diamondAtoms({ nCells = 2, a = 1, centered = true }) {
  const fccBasis = [
    [0,    0,    0   ],
    [0.5,  0.5,  0   ],
    [0.5,  0,    0.5 ],
    [0,    0.5,  0.5 ],
  ];
  const sublatticeOffset = [0.25, 0.25, 0.25];
  const atoms = [];
  const shift = centered ? -(nCells - 1) / 2 : 0;

  for (let ix = 0; ix < nCells; ix++) {
    for (let iy = 0; iy < nCells; iy++) {
      for (let iz = 0; iz < nCells; iz++) {
        for (const b of fccBasis) {
          const x0 = a * (ix + b[0] + shift);
          const y0 = a * (iy + b[1] + shift);
          const z0 = a * (iz + b[2] + shift);
          atoms.push({ pos: [x0, y0, z0], sublattice: 'A', cell: [ix, iy, iz] });
          atoms.push({
            pos: [x0 + a * sublatticeOffset[0],
                  y0 + a * sublatticeOffset[1],
                  z0 + a * sublatticeOffset[2]],
            sublattice: 'B',
            cell: [ix, iy, iz],
          });
        }
      }
    }
  }
  return atoms;
}

export function diamondBonds(atoms, { a = 1, tolerance = 0.05 } = {}) {
  const targetDist = a * Math.sqrt(3) / 4;
  const bonds = [];
  const n = atoms.length;
  // O(n²) is fine for ≲ 200 atoms — a cube of 3×3×3 conventional cells has 216.
  for (let i = 0; i < n; i++) {
    if (atoms[i].sublattice !== 'A') continue;  // only emit A → B bonds
    for (let j = 0; j < n; j++) {
      if (atoms[j].sublattice !== 'B') continue;
      const dx = atoms[i].pos[0] - atoms[j].pos[0];
      const dy = atoms[i].pos[1] - atoms[j].pos[1];
      const dz = atoms[i].pos[2] - atoms[j].pos[2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (Math.abs(d - targetDist) < tolerance) {
        bonds.push({ a: i, b: j });
      }
    }
  }
  return bonds;
}

// ---------------------------------------------------------------------
// Generic bond-finder: all pairs within |d − target| < tolerance.
// ---------------------------------------------------------------------

export function bondsByDistance(atoms, target, tolerance = 0.05) {
  const bonds = [];
  const n = atoms.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = atoms[i].pos[0] - atoms[j].pos[0];
      const dy = atoms[i].pos[1] - atoms[j].pos[1];
      const dz = atoms[i].pos[2] - atoms[j].pos[2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (Math.abs(d - target) < tolerance) bonds.push({ a: i, b: j });
    }
  }
  return bonds;
}

// ---------------------------------------------------------------------
// Candidate lattice generators for the §8 filter figure.
// Each returns { atoms, bonds, bondLength }.
// ---------------------------------------------------------------------

// Simple cubic. z=6, bipartite (by parity), 1 site / primitive cell.
export function simpleCubicLattice({ nCells = 3, a = 1, centered = true } = {}) {
  const atoms = [];
  const shift = centered ? -(nCells - 1) / 2 : 0;
  for (let x = 0; x < nCells; x++) {
    for (let y = 0; y < nCells; y++) {
      for (let z = 0; z < nCells; z++) {
        const parity = (x + y + z) % 2;
        atoms.push({
          pos: [a * (x + shift), a * (y + shift), a * (z + shift)],
          sublattice: parity === 0 ? 'A' : 'B',
        });
      }
    }
  }
  const bonds = bondsByDistance(atoms, a, 0.01);
  return { atoms, bonds, bondLength: a };
}

// Body-centred cubic. Corner atoms + body centres. Not bipartite at full NN.
export function bccLattice({ nCells = 2, a = 1, centered = true } = {}) {
  const atoms = [];
  const shift = centered ? -nCells / 2 : 0;
  // Corners (include closing row)
  for (let x = 0; x <= nCells; x++) {
    for (let y = 0; y <= nCells; y++) {
      for (let z = 0; z <= nCells; z++) {
        atoms.push({
          pos: [a * (x + shift), a * (y + shift), a * (z + shift)],
          sublattice: 'corner',
        });
      }
    }
  }
  // Body centres
  for (let x = 0; x < nCells; x++) {
    for (let y = 0; y < nCells; y++) {
      for (let z = 0; z < nCells; z++) {
        atoms.push({
          pos: [a * (x + shift + 0.5), a * (y + shift + 0.5), a * (z + shift + 0.5)],
          sublattice: 'body',
        });
      }
    }
  }
  const bondLength = a * Math.sqrt(3) / 2;
  const bonds = bondsByDistance(atoms, bondLength, 0.02);
  return { atoms, bonds, bondLength };
}

// Face-centred cubic.  z=12, not bipartite (triangular plaquettes).
export function fccLattice({ nCells = 2, a = 1, centered = true } = {}) {
  const basis = [
    [0, 0, 0], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5],
  ];
  const atoms = [];
  const shift = centered ? -(nCells) / 2 : 0;
  for (let ix = 0; ix <= nCells; ix++) {
    for (let iy = 0; iy <= nCells; iy++) {
      for (let iz = 0; iz <= nCells; iz++) {
        for (const b of basis) {
          const x = ix + shift + b[0];
          const y = iy + shift + b[1];
          const z = iz + shift + b[2];
          if (x > nCells / 2 + 0.01 || y > nCells / 2 + 0.01 || z > nCells / 2 + 0.01) continue;
          atoms.push({ pos: [a * x, a * y, a * z], sublattice: 'A' });
        }
      }
    }
  }
  const bondLength = a * Math.sqrt(2) / 2;
  const bonds = bondsByDistance(atoms, bondLength, 0.02);
  return { atoms, bonds, bondLength };
}

// Hexagonal close-packed. Two triangular layers with ABAB stacking.
export function hcpLattice({ radius = 2, a = 1, c = null } = {}) {
  if (c === null) c = a * Math.sqrt(8 / 3);
  const atoms = [];
  // Two layers (A and B), stacked.
  for (const kz of [-1, 0, 1]) {
    // triangular-lattice sites i*a1 + j*a2 with a1=(1,0), a2=(1/2, sqrt(3)/2)
    for (let i = -radius - 1; i <= radius + 1; i++) {
      for (let j = -radius - 1; j <= radius + 1; j++) {
        // A-layer
        let px = a * (i + 0.5 * j);
        let py = a * j * Math.sqrt(3) / 2;
        let pz = kz * c;
        if (Math.hypot(px, py) > (radius + 0.2) * a) {
          // cull
        } else {
          atoms.push({ pos: [px, py, pz - 0.5 * c], sublattice: 'A' });
        }
        // B-layer shifted by (1/2, sqrt(3)/6), at z = c/2 above A
        const bx = px + a * 0.5;
        const by = py + a * Math.sqrt(3) / 6;
        const bz = kz * c;
        if (Math.hypot(bx, by) > (radius + 0.2) * a) continue;
        atoms.push({ pos: [bx, by, bz], sublattice: 'B' });
      }
    }
  }
  const bondLength = a;
  const bonds = bondsByDistance(atoms, bondLength, 0.02);
  return { atoms, bonds, bondLength };
}

// 2D square lattice.
export function squareLattice({ radius = 3, a = 1 } = {}) {
  const atoms = [];
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      const parity = ((x % 2) + 2 + (y % 2)) % 2;
      atoms.push({
        pos: [a * x, a * y, 0],
        sublattice: parity === 0 ? 'A' : 'B',
      });
    }
  }
  const bonds = bondsByDistance(atoms, a, 0.02);
  return { atoms, bonds, bondLength: a };
}

// 2D honeycomb (graphene structure). Bipartite with two triangular sublattices.
export function honeycombLattice({ radius = 3, a = 1 } = {}) {
  // Primitive vectors a1, a2 for the bipartite hexagonal lattice:
  //   a1 = (sqrt(3), 0),  a2 = (sqrt(3)/2, 3/2)
  // Basis A at (0, 0), B at (0, 1), with a = bond length = 1 (scaled).
  const s3 = Math.sqrt(3);
  const a1 = [a * s3,       0,       0];
  const a2 = [a * s3 / 2,   1.5 * a, 0];
  const bA = [0, 0, 0];
  const bB = [0, a, 0];
  const atoms = [];
  const maxR = radius * a * 2;
  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      const ox = i * a1[0] + j * a2[0];
      const oy = i * a1[1] + j * a2[1];
      const ax = ox + bA[0], ay = oy + bA[1];
      const bx = ox + bB[0], by = oy + bB[1];
      if (Math.hypot(ax, ay) < maxR) atoms.push({ pos: [ax, ay, 0], sublattice: 'A' });
      if (Math.hypot(bx, by) < maxR) atoms.push({ pos: [bx, by, 0], sublattice: 'B' });
    }
  }
  const bonds = bondsByDistance(atoms, a, 0.02);
  return { atoms, bonds, bondLength: a };
}

// Full diamond lattice as { atoms, bonds, bondLength } — same signature as above.
export function diamondLattice({ nCells = 2, a = 1, centered = true } = {}) {
  const atoms = diamondAtoms({ nCells, a, centered });
  const bonds = diamondBonds(atoms, { a });
  return { atoms, bonds, bondLength: a * Math.sqrt(3) / 4 };
}

// ---------------------------------------------------------------------
// Camera helper: orient camera to look down a given world-space axis.
// ---------------------------------------------------------------------

export function orientCameraAlongAxis(camera, axis) {
  const n = Math.hypot(axis[0], axis[1], axis[2]);
  if (n < 1e-10) return;
  const ax = axis[0] / n, ay = axis[1] / n, az = axis[2] / n;
  // Choose yaw so that the rotated axis has x-component zero:
  //   x_after_yaw = cos(yaw)*ax + sin(yaw)*az
  //   set to 0  → yaw = atan2(-ax, az)
  const yaw = Math.atan2(-ax, az);
  // After yaw, the axis has components (0, ay, -sin(yaw)*ax + cos(yaw)*az).
  const zAfterYaw = -Math.sin(yaw) * ax + Math.cos(yaw) * az;
  // Choose pitch so that the y-component becomes zero:
  //   y_after_pitch = cos(pitch)*ay - sin(pitch)*zAfterYaw
  //   set to 0  → pitch = atan2(ay, zAfterYaw)
  const pitch = Math.atan2(ay, zAfterYaw);
  camera.yaw = yaw;
  camera.pitch = pitch;
}

// Find the atom closest to the origin, plus all its bonded neighbours.
// Useful for "isolate a single coordination shell" views.
export function centralTetrahedron(scene) {
  let centerIdx = 0, centerDist = Infinity;
  for (let i = 0; i < scene.atoms.length; i++) {
    const p = scene.atoms[i].pos;
    const d = p[0] * p[0] + p[1] * p[1] + p[2] * p[2];
    if (d < centerDist) { centerDist = d; centerIdx = i; }
  }
  const neighbours = new Set([centerIdx]);
  for (const b of scene.bonds) {
    if (b.a === centerIdx) neighbours.add(b.b);
    if (b.b === centerIdx) neighbours.add(b.a);
  }
  return { centerIdx, neighbours };
}

// One-stop dispatcher used by the §8 filter figure. Returns a scene
// suitable for renderScene() — atoms carry a color per sublattice.
export function buildLatticeScene(kind, {
  colorA = '#d97236',   // orange for sublattice A
  colorB = '#2a5f8f',   // blue for sublattice B
  colorNonBipartite = '#a8a39a',  // muted grey when bipartite colouring would mislead
  strokeA = '#7a4220',
  strokeB = '#1a3c5c',
} = {}) {
  let lat;
  let isBipartite = false;
  switch (kind) {
    case 'sc':        lat = simpleCubicLattice({ nCells: 3, a: 1 });     isBipartite = true;  break;
    case 'bcc':       lat = bccLattice({ nCells: 2, a: 1 });              isBipartite = false; break;
    case 'fcc':       lat = fccLattice({ nCells: 2, a: 1 });              isBipartite = false; break;
    case 'hcp':       lat = hcpLattice({ radius: 1.5, a: 1 });            isBipartite = false; break;
    case 'diamond':   lat = diamondLattice({ nCells: 2, a: 1 });          isBipartite = true;  break;
    case 'honeycomb': lat = honeycombLattice({ radius: 2, a: 1 });        isBipartite = true;  break;
    case 'square':    lat = squareLattice({ radius: 2, a: 1 });           isBipartite = true;  break;
    default: throw new Error('Unknown lattice: ' + kind);
  }

  // Normalise every lattice to nearest-neighbour distance = 1, so the
  // 3D viewer doesn't show a packed-looking diamond next to a spread-out
  // FCC purely because of unit-cell conventions.
  const scale = 1 / lat.bondLength;
  for (const at of lat.atoms) {
    at.pos[0] *= scale;
    at.pos[1] *= scale;
    at.pos[2] *= scale;
  }

  // Centre the lattice at the origin by subtracting the centroid. The
  // per-lattice `centered` flag aligns cell indices but doesn't account
  // for the basis offsets (e.g. FCC basis centroid is (0.25, 0.25, 0.25)
  // within each cell), so the centroid isn't at the origin without this.
  let cmx = 0, cmy = 0, cmz = 0;
  for (const at of lat.atoms) {
    cmx += at.pos[0]; cmy += at.pos[1]; cmz += at.pos[2];
  }
  cmx /= lat.atoms.length; cmy /= lat.atoms.length; cmz /= lat.atoms.length;
  for (const at of lat.atoms) {
    at.pos[0] -= cmx; at.pos[1] -= cmy; at.pos[2] -= cmz;
  }

  // Apply colouring and compute extent for camera auto-fit.
  let extent = 0;
  for (const at of lat.atoms) {
    const r = Math.max(Math.abs(at.pos[0]), Math.abs(at.pos[1]), Math.abs(at.pos[2]));
    if (r > extent) extent = r;
    if (isBipartite && at.sublattice === 'A') {
      at.color = colorA; at.strokeColor = strokeA; at.radius = 0.2;
    } else if (isBipartite && at.sublattice === 'B') {
      at.color = colorB; at.strokeColor = strokeB; at.radius = 0.2;
    } else {
      at.color = colorNonBipartite; at.strokeColor = palette.text; at.radius = 0.2;
    }
  }

  return {
    atoms: lat.atoms,
    bonds: lat.bonds.map(b => ({ ...b, color: palette.bondFaint, width: 1.3 })),
    bondLength: 1,
    extent,
    isBipartite,
  };
}
