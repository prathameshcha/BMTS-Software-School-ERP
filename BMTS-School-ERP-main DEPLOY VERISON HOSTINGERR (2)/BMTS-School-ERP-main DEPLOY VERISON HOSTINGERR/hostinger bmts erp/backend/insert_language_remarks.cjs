const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient();

const languageProgress = [
  { textEn: 'Enjoys stories of English language', textMr: 'इंग्रजी भाषेतील गोष्टी वाचायला आवडतात' },
  { textEn: 'Reads fluently and meaningfully', textMr: 'अस्खलित आणि अर्थपूर्ण वाचन करतो' },
  { textEn: 'Tries to speak in English', textMr: 'इंग्रजीत बोलण्याचा प्रयत्न करतो' },
  { textEn: 'Has developed vocabulary through listening and reading', textMr: 'ऐकून आणि वाचून शब्दसंग्रह वाढवलेला आहे' },
  { textEn: 'Expresses his/ her thoughts clearly', textMr: 'आपले विचार स्पष्टपणे व्यक्त करतो' },
  { textEn: 'Reads and comprehends English passages and notes', textMr: 'इंग्रजी उतारे व नोट्स वाचून समजतो' },
  { textEn: 'Narrates stories in English and Marathi', textMr: 'इंग्रजी व मराठीत गोष्टी सांगतो' },
  { textEn: 'Reads with correct pronunciation', textMr: 'शब्दांचे अचूक व स्पष्ट वाचन करतो' },
  { textEn: 'Enjoys reading books other than the textbooks', textMr: 'पाठ्यपुस्तकांव्यतिरिक्त पुस्तके वाचतो' },
  { textEn: 'Constructs grammatically correct and meaningful sentences', textMr: 'व्याकरणदृष्ट्या योग्य आणि अर्थपूर्ण वाक्य तयार करतो' },
  { textEn: 'Reads fluently with accurate expressions', textMr: 'हावभावासह अचूक व अस्खलित वाचन करतो' },
  { textEn: 'Writes neatly and logically/ legibly', textMr: 'वळणदार व सुंदर अक्षरात लिहितो' },
  { textEn: 'Speaks in English fluently using appropriate words', textMr: 'योग्य शब्द वापरून इंग्रजीत स्पष्टपणे बोलतो' },
  { textEn: 'Listens attentively and responds accurately', textMr: 'लक्षपूर्वक ऐकतो आणि अचूक प्रतिसाद देतो' },
  { textEn: 'Makes use of a wide range of vocabulary', textMr: 'शब्द संग्रहात नवीन शब्दांची भर टाकतो' },
  { textEn: 'Shows good comprehension in reading', textMr: 'वाचन व आकलन चांगले आहे' },
  { textEn: 'Constructs correct grammatical sentences', textMr: 'व्याकरणदृष्ट्या बरोबर वाक्य तयार करतो' },
  { textEn: 'Participates actively in language activities', textMr: 'भाषिक उपक्रमांमध्ये सक्रिय सहभाग घेतो' },
  { textEn: 'Enjoys reading books', textMr: 'पुस्तके वाचायला आवडते' },
  { textEn: 'Writes creative and meaningful content', textMr: 'सर्जनशील आणि अर्थपूर्ण मजकूर लिहितो' },
  { textEn: 'Pronounces words correctly and clearly', textMr: 'शब्द अचूक आणि स्पष्ट उच्चारतो' },
  { textEn: 'Shows interest in improving language', textMr: 'भाषिक कौशल्य सुधारण्याची इच्छा दाखवतो' },
  { textEn: 'Reads independently with understanding', textMr: 'विषयाचे आकलन करून स्वतंत्रपणे वाचन करतो' },
  { textEn: 'Engages in meaningful conversations', textMr: 'अर्थपूर्ण संभाषणात भाग घेतो' },
  { textEn: 'Enjoys story telling in various languages', textMr: 'विविध भाषांमध्ये गोष्टी सांगण्याचा आनंद घेतो' },
  { textEn: 'Asks relevant questions while reading', textMr: 'वाचन करताना योग्य प्रश्न विचारतो' },
  { textEn: 'Responds to both oral and written content', textMr: 'लेखी व मौखिक दोन्ही मजकुरावर प्रतिसाद देतो' },
  { textEn: 'Shows enthusiasm for learning different languages', textMr: 'वेगवेगळ्या भाषा शिकण्यासाठी उत्साह दाखवतो' },
  { textEn: 'Uses language effectively', textMr: 'भाषेचा परिणामकारक वापर करतो' }
];

