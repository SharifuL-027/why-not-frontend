export interface RrsDomainContent {
  title_en: string;
  title_bn: string;
  definition_en: string;
  definition_bn: string;
  scoreContext_en: string;
  scoreContext_bn: string;
  dayToDay_en: string[];
  dayToDay_bn: string[];
  suggestions_en: string[];
  suggestions_bn: string[];
}

export const RRS_DOMAINS_CONTENT: Record<string, RrsDomainContent> = {
  PR: {
    title_en: "Personal Responsibility",
    title_bn: "ব্যক্তিগত দায়িত্বশীলতা",
    definition_en: "Your capacity to follow through on commitments independently, manage time conscientiously, and acknowledge mistakes without shifting blame.",
    definition_bn: "নিজের কাজের দায়িত্ব নিজে পালন করা, সময়ের সদ্ব্যবহার করা এবং দোষ না চাপিয়ে নিজের ভুল অকপটে স্বীকার করার সক্ষমতা।",
    scoreContext_en: "At 4.25, your score is in the High band. This is an exceptional personal asset that establishes you as a self-directed, disciplined, and reliable executor in everyday life.",
    scoreContext_bn: "৪.২৫ স্কোরে এটি 'উচ্চ' ব্যান্ডে অবস্থান করছে। এটি একটি অসাধারণ ব্যক্তিগত শক্তি, যা আপনাকে দৈনন্দিন জীবনে স্ব-প্রণোদিত, সুশৃঙ্খল এবং বিশ্বস্ত ব্যক্তি হিসেবে প্রতিষ্ঠিত করে।",
    dayToDay_en: [
      "You complete tasks you take on without requiring external oversight or repeated reminders.",
      "When a project goes off track through your own error, your default impulse is to own the outcome rather than inventing excuses.",
      "You structure your calendar to meet deadlines, preserving your word as a point of personal honor.",
      "However, high personal execution can quietly lead to taking on excessive burden, quietly assuming others' unfulfilled work.",
    ],
    dayToDay_bn: [
      "কেউ তদারকি না করলেও আপনি নিজের নেওয়া দায়িত্ব শেষ পর্যন্ত একাগ্রতার সাথে সম্পন্ন করেন।",
      "ভুল হলে অজুহাত খোঁজার বদলে নিজের দায় স্বীকার করে সমাধানের দিকে মনোযোগ দেন।",
      "প্রতিশ্রুতি সময়মতো পূরণ করতে আপনি পূর্বপরিকল্পনা করেন এবং কথা রাখাকে আত্মমর্যাদার অংশ মনে করেন।",
      "তবে অতিরিক্ত দায়িত্বশীলতার কারণে অন্যের অবহেলার বোঝাও নিজের কাঁধে তুলে নেওয়ার নীরব প্রবণতা থাকতে পারে।",
    ],
    suggestions_en: [
      "Guard against burnout: Establish clear boundaries before taking on new tasks that rightfully belong to others.",
      "Practise healthy delegation: Allow colleagues and family members to experience the learning curve of their own responsibilities.",
      "Notice silent overwork: Check whether self-reliance has turned into an aversion to asking for timely help.",
    ],
    suggestions_bn: [
      "ক্লান্তি ও অবসাদ এড়ান: অন্যের করণীয় কাজ নিজের ওপর নেওয়ার আগে স্বাস্থ্যকর সীমারেখা তৈরি করুন।",
      "দায়িত্ব ভাগ করে নেওয়ার চর্চা করুন: সহকর্মী ও পরিবারের সদস্যদের তাদের দায়িত্ব পালনের সুযোগ দিন।",
      "নীরব অতি-পরিশ্রম লক্ষ্য করুন: স্বনির্ভরতা যেন প্রয়োজনে অন্যের সাহায্য চাওয়ার অনীহায় পরিণত না হয়।",
    ],
  },

  MR: {
    title_en: "Moral Responsibility",
    title_bn: "নৈতিক দায়িত্বশীলতা",
    definition_en: "Adhering to ethical principles, truthfulness, and honesty, especially when unobserved and when integrity carries a tangible personal cost.",
    definition_bn: "নৈতিক নীতি, সত্যবাদিতা এবং সততায় অটল থাকা — বিশেষ করে যখন কেউ দেখছে না এবং সততা বজায় রাখতে গিয়ে ব্যক্তিগত ক্ষতির ঝুঁকি থাকে।",
    scoreContext_en: "At 3.50, your score sits firmly in the Average band. You uphold honesty under standard conditions, aligning with the expected social baseline.",
    scoreContext_bn: "৩.৫০ স্কোরে এটি 'গড় / প্রত্যাশিত' ব্যান্ডে অবস্থিত। সাধারণ পরিস্থিতিতে আপনি সততা বজায় রাখেন, যা একটি পরিশীলিত সামাজিক মান নির্দেশ করে।",
    dayToDay_en: [
      "In daily interactions, you avoid overt deceit and recognize the practical necessity of being trusted by peers.",
      "You reject major unethical shortcuts, particularly when institutional or relational consequences are apparent.",
      "However, in high-stakes situations where 'everyone does it' or detection is near-zero, subtle rationalizations can emerge.",
      "Moral fatigue under prolonged competition can tempt small compromises that gradually blur ethical boundaries.",
    ],
    dayToDay_bn: [
      "দৈনন্দিন আলাপে আপনি অন্যায় ছলচাতুরি এড়িয়ে চলেন এবং বিশ্বাসযোগ্যতার গুরুত্ব উপলব্ধি করেন।",
      "বড় ধরনের অনৈতিক সুবিধা আপনি প্রত্যাখ্যান করেন, বিশেষ করে যখন তার প্রত্যক্ষ পরিণতি দৃশ্যমান।",
      "তবে যেখানে 'সবাই করছে' বা ধরা পড়ার কোনো ঝুঁকি নেই, সেখানে মনের অজান্তেই ছোটখাটো অন্যায্যতাকে যুক্তিযুক্ত মনে হতে পারে।",
      "দীর্ঘস্থায়ী প্রতিযোগিতার মাঝে নৈতিক ক্লান্তি এসে ছোট আপসকে গ্রহণযোগ্য দেখাতে শুরু করতে পারে।",
    ],
    suggestions_en: [
      "Pre-commit to core principles: Explicitly define your non-negotiables before stepping into high-pressure negotiations.",
      "Scrutinize everyday rationalizations: Challenge thoughts like 'it does not hurt anyone' or 'just this once'.",
      "Align public and private standards: Hold yourself to the identical benchmark whether supervised or alone.",
    ],
    suggestions_bn: [
      "নীতিতে পূর্ব-প্রতিশ্রুতিবদ্ধ থাকুন: কঠিন পরিস্থিতিতে পড়ার আগেই নিজের অনড় মূল্যবোধগুলো নির্দিষ্ট করে রাখুন।",
      "দৈনন্দিন আত্মপক্ষ সমর্থন পরীক্ষা করুন: 'এতে কার কী ক্ষতি' বা 'একবারই তো' — এই ধরনের ভাবনাকে প্রশ্নবিদ্ধ করুন।",
      "প্রকাশ্য ও গোপন মান এক রাখুন: লোকচক্ষুর সামনে এবং একা থাকা অবস্থায় একই নৈতিক মানদণ্ড রক্ষা করুন।",
    ],
  },

  SR: {
    title_en: "Social Responsibility",
    title_bn: "সামাজিক দায়িত্বশীলতা",
    definition_en: "Active dependability toward extended family, community welfare, mutual civic duty, and considering collective outcomes in personal choices.",
    definition_bn: "পরিবার ও সমাজের কল্যাণে নির্ভরযোগ্য থাকা, পারস্পরিক সামাজিক দায়িত্ব পালন এবং ব্যক্তিগত সিদ্ধান্তে সমষ্টির মঙ্গলের কথা ভাবা।",
    scoreContext_en: "At 3.00, your score rests at the lower boundary of the Average band (3.00–4.12). This represents your primary strategic area for intentional development.",
    scoreContext_bn: "৩.০০ স্কোরে এটি গড় ব্যান্ডের নিম্নতম সীমায় অবস্থিত। এটি আপনার সামগ্রিক ব্যক্তিত্বের সর্বাধিক অগ্রগতির সম্ভাব্য ক্ষেত্র।",
    dayToDay_en: [
      "You support family and close associates in routine matters when obligations are direct and immediate.",
      "However, your natural inclination is to prioritize individual and nuclear safety before investing in broader community issues.",
      "Social problems that do not immediately threaten your personal sphere are often treated as outside your mandate.",
      "Volunteering time or emotional energy for community welfare is frequently deferred due to individual task overload.",
    ],
    dayToDay_bn: [
      "নিকটাত্মীয় ও পরিবারের সরাসরি প্রয়োজনে আপনি দায়িত্ব পালন করেন।",
      "তবে বৃহত্তর সমাজ বা পরিবেশের সমস্যায় যুক্ত হওয়ার আগে নিজের ব্যক্তিগত নিরাপত্তা নিশ্চিত করাকেই অগ্রাধিকার দেন।",
      "যেসব সমস্যা সরাসরি আপনাকে স্পর্শ করে না, সেগুলোকে নিজের দায়িত্বের আওতাভুক্ত মনে করার ব্যাপারে ইতস্তত বোধ করেন।",
      "ব্যক্তিগত কাজের ব্যস্ততার কারণে স্বেচ্ছাসেবী কাজে বা সামাজিক উদ্যোগে সক্রিয় অংশগ্রহণ অনেক সময় পিছিয়ে পড়ে।",
    ],
    suggestions_en: [
      "Begin with micro-commitments: Dedicate one hour every fortnight to a shared family or neighbourhood welfare initiative.",
      "Expand decision circles: Before making major domestic or career choices, actively consult those who will be indirectly impacted.",
      "Build relational reciprocity: Cultivate at least two community relationships that are not transactional or work-dependent.",
    ],
    suggestions_bn: [
      "ক্ষুদ্র পদক্ষেপ দিয়ে শুরু করুন: প্রতি পক্ষে এক ঘণ্টা সময় পরিবার বা মহল্লার কোনো সম্মিলিত কল্যাণে বরাদ্দ করুন।",
      "সিদ্ধান্ত গ্রহণের পরিধি বাড়ান: যেকোনো গুরুত্বপূর্ণ সিদ্ধান্তের ক্ষেত্রে যাদের ওপর পরোক্ষ প্রভাব পড়বে তাদের মতামত শুনুন।",
      "পারস্পরিক নির্ভরতা তৈরি করুন: কর্মক্ষেত্রের বাইরে অন্তত দুটি অকৃত্রিম সামাজিক সম্পর্কের যত্ন নিন।",
    ],
  },
};

