const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

const dhIdx = js.lastIndexOf('function dh(');
console.log(js.substring(dhIdx + 4500, dhIdx + 11000));
