# Handoff — Coherence Lattice Alpha Project

**Last context save**: 2026-04-15 (evening — mid-§8)
**State at handoff**: Paper is preprint-ready and pushed to GitHub. Explorable now **7 / 16** sections complete, with §8 partially done (Figures 1 + 2 shipped, Figure 3 deferred to next session). The outline has been renumbered: a new §9 "The electron" was inserted between Diamond (§8) and BKT wall (former §9, now §10), shifting all subsequent sections by 1. Total section count is now 16.

**Immediate next task**: build §8 Figure 3 — a 3D vortex line on the diamond lattice — using the already-built `explorable/js/lattice3d.js` module. See the detailed pickup plan in **§ Next session: §8 Figure 3 plan** at the bottom of this file.

This is the document a fresh session should read first, in combination with the files listed in **§ Must-read files on pickup** below.

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

The standalone copy is the git repo synced to GitHub. The publication copy is the "upstream" source of truth — edits happen there, then sync to standalone before committing.

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
├── scripts/                  # 27 Python verification scripts
├── figures/                  # 6 paper figures (PNG)
├── data/                     # JSON precomputed results
└── explorable/               # interactive essay (15 sections planned)
    ├── OUTLINE.md            # section-by-section plan & status
    ├── index.html            # landing page with TOC
    ├── css/style.css         # shared styling
    ├── js/common.js          # shared utilities
    └── sections/             # 01–15, six done so far
