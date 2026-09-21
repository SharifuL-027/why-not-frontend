/**
 * এই ফাইলটা "Assistant Manager / Mid-Level Manager Battery" ম্যানুয়েলের
 * Section 0.2 (Item counts), Section 4 (Domain composition), Section 5 (Bands),
 * ও Section 6 (Convergence + Fit-statement rule) থেকে হুবহু তৈরি।
 *
 * এটা battery তৈরি করার সময় "Seed default config" বাটনে ব্যবহার হবে,
 * আর Item Manager ফর্মের instrument/facet dropdown এখান থেকেই আসবে।
 *
 * সতর্কতা: D2, D3, D4, D5, D6, D7, D8-এর বাংলা narrative টেক্সট (low/mid/high)
 * ম্যানুয়েলের ইংরেজি টেবিল অনুযায়ী আনুমানিক অনুবাদ — client-facing দেওয়ার
 * আগে অবশ্যই SME/client রিভিউ লাগবে (ম্যানুয়েল নিজেও এই সতর্কতা দিয়েছে)।
 */

export type AmItemFormat = "likert_5" | "mcq_single_best";

export interface AmFacetMeta {
  key: string;
  name_bn: string;
  itemsPerFacet: number;
}

export interface AmInstrumentMeta {
  key: string;
  name_bn: string;
  name_en: string;
  format: AmItemFormat | "hybrid";
  hasValidity: boolean;
  validityFacetKey?: string;
  facets: AmFacetMeta[];
}