export const WHAT_THE_REPORT_GIVES_YOU = [
  {
    num: "1",
    title_en: "Your Overall Level",
    title_bn: "আপনার সামগ্রিক মাত্রা",
    desc_en: "A clear benchmark score summarizing your aggregate accountability on the 1.00 to 5.00 scale.",
    desc_bn: "১.০০ থেকে ৫.০০ স্কেলে আপনার সামগ্রিক দায়িত্বশীলতার একটি স্পষ্ট সমন্বিত বেঞ্চমার্ক স্কোর।",
  },
  {
    num: "2",
    title_en: "Three Distinct Areas",
    title_bn: "তিনটি পৃথক ক্ষেত্র",
    desc_en: "Independent evaluations for Personal, Moral, and Social Responsibility to reveal specific dynamics.",
    desc_bn: "ব্যক্তিগত, নৈতিক ও সামাজিক — এই তিন দিকের আলাদা মূল্যায়ন যা আপনার ব্যক্তিত্বের গভীর রূপ তুলে ধরে।",
  },
  {
    num: "3",
    title_en: "The Balance of Your Profile",
    title_bn: "প্রোফাইলের ভারসাম্য",
    desc_en: "An examination of whether your strengths are balanced or concentrated in one domain.",
    desc_bn: "আপনার যোগ্যতাগুলো সব ক্ষেত্রে সুষমভাবে বিস্তৃত, নাকি কোনো একটি নির্দিষ্ট ক্ষেত্রে সীমাবদ্ধ তা নিরূপণ।",
  },
  {
    num: "4",
    title_en: "The Meaning of Gaps",
    title_bn: "ব্যবধানের তাৎপর্য",
    desc_en: "What the divergence between your highest and lowest areas indicates over a multi-year horizon.",
    desc_bn: "সর্বোচ্চ ও সর্বনিম্ন স্কোরের মধ্যকার পার্থক্য দীর্ঘমেয়াদী জীবনে কী ধরনের প্রভাব ফেলে তার বিশ্লেষণ।",
  },
  {
    num: "5",
    title_en: "A 30- and 90-Day Action Plan",
    title_bn: "৩০ ও ৯০ দিনের কর্মপরিকল্পনা",
    desc_en: "A structured, week-by-week implementation roadmap focused strictly on small, durable behavioral shifts.",
    desc_bn: "ছোট ছোট টেকসই অভ্যাসের মাধ্যমে মানসিক অগ্রগতি নিশ্চিত করার জন্য সপ্তাহভিত্তিক সুস্পষ্ট দিকনির্দেশনা।",
  },
  {
    num: "6",
    title_en: "The Underlying Psychology",
    title_bn: "মনস্তাত্ত্বিক ভিত্তি",
    desc_en: "Evidence-based psychological science explaining why self-regulation and social capital operate this way.",
    desc_bn: "আত্মনিয়ন্ত্রণ ও সামাজিক আস্থার পেছনে কাজ করা বৈজ্ঞানিক মনস্তাত্ত্বিক তত্ত্বের সহজ ব্যাখ্যা।",
  },
  {
    num: "7",
    title_en: "Reliable Guidance & Contacts",
    title_bn: "নির্ভরযোগ্য তথ্যসূত্র ও সেবা",
    desc_en: "Accredited national and global institutions for continuing personal development and clinical support.",
    desc_bn: "ব্যক্তিগত বিকাশ ও প্রয়োজনে সহায়তা গ্রহণের জন্য জাতীয় ও আন্তর্জাতিক বিশ্বস্ত তথ্যভাণ্ডার।",
  },
];

