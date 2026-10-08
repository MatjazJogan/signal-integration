/**
 * Signal integration in human visual speed perception: collect finished sessions in a Google Sheet.
 *
 * Deploy this script as a web app bound to a Google Sheet (see README, "Collecting data").
 * Each POST from the demo page appends one row: summary columns for quick inspection,
 * followed by the full settings and trial list as JSON.
 */
const SHEET_NAME = 'sessions';
const HEADER = [
  'received', 'session_id', 'participant', 'started', 'finished', 'n_trials', 'px_per_deg',
  'sigma_A', 'sigma_B', 'sigma_R', 'prior_a', 'nll_opt', 'nll_max', 'nll_avg', 'nll_chance', 'nll_data', 'best_model',
  'settings_json', 'trials_json', 'user_agent'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(HEADER);
    const f = d.fit || {};
    sh.appendRow([
      new Date(), d.session_id, d.participant, d.started, d.finished, (d.trials || []).length, d.px_per_deg,
      f.sigma_A, f.sigma_B, f.sigma_R, f.prior_a, f.nll_opt, f.nll_max, f.nll_avg, f.nll_chance, f.nll_data, f.best_model,
      JSON.stringify({ settings: d.settings, screen: d.screen, conditions: d.conditions, trial_fields: d.trial_fields }),
      JSON.stringify(d.trials), d.user_agent
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web-app URL in a browser shows that the deployment is live.
function doGet() {
  return ContentService.createTextOutput('Signal integration data endpoint is running.');
}
