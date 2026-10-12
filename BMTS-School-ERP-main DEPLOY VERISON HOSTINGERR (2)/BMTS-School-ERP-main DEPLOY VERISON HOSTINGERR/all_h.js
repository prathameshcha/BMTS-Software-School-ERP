const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Find all occurrences of _h
const results = [];
let idx = 0;
while ((idx = js.indexOf('_h', idx)) !== -1) {
  results.push({ idx, snippet: js.substring(Math.max(0, idx - 40), idx + 40) });
  idx += 2;
}
console.log('Total occurrences of _h:', results.length);
results.forEach(r => console.log(r.idx, ':', r.snippet));
