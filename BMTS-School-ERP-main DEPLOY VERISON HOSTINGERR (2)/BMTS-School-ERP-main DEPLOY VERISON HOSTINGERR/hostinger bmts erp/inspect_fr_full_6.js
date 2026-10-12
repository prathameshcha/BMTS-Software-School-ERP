const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

const start = 336295 + 12500;
console.log(c.substring(start, start + 3000));
