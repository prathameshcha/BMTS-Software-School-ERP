const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js');
let code = fs.readFileSync(jsPath, 'utf8');
console.log('index-v4.js length:', code.length);

// Check Faculty report-cards route
const facultyRouteIdx = code.indexOf('path:"report-cards",element:e.jsx(dh,{})');
console.log('faculty route match at:', facultyRouteIdx);

// Check he()
const heIdx = code.indexOf('he=');
console.log('he= at:', heIdx);
if (heIdx !== -1) {
  console.log('he snippet:', code.substring(heIdx, heIdx + 500));
}