export const PROFILE_GAP_TENDENCIES = [
  {
    tendency_en: "Workload collecting in one place",
    tendency_bn: "সব কাজের চাপ নিজের ওপর নেওয়া",
    desc_en: "Because your Personal Responsibility is so high, people around you quickly learn that you will finish the job. Over time, tasks migrate quietly onto your desk while others do less.",
    desc_bn: "ব্যক্তিগত দায়িত্ববোধ অত্যন্ত প্রবল হওয়ায় আশপাশের মানুষ ধরে নেয় আপনি নিজেই কাজটি শেষ করবেন। ফলে অজান্তেই অন্যের দায়িত্ব আপনার ওপর এসে জমা হয়।",
    remedy_en: "Set explicit boundaries early. Clarify what is your responsibility and what belongs to others before beginning.",
    remedy_bn: "কাজ শুরুর আগেই নিজের ও অন্যের দায়িত্বের সীমারেখা স্পষ্ট করুন। অতিরিক্ত চাপ একা বহন থেকে বিরত থাকুন।",
  },
  {
    tendency_en: "A narrow circle of mutual support",
    tendency_bn: "পারস্পরিক সাহায্যের সীমিত পরিধি",
    desc_en: "A lower Social Responsibility score combined with high self-reliance can mean you rarely ask for help and rarely build deep, reciprocal community safety nets.",
    desc_bn: "উচ্চ স্বনির্ভরতার কারণে আপনি সহজে অন্যের সাহায্য চান না, যার ফলে বিপদে পাশে পাওয়ার মতো সামাজিক সংযোগ সংকুচিত হয়ে পড়ে।",
    remedy_en: "Practise asking for small assistance even when you could manage alone. Reciprocity creates relational safety.",
    remedy_bn: "একা সামলাতে পারলেও মাঝেমধ্যে অন্যের সহযোগিতা নিন। পারস্পরিক আদান-প্রদান সামাজিক বন্ধন সুদৃঢ় করে।",
  },
  {
    tendency_en: "Slow habituation to small compromises",
    tendency_bn: "নীরবে ছোটখাটো সমঝোতার অভ্যাস",
    desc_en: "Average Moral Responsibility in competitive environments can gradually accommodate minor compromises if they appear standard or unavoidable.",
    desc_bn: "প্রতিযোগিতামূলক পরিবেশে ছোটখাটো অন্যায্যতাকে 'বাস্তবসম্মত' মনে করে মেনে নেওয়ার অভ্যাস ধীরে ধীরে নৈতিক মান ক্ষুণ্ন করতে পারে।",
    remedy_en: "Periodically pause and evaluate actions against your personal moral baseline rather than peer behavior.",
    remedy_bn: "অন্যের আচরণের দিকে না তাকিয়ে নিজের মূল নৈতিক মানদণ্ডের নিরিখে নিয়মিত আত্মপর্যালোচনা করুন।",
  },
  {
    tendency_en: "The same pattern in the next generation",
    tendency_bn: "পরবর্তী প্রজন্মে একই রীতির পুনরাবৃত্তি",
    desc_en: "Children and younger associates observe what we do rather than what we advise. High personal effort without social contribution teaches isolated self-sufficiency.",
    desc_bn: "ছোটরা উপদেশের চেয়ে আমাদের আচরণ বেশি অনুকরণ করে। সামাজিক দায়হীন একক স্বনির্ভরতা তাদেরও বিচ্ছিন্নতা শেখায়।",
    remedy_en: "Involve younger family members in community service, helping them experience the joy of collective care.",
    remedy_bn: "তরুণ বা সন্তানদের সামাজিক কাজে সাথে রাখুন, যাতে তারা যৌথ কল্যাণের আনন্দ শৈশব থেকেই উপলব্ধি করতে পারে।",
  },
];

