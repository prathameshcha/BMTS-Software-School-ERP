const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

const modalStart = c.indexOf('title:`Report Card —');
console.log('modalStart:', modalStart);
console.log(c.substring(modalStart, modalStart + 3500));
