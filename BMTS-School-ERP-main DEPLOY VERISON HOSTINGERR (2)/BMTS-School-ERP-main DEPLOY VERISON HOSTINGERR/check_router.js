const fs = require('fs');
const path = require('path');

const js = fs.readFileSync(path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'), 'utf8');

// Find router definition (createBrowserRouter or Route elements)
const routerIdx = js.indexOf('createBrowserRouter');
console.log('Router at:', routerIdx);
if (routerIdx !== -1) {
  console.log(js.substring(routerIdx, routerIdx + 3000));
} else {
  // Find path:"report-cards"
  let idx = 0;
  while ((idx = js.indexOf('path:"report-cards"', idx)) !== -1) {
    console.log('Route match at', idx, ':', js.substring(idx - 50, idx + 100));
    idx += 20;
  }
}