export const ACTION_PLAN_30_DAYS = [
  {
    week_en: "Week 1",
    week_bn: "সপ্তাহ ১",
    focus_en: "Observation without Judgment",
    focus_bn: "নীরব পর্যবেক্ষণ ও চিহ্নিতকরণ",
    task_en: "Notice three situations where a collective decision was made without considering the broader family or team. Simply write them down without reacting.",
    task_bn: "গত সপ্তাহে এমন ৩টি মুহূর্ত চিহ্নিত করুন যেখানে সমষ্টিগত মঙ্গলের কথা বিবেচনা না করে সিদ্ধান্ত নেওয়া হয়েছিল। ডায়েরিতে লিখে রাখুন।",
  },
  {
    week_en: "Week 2",
    week_bn: "সপ্তাহ ২",
    focus_en: "One Micro-Contribution",
    focus_bn: "একটি ক্ষুদ্র সামাজিক পদক্ষেপ",
    task_en: "Perform one helpful act for your extended circle (e.g., visiting an elderly relative or assisting a neighbour with a small task) with zero transaction motive.",
    task_bn: "কোনো স্বার্থ ছাড়া নিজের পরিবারের বাইরে বা প্রতিবেশীর জন্য একটি ছোট উপকারি কাজ করুন (যেমন খোঁজ নেওয়া বা টুকিটাকি সাহায্য)।",
  },
  {
    week_en: "Week 3",
    week_bn: "সপ্তাহ ৩",
    focus_en: "Broadening Consultation",
    focus_bn: "পরামর্শের পরিধি বিস্তার",
    task_en: "Before finalizing one domestic or personal plan, ask one additional person: 'How does this decision affect you or what do you think?' Listen fully.",
    task_bn: "একটি গুরুত্বপূর্ণ পারিবারিক সিদ্ধান্ত নেওয়ার আগে সংশ্লিষ্ট আরেকজনকে জিজ্ঞাসা করুন: 'এতে আপনার কী মত?' মনোযোগ দিয়ে শুনুন।",
  },
  {
    week_en: "Week 4",
    week_bn: "সপ্তাহ ৪",
    focus_en: "First 30-Day Check-in",
    focus_bn: "প্রথম ৩০ দিনের মূল্যায়ন",
    task_en: "Review your notes: Did reaching out feel burdensome or grounding? Decide on one small collective routine to maintain into month two.",
    task_bn: "নিজের অভিজ্ঞতা পর্যালোচনা করুন: অন্যের সাথে সংযোগ রাখা কি মানসিক স্বস্তি দিয়েছে? পরবর্তী মাসের জন্য একটি সাধারণ নিয়ম ঠিক করুন।",
  },
];

