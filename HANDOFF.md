# Handoff — Coherence Lattice Alpha Project

**Last context save**: 2026-04-16 (late evening — §11 BKT wall shipped)
**State at handoff**: Paper preprint-ready and on GitHub. Explorable now **11 / 17** sections complete. §11 adds the three-figure BKT-wall chapter (F(R), vortex-pair K dial, hero wall figure) where α operationally lives.

**Immediate next task**: build §12 "Living versus static" — the chapter where `1/α = 143` becomes `1/α = 137` purely through the exponent-evaluation choice. See **§ Next session** at the bottom.

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

### Explorable — 11 / 17 sections done

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
| 09 | The electron (identity & topology) | ✅ |
| 10 | How the lattice makes it a fermion | ✅ |
| **11** | **The BKT wall** | **✅ NEW** |
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

## § What's in §11 (shipped this cycle)

### §11 — The BKT wall

**Narrative arc:**
1. Lead: picks up §10's punchline ("α is a property of the vacuum") and unpacks it as a two-force balance.
2. "Two forces meet" — CLR wants K → K_eq ≈ 2.11; vortex forbids K_eff > K_BKT = 2/π. The wall sits at the boundary.
3. **Figure 1: Vortex free energy F(R).** Live `K_eff` slider (0.30–1.00, step 0.005). Three frozen reference curves (K=0.50 unbound / K=2/π marginal / K=0.80 confined). Live burgundy curve tracks the slider. Top strip regime indicator snaps between confined / marginal / unbound. Log-scaled R axis 1–50.
4. **Figure 2: Vortex-antivortex pair on a phase lattice.** Draggable vortex (+1, burgundy) and antivortex (−1, blue) on a 2D HSL-coloured phase field. Force arrows between them, coloured by regime (green attractive / orange zero / purple repulsive), length ∝ |πK−2|/R. Play releases the pair: above wall → annihilate, below → flee, at wall → drift randomly.
5. **Figure 3: the hero "wall" figure.** 1D K-axis showing CLR potential V(K) = K²/r − ln I₀(K) at r = 5.905. Marble rolls up under Shannon gradient descent. BKT wall drawn as purple dashed line at K_BKT; K_bulk = 16/π² and K_eq = 2.11 marked too. "Remove vortex" toggle drops the wall so the marble overshoots to K_eq — this is the defining demonstration of the chapter.
6. Two equation blocks (F(R) and K_bulk = 16/π²), one "base = π/z" equation recap, one aside explaining K_BKT is a property of topology (no free parameters).
7. Closing paragraph writes down `α = R₀(2/π)⁴ × (π/4)^(1/√e + α/2π)` and teases the exponent-evaluation distinction as the §12 hook.

### Key design decisions this cycle

- **Palette consistency:** green = confined (attractive, bound), orange = marginal (α lives here), purple = unbound (the wall and the forbidden region). This reuses §9/§10's green/purple but re-purposes orange as "the marginal edge" — a role earlier sections used for drive/process. Worked fine in context because Figure 3 makes the orange = "CLR's target when constrained" reading vivid.
- **Regime strips at the top of figures.** Every interactive figure has a coloured bar above it showing the live regime. This gives users immediate feedback when dragging the K slider — the bar snaps colour *before* the curve shape change registers visually.
- **Figure 2 as particle simulation, not phase dynamics.** Kept the phase-field purely decorative (sampled HSL dots, no evolution) and moved the physics to the pair coordinate: one ODE, dx/dt ∝ −(πK−2)/R. Clean, visually legible, honest (prose labels the approximation).
- **Hero figure uses V(K) not F(R).** The wall belongs on the familiar CLR landscape readers already know from §4 — adding the wall as a constraint is a clearer pedagogical move than re-plotting F(R). The `Remove vortex` toggle is the "aha" that welds §4's bond potential to §11's topology constraint.
- **Log-spaced R axis on Figure 1.** Linear R makes the three regimes compress into a corner; log R gives equal visual weight to small and large separations. Standard BKT figure convention.

---

## § Next session: §12 "Living versus static"

This is the single-chapter explanation of how `1/α` goes from 143 (standard lattice field theory answer) to 137 (correct answer) without changing a single physical input — only by evaluating the Debye-Waller factor at the attractor rather than integrating along the RG trajectory. This is the deepest conceptual move in the entire paper.

