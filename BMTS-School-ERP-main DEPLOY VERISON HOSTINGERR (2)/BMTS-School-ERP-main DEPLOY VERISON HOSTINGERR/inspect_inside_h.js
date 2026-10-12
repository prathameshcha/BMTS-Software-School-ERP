const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

const start = 580379;
// Let's see what is inside _h and what is after _h
console.log(js.substring(start, start + 3000));
console.log('--- Middle of _h ---');
console.log(js.substring(start + 8000, start + 12000));
console.log('--- End of _h ---');
console.log(js.substring(start + 18000, start + 21000));