export const ACTION_PLAN_90_DAYS = [
  {
    period_en: "Month 2 (Days 31–60)",
    period_bn: "২য় মাস (৩১–৬০ দিন)",
    title_en: "Building Reliable Reciprocity",
    title_bn: "পারস্পরিক আস্থার ভিত্তি তৈরি",
    detail_en: "Schedule a recurring community or family responsibility twice a month. Treat this commitment with the identical punctuality you reserve for your highest professional tasks.",
    detail_bn: "মাসে দুইবার কোনো পারিবারিক বা সামাজিক দায়িত্বের জন্য সময় নির্ধারণ করুন। অফিসের জরুরি কাজের মতোই এই সময়কে সমান গুরুত্ব দিন।",
  },
  {
    period_en: "Month 3 (Days 61–90)",
    period_bn: "৩য় মাস (৬১–৯০ দিন)",
    title_en: "Consolidating the Habit into Identity",
    title_bn: "অভ্যাসকে ব্যক্তিত্বের অংশে পরিণত করা",
    detail_en: "Begin offering mentorship or sharing workload purposefully. Step into one situation where standing up for collective fairness carries a minor inconvenience.",
    detail_bn: "কাউকে দিকনির্দেশনা দেওয়া বা কাজের দায়িত্ব ভাগ করে নেওয়ার চর্চা করুন। যেখানে অন্যায্যতা ঘটছে, সেখানে মৃদু কিন্তু দৃঢ় নৈতিক অবস্থান নিন।",
  },
];

