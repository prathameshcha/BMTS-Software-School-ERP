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

  const startIdx = content.indexOf('Je=()=>{let H=');
  if (startIdx !== -1) {
    const endIdx = content.indexOf(',nt=(H,Se)=>', startIdx);
    if (endIdx !== -1) {
      const targetJe = content.substring(startIdx, endIdx);
      const newJe = 'Je=()=>{const tk=_.secKey?`kg_sec_${_.secKey.toLowerCase()}_${_.field}`:(_.field==="STRENGTHS"?"kg_sec_g_strength":_.field==="SUPPORT"?"kg_sec_g_support":_.field==="IMPROVEMENT"?"kg_sec_g_improvement":"primary_teacher_remarks");const bi=(be||[]).filter(x=>x.fieldKey===tk&&x.active!==false);if(bi.length>0){return bi.map(x=>({id:x.id,en:x.textEn,mr:x.textMr||x.textEn}))}let H="";_.field==="STRENGTHS"?H="STRENGTHS":_.field==="SUPPORT"?H="SUPPORT_NEEDED":_.field==="IMPROVEMENT"?H="CHALLENGES":H={A:"PHYSICAL_MOTOR",B:"SOCIAL_EMOTIONAL",C:"COGNITIVE",D:"LANGUAGE_LITERACY",E:"CREATIVE_AESTHETIC"}[_.secKey]||"PHYSICAL_MOTOR";_.field==="challenges"&&(H="CHALLENGES");return(Ss[H]||Ss.PHYSICAL_MOTOR).map(Le=>({id:Le.id,en:Le.en,mr:Le.mr}))}';
      content = content.replace(targetJe, newJe);
    }
  }

  content = content.replace('if(!m&&n.length>=5){D.error("You can only add up to 5 remarks per domain.");return}', '/* no limit */');
  content = content.replace('Maintain pre-configured maximum 5 bilingual remarks per field for Faculty quick selection', 'Maintain pre-configured bilingual remarks per field for Faculty quick selection');

  fs.writeFileSync(p, content, 'utf8');
  console.log('Successfully updated:', p);
}
