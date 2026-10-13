import axios from "axios";

const amPublicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});

const unwrap = (res: { status: number; data: any }) => {
  if (res.status >= 400 && res.status !== 402) {
    throw new Error(res.data?.message || "অজানা এরর হয়েছে");
  }
  return res;
};

export const fetchAmBatteryList = async () => {
  const res = unwrap(await amPublicAxios.get(`/am-battery`));
  return res.data.batteries;
};

export const fetchAmBatteryDetails = async (slug: string) => {
  const res = unwrap(await amPublicAxios.get(`/am-battery/${slug}/details`));
  return res.data.battery;
};

export const fetchAmBatteryQuiz = async (slug: string) => {
  const res = unwrap(await amPublicAxios.get(`/am-battery/${slug}/quiz`));
  return res.data;
};

export const submitAmBatteryResponse = async (
  slug: string,
  payload: {
    assignedForm: string;
    answers: Record<string, string | number>;
    candidateInfo?: Record<string, any>;
    consentAck: boolean;
  }
) => {
  const res = unwrap(await amPublicAxios.post(`/am-battery/${slug}/submit`, payload));
  return res.data;
};

/** পেমেন্ট pending থাকলে 402 আসবে — এটাকে error হিসেবে throw করি না, ফলাফল হিসেবেই রিটার্ন করি */
export const fetchAmBatteryResult = async (responseId: string) => {
  const res = await amPublicAxios.get(`/am-battery/response/${responseId}`);
  if (res.status === 402) {
    return { paymentRequired: true, responseId: res.data.responseId };
  }
  if (res.status >= 400) {
    throw new Error(res.data?.message || "রিপোর্ট পাওয়া যায়নি।");
  }
  return { paymentRequired: false, ...res.data };
};