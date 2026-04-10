# Agent Guide: Coherence Lattice Alpha

This document gives an AI agent everything needed to understand, verify, and extend the work in this repository.

## The Core Idea

Couplings are alive.

Standard physics treats the coupling between oscillators as a fixed parameter. This paper treats it as a dynamical variable with its own equation of motion — the **Coherence Learning Rule** (CLR). The CLR maximizes *coherence capital*: the product of phase alignment and structural richness. This single principle produces:

1. A self-organizing binary coupling field (alive bonds / dead bonds)
2. Spontaneous topological defects (vortices)
3. Selection of the BKT critical point as the unique operating point
4. The fine structure constant α = 1/137.036 as a byproduct

The paper derives α from zero free parameters. The only inputs are π, e, Bessel functions I₀/I₁, and the coordination number z = 4 (diamond lattice).

## The Derivation Chain

Every step from lattice geometry to α. Steps marked ► require the CLR; everything else is standard physics.

```
1.  Diamond lattice: z = d + 1 = 4                    [Geometry]
►2. CLR dynamics → binary K-field (dead/alive)         [CLR threshold]
►3. CLR + vortex topology → K_eff = K_BKT              [CLR × BKT]
4.  BKT critical coupling: K_BKT = 2/π                 [Established]
5.  Simplex projection: cos_eff = (d−1)/d = 2/3        [Proven]
6.  Bessel coherence: R₀ = I₁(K)/I₀(K) = 0.30320      [XY partition fn]
7.  Star graph vertex: V = R₀⁴ = 0.00845               [Exact]
8.  Lattice Green's fn: G_diff = 1/z = 1/4             [Proven]
9.  Variance ratio: base = π/z = π/4                    [Proven]
10. Normalized variance: σ² = 2η = 1/2                  [Proven]
11. DW intensity factor: n = exp(−σ²) = 1/√e            [Derived]
►12. CLR fixed point on vortex profile → r* = 5.905     [CLR self-consistency]
13. BKT formula: 1/α_BKT = 137.032                      [Steps 5–11]
14. Two-layer LCE: c = 2.9858                            [Derived]
15. Crossover scale: l = 1 − c·V = 0.97477              [From 14]
16. VP integral: 1/α = 137.035999                        [One-loop QED]
17. QED series: g = 2.002319304355                       [Standard QED]
```

Remove the three CLR steps and the derivation collapses.

## Key Equations

### The CLR

```
K̇_ij = η[R₀(K_ij)·cos(Δθ_ij) − 2λK_ij] + η·I_phase·S_ij
```

- **Shannon channel** (first term): drives each bond toward its local information optimum. Creates the dead/alive binary field.
- **Fiedler channel** (second term): structural gradient S_ij detects graph bottlenecks and injects coupling where topology demands it. Budget-conserving: Σ S_ij = 0.

### The α Formula

```
α = R₀(2/π)⁴ × (π/4)^(1/√e + α/(2π))
```

- R₀(2/π)⁴: star graph vertex factor (97% of ln α)
- (π/4)^n: BKT power-law running (3% of ln α)
- 1/√e: Debye-Waller intensity at CLR fixed point
- α/(2π): Schwinger self-consistency correction

### The Master Equation (with VP)

```
1/α = 1/α_BKT + F(Q_match²/m_e²)/(3π)
```

where Q_match = Q_lat · exp(−l), l = 1 − c·V, and c is the linked-cluster expansion coefficient.

## Proven Identities

These are the load-bearing results. All have proofs in the paper appendices.

| Identity | Value | Proof |
|----------|-------|-------|
| G_diff = G(0,0) − G(0,nn) | 1/z | Graph Laplacian row sum |
| cos_eff (simplex projection) | (d−1)/d = 2/3 | Trace of simplex tensor |
| base = lattice/RG variance ratio | π/z | Algebraic (K cancels) |
| σ² = normalized NN variance | 1/2 | Three independent derivations |
| V = star graph vertex | R₀^z | Leaf independence |
| Budget conservation | Σ S_ij = 0 | Mean subtraction |
| K-scaling invariance | H²_A ∝ K² | Bipartite factorization |

