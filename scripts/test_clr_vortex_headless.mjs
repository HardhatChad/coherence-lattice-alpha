// Standalone CLR vortex simulation test.
//
// Replicates the browser dynamics, but also tests the PAPER's protocol:
// co-evolutionary Kuramoto phases + CLR (Shannon + Fiedler).
//
// Goal: determine why the browser simulation shows only ~3 dead bonds
// (vs the paper's ~68% of core bonds dead) and figure out what kind of
// dynamics we need to reproduce a visually compelling electron.
//
// Usage: node scripts/test_clr_vortex_headless.mjs

import {
  diamondLattice,
} from '../explorable/js/lattice3d.js';
import { computeFiedler } from '../explorable/js/fiedler.js';

// =====================================================================
// Build lattice
// =====================================================================

function buildVortexLattice(nCells) {
  const lat = diamondLattice({ nCells, a: 1, centered: true });
  const scale = 1 / lat.bondLength;
  let cmx = 0, cmy = 0, cmz = 0;
  for (const at of lat.atoms) {
    at.pos[0] *= scale; at.pos[1] *= scale; at.pos[2] *= scale;
  }
  for (const at of lat.atoms) {
    cmx += at.pos[0]; cmy += at.pos[1]; cmz += at.pos[2];
  }
  cmx /= lat.atoms.length; cmy /= lat.atoms.length; cmz /= lat.atoms.length;
  for (const at of lat.atoms) {
    at.pos[0] -= cmx; at.pos[1] -= cmy; at.pos[2] -= cmz;
  }
  for (const at of lat.atoms) {
    at.theta0 = Math.atan2(at.pos[1], at.pos[0]);
  }
  let extent = 0;
  for (const at of lat.atoms) {
    const r = Math.max(Math.abs(at.pos[0]), Math.abs(at.pos[1]), Math.abs(at.pos[2]));
    if (r > extent) extent = r;
  }
  return { atoms: lat.atoms, bonds: lat.bonds, extent };
}

// =====================================================================
// Run a simulation with given parameters
// =====================================================================

function runSimulation({
  nCells,
  K_init,
  lambda,
  dt,
  nSteps,
  fiedlerBoost,
  fiedlerEvery,
  useKuramoto,     // if true, phases evolve under Kuramoto too
  omega,           // intrinsic frequency (only used if useKuramoto)
  label,
}) {
  const lat = buildVortexLattice(nCells);
  const N = lat.atoms.length;
  const bonds = lat.bonds;
  const numB = bonds.length;

  // State
  const theta = new Float32Array(N);
  const KS = new Float32Array(numB);
  const KF = new Float32Array(numB);
  let vF = new Float32Array(N);
  let fiedlerCooldown = 0;

  for (let i = 0; i < N; i++) theta[i] = lat.atoms[i].theta0;
  for (let b = 0; b < numB; b++) { KS[b] = K_init; KF[b] = K_init; }

  function wrapPi(x) {
    return ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
  }

  function applyL_KF(v, out) {
    for (let i = 0; i < N; i++) out[i] = 0;
    for (let b = 0; b < numB; b++) {
      const i = bonds[b].a, j = bonds[b].b, w = Math.max(0, KF[b]);
      out[i] += w * (v[i] - v[j]);
      out[j] += w * (v[j] - v[i]);
    }
  }

  // Track radial distance of each bond midpoint from z-axis (for spatial stats)
  const bondR = bonds.map(b => {
    const a = lat.atoms[b.a].pos, bb = lat.atoms[b.b].pos;
    return Math.hypot((a[0] + bb[0]) / 2, (a[1] + bb[1]) / 2);
  });

  function step() {
    // Optional: evolve phases via Kuramoto using the Shannon-side K field
    //   (we pick KS here since it's closer to "pure Shannon response")
    if (useKuramoto) {
      const dth = new Float32Array(N);
      for (let b = 0; b < numB; b++) {
        const i = bonds[b].a, j = bonds[b].b;
        const s = Math.sin(theta[j] - theta[i]);
        const w = (KS[b] + KF[b]) / 2;
        dth[i] += w * s;
        dth[j] -= w * s;
      }
      for (let i = 0; i < N; i++) theta[i] += dt * (omega + dth[i]);
    }

    // Evolve K fields
    for (let b = 0; b < numB; b++) {
      const c = Math.cos(wrapPi(theta[bonds[b].b] - theta[bonds[b].a]));
      KS[b] += dt * (c - lambda * KS[b]);
      if (KS[b] < 0) KS[b] = 0;
      KF[b] += dt * (c - lambda * KF[b]);
    }

    if (fiedlerCooldown <= 0) {
      try {
        const res = computeFiedler({ applyL: applyL_KF, N, m: 24, seed: 7 });
        if (res && res.v_2) vF = res.v_2;
      } catch (e) { }
      fiedlerCooldown = fiedlerEvery;
    }
    fiedlerCooldown--;

    for (let b = 0; b < numB; b++) {
      const i = bonds[b].a, j = bonds[b].b;
      const d = vF[i] - vF[j];
      KF[b] += dt * fiedlerBoost * d * d;
      if (KF[b] < 0) KF[b] = 0;
    }
  }

  for (let s = 0; s < nSteps; s++) step();

  // Analyze results
  let nDeadS = 0, nDeadF = 0;
  for (let b = 0; b < numB; b++) {
    if (KS[b] < 0.15) nDeadS++;
    if (KF[b] < 0.15) nDeadF++;
  }

  // Dead bond distribution by radial distance
  const bins = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 100];
  const spS = bins.slice(0, -1).map(() => ({ t: 0, d: 0 }));
  const spF = bins.slice(0, -1).map(() => ({ t: 0, d: 0 }));
  for (let b = 0; b < numB; b++) {
    let bin = 0;
    for (let i = 0; i < bins.length - 1; i++) {
      if (bondR[b] >= bins[i] && bondR[b] < bins[i + 1]) { bin = i; break; }
    }
    spS[bin].t++; if (KS[b] < 0.15) spS[bin].d++;
    spF[bin].t++; if (KF[b] < 0.15) spF[bin].d++;
  }

  console.log(`\n${'='.repeat(70)}`);
  console.log(`  ${label}`);
  console.log(`  nCells=${nCells}, K_init=${K_init}, lambda=${lambda}, useKuramoto=${useKuramoto}`);
  console.log(`  ${nSteps} steps at dt=${dt} (sim t=${(nSteps*dt).toFixed(1)})`);
  console.log(`${'='.repeat(70)}`);
  console.log(`  Atoms: ${N}  Bonds: ${numB}`);
  console.log(`  Shannon only:      ${nDeadS} dead (${(100*nDeadS/numB).toFixed(0)}%)`);
  console.log(`  Shannon + Fiedler: ${nDeadF} dead (${(100*nDeadF/numB).toFixed(0)}%)`);
  console.log(`  Fiedler rescued: ${nDeadS - nDeadF} bonds`);

  console.log('\n  Radial breakdown of dead bonds:');
  console.log('   r-bin                    Shannon        Fiedler');
  for (let i = 0; i < spS.length; i++) {
    const lo = bins[i], hi = bins[i + 1];
    const label = hi === 100 ? `r >= ${lo}`.padEnd(24) : `[${lo.toFixed(1)}, ${hi.toFixed(1)})`.padEnd(24);
    const pctS = spS[i].t ? (100 * spS[i].d / spS[i].t).toFixed(0) + '%' : '-';
    const pctF = spF[i].t ? (100 * spF[i].d / spF[i].t).toFixed(0) + '%' : '-';
    console.log(`   ${label} ${String(spS[i].d).padStart(3)}/${String(spS[i].t).padStart(3)} (${pctS.padStart(4)}) ${String(spF[i].d).padStart(3)}/${String(spF[i].t).padStart(3)} (${pctF.padStart(4)})`);
  }
  return { nDeadS, nDeadF, N, numB };
}

