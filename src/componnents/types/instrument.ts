export interface InstrumentListItem {
  _id: string;
  instrumentSlug: string;
  instrumentName: { bn: string; en?: string };
  coverImage: string;
  price: number;
}

export interface InstrumentDetails {
  _id: string;
  instrumentSlug: string;
  instrumentName: { bn: string; en?: string };
  description: { bn: string; en?: string };
  coverImage: string;
  price: number;
  estimatedMinutes?: [number, number];
  itemCount?: number;
  scoringType: string;
}

export interface QuizInstrument {
  _id: string;
  instrumentSlug: string;
  instrumentName: { bn: string; en?: string };
  scoringType: string;
  price: number;
  data: Record<string, any>; // পুরো config — items, occupations, bands...
}

export interface SubmitResponseResult {
  message: string;
  responseId: string;
  result?: Record<string, any>;
  paymentRequired?: boolean;
  amount?: number;
}