## The Two Sectors

The diamond lattice supports two independent dynamical sectors:

**Phase sector (U(1))** — This paper's subject.
- Order parameter: θ_i ∈ S¹ (phase)
- Topological defects: vortices (π₁(S¹) = Z)
- Transition: BKT at K_BKT = 2/π
- Physics: electromagnetism, charge, α

**Frame sector (SO(3))** — Deferred to companion paper.
- Order parameter: R_i ∈ SO(3) (rotation frame)
- Topological defects: Skyrmions (π₃(SU(2)) = Z)
- Physics: strong force, spin-1/2, mass
- Cross-sector coupling: cos(Δθ)·tr(R^T R')/3

The vortex (phase defect) acquires spin-1/2 from the frame sector through the holonomy of the frame connection around the vortex core: transporting a frame around a unit vortex produces a sign flip R → −R, which is nontrivial in π₁(SO(3)) = Z₂, forcing the bound state into a half-integer representation.

## Scripts

All scripts are self-contained Python. Dependencies: numpy, scipy, matplotlib.

### Core Verification (run these first)

| Script | What it verifies | Runtime |
|--------|-----------------|---------|
| `alpha_137_verification.py` | Full α formula, self-consistent iteration | < 1s |
| `g_factor_from_lattice.py` | α → QED series → g-factor (11.4 digits) | < 1s |
| `living_vs_static_alpha.py` | Static gives 143, living gives 137 | < 1s |
| `diamond_greens_function.py` | G_diff = 1/z to machine precision | < 10s |
| `two_vertex_lce.py` | LCE exploration, embedding weights | < 5s |
| `double_plaquette_lce.py` | Single-vertex binomial LCE | < 5s |

### Lattice Dynamics

| Script | Purpose |
|--------|---------|
| `da1_spontaneous_vortex.py` | Spontaneous vortex nucleation on 3D diamond via co-evolution |
| `clr_bkt_convergence.py` | Shannon CLR on 2D square (baseline) |
| `diamond_clr_convergence.py` | Shannon+Fiedler CLR on 3D diamond → K_bulk = 16/π² |
| `fiedler_proof.py` | Fiedler sensitivity (w₀/ε)² scaling over 4 decades |

### Supporting

| Script | Purpose |
|--------|---------|
| `alpha_crossover_scale.py` | VP crossover matching |
| `bkt_rg_flow.py` | BKT RG flow visualization |
| `running_alpha_curve.py` | Running α(Q) from lattice to Thomson limit |
| `electron_mass_from_lattice.py` | Lattice spacing h = (√3/2)λ_C |
| `plaquette_correction_alpha.py` | MC vertex factor measurement |
| `vertex_rg_flow.py` | Vertex RG flow at BKT |
| `vD_eff_measurement.py` | Dirac velocity v_D² = 1/3 |

### Frame Sector (exploratory, not in paper)

| Script | Purpose |
|--------|---------|
| `d9_frame_gfactor.py` | Frame sector g-factor measurement |
| `d9_vortex_mc_gauge.py` | Monte Carlo gauge field on vortex |
| `gauge_skyrmion.py` | Skyrmion topological soliton |
| `skyrmion_spontaneous.py` | Spontaneous Skyrmion nucleation |
| `coupled_vortex_skyrmion.py` | Cross-sector coupling |
| `koide_cross_section_measurement.py` | Lepton mass ratio measurement |
| `koide_d9_protocol.py` | D9 protocol for Koide formula |

## First Principles

When extending this work, these are the axioms and constraints to respect:

1. **K is dynamical.** Every computation using fixed K is a quenched approximation. Always label it as such and note what K-fluctuations would change.

2. **The CLR is gradient descent on a potential.** Shannon channel: V(K) = −cos(Δθ)·ln I₀(K) + K²/r. This guarantees convergence and uniqueness of the fixed point for each bond.

3. **The Fiedler channel is budget-conserving.** Σ S_ij = 0 exactly. It redistributes coupling, never creates or destroys it. This is what prevents the CLR from overshooting BKT when vortices are present.

4. **BKT is a topological constraint, not a tuning.** The CLR wants K > K_BKT. The vortex requires K ≤ K_BKT to exist as a free excitation. The equilibrium is at the boundary. This is Theorem 5.5 (Vortex Marginality).

5. **The PLM Lemma freezes K.** At a phase-locked mode, every bond coupling converges exponentially to a unique fixed point. This eliminates the dynamical-K caveat and determines the exponent: evaluate at the attractor, don't integrate along the trajectory.

6. **Diamond is selected, not chosen.** Five filters (Bravais rank, bipartite, O_h symmetry, 2-site cell, d ≥ 3 for vortex persistence) uniquely select diamond among all 3D lattices.

7. **The 97/3 decomposition.** 97% of ln α comes from the star graph vertex V = R₀⁴ (local, per-bond coherence cost). 3% comes from BKT power-law running (global, RG correction). The LCE converges geometrically because it corrects only the 3%.

## Key Numbers

```
K_BKT    = 2/π        = 0.6366197724
K_bulk   = 16/π²      = 1.6211389383
R₀(K_BKT)             = 0.3032024617
V = R₀⁴               = 0.0084514435
base = π/4             = 0.7853981634
σ²                     = 0.5
n = 1/√e               = 0.6065306597
η = 1/(2πK_BKT)        = 0.25
1/α_BKT                = 137.032051
c (two-layer LCE)      = 2.9858
l = 1 − c·V            = 0.97477
Q_lat = 2/√3 m_e       = 0.5901 MeV
h = (√3/2)λ_C          = 334 fm
1/α (final)            = 137.035999
```

## Conventions

- **R₀(K) = I₁(K)/I₀(K)**: paper convention (single-K argument)
- **R₀_code(K) = I₁(2K)/I₀(2K)**: code convention in some older scripts. Paper convention is canonical.
- **K_BKT = 2/π**: per-bond critical coupling (not K_bulk)
- **K_bulk = 16/π² = z·K_BKT²**: the coupling alive bonds converge to
- **base = π/z**: lattice-to-RG variance ratio (K cancels)
- **σ² = 1/(πK_BKT) = 1/2**: normalized nearest-neighbor phase variance (z cancels)

## Open Directions

### Near-term (computational, this repo)

1. **K_bulk convergence at large L.** Current data: L=6 (1.590), L=8 (1.638), bracketing 16/π² = 1.621. GPU runs at L=16, 24, 48 would nail this.
2. **Three-vertex LCE.** The triple chain correction is estimated at O(10⁻⁴). Computing it would test whether the LCE converges as predicted.
3. **Spontaneous vortex statistics.** What fraction of random initial conditions produce unit-charge vortices vs higher winding? Is unit charge preferred?

### Medium-term (companion papers)

4. **Lepton generations.** The muon and tau masses emerge from hexagonal plaquette degrees of freedom on the diamond lattice, not the naive Casimir tower. This is derived separately.
5. **Gauge sector.** SO(3) frame dynamics with SU(2) Wilson links, Skyrmion confinement, proton mass ratio.
6. **VCO oscillator bench.** Physical experiment: 16–50 voltage-controlled oscillators in diamond topology with CLR feedback. Predicted: vortex formation, binary K-field, K_bulk → 16/π².

### Long-term (open questions)

7. **Gravity.** Phase gradient interpretation of spacetime curvature. Speculative.
8. **Running coupling.** Full α(Q) curve from lattice UV to Q = 0 across all SM fermions. Preliminary: 1/α(M_Z) = 127.74 (vs ~128.9 experimental).
9. **UV completion.** Above Q_match, α = α_BKT = 1/137.032 (flat, no Landau pole). Implications for BSM physics.

## Verification Checklist

When modifying or extending the derivation, verify:

- [ ] α_137_verification.py still gives 1/α = 137.032051
- [ ] g_factor_from_lattice.py still gives g = 2.002319304355
- [ ] living_vs_static_alpha.py still shows static = 143, living = 137
- [ ] diamond_greens_function.py still gives G_diff → 1/4
- [ ] Paper compiles: `make` in the repo root
- [ ] No new free parameters introduced
- [ ] Any fixed-K computation is labeled as quenched approximation
