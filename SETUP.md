# Running the study

## Data collection

Each finished session is posted to a Google Sheet through a Google Apps Script web app ([`apps-script/Code.gs`](apps-script/Code.gs)), and can also be downloaded as JSON and re-analysed on the page. Each row holds the session identifiers, fitted parameters and per-model log-likelihoods, followed by the settings and the full trial list as JSON. Trials are stored as `[cond, ref_minus_test_logspeed, ref_seen_faster, marked_side, test_side, drift_dir, rt_ms]`, with conditions indexed as in `conditions`.

To collect into a different sheet: create the sheet, paste `Code.gs` into **Extensions → Apps Script**, deploy it as a web app (*Execute as* **Me**, *Who has access* **Anyone**), and set `SHEET_ENDPOINT` in `index.html` to the deployment URL. When changing the script, deploy a new version of the existing deployment so that the URL stays the same.

## Hosting

The page is served by GitHub Pages from the root of the `main` branch.
