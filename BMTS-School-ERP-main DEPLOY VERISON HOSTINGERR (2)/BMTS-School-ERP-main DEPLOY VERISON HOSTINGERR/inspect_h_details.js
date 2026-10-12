const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

const start = 580379;
const hCode = js.substring(start, start + 25000);

console.log('--- Checking he() in _h ---');
const heIdx = hCode.indexOf('he=');
console.log(hCode.substring(heIdx, heIdx + 600));

console.log('--- Checking Remark Picker Modal in _h ---');
const modalIdx = hCode.indexOf('Remark Bank');
console.log(hCode.substring(Math.max(0, modalIdx - 200), modalIdx + 800));
