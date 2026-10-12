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

const SEC_REMARKS_JSON = JSON.stringify({
  SEC_1_PROGRESS: [
    { id: "s1_p1", en: "Has made good academic progress this term.", mr: "विद्यार्थ्याने या सत्रात चांगली शैक्षणिक प्रगती केली आहे." },
    { id: "s1_p2", en: "Shows better focus and interest in studies.", mr: "अभ्यासात अधिक लक्ष व रस दाखवतो/दाखवते." },
    { id: "s1_p3", en: "Has improved performance in class tests.", mr: "वर्ग चाचण्यांमध्ये कामगिरीत सुधारणा झाली आहे." },
    { id: "s1_p4", en: "Regular in completing homework and assignments.", mr: "गृहपाठ आणि असाइनमेंट्स वेळेवर पूर्ण करतो/करते." },
    { id: "s1_p5", en: "Shows clear understanding of key concepts.", mr: "मुख्य संकल्पनांची स्पष्ट समज दर्शवतो/दर्शवते." },
    { id: "s1_p6", en: "Demonstrates self confidence in class activities.", mr: "वर्गातील कृतींमध्ये वाढता आत्मविश्वास दिसून येतो." },
    { id: "s1_p7", en: "Applies learning effectively in practical situations.", mr: "प्रत्यक्ष परिस्थितींमध्ये शिकलेले प्रभावीपणे वापरतो/वापरते." },
    { id: "s1_p8", en: "Shows initiative in learning beyond textbooks.", mr: "पाठ्यपुस्तकाबाहेरील अध्ययनात पुढाकार घेतो/घेते." },
    { id: "s1_p9", en: "Works well independently and completes tasks responsibly.", mr: "स्वयंपूर्णपणे काम करतो/करते आणि जबाबदारीने पूर्ण करतो/करते." },
    { id: "s1_p10", en: "Has shown consistent improvement throughout the year.", mr: "वर्षभर सातत्यपूर्ण प्रगती दाखवली आहे." }
  ],
  SEC_1_NEEDED: [
    { id: "s1_n1", en: "Improve concentration during class activities.", mr: "वर्गात लक्ष केंद्रित करण्याची आवश्यकता आहे." },
    { id: "s1_n2", en: "Complete assignments on time.", mr: "असाइनमेंट्स वेळेत पूर्ण करण्याची गरज आहे." },
    { id: "s1_n3", en: "More consistent effort is required in studies.", mr: "अभ्यासात अधिक सातत्यपूर्ण प्रयत्नांची आवश्यकता आहे." },
    { id: "s1_n4", en: "To participate actively in group discussions.", mr: "वर्गातील चर्चांमध्ये सक्रिय सहभाग आवश्यक आहे." },
    { id: "s1_n5", en: "Improve handwriting and presentation innovatively.", mr: "अक्षरलेखन व सादरीकरण सुधारण्याची गरज आहे." },
    { id: "s1_n6", en: "Revise regularly to retain concepts better.", mr: "संकल्पना लक्षात राहण्यासाठी नियमित पुनरावलोकन करणे आवश्यक आहे." },
    { id: "s1_n7", en: "Reduce careless mistakes in written work.", mr: "लेखी कामामधील निष्काळजी चुका कमी करणे आवश्यक आहे." },
    { id: "s1_n8", en: "Seek help when struggling with certain topic.", mr: "एखादा विषय समजत नसल्यास मदत घेण्याची सवय करणे आवश्यक आहे." },
    { id: "s1_n9", en: "More classroom attention and discipline is required.", mr: "वर्गातील अधिक लक्ष व शिस्त आवश्यक आहे." },
    { id: "s1_n10", en: "Can achieve better results with regular practice and dedication.", mr: "नियमित सराव व समर्पणाने अधिक चांगले निकाल मिळवू शकतो/शकते." }
  ],
  SEC_2_PROGRESS: [
    { id: "s2_p1", en: "Communicates ideas clearly and confidently.", mr: "विद्यार्थी आपले विचार स्पष्ट आणि आत्मविश्वासाने मांडतो/मांडते." },
    { id: "s2_p2", en: "Shows good improvement in speaking and writing skills.", mr: "बोलणे आणि लेखन कौशल्यात चांगली प्रगती दिसून येते." },
    { id: "s2_p3", en: "Uses appropriate vocabulary while speaking and writing.", mr: "बोलताना व लिहिताना योग्य शब्दसंपत्तीचा वापर करतो/करते." },
    { id: "s2_p4", en: "Participates actively in language activities and discussions.", mr: "भाषा विषयक कृतींमध्ये व चर्चांमध्ये सक्रिय सहभाग घेतो/घेते." },
    { id: "s2_p5", en: "Has developed confidence in public speaking.", mr: "सार्वजनिक बोलण्यात आत्मविश्वास विकसित झाला आहे." },
    { id: "s2_p6", en: "Listens attentively and responds appropriately.", mr: "लक्षपूर्वक ऐकतो/ऐकते व योग्य प्रतिसाद देतो/देते." },
    { id: "s2_p7", en: "Expresses thoughts in a structured and fluent manner.", mr: "विचार सुसंगत आणि प्रभावी भाषेत व्यक्त करतो/करते." },
    { id: "s2_p8", en: "Has improved spelling and reading fluency.", mr: "शब्दलेखन आणि वाचनातील प्रवाहीपणात सुधारणा झाली आहे." },
    { id: "s2_p9", en: "Demonstrates creativity in written expression.", mr: "लेखनात सर्जनशीलता दिसून येते." }
  ],
  SEC_2_NEEDED: [
    { id: "s2_n1", en: "Speak more confidently in class.", mr: "वर्गात अधिक आत्मविश्वासाने बोलण्याची गरज आहे." },
    { id: "s2_n2", en: "Should work on improving vocabulary.", mr: "शब्दसंपत्ती वाढवण्याची गरज आहे." },
    { id: "s2_n3", en: "Avoid grammatical and spelling errors.", mr: "व्याकरण व शब्दलेखनाच्या चुका कमी करण्याची गरज आहे." },
    { id: "s2_n4", en: "Should participate more in language-related activities.", mr: "भाषा विषयक कृतींमध्ये अधिक सहभागी होण्याची गरज आहे." },
    { id: "s2_n5", en: "Improve listening skill for better comprehension.", mr: "समजून घेण्यासाठी ऐकण्याच्या कौशल्यात सुधारणा आवश्यक आहे." },
    { id: "s2_n6", en: "Organize thoughts better while speaking.", mr: "बोलताना विचार अधिक चांगल्या प्रकारे मांडण्याची आवश्यकता आहे." },
    { id: "s2_n7", en: "Improve writing skill and practice and get feedback from teachers.", mr: "लेखन कौशल्यासाठी नियमित सराव व प्रतिक्रिया आवश्यक आहेत." },
    { id: "s2_n8", en: "Build confidence to express ideas and be courageous.", mr: "विचार मांडताना संकोच करतो/करते; प्रोत्साहनाची गरज आहे." },
    { id: "s2_n9", en: "Improve communication with more reading and speaking practice.", mr: "अधिक वाचन आणि बोलण्याच्या सरावाने संवाद कौशल्य सुधारू शकतो/शकते." }
  ],
  SEC_3_PROGRESS: [
    { id: "s3_p1", en: "Thinks logically and makes wise decisions.", mr: "विद्यार्थी तर्कशुद्ध विचार करतो/करते आणि योग्य निर्णय घेतो/घेते." },
    { id: "s3_p2", en: "Shows improvement in solving complex problems.", mr: "गुंतागुंतीच्या समस्यांचे निराकरण करण्यात सुधारणा झाली आहे." },
    { id: "s3_p3", en: "Approaches tasks with a problem-solving mindset.", mr: "कामांकडे समस्यांचे निराकरण करण्याच्या दृष्टीने पाहतो/पाहते." },
    { id: "s3_p4", en: "Can analyse situations and suggest useful solutions.", mr: "परिस्थितीचे विश्लेषण करून उपयुक्त उपाय सुचवतो/सुचवते." },
    { id: "s3_p5", en: "Demonstrates logical thinking in class discussions.", mr: "वर्गातील चर्चांमध्ये तार्किक विचारशक्ती दाखवतो/दाखवते." },
    { id: "s3_p6", en: "Finds creative ways to solve problems.", mr: "समस्या सोडवण्यासाठी सर्जनशील मार्ग शोधतो/शोधते." },
    { id: "s3_p7", en: "Applies prior knowledge effectively to new challenges.", mr: "नव्या समस्यांवर जुने ज्ञान प्रभावीपणे वापरतो/वापरते." },
    { id: "s3_p8", en: "Learns from mistakes and avoids repeating them.", mr: "चुका ओळखून त्यातून शिकतो/शिकते आणि त्या पुन्हा करत नाही." },
    { id: "s3_p9", en: "Evaluates different options before making a decision.", mr: "निर्णय घेण्यापूर्वी विविध पर्यायांचा विचार करतो/करते." },
    { id: "s3_p10", en: "Shows increased confidence in solving academic problems.", mr: "शैक्षणिक समस्यांचे निराकरण करताना आत्मविश्वास वाढलेला दिसतो आहे." }
  ],
  SEC_3_NEEDED: [
    { id: "s3_n1", en: "Improve logical thinking and reasoning skills.", mr: "तार्किक विचार व तर्कशक्ती सुधारण्याची गरज आहे." },
    { id: "s3_n2", en: "Try to find solutions without much guidance.", mr: "मार्गदर्शनाशिवाय उपाय शोधण्यात अडचण येते." },
    { id: "s3_n3", en: "Analyse problems more carefully.", mr: "समस्यांचे बारकाईने विश्लेषण करण्याची गरज आहे." },
    { id: "s3_n4", en: "Should think independently and not depend on others.", mr: "स्वतंत्रपणे विचार करण्याची गरज आहे; इतरांवर अवलंबून राहू नये." },
    { id: "s3_n5", en: "Try to apply known concepts to new problems.", mr: "ओळखीच्या संकल्पना नव्या समस्यांवर लागू करण्यात अडचण येते." },
    { id: "s3_n6", en: "Ask more questions and think deeply.", mr: "अधिक प्रश्न विचारणे आणि सखोल विचार करणे आवश्यक आहे." },
    { id: "s3_n7", en: "Work on developing critical thinking habits.", mr: "विचारशक्ती विकसित करण्याच्या सवयी लावणे आवश्यक आहे." },
    { id: "s3_n8", en: "Try to arrive at conclusions with proper analysis.", mr: "योग्य विश्लेषण न करता लगेच निष्कर्ष काढतो/काढते." },
    { id: "s3_n9", en: "Stay calm and focused while solving problems.", mr: "समस्या सोडवताना शांत व लक्ष केंद्रित राहण्याची गरज आहे." },
    { id: "s3_n10", en: "Improve problem-solving skills with regular practice.", mr: "नियमित सरावाने समस्या सोडवण्याची क्षमता सुधारू शकतो/शकते." }
  ],
  SEC_4_PROGRESS: [
    { id: "s4_p1", en: "Shows respect towards teachers and classmates.", mr: "विद्यार्थी शिक्षक व सहध्यायांकडे आदराने पाहतो/पाहते." },
    { id: "s4_p2", en: "Demonstrates honesty and takes responsibility for actions.", mr: "प्रामाणिकपणा दाखवतो/दाखवते व आपल्या कृतीची जबाबदारी घेतो/घेते." },
    { id: "s4_p3", en: "Is polite, well-mannered and cooperative in nature.", mr: "नम्र, सुसंस्कृत आणि सहकार्य करणाऱ्या स्वभावाचा आहे/आहे." },
    { id: "s4_p4", en: "Participates positively in group activities and teamwork.", mr: "गट कृती व टीमवर्कमध्ये सकारात्मक सहभाग घेतो/घेते." },
    { id: "s4_p5", en: "Understands and follows school rules and discipline.", mr: "शाळेचे नियम व शिस्त समजून त्याचे पालन करतो/करते." },
    { id: "s4_p6", en: "Shows empathy and helps others when needed.", mr: "सहानुभूती दाखवतो/दाखवते व गरजूंना मदत करतो/करते." },
    { id: "s4_p7", en: "Demonstrates leadership in school and group Activities.", mr: "शाळेतील व गटातील कार्यांमध्ये नेतृत्वगुण दाखवतो/दाखवते." },
    { id: "s4_p8", en: "Maintains positive relationships with peers.", mr: "सहध्यायांशी चांगले संबंध ठेवतो/ठेवते." },
    { id: "s4_p9", en: "Takes initiative in maintaining cleanliness and order.", mr: "स्वच्छता व शिस्त राखण्यात पुढाकार घेतो/घेते." },
    { id: "s4_p10", en: "Acts responsibly in school and community settings.", mr: "शाळा व समाजामध्ये जबाबदारीने वागतो/वागते." }
  ],
  SEC_4_NEEDED: [
    { id: "s4_n1", en: "Be more respectful towards peers and teachers.", mr: "सहध्याय व शिक्षकांप्रती अधिक आदर ठेवण्याची गरज आहे." },
    { id: "s4_n2", en: "Take responsibility for your actions and behavior.", mr: "कृती व वागणुकीची जबाबदारी घ्यायला शिकणे आवश्यक आहे." },
    { id: "s4_n3", en: "Improve interaction with classmates.", mr: "सहध्यायांशी संवाद सुधारण्याची आवश्यकता आहे." },
    { id: "s4_n4", en: "Follow school rules more consistently.", mr: "शाळेचे नियम अधिक सातत्याने पाळणे आवश्यक आहे." },
    { id: "s4_n5", en: "Behave politely with patience at home and in the School.", mr: "कधी कधी उद्धट किंवा अधीरपणे वागतो/वागते." },
    { id: "s4_n6", en: "Develop empathy and concern for others.", mr: "इतरांविषयी सहानुभूती व काळजी विकसित करण्याची गरज आहे." },
    { id: "s4_n7", en: "Avoid arguments and behave calmly with classmates.", mr: "वादविवाद टाळून शांतपणे वागण्याची गरज आहे." },
    { id: "s4_n8", en: "Be more honest in academic and personal matters.", mr: "शैक्षणिक व वैयक्तिक बाबतीत अधिक प्रामाणिक होण्याची गरज आहे." },
    { id: "s4_n9", en: "Always maintain discipline in the class and outside.", mr: "शिस्त पाळण्यासाठी अनेकदा आठवण करून द्यावी लागते." },
    { id: "s4_n10", en: "Contribute more actively to group discussion and other works.", mr: "गटाच्या कामांमध्ये अधिक सक्रिय सहभाग आवश्यक आहे." }
  ],
  SEC_5_PROGRESS: [
    { id: "s5_p1", en: "Shows awareness about future career options.", mr: "विद्यार्थी भविष्यातील करिअरच्या पर्यायांबाबत जागरूक आहे/आहे." },
    { id: "s5_p2", en: "Demonstrates responsibility and independence in various activities.", mr: "कार्यांमध्ये जबाबदारी व स्वावलंबन दाखवतो/दाखवते." },
    { id: "s5_p3", en: "Manages time effectively to complete tasks.", mr: "वेळेचे योग्य नियोजन करून कार्य पूर्ण करतो/करते." },
    { id: "s5_p4", en: "Shows interest in learning real-life and practical skills.", mr: "प्रत्यक्ष जीवनातील व व्यावहारिक कौशल्ये शिकण्यात रस घेतो/घेते." },
    { id: "s5_p5", en: "Demonstrates good decision-making in daily situations.", mr: "दैनंदिन परिस्थितीत चांगले निर्णय घेण्याची क्षमता दाखवतो/दाखवते." },
    { id: "s5_p6", en: "Uses available resources efficiently.", mr: "उपलब्ध संसाधनांचा प्रभावी वापर करतो/करते." },
    { id: "s5_p7", en: "Shows readiness to learn from real-life experiences.", mr: "प्रत्यक्ष अनुभवांतून शिकण्यास तत्परता दाखवतो/दाखवते." },
    { id: "s5_p8", en: "Demonstrates leadership and teamwork in activities.", mr: "कृतींमध्ये नेतृत्वगुण व गटकार्याची भावना दाखवतो/दाखवते." },
    { id: "s5_p9", en: "Understands the importance of self-discipline and planning.", mr: "स्वअनुशासन व नियोजनाचे महत्त्व समजतो/समजते." },
    { id: "s5_p10", en: "Communicates clearly and effectively in different situations.", mr: "विविध परिस्थितींमध्ये स्पष्ट व प्रभावी संवाद साधतो/साधते." }
  ],
  SEC_5_NEEDED: [
    { id: "s5_n1", en: "Explore and understand career options better.", mr: "करिअरचे पर्याय अधिक चांगल्या प्रकारे समजून घेण्याची गरज आहे." },
    { id: "s5_n2", en: "Take more responsibility for personal choices and intrest.", mr: "वैयक्तिक कामांबाबत अधिक जबाबदारी घेण्याची गरज आहे." },
    { id: "s5_n3", en: "Improve time management skill to use time for better tasks.", mr: "वेळ व्यवस्थापनाचे कौशल्य सुधारण्याची आवश्यकता आहे." },
    { id: "s5_n4", en: "Show more interest in learning useful practical life skills.", mr: "व्यावहारिक जीवनकौशल्ये शिकण्यात अधिक रस दाखवण्याची गरज आहे." },
    { id: "s5_n5", en: "Develop decision-making skill needed further development in life.", mr: "निर्णयक्षमता अधिक विकसित करण्याची आवश्यकता आहे." },
    { id: "s5_n6", en: "Use resources wisely and responsibly which are available now.", mr: "संसाधनांचा शहाणपणाने व जबाबदारीने वापर करण्याची गरज आहे." },
    { id: "s5_n7", en: "Learn to adapt to better new and real-life situations.", mr: "नवीन व प्रत्यक्ष परिस्थितींमध्ये जुळवून घेण्याची गरज आहे." },
    { id: "s5_n8", en: "Be more involved in group and leadership tasks.", mr: "गटकार्य व नेतृत्वाच्या कामांमध्ये अधिक सहभाग आवश्यक आहे." },
    { id: "s5_n9", en: "Develop planning and organizational skills for better performance.", mr: "नियोजन व संघटन कौशल्ये विकसित करण्याची गरज आहे." },
    { id: "s5_n10", en: "Communicate ideas more clearly and confidently.", mr: "आपले विचार अधिक स्पष्ट व आत्मविश्वासाने मांडण्याची गरज आहे." }
  ],
  SEC_6_PROGRESS: [
    { id: "s6_p1", en: "Takes care of personal health and hygiene.", mr: "विद्यार्थी वैयक्तिक आरोग्य व स्वच्छतेची काळजी घेतो/घेते." },
    { id: "s6_p2", en: "Shows emotional maturity and handles stress calmly.", mr: "भावनिक समजूतदारपणा दाखवतो/दाखवते व तणाव शांतपणे हाताळतो/हाताळते." },
    { id: "s6_p3", en: "Participates actively in physical activities and sports.", mr: "क्रीडा व शारीरिक कृतींमध्ये सक्रिय सहभाग घेतो/घेते." },
    { id: "s6_p4", en: "Demonstrates awareness of healthy eating habits.", mr: "आरोग्यदायी आहाराच्या सवयींबाबत जागरूकता दाखवतो/दाखवते." },
    { id: "s6_p5", en: "Maintains a balanced routine and manages time well.", mr: "संतुलित दिनक्रम राखतो/राखते व वेळेचे चांगले व्यवस्थापन करतो/करते." },
    { id: "s6_p6", en: "Responds positively to feedback and guidance.", mr: "प्रतिक्रिया व मार्गदर्शन यांना सकारात्मक प्रतिसाद देतो/देते." },
    { id: "s6_p7", en: "Shows good control over emotions in different situations.", mr: "विविध परिस्थितींमध्ये भावनांवर चांगला ताबा ठेवतो/ठेवते." },
    { id: "s6_p8", en: "Displays energy and enthusiasm in daily school life.", mr: "दैनंदिन शालेय जीवनात उत्साह व ऊर्जा दाखवतो/दाखवते." },
    { id: "s6_p9", en: "Encourages and supports peers emotionally.", mr: "सहध्यायांना भावनिक पातळीवर प्रोत्साहन व मदत करतो/करते." },
    { id: "s6_p10", en: "Respects personal boundaries and others' feelings.", mr: "वैयक्तिक मर्यादा व इतरांच्या भावना यांचा आदर करतो/करते." }
  ],
  SEC_6_NEEDED: [
    { id: "s6_n1", en: "Pay more attention to personal hygiene and health issues.", mr: "वैयक्तिक स्वच्छतेकडे अधिक लक्ष देण्याची गरज आहे." },
    { id: "s6_n2", en: "Manage emotions better during stressful situations.", mr: "तणावपूर्ण परिस्थितीत भावना अधिक चांगल्या प्रकारे नियंत्रित करण्याची गरज आहे." },
    { id: "s6_n3", en: "Participate more actively in physical activities and games.", mr: "शारीरिक कृतींमध्ये अधिक सक्रिय सहभाग आवश्यक आहे." },
    { id: "s6_n4", en: "Improve eating habits for better health and hygine.", mr: "आरोग्यासाठी आहाराच्या सवयी सुधारण्याची आवश्यकता आहे." },
    { id: "s6_n5", en: "Maintain a balanced daily routine.", mr: "संतुलित दिनक्रम राखण्याची गरज आहे." },
    { id: "s6_n6", en: "Accept feedback with a positive attitude from teachers and parents.", mr: "प्रतिक्रिया सकारात्मक दृष्टीकोनाने स्वीकारण्याची गरज आहे." },
    { id: "s6_n7", en: "Seek help in managing emotions effectively from teachers.", mr: "भावना प्रभावीपणे हाताळण्यासाठी मदतीची गरज आहे." },
    { id: "s6_n8", en: "Be more energetic and motivated in school tasks.", mr: "शालेय कामांमध्ये अधिक उत्साही व प्रेरित राहण्याची गरज आहे." },
    { id: "s6_n9", en: "Be more empathetic and supportive towards peers.", mr: "सहध्यायांबद्दल अधिक सहानुभूतीशील व सहकार्य करणारा/करणारी होण्याची गरज आहे." },
    { id: "s6_n10", en: "Respect others' feelings and emotional space to be empathetic.", mr: "इतरांच्या भावना व भावनिक मर्यादांचा आदर करण्याची गरज आहे." }
  ]
});

