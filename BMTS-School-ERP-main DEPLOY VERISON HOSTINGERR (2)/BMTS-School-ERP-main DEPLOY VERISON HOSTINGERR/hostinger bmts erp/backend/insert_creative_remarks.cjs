const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const prisma = new PrismaClient();

const creativeProgress = [
  { textEn: 'Shows great interest in drawing and craft', textMr: 'चित्रकला आणि हस्तकलेत खूप रस दाखवतो' },
  { textEn: 'Participates enthusiastically in cultural activities', textMr: 'सांस्कृतिक उपक्रमांमध्ये उत्साहाने सहभागी होतो' },
  { textEn: 'Curious to learn about various festivals', textMr: 'विविध सणांविषयी जाणून घेण्याची उत्सुकता आहे' },
  { textEn: 'Shows more interest in drawing', textMr: 'चित्रकलेत अधिक रस दाखवतो' },
  { textEn: 'Increase awareness about cultures of society', textMr: 'समाजातील संस्कृतीबाबत जागरूकता वाढवतो' },
  { textEn: 'Shows interest in role play', textMr: 'भूमिकानाट्यामध्ये रस दाखवतो' },
  { textEn: 'Contributes creatively for the intelligence board in class', textMr: 'वर्गातील कल्पक फलकासाठी सर्जनशील योगदान देतो' },
  { textEn: 'Displays creativity in drawing and painting', textMr: 'चित्रकला आणि रंगकामात सर्जनशीलता दाखवतो' },
  { textEn: 'Write poems and songs in traditional languages', textMr: 'पारंपरिक भाषेत कविता व गाणी लिहितो' },
  { textEn: 'Shows respect to other cultures and festivals', textMr: 'इतर संस्कृती व सणांचा आदर करतो' },
  { textEn: 'Demonstrates good aesthetic sense in various activities', textMr: 'विविध उपक्रमांमध्ये सौंदर्यदृष्टिकोन दाखवतो' },
  { textEn: 'Takes initiative in organising culture activities', textMr: 'सांस्कृतिक उपक्रमांचे आयोजन करण्यात पुढाकार घेतो' },
  { textEn: 'Appreciates traditional and folk arts and songs', textMr: 'पारंपरिक आणि लोककला व गाण्यांची आवड आहे' },
  { textEn: 'Shows originality in artistic expressions', textMr: 'कलात्मक अभिव्यक्तीत मौलिकता दाखवतो' },
  { textEn: 'Enjoys listening and learning music', textMr: 'संगीत ऐकण्यात व शिकण्यात आनंद घेतो' },
  { textEn: 'Sings with a proper rhythm and tune', textMr: 'गाणी योग्य ताल व सुरात गातो' },
  { textEn: 'Takes part in school exhibition and act', textMr: 'शाळेच्या प्रदर्शनात व नाटकात भाग घेतो' },
  { textEn: 'Takes part in school cultural activities', textMr: 'शालेय सांस्कृतिक उपक्रमांमध्ये भाग घेतो' },
  { textEn: 'Is sensitive to beauty in nature and surrounding', textMr: 'निसर्गातील सौंदर्य व आजूबाजूच्या गोष्टीबाबत संवेदनशील आहे' },
  { textEn: 'Shows cultural sensitivity and awareness', textMr: 'सांस्कृतिक संवेदनशीलता व जागरूकता दाखवतो' },
  { textEn: 'Learns and performs dance steps quickly', textMr: 'नृत्य कला पटकन शिकतो व सादर करतो' },
  { textEn: 'Can perform on stage with confidence', textMr: 'व्यासपीठावर आत्मविश्वासाने सादरीकरण करतो' },
  { textEn: 'Expresses feelings through artistic forms', textMr: 'कलात्मक माध्यमातून भावना व्यक्त करतो' },
  { textEn: 'Is always eager to learn about different cultures and traditions', textMr: 'विविध संस्कृती व परंपरांविषयी जाणून घेण्यास नेहमी उत्सुक असतो' },
  { textEn: 'Brings in originality and innovation in his/ her own performance', textMr: 'आपल्या सादरीकरणात मौलिकता व नावीन्य दाखवतो' }
];

