import axios from "axios";

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 500,
});

async function unwrap<T>(promise: Promise<{ data: any; status: number }>): Promise<T> {
  const res = await promise;
  if (res.status >= 400) {
    throw new Error(res.data?.message || "কিছু একটা সমস্যা হয়েছে।");
  }
  return res.data;
}

export const fetchImageQuizList = () => unwrap<any[]>(publicAxios.get("/image-quiz"));

export const fetchImageQuizDetails = (slug: string) =>
  unwrap<any>(publicAxios.get(`/image-quiz/${slug}`));

export const fetchImageQuizForTaking = (slug: string) =>
  unwrap<any>(publicAxios.get(`/image-quiz/${slug}/quiz`));

export const submitImageQuizResponse = (
  slug: string,
  payload: { answers: Record<string, string>; candidateInfo?: Record<string, any> }
) => unwrap<any>(publicAxios.post(`/image-quiz/${slug}/submit`, payload));

export const fetchImageQuizResult = (responseId: string) =>
  unwrap<any>(publicAxios.get(`/image-quiz/result/${responseId}`));
