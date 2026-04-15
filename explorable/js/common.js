/* Shared utilities for the Coherence Lattice explorable. */

// --- Modified Bessel functions I_0 and I_1 (series + asymptotic) ---

export function bessel_I0(x) {
  const ax = Math.abs(x);
  if (ax < 3.75) {
    const t = (x / 3.75) ** 2;
    return 1.0 + t * (3.5156229 + t * (3.0899424 + t * (1.2067492 +
           t * (0.2659732 + t * (0.0360768 + t * 0.0045813)))));
  }
  const t = 3.75 / ax;
  const poly = 0.39894228 + t * (0.01328592 + t * (0.00225319 +
               t * (-0.00157565 + t * (0.00916281 + t * (-0.02057706 +
               t * (0.02635537 + t * (-0.01647633 + t * 0.00392377)))))));
  return (Math.exp(ax) / Math.sqrt(ax)) * poly;
}

export function bessel_I1(x) {
  const ax = Math.abs(x);
  if (ax < 3.75) {
    const t = (x / 3.75) ** 2;
    const poly = 0.5 + t * (0.87890594 + t * (0.51498869 + t * (0.15084934 +
                 t * (0.02658733 + t * (0.00301532 + t * 0.00032411)))));
    return x * poly;
  }
  const t = 3.75 / ax;
  let poly = 0.39894228 + t * (-0.03988024 + t * (-0.00362018 +
             t * (0.00163801 + t * (-0.01031555 + t * (0.02282967 +
             t * (-0.02895312 + t * (0.01787654 + t * (-0.00420059))))))));
  poly = (Math.exp(ax) / Math.sqrt(ax)) * poly;
  return x < 0 ? -poly : poly;
}

// R_0(K) = I_1(K) / I_0(K) — the von Mises order parameter
export function R0(K) {
  if (K < 1e-10) return K / 2;
  return bessel_I1(K) / bessel_I0(K);
}

// --- Core constants ---

export const K_BKT = 2 / Math.PI;
export const K_BULK = 16 / (Math.PI * Math.PI);

// --- Alpha formula (self-consistent, 20 iterations) ---

export function alpha_BKT(z = 4, K = K_BKT) {
  const V = R0(K) ** z;
  const base = Math.PI / z;
  let a = V;
  for (let i = 0; i < 20; i++) {
    const n = 1 / Math.sqrt(Math.E) + a / (2 * Math.PI);
    a = V * Math.pow(base, n);
  }
  return a;
}

// --- Tunable inline values (draggable numbers) ---

export function makeTunable(el, { min, max, step, value, format, onChange }) {
  let v = value ?? parseFloat(el.textContent);
  const fmt = format ?? ((x) => x.toFixed(2));
  el.textContent = fmt(v);
  el.classList.add('tune');

  let dragging = false;
  let startX = 0;
  let startV = 0;

  const range = max - min;
  const pixelsPerUnit = 200 / range;

  function start(e) {
    dragging = true;
    el.classList.add('active');
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startV = v;
    e.preventDefault();
  }
  function move(e) {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const dx = x - startX;
    let nv = startV + dx / pixelsPerUnit;
    nv = Math.round(nv / step) * step;
    nv = Math.max(min, Math.min(max, nv));
    if (nv !== v) {
      v = nv;
      el.textContent = fmt(v);
      if (onChange) onChange(v);
    }
    e.preventDefault();
  }
  function end() {
    dragging = false;
    el.classList.remove('active');
  }

  el.addEventListener('mousedown', start);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  el.addEventListener('touchstart', start, { passive: false });
  window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('touchend', end);

  return {
    get value() { return v; },
    set value(nv) {
      v = Math.max(min, Math.min(max, nv));
      el.textContent = fmt(v);
      if (onChange) onChange(v);
    },
  };
}

// --- Slider control (boxed, labeled) ---

export function makeSlider(container, { label, min, max, step, value, format, onChange }) {
  const fmt = format ?? ((x) => x.toFixed(2));
  const ctrl = document.createElement('div');
  ctrl.className = 'control';
  ctrl.innerHTML = `
    <label>${label} <span class="val">${fmt(value)}</span></label>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${value}">
  `;
  container.appendChild(ctrl);
  const input = ctrl.querySelector('input');
  const val = ctrl.querySelector('.val');
  input.addEventListener('input', () => {
    const v = parseFloat(input.value);
    val.textContent = fmt(v);
    if (onChange) onChange(v);
  });
  return {
    get value() { return parseFloat(input.value); },
    set value(v) {
      input.value = v;
      val.textContent = fmt(v);
    },
  };
}

// --- Canvas helpers ---

export function setupHiDPICanvas(canvas, w, h) {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  return ctx;
}

// --- Color helpers (HSL lerp for smooth transitions) ---

export function lerpColor(a, b, t) {
  const pa = a.match(/\d+/g).map(Number);
  const pb = b.match(/\d+/g).map(Number);
  return `rgb(${Math.round(pa[0] + (pb[0] - pa[0]) * t)},` +
         `${Math.round(pa[1] + (pb[1] - pa[1]) * t)},` +
         `${Math.round(pa[2] + (pb[2] - pa[2]) * t)})`;
}

// Map K from [0, K_bulk] to a dead→alive color
export function KColor(K, Kmax = K_BULK) {
  const t = Math.min(1, Math.max(0, K / Kmax));
  // Dead gray → alive orange
  return lerpColor('rgb(168, 163, 154)', 'rgb(217, 114, 54)', t);
}
