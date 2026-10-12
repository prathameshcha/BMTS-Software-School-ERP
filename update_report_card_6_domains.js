const fs = require('fs');
const path = require('path');

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

const backendPdfFiles = [
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'backend', 'dist', 'routes', 'pdf.routes.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'deploy_ready', 'backend', 'dist', 'routes', 'pdf.routes.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'backend', 'dist', 'routes', 'pdf.routes.js'),
  path.join(__dirname, 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)', 'BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR', 'hostinger bmts erp', 'deploy_ready', 'backend', 'dist', 'routes', 'pdf.routes.js')
];

console.log('--- Updating Frontend Bundles for Report Card (fr & _h) ---');
for (const file of frontendFiles) {
  if (!fs.existsSync(file)) continue;
  let code = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. In fr component: Add _isSec check and _secH definition
  const oldHDef = 'm=h("A"),p=h("B"),b=h("C"),g=h("D"),f=h("E"),w=(t==null?void 0:t.assessment)||{}';
  const newHDef = 'm=h("A"),p=h("B"),b=h("C"),g=h("D"),f=h("E"),_secH=h("H")||h("6")||h("E"),_isSec=/^(8|8th|class\\s*8|class\\s*8th|std\\s*8|std\\s*8th|9|9th|class\\s*9|class\\s*9th|std\\s*9|std\\s*9th|10|10th|class\\s*10|class\\s*10th|std\\s*10|std\\s*10th|viii|ix|x)$/i.test(((a==null?void 0:a.name)||((xe=t==null?void 0:t.class)==null?void 0:xe.name)||"").trim()),w=(t==null?void 0:t.assessment)||{}';

  if (code.includes(oldHDef)) {
    code = code.replace(oldHDef, newHDef);
    modified = true;
  }

  // 2. In fr component: Page 1 domains rendering
  const oldFrPage1 = 'ee("A. Physical Development :","(शारीरिक विकास)",m,"PHYSICAL_MOTOR"),ee("B. Social Emotional Development / Personal & Social Qualities :","(सामाजिक - भावनिक विकास / वैयक्तिक आणि सामाजिक गुण)",p,"SOCIAL_EMOTIONAL"),ee("C. Cognitive Development :","(संज्ञानात्मक विकास)",b,"COGNITIVE"),ee("D. Language & Literacy Development :","(भाषा आणि साक्षरता विकास)",g,"LANGUAGE_LITERACY")';
  const newFrPage1 = 'ee(_isSec?"1. Scholastic achievment :":"A. Physical Development :",_isSec?"(शैक्षणिक संपादन / विकास)":"(शारीरिक विकास)",m,"PHYSICAL_MOTOR"),ee(_isSec?"2. Language & Communication skills :":"B. Social Emotional Development / Personal & Social Qualities :",_isSec?"(भाषा व संवाद कौशल्ये)":"(सामाजिक - भावनिक विकास / वैयक्तिक आणि सामाजिक गुण)",p,"SOCIAL_EMOTIONAL"),ee(_isSec?"3. Critical Thinking & Problem - solving :":"C. Cognitive Development :",_isSec?"(विचारशक्ती व समस्या निवारण)":"(संज्ञानात्मक विकास)",b,"COGNITIVE"),ee(_isSec?"4. Personal , Social & Ethical Development :":"D. Language & Literacy Development :",_isSec?"(वैयक्तिक, सामाजिक व नैतिक विकास)":"(भाषा आणि साक्षरता विकास)",g,"LANGUAGE_LITERACY")';

  if (code.includes(oldFrPage1)) {
    code = code.replace(oldFrPage1, newFrPage1);
    modified = true;
  }

  // 3. In fr component: Page 2 domains rendering
  const oldFrPage2 = 'children:[ee("E. Creative & Aesthetic Development :","(सर्जनशील आणि कलात्मक विकास)",f,"CREATIVE_AESTHETIC")';
  const newFrPage2 = 'children:[ee(_isSec?"5. Career Readiness & Life Skills :":"E. Creative & Aesthetic Development :",_isSec?"(करिअर सज्जता व जीवन कौशल्ये)":"(सर्जनशील आणि कलात्मक विकास)",f,"CREATIVE_AESTHETIC"),_isSec&&ee("6. Physical & Emotional Wellbeing :","(शारीरिक व भावनिक स्वास्थ्य)",_secH,"PHYSICAL_MOTOR")';

  if (code.includes(oldFrPage2)) {
    code = code.replace(oldFrPage2, newFrPage2);
    modified = true;
  }

  // 4. In _h component: Domain titles for Std 8-10 vs other classes
  const oldH_A = 'children:"A. Physical Development (शारीरिक विकास)"';
  const newH_A = 'children:ce?"1. Scholastic achievment (शैक्षणिक संपादन / विकास)":"A. Physical Development (शारीरिक विकास)"';
  if (code.includes(oldH_A)) {
    code = code.replace(oldH_A, newH_A);
    modified = true;
  }

  const oldH_B = 'children:"B. Socio-Emotional Development (सामाजिक व भावनिक विकास)"';
  const newH_B = 'children:ce?"2. Language & Communication skills (भाषा व संवाद कौशल्ये)":"B. Socio-Emotional Development (सामाजिक व भावनिक विकास)"';
  if (code.includes(oldH_B)) {
    code = code.replace(oldH_B, newH_B);
    modified = true;
  }

  const oldH_C = 'children:"C. Cognitive Development (संज्ञानात्मक विकास)"';
  const newH_C = 'children:ce?"3. Critical Thinking & Problem - solving (विचारशक्ती व समस्या निवारण)":"C. Cognitive Development (संज्ञानात्मक विकास)"';
  if (code.includes(oldH_C)) {
    code = code.replace(oldH_C, newH_C);
    modified = true;
  }

  const oldH_D = 'children:"D. Language and Literacy Development (भाषा आणि साक्षरता विकास)"';
  const newH_D = 'children:ce?"4. Personal , Social & Ethical Development (वैयक्तिक, सामाजिक व नैतिक विकास)":"D. Language and Literacy Development (भाषा आणि साक्षरता विकास)"';
  if (code.includes(oldH_D)) {
    code = code.replace(oldH_D, newH_D);
    modified = true;
  }

  const oldH_E = 'children:"E. Aesthetic & Cultural (सौंदर्यात्मक आणि सांस्कृतिक विकास)"';
  const newH_E = 'children:ce?"5. Career Readiness & Life Skills (करिअर सज्जता व जीवन कौशल्ये)":"E. Aesthetic & Cultural (सौंदर्यात्मक आणि सांस्कृतिक विकास)"';
  if (code.includes(oldH_E)) {
    code = code.replace(oldH_E, newH_E);
    modified = true;
  }

  // 5. In _h component: Add 6th domain card before Section G
  const oldH_G = 'e.jsxs("div",{className:"p-4 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-4",children:[e.jsx("h3",{className:"font-bold text-indigo-950 text-xs border-b border-indigo-200 pb-1",children:"G. Over-all Assessment';
  const newH_6th_G = 'ce&&e.jsxs("div",{className:"p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3",children:[e.jsx("div",{className:"flex justify-between items-center border-b pb-2",children:e.jsx("h3",{className:"font-bold text-slate-900 text-xs",children:"6. Physical & Emotional Wellbeing (शारीरिक व भावनिक स्वास्थ्य)"})}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[he("H","progress","Progress Shown","विशेष प्रगती"),he("H","challenges","Challenges to Face","पुढील आव्हाने")]})]}),' + oldH_G;

  if (code.includes(oldH_G) && !code.includes('6. Physical & Emotional Wellbeing (शारीरिक व भावनिक स्वास्थ्य)')) {
    code = code.replace(oldH_G, newH_6th_G);
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
  if (!fs.existsSync(file)) continue;
  let code = fs.readFileSync(file, 'utf8');
  let modified = false;

  const oldKgSections = 'const kgSections = isKG ? `\n      <!-- Section A -->\n      ${renderPdfSection("A. Physical Development", "शारीरिक विकास", "A")}\n      <!-- Section B -->\n      ${renderPdfSection("B. Social Emotional Development", "सामाजिक भावनिक विकास", "B")}\n      <!-- Section C -->\n      ${renderPdfSection("C. Cognitive Development", "संज्ञानात्मक विकास", "C")}\n      <!-- Section D -->\n      ${renderPdfSection("D. Language & Literacy Development", "भाषा आणि साक्षरता विकास", "D")}\n      <!-- Section E -->\n      ${renderPdfSection("E. Creative & Aesthetic Development", "सर्जनशील आणि कलात्मक विकास", "E")}\n    ` : \'\';';

  const newKgSections = 'const _isSecPdf = /^(8|8th|9|9th|10|10th|viii|ix|x)$/i.test(reportCard.class?.name || "");\n        const kgSections = _isSecPdf ? `\n      <!-- Domain 1 -->\n      ${renderPdfSection("1. Scholastic achievment", "शैक्षणिक संपादन / विकास", "A")}\n      <!-- Domain 2 -->\n      ${renderPdfSection("2. Language & Communication skills", "भाषा व संवाद कौशल्ये", "B")}\n      <!-- Domain 3 -->\n      ${renderPdfSection("3. Critical Thinking & Problem - solving", "विचारशक्ती व समस्या निवारण", "C")}\n      <!-- Domain 4 -->\n      ${renderPdfSection("4. Personal , Social & Ethical Development", "वैयक्तिक, सामाजिक व नैतिक विकास", "D")}\n      <!-- Domain 5 -->\n      ${renderPdfSection("5. Career Readiness & Life Skills", "करिअर सज्जता व जीवन कौशल्ये", "E")}\n      <!-- Domain 6 -->\n      ${renderPdfSection("6. Physical & Emotional Wellbeing", "शारीरिक व भावनिक स्वास्थ्य", "H")}\n    ` : (isKG ? `\n      <!-- Section A -->\n      ${renderPdfSection("A. Physical Development", "शारीरिक विकास", "A")}\n      <!-- Section B -->\n      ${renderPdfSection("B. Social Emotional Development", "सामाजिक भावनिक विकास", "B")}\n      <!-- Section C -->\n      ${renderPdfSection("C. Cognitive Development", "संज्ञानात्मक विकास", "C")}\n      <!-- Section D -->\n      ${renderPdfSection("D. Language & Literacy Development", "भाषा आणि साक्षरता विकास", "D")}\n      <!-- Section E -->\n      ${renderPdfSection("E. Creative & Aesthetic Development", "सर्जनशील आणि कलात्मक विकास", "E")}\n    ` : \'\');';

  if (code.includes(oldKgSections)) {
    code = code.replace(oldKgSections, newKgSections);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, code, 'utf8');
    console.log('Successfully updated:', path.basename(file), 'in', path.dirname(file));
  } else {
    console.log('No replacement needed for:', file);
  }
}

console.log('\nAll updates done!');