const creativeChallenges = [
  { textEn: 'Develop stage daring and confidence', textMr: 'व्यासपीठावर सादरीकरण करताना धाडस व आत्मविश्वास वाढवा' },
  { textEn: 'Participate in all the cultural activities in the school', textMr: 'शाळेतील सर्व सांस्कृतिक उपक्रमांमध्ये सहभागी व्हा' },
  { textEn: 'Put in more interest in craft and drawing', textMr: 'हस्तकला व चित्रकलेत अधिक रस घ्या' },
  { textEn: 'Improve facial and posture expressions when dancing', textMr: 'नृत्य करताना चेहऱ्यावर आणि शरीरावर योग्य हावभाव आणा' },
  { textEn: 'Give more attention to art and craft activities', textMr: 'कला व हस्तकला उपक्रमांकडे अधिक लक्ष द्या' },
  { textEn: 'Put in more interest in dance and singing competitions', textMr: 'नृत्य व गायन स्पर्धांमध्ये अधिक रस घ्या' },
  { textEn: 'Take interest in local cultures and traditions', textMr: 'स्थानिक संस्कृती व परंपरांमध्ये रस घ्या' },
  { textEn: 'Increase creativity in art related works', textMr: 'कला संबंधित कामांमध्ये सर्जनशीलता वाढवा' },
  { textEn: 'Show appreciation for different art forms in and around', textMr: 'आजूबाजूच्या विविध कलांची प्रशंसा करा' },
  { textEn: 'Engage more and more in aesthetic activities', textMr: 'सौंदर्यविषयक उपक्रमांमध्ये अधिक सहभाग घ्या' },
  { textEn: 'Enhance confidence in stage performance', textMr: 'व्यासपीठावर सादरीकरण करताना आत्मविश्वास वाढवा' },
  { textEn: 'Follow instructions given in art or music classes', textMr: 'कला किंवा संगीत वर्गात दिलेल्या सूचनांचे पालन करा' },
  { textEn: 'Show originality and creativity in cultural tasks', textMr: 'सांस्कृतिक उपक्रमांमध्ये सादरीकरण करताना मौलिकता व सर्जनशीलता दाखवा' },
  { textEn: 'Not to distract others during artistic performance or presentations', textMr: 'सादरीकरण किंवा सादरीकरणाच्या वेळी इतरांना व्यत्यय आणू नका' },
  { textEn: 'Express more and more through art performance', textMr: 'कलेच्या माध्यमातून अधिक भावना व्यक्त करा' },
  { textEn: 'Show more interest in school events organises', textMr: 'शाळेतील कार्यक्रमांमध्ये अधिक रस दाखवा' },
  { textEn: 'Involve more and more in group cultural tasks', textMr: 'सांघिक सांस्कृतिक उपक्रमांमध्ये अधिक सहभाग घ्या' },
  { textEn: 'Show interest to learn new cultures and traditions', textMr: 'नवीन संस्कृती आणि परंपरा शिकण्यात रस दाखवा' }
];

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  const adminId = admin ? admin.id : null;

  // Clear existing Section E remarks
  await prisma.remarkBank.deleteMany({
    where: { fieldKey: { in: ['kg_sec_e_progress', 'kg_sec_e_challenges'] } }
  });

  for (const item of creativeProgress) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_e_progress',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  for (const item of creativeChallenges) {
    await prisma.remarkBank.create({
      data: {
        fieldKey: 'kg_sec_e_challenges',
        textEn: item.textEn,
        textMr: item.textMr,
        active: true,
        createdBy: adminId
      }
    });
  }

  const pCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_e_progress' } });
  const cCount = await prisma.remarkBank.count({ where: { fieldKey: 'kg_sec_e_challenges' } });

  console.log('Successfully inserted Creative & Aesthetic Development remarks:');
  console.log('Progress Made count:', pCount);
  console.log('Progress Needed count:', cCount);
}

main().catch(console.error).finally(() => prisma.$disconnect());
