export type RrsLang = "en" | "bn";

export interface RrsBand {
  code: "very_low" | "low" | "average" | "high" | "very_high";
  label_en: string;
  label_bn: string;
  min?: number;
  max?: number;
  color: string;
}

export interface RrsDomainResult {
  code: "PR" | "MR" | "SR";
  name_en: string;
  name_bn: string;
  measures_en?: string;
  measures_bn?: string;
  score: number; // unrounded e.g. 4.25
  scoreDisplay: number;
  band: RrsBand;
  standing_en?: string;
  standing_bn?: string;
}

export interface RrsMetadata {
  reportNumber: string;
  name: string;
  date: string;
  reference: string;
  language: string;
  authorCredit: string;
  authorTitle: string;
  affiliation: string;
  scaleTitle: string;
}

export interface RrsReportData {
  scoringType: "domain_mean_average";
  metadata: RrsMetadata;
  domainResults: {
    PR: RrsDomainResult;
    MR: RrsDomainResult;
    SR: RrsDomainResult;
  };
  total: {
    score: number;
    scoreDisplay: number;
    band: RrsBand;
  };
  gap: {
    value: number;
    display: number;
    reading_en?: string;
    reading_bn?: string;
  };
  highestDomain: "PR" | "MR" | "SR";
  lowestDomain: "PR" | "MR" | "SR";
}
