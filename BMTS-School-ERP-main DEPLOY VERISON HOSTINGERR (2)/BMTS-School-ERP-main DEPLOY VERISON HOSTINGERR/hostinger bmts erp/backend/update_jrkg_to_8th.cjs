const fs = require('fs');

const paths = [
  'C:/Users/chava/OneDrive/Microsoft Copilot Chat Files/Documents/Desktop/BMTS_Software/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR/backend/public_html/assets/index-v4.js',
  'C:/Users/chava/OneDrive/Microsoft Copilot Chat Files/Documents/Desktop/BMTS_Software/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR/deploy_ready/public_html/assets/index-v4.js',
  'C:/Users/chava/OneDrive/Microsoft Copilot Chat Files/Documents/Desktop/BMTS_Software/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR/hostinger bmts erp/backend/public_html/assets/index-v4.js',
  'C:/Users/chava/OneDrive/Microsoft Copilot Chat Files/Documents/Desktop/BMTS_Software/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR/hostinger bmts erp/deploy_ready/public_html/assets/index-v4.js',
  'C:/Users/chava/OneDrive/Microsoft Copilot Chat Files/Documents/Desktop/BMTS_Software/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR/hostinger bmts erp/public_html/assets/index-v4.js',
  'C:/Users/chava/OneDrive/Microsoft Copilot Chat Files/Documents/Desktop/BMTS_Software/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR (2)/BMTS-School-ERP-main DEPLOY VERISON HOSTINGERR/public_html/assets/index-v4.js'
];

for (const p of paths) {
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf8');

  // 1. Update ce definition so 8th has the full domain remarks and only 9th/10th use high school mode
  content = content.replace(
    /ce=\/\^\(8\|8th\|9\|9th\|10\|10th\|VIII\|IX\|X\)\$\/i/g,
    'ce=/^(9|9th|10|10th|IX|X)$/i'
  );

  // 2. Update L definition to include 1st to 8th
  content = content.replace(
    '["jr.kg","sr.kg","1st","2nd"].includes',
    '["jr.kg","sr.kg","jr. kg","sr. kg","junior kg","senior kg","1st","2nd","3rd","4th","5th","6th","7th","8th","1","2","3","4","5","6","7","8"].includes'
  );

  // 3. Update button text "Choose from 5 Remarks" -> "Choose Remark"
  content = content.replace(
    /" Choose from 5 Remarks"/g,
    '" Choose Remark"'
  );
  content = content.replace(
    /Choose from 5 Remarks/g,
    'Choose Remark'
  );

  // 4. Update remark bank domain labels / classes if needed
  content = content.replace(
    'Primary/Secondary (1st–2nd) — Teacher Remarks',
    'Primary/Secondary (1st–8th) — Teacher Remarks'
  );

  fs.writeFileSync(p, content, 'utf8');
  console.log('Updated Jr.KG to 8th remark support in:', p);
}
