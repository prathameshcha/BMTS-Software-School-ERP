const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'public_html', 'assets', 'index-v3.js');
const c = fs.readFileSync(file, 'utf8');

const pos = 352495;
const before = c.substring(pos - 4000, pos);
const fnMatches = [...before.matchAll(/function\s+([a-zA-Z0-9_$]+)\s*\(/g)];
console.log('Functions defined before pos:');
for (const m of fnMatches) {
  console.log(m[1], 'at rel index', m.index);
}

// Also see what template components exist in the file
console.log('\nSearching for report card template names or components:');
const matches = [...c.matchAll(/(KG|PRIMARY_SECONDARY|SECONDARY|MARK_SHEET|MARKSHEET|EvaluationReport|ReportCard)/gi)];
for (const m of matches.slice(0, 20)) {
  console.log(m[0], 'at', m.index);
}