```

---

## § Must-read files on pickup

When starting a new session, read these in order:

1. **`AGENTS.md`** — paradigm, derivation chain, proven identities, first principles, all scripts with runtime, conventions, and key numbers. This is the physics spine. ✋ **This file has been manually edited outside of our sessions — treat it as authoritative.**

2. **`HANDOFF.md`** (this file) — project state, what's done, what's next, gotchas.

3. **`explorable/OUTLINE.md`** — 15-section plan for the explorable. Shows status (✅ done / TODO) and has detailed plans for remaining sections.

4. **`paper.tex`** (at least skim the abstract + Section 1 + the boxed `I ≥ 0` theorem in §1.2 + the Open Derivation paragraph in §5-9) — for context on what's in the paper.

5. **`explorable/js/common.js`** — the shared JS module. Essential patterns: `setupHiDPICanvas`, `wireEquation`, `runWhenVisible`, `coherenceMetrics`, `drawMetricsStrip`, `R0` (Bessel ratio). Read this before writing any new section.

6. **`explorable/sections/06-plm-npd.html`** — the most recent and feature-complete section. Use as template for future sections. Shows the guided-tour pattern, clickable equation blocks, drive-pattern × local-coherence coloring, bonds toggle.

7. **`explorable/sections/01-prelude.html`** — simplest section, shows the basic canvas + multi-figure structure.

8. **`references.bib`** — bibliography. Notable entry: `Sharpe2026Coherence` is the unpublished companion paper on the broader Coherence Theorem (`I ≥ 0`). Labeled "In preparation" — don't imply it exists publicly.

### Context-wide reference docs

- **`/Users/parzival/workspace/oneirocom/project89/wayfaring/CLAUDE.md`** — wayfaring/Project 89 codebase overview (high-level context)
- **`/Users/parzival/workspace/oneirocom/project89/wayfaring/06_intelligence/coherence_lattice/CLAUDE.md`** — coherence_lattice project entry point (points to AGENT.md, research registry protocol)
- **`papers/core/main.tex`** — the companion Coherence Theorem paper (unpublished, provides the broader substrate-agnostic framework from which the alpha derivation is one application)

---

## § What's been completed

### Paper (preprint-ready)

- **Framing refactor**: Main boxed result is `1/α_BKT = 137.032` at 29 ppm with zero free parameters (rigorous). LCE correction to 137.035999 at 1.5 ppb presented as plausibility argument. Convergence pattern + candidate enumeration given as evidence; the specific R₀² embedding weight is explicitly flagged as an open derivation.
- **`I ≥ 0` elevation**: Theorem 1.1 (Coherence Ascent) now defines `I(t) := dC/dt` and states `I(t) ≥ 0` boxed. Remark 1 cites the forthcoming companion paper while noting the derivation is self-contained.
- **Casimir mass spectrum removed**: Section 6.2 replaced with brief "lepton generations via hexagonal DOFs are covered in a follow-up paper" note.
- **Acknowledgments**: GPD (Get Physics Done) framework credited.
- **Licenses**: CC BY-NC 4.0 for paper/figures, AGPL-3.0 for scripts.
- **GitHub repo**: live at https://github.com/project-89/coherence-lattice-alpha. All changes committed and pushed.

### Explorable explanation (7 / 16 sections done, §8 partial)

See `explorable/OUTLINE.md` for the full plan. Completed:

| # | Title | Key interactives |
|---|-------|------------------|
| 01 | Prelude | One osc + waveform, two uncoupled, two coupled (K slider + frequency gap), single bond with CLR (K_eq ≈ 2.1) |
| 02 | Oscillators on a graph | Unit-circle math (draggable phases), Kuramoto equation (clickable symbols), firefly ring, firefly grid |
| 03 | Coherence capital | Three-regime comparison, main interactive with grid + C-contour phase portrait |
| 04 | The CLR | Derivation, clickable CLR equation, potential V(K), live bond with bistability, death-threshold bifurcation diagram, **Coherence Theorem climax with `I ≥ 0` boxed** |
| 05 | How a binary field emerges | Three bonds → small ring → full grid with K-histogram + I(t) + C(t) + phases/bonds/both toggle |
| 06 | PLMs and memory | PLM detection (connected components), guided 5-step memory tour, patterns playground with drive × local-coherence coloring, coherence-capital tracking, SVG NPD hierarchy |
| 07 | Spontaneous vortices | Two-circles winding; seeded 2D vortex with draggable loop; 20×20 nucleation + death; 32×32 Shannon-vs-Fiedler with **real Lanczos eigensolver** (`js/fiedler.js` + 17 tests). 2D annihilation → §8 segue. |
| 08 | Why the diamond lattice *(Figures 1+2 done, Figure 3 deferred)* | Filter checklist with **3D rotatable view of all 7 candidate lattices** (SC/BCC/FCC/HCP/diamond/honeycomb/square); diamond deep-dive with A-only, B-only, one-tetrahedron, and three (111)-honeycomb-layer modes, view shortcuts + auto-rotate. |

Section 6's memory tour, Section 7's Shannon-vs-Fiedler contrast, and Section 8's lattice comparison are the three pedagogical highlights so far.

### New JS modules shipped this session

- **`explorable/js/fiedler.js`** — Lanczos eigensolver with full reorthogonalization + null-space deflation + Jacobi eigendecomposition on the small tridiagonal. Validated by 17 checks in `fiedler.test.mjs` (path graph closed-form, 2D grid exact, two-cluster, cut-bottleneck, convergence vs m). Used by §7 Figure 4.
- **`explorable/js/lattice3d.js`** — canvas 3D renderer: camera orbit via drag, shift+drag pan, wheel zoom, painter's algorithm depth sort, per-atom fog + outline thickness based on camera-space depth. Ships with generators for seven lattices (SC/BCC/FCC/HCP/diamond/honeycomb/square), auto-normalised to NN = 1, centroid-recentred to origin, with a convenience `orientCameraAlongAxis([1,1,1])` helper. Used by §8 Figures 1 and 2.

---

## § What's next (sections 08 Fig 3 through 16)

**Immediately next (deferred to a fresh session because of context budget):**

- **08 Figure 3 — 3D vortex line on diamond.** Full spec below in § Next session.

**Then:**

- **09 — The electron** *(new section inserted this cycle)*. Dirac cone emergence at nodal k-points, electron-assembly SVG tying vortex + diamond + frame (deferred) → charge + Dirac equation + spin-½, clickable Dirac equation with Clifford anticommutator.
- **10 — The BKT wall**: vortex marginality theorem, CLR urge + topology ceiling meeting at K_BKT.
- **11 — Living vs static**: 143 → 137, PLM Freezing Lemma.
- **12 — The α formula, piece by piece**: `α = R₀(2/π)⁴ × (π/4)^(1/√e + α/2π)`, clickable-symbol formula, sensitivity sliders.
- **13 — Why three dimensions**: d-dial.
- **14 — Closing the gap with linked clusters**: 28,800 → 6.7 → 1.5 ppb convergence, honest open-problem flag.
- **15 — From α to g**: QED series, 11.4 matching digits.
- **16 — Coda**: recap, companion papers, "I ≥ 0 — the universe climbing."

---

## § Gotchas / lessons learned

These bit us during construction — memorize them.

### HTML/JS

- **Bare `>` and `<` in prose break module script loading.** Always use `&gt;` and `&lt;` in prose text like "cos(Δθ) &gt; 4/r" or "K &gt; 0" — otherwise the HTML parser confuses itself, the `<script type="module">` tag isn't reached, and you see silent non-loading with no console errors. Took ~two hours to diagnose the first time.
- **Use `runWhenVisible(canvas, fn)` for every animation loop** — it does the initial sync draw + IntersectionObserver-gated RAF. `visible = true` default + initial draw inside a try/catch. Robust against observer timing.
- **Every IIFE in a section shares one `<script type="module">`.** If one throws during top-level setup (e.g., references a missing DOM id), all later IIFEs never execute. Always add clean error handling.
- **Consistent breadcrumb pattern** — use `<nav class="breadcrumb"><a>← contents</a><span class="sep">·</span><span class="section-num">section NN / 15</span></nav>`.

### Pedagogy

- **The "click" of learning is visible in the K-field (bonds), not the cell colors alone.** Coloring cells by phase or by drive is ambiguous. The cleanest approach is **drive-signature × local-coherence** — cells fade to neutral cream when unlocked, bloom into pattern colors when locked.
- **Guided tours beat free controls** when the goal is "make a specific point land." Section 6's memory tour is a 5-step Next/Prev walk that beats free knobs.
- **Browser extensions (especially MetaMask's SES lockdown) can break ES module loading.** If a user reports nothing rendering, first ask them to test in incognito.
- **Always explain what each axis is** in plots (Section 4 potential V(K) needed a prose block explicitly naming X = K, Y = cost).

### Physics

- **K is dynamical.** Every computation using fixed K is a quenched approximation — always label it. This is in AGENTS.md and `.gpd/AGENT_BOOTSTRAP.md`.
- **`r = 5.9` is determined self-consistently** by `⟨K⟩_bulk = 16/π²` on the chiral vortex phase profile. In standalone demos where we expose it as a slider, say so in prose.
- **Bistability** — at moderate frequency gaps, whether a bond lives or dies depends on initial K (cold vs warm start). This IS the physics; it models memory.
- **Single-bond CLR overshoots K_bulk**. A single bond in isolation goes to K_eq ≈ 2.1, not 16/π² ≈ 1.62. The lower value emerges only when vortex topology is present and pushes back. This is the key insight for Chapter 9.

### Open derivation (critical — don't paper over)

The LCE embedding weight **R₀²/(z(z−1))** is physically motivated but not rigorously derived. The paper flags this in §5-9 ("Open derivation" paragraph) and in the Open Questions list. It's defended with three pieces of evidence:
1. Progressive convergence across LCE orders (28,800 → 6.7 → 1.5 ppb with oscillation around CODATA)
2. Magnitude consistent with geometric suppression R₀²/(z(z−1)) ≈ 0.008 per layer
3. Candidate enumeration in `scripts/two_vertex_lce.py` rules out a dozen plausible alternatives

Do not quietly strengthen the claim. Until someone writes a rigorous LCE derivation producing R₀² as the unique shared-bond coherence factor, it stays flagged.

---

## § Practical how-tos

### Compile the paper

```
cd papers/publication/coherence_lattice_alpha
make    # or: pdflatex paper && bibtex paper && pdflatex paper && pdflatex paper
```

### Start the explorable dev server

```
cd papers/standalone/coherence_lattice_alpha/explorable
python3 -m http.server 8089 --bind 0.0.0.0
```

Then desktop: http://localhost:8089/  · LAN: http://192.168.1.81:8089/

### Sync changes from publication → standalone

```
SRC=papers/publication/coherence_lattice_alpha
DST=papers/standalone/coherence_lattice_alpha
cp "$SRC/paper.tex" "$DST/"
cp "$SRC/paper.pdf" "$DST/"
cp "$SRC/paper.bbl" "$DST/"
cp "$SRC/references.bib" "$DST/"
cp -r "$SRC/explorable/" "$DST/"
```

(Sync only the files actually edited — don't nuke directory contents unnecessarily.)

### Commit and push

```
cd papers/standalone/coherence_lattice_alpha
git add <files>
git commit -m "..."
git push origin main
```

### Verify scripts still work

```
cd papers/standalone/coherence_lattice_alpha
python3 scripts/alpha_137_verification.py      # → 1/α = 137.032051
python3 scripts/g_factor_from_lattice.py       # → g = 2.002319371
python3 scripts/living_vs_static_alpha.py      # → static 143, living 137
```

(Python environment: pyenv 3.11 under `.venv/` in the `coherence_lattice/` root — or any venv with numpy+scipy+matplotlib.)

---

## § Outstanding / unresolved

- **Frequency-learning demo removed from Section 6.** The corner/perimeter-driver + uniform interior physics didn't cleanly demonstrate the user's token-coupling use case. Revisit if a meaningful temporal-drive demo is needed — probably requires spatial drive-pattern + temporal-frequency together.
- **Inline SVG in section 06 NPD diagram** uses no xmlns attribute; works in Chrome/Safari/Firefox but verify on Edge before final publication.
- **Mobile scroll performance** is now acceptable thanks to IntersectionObserver, but section 6 (four figures) may still be heavy on older phones.

---

## § Quick-start template for a new section

```
explorable/sections/XX-slug.html  (new file)