### Must-read files for the next session

1. **`HANDOFF.md`** (this file) — current state.
2. **`AGENTS.md`** — physics spine. §The Derivation Chain step 6 (Debye-Waller exponent n = exp(−σ²)) and the PLM-Lemma-as-freezer.
3. **`paper.tex`** §5.8 "The BKT Formula", particularly the Remark (`rem:matching-exponent`) which spells out the integral-vs-endpoint distinction and gives the numerical values (n_static = 0.787 → 1/α_static = 143; n_living = 1/√e ≈ 0.607 → 1/α = 137.032).
4. **`explorable/sections/11-bkt-wall.html`** — most recent template. The V(K) potential landscape pattern from Figure 3 there (marble + potential curve with landmark lines) may be reusable for a PLM-trajectory visualisation in §12.
5. **`paper.tex`** Lemma 5.2 (PLM K-field freezing) — the reason evaluating at the endpoint is physically correct: the CLR converges to a fixed point exponentially; once there, K is frozen and observables evaluate at K*.

### Proposed figure lineup for §12

1. **Two-panel α calculator**: left = static integration (shaded area under exp(−σ²l) from l=0 to l=1), right = living endpoint (single tall bar at l=1 with value exp(−σ²)). Same inputs (σ² = 1/2, z = 4), different n_eff, different α. Output: 1/α_static = 143 (left) vs 1/α_living = 137 (right). Toggling between them should be dramatic — the two numbers change by 6 units.
2. **Interpolation slider**: a single slider that sweeps between "integrate over [0, ξ]" and "evaluate at ξ". Watch 1/α slide from 143 down to 137 as ξ collapses to 1. Make the physical meaning of ξ explicit — it's the fraction of the RG trajectory the calculation averages over.
3. **PLM trajectory illustration**: a K-vs-time plot showing K(t) converging exponentially to K*. Shade the area under n(l) over the trajectory vs mark the endpoint value. The marble-on-potential idiom from §11's Figure 3 could be reused to show "the marble settles and sits" — observables use the sitting value, not the rolling average.

### Physics to get right

- `σ² = 2η = 1/(π K_BKT) = 1/2` (exact at BKT).
- `n_living = exp(−σ²) = 1/√e ≈ 0.6065 → 1/α = 137.032`.
- `n_static = ∫₀¹ exp(−σ²l) dl = (1 − 1/√e)/σ² ≈ 0.7866 → 1/α ≈ 143` (recompute via `alpha_BKT(z, ...)` helper or inline).
- The PLM Lemma is what makes the endpoint evaluation legitimate: because K freezes exponentially at K*, the Debye-Waller integral's "time" variable is frozen and the integrand collapses to its endpoint value. This is *not* a choice — it's a consequence of the CLR dynamics.
- The paper's Remark also mentions the self-consistency correction `n_eff = 1/√e + α/(2π)` (Schwinger). §12 can preview this but the full self-consistent iteration belongs in §13.

### Stylistic continuity

- Palette: blue for state/trajectory, orange for endpoint/attractor, green for correct answer, purple for incorrect answer or forbidden.
- Keep equation blocks short — §12 is a comparison chapter, not a derivation chapter. Most real estate goes to the side-by-side figure.
- Expected length: shorter than §9/§10/§11 — one big comparison figure + two smaller illustrations. Target 400–500 lines of HTML.

### After §12

`§13 — The α formula, piece by piece` is where the full clickable equation lives. Every factor (R₀(2/π), ⁴, π/4, 1/√e, α/(2π)) has a clickable symbol that cites the chapter where it was derived. §12 is prerequisite to §13 because the `1/√e` exponent is the living-vs-static choice, and §13 will leverage §12's figure as one of its per-symbol explanations.

---

## § Inherited housekeeping (from prior cycle, now partially resolved)

- OUTLINE.md's section brief-details block was renumbered to match the 17-section layout — the old 10=BKT-wall naming has been replaced with the current 11=BKT-wall, and subsequent sections bumped 11→12, 12→13, 13→14, 14→15, 15→16, 16→17. File-locations block at the bottom is now in sync.
- Breadcrumb inconsistency in sections 1–7 (`/15` or `/16` where it should be `/17`) is still outstanding. Non-blocking, noted in prior handoff. Fix in a future touch-up pass via global search/replace.