export const THREE_CORE_HABITS = [
  {
    habit_en: "Write it down",
    habit_bn: "লিখে রাখুন",
    rule_en: "Commitments kept in memory easily blur into convenient rationalizations. Keeping an honest journal preserves cognitive accountability.",
    rule_bn: "মনে রাখা প্রতিশ্রুতি সহজেই সুবিধাজনক যুক্তির আড়ালে হারিয়ে যায়। লিখে রাখলে আত্মপ্রবঞ্চনার সুযোগ কমে যায়।",
  },
  {
    habit_en: "Tell someone",
    habit_bn: "কাউকে জানিয়ে রাখুন",
    rule_en: "Private intentions lack systemic friction. Telling one trusted peer creates external scaffolding that anchors your follow-through.",
    rule_bn: "একান্ত সংকল্পে বাহ্যিক তাগিদ থাকে না। একজন বিশ্বস্ত মানুষকে আপনার লক্ষ্যের কথা বলে রাখলে দায়িত্ব পালনের নিশ্চয়তা বাড়ে।",
  },
  {
    habit_en: "Keep it small",
    habit_bn: "পদক্ষেপ ছোট রাখুন",
    rule_en: "Grand moral transformations collapse under daily strain. A five-minute deliberate routine practiced daily outlasts heroic occasional resolutions.",
    rule_bn: "হঠাৎ বড় পরিবর্তনের সংকল্প দৈনন্দিন চাপে ভেঙে পড়ে। প্রতিদিন ৫ মিনিটের একটি সচেতন ক্ষুদ্র অভ্যাস দীর্ঘস্থায়ী রূপ নেয়।",
  },
];

export const FIVE_REFLECTION_QUESTIONS = [
  {
    q_en: "1. Did you notice times when you silently took over someone else's work instead of letting them finish it?",
    q_bn: "১. আপনি কি লক্ষ্য করেছেন কখন অন্যকে কাজ করার সুযোগ না দিয়ে নীরবে সব কাজ নিজের কাঁধে তুলে নিয়েছেন?",
  },
  {
    q_en: "2. When a rule felt inconvenient, did you follow it anyway or justify a quiet exception for yourself?",
    q_bn: "২. কোনো নিয়ম অসুবিধাজনক মনে হলে আপনি কি তা পালন করেছেন, নাকি নিজের জন্য একটি গোপন ছাড় তৈরি করেছেন?",
  },
  {
    q_en: "3. Have you actively invested in at least one relationship that provides no immediate practical or career return?",
    q_bn: "৩. আপনি কি এমন অন্তত একটি সম্পর্কে সময় দিয়েছেন যা থেকে কোনো জাগতিক বা পেশাগত লাভের প্রত্যাশা নেই?",
  },
  {
    q_en: "4. When stressed, did your commitment to others hold firm or did you retreat into isolated self-protection?",
    q_bn: "৪. মানসিক চাপে থাকার সময় কি অন্যের প্রতি আপনার দায়বদ্ধতা অটুট ছিল, নাকি নিজেকে গুটিয়ে নিয়েছিলেন?",
  },
  {
    q_en: "5. Looking at the last 90 days, do those closest to you feel safer and more supported in your presence?",
    q_bn: "৫. গত ৯০ দিনের দিকে তাকালে আপনার কাছের মানুষেরা কি আপনার সান্নিধ্যে আগের চেয়ে বেশি নিরাপদ ও আশ্বস্ত বোধ করেন?",
  },
];
