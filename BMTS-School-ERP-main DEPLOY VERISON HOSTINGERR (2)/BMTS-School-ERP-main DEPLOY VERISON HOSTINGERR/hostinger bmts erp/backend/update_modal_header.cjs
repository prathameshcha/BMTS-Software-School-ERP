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

  content = content.replace(
    'children:["Category: ",e.jsx("strong",{children:E.replace(/_/g," ")})]',
    'children:["Category: ",e.jsx("strong",{children:({A:"Physical Development (शारीरिक विकास)",B:"Socio-Emotional (सामाजिक व भावनिक विकास)",C:"Cognitive (संज्ञानात्मक विकास)",D:"Language & Literacy (भाषा आणि साक्षरता)",E:"Creative & Aesthetic (सर्जनशील आणि कलात्मक)"}[_.secKey]||E.replace(/_/g," "))+" — "+(_.field==="challenges"?"Progress Needed (आवश्यक प्रगती)":_.field==="progress"?"Progress Made (झालेली प्रगती)":_.field)})]'
  );

  fs.writeFileSync(p, content, 'utf8');
  console.log('Updated category banner in:', p);
}