const languageChallenges = [
  { textEn: 'Enhance English vocabulary as much as possible', textMr: 'इंग्रजी शब्दसंग्रह वाढवा' },
  { textEn: 'Speak in English', textMr: 'इंग्रजीत बोलण्याचा प्रयत्न करावा' },
  { textEn: 'Speak fluently and clearly with correct pronunciations in English', textMr: 'अचूक उच्चारासह प्रभावी आणि स्पष्ट इंग्रजीत बोला' },
  { textEn: 'Pay more attention to English reading', textMr: 'इंग्रजी वाचनाकडे अधिक लक्ष द्या' },
  { textEn: 'Focus on reading in all the three languages', textMr: 'तिन्ही भाषांमध्ये वाचनावर लक्ष केंद्रित करा' },
  { textEn: 'Read more library books', textMr: 'ग्रंथालयातील पुस्तके वाचनाची आवड ठेवा' },
  { textEn: 'Use more vocabulary while communicating', textMr: 'संभाषणात अधिक शब्दसंपदा वापरा' },
  { textEn: 'Show interest in reading story books of all languages', textMr: 'सर्व भाषेतील कथेची पुस्तक वाचनाची आवड दाखवा' },
  { textEn: 'Avoid grammatical mistakes while speaking', textMr: 'बोलताना व्याकरणाच्या चुका टाळा' },
  { textEn: 'Avoid grammatical mistakes while writing', textMr: 'लिहिताना व्याकरणाच्या चुका टाळा' },
  { textEn: 'Improve handwriting and be clear and neat', textMr: 'अक्षर सुधारावे आणि स्वच्छ व नीटनेटके लिहा' },
  { textEn: 'Understand spoken instructions and respond well', textMr: 'बोललेले योग्यरित्या समजून त्यावर उत्तर द्या' },
  { textEn: 'Increase or enhance vocabulary both in speech and writing', textMr: 'बोलण्यात आणि लेखनात शब्दसंपदा वाढवा' },
  { textEn: 'Avoid making frequent grammatical mistakes', textMr: 'वारंवार व्याकरणाच्या चुका करू नका' },
  { textEn: 'Increase interest in reading books', textMr: 'वाचनामध्ये रस वाढवा' },
  { textEn: 'Enhance creativity in writing', textMr: 'लेखनात सर्जनशीलता वाढवा' },
  { textEn: 'Be confident and attentive / certain while reading', textMr: 'वाचन करताना आत्मविश्वास आणि एकाग्रता ठेवा' },
  { textEn: 'Read without the support of others', textMr: 'इतरांच्या मदतीशिवाय वाचनाचा सराव करावा' },
  { textEn: 'Show progress in reading and writing', textMr: 'वाचन व लेखनात प्रगती दाखवा' },
  { textEn: 'Ask questions and engage in discussion', textMr: 'प्रश्न विचारा व चर्चेत सहभागी व्हा' },
  { textEn: 'Increase interest in language learning', textMr: 'भाषा शिकण्याची आवड निर्माण करा' }
];

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  const adminId = admin ? admin.id : null;

  // Clear existing Section D remarks
  await prisma.remarkBank.deleteMany({
    where: { fieldKey: { in: ['kg_sec_d_progress', 'kg_sec_d_challenges'] } }
  });

  for (const item of languageProgress) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_d_progress',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  for (const item of languageChallenges) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_d_challenges',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  const pCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_d_progress' } });
  const cCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_d_challenges' } });

  console.log('Successfully inserted Language Development remarks:');
  console.log('Progress Made count:', pCount);
  console.log('Progress Needed count:', cCount);
}

main().catch(console.error).finally(() => prisma.$disconnect());
