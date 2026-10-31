import { RrsReportData, RrsBand } from "./types";

export const RRS_BANDS: Record<string, RrsBand> = {
  very_low: {
    code: "very_low",
    label_en: "Very Low",
    label_bn: "অত্যন্ত নিম্ন",
    max: 2.50,
    color: "#DC2626", // Crimson
  },
  low: {
    code: "low",
    label_en: "Low",
    label_bn: "নিম্ন",
    min: 2.50,
    max: 3.00,
    color: "#EA580C", // Orange
  },
  average: {
    code: "average",
    label_en: "Average / Expected",
    label_bn: "গড় / প্রত্যাশিত",
    min: 3.00,
    max: 4.12,
    color: "#0D9488", // Teal / Slate
  },
  high: {
    code: "high",
    label_en: "High / Strength",
    label_bn: "উচ্চ / শক্তি",
    min: 4.12,
    max: 4.75,
    color: "#1B4D3E", // Forest Green
  },
  very_high: {
    code: "very_high",
    label_en: "Very High",
    label_bn: "অত্যন্ত উচ্চ",
    min: 4.75,
    color: "#15803D", // Consolidated Green
  },
};

export const SAMPLE_RRS_DATA: RrsReportData = {
  scoringType: "domain_mean_average",
  metadata: {
    reportNumber: "RRS-2026-004187",
    name: "Career Stride Participant",
    date: "October 31, 2026",
    reference: "Career Stride Bangladesh",
    language: "English / বাংলা",
    authorCredit: "Kazi Fardous Iqbal",
    authorTitle: "PhD Researcher & Licensed Psychologist",
    affiliation: "Bangladesh University of Professionals",
    scaleTitle: "Responsibility and Reliability Scale — RRS-24",
  },
  domainResults: {
    PR: {
      code: "PR",
      name_en: "Personal Responsibility",
      name_bn: "ব্যক্তিগত দায়িত্বশীলতা",
      measures_en: "Fulfilling duties taken upon oneself — finishing tasks, keeping time, and admitting errors rather than making excuses.",
      measures_bn: "নিজে যা দায়িত্ব নিয়েছেন তা নিষ্ঠার সাথে পালন করা — কাজ শেষ করা, সময় রক্ষা করা এবং অজুহাতের বদলে ভুল স্বীকার করা।",
      score: 4.25,
      scoreDisplay: 4.25,
      band: RRS_BANDS.high,
      standing_en: "Your Strength",
      standing_bn: "আপনার প্রধান শক্তি",
    },
    MR: {
      code: "MR",
      name_en: "Moral Responsibility",
      name_bn: "নৈতিক দায়িত্বশীলতা",
      measures_en: "Staying steadfast in honesty and ethical principles even when unmonitored and at personal inconvenience.",
      measures_bn: "সততা ও নীতিতে অটল থাকা, এমনকি কেউ না দেখলেও এবং ব্যক্তিগত ক্ষতির ঝুঁকি থাকলেও।",
      score: 3.50,
      scoreDisplay: 3.50,
      band: RRS_BANDS.average,
      standing_en: "Expected Baseline",
      standing_bn: "প্রত্যাশিত গড় মান",
    },
    SR: {
      code: "SR",
      name_en: "Social Responsibility",
      name_bn: "সামাজিক দায়িত্বশীলতা",
      measures_en: "Remaining dependable toward family and community welfare, taking others into active account during decisions.",
      measures_bn: "পরিবার ও সমাজের প্রতি নির্ভরযোগ্য থাকা এবং সিদ্ধান্ত গ্রহণের সময় সমষ্টিগত কল্যাণকে বিবেচনায় রাখা।",
      score: 3.00,
      scoreDisplay: 3.00,
      band: {
        code: "average",
        label_en: "Average (Lower Edge)",
        label_bn: "গড় (নিম্ন সীমায়)",
        min: 3.00,
        max: 4.12,
        color: "#B45309", // Warm Terracotta / Amber
      },
      standing_en: "Main Area to Work On",
      standing_bn: "উন্নতির প্রধান ক্ষেত্র",
    },
  },
  total: {
    score: 3.58,
    scoreDisplay: 3.58,
    band: RRS_BANDS.average,
  },
  gap: {
    value: 1.25,
    display: 1.25,
    reading_en: "A significantly asymmetric profile. Standards consistently upheld in personal execution have not yet transferred equally into social and communal interdependency. The lowest area offers your highest return on intentional growth.",
    reading_bn: "যথেষ্ট অসম প্রোফাইল। ব্যক্তিগত জীবনে যে নিষ্ঠা ও শৃঙ্খলা বজায় রাখা হয়েছে, তা সামাজিক ও পারিপার্শ্বিক ক্ষেত্রে সমানভাবে পৌঁছায়নি। সবচেয়ে দুর্বল ক্ষেত্রেই সবচেয়ে বেশি উন্নতির সুযোগ রয়েছে।",
  },
  highestDomain: "PR",
  lowestDomain: "SR",
};
