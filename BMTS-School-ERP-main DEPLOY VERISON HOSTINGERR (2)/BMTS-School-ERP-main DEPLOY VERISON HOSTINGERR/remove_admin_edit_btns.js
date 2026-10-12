const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'hostinger bmts erp', 'public_html', 'assets'),
  path.join(__dirname, 'deploy_ready', 'public_html', 'assets')
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) continue;
  const jsFiles = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

  for (const jsFile of jsFiles) {
    const filePath = path.join(dir, jsFile);
    let code = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Remove Edit Remarks button from Admin Report Cards table
    //    The injected code: ,e.jsx("a",{href:`/faculty/report-cards?studentId=${z.studentId}`,className:"p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg inline-flex items-center",title:"Edit Remarks / Fill Report Card",children:e.jsx(qt,{className:"w-4 h-4"})})
    const editTableBtn = ',e.jsx("a",{href:`/faculty/report-cards?studentId=${z.studentId}`,className:"p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg inline-flex items-center",title:"Edit Remarks / Fill Report Card",children:e.jsx(qt,{className:"w-4 h-4"})})';
    if (code.includes(editTableBtn)) {
      code = code.replace(editTableBtn, '');
      modified = true;
      console.log(`[${jsFile}] Removed Edit Remarks button from Admin table`);
    }

    // 2. Remove "Edit Report Card Remarks" button from Admin preview modal
    //    The injected code: ,$&&e.jsxs(U,{as:"a",href:`/faculty/report-cards?studentId=${$.studentId}`,className:"flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white",children:[e.jsx(qt,{className:"w-4 h-4"})," Edit Report Card Remarks"]})
    const editModalBtn = ',$&&e.jsxs(U,{as:"a",href:`/faculty/report-cards?studentId=${$.studentId}`,className:"flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white",children:[e.jsx(qt,{className:"w-4 h-4"})," Edit Report Card Remarks"]})';
    if (code.includes(editModalBtn)) {
      code = code.replace(editModalBtn, '');
      modified = true;
      console.log(`[${jsFile}] Removed Edit Report Card Remarks button from Admin modal`);
    }

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`Saved: ${filePath}`);
    }
  }
}

console.log('Done — Admin edit buttons removed.');
