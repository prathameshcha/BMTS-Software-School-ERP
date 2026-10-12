const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

const start = 580379;
const hCode = js.substring(start, start + 25000);

// Find where ue is rendered (ue is the modal open state)
const ueIdx = hCode.indexOf('ue&&');
console.log('ue&& index:', ueIdx);
if (ueIdx !== -1) {
  console.log(hCode.substring(ueIdx, ueIdx + 3000));
}
