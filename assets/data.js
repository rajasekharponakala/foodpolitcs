window.bookData = {
  sources: {
    S1: {
      title: 'National Family Health Survey (NFHS-5), 2019–21 — India report',
      publisher: 'IIPS & ICF',
      url: 'https://dhsprogram.com/pubs/pdf/FR375/FR375.pdf',
      type: 'National household survey',
      note: 'Used for child anaemia, infant feeding and self-reported food consumption. Survey estimates describe a population at a point in time.'
    },
    S2: {
      title: 'Comprehensive National Nutrition Survey (CNNS), 2016–18',
      publisher: 'Ministry of Health and Family Welfare / UNICEF',
      url: 'https://www.unicef.org/india/media/2646/file/CNNS-report.pdf',
      type: 'National survey',
      note: 'Used for wealth and residence differences in underweight, zinc and vitamin D estimates. Its fieldwork predates NFHS-5.'
    },
    S3: {
      title: 'India had over 32 million stunted children as of December 2023',
      publisher: 'Down To Earth, reporting a Rajya Sabha reply, 8 February 2024',
      url: 'https://www.downtoearth.org.in/governance/as-told-to-parliament-february-7-2024-india-had-over-32-million-stunted-children-as-of-december-2023-94351',
      type: 'Parliamentary statement / reported',
      note: 'The book cites 89.1 million children measured and 36% stunted. This is administrative measurement, not a new probability-sample survey.'
    },
    S4: {
      title: 'Protein-quality evaluation of complementary foods in Indian children',
      publisher: 'Shivakumar et al., American Journal of Clinical Nutrition, 2019',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6499502/',
      type: 'Controlled digestion study',
      note: 'True ileal indispensable amino-acid digestibility. Results apply to the tested foods and study conditions, not every preparation.'
    },
    S5: {
      title: 'Comprehensive National Nutrition Survey — micronutrient tables',
      publisher: 'CNNS, 2016–18',
      url: 'https://www.unicef.org/india/media/2646/file/CNNS-report.pdf',
      type: 'National survey',
      note: 'Zinc deficiency estimates cited in the book: 19% pre-school, 17% school-age and 32% adolescents.'
    },
    S6: {
      title: 'UDISE report for Karnataka, 2016–17',
      publisher: 'Unified District Information System for Education',
      url: 'https://udiseplus.gov.in/',
      type: 'Administrative education data',
      note: 'The book quotes a composition figure from Sayeed (2019): 93.79% SC, ST or OBC, including Muslims. It describes school enrolment, not diet.'
    },
    S7: {
      title: 'Higher bioaccessibility of iron and zinc from food grains in the presence of garlic and onion',
      publisher: 'Gautam, Platel & Srinivasan, Journal of Agricultural and Food Chemistry, 2010',
      url: 'https://pubmed.ncbi.nlm.nih.gov/20597543/',
      type: 'Laboratory digestion study',
      note: 'Bioaccessibility measured in simulated digestion is not the same as improved haemoglobin or long-term child health.'
    },
    S8: {
      title: 'Dairy products and physical stature: a systematic review and meta-analysis of controlled trials',
      publisher: 'de Beer, Economics & Human Biology, 2012',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21890437/',
      type: 'Systematic review / meta-analysis',
      note: 'Estimated about 0.4 cm additional annual linear growth per 245 ml/day of milk. Not a universal prescription.'
    },
    S9: {
      title: 'Ultra-processed diets cause excess calorie intake and weight gain',
      publisher: 'Hall et al., Cell Metabolism, 2019',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7946062/',
      type: 'Small randomized controlled trial',
      note: 'Twenty adults, two weeks per diet in a controlled inpatient setting. Do not generalize the exact effect to all people or foods.'
    },
    S10: {
      title: 'Estimated micronutrient shortfalls of the EAT–Lancet planetary health diet',
      publisher: 'Beal, Ortenzi & Fanzo, The Lancet Planetary Health, 2023',
      url: 'https://pubmed.ncbi.nlm.nih.gov/36889864/',
      type: 'Modelling study',
      note: 'Modelled adequacy depends on food-composition assumptions and excludes fortification/supplementation in the cited scenario.'
    },
    S11: {
      title: 'The 2025 EAT–Lancet Commission on healthy, sustainable and just food systems',
      publisher: 'EAT / The Lancet',
      url: 'https://www.thelancet.com/commissions-do/EAT-2025',
      type: 'Updated commission report',
      note: 'Later context: the 2025 update adds safeguards for young children and women of reproductive age, including fortification or supplementation where appropriate.'
    },
    S12: {
      title: 'National Food Security Act, 2013 and nutritional tables',
      publisher: 'Government of India, Department of Food and Public Distribution',
      url: 'https://dfpd.gov.in/WriteReadData/Other/nfsa_1.pdf',
      type: 'Law / official notification',
      note: 'The book cites the original 450 kcal / 12 g and 700 kcal / 20 g school-meal values. The official compilation also includes later amended tables; check the latest notification before implementation.'
    },
    S13: {
      title: 'The nutritional cost of beef bans in India',
      publisher: 'Dasgupta, Majid & Orman, Journal of Development Economics, 2023',
      url: 'https://www.sciencedirect.com/science/article/pii/S0304387823000597',
      type: 'Quasi-experimental study',
      note: 'Estimated effects apply to the study population and identification strategy; they should not be generalized to every community or state.'
    },
    S14: {
      title: 'Food in the Anthropocene: the EAT–Lancet Commission',
      publisher: 'The Lancet, 2019',
      url: 'https://doi.org/10.1016/S0140-6736(18)31788-4',
      type: 'Commission report',
      note: 'A flexible 2,500 kcal/day reference pattern for ages 2+, not a meat ban or an individualized clinical prescription.'
    },
    S15: {
      title: 'Infant and young child feeding',
      publisher: 'World Health Organization',
      url: 'https://www.who.int/health-topics/infant-and-young-child-feeding',
      type: 'Public-health guidance',
      note: 'General guidance includes exclusive breastfeeding for six months and appropriate complementary feeding from six months alongside continued breastfeeding.'
    }
  },

  nutrient: {
    protein: {
      eyebrow: 'Protein quality / study view',
      title: 'Not all protein is used in the same way.',
      intro: 'Digestibility measures how much of a protein is broken down and available for use. It is only one part of protein quality—amino-acid composition matters too.',
      chart: [
        { label: 'Mung bean', value: 65.2, display: '65.2%', color: 'lime' },
        { label: 'Finger millet', value: 68.4, display: '68.4%', color: 'yellow' },
        { label: 'Rice', value: 78.5, display: '78.5%', color: 'blue' },
        { label: 'Chicken egg', value: 87.4, display: '87.4%', color: 'coral' }
      ],
      footer: 'True ileal indispensable amino-acid digestibility in Indian children. Study foods and methods matter; this is not a ranking of whole diets.',
      source: 'S4'
    },
    iron: {
      eyebrow: 'Iron / absorption view',
      title: 'Content is not the same as absorption.',
      intro: 'The iron in food, the meal around it, the preparation method and a person’s health all influence how much iron is absorbed.',
      factors: [
        { icon: '●', title: 'Haem iron', text: 'Found in meat, poultry and fish; generally more readily absorbed than non-haem iron.' },
        { icon: '✚', title: 'Vitamin C', text: 'Can improve absorption of non-haem iron from beans, grains and leafy vegetables in the same meal.' },
        { icon: '≈', title: 'Preparation', text: 'Soaking, sprouting, fermentation and suitable combinations can improve the usefulness of some plant foods.' },
        { icon: '!', title: 'Clinical context', text: 'Infection, inflammation, life stage and diagnosis matter. Supplements are not a substitute for assessment.' }
      ],
      footer: 'A varied diet can combine plant and animal sources. No single food or absorption percentage describes a person’s iron status.',
      source: 'S1'
    },
    b12: {
      eyebrow: 'Vitamin B12 / planning view',
      title: 'Some nutrients need a reliable source.',
      intro: 'Vitamin B12 is important for blood formation and the nervous system. Naturally reliable sources include animal foods and fortified foods.',
      factors: [
        { icon: 'B₁₂', title: 'Animal foods', text: 'Eggs, milk and other animal-source foods can contribute B12; amounts and individual needs vary.' },
        { icon: '＋', title: 'Fortified foods', text: 'Check labels and serving sizes. Fortification can be useful when it reaches the people who need it.' },
        { icon: '✓', title: 'Vegan planning', text: 'A well-planned vegan diet needs a reliable B12 source through fortified foods and/or supplementation.' },
        { icon: '?', title: 'Symptoms are not a test', text: 'Fatigue and other non-specific symptoms have many causes; diagnosis belongs with a qualified clinician.' }
      ],
      footer: 'This is general nutrition literacy, not individual medical advice or a supplement dose.',
      source: 'S1'
    }
  },

  accessSteps: [
    {
      id: 'income', number: '01', title: 'Affordability', short: 'Can the food be bought?',
      text: 'A nutritious diet has a price. Income, wages, debt and market shocks determine whether knowledge about food can become a meal.',
      stat: '48% vs 19%', statLabel: 'underweight, poorest vs richest wealth quintile, children under five',
      source: 'S2', chapter: 'Chapter 4'
    },
    {
      id: 'availability', number: '02', title: 'Availability', short: 'Is the food in the market?',
      text: 'Supply chains, seasonality, geography, storage and procurement determine what reaches a shop, school kitchen or community.',
      stat: 'Supply ≠ access', statLabel: 'food can exist in a system without reaching a household or institution',
      source: 'S12', chapter: 'Chapters 8–9'
    },
    {
      id: 'acceptance', number: '03', title: 'Acceptance', short: 'Is the food permitted?',
      text: 'Caste, religion, gender, school rules and social pressure can decide which foods are considered acceptable—for whom, and where.',
      stat: '29% / 17%', statLabel: 'women / men reporting never consuming fish, meat or eggs in NFHS-5',
      source: 'S1', chapter: 'Chapter 6'
    },
    {
      id: 'plate', number: '04', title: 'The plate', short: 'What is actually eaten?',
      text: 'Portion size, diversity, preparation, taste, safety and bioavailability turn purchased food into nourishment. A menu is not proof of consumption.',
      stat: '53%', statLabel: 'infants aged 6–8 months receiving timely complementary feeding, NFHS-5',
      source: 'S1', chapter: 'Chapter 1'
    },
    {
      id: 'health', number: '05', title: 'Health', short: 'What does the body receive?',
      text: 'Nutrition interacts with infection, sanitation, physical activity, healthcare and the first thousand days. Outcomes cannot be traced to one food alone.',
      stat: '67%', statLabel: 'children aged 6–59 months with some degree of anaemia, NFHS-5',
      source: 'S1', chapter: 'Chapters 3–4'
    }
  ],

  mealFoods: [
    { id: 'staple', icon: '🌾', name: 'Rice / wheat staple', roles: ['energy'], hint: 'A common base; refinement and portion size matter.' },
    { id: 'pulse', icon: '🥣', name: 'Dal / beans', roles: ['energy', 'protein'], hint: 'Plant protein and fibre; preparation can improve digestibility.' },
    { id: 'vegetable', icon: '🥦', name: 'Seasonal vegetables', roles: ['diversity'], hint: 'Adds variety, fibre and micronutrients.' },
    { id: 'greens', icon: '🍃', name: 'Greens + vitamin C food', roles: ['iron', 'diversity'], hint: 'Vitamin C can support non-haem iron absorption.' },
    { id: 'egg', icon: '🥚', name: 'Egg', roles: ['protein', 'iron', 'b12'], hint: 'Digestible protein and several micronutrients.' },
    { id: 'dairy', icon: '🥛', name: 'Milk / curd', roles: ['protein', 'calcium', 'b12'], hint: 'Contributes protein, calcium and B12.' },
    { id: 'fish', icon: '🐟', name: 'Fish / meat', roles: ['protein', 'iron', 'b12'], hint: 'Can contribute highly available protein, iron, zinc and B12.' },
    { id: 'fruit', icon: '🍊', name: 'Fruit / amla / guava', roles: ['diversity', 'vitaminC'], hint: 'Adds dietary diversity and, for some fruits, vitamin C.' }
  ],

  mealRoles: [
    { id: 'energy', label: 'Energy base' },
    { id: 'protein', label: 'Protein' },
    { id: 'iron', label: 'Iron-rich role' },
    { id: 'b12', label: 'B12 source' },
    { id: 'calcium', label: 'Calcium source' },
    { id: 'diversity', label: 'Plant diversity' },
    { id: 'vitaminC', label: 'Vitamin C support' }
  ],

  myths: [
    {
      id: 'milk', category: 'identity', claim: '“Milk is pure veg, but eggs and meat are impure.”',
      response: 'The book questions a purity hierarchy: milk is animal-derived nutritionally, even when a culture or religion classifies it as vegetarian.',
      nuance: '“Animal-source” is a nutrition category; “vegetarian” can be a cultural or religious category. Neither label alone describes a food’s nutrients or ethics.',
      source: 'S1', chapter: 'Chapters 5–6'
    },
    {
      id: 'india-veg', category: 'identity', claim: '“India is essentially a vegetarian country.”',
      response: 'NFHS-5 found large majorities of women and men had consumed fish, meat or eggs at least occasionally. Identity and intake are not the same measure.',
      nuance: 'Self-report can be affected by social desirability, and food frequency is not quantity. Do not infer any individual’s diet from religion, caste or region.',
      source: 'S1', chapter: 'Chapter 6'
    },
    {
      id: 'no-harm', category: 'identity', claim: '“A vegetarian diet involves no animal use or harm.”',
      response: 'The book argues that dairy and other animal-derived products complicate claims of complete non-use or ethical superiority.',
      nuance: 'Vegetarian diets may reduce direct slaughter. Production systems differ in welfare and environmental effects; labels do not settle every ethical question.',
      source: 'S1', chapter: 'Chapter 6'
    },
    {
      id: 'height', category: 'nutrition', claim: '“Taller populations prove that avoiding meat is healthier.”',
      response: 'Height is shaped by total diet, dairy intake, poverty, infection, care and genetics. State-level comparisons cannot isolate one food.',
      nuance: 'A meta-analysis cited in the book estimated a modest growth benefit from milk supplementation, but that is not evidence that every child needs the same amount.',
      source: 'S8', chapter: 'Chapter 5'
    },
    {
      id: 'eggs', category: 'nutrition', claim: '“Eggs should be avoided because cholesterol is always harmful.”',
      response: 'Eggs provide digestible protein and micronutrients. The book argues that blanket cholesterol warnings have been overstated for many people.',
      nuance: 'Individual medical conditions matter. Blood lipids, overall dietary pattern and processed foods should not be collapsed into a single-food verdict.',
      source: 'S1', chapter: 'Chapter 5'
    },
    {
      id: 'anaemia', category: 'nutrition', claim: '“Anaemia is always iron deficiency, so iron alone is the answer.”',
      response: 'The book emphasizes that anaemia has multiple causes and that haemoglobin production depends on several nutrients and health conditions.',
      nuance: 'Diagnosis and public-health guidance matter. Food-first approaches and targeted fortification can complement each other; indiscriminate supplementation can be unsafe.',
      source: 'S1', chapter: 'Chapters 3 and 5'
    },
    {
      id: 'millets', category: 'nutrition', claim: '“Millets or soya automatically replace every animal food.”',
      response: 'Millets and soya can be valuable, but digestibility, amino-acid balance, mineral absorption and the rest of the diet determine their contribution.',
      nuance: 'Climate resilience does not automatically mean nutrient equivalence. Well-planned plant diets can meet needs; reliable B12 and attention to iron, zinc and calcium remain important.',
      source: 'S4', chapter: 'Chapters 2–3 and 5'
    },
    {
      id: 'beef', category: 'policy', claim: '“Restrictions on beef are nutrition-neutral.”',
      response: 'The book argues that restrictions can remove affordable nutrients and disrupt cattle-dependent livelihoods. A cited study estimates adverse haemoglobin effects in specific beef-consuming communities.',
      nuance: 'This is not proof that every restriction has the same effect everywhere. Nutrition, livelihood, culture, animal welfare, environment and legal rights all belong in impact assessment.',
      source: 'S13', chapter: 'Chapter 7'
    }
  ],

  policyClaims: [
    {
      id: 'meal-law', evidence: 'rule', title: 'A school meal is a legal entitlement',
      text: 'The book cites the 2001 Supreme Court direction for cooked meals on at least 200 school days and the NFSA nutritional schedule. A rule on paper is only the start of delivery.',
      check: 'Check the latest amended nutritional tables and local implementation rules.', source: 'S12'
    },
    {
      id: 'garlic', evidence: 'study', title: 'Ingredients can change mineral bioaccessibility',
      text: 'A 2010 laboratory study found garlic or onion increased iron bioaccessibility from cereals by 9.4–65.9% and from pulses by 9.9–73.3%.',
      check: 'Bioaccessibility in simulated digestion is not a measured improvement in child haemoglobin.', source: 'S7'
    },
    {
      id: 'upf', evidence: 'study', title: 'Processing can change how much people eat',
      text: 'In a small inpatient crossover trial, 20 adults ate about 508 kcal/day more during two weeks on an ultra-processed diet and gained about 0.9 kg.',
      check: 'Small, short and controlled: informative evidence, not an exact forecast for everyday life.', source: 'S9'
    },
    {
      id: 'community', evidence: 'argument', title: 'The people who eat the meal should shape the menu',
      text: 'Karpagam proposes meaningful roles for parents, students, cooks and marginalized communities in menu design, procurement and grievance systems.',
      check: 'This is an author’s policy proposal. It should be tested for feasibility, representation and outcomes.', source: 'S2'
    },
    {
      id: 'model', evidence: 'study', title: 'A sustainable reference diet still needs nutrient scrutiny',
      text: 'A 2023 model of the 2019 planetary-health diet estimated iron provision at 55% of recommended intake for women of reproductive age in a scenario without fortification or supplementation.',
      check: 'A modelled shortfall, not an observed deficiency rate. The 2025 Commission update adds safeguards for vulnerable groups.', source: 'S10'
    },
    {
      id: 'supplier', evidence: 'allegation', title: 'Misconduct claims are not adjudicated findings',
      text: 'The book discusses complaints, resignations and inquiries involving school-meal suppliers. The existence of an allegation does not prove a wider conspiracy or institutional motive.',
      check: 'Attribute specific claims, seek official findings and distinguish a governance concern from a legal conclusion.', source: 'S12'
    }
  ],

  evidenceLabels: {
    rule: 'Official rule', study: 'Study / model', argument: 'Author’s argument', allegation: 'Reported allegation'
  },

  tradeoffs: [
    {
      id: 'nutrition', number: '01', title: 'Nutrition', question: 'Does the policy improve access to adequate, diverse food?',
      measures: ['Dietary diversity', 'Affordability', 'Nutrient bioavailability', 'Age-specific needs'],
      note: 'A calorie target can hide a micronutrient gap. Measure what is served, eaten and absorbed—not only what is budgeted.'
    },
    {
      id: 'climate', number: '02', title: 'Climate & ecology', question: 'What are the system-specific environmental effects?',
      measures: ['Production system', 'Emissions', 'Land and water', 'Food waste'],
      note: 'Livestock is not one uniform system. Pastoralism, smallholder production and industrial farming have different impacts and trade-offs.'
    },
    {
      id: 'livelihood', number: '03', title: 'Livelihood', question: 'Who earns, who loses and who bears the transition cost?',
      measures: ['Pastoralists', 'Fishers and farmers', 'Workers and cooks', 'Traders and vendors'],
      note: 'A nutrition or climate policy can shift costs onto people with the least power. Distribution belongs in the evaluation.'
    },
    {
      id: 'rights', number: '04', title: 'Rights & dignity', question: 'Can people access culturally acceptable food without coercion?',
      measures: ['Non-discrimination', 'Informed choice', 'Due process', 'Community voice'],
      note: 'Personal preference and institutional imposition are different questions. Rights and evidence should inform each other.'
    }
  ],

  chapters: [
    { number: '01', title: 'Nutrition and the Human Body', kicker: 'Foundations', summary: 'How the body uses food; why malnutrition includes undernutrition, micronutrient gaps and overweight; and why the first thousand days matter.', question: 'What does “nourished” mean beyond having enough calories?', anchor: 'Exclusive breastfeeding for six months and appropriate complementary feeding are key public-health recommendations.', source: 'S15' },
    { number: '02', title: 'Proteins and Fats', kicker: 'Building blocks', summary: 'Protein quality, amino acids, digestibility, essential fats and the difference between nutrient content and usable nutrition.', question: 'Why can two foods with the same protein grams behave differently?', anchor: 'A study in Indian children found egg digestibility of 87.4%, compared with 65.2% for mung bean under the tested conditions.', source: 'S4' },
    { number: '03', title: 'Minerals and Vitamins', kicker: 'Micronutrients', summary: 'Iron, zinc, calcium and vitamins A, C, D and B12—their roles, sources, interactions and the risks of both deficiency and excess.', question: 'Why is a single supplement not a complete nutrition policy?', anchor: 'CNNS cited zinc deficiency in 19% of pre-school, 17% of school-age and 32% of adolescent participants.', source: 'S5' },
    { number: '04', title: 'Nutrition in India', kicker: 'The national picture', summary: 'The scale and inequality of India’s nutrition burden, and the multiple structural causes behind stunting, wasting, underweight and anaemia.', question: 'Why do averages hide the people at greatest risk?', anchor: 'CNNS reported underweight in 48% of under-five children in the poorest wealth quintile versus 19% in the richest.', source: 'S2' },
    { number: '05', title: 'Myths and Misconceptions about Food', kicker: 'Decode the claim', summary: 'Common claims about milk, eggs, cholesterol, anaemia, soya and millets—and what evidence can and cannot establish.', question: 'Is a popular food belief a fact, a correlation or a value judgement?', anchor: 'A meta-analysis cited in the book estimated modest linear-growth benefit from daily milk supplementation in controlled trials.', source: 'S8' },
    { number: '06', title: 'The Innocent Vegetarian', kicker: 'Identity & power', summary: 'How vegetarianism, caste and social norms intersect; why dietary identity is not the same as actual intake; and how “purity” can become hierarchy.', question: 'When does a personal food preference become someone else’s restriction?', anchor: 'NFHS-5 shows large gender differences in reported consumption of fish, meat and eggs.', source: 'S1' },
    { number: '07', title: 'To Beef or Not to Beef', kicker: 'Food, law & livelihood', summary: 'Beef, cattle economies, caste, minority experiences and legal restrictions—an argument for nutrition and rights impact assessment.', question: 'Whose nutrition and livelihood count when a food is restricted?', anchor: 'A 2023 quasi-experimental study estimated lower haemoglobin in specific beef-consuming communities after bans; context is essential.', source: 'S13' },
    { number: '08', title: 'Mid-Day Meal: A Recipe for Exclusion', kicker: 'The school plate', summary: 'How publicly funded meals can meet targets on paper yet fail through poor variety, taste, cultural exclusion and weak accountability.', question: 'Was the meal eaten, enjoyed and safe—or only counted?', anchor: 'Legal entitlement and nutritional standards are necessary, but consumption and field audits determine what reaches a child.', source: 'S12' },
    { number: '09', title: 'Food Agenda Goes Corporate', kicker: 'Markets & influence', summary: 'Corporate funding, ultra-processed foods, sustainability agendas and the need for transparent conflict-of-interest controls.', question: 'Who funds the guideline, who benefits and who is missing from the table?', anchor: 'A small controlled trial found higher ad libitum energy intake on an ultra-processed diet; “plant-based” does not automatically mean minimally processed.', source: 'S9' },
    { number: '10', title: 'Learning, Unlearning & the Way Forward', kicker: 'From argument to action', summary: 'Independent evidence, community participation, inclusive welfare delivery, whole-diet budgeting and climate–nutrition co-design.', question: 'What would a fair, nourishing food system measure differently?', anchor: 'The closing argument moves from preventing hunger to securing diverse, affordable, culturally acceptable diets.', source: 'S11' }
  ],

  actions: {
    student: {
      label: 'Students', intro: 'Turn food debates into questions you can test.', items: [
        'Record one week of canteen or hostel menus, portions, leftovers and cost.',
        'Trace one nutrition claim to the original study; note its design and funding.',
        'Challenge food-shaming and ask for inclusive alternatives without ranking students.',
        'Bring one specific, evidence-backed improvement to a school or college committee.'
      ]
    },
    parent: {
      label: 'Parents', intro: 'Move from isolated complaints to accountable follow-up.', items: [
        'Document meal quality problems with dates, photos where appropriate and the response.',
        'Ask for the menu, nutritional standard, supplier details and grievance contact.',
        'Request nutritionally meaningful alternatives for genuine needs—not a token substitute.',
        'Follow child growth and health through local services rather than relying on online advice.'
      ]
    },
    institution: {
      label: 'Institutions', intro: 'Measure the meal that is served and eaten.', items: [
        'Publish menus, ingredients, contracts, audit findings and relevant conflicts of interest.',
        'Field-audit taste, temperature, safety, portions, consumption and waste.',
        'Train staff in nutrition literacy, evidence appraisal and food non-discrimination.',
        'Give students, parents, cooks and local communities meaningful decision-making seats.'
      ]
    },
    policy: {
      label: 'Policymakers', intro: 'Design for nutrition, climate, livelihood and rights together.', items: [
        'Commission independent, disaggregated data on intake, affordability and outcomes.',
        'Budget for whole diets; use fortification and supplementation where evidence supports them.',
        'Require impact reviews for food restrictions and protect welfare access and due process.',
        'Publish funding, methods and conflicts; independently evaluate pilots before scaling.'
      ]
    }
  }
};