export const AM_INSTRUMENTS: AmInstrumentMeta[] = [
  {
    key: "cognitive",
    name_bn: "জ্ঞানীয় সক্ষমতা পরীক্ষা",
    name_en: "Cognitive Ability Test",
    format: "mcq_single_best",
    hasValidity: false,
    facets: [
      { key: "SP", name_bn: "কৌশলগত সমস্যা সমাধান", itemsPerFacet: 3 },
      { key: "NR", name_bn: "সাংখ্যিক যুক্তি", itemsPerFacet: 3 },
    ],
  },
  {
    key: "personality",
    name_bn: "ব্যবস্থাপনাগত ব্যক্তিত্ব পরীক্ষা",
    name_en: "Managerial Personality Test",
    format: "likert_5",
    hasValidity: true,
    validityFacetKey: "VAL",
    facets: [
      { key: "DEP", name_bn: "নির্ভরযোগ্যতা (Dependability)", itemsPerFacet: 2 },
      { key: "AST", name_bn: "দৃঢ়তা (Assertiveness)", itemsPerFacet: 2 },
      { key: "RES", name_bn: "সহনশীলতা (Resilience)", itemsPerFacet: 2 },
      { key: "COM", name_bn: "স্থিরতা (Composure)", itemsPerFacet: 2 },
      { key: "VAL", name_bn: "ভ্যালিডিটি চেক", itemsPerFacet: 2 },
    ],
  },
  {
    key: "ei",
    name_bn: "আবেগীয় ও সামাজিক বুদ্ধিমত্তা পরীক্ষা",
    name_en: "Emotional & Social Intelligence Test",
    format: "hybrid",
    hasValidity: false,
    facets: [
      { key: "SA", name_bn: "আত্ম-সচেতনতা (Likert)", itemsPerFacet: 2 },
      { key: "RG", name_bn: "নিয়ন্ত্রণ (Likert)", itemsPerFacet: 2 },
      { key: "SIT", name_bn: "EI-in-Action (পরিস্থিতিগত, MCQ)", itemsPerFacet: 2 },
    ],
  },
  {
    key: "sjt",
    name_bn: "পরিস্থিতিগত বিচার — ব্যবস্থাপনাগত সিদ্ধান্তগ্রহণ",
    name_en: "SJT — Managerial Decision-Making",
    format: "mcq_single_best",
    hasValidity: false,
    facets: [
      { key: "RA", name_bn: "সম্পদ বণ্টন", itemsPerFacet: 2 },
      { key: "SC", name_bn: "অধস্তন দ্বন্দ্ব", itemsPerFacet: 2 },
      { key: "ED", name_bn: "নৈতিক দ্বিধা", itemsPerFacet: 2 },
    ],
  },
  {
    key: "leadership",
    name_bn: "নেতৃত্ব সম্ভাবনা মূল্যায়ন",
    name_en: "Leadership Potential Assessment",
    format: "likert_5",
    hasValidity: true,
    validityFacetKey: "VAL",
    facets: [
      { key: "DEL", name_bn: "ডেলিগেশন-প্রস্তুতি", itemsPerFacet: 2 },
      { key: "DEC", name_bn: "সিদ্ধান্তগ্রহণ দক্ষতা", itemsPerFacet: 2 },
      { key: "VAL", name_bn: "ভ্যালিডিটি চেক", itemsPerFacet: 2 },
    ],
  },
  {
    key: "motivation",
    name_bn: "মনোভাব, প্রেরণা ও কর্মনৈতিকতা পরীক্ষা",
    name_en: "Attitude, Motivation & Work Ethics Test",
    format: "likert_5",
    hasValidity: true,
    validityFacetKey: "VAL",
    facets: [
      { key: "MOT", name_bn: "প্রেরণা (Motivation)", itemsPerFacet: 2 },
      { key: "AUT", name_bn: "স্বাধীন কর্মনৈতিকতা (Autonomy Work-Ethic)", itemsPerFacet: 2 },
      { key: "VAL", name_bn: "ভ্যালিডিটি চেক", itemsPerFacet: 2 },
    ],
  },
  {
    key: "communication",
    name_bn: "যোগাযোগ ও দর-কষাকষি দক্ষতা পরীক্ষা",
    name_en: "Communication & Negotiation Skills Test",
    format: "mcq_single_best",
    hasValidity: false,
    facets: [
      { key: "NEG", name_bn: "দর-কষাকষি (Negotiation)", itemsPerFacet: 2 },
      { key: "DC", name_bn: "ডাউনওয়ার্ড যোগাযোগ", itemsPerFacet: 2 },
      { key: "PH", name_bn: "ভাষাশৈলী (Phrasing)", itemsPerFacet: 2 },
    ],
  },
  {
    key: "honesty",
    name_bn: "সততা ও নির্ভরযোগ্যতা মূল্যায়ন — কর্তৃত্ব-সচেতন",
    name_en: "Honesty & Dependability Assessment",
    format: "likert_5",
    hasValidity: true,
    validityFacetKey: "VAL",
    facets: [
      { key: "H", name_bn: "সততা (Honesty)", itemsPerFacet: 2 },
      { key: "D", name_bn: "নির্ভরযোগ্যতা (Dependability)", itemsPerFacet: 2 },
      { key: "FRA", name_bn: "ন্যায্য সম্পদ বণ্টন", itemsPerFacet: 2 },
      { key: "VAL", name_bn: "ভ্যালিডিটি চেক", itemsPerFacet: 2 },
    ],
  },
];

