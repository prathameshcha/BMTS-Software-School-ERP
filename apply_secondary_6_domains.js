const fs = require('fs');
const path = require('path');

// 1. Files to update for Frontend
const frontendFiles = [
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'public_html', 'assets', 'index-v4.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'public_html', 'assets', 'index-v3.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'backend', 'public_html', 'assets', 'index-v4.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'backend', 'public_html', 'assets', 'index-v3.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'deploy_ready', 'public_html', 'assets', 'index-v4.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'deploy_ready', 'public_html', 'assets', 'index-v3.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'public_html', 'assets', 'index-v4.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'public_html', 'assets', 'index-v3.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'backend', 'public_html', 'assets', 'index-v4.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'backend', 'public_html', 'assets', 'index-v3.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'deploy_ready', 'public_html', 'assets', 'index-v4.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'deploy_ready', 'public_html', 'assets', 'index-v3.js')
];

// 2. Files to update for Backend PDF
const backendPdfFiles = [
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'backend', 'dist', 'routes', 'pdf.routes.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'deploy_ready', 'backend', 'dist', 'routes', 'pdf.routes.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'backend', 'dist', 'routes', 'pdf.routes.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'deploy_ready', 'backend', 'dist', 'routes', 'pdf.routes.js')
];

console.log('--- Updating Frontend Bundles ---');
for (const file of frontendFiles) {
  if (!fs.existsSync(file)) {
    console.log('File not found, skipping:', file);
    continue;
  }
  let code = fs.readFileSync(file, 'utf8');
  let modified = false;

  // A. Update Aa 6 domains
  const oldAa1 = 'titleEn:"1. Scholastic",titleMr:"शैक्षणिक विकास"';
  const newAa1 = 'titleEn:"1. Scholastic achievment",titleMr:"शैक्षणिक संपादन / विकास"';
  if (code.includes(oldAa1)) {
    code = code.replace(oldAa1, newAa1);
    modified = true;
  }

  const oldAa2 = 'titleEn:"2. Language & Communication",titleMr:"भाषा व संवाद कौशल्ये"';
  const newAa2 = 'titleEn:"2. Language & Communication skills",titleMr:"भाषा व संवाद कौशल्ये"';
  if (code.includes(oldAa2)) {
    code = code.replace(oldAa2, newAa2);
    modified = true;
  }

  const oldAa3 = 'titleEn:"3. Critical Thinking & Problem-Solving",titleMr:"विचारशक्ती व समस्या सोडविणे"';
  const newAa3 = 'titleEn:"3. Critical Thinking & Problem - solving",titleMr:"विचारशक्ती व समस्या निवारण"';
  if (code.includes(oldAa3)) {
    code = code.replace(oldAa3, newAa3);
    modified = true;
  }

  const oldAa4 = 'titleEn:"4. Personal, Social & Ethical",titleMr:"वैयक्तिक, सामाजिक व नैतिक विकास"';
  const newAa4 = 'titleEn:"4. Personal , Social & Ethical Development",titleMr:"वैयक्तिक, सामाजिक व नैतिक विकास"';
  if (code.includes(oldAa4)) {
    code = code.replace(oldAa4, newAa4);
    modified = true;
  }

  const oldAa5 = 'titleEn:"5. Career Orientation & Life Skills",titleMr:"करिअर व जीवन कौशल्ये"';
  const newAa5 = 'titleEn:"5. Career Readiness & Life Skills",titleMr:"करिअर सज्जता व जीवन कौशल्ये"';
  if (code.includes(oldAa5)) {
    code = code.replace(oldAa5, newAa5);
    modified = true;
  }

  const oldAa6 = 'titleEn:"6. Physical & Emotional Well-being",titleMr:"शारीरिक व भावनिक स्वास्थ्य"';
  const newAa6 = 'titleEn:"6. Physical & Emotional Wellbeing",titleMr:"शारीरिक व भावनिक स्वास्थ्य"';
  if (code.includes(oldAa6)) {
    code = code.replace(oldAa6, newAa6);
    modified = true;
  }

  // B. Enable ce strictly for 8th to 10th standard in _h (Evaluation Page)
  // Target pattern 1 (from index-v4.js):
  const oldCeRegex1 = /ce=\/\^\(9\|9th\|10\|10th\|IX\|X\)\$\/i\.test\(\(\(\(\$e=a==null\?void 0:a\.class\)==null\?void 0:\$e\.name\)\|\|""\)\.trim\(\)\)&&\(\(ts=a==null\?void 0:a\.class\)==null\?void 0:ts\.reportCardTemplate\)!==["']KG["']/;
  const newCeStr1 = 'ce=/^(8|8th|9|9th|10|10th|VIII|IX|X)$/i.test(String(((($e=a==null?void 0:a.class)==null?void 0:$e.name)||"")).trim())';

  if (oldCeRegex1.test(code)) {
    code = code.replace(oldCeRegex1, newCeStr1);
    modified = true;
  }

  // Target pattern 2 (from index-v3.js where ce=false was hardcoded):
  const oldCeV3 = ',ce=false,Me=L&&!["jr.kg"';
  const newCeV3 = ',ce=/^(8|8th|9|9th|10|10th|VIII|IX|X)$/i.test(String(((ha=a==null?void 0:a.class)==null?void 0:ha.name)||"").trim()),Me=L&&!["jr.kg"';
  if (code.includes(oldCeV3)) {
    code = code.replace(oldCeV3, newCeV3);
    modified = true;
  }

  // C. Update ch in Remark Bank (xh) to include Std 8-10 domain categories
  const oldChTailRegex = /\{key:"primary_teacher_remarks",label:"Primary\/Secondary \([^)]+\) — Teacher Remarks"\}\]/;
  const newChTail = '{key:"primary_teacher_remarks",label:"Primary (1st–7th) — Teacher Remarks"},' +
    '{key:"sec_dom_1",label:"Std 8-10 — Domain 1: Scholastic achievment (शैक्षणिक संपादन)"},' +
    '{key:"sec_dom_2",label:"Std 8-10 — Domain 2: Language & Communication skills (भाषा व संवाद कौशल्ये)"},' +
    '{key:"sec_dom_3",label:"Std 8-10 — Domain 3: Critical Thinking & Problem - solving (विचारशक्ती व समस्या निवारण)"},' +
    '{key:"sec_dom_4",label:"Std 8-10 — Domain 4: Personal , Social & Ethical Development (वैयक्तिक, सामाजिक व नैतिक विकास)"},' +
    '{key:"sec_dom_5",label:"Std 8-10 — Domain 5: Career Readiness & Life Skills (करिअर सज्जता व जीवन कौशल्ये)"},' +
    '{key:"sec_dom_6",label:"Std 8-10 — Domain 6: Physical & Emotional Wellbeing (शारीरिक व भावनिक स्वास्थ्य)"},' +
    '{key:"sec_prog",label:"Std 8-10 — Special Progress Made (विशेष प्रगती)"},' +
    '{key:"sec_imp",label:"Std 8-10 — Improvement Needed (सुधारणा आवश्यक)"}]';

  if (oldChTailRegex.test(code)) {
    code = code.replace(oldChTailRegex, newChTail);
    modified = true;
  }

  // D. Update Ss with 6 domain keys placeholder
  if (code.includes('SECONDARY_SPECIAL_PROGRESS:') && !code.includes('SEC_DOM_1:')) {
    code = code.replace('SECONDARY_SPECIAL_PROGRESS:', 'SEC_DOM_1:[],SEC_DOM_2:[],SEC_DOM_3:[],SEC_DOM_4:[],SEC_DOM_5:[],SEC_DOM_6:[],SECONDARY_SPECIAL_PROGRESS:');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, code, 'utf8');
    console.log('Successfully updated:', path.basename(file), 'in', path.dirname(file));
  } else {
    console.log('No replacement needed for:', file);
  }
}