Structure:
1. <!DOCTYPE html> boilerplate, link to ../css/style.css
2. <nav class="breadcrumb"> with section NN / 15
3. <h1>Title<span class="subtitle">subtitle</span></h1>
4. <p class="lead">Opening paragraph.</p>
5. Prose + <figure id="fig-X"> blocks with <canvas> + <div class="controls">
6. Interactive equation blocks where applicable:
   <div class="equation-block" id="eq-X">
     <div class="eq-display"> ...clickable <span class="eq-symbol"> spans... </div>
     <p class="eq-prompt">Click any symbol...</p>
     <div class="eq-detail"></div>
     <div class="eq-howitworks"><span class="label">In words</span>...</div>
   </div>
7. <nav class="nav-links"> prev/next at bottom
8. <script type="module">
     import { setupHiDPICanvas, wireEquation, R0, runWhenVisible, coherenceMetrics, drawMetricsStrip } from '../js/common.js';
     wireEquation('eq-X', { symbolA: {name, pronounce, description}, ... });
     (() => { /* IIFE for Figure X */ ... runWhenVisible(canvas, () => { step(); draw(); }); })();
   </script>
```

Key: **USE `&gt;` AND `&lt;` IN PROSE INSTEAD OF `>` AND `<`** if they appear outside tags.

---

## § Next session: §8 Figure 3 — 3D vortex line on diamond

This is what's deferred to a fresh context. The goal: demonstrate — visually and rigorously — that **in 3D, a vortex is a line, not a point**. You watched §7 conclude with point vortices annihilating on a 2D torus at step 40k; §8 Figures 1 and 2 built up why the lattice must be 3D diamond; now Figure 3 shows the vortex *on* that lattice and confirms the topology survives.

### Must-read files (in order) for the next session

1. **`HANDOFF.md` (this file)** — complete context (you're reading it).
2. **`AGENTS.md`** — physics spine. Read §4 "The Phase Vortex" especially, since Figure 3 is the 3D analogue of §4.1 "Vortex Formation" and §4.2 "Chiral Downfold".
3. **`paper.tex`**, specifically:
   - §3.1 "Why Diamond: The Selection Theorem" (lines 280–332) — filters 1–5, enumeration table, already covered by Figures 1+2 but relevant context for the vortex-line claim (filter 5).
   - §3.3 "Dirac Equation Emergence" (lines 385–431) — bipartite chiral Bloch Hamiltonian, nodal lines — relevant for §9 (electron) but useful context for the vortex's bound state.
   - §4.1 "Vortex Formation" (lines 449–489) — paper's description of spontaneous vortex generation on diamond, the ~70% core-bond death statistic, the 3-regime r-window, CLR co-evolution protocol.
4. **`explorable/js/lattice3d.js`** — the 3D renderer you'll use for Figure 3. Key exports to use:
   - `diamondLattice({ nCells = 2, a = 1 })` → `{ atoms, bonds, bondLength }`
   - `makeCamera`, `attachCameraControls`, `renderScene` — same as Figure 2
   - `orientCameraAlongAxis(camera, axis)` — snaps camera to look down a given axis
   - `centralTetrahedron(scene)` — useful if you want to isolate one atom's coordination for close-up views
5. **`explorable/sections/08-diamond.html`** — Figures 1+2 live here. Figure 3 can either append to the same file as a new `<figure>` block (consistent with how §6 and §7 are organised) or be a new file; appending is simpler.
6. **`explorable/sections/07-vortices.html`**, specifically Figure 4 — the 32×32 atan2-seeded vortex on a 2D torus. Figure 3 is essentially the *3D analogue* of the seeding logic there, just on diamond. Reuse the `atan2(y−y_c, x−x_c)` phase seed idea. Since our vortex on diamond will be a line along the z-axis, the seed is *independent of z*.
7. **`scripts/da1_spontaneous_vortex.py`** (relevant Python reference, don't need to read in full, but worth knowing it exists) — the paper's canonical spontaneous-vortex-on-3D-diamond script. Uses Kuramoto + Shannon+Fiedler CLR co-evolution. For the Figure 3 demo we are *not* running CLR — we're showing the static vortex-line seed.

### The physics to show

**Target visualization:**

- Use `diamondLattice({ nCells: 3, a: 1 })` (or 2, depending on atom count you want) — maybe ~100 atoms.
- Colour each atom by a seeded vortex phase: `θ(x, y, z) = atan2(y − y_c, x − x_c)`. **Note**: the phase is independent of *z*. That's what makes this a vortex *line* (along the z-axis) rather than a point.
- Use the same HSL phase-to-hue mapping we've used throughout (red = 0, green = π/2, cyan = π, magenta = −π/2).
- Keep the bipartite A/B sublattice structure visible too — maybe as an atom outline colour or a subtle ring around each atom. The reader should see **both** the sublattice alternation *and* the phase colouring simultaneously — that's the setup for §9's chiral downfold (the vortex bound state localises on *one* sublattice).

**What the reader should see on rotation:**

1. **Looking down the z-axis (default or from a preset button):** a rainbow pinwheel — exactly Figure 2 of §7 — but now on the diamond sublattice colour instead of a flat grid. 4-fold or 3-fold symmetry visible.
2. **Looking from the side:** the same pinwheel *repeats at every z-slice*, forming a **stack of rainbow disks** threaded by the vortex line.
3. **Oblique view:** a visible line of phase singularity passing vertically through the crystal.

### Proposed controls for Figure 3

- **Camera shortcuts** (inherited from `attachCameraControls`): drag rotate, shift+drag pan, wheel zoom.
- **Preset buttons:**
  - `View down [001]` — camera along z-axis → see the pinwheel face-on (head-on view of the vortex line).
  - `View from side` — camera along x-axis → see the vortex line as a literal line, with rainbow repeating in every z-slice.
  - `Oblique view` (default) — see the 3D extent.
- **Optional: "Let them oscillate"** toggle — advance all phases by a common ω·dt per frame. Same as in §7 Figure 1. The whole rainbow pattern rigidly rotates but the vortex line stays fixed. Demonstrates that the winding is preserved under common rotation.
- **Optional: "Highlight core plaquettes"** — mark the 4 plaquettes immediately surrounding the vortex line (at each z-slice) with a burgundy halo. Those are the "core" bonds whose Shannon-vs-Fiedler fate we explored in §7 Figure 4. They form a *tube* of core bonds along the line.

### Prose to add around Figure 3

Before the figure, you already have (in `08-diamond.html`):

> With the lattice picked out, the last thing to see is the object that lives on it. In Chapter 7 we watched a vortex sit at a single point on a 2D grid. In three dimensions, a vortex is no longer a point: it is a *line* threading through the crystal, with phases winding 2π around any circle transverse to it. …

After the figure, write roughly:

> Rotate the lattice and look at the vortex from every angle. Down the z-axis: a rainbow pinwheel, just like §7 Figure 2. From the side: that pinwheel repeats in every horizontal slice of the crystal, stacked into a tube. The vortex is a line, and every plane perpendicular to that line carries the same 2π winding. Annihilation — which took out our 2D vortex pair at step 40k — would require this whole line to collapse into its antipartner along *every* slice simultaneously. The free energy cost is now proportional to the line's length; long lines are effectively immortal on CLR timescales.
>
> Notice also how the rainbow is painted on top of the diamond's bipartite A/B structure. The vortex doesn't care about sublattice — phases wind equally around A and B atoms — but **the bound state will.** In §9, we'll see that the quantum state localised *at* this vortex line has its amplitude concentrated on just one of the two sublattices. That is the chiral downfold; it's what turns a U(1) phase defect on a bipartite lattice into a spin-½ fermion. In other words, it is what makes this line an electron.

### Scope for the session

Minimum scope to call Figure 3 shipped:
- atan2-seeded phase colouring on `diamondLattice(nCells=3)` using `lattice3d.js`
- Drag/pan/zoom inherited
- One preset to view from the side (see the line)
- Prose above and below in place

Stretch goals (do only if there's time):
- Let-them-oscillate toggle
- Core-plaquette highlight
- Animated camera transition between preset views

### After Figure 3, before starting §9

- Tick `OUTLINE.md` §8 status to ✅ DONE.
- Remove `coming soon` from §8 in `explorable/index.html`.
- Commit as `Section 8 (Why the diamond lattice) complete` with a similar style to the §7 commit.
- Push to GitHub.
- Then start §9 (The electron) — see its OUTLINE stanza.

### Referenced paper pieces for §9 (after Figure 3)

Just so the §9 session doesn't have to rediscover these:

- `paper.tex` §3.3 "Dirac Equation Emergence" — the chiral Bloch Hamiltonian H(k) = [[0, f(k)], [f*(k), 0]] and its linear spectrum at nodal points.
- `paper.tex` §3.4 "The Two Sectors" — explicit split of phase sector (U(1), this paper) vs frame sector (SO(3), deferred).
- `paper.tex` §4.2 "The Chiral Downfold" — bound state localises on one sublattice.
- `paper.tex` §4.3 "Topological Protection: a_{1, frozen} = 0" — why α is a property of the *vacuum*, not the bound state.
- `paper.tex` §4.5 "Confined-Photon Bridge" — Table 2, the one-line formula *Electron = Vortex(n=1) + frame(j=1/2)*.
- `AGENTS.md` §Two Sectors and §Chiral downfold.
- `scripts/d9_frame_gfactor.py`, `scripts/koide_d9_protocol.py` — frame-sector scripts (we don't use them in §9, but they exist for context).

### Verifying §8 Figure 3 works

No node test — this is a pure visual figure. Sanity checks in the browser:
- 100–200 atoms, renders at 60 fps.
- Rainbow pinwheel is visible from [001] view.
- Side view shows stacked rainbow disks with a clear central line.
- Drag / shift-drag / wheel all work as in Figures 1+2.
- If you add the let-them-oscillate toggle, the winding-invariance is obvious — cells cycle hue but the pinwheel pattern doesn't unwind.