// Strip outer braces from JSON string to inject into Ss object
const remarksSnippet = SEC_REMARKS_JSON.slice(1, -1);

for (const file of frontendFiles) {
  if (!fs.existsSync(file)) continue;
  let code = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Inject SEC_REMARKS into Ss
  if (!code.includes('SEC_1_PROGRESS:[')) {
    // replace SEC_DOM_1:[],... with the full remarks object
    const oldKeys = 'SEC_DOM_1:[],SEC_DOM_2:[],SEC_DOM_3:[],SEC_DOM_4:[],SEC_DOM_5:[],SEC_DOM_6:[],';
    if (code.includes(oldKeys)) {
      code = code.replace(oldKeys, remarksSnippet + ',');
      modified = true;
    } else if (code.includes('const Ss={')) {
      code = code.replace('const Ss={', 'const Ss={' + remarksSnippet + ',');
      modified = true;
    }
  }

  // 2. Update ve initial state in _h to include H
  const oldVeState = 'A:{progress:["","",""],challenges:["","",""]},B:{progress:["","",""],challenges:["","",""]},C:{progress:["","",""],challenges:["","",""]},D:{progress:["","",""],challenges:["","",""]},E:{progress:["","",""],challenges:["","",""]}';
  const newVeState = 'A:{progress:["","",""],challenges:["","",""]},B:{progress:["","",""],challenges:["","",""]},C:{progress:["","",""],challenges:["","",""]},D:{progress:["","",""],challenges:["","",""]},E:{progress:["","",""],challenges:["","",""]},H:{progress:["","",""],challenges:["","",""]}';

  if (code.includes(oldVeState)) {
    code = code.replaceAll(oldVeState, newVeState);
    modified = true;
  }

  // 3. Update Je() in _h so clicking "Choose Remark" on 8th-10th returns the corresponding domain remarks
  const oldJeStart = 'Je=()=>{const tk=';
  const newJeStart = 'Je=()=>{if(ce){const _isN=_.field==="challenges"||_.field==="CHALLENGES"||_.field==="NEEDED";const _m={A:"SEC_1",B:"SEC_2",C:"SEC_3",D:"SEC_4",E:"SEC_5",H:"SEC_6"};const _p=_m[_.secKey]||"SEC_1";const _k=`${_p}_${_isN?"NEEDED":"PROGRESS"}`;if(Ss[_k]&&Ss[_k].length>0)return Ss[_k]}const tk=';

  if (code.includes(oldJeStart) && !code.includes('if(ce){const _isN=')) {
    code = code.replace(oldJeStart, newJeStart);
    modified = true;
  }

  // 4. Update he() in _h for safe access:
  // placeholder:"Remark 1 (English & Marathi)...",value:ve[H][Se][0]||""
  const oldHe1 = 'value:ve[H][Se][0]||""';
  const newHe1 = 'value:(ve[H]&&ve[H][Se])?ve[H][Se][0]||"":""';
  if (code.includes(oldHe1)) {
    code = code.replaceAll(oldHe1, newHe1);
    modified = true;
  }
  const oldHe2 = 'value:ve[H][Se][1]||""';
  const newHe2 = 'value:(ve[H]&&ve[H][Se])?ve[H][Se][1]||"":""';
  if (code.includes(oldHe2)) {
    code = code.replaceAll(oldHe2, newHe2);
    modified = true;
  }

  // 5. In he() Ge handler: make sure Ge sets H safely
  const oldGe = 'Ge=(H,Se,fe,Le)=>{Oe(Ye=>({...Ye,[H]:{...Ye[H],[Se]:Ye[H][Se].map((Te,Qe)=>Qe===fe?Le:Te)}}))}';
  const newGe = 'Ge=(H,Se,fe,Le)=>{Oe(Ye=>{const cur=Ye[H]||{progress:["","",""],challenges:["","",""]};const curList=cur[Se]||["","",""];return{...Ye,[H]:{...cur,[Se]:curList.map((Te,Qe)=>Qe===fe?Le:Te)}}})}';
  if (code.includes(oldGe)) {
    code = code.replace(oldGe, newGe);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, code, 'utf8');
    console.log('Successfully injected remarks into:', path.basename(file), 'in', path.dirname(file));
  } else {
    console.log('No replacement needed for:', file);
  }
}

console.log('\nAll files processed successfully!');
