# signal-integration

Interactive companion to

> M. Jogan and A. A. Stocker (2015). **Signal integration in human visual speed perception.**
> *Journal of Neuroscience* 35(25):9381–9390. doi:[10.1523/JNEUROSCI.4801-14.2015](https://doi.org/10.1523/JNEUROSCI.4801-14.2015)

**▶ [Run the experiment](https://matjazjogan.github.io/signal-integration/)**

A moving object excites many spatiotemporal frequency channels at once, yet we perceive a single speed. In this study we asked how the visual system combines these signals. We measured speed discrimination for stimuli that each targeted a single channel, fitted a Bayesian observer with a prior for slow speeds, and predicted perception of stimuli that drive several channels at once. Only an observer that integrates the channel likelihoods optimally, before applying the prior, accounted for the data; observers that rely on the most reliable channel or average per-channel estimates did not.

`index.html` lets anyone repeat a two-channel version of the experiment in the browser and see the same analysis applied to their own responses. It is a single self-contained page.

## Experiment

Observers compare the speeds of two band-limited noise gratings (bandwidth 0.04 ω<sub>s</sub>, 4° raised-cosine aperture, 6° eccentricity, 600 ms). The test drifts at 3°/s, and the reference speed follows two interleaved staircases per condition. A white square then marks one grating and the observer reports whether it was faster or slower, which keeps response bias out of the measurement.

| Run | Conditions (test / reference) | Role |
| --- | --- | --- |
| 1 | A / A, A / R, R / R | fit |
| 2 | B / B, B / R, R / R | fit |
| 3 | A+B / A+B, A+B / R | predicted |

A and B are single-channel gratings (1 and 4 c/° by default) and R is a broadband reference (octave bands from 0.5 to 4 c/°, our ABCD stimulus) at high contrast. A bank-card match and the viewing distance calibrate the display in degrees of visual angle. Contrast is nominal, as the display is not gamma-corrected.

## Model

Speed is represented as s = log(1 + v/0.3). Each channel contributes a Gaussian likelihood of width σ<sub>X</sub>, and the prior is locally log p(s) = as + b. For a compound stimulus the three observers predict

| Model | Mean of percept | Variance of percept |
| --- | --- | --- |
| Optimal integration | s + aσ², with 1/σ² = Σ 1/σ<sub>X</sub>² | σ² |
| Most reliable channel | s + aσ<sub>min</sub>² | σ<sub>min</sub>² |
| Channel averaging | s + (a/k) Σ σ<sub>X</sub>² | Σ σ<sub>X</sub>² / k² |

The models coincide for single channels, so σ<sub>A</sub>, σ<sub>B</sub>, σ<sub>R</sub> and a are fitted once, by maximum likelihood, to runs 1 and 2. Run 3 is then predicted without free parameters, and the models are compared by goodness of prediction: the negative log-likelihood of the run-3 responses, scaled between chance and the empirical response proportions.

The prior exponent is critical for separating optimal integration from the most reliable channel. The latter predicts that the compound behaves like the better channel, which is measured directly, whereas the optimal prediction extrapolates through a(σ² − σ<sub>R</sub>²). A sharp reference therefore matters, and the analysis reports how often the verdict survives bootstrap refits of runs 1 and 2. In simulations with the standard session (280 trials) and σ<sub>R</sub> ≈ 0.18, optimal integration is separated from the most reliable channel in 70–90% of sessions. The *Simulated observer* tab runs the full procedure on a model observer, including a 50-session recovery test.

A correction to the paper: in Fig. 3b the SD of the balanced psychometric function should read √2·σ<sub>Test</sub>, not σ<sub>Test</sub>/√2, as the Methods (σ = 0.6/√2) and Fig. 3c imply. The analysis uses √2·σ<sub>Test</sub>.

## Data collection

Each finished session is posted to a Google Sheet through a Google Apps Script web app ([`apps-script/Code.gs`](apps-script/Code.gs)), and can also be downloaded as JSON and re-analysed on the page. Each row holds the session identifiers, fitted parameters and per-model log-likelihoods, followed by the settings and the full trial list as JSON. Trials are stored as `[cond, ref_minus_test_logspeed, ref_seen_faster, marked_side, test_side, drift_dir, rt_ms]`, with conditions indexed as in `conditions`.

To collect into a different sheet: create the sheet, paste `Code.gs` into **Extensions → Apps Script**, deploy it as a web app (*Execute as* **Me**, *Who has access* **Anyone**), and set `SHEET_ENDPOINT` in `index.html` to the deployment URL. When changing the script, deploy a new version of the existing deployment so that the URL stays the same.

## Hosting

The page is served by GitHub Pages from the root of the `main` branch.
