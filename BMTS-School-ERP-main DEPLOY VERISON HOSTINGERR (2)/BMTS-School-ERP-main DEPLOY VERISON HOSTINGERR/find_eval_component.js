const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Find function containing Choose Remarks
const idx = js.indexOf('Applied remark with Marathi translation');
console.log('Remark logic at:', idx);
if (idx !== -1) {
  // Find the function name preceding this index
  const preceding = js.substring(Math.max(0, idx - 8000), idx);
  console.log('Preceding code summary (last 1500 chars):');
  console.log(preceding.substring(preceding.length - 1500));
}
