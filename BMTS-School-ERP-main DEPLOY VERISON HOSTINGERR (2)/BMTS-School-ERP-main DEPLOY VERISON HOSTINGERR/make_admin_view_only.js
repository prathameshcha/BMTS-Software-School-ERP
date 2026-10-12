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

    // 1. Remove Edit button from Admin table row
    // Target: ,e.jsx("a",{href:`/faculty/report-cards?studentId=${z.studentId}`,className:"p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg inline-flex items-center",title:"Edit Remarks / Fill Report Card",children:e.jsx(qt,{className:"w-4 h-4"})})
    const editBtnInTable = ',e.jsx("a",{href:`/faculty/report-cards?studentId=${z.studentId}`,className:"p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg inline-flex items-center",title:"Edit Remarks / Fill Report Card",children:e.jsx(qt,{className:"w-4 h-4"})})';
    if (code.includes(editBtnInTable)) {
      code = code.replace(editBtnInTable, '');
      modified = true;
      console.log(`[${jsFile}] Removed Edit button from Admin Report Cards table`);
    }

    // 2. Remove Edit button from Admin Modal preview
    // Target: ,$&&e.jsxs(U,{as:"a",href:`/faculty/report-cards?studentId=${$.studentId}`,className:"flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white",children:[e.jsx(qt,{className:"w-4 h-4"})," Edit Report Card Remarks"]})
    const editBtnInModal = ',$&&e.jsxs(U,{as:"a",href:`/faculty/report-cards?studentId=${$.studentId}`,className:"flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white",children:[e.jsx(qt,{className:"w-4 h-4"})," Edit Report Card Remarks"]})';
    if (code.includes(editBtnInModal)) {
      code = code.replace(editBtnInModal, '');
      modified = true;
      console.log(`[${jsFile}] Removed Edit button from Admin Report Cards modal`);
    }

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`Saved updates to ${filePath}`);
    }
  }
}

console.log('Finished updating admin view-only restrictions.');