// =====================================================================
// Experiments
// =====================================================================

console.log('\n\n### SERIES 1: Current browser config (nCells=3, static phases, K_init=1.5) ###');
runSimulation({
  nCells: 3, K_init: 1.5, lambda: 0.35, dt: 0.12,
  nSteps: 400, fiedlerBoost: 1.4, fiedlerEvery: 8,
  useKuramoto: false, omega: 0,
  label: 'Current browser config',
});

console.log('\n\n### SERIES 2: Larger lattice (nCells=4, static phases) ###');
runSimulation({
  nCells: 4, K_init: 1.5, lambda: 0.35, dt: 0.12,
  nSteps: 400, fiedlerBoost: 1.4, fiedlerEvery: 8,
  useKuramoto: false, omega: 0,
  label: 'nCells=4, static phases',
});

console.log('\n\n### SERIES 3: nCells=5, static phases ###');
runSimulation({
  nCells: 5, K_init: 1.5, lambda: 0.35, dt: 0.12,
  nSteps: 400, fiedlerBoost: 1.4, fiedlerEvery: 8,
  useKuramoto: false, omega: 0,
  label: 'nCells=5, static phases',
});

console.log('\n\n### SERIES 4: nCells=3, with Kuramoto co-evolution (weak initial K, ω=0) ###');
runSimulation({
  nCells: 3, K_init: 0.1, lambda: 0.35, dt: 0.12,
  nSteps: 600, fiedlerBoost: 1.4, fiedlerEvery: 8,
  useKuramoto: true, omega: 0,
  label: 'nCells=3, Kuramoto co-evolution, weak K_init',
});

console.log('\n\n### SERIES 5: nCells=4, with Kuramoto co-evolution ###');
runSimulation({
  nCells: 4, K_init: 0.1, lambda: 0.35, dt: 0.12,
  nSteps: 600, fiedlerBoost: 1.4, fiedlerEvery: 8,
  useKuramoto: true, omega: 0,
  label: 'nCells=4, Kuramoto co-evolution, weak K_init',
});

console.log('\n\n### SERIES 6: stronger Fiedler boost on co-evolution nCells=4 ###');
runSimulation({
  nCells: 4, K_init: 0.1, lambda: 0.35, dt: 0.12,
  nSteps: 600, fiedlerBoost: 5.0, fiedlerEvery: 8,
  useKuramoto: true, omega: 0,
  label: 'nCells=4, Kuramoto, fiedlerBoost=5.0',
});

console.log('\n\nDone.\n');
