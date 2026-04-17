# Handoff — Coherence Lattice Alpha Project

**Last context save**: 2026-04-16 (evening — end of §9/§10 build + split)
**State at handoff**: Paper preprint-ready and on GitHub. Explorable now **10 / 17** sections complete. §9 grew so large it was split into **§9 (electron identity & topology)** and **§10 (how the lattice makes it a fermion)**. All prior "TODO" sections shifted by one: former §10 (BKT wall) is now §11, and total section count is 17.

**Immediate next task**: build §11 "The BKT wall" — the chapter where α lives. See **§ Next session** at the bottom.

This file is intended to be read first by a fresh session along with the files in **§ Must-read files on pickup**.

---

## § What this project is

The paper derives the fine structure constant **α = 1/137.036** from first principles — a single dynamical principle (the **Coherence Learning Rule**, CLR) on the diamond lattice, with zero free parameters. The core equation of the broader paradigm is

```
  I ≥ 0    where  I(t) := dC/dt = d/dt (I_phase · ρ)
```

— the intelligence flux is non-negative under the CLR (the **Coherence Theorem**). α falls out as the operating point the CLR selects when topology (vortices) is present.

The paper is at **papers/publication/coherence_lattice_alpha/paper.tex**, and has a standalone copy at **papers/standalone/coherence_lattice_alpha/** that's published to GitHub. An **explorable explanation** (Bret-Victor-style interactive essay) is in the `explorable/` subdirectory of each.

---

## § Where things live

### Two parallel copies — keep in sync

```
papers/publication/coherence_lattice_alpha/   ← SOURCE OF TRUTH. Edit here.
papers/standalone/coherence_lattice_alpha/    ← Git repo. Pushed to GitHub. Sync from publication.
```

**GitHub remote**: `git@github.com:project-89/coherence-lattice-alpha.git`
**Latest branch**: `main`

### File layout (in each copy)

```
├── paper.tex                 # main paper, 52-page LaTeX
├── paper.pdf                 # compiled
├── paper.bbl                 # bibliography (committed)
├── references.bib            # BibTeX source
├── AGENTS.md                 # agent onboarding for the paper/physics
├── HANDOFF.md                # THIS FILE
├── README.md                 # repo landing page (paradigm-first framing)
├── LICENSE                   # CC BY-NC 4.0 (paper) + AGPL-3.0 (code)
├── Makefile                  # `make` compiles the paper
├── scripts/                  # Python verification scripts + test_clr_vortex_headless.mjs (NEW)
├── figures/                  # 6 paper figures (PNG)
├── data/                     # JSON precomputed results
└── explorable/               # interactive essay (17 sections planned)
    ├── OUTLINE.md            # section-by-section plan & status
    ├── index.html            # landing page with TOC
    ├── css/style.css         # shared styling
    ├── js/common.js          # shared utilities
    ├── js/fiedler.js         # Lanczos Fiedler eigensolver
    ├── js/lattice3d.js       # canvas 3D renderer
    └── sections/             # 01–17, ten done
```

---

## § Must-read files on pickup

When starting a new session, read these in order:

1. **`AGENTS.md`** — paradigm, derivation chain, proven identities, first principles, scripts with runtime, conventions, key numbers. ✋ **Authoritative** — may have been manually edited outside sessions.

2. **`HANDOFF.md`** (this file) — project state, what's done, what's next, gotchas.

3. **`explorable/OUTLINE.md`** — 17-section plan with status. §9–§10 were split this cycle; §11–§17 are all future.

4. **`paper.tex`** (at least skim abstract + Section 1 + the `I ≥ 0` theorem in §1.2 + Open Derivation in §5-9).

5. **`explorable/js/common.js`** — shared JS utilities: `setupHiDPICanvas`, `wireEquation`, `runWhenVisible`, `R0`, `coherenceMetrics`, `drawMetricsStrip`.

6. **`explorable/js/lattice3d.js`** — 3D renderer with atoms+bonds, diamond lattice generator, camera controls, `orientCameraAlongAxis`, mesh utilities.

7. **`explorable/js/fiedler.js`** — Lanczos-based Fiedler eigensolver (used in §7 Figure 4; was intended for §10's Shannon+Fiedler but that figure ultimately became a scripted animation — see §10 notes).

8. **`explorable/sections/10-fermion.html`** — the most recent complete section. Three figures using three different idioms: k-space 3D surface plot (bands), bespoke 2D interactive with panels (spin walker), scripted side-by-side animation (CLR). Good template for future 3-figure sections.

9. **`explorable/sections/09-electron.html`** — template for multi-figure "hero + focused" layouts. Experiments strip (4 inline SVGs), photon/electron with B&W toggle, hero figure with mode switch, current figure with directional colour, chirality figure, assembly SVG, comparison table.

10. **`references.bib`** — bibliography. `Sharpe2026Coherence` is the unpublished companion paper on `I ≥ 0` — marked "In preparation", don't imply it's publicly available.

---

## § What's been completed

### Paper (preprint-ready, GitHub live)

Unchanged since last handoff:
- `1/α_BKT = 137.032` (29 ppm, zero free parameters, rigorous)
- LCE correction to `137.035999` (1.5 ppb, plausibility argument with explicit open-derivation flag)
- `I ≥ 0` theorem boxed as Theorem 1.1 with Remark citing the forthcoming companion paper
- CC BY-NC 4.0 for paper, AGPL-3.0 for scripts

### Explorable — 10 / 17 sections done

| # | Title | Status |
|---|-------|--------|
| 01 | Prelude | ✅ |
| 02 | Oscillators on a graph | ✅ |
| 03 | Coherence capital | ✅ |
| 04 | The Coherence Learning Rule | ✅ |
| 05 | How a binary field emerges | ✅ |
| 06 | Phase-locked modes: geometry and memory | ✅ |
| 07 | Spontaneous vortices | ✅ |
| 08 | Why the diamond lattice | ✅ |
| **09** | **The electron (identity & topology)** | **✅ NEW** |
| **10** | **How the lattice makes it a fermion** | **✅ NEW** |
| 11 | The BKT wall | TODO |
| 12 | Living versus static | TODO |
| 13 | The α formula, piece by piece | TODO |
| 14 | Why three dimensions | TODO |
| 15 | Closing the gap with linked clusters | TODO |
| 16 | From α to g | TODO |
| 17 | Coda: what just happened | TODO |

---

## § What's in §9 and §10 (since last handoff)

### §9 — The electron (identity & topology)

**Narrative arc** — written for someone who has never met an electron:
1. Lead + "a century of experiments tells us" with **4 inline SVG experiment cards**: Millikan oil drops (charge quantisation), Stern-Gerlach (spin-½ discovered), Dirac 1928 → positron, Schwinger g/2 (13-digit agreement)
2. "Two questions nobody has answered" (why integer charge? where does Dirac come from?)
3. WvdM (1997): light and matter are the same thing up to a topological twist
4. **Figure 1: Photon vs Electron** — two side-by-side 3D diamond lattices with shared camera. Plane-wave phase on left (n=0), atan2 vortex phase on right (n=1). **B&W toggle** via `sin(θ)→brightness` so wave nature is legible without colour.
5. WvdM-is-incomplete bridge → our lattice supplies the machinery
6. **Figure 2 (hero): the living electron** — 3D diamond with rainbow atoms, vortex axis marker (burgundy line through the core), bond colouring by `cos(Δθ)` (green alive / **purple** dead — not red, because red mixes into the rainbow; purple stands out). Top-down default. Mode toggle: "Phase + bonds" / "Dead/alive only" (latter greys the atoms so bonds dominate).
7. Charge equation (`q = ne`, winding integral, Z) with wireEquation block
8. Current equation (`j = K sin(Δθ)`) with wireEquation block
9. **Figure 3: Current** — dedicated 3D lattice with direction-coloured bonds (orange = clockwise, blue = counter-clockwise flow), faint non-participating bonds, top-down default
10. **Figure 4: Chirality** — dedicated 3D lattice, mode toggle (A/B/both). Solid grey (not transparent) for non-selected sublattice
11. Assembly SVG — clickable 10-property summary bridging topology to quantum mechanics
12. WvdM-vs-lattice **comparison table** with double-line separator: 5 WvdM kernel rows above, 8 lattice-derived rows below (most say "not derived" in the WvdM column)
13. Segue to §10

### §10 — How the lattice makes it a fermion

**Narrative arc:**
1. Brief recap (identity done; now behaviour)
2. **Dirac spectrum** — 5-step chain of reasoning: wavevector → interference of 4 NN phase factors → structure factor f(k) → zeros of f(k) = Dirac points → linear V near the zeros. Bloch Hamiltonian wireEquation block.
3. **Aside warning**: "the next figure is not a picture of the lattice — it's in momentum space, a graph of how waves behave."
4. **Figure 1: Dirac bands as 3D surfaces** — plots E = ±|f(kx,ky,0)| as two meshes in the lattice3d renderer. Blue upper band, burgundy lower band. They meet along the nodal lines kx=1 and ky=1 (marked orange). Axis labels `kx`, `ky`, `+E`, `−E`. View presets: Oblique, Side, Top. Prominent on-canvas reminder: "← this is MOMENTUM space (kx, ky, E) — how waves behave, NOT where atoms sit".
5. Connection-to-vortex prose: "Vortex alone gives charge. Lattice alone gives Dirac spectrum. Together: electron."
6. **Dirac equation** prose + wireEquation block (`iℏγ^μ ∂_μ ψ = m ψ` with 7 clickable symbols)
7. **Spin section** with **Figure 2: Spin walker** — loop around a vortex marker with draggable walker + two arrow panels (vector SO(3) rotates at walker rate, spinor SU(2) rotates at HALF rate). Play button auto-animates through two full loops so the 720° point lands viscerally.
8. **"How the CLR keeps the electron alive"** with **Figure 3: Shannon vs Shannon+Fiedler scripted animation** — see design story below.
9. **The punchline aside**: "α is not a property of the electron. It is a property of the vacuum."
10. Segue to §11 (BKT wall)

### Key design decision: Figure 3 of §10 is a scripted animation, not live physics

We tried to run the co-evolutionary CLR (Kuramoto phases + Shannon + Fiedler) on a 3D diamond lattice in browser. A **standalone Node test** (`scripts/test_clr_vortex_headless.mjs`) revealed the problem: with a static atan2 phase seed on nCells ∈ {3,4,5}, only 3–5 bonds have cos(Δθ) < 0. Shannon kills them; Fiedler has no bottleneck threat to respond to; the two panels look identical. The paper's 68% core-dead result requires the full co-evolutionary protocol (K_init=0.01, dt_K=0.01, 30,000+ steps), which is impractical in browser.

**Solution**: a physics-informed scripted animation. Bonds classified by transverse radial distance r from the vortex axis:
- Core (r < 0.9 NN): dies in both panels (~4% of bonds)
- Ring (0.9 < r < 2.2): dies in Shannon panel, stays alive in Fiedler panel (~16%)
- Bulk (r > 2.2): stays alive in both (~80%)

K trajectories are smooth exponentials: 8-second ramp + 6-second hold, auto-looping. **"Damage only"** toggle fades healthy bulk and leaves only dying bonds visible. **The figure is clearly labelled** as a replay of the paper's §4.1 result, with a pointer to `scripts/da1_spontaneous_vortex.py` for the rigorous dynamics.

### Other key decisions from this cycle

- **Bond colour palette**: green = alive, **purple** (#a855f7) = dead. Red was tried first and got lost in the rainbow (red atoms near phase 0 absorbed red bonds).
- **Steep sigmoid** on health→colour mapping: middle values snap clearly one way or the other, no muddy brown.
- **Global zoom constant** `ZOOM_MULT = 3.4` applied consistently across figures.
- **Axis labels on the Dirac cone** via invisible atoms with `label` fields — `renderScene()` draws them. Clean way to label 3D plots without modifying the renderer.

---

## § New artefacts this cycle

### `scripts/test_clr_vortex_headless.mjs`

Standalone Node script that replicates the browser CLR dynamics headless and reports:
- Distribution of cos(Δθ) across bonds
- K evolution at various step counts
- Final bond status correlated with cos(Δθ)
- Radial distribution of dead bonds

Usage: `node scripts/test_clr_vortex_headless.mjs`

This is the script that revealed why the naive browser sim couldn't show Fiedler rescuing bonds. Keep it for any future physics-sim iteration.

---

## § Gotchas / lessons (new this cycle)

- **Red bonds get lost in a rainbow-atom scene.** Use purple (or any colour not adjacent to rainbow endpoints) for "dead" signalling.
- **renderScene overrides the alpha of bond colours** with a depth-based value. Don't rely on alpha to convey health — use R/G/B and width instead.
- **Scripted animations clearly labelled as such are an honest pedagogical tool.** Don't claim live simulation when you're replaying pre-computed/scripted behaviour. Label it as "replaying the qualitative outcome of the paper's simulation" with a pointer.
- **If a figure is "not doing much," the reader is right.** Don't try to make dynamics ramp fast enough to be convincing — if the effect is subtle (e.g., 3 dead bonds in a 333-bond lattice), the visualisation needs to either amplify that visually (wider scripted dead zone) or cut the figure.
- **Standalone Node tests catch bugs invisibly faster than browser iteration.** The `test_clr_vortex_headless.mjs` run told us in 5 seconds what the browser would have taken an hour of prodding to reveal.
- **Top-down default views** for 3D figures with cylindrical vortex symmetry — users want to see the pinwheel face-on.

---

## § Breadcrumb inconsistency (housekeeping)

Sections 1–7 have breadcrumbs saying `section NN / 15` or `section NN / 16` — inconsistent and out-of-date now that total is 17. §8 says `/16`. §9 updated to `/17`. §10 (new) says `/17`. **Task for a future cleanup pass**: bump all section breadcrumbs to `/17` via a simple edit. Not blocking anything.

---

## § Outstanding / unresolved (from prior handoff, still applicable)

- The `R₀²` embedding weight remains a plausibility argument, not a theorem (flagged everywhere appropriate).
- Frequency-learning demo removed from §6 (didn't cleanly demonstrate the intended concept). Revisit if useful.
- Mobile scroll performance generally OK thanks to `runWhenVisible`, but §9/§10 have many figures and should be eyeballed on small screens.

---

## § Practical how-tos

### Compile the paper

```
cd papers/publication/coherence_lattice_alpha
make
```

### Start the explorable dev server

```
cd papers/standalone/coherence_lattice_alpha/explorable
python3 -m http.server 8089 --bind 0.0.0.0
```

Then http://localhost:8089/ (or your LAN IP).

### Sync changes from publication → standalone

Only sync what you've actually edited:

```
SRC=papers/publication/coherence_lattice_alpha
DST=papers/standalone/coherence_lattice_alpha
cp "$SRC/paper.tex" "$DST/"        # if paper changed
cp "$SRC/paper.pdf" "$DST/"
cp "$SRC/paper.bbl" "$DST/"
cp -r "$SRC/explorable/." "$DST/explorable/"
cp "$SRC/HANDOFF.md" "$DST/"
cp "$SRC/scripts/test_clr_vortex_headless.mjs" "$DST/scripts/"   # if new scripts
```

### Commit and push

```
cd papers/standalone/coherence_lattice_alpha
git add <files>
git commit -m "..."
git push origin main
```

### Verify physics scripts still work

```
cd papers/standalone/coherence_lattice_alpha
python3 scripts/alpha_137_verification.py      # → 1/α = 137.032051
python3 scripts/g_factor_from_lattice.py       # → g = 2.002319371
python3 scripts/living_vs_static_alpha.py      # → static 143, living 137
node        scripts/test_clr_vortex_headless.mjs
```

(Python env: `.venv/` in `coherence_lattice/` root. Node 18+ for the `.mjs` test.)

---

## § Next session: §11 "The BKT wall"

This is the chapter where α lives. Everything in §9 and §10 built toward this: the electron is a vortex whose topology forces K ≤ K_BKT, and the CLR drives K up against that wall. The equilibrium is exactly at K_BKT = 2/π, and that's where the fine structure constant is computed.

### Must-read files for the next session

1. **`HANDOFF.md`** (this file) — current state.
2. **`AGENTS.md`** — physics spine. §The Derivation Chain is especially relevant: steps 2–3 (CLR → binary K-field, CLR + vortex → K_eff = K_BKT) and step 4 (K_BKT = 2/π).
3. **`paper.tex`** §5.5 "Vortex Marginality" (Theorem 5.5) — the key theorem for §11. Also §5.8 for the BKT correlator derivation and how the power-law exponent is evaluated at the fixed point (living vs static, deferred to §12).
4. **`explorable/sections/10-fermion.html`** — layout template for side-by-side panels, view-mode toggles, wireEquation patterns.

### Proposed figure lineup for §11

1. **Vortex free energy** (2D plot): F(R) vs R for three K values — K > K_BKT (confined, F → +∞), K = K_BKT (marginal, F = 0), K < K_BKT (unbound, F → −∞). K slider so the user sees the curve cross over as K passes 2/π.
2. **K dial + vortex state indicator**: slider from K = 0.3 to K = 1.0, showing a single vortex that confines (green), goes marginal (orange, at K_BKT = 0.6366), or unbinds (purple) as K varies.
3. **"The wall" hero figure**: CLR urge arrow pushing K upward; BKT wall at K_BKT as a vertical line; equilibrium dot sits exactly at the wall. Annotate with K_bulk = 16/π² as the derived consequence. Maybe show the paper's 3-regime table visually (subcritical, BKT window, supercritical).

### Physics to get right

- `K_BKT = 2/π = 0.6366...` is the per-bond critical coupling (not K_bulk).
- `K_bulk = 16/π² = z·K_BKT²` where z=4 for diamond.
- Vortex free energy: `F(R) = (πK − 2) ln(R/a)` (in natural units, with the thermal fluctuation contribution and bond-energy gain combining to this form at criticality).
- The "urge" of the CLR comes from Shannon wanting K high; the "wall" comes from the vortex's topological constraint. Theorem 5.5 formalises this.

### Stylistic continuity

- Palette: green alive, purple dead, orange = state/process, blue = band/sublattice.
- Top-down default for any 3D figures, side view as secondary.
- Keep it focused — §11 is about *where* the CLR places the system and *why* that location gives α. Don't drift back into Dirac/spin.

### After §11

`§12 — Living versus static` is the natural follow-up: the Debye-Waller power-law exponent is evaluated at the CLR attractor (giving `1/α = 137`) rather than integrated along the trajectory (which gives `1/α = 143`). That's one of the deepest claims of the paper and a clean visualisation opportunity.
