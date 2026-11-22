export const CATEGORIES = [
  { id: 'structure', label: 'Heterocycles', ar: 'الحلقات الكيميائية', icon: '⬡', tint: '#13A9B5', short: '01' },
  { id: 'matching', label: 'Structure Match', ar: 'بصمة التركيب', icon: '⧉', tint: '#8065CF', short: '02' },
  { id: 'spectrum', label: 'Spectral Lab', ar: 'معمل الأطياف', icon: '〽', tint: '#E9A12C', short: '03' },
  { id: 'detective', label: 'Drug Detective', ar: 'تحدى المحقق', icon: '⌕', tint: '#EC7F82', short: '04' },
  { id: 'safety', label: 'Use It Safely', ar: 'الاستخدام الآمن', icon: '✚', tint: '#258F73', short: '05' }
];

// These questions are adapted from the supplied brochure/screenshots and independently
// cross-checked against PubChem (CID 152946) and DailyMed prescribing information.
// IR/NMR drawings are teaching schematics, NOT experimental reference spectra.
export const QUESTIONS = [
  {
    id: 'st-1', category: 'structure', type: 'molecule', title: 'Find the bicyclic amine',
    question: 'اضغط على مجموعة الـ bicyclic amine المرتبطة بموضع C7 فى Moxifloxacin.', answer: 'bicyclic',
    explanation: 'البديل عند C7 هو bicyclic amine من نوع octahydropyrrolo[3,4-b]pyridine، مش حلقة piperazine عادية.',
    detail: 'C7 • DIAZABICYCLIC AMINE'
  },
  {
    id: 'st-2', category: 'structure', type: 'molecule', title: 'Spot the core',
    question: 'اضغط على نواة الـ 4-oxoquinoline المندمجة الأساسية فى الجزيء.', answer: 'quinolone',
    explanation: 'نواة Quinolone بتتكون من حلقتين مندمجتين، وبتحمل الـ 4-oxo والـ carboxylic acid المرتبطة بالنشاط الدوائى.',
    detail: 'FUSED QUINOLONE CORE'
  },
  {
    id: 'st-3', category: 'structure', type: 'molecule', title: 'Heterocycle or not?',
    question: 'اضغط على حلقة Cyclopropyl، اللى مش Heterocycle لأنها مكوّنة من كربون بس.', answer: 'cyclopropyl',
    explanation: 'Cyclopropyl حلقة ثلاثية كلها كربون، على عكس الحلقات الـ heterocyclic اللى بتحتوى على ذرة غير الكربون.',
    detail: 'N1 • CYCLOPROPYL'
  },
  {
    id: 'st-4', category: 'structure', type: 'molecule', title: 'The acid clue',
    question: 'حدد مجموعة الـ COOH (carboxylic acid) الموجودة عند C3 من النواة.', answer: 'carboxyl',
    explanation: 'مجموعة COOH موجودة عند C3، وهى جزء مهم من التركيب المشترك لأدوية الفلوروكينولون.',
    detail: 'C3 • CARBOXYLIC ACID'
  },
  {
    id: 'ma-1', category: 'matching', type: 'matching', title: 'Match the molecules',
    question: 'وصّل كل Fluoroquinolone بالبصمة التركيبية اللى بتميزه.',
    pairs: [
      ['Moxifloxacin','C8–OCH₃ + C7 bicyclic amine'],
      ['Ciprofloxacin','N1 cyclopropyl + C7 piperazine؛ من غير C8–OCH₃'],
      ['Gatifloxacin','C8–OCH₃ + 3-methylpiperazine'],
      ['Levofloxacin','حلقة Oxazine مندمجة + methylpiperazine']
    ],
    explanation: 'وجود C8–OCH₃ وحده مش كفاية للتفريق بين Moxifloxacin وGatifloxacin؛ شوف نوع الـ C7 side chain كمان.'
  },
  {
    id: 'ma-2', category: 'matching', type: 'choice', title: 'The distinguishing feature',
    question: 'إيه أهم علامة تميز Moxifloxacin عن Ciprofloxacin فى المقارنة التركيبية؟',
    options: ['C8–OCH₃ + bicyclic amine', 'غياب ذرة الفلور', 'حلقة Cyclopropyl من غير N1', 'غياب مجموعة COOH'], answer: 0,
    explanation: 'Moxifloxacin فيه methoxy عند C8 وbicyclic amine عند C7، بينما Ciprofloxacin فيه piperazine ومفيهوش C8 methoxy.'
  },
  {
    id: 'ma-3', category: 'matching', type: 'choice', title: 'Spot ciprofloxacin',
    question: 'دواء فيه N1 cyclopropyl وC7 piperazine لكن مفيهوش C8–OCH₃. مين هو؟',
    options: ['Gatifloxacin', 'Moxifloxacin', 'Ciprofloxacin', 'Levofloxacin'], answer: 2,
    explanation: 'الوصف ده ينطبق على Ciprofloxacin؛ على عكس Moxifloxacin اللى فيه C8 methoxy.'
  },
  {
    id: 'ma-4', category: 'matching', type: 'choice', title: 'The methyl clue',
    question: 'مين من الاختيارات فيه C8 methoxy مع methyl-substituted piperazine عند C7؟',
    options: ['Ciprofloxacin', 'Gatifloxacin', 'Levofloxacin', 'Moxifloxacin'], answer: 1,
    explanation: 'Gatifloxacin فيه 8-methoxy و3-methylpiperazine؛ أما Moxifloxacin فبيحتوى على bicyclic amine.'
  },
  {
    id: 'sp-1', category: 'spectrum', type: 'choice', spectrum: 'irOH', title: 'A broad mystery',
    question: 'فى الرسم التعليمى للـ IR: حزمة O–H عريضة فى المنطقة العالية نسبياً بتدل على إيه؟',
    options: ['Carboxylic acid O–H', 'Ketone C=O', 'C–F bond', 'Aromatic C=C'], answer: 0,
    explanation: 'الـ carboxylic acid O–H بيظهر عادةً كحزمة واسعة جداً حوالى 2500–3300 cm⁻¹ وقد تمتد أعلى من كده.'
  },
  {
    id: 'sp-2', category: 'spectrum', type: 'choice', spectrum: 'irCO', title: 'The carbonyl signal',
    question: 'قمة IR قوية فى منطقة ~1700 cm⁻¹ غالباً بترتبط بأى رابطة؟',
    options: ['N–H', 'C=O', 'C–F', 'O–H'], answer: 1,
    explanation: 'رابطة C=O بتظهر امتصاص قوى فى المنطقة القريبة من 1700 cm⁻¹؛ الموضع الفعلى يتغير حسب البيئة الكيميائية.'
  },
  {
    id: 'sp-3', category: 'spectrum', type: 'choice', spectrum: 'nmrMethoxy', title: 'The methoxy singlet',
    question: 'فى النموذج التعليمى لـ ¹H NMR، إشارة singlet بتكامل 3H حوالى δ 3.9 ppm تدل على إيه؟',
    options: ['Cyclopropyl', 'Aromatic proton', 'Methoxy OCH₃', 'Ring NH'], answer: 2,
    explanation: 'مجموعة Methoxy (OCH₃) بتدى غالباً إشارة 3H singlet فى المنطقة دى.'
  },
  {
    id: 'sp-4', category: 'spectrum', type: 'choice', spectrum: 'nmrCyclo', title: 'Upfield clue',
    question: 'إشارات متعددة منخفضة الإزاحة عند δ 0.7–1.2 ppm تقريباً ممكن تتوافق مع إيه؟',
    options: ['Piperazine CH₂', 'Cyclopropyl protons', 'Aromatic protons', 'Methoxy OCH₃'], answer: 1,
    explanation: 'بعض بروتونات Cyclopropyl بتظهر upfield؛ ده نطاق تعليمى تقريبى وبيتأثر بالوسط والتركيب.'
  },
  {
    id: 'sp-5', category: 'spectrum', type: 'choice', spectrum: 'nmrCipro', title: 'The missing peak',
    question: 'دواء من الفلوروكينولونات فيه Cyclopropyl وPiperazine، لكن من غير singlet 3H للـ OCH₃. مين هو؟',
    options: ['Moxifloxacin', 'Ciprofloxacin', 'Gatifloxacin', 'كلهم عندهم OCH₃'], answer: 1,
    explanation: 'Ciprofloxacin مفيهوش C8 methoxy؛ عشان كده مش متوقع نشوف إشارة 3H الخاصة بالمجموعة دى.'
  },
  {
    id: 'de-1', category: 'detective', type: 'choice', title: 'Case file #401',
    question: 'الصيغة الجزيئية C₂₁H₂₄FN₃O₄ والكتلة المولية حوالى 401.4 g/mol بتشير لأى دواء؟',
    options: ['Levofloxacin', 'Ciprofloxacin', 'Moxifloxacin', 'Gatifloxacin'], answer: 2,
    explanation: 'Moxifloxacin free base صيغته C₂₁H₂₄FN₃O₄ وكتلته المولية حوالى 401.43 g/mol.'
  },
  {
    id: 'de-2', category: 'detective', type: 'choice', title: 'Classified substance',
    question: 'Moxifloxacin بينتمى لأى فئة من المضادات الحيوية؟',
    options: ['Macrolides', 'Fluoroquinolones', 'Penicillins', 'Tetracyclines'], answer: 1,
    explanation: 'Moxifloxacin من عائلة الـ Fluoroquinolones اللى بتؤثر على DNA gyrase وtopoisomerase IV.'
  },
  {
    id: 'de-3', category: 'detective', type: 'choice', title: 'Final identification',
    question: 'عندك دليلين: C8–OCH₃ وC7 diazabicyclic side chain. إيه اسم المركّب؟',
    options: ['Gatifloxacin', 'Levofloxacin', 'Moxifloxacin', 'Ciprofloxacin'], answer: 2,
    explanation: 'الاتنين مع بعض من أهم العلامات المميزة لتركيب Moxifloxacin.'
  },
  {
    id: 'sa-1', category: 'safety', type: 'choice', title: 'Interaction alert',
    question: 'أى مادة لازم تفصلها زمنياً عن جرعة Moxifloxacin الفموية بسبب تأثيرها على الامتصاص؟',
    options: ['مضادات حموضة فيها Mg أو Al', 'المياه', 'فيتامين B12 وحده', 'الخبز'], answer: 0,
    explanation: 'الأيونات متعددة التكافؤ زى Mg/Al/Fe/Zn بتعمل Chelation. الأقراص تؤخذ 4 ساعات قبلها أو 8 ساعات بعدها حسب النشرة.'
  },
  {
    id: 'sa-2', category: 'safety', type: 'choice', title: 'Red flag',
    question: 'أى تحذير مهم معروف مع أدوية Fluoroquinolones؟',
    options: ['Tendon injury / rupture', 'Hair loss فقط', 'Gum bleeding فقط', 'Hearing loss فقط'], answer: 0,
    explanation: 'من التحذيرات المهمة التهاب/تمزق الأوتار، الاعتلال العصبى الطرفى، وتأثيرات الجهاز العصبى، مع مخاطر زى QT prolongation.'
  },
  {
    id: 'sa-3', category: 'safety', type: 'choice', title: 'Dose detective',
    question: 'إيه الجرعة الفموية المعتادة للبالغين حسب النشرة الدوائية؟',
    options: ['400 mg مرة يومياً', '100 mg كل ساعة', '1000 mg مرتين', 'تؤخذ من غير وصفة'], answer: 0,
    explanation: 'الجرعة المعتادة 400 mg مرة كل 24 ساعة حسب نوع العدوى وتقييم الطبيب؛ مش إرشاد لاستخدامه من غير وصفة.'
  },
  {
    id: 'sa-4', category: 'safety', type: 'choice', title: 'Keep it safe',
    question: 'إيه طريقة التخزين الصحيحة للأقراص؟',
    options: ['فى الفريزر', 'فى العبوة الأصلية بدرجة حرارة الغرفة بعيداً عن الرطوبة', 'فى الحمام', 'فى الشمس'], answer: 1,
    explanation: 'اتبع تعليمات العبوة؛ التخزين المعتاد بدرجة حرارة الغرفة، بعيداً عن الرطوبة والحرارة الزائدة.'
  }
];

export const SOURCES = [
  { label: 'PubChem · Moxifloxacin CID 152946', url: 'https://pubchem.ncbi.nlm.nih.gov/compound/152946' },
  { label: 'DailyMed · Moxifloxacin oral tablets', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1c6f7150-a8f4-408f-956f-c26d37030cf4' }
];
