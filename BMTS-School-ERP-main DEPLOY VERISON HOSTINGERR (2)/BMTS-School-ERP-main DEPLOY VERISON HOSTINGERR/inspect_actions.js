const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Let's find Admin Report Card table actions
const adminReportCardsMatch = js.indexOf('ReportCardManagement');
console.log('ReportCardManagement match:', adminReportCardsMatch);

// Let's search for table row actions in report cards
const actionMatches = [];
let idx = 0;
while ((idx = js.indexOf('View Report Card', idx)) !== -1) {
  console.log('\n--- Match "View Report Card" at', idx, '---');
  console.log(js.substring(Math.max(0, idx - 400), idx + 400));
  idx += 16;
}

// Search for modal buttons (Download PDF, Print, Close, Edit)
let modalIdx = 0;
while ((modalIdx = js.indexOf('Download PDF', modalIdx)) !== -1) {
  console.log('\n--- Match "Download PDF" at', modalIdx, '---');
  console.log(js.substring(Math.max(0, modalIdx - 400), modalIdx + 400));
  modalIdx += 12;
}
