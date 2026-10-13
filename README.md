# signal-integration

Interactive companion to

> M. Jogan and A. A. Stocker (2015). **Signal integration in human visual speed perception.**
> *Journal of Neuroscience* 35(25):9381–9390. doi:[10.1523/JNEUROSCI.4801-14.2015](https://doi.org/10.1523/JNEUROSCI.4801-14.2015)

**▶ [Run the experiment](https://matjazjogan.github.io/signal-integration/)**

A moving object excites many spatiotemporal frequency channels at once, yet we perceive a single speed. In this study we asked how the visual system combines these signals. We measured speed discrimination for stimuli that each targeted a single channel, fitted a Bayesian observer with a prior for slow speeds, and predicted perception of stimuli that drive several channels at once. Only an observer that integrates the channel likelihoods optimally, before applying the prior, accounted for the data; observers that rely on the most reliable channel or average per-channel estimates did not.

<p align="center"><img src="img/integration-models.svg" alt="Three ways to combine two speed channels: optimal integration, most reliable channel and channel averaging" width="100%"></p>

`index.html` lets anyone repeat a two-channel version of the experiment in the browser and see the same analysis applied to their own responses. It is a single self-contained page.

## Experiment

Observers compare the speeds of two band-limited noise gratings (bandwidth 0.04 ω<sub>s</sub>, 4° raised-cosine aperture, 6° eccentricity, 600 ms). The test drifts at 2°/s (3°/s in the original study), and reference speeds, between about 0.6 and 5.4°/s, are set by two weighted staircases per condition converging on 85% and 15% “reference faster”, away from the PSE where the slope is measured best. A white square then marks one grating and the observer reports whether it was faster or slower, which keeps response bias out of the measurement.

| Stage | Conditions (test / reference) | Role |
| --- | --- | --- |
| Calibration | A / A, B / B | sets each contrast to σ ≈ 0.42 |
| Blocks 1–3 | A / A, B / B, A+B / A+B, interleaved | A, B fit; A+B predicted |

All conditions are balanced: test and reference share the same spectrum and differ only in speed. A and B are single-channel gratings, by default 0.5 and 2 c/°, two octaves apart so that the channels respond independently. As in the original study, a calibration first adjusts the contrast of each until discrimination at references ±0.4 log units from the test is 75% correct (σ = 0.6/√2): equally reliable channels separate the models best, and well above threshold speed discrimination saturates and the channels may suppress each other. Conditions are interleaved in every block so that no block adapts the observer to one grating. Low contrasts are rendered with random dithering to get below the 8-bit grey-level step. The page measures the display refresh rate and caps speeds so that no grating aliases in time. A bank-card match and the viewing distance calibrate the display in degrees of visual angle. Contrast is nominal, as the display is not gamma-corrected.

## Model

Speed is represented as s = log(1 + v/0.3). Each channel contributes a Gaussian likelihood of width σ<sub>X</sub>, and the prior is locally log p(s) = as + b. For a compound stimulus the three observers predict

| Model | Mean of percept | Variance of percept |
| --- | --- | --- |
| Optimal integration | s + aσ², with 1/σ² = Σ 1/σ<sub>X</sub>² | σ² |
| Most reliable channel | s + aσ<sub>min</sub>² | σ<sub>min</sub>² |
| Channel averaging | s + (a/k) Σ σ<sub>X</sub>² | Σ σ<sub>X</sub>² / k² |

In balanced conditions the prior shifts test and reference alike and cancels; the psychometric function has standard deviation √2·σ, so the single-channel conditions fix σ<sub>A</sub> and σ<sub>B</sub> directly. The compound condition is then predicted without free parameters (optimal σ<sub>A</sub>σ<sub>B</sub>/√(σ<sub>A</sub>²+σ<sub>B</sub>²), most reliable σ<sub>min</sub>, averaging √(σ<sub>A</sub>²+σ<sub>B</sub>²)/2), and the models are compared by goodness of prediction: the negative log-likelihood of the compound-condition responses, scaled between chance and the empirical response proportions. The analysis also reports how often the verdict survives bootstrap refits of the single-channel conditions.

The demo therefore tests the precision side of the study. Perceived speed, and with it the prior and the speed increase that optimal integration predicts for compound stimuli, requires comparisons between different stimuli, which in the original study were made against the four-channel ABCD reference. With equally reliable channels, optimal integration and averaging predict the same threshold; in simulations of the standard session (270 trials) a truly optimal observer beats the most-reliable prediction in about 75% of sessions and a most-reliable observer is identified in about 85%, so firm conclusions need sessions pooled across observers. The *Simulated observer* tab runs the full procedure on a model observer, including a 50-session recovery test.

A correction to the paper: in Fig. 3b the SD of the balanced psychometric function should read √2·σ<sub>Test</sub>, not σ<sub>Test</sub>/√2, as the Methods (σ = 0.6/√2) and Fig. 3c imply. The analysis uses √2·σ<sub>Test</sub>.

Notes for running the study and collecting data are in [SETUP.md](SETUP.md).
