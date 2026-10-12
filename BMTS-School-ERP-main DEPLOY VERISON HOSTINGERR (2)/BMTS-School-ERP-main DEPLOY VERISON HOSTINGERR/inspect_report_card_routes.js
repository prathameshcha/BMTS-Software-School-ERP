const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Find occurrences of /report-cards
let idx = 0;
while ((idx = js.indexOf('report-cards', idx)) !== -1) {
  console.log('\n=== Match "report-cards" at index', idx, '===');
  console.log(js.substring(Math.max(0, idx - 150), idx + 250));
  idx += 12;
}
