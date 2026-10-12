const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Find all occurrences of "Apply Remarks" or "Select up to"
let idx = 0;
while ((idx = js.indexOf('Apply Remarks', idx)) !== -1) {
  console.log('Apply Remarks at', idx, ':');
  console.log(js.substring(Math.max(0, idx - 800), idx + 200));
  idx += 13;
}