export const AM_DOMAINS = [
  {
    key: "D1",
    name_bn: "কৌশলগত ও সাংখ্যিক সক্ষমতা",
    name_en: "Strategic & Numerical Capability",
    cluster: "capability",
    formula: [
      { instrumentKey: "cognitive", facetKey: "SP" },
      { instrumentKey: "cognitive", facetKey: "NR" },
    ],
  },
  {
    key: "D2",
    name_bn: "ব্যবস্থাপনাগত ব্যক্তিত্ব",
    name_en: "Managerial Personality",
    cluster: "disposition",
    formula: [
      { instrumentKey: "personality", facetKey: "DEP" },
      { instrumentKey: "personality", facetKey: "AST" },
      { instrumentKey: "personality", facetKey: "RES" },
      { instrumentKey: "personality", facetKey: "COM" },
    ],
    inconclusiveIfValidityFailedOn: "personality",
  },
  {
    key: "D3",
    name_bn: "আবেগীয় ও সামাজিক বুদ্ধিমত্তা",
    name_en: "Emotional & Social Intelligence",
    cluster: "disposition",
    formula: [
      { instrumentKey: "ei", facetKey: "SA" },
      { instrumentKey: "ei", facetKey: "RG" },
      { instrumentKey: "ei", facetKey: "SIT" },
    ],
  },
  {
    key: "D4",
    name_bn: "ব্যবস্থাপনাগত বিচার",
    name_en: "Managerial Judgment",
    cluster: "judgment_integrity",
    formula: [
      { instrumentKey: "sjt", facetKey: "RA" },
      { instrumentKey: "sjt", facetKey: "SC" },
      { instrumentKey: "sjt", facetKey: "ED" },
    ],
  },
  {
    key: "D5",
    name_bn: "নেতৃত্ব সম্ভাবনা",
    name_en: "Leadership Potential",
    cluster: "disposition",
    formula: [
      { instrumentKey: "leadership", facetKey: "DEL" },
      { instrumentKey: "leadership", facetKey: "DEC" },
    ],
    inconclusiveIfValidityFailedOn: "leadership",
  },
  {
    key: "D6",
    name_bn: "প্রেরণা ও কর্মনৈতিকতা",
    name_en: "Motivation & Work Ethic",
    cluster: "disposition",
    formula: [
      { instrumentKey: "motivation", facetKey: "MOT" },
      { instrumentKey: "motivation", facetKey: "AUT" },
    ],
  },
  {
    key: "D7",
    name_bn: "যোগাযোগ ও দর-কষাকষি",
    name_en: "Communication & Negotiation",
    cluster: "judgment_integrity",
    formula: [
      { instrumentKey: "communication", facetKey: "NEG" },
      { instrumentKey: "communication", facetKey: "DC" },
      { instrumentKey: "communication", facetKey: "PH" },
    ],
  },
  {
    key: "D8",
    name_bn: "সততা ও ন্যায্য সম্পদ বণ্টন",
    name_en: "Integrity & Fair Resource Allocation",
    cluster: "judgment_integrity",
    formula: [
      { instrumentKey: "honesty", facetKey: "H" },
      { instrumentKey: "honesty", facetKey: "D" },
      { instrumentKey: "honesty", facetKey: "FRA" },
    ],
    inconclusiveIfValidityFailedOn: "honesty",
  },
];

export const AM_BANDS = [
  { rank: 1, min: 0, max: 10, label_bn: "উন্নয়ন প্রয়োজন", label_en: "Needs Development" },
  { rank: 2, min: 11, max: 30, label_bn: "বিকাশমান", label_en: "Developing" },
  { rank: 3, min: 31, max: 70, label_bn: "সলিড / প্রত্যাশা পূরণ করছে", label_en: "Solid / Meets Expectations" },
  { rank: 4, min: 71, max: 90, label_bn: "শক্তিশালী", label_en: "Strong" },
  { rank: 5, min: 91, max: 100, label_bn: "ব্যতিক্রমী", label_en: "Exceptional" },
];

export const AM_CONVERGENCE_CHECK = {
  instrumentA: { instrumentKey: "honesty", facetKey: "D" },
  instrumentB: { instrumentKey: "personality", facetKey: "DEP" },
  maxBandDiff: 2,
};

export const AM_FIT_STATEMENT_RULE = {
  integrityDomainKey: "D8",
  judgmentDomainKey: "D4",
  downgradeIfBandEquals1: ["D5", "D3"],
  thresholds: { wellSuited: 4, suitedWithCoaching: 3 },
};

