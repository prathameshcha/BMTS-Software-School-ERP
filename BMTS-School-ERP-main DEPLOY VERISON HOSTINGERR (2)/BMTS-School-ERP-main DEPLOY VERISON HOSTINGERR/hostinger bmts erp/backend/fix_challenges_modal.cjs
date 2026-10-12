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

  const startAnchor = '["A","B","C","D","E"].map(H=>e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2",children:[';
  const endAnchor = ']},H)),e.jsxs("div",{className:"flex justify-end gap-2 pt-2 border-t"';

  const startIdx = content.indexOf(startAnchor);
  if (startIdx !== -1) {
    const endIdx = content.indexOf(endAnchor, startIdx);
    if (endIdx !== -1) {
      const targetChunk = content.substring(startIdx, endIdx);
      
      const newChunk = '["A","B","C","D","E"].map(H=>e.jsxs("div",{className:"p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2",children:[e.jsxs("div",{className:"flex justify-between items-center font-bold text-slate-800 text-xs",children:[e.jsx("span",{children:({A:"A. Physical Development (शारीरिक विकास)",B:"B. Socio-Emotional (सामाजिक व भावनिक विकास)",C:"C. Cognitive (संज्ञानात्मक विकास)",D:"D. Language & Literacy (भाषा आणि साक्षरता)",E:"E. Creative & Aesthetic (सर्जनशील आणि कलात्मक)"}[H]||"Section "+H)}),e.jsxs("div",{className:"flex gap-1",children:[e.jsxs(U,{size:"sm",variant:"outline",onClick:()=>nt(H,"progress"),className:"text-[10px] h-6 px-2 text-emerald-700 border-emerald-300 hover:bg-emerald-50",children:[e.jsx(ga,{className:"w-3 h-3 mr-1"})," Progress Bank"]}),e.jsxs(U,{size:"sm",variant:"outline",onClick:()=>nt(H,"challenges"),className:"text-[10px] h-6 px-2 text-rose-700 border-rose-300 hover:bg-rose-50",children:[e.jsx(ga,{className:"w-3 h-3 mr-1"})," Challenges Bank"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-[10px] text-slate-600 font-semibold block",children:"Progress Lines:"}),e.jsx("button",{type:"button",onClick:()=>nt(H,"progress"),className:"text-[10px] text-indigo-600 hover:underline font-medium",children:"+ Choose"})]}),[0,1,2].map(Se=>e.jsx(q,{value:ve[H].progress[Se],onChange:fe=>Ge(H,"progress",Se,fe.target.value),placeholder:`Progress line ${Se+1}...`,className:"h-7 text-xs"},`modal-p-${H}-${Se}`))]}),e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-[10px] text-slate-600 font-semibold block",children:"Challenges Lines:"}),e.jsx("button",{type:"button",onClick:()=>nt(H,"challenges"),className:"text-[10px] text-rose-600 hover:underline font-medium",children:"+ Choose"})]}),[0,1,2].map(Se=>e.jsx(q,{value:ve[H].challenges[Se],onChange:fe=>Ge(H,"challenges",Se,fe.target.value),placeholder:`Challenges line ${Se+1}...`,className:"h-7 text-xs"},`modal-c-${H}-${Se}`))]})]})]';

      content = content.replace(targetChunk, newChunk);
    }
  }

  content = content.replace(
    'title:"Remark Bank Selection (Choose 1 Remark from 5 Options)"',
    'title:"Remark Bank Selection (Choose Remark)"'
  );

  fs.writeFileSync(p, content, 'utf8');
  console.log('Fixed challenges remark opening in:', p);
}
