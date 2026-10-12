const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient();

const cognitiveProgress = [
  { textEn: 'Demonstrates strong thinking power', textMr: 'तर्कशक्ती चांगली आहे' },
  { textEn: 'Understands new concept and ideas easily', textMr: 'नवनवीन संकल्पना सहज समजतात' },
  { textEn: 'Shows curiosity and willingness to learn', textMr: 'जिज्ञासा व शिकण्याची तयारी दाखवतो' },
  { textEn: 'Remembers and recalls information learnt', textMr: 'अध्ययनात शिकलेली माहिती स्मरणात ठेवतो' },
  { textEn: 'Understands and follows what is taught step by step', textMr: 'शिकवलेले टप्प्याटप्प्याने समजतो' },
  { textEn: 'Enjoys exploring new ideas and topics', textMr: 'नवनवीन विषयांमध्ये रस घेतो' },
  { textEn: 'Thinks critically and ask questions', textMr: 'तर्कशुद्ध विचार करतो आणि प्रश्न विचारतो' },
  { textEn: 'Shows improvement in problem solving', textMr: 'समस्यांचे निराकरण स्वतः करतो' },
  { textEn: 'Grasps new concepts and ideas easily', textMr: 'नवीन संकल्पना लवकर समजतो' },
  { textEn: 'Makes logical connections and conclusions easily', textMr: 'तर्कशुद्ध निष्कर्ष काढतो' },
  { textEn: 'Pays good attention in class', textMr: 'वर्गात लक्ष देतो' },
  { textEn: 'Is able to compare classify and analyze', textMr: 'तुलना, वर्गीकरण आणि विश्लेषण करू शकतो' },
  { textEn: 'Applies previous knowledge to the current one', textMr: 'पूर्व ज्ञानाचा उपयोग पुढील अध्ययनासाठी करतो' },
  { textEn: 'Uses creative thinking in assignment', textMr: 'दिलेल्या कार्यात सर्जनशीलता दाखवतो' },
  { textEn: 'Demonstrates clarity in expressing ideas or thoughts', textMr: 'वेगवेगळ्या संकल्पना स्पष्टपणे मांडतो' },
  { textEn: 'Takes great interest in mental challenges and new concepts', textMr: 'नवीन संकल्पना आव्हान म्हणून स्वीकारतो' },
  { textEn: 'Shows interest in learning new concept', textMr: 'नवीन संकल्पनांमध्ये रस घेतो' },
  { textEn: 'Demonstrates reflective thinking', textMr: 'विचार शीलता दाखवतो' },
  { textEn: 'Connects classroom learning to real life', textMr: 'वर्गातील शिक्षण वास्तवाशी जोडतो' },
  { textEn: 'Understands abstract and complex ideas', textMr: 'गुंतागुंतीच्या संकल्पना समजतो' },
  { textEn: 'Can express on his/ her own with ease', textMr: 'स्वबळावर विचार मांडतो' },
  { textEn: 'Demonstrates independent thinking', textMr: 'स्वतंत्रपणे विचार करतो' },
  { textEn: 'Applies logic to solve problems', textMr: 'तर्कशक्तीचा वापर करून समस्यांचे निराकरण करतो' },
  { textEn: 'Asks questions and clarify doubts', textMr: 'प्रश्न विचारतो आणि शंका स्पष्ट करतो' },
  { textEn: 'Grasps new concept quickly', textMr: 'संकल्पना पटकन समजतो' },
  { textEn: 'Has developed logical and critical thinking', textMr: 'तर्कशुद्ध व समजूतदार विचार करतो' },
  { textEn: 'Has developed scientific attitude', textMr: 'वैज्ञानिक दृष्टिकोन विकसित केला आहे' }
];

const cognitiveChallenges = [
  { textEn: 'Clarify doubts and asks questions in class', textMr: 'वर्गात शंका व प्रश्न विचारावेत' },
  { textEn: 'Try to understand basic concepts of maths/science', textMr: 'गणित/विज्ञानातील मूलभूत संकल्पना समजून घ्याव्यात' },
  { textEn: 'Show more curiosity for learning', textMr: 'शिकण्याची अधिक उत्सुकता दाखवावी' },
  { textEn: 'Try to remember and take recall learnt content', textMr: 'अधिक सराव करून शिकवलेले लक्षात ठेवावे' },
  { textEn: 'Follow step by step and understand the content of all the subjects', textMr: 'विषय संकल्पना टप्प्या टप्प्याने समजून घ्याव्या' },
  { textEn: 'Show innovation and creativity in every task', textMr: 'प्रत्येक कार्यात सर्जनशीलता व नावीन्य दाखवावे' },
  { textEn: 'Develop critical thinking and ask questions in class', textMr: 'विचारशक्तीचा वापर करून प्रश्न विचारावेत' },
  { textEn: 'Increase concentration and focus in class', textMr: 'लक्ष व एकाग्रता वाढवावी' },
  { textEn: 'Build your knowledge on previous learnt content', textMr: 'पूर्व ज्ञानाच्या आधारे नव्या गोष्टी शिकाव्यात' },
  { textEn: 'Show creativity in academic work', textMr: 'शैक्षणिक कार्यात कल्पकता दाखवावी' },
  { textEn: 'Develop a habit of learning new ideas', textMr: 'नवनवीन कल्पना शिकण्याची सवय लावावी' },
  { textEn: 'Try to organize thoughts logically', textMr: 'विचार तर्कशुद्धपणे मांडण्याचा सराव करावा' },
  { textEn: 'Accept mental challenges positively', textMr: 'मानसिक आव्हाने सकारात्मकपणे स्वीकारावीत' },
  { textEn: 'Show interest in learning new topics', textMr: 'नवीन विषय शिकण्यात रस घ्यावा' },
  { textEn: 'Try to relate concept to real life', textMr: 'शिकलेल्या संकल्पना प्रत्यक्ष जीवनाशी जोडाव्यात' },
  { textEn: 'Improve your thinking skills', textMr: 'विचारशक्ती सुधारावी' },
  { textEn: 'Try to learn abstract or complex ideas think difficult', textMr: 'क्लिष्ट व गुंतागुंतीच्या विषयांचा अभ्यास करावा' },
  { textEn: 'Show courage to learn complex ideas', textMr: 'क्लिष्ट कल्पना शिकण्याचे धाडस दाखवावे' },
  { textEn: 'Try to give examples while explaining', textMr: 'स्पष्टीकरण देताना उदाहरणाचा वापर करावा' },
  { textEn: 'Try not to depend or copy from others in thinking tasks', textMr: 'स्वतंत्र विचार सारणी असावी' }
];

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  const adminId = admin ? admin.id : null;

  // Clear existing Section C remarks
  await prisma.remarkBank.deleteMany({
    where: { fieldKey: { in: ['kg_sec_c_progress', 'kg_sec_c_challenges'] } }
  });

  for (const item of cognitiveProgress) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_c_progress',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  for (const item of cognitiveChallenges) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_c_challenges',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  const pCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_c_progress' } });
  const cCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_c_challenges' } });

  console.log('Successfully inserted Cognitive Development remarks:');
  console.log('Progress Made count:', pCount);
  console.log('Progress Needed count:', cCount);
}

main().catch(console.error).finally(() => prisma.$disconnect());
