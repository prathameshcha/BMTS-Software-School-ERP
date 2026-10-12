const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// 1. Find all occurrences of Choose Remarks and see what component it is in
const chooseRemarksIdx = js.indexOf('Choose Remarks');
console.log('Choose Remarks Index:', chooseRemarksIdx);
if (chooseRemarksIdx !== -1) {
  console.log('Context around Choose Remarks:');
  console.log(js.substring(Math.max(0, chooseRemarksIdx - 500), chooseRemarksIdx + 500));
}

// 2. Find Report Card Table columns / actions (Admin and Faculty)
const tableMatches = [];
let idx = 0;
while ((idx = js.indexOf('/api/report-cards', idx)) !== -1) {
  console.log('\n--- /api/report-cards match at', idx, '---');
  console.log(js.substring(Math.max(0, idx - 300), idx + 400));
  idx += 17;
}