console.log('\n--- Updating Backend PDF Routes ---');
for (const file of backendPdfFiles) {
  if (!fs.existsSync(file)) {
    console.log('File not found, skipping:', file);
    continue;
  }
  let code = fs.readFileSync(file, 'utf8');
  let modified = false;

  // A. Ensure isSecondary is true for 8th, 9th, 10th and false for other classes
  const oldIsSec1 = 'const className = String(reportCard.class.name).trim().toLowerCase();\n        // All classes use the unified bilingual report card template\n        const isSecondary = false;';
  const newIsSec1 = 'const className = String(reportCard.class.name).trim().toLowerCase();\n        const isSecondary = /^(8|8th|9|9th|10|10th|viii|ix|x)$/i.test(className);';

  if (code.includes(oldIsSec1)) {
    code = code.replace(oldIsSec1, newIsSec1);
    modified = true;
  }

  // Also handle single-line or slight variant:
  const oldIsSec2 = 'const isSecondary = false;\n        if (isSecondary) {';
  const newIsSec2 = 'const isSecondary = /^(8|8th|9|9th|10|10th|viii|ix|x)$/i.test(className);\n        if (isSecondary) {';
  if (code.includes(oldIsSec2)) {
    code = code.replace(oldIsSec2, newIsSec2);
    modified = true;
  }

  // B. Update domain titles in COMPETENCY_DOMAINS_LOCAL
  const oldPdf1 = "id: 1, titleEn: '1. Scholastic', titleMr: 'शैक्षणिक विकास'";
  const newPdf1 = "id: 1, titleEn: '1. Scholastic achievment', titleMr: 'शैक्षणिक संपादन / विकास'";
  if (code.includes(oldPdf1)) {
    code = code.replace(oldPdf1, newPdf1);
    modified = true;
  }

  const oldPdf2 = "id: 2, titleEn: '2. Language & Communication', titleMr: 'भाषा व संवाद कौशल्ये'";
  const newPdf2 = "id: 2, titleEn: '2. Language & Communication skills', titleMr: 'भाषा व संवाद कौशल्ये'";
  if (code.includes(oldPdf2)) {
    code = code.replace(oldPdf2, newPdf2);
    modified = true;
  }

  const oldPdf3 = "id: 3, titleEn: '3. Critical Thinking & Problem-Solving', titleMr: 'विचारशक्ती व समस्या सोडविणे'";
  const newPdf3 = "id: 3, titleEn: '3. Critical Thinking & Problem - solving', titleMr: 'विचारशक्ती व समस्या निवारण'";
  if (code.includes(oldPdf3)) {
    code = code.replace(oldPdf3, newPdf3);
    modified = true;
  }

  const oldPdf4 = "id: 4, titleEn: '4. Personal, Social & Ethical', titleMr: 'वैयक्तिक, सामाजिक व नैतिक विकास'";
  const newPdf4 = "id: 4, titleEn: '4. Personal , Social & Ethical Development', titleMr: 'वैयक्तिक, सामाजिक व नैतिक विकास'";
  if (code.includes(oldPdf4)) {
    code = code.replace(oldPdf4, newPdf4);
    modified = true;
  }

  const oldPdf5 = "id: 5, titleEn: '5. Career Orientation & Life Skills', titleMr: 'करिअर व जीवन कौशल्ये'";
  const newPdf5 = "id: 5, titleEn: '5. Career Readiness & Life Skills', titleMr: 'करिअर सज्जता व जीवन कौशल्ये'";
  if (code.includes(oldPdf5)) {
    code = code.replace(oldPdf5, newPdf5);
    modified = true;
  }

  const oldPdf6 = "id: 6, titleEn: '6. Physical & Emotional Well-being', titleMr: 'शारीरिक व भावनिक स्वास्थ्य'";
  const newPdf6 = "id: 6, titleEn: '6. Physical & Emotional Wellbeing', titleMr: 'शारीरिक व भावनिक स्वास्थ्य'";
  if (code.includes(oldPdf6)) {
    code = code.replace(oldPdf6, newPdf6);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, code, 'utf8');
    console.log('Successfully updated:', path.basename(file), 'in', path.dirname(file));
  } else {
    console.log('No replacement needed for:', file);
  }
}

console.log('\nAll updates completed!');
