const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

const idx = js.indexOf('Applied remark with Marathi translation');
// Let's find the function declaration before idx
const funcStart = js.lastIndexOf('function ', idx);
console.log('Function header:', js.substring(funcStart, funcStart + 200));

// Let's search where this function name is used across the codebase / routes
const fnName = js.substring(funcStart + 'function '.length, js.indexOf('(', funcStart)).trim();
console.log('Function name:', fnName);

let rIdx = 0;
while ((rIdx = js.indexOf(fnName, rIdx)) !== -1) {
  console.log('Usage at', rIdx, ':', js.substring(Math.max(0, rIdx - 80), rIdx + 80));
  rIdx += fnName.length;
}