/** ⚠ DRAFT অনুবাদ — SME রিভিউ ছাড়া candidate-facing এ পাঠানো ঠিক না */
export const AM_NARRATIVE_TEMPLATES: Record<string, { low: string; mid: string; high: string }> = {
  D1: {
    low: "এই পদের জন্য প্রয়োজনীয় সম্পদ-বণ্টন ও বহু-ধাপ যুক্তিতে চ্যালেঞ্জের মুখে পড়তে পারেন।",
    mid: "এই পদের জন্য প্রয়োজনীয় কৌশলগত ও সাংখ্যিক সক্ষমতা পর্যাপ্ত মাত্রায় আছে।",
    high: "এই পদের জন্য শক্তিশালী কৌশলগত ও সাংখ্যিক সক্ষমতা রয়েছে।",
  },
  D2: {
    low: "একটি ব্যক্তিত্ব প্রোফাইল দেখা যাচ্ছে যেখানে formal management role-এ সক্রিয় সহায়তা প্রয়োজন হতে পারে।",
    mid: "একটি পর্যাপ্ত, বিকাশমান ব্যবস্থাপনাগত ব্যক্তিত্ব প্রোফাইল দেখা যাচ্ছে।",
    high: "একটি শক্তিশালী, সুষম ব্যবস্থাপনাগত ব্যক্তিত্ব প্রোফাইল দেখা যাচ্ছে।",
  },
  D3: {
    low: "দলের আবেগীয়/সামাজিক পরিস্থিতি পড়তে ও পরিচালনা করতে সক্রিয় সহায়তা প্রয়োজন হতে পারে।",
    mid: "রুটিন আবেগীয়/সামাজিক পরিস্থিতি পর্যাপ্তভাবে সামলাতে পারেন।",
    high: "দলের আবেগীয় গতিবিধি ভালোভাবে সামলান — self-report ও situational judgment উভয়েই।",
  },
  D4: {
    low: "সম্পদ, দ্বন্দ্ব ও নৈতিক সিদ্ধান্তে ঘনিষ্ঠ প্রাথমিক কোচিং প্রয়োজন হতে পারে।",
    mid: "রুটিন ব্যবস্থাপনাগত সিদ্ধান্ত পর্যাপ্তভাবে নিতে পারেন।",
    high: "সম্পদ, দ্বন্দ্ব ও নৈতিক সিদ্ধান্ত ধারাবাহিকভাবে ভালোভাবে সামলান।",
  },
  D5: {
    low: "দায়িত্ব অর্পণ ও স্বাধীনভাবে সিদ্ধান্ত নেওয়ার প্রস্তুতি সীমিত।",
    mid: "রুটিন দায়িত্ব অর্পণ ও সিদ্ধান্তগ্রহণে পর্যাপ্ত, বিকাশমান প্রস্তুতি আছে।",
    high: "দায়িত্ব অর্পণ ও সিদ্ধান্তগ্রহণে শক্তিশালী, ধারাবাহিক প্রস্তুতি দেখা যাচ্ছে।",
  },
  D6: {
    low: "চ্যালেঞ্জ গ্রহণ ও স্বাধীনভাবে কাজের মান বজায় রাখায় সীমিত আগ্রহ দেখা যাচ্ছে।",
    mid: "পর্যাপ্ত মাত্রায় প্রেরণা ও কর্মনৈতিকতা দেখা যাচ্ছে।",
    high: "সরাসরি তদারকি ছাড়াই চ্যালেঞ্জ গ্রহণ ও ধারাবাহিক কাজের মান বজায় রাখার শক্তিশালী প্রবণতা।",
  },
  D7: {
    low: "আলোচনা ও নিচের দিকে যোগাযোগে সীমিত দক্ষতা দেখা যাচ্ছে।",
    mid: "রুটিন আলোচনা ও যোগাযোগ পরিস্থিতি পর্যাপ্তভাবে সামলাতে পারেন।",
    high: "আলোচনা ও যোগাযোগে ধারাবাহিকভাবে কৌশলগত, সহযোগিতামূলক সিদ্ধান্ত নেন।",
  },
  D8: {
    low: "সম্পদ-বণ্টনে ন্যায্যতা নিয়ে উদ্বেগ আছে যা সরাসরি অনুসরণ প্রয়োজন।",
    mid: "একটি পর্যাপ্ত, unremarkable সততা প্রোফাইল দেখা যাচ্ছে।",
    high: "শক্তিশালী, সঙ্গতিপূর্ণভাবে যাচাইকৃত সততা ও ন্যায্য-বণ্টন বিচার দেখা যাচ্ছে।",
  },
};