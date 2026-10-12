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

    // 1. Fix Faculty Router: replace path:"report-cards",element:e.jsx(dh,{}) with _h in faculty routes
    // Faculty routes snippet: path:"marks",element:e.jsx(Ch,{})}),e.jsx(Ie,{path:"report-cards",element:e.jsx(dh,{})})
    if (code.includes('path:"marks",element:e.jsx(Ch,{})}),e.jsx(Ie,{path:"report-cards",element:e.jsx(dh,{})})')) {
      code = code.replace(
        'path:"marks",element:e.jsx(Ch,{})}),e.jsx(Ie,{path:"report-cards",element:e.jsx(dh,{})})',
        'path:"marks",element:e.jsx(Ch,{})}),e.jsx(Ie,{path:"report-cards",element:e.jsx(_h,{})})'
      );
      modified = true;
      console.log(`[${jsFile}] Fixed faculty /report-cards route to point to _h (Drafting/Evaluation component)`);
    }

    // 2. Fix he() function to render BOTH Remark 1 and Remark 2 inputs
    const oldHeTarget = 'e.jsx("div",{className:"space-y-1.5",children:e.jsx(q,{placeholder:"Type or select remark (English & Marathi)...",value:ve[H][Se][0]||"",onChange:Ye=>Ge(H,Se,0,Ye.target.value),className:"text-xs h-8"})})';
    const newHeReplacement = 'e.jsxs("div",{className:"space-y-1.5",children:[e.jsx(q,{placeholder:"Remark 1 (English & Marathi)...",value:ve[H][Se][0]||"",onChange:Ye=>Ge(H,Se,0,Ye.target.value),className:"text-xs h-8"}),e.jsx(q,{placeholder:"Remark 2 (English & Marathi)...",value:ve[H][Se][1]||"",onChange:Ye=>Ge(H,Se,1,Ye.target.value),className:"text-xs h-8"})]})';

    if (code.includes(oldHeTarget)) {
      code = code.replace(oldHeTarget, newHeReplacement);
      modified = true;
      console.log(`[${jsFile}] Updated he() to render BOTH Remark 1 and Remark 2 input fields`);
    }

    // 3. Add Edit Remarks button in Admin Report Cards table (in dh)
    // Find view button: e.jsx("button",{onClick:()=>ne(z),className:"p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg",title:"View & Print Report Card",children:e.jsx(Zt,{className:"w-4 h-4"})})
    const oldViewBtn = 'e.jsx("button",{onClick:()=>ne(z),className:"p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg",title:"View & Print Report Card",children:e.jsx(Zt,{className:"w-4 h-4"})})';
    const newViewAndEditBtns = 'e.jsx("button",{onClick:()=>ne(z),className:"p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg",title:"View & Print Report Card",children:e.jsx(Zt,{className:"w-4 h-4"})}),e.jsx("a",{href:`/faculty/report-cards?studentId=${z.studentId}`,className:"p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg inline-flex items-center",title:"Edit Remarks / Fill Report Card",children:e.jsx(qt,{className:"w-4 h-4"})})';

    if (code.includes(oldViewBtn) && !code.includes('title:"Edit Remarks / Fill Report Card"')) {
      code = code.replace(oldViewBtn, newViewAndEditBtns);
      modified = true;
      console.log(`[${jsFile}] Added Edit Remarks button in Admin Report Cards table`);
    }

    // 4. In Admin Modal preview (where Download PDF / Print is), add "Edit Remarks / Evaluation" button
    // Find: e.jsxs(U,{onClick:et,className:"flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700",children:[e.jsx(ks,{className:"w-4 h-4"})," Print Report Card"]})
    const oldPrintBtn = 'e.jsxs(U,{onClick:et,className:"flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700",children:[e.jsx(ks,{className:"w-4 h-4"})," Print Report Card"]})';
    const newPrintAndEditBtns = 'e.jsxs(U,{onClick:et,className:"flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700",children:[e.jsx(ks,{className:"w-4 h-4"})," Print Report Card"]}),$&&e.jsxs(U,{as:"a",href:`/faculty/report-cards?studentId=${$.studentId}`,className:"flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white",children:[e.jsx(qt,{className:"w-4 h-4"})," Edit Report Card Remarks"]})';

    if (code.includes(oldPrintBtn) && !code.includes('Edit Report Card Remarks')) {
      code = code.replace(oldPrintBtn, newPrintAndEditBtns);
      modified = true;
      console.log(`[${jsFile}] Added Edit Report Card Remarks button to report card preview modal`);
    }

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`Successfully saved updates to ${filePath}`);
    }
  }
}

console.log('All frontend bundle updates finished.');
