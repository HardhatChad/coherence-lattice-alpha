# Handoff — Coherence Lattice Alpha Project

**Last context save**: 2026-04-17 (§13 "The α formula, piece by piece" shipped)
**State at handoff**: Paper preprint-ready and on GitHub. Explorable now **13 / 17** sections complete. §13 is the capstone equation chapter — a 28px hero α formula with seven clickable symbol chips (each opening a detail panel with chapter source + live numeric value), a self-consistent iteration animation showing convergence to 137.032 in three Schwinger updates, and a sensitivity panel making the R₀-dominates hierarchy visible.

**Immediate next task**: build §14 "Why three dimensions" — the d-dial chapter that sweeps dimension from 2 to 5 in the α formula and shows only d = 3 gives a physical value. See **§ Next session** at the bottom.

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

### Explorable — 12 / 17 sections done

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
| 11 | The BKT wall | ✅ |
| 12 | Living versus static | ✅ |
| **13** | **The α formula, piece by piece** | **✅ NEW** |
| 14 | Why three dimensions | TODO |
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

## § What's in §12 (shipped this cycle)

### §12 — Living versus static

**Narrative arc:**
1. Lead picks up §11's closing formula and flags the 1/√e exponent as the subject.
2. "Two ways to sum coherence" — static integral vs living endpoint, with the bullet list stating the two numbers (0.787 vs 0.607) up front.
3. **Figure 1: Side-by-side α calculator.** Left panel shades the area under exp(−σ²l); right panel shows a single tall bar at l=1. Big coloured 1/α = 143.13 / 137.03 readouts below each panel. Single σ² slider (physical = 1/2, "reset to physical" button). CODATA reference line printed below both panels.
4. "Why the endpoint is right" — prose framing of PLM Lemma + equation block for K(t) → K* with convergence rate λ = −η V″(K*).
5. **Figure 2: PLM trajectory.** Four bonds with K₀ ∈ {0.1, 0.6, 1.2, 2.4} converging to K* = 16/π² (upper plot). Lower plot shows exp(−σ²K(t)) along each trajectory, all collapsing onto a single endpoint line. Play/pause/reset.
6. "Interpolating between them" — continuous window-width concept introduced with an equation block for n(w).
7. **Figure 3: Window-width sweep.** Slider w from 0 to 1. Left: highlighted region under the decay curve (colour interpolates green → purple). Right: big 1/α readout + gradient bar with a triangle marker walking from 137.03 to 143.13. "Living (w=0)" and "Static (w=1)" snap buttons.
8. "Why this is the deepest move" aside making the PLM/attractor framing explicit.
9. Closing repeats the BKT α formula and passes the baton to §13.

### Key design decisions this cycle

- **Numbers verified before wiring.** Ran `node --input-type=module` against common.js + K_BKT + R0 to confirm n_static = 0.787, n_living = 0.607, 1/α_static = 143.134, 1/α_living = 137.032 before putting those values into prose and figures. Prevents a transcription error from leaking into the canonical numbers.
- **Palette encodes the judgment call.** Green = living endpoint (correct). Purple = static integral (wrong-but-standard). The window-width slider's fill colour continuously lerps between the two so the user sees the physics being traded off in colour space as well as numerically.
- **Figure 2 runs on exponential time not RG scale.** The paper's PLM Lemma is formally about RG flow, but "K(t)" as a CLR-time trajectory reads more viscerally. Prose is careful to bridge: "observables that depend on K are evaluated where K lives." Doesn't conflate the two variables in any equation.
- **Snap-to-endpoints buttons on Figure 3.** With a 0–1 slider and step 0.005, nailing exactly w=0 or w=1 is finicky. Dedicated buttons make the two canonical cases a single click.
- **Reset-to-physical button on Figure 1.** σ² = 1/2 is the only physically meaningful value (derived from BKT). The slider allows exploration, but the button snaps back.

---

## § What's in §13 (shipped this cycle)

### §13 — The α formula, piece by piece

**Narrative arc:**
1. Lead frames the chapter: twelve chapters of physics now fit into a single line of algebra, and this line is displayed at hero scale with every piece clickable.
2. **Hero equation** at 28px scale with seven coloured chips: α, R₀, (2/π), ⁴, (π/4), 1/√e, α/(2π). Each click swaps a shared detail panel directly beneath the formula showing name, pronunciation, chapter source, current numeric value at the BKT point, and 2–4 sentence physics description.
3. **Figure 1: Self-consistent iteration animation.** A 1/α number line from 100 to 175 with a CODATA 137.036 marker in green. Starts at α₀ = V = 0.00845 → 1/α = 118.32 (purple dot). Each iteration snaps to the next value with a 2.5%/frame ease. Live ppm-distance-to-CODATA readout. Iteration history printed on the left. Converges in three steps to 137.032. "Run iteration" + "Reset" + "Replay" controls.
4. **Figure 2: Sensitivity panel.** Three ±5% sliders (R₀, π/4 base, 1/√e), each displayed as a coloured bar beneath the shared 1/α ruler showing the full ±5% sweep in 1/α space. Ranges: R₀ ≈ 55, base ≈ 8, 1/√e ≈ 2. CODATA dashed vertical line on the ruler. "Reset all" button. Makes the vertex-dominated sensitivity hierarchy visible.
5. "Zero free parameters, twelve chapters deep" aside inventories every factor's provenance (which chapter proved it, which theorem it comes from).
6. "Closing the last 3%" paragraph previews §15's LCE correction and names the 29-ppm vs 1.5-ppb distinction.
7. Closing teases §14's dimensional dial surprise.

