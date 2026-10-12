const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient();

const socioEmotionalProgress = [
  { textEn: 'Admits mistakes and corrects them', textMr: 'झालेल्या चुका मान्य करतो आणि दुरुस्त करतो' },
  { textEn: 'Interacts with peers, friends and teachers', textMr: 'सहकारी, मित्र आणि शिक्षकांशी संवाद साधतो' },
  { textEn: 'Cooperates with classmates in a friendly way', textMr: 'वर्गमित्रांशी मैत्रीपूर्ण संबंध ठेवतो' },
  { textEn: 'Helps others and kind towards peers', textMr: 'इतरांना मदत करून दयाळू वृत्ती दाखवतो' },
  { textEn: 'Active and cooperative in group discussion', textMr: 'गट चर्चेत सक्रिय सहभाग घेतो' },
  { textEn: 'Admits mistakes and does not repeat them', textMr: 'झालेल्या चुका मान्य करतो आणि त्यांची पुनरावृत्ती करत नाही' },
  { textEn: 'Shares ideas willingly with peers', textMr: 'आपल्या कल्पना सहकारी मित्रांसमोर उत्साहाने मांडतो' },
  { textEn: 'Accepts feedback from teachers / elders', textMr: 'शिक्षकांकडून / मोठ्यांकडून अभिप्राय स्वीकारतो' },
  { textEn: 'Shows curiosity and solves problems on his / her own', textMr: 'समस्या सोडविण्यासाठी स्वतःहून उत्साह दाखवतो' },
  { textEn: 'Can manage emotions in difficult situations', textMr: 'कठीण प्रसंगी भावना नियंत्रित करू शकतो' },
  { textEn: 'Can manage anger', textMr: 'राग नियंत्रित करू शकतो' },
  { textEn: 'Shows self confidence in critical situation', textMr: 'कठीण प्रसंगी आत्मविश्वास दाखवतो' },
  { textEn: 'Is polite in speech and actions with teachers and friends', textMr: 'शिक्षक व मित्रांशी नम्रपणे बोलतो आणि वागतो' },
  { textEn: 'Keeps calm and cool in difficult situations', textMr: 'कठीण प्रसंगी शांत राहतो' },
  { textEn: 'Solves problems without conflict', textMr: 'संघर्ष न करता समस्या सोडवतो' },
  { textEn: "Follows the school's rule with ease", textMr: 'शाळेचे नियम सहज पाळतो' },
  { textEn: 'Interacts positively with peers without anger', textMr: 'राग न ठेवता सहकाऱ्यांशी सकारात्मक संवाद साधतो' },
  { textEn: 'Displays empathy and kindness toward classmates', textMr: 'सहकाऱ्यांप्रती सहानुभूती आणि दयाळूपणा दाखवतो' },
  { textEn: 'Demonstrates leadership qualities with kindness', textMr: 'सहानुभूती पूर्वक नेतृत्वगुण दाखवतो' },
  { textEn: 'Works well in groups and teams', textMr: 'गटात व संघात चांगले काम करतो' },
  { textEn: 'Accepts suggestions and feedback', textMr: 'सूचना व अभिप्राय स्वीकारतो' },
  { textEn: 'Shows respect towards classmates and teachers', textMr: 'सहकाऱ्यांशी व शिक्षकांशी आदर दाखवतो' },
  { textEn: 'Able to resolve conflicts in a clear manner', textMr: 'समस्यांचे निराकरण स्वतः करू शकतो' },
  { textEn: 'Is emotionally balanced and stable', textMr: 'भावनिकदृष्ट्या संतुलित व स्थिर असतो' },
  { textEn: 'Listens patiently to others', textMr: 'इतरांचे म्हणणे शांतपणे ऐकतो' },
  { textEn: 'Expresses gratitude and appreciation', textMr: 'कृतज्ञता व कौतुक व्यक्त करतो' },
  { textEn: 'Encourages and supports classmates', textMr: 'सहकाऱ्यांना प्रोत्साहन देतो व मदत करतो' },
  { textEn: 'Takes initiatives in social activities', textMr: 'सामाजिक उपक्रमांमध्ये पुढाकार घेतो' },
  { textEn: 'Accepts praises and criticism gracefully or without complaint', textMr: 'कौतुक आणि टीका दोन्ही स्वीकारतो' },
  { textEn: 'Values friendships and builds good relationship', textMr: 'मैत्रीला महत्त्व देत व मैत्रीपूर्ण संबंध जोपासतो' },
  { textEn: 'Maintains self control in various difficult situations', textMr: 'कठीण प्रसंगात स्वतःवर संयम ठेवतो' },
  { textEn: 'Contributes generously in group discussions', textMr: 'गट चर्चेत भरभरून योगदान देतो' },
  { textEn: 'Displays cooperative and helpful nature', textMr: 'सहकार्यशील मदतीची वृत्ती दाखवतो' },
  { textEn: 'Takes personal responsibilities for his/ her own actions', textMr: 'स्वतःच्या कृतींसाठी जबाबदारी घेतो' },
  { textEn: 'Expresses emotions appropriately', textMr: 'भावना योग्य प्रकारे व्यक्त करतो' },
  { textEn: 'Is a good listener and communicator', textMr: 'उत्तम श्रोता व संवादक आहे' }
];

