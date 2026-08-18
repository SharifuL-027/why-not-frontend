import axios from "axios";
import type {
  InstrumentListItem,
  InstrumentDetails,
  QuizInstrument,
  SubmitResponseResult,
} from "../types/instrument";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_BASE });

export async function fetchInstrumentList(): Promise<InstrumentListItem[]> {
  const res = await api.get("/instruments");
  return res.data.instruments;
}

export async function fetchInstrumentDetails(slug: string): Promise<InstrumentDetails> {
  const res = await api.get(`/instruments/${slug}/details`);
  return res.data.instrument;
}

export async function fetchQuizConfig(slug: string): Promise<QuizInstrument> {
  const res = await api.get(`/instruments/${slug}/quiz`);
  return res.data.instrument;
}

export async function submitAnswers(
  slug: string,
  answers: Record<string, any>,
  consentAck?: boolean,
  consentVersion?: string
): Promise<SubmitResponseResult> {
  const res = await api.post(`/instruments/${slug}/submit`, {
    answers,
    consentAck,
    consentVersion,
  });
  return res.data;
}

export async function fetchResult(responseId: string) {
  const res = await api.get(`/instruments/response/${responseId}`);
  return res.data;
}

export default api;