### Key design decisions this cycle

- **Hero equation not an equation-block.** §13 needed the formula bigger, more visually distinct from the earlier `eq-display` pattern. Built a dedicated `.hero-eq` style at 28px with extra chip padding and a hover-lift transform. Uses the same `state`/`param`/`struct`/`op` colour classes as the smaller equations so the visual grammar is consistent.
- **Shared detail panel rather than expanding blocks.** Clicking a symbol replaces the content of one fixed panel beneath the equation (with a default "click anything" fallback state). This keeps the page length constant and lets the user quickly scan through all seven symbols without losing scroll position. Re-click to deselect.
- **Iteration animated on a number line, not as text.** Showing α converging as a physical motion on a 1/α ruler with the CODATA mark is faster to grok than a table of numbers. Kept the step-by-step numerical history as a side panel for readers who want the precision.
- **Sensitivity bars pre-computed at ±5%.** Rather than letting the user drive the sweep manually (which would need three simultaneous sliders at extremes to see the hierarchy), pre-computed the full ±5% bars and drew them as coloured ranges on the ruler. The live ±5% slider on top is orthogonal — it drives the single live dot, not the bars. This cleanly separates "what does a nudge do?" (the dot) from "what is the total sensitivity?" (the bars).
- **Numerics pre-verified.** Ran `node --input-type=module` against common.js before writing to confirm iteration values (α₀ = 8.45e-3 → 1/α = 118.32; α₁ → 137.038; α₂ → 137.032; converges at step 2) and sensitivity ranges (55 / 8 / 2). Prevents typos in canonical numbers.

---

## § Next session: §14 "Why three dimensions"

The surprising dimensional-dial chapter. The α formula has a hidden parameter: the lattice coordination number z = d + 1. Sliding d from 2 to 5 produces 1/α values ranging from ~36 to ~1290. Only d = 3 (hence diamond's z = 4) lands at the physical value. This is the kind of demonstration that stops a reader in their tracks once they realise what they are seeing.

### Must-read files for the next session

1. **`HANDOFF.md`** (this file) — current state.
2. **`AGENTS.md`** — §5-7 table of 1/α(d) values (2, 3, 4, 5) with the "viable / too strong / too weak" annotation.
3. **`paper.tex`** §5.7 "Dimensional Selection: Why d = 3" — the whole table is there, d=2 gives 1/α ≈ 36, d=3 gives 137.032, d=4 gives 390, d=5 gives 1290.
4. **`explorable/sections/13-alpha-formula.html`** — template for the hero-scale equation + single-figure chapter. The iteration-animation number-line idiom is likely reusable.

### Proposed figure lineup for §14

1. **The d dial.** One big slider: d ∈ [2, 5] with step 0.1 (continuous even though only integer d has a lattice). 1/α responds live. Below the slider, a coloured "regime ruler" showing: d=2 "too strong — atoms collapse", d=3 "physical", d=4 "too weak — EM barely binds", d=5 "effectively non-interacting". The physical value 137.036 is a green tick that only one position on the slider (d=3) reaches. Also display z = d+1 explicitly so readers see the coordination number update.
2. **Side-by-side lattice sketches** (optional, small): four 2D icons representing triangular (z=3), diamond (z=4), FCC (z=5?) lattices at the d values shown. Not physics-accurate but visually anchoring — the dial is not abstract, it corresponds to real crystal geometries.
3. **Constraint visualisation**: a 2D plot of the two meeting constraints π/(d+1) ∈ [0,1] and 1/α(d) > 1 (some minimal EM bound). d=3 is the unique d where both constraints are satisfied and the value is physical. This is the "why diamond, not just any z" argument visualised.

### Physics to get right

- `1/α(d) = (R₀(K_BKT(d)))^(d+1) × (π/(d+1))^(n + α/(2π))`.
- K_BKT depends on d: for the 2D XY vortex, K_BKT = 2/π regardless of embedding dimension, so the only d-dependence flows through z = d+1. Paper §5.7 confirms this.
- d=2: 1/α = 36 (way too strong, atoms collapse).
- d=3: 1/α = 137.032 (physical).
- d=4: 1/α ≈ 390.
- d=5: 1/α ≈ 1290.
- The physical bound: α has to be perturbative (α < 1) AND strong enough to bind atoms (α > α_min ~ 1/500 ish). Only d=3 satisfies both.

### Stylistic continuity

- Palette: green for physical (d=3 region), purple for unphysical (d<3 or d>3).
- One very focused slider-driven figure, minimal prose. This is a "holy shit" chapter, not a derivation chapter.
- Expected length: 400–500 lines of HTML.

### After §14

`§15 — Closing the gap with linked clusters` takes 1/α from 137.032 (29 ppm) to 137.035999 (1.5 ppb) via QED vacuum polarisation. This is a more technical chapter and probably wants a convergence-table figure showing LCE orders 1, 2, 3, 4 with their residuals (28800 → 6.7 → 1.5 ppb).

---

## § Inherited housekeeping (from prior cycle, now partially resolved)

- OUTLINE.md's section brief-details block was renumbered to match the 17-section layout — the old 10=BKT-wall naming has been replaced with the current 11=BKT-wall, and subsequent sections bumped 11→12, 12→13, 13→14, 14→15, 15→16, 16→17. File-locations block at the bottom is now in sync.
- Breadcrumb inconsistency in sections 1–7 (`/15` or `/16` where it should be `/17`) is still outstanding. Non-blocking, noted in prior handoff. Fix in a future touch-up pass via global search/replace.