const socioEmotionalChallenges = [
  { textEn: 'Be cooperative and helpful to others', textMr: 'इतरांबरोबर सहकार्य आणि मदतीची वृत्ती ठेवावी' },
  { textEn: 'Take active parts in group discussions', textMr: 'गट चर्चेत सक्रिय सहभाग घ्यावा' },
  { textEn: 'Increase self confidence in difficult situations', textMr: 'कठीण प्रसंगी आत्मविश्वास वाढवावा' },
  { textEn: 'Admit your mistakes and correct them', textMr: 'आपल्या चुका मान्य करून सुधाराव्यात' },
  { textEn: 'Collaborate generously with peers', textMr: 'सहकारी मित्रांना उदारपणे सहकार्य करावे' },
  { textEn: 'Accept your mistakes and do not repeat them', textMr: 'झालेल्या चुका स्वीकारून त्यांची पुनरावृत्ती टाळावी' },
  { textEn: 'Show curiosity and solve problems on your own', textMr: 'उत्सुकता दाखवून समस्या स्वतः सोडवाव्यात' },
  { textEn: 'Handle small responsibilities and show leadership qualities', textMr: 'लहान जबाबदाऱ्या घेऊन नेतृत्वगुण दाखवावेत' },
  { textEn: 'Manage emotions appropriately', textMr: 'भावना योग्यप्रकारे व्यक्त कराव्यात' },
  { textEn: 'Manage anger and keep calm', textMr: 'रागावर नियंत्रण ठेवावे' },
  { textEn: 'Share with others in time of need', textMr: 'वेळोवेळी मदतीची भावना ठेवावी' },
  { textEn: 'Be courageous to say "sorry"', textMr: '“सॉरी” बोलण्याचे धाडस दाखवावे' },
  { textEn: 'Avoid conflict in critical situations', textMr: 'तणावपूर्ण परिस्थितीत संघर्ष टाळावा' },
  { textEn: 'Be calm and cool in difficult situations', textMr: 'तणावपूर्ण प्रसंगात शांत राहावे' },
  { textEn: 'Be polite with teachers and with peers', textMr: 'शिक्षक व मित्रांशी सौम्यपणे वागावे' },
  { textEn: 'Build healthy relationship with classmates', textMr: 'वर्गमित्रांशी चांगले संबंध प्रस्थापित करावेत' },
  { textEn: 'Follow the rules of the school with discipline', textMr: 'शाळेचे नियम शिस्तीने पाळावेत' },
  { textEn: 'Improve on listening and communication skills', textMr: 'ऐकणे व संवाद कौशल्ये सुधारावीत' },
  { textEn: 'Try to express emotions appropriately', textMr: 'भावना योग्य प्रकारे व्यक्त करण्याचा प्रयत्न करावा' },
  { textEn: 'Try to control temper in stressful situation', textMr: 'तणावपूर्ण परिस्थितीत राग नियंत्रित करावा' },
  { textEn: 'Accept criticism in a positive manner', textMr: 'टीका सकारात्मक पद्धतीने स्वीकारावी' },
  { textEn: 'Give support and encouragement to peers', textMr: 'सहकाऱ्यांना प्रोत्साहन द्यावे' },
  { textEn: 'Be grateful and thankful when required', textMr: 'आवश्यकतेनुसार कृतज्ञता व्यक्त करावी' },
  { textEn: 'Avoid interruption or disturbance in the class', textMr: 'वर्गात अध्ययनात व्यत्यय आणू नये' },
  { textEn: 'Avoid conflict and disagreement with peers', textMr: 'वाद व मतभेद टाळावेत' },
  { textEn: 'Express your thoughts and emotion freely', textMr: 'स्वतःच्या भावना मोकळेपणाने व्यक्त कराव्यात' },
  { textEn: 'Show empathy towards others', textMr: 'इतरांप्रती सहानुभूती दाखवावी' },
  { textEn: 'Interact with peers positively', textMr: 'सहकाऱ्यांशी सकारात्मक संवाद साधावा' }
];

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  const adminId = admin ? admin.id : null;

  // Clear existing Section B remarks
  await prisma.remarkBank.deleteMany({
    where: { fieldKey: { in: ['kg_sec_b_progress', 'kg_sec_b_challenges'] } }
  });

  for (const item of socioEmotionalProgress) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_b_progress',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  for (const item of socioEmotionalChallenges) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_b_challenges',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  const pCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_b_progress' } });
  const cCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_b_challenges' } });

  console.log('Successfully inserted Socio-Emotional remarks:');
  console.log('Progress Made count:', pCount);
  console.log('Progress Needed count:', cCount);
}

main().catch(console.error).finally(() => prisma.$disconnect());
