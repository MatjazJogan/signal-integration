# signal-integration

Interactive demonstration of

> M. Jogan and A. A. Stocker, **Signal integration in human visual speed perception**,
> *Journal of Neuroscience* 35(25):9381–9390, 2015. doi:[10.1523/JNEUROSCI.4801-14.2015](https://doi.org/10.1523/JNEUROSCI.4801-14.2015)

**▶ [Run the experiment](https://matjazjogan.github.io/signal-integration/)**

A moving object drives many spatiotemporal frequency channels at once, yet we perceive a single speed. The paper asked how the visual system combines these channels, and found that human speed percepts are predicted by a Bayesian observer that integrates the channel likelihoods optimally before applying a prior for slow speeds, and not by observers that rely on the most reliable channel or average per-channel estimates.

`index.html` reproduces this logic with two spatial-frequency channels in a single self-contained page (no build step, no dependencies beyond Google Fonts).

## Experiment

Observers compare the speeds of two band-limited noise gratings (bandwidth 0.04 ω<sub>s</sub>, 4° raised-cosine aperture, 6° eccentricity, 600 ms). The test always drifts at 3°/s; the reference speed follows two interleaved staircases per condition. After each presentation a white square marks one grating and the observer reports whether the marked grating was faster or slower, which keeps response bias out of the measurement.

| Run | Conditions (test / reference) | Role |
| --- | --- | --- |
| 1 | A / A, A / R, R / R | fit |
| 2 | B / B, B / R, R / R | fit |
| 3 | A+B / A+B, A+B / R | predicted |

A and B are the two channels (default 1 and 4 c/°); R, the common reference, is the A+B compound at higher contrast. The page includes a screen calibration (bank-card match and viewing distance) to express stimuli in degrees of visual angle. Contrast is nominal, as the display is not gamma-corrected.

## Model

Speed is represented as s = log(1 + v/0.3). Each channel contributes a Gaussian likelihood of width σ<sub>X</sub>, and the prior is locally log p(s) = as + b. For a compound stimulus the three observers predict

| Model | Mean of percept | Variance of percept |
| --- | --- | --- |
| Optimal integration | s + aσ², with 1/σ² = Σ 1/σ<sub>X</sub>² | σ² |
| Most reliable channel | s + aσ<sub>min</sub>² | σ<sub>min</sub>² |
| Channel averaging | s + (a/k) Σ σ<sub>X</sub>² | Σ σ<sub>X</sub>² / k² |

All three are identical for single-channel stimuli, so σ<sub>A</sub>, σ<sub>B</sub>, σ<sub>R</sub> and a are fitted once (maximum likelihood, 2AFC signal-detection model of Eq. 16) to runs 1 and 2. Run 3 is then predicted without free parameters, and the models are compared by goodness of prediction: the negative log-likelihood of the run-3 responses, placed between chance (a coin flip) and the data (empirical response proportions).

The *Simulated observer* tab runs the same procedure on a model observer with chosen parameters and integration rule, including a 50-session recovery test. With the standard session (280 trials) and parameters typical of the original observers, the true rule predicts best in about 55–70% of sessions.

## Collecting data

Finished sessions are always offered for download as JSON and kept in the browser's local storage. To collect them centrally, send each session to a Google Sheet through a small Apps Script web app (no server or database):

1. Create a Google Sheet, open **Extensions → Apps Script**, and replace the editor contents with [`apps-script/Code.gs`](apps-script/Code.gs). Save.
2. **Deploy → New deployment → Web app**. Set *Execute as* to **Me** and *Who has access* to **Anyone**. Authorise when prompted and copy the web-app URL (it ends in `/exec`).
3. In `index.html`, set `const SHEET_ENDPOINT = '<that URL>';` and push. Opening the URL in a browser shows a short "running" message.

Each session becomes one row of the `sessions` sheet: identifiers, the fitted parameters and per-model negative log-likelihoods, followed by the settings and the full trial list as JSON. Trials are stored as `[cond, ref_minus_test_logspeed, ref_seen_faster, marked_side, test_side, drift_dir, rt_ms]`, with conditions indexed as in `conditions`. A saved session (downloaded JSON) can be re-analysed with **Analyse a saved session** on the page.

Anyone with the URL can post to the sheet, so treat it as a collection inbox rather than a trusted record, and collect participant codes rather than names.

## Hosting

The page is served by GitHub Pages from the root of the default branch (**Settings → Pages → Deploy from a branch → `main` / `/ (root)`**).
