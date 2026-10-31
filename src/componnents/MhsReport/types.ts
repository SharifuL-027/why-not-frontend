export type MhsLang = "en" | "bn";

export type MhsSeverity = "minimal" | "mild" | "moderate" | "severe";

export interface MhsDomainScore {
  code: "anxiety" | "stress" | "depression" | "sleep" | "somatic";
  name_en: string;
  name_bn: string;
  score: number; // 0 - 100
  rawScore?: number;
  maxRaw?: number;
  severity: MhsSeverity;
  severity_en: string;
  severity_bn: string;
  percentDeviation: number; // % above healthy baseline
  color: string;
  tools_en: string;
  tools_bn: string;
}

export interface MhsSymptomItem {
  id: string;
  domain: string;
  text_en: string;
  text_bn: string;
  frequency: 0 | 1 | 2 | 3; // 0: Never, 1: Several days, 2: > half the days, 3: Nearly every day
  tag_en: string;
  tag_bn: string;
}

export interface MhsMetadata {
  reportNumber: string;
  name: string;
  ageGender: string;
  occupation: string;
  date: string;
  reference: string;
  scaleTitle: string;
  organization: string;
}

export interface MhsReportData {
  scoringType: "mhs_clinical_scan";
  metadata: MhsMetadata;
  overallIndex: {
    score: number; // 0 - 100
    category_en: string;
    category_bn: string;
    severity: MhsSeverity;
    guidance_en: string;
    guidance_bn: string;
  };
  domainScores: {
    anxiety: MhsDomainScore;
    stress: MhsDomainScore;
    depression: MhsDomainScore;
    sleep: MhsDomainScore;
    somatic: MhsDomainScore;
  };
  primaryConcerns: string[];
  protectiveStrengths: string[];
  symptoms: MhsSymptomItem[];
  dailyImpact: {
    work_en: string;
    work_bn: string;
    workSeverity: MhsSeverity;
    social_en: string;
    social_bn: string;
    socialSeverity: MhsSeverity;
  };
}
