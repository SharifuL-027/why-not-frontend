export type ReportLang = "en" | "bn";

export interface ScoreBand {
  code: string;
  min: number;
  max: number;
  label_en: string;
  label_bn: string;
  color: "red" | "orange" | "amber" | "lightgreen" | "green";
}

export interface DomainResultItem {
  name_en: string;
  name_bn: string;
  scored: boolean;
  mean?: number;
  index?: number;
  prorated?: boolean;
  band?: ScoreBand;
}

export interface SubIndicatorItem {
  id: string;
  domain: "D4" | "D5";
  label_en: string;
  label_bn: string;
  score: number; // 0 - 100
  reverse?: boolean;
}

export interface ReferralResource {
  need_en: string;
  need_bn: string;
  service: string;
  number: string;
  hours_en: string;
  hours_bn: string;
  badge?: string;
}

export interface ReportMetadata {
  referenceCode: string;
  version: string;
  formType: "M" | "E" | "S";
  ageBand: string;
  relationshipDuration: string;
  division: string;
  referenceSource: string;
  dateCompleted: string;
  participantName?: string;
  participantEmail?: string;
  gender?: string;
}

export interface McrrReportData {
  scoringType?: string;
  metadata?: ReportMetadata;
  form: string;
  careFlag: boolean;
  domainResults: Record<string, DomainResultItem>;
  total: {
    index: number;
    note?: string | null;
    band: ScoreBand;
  } | null;
  pri: {
    index: number;
    band: ScoreBand;
  } | null;
  tier: number;
  tierLabel_en?: string;
  tierLabel_bn?: string;
  strongest?: string;
  focusAreas?: string[];
  subIndicators?: SubIndicatorItem[];
  referralResources?: ReferralResource[];
  tier4Message_en?: string;
  tier4Message_bn?: string;
  disclaimer_en?: string;
  disclaimer_bn?: string;
}
