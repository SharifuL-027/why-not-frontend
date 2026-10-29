import adminAxios from "./adminAxios";

export interface ImageQuizItem {
  id: string;
  imageUrl: string;
  optionsCount: number;
  correctOptionId: string;
  note_bn?: string;
}

export interface ImageQuizPayload {
  slug: string;
  name: { bn: string; en?: string };
  description?: { bn: string };
  coverImage?: string;
  price: number;
  ageGroup?: "5-8" | "9-12" | "13-17" | "18-29" | "30+";
}

async function unwrap<T>(promise: Promise<{ data: any; status: number }>): Promise<T> {
  const res = await promise;
  if (res.status >= 400) {
    throw new Error(res.data?.message || "কিছু একটা সমস্যা হয়েছে।");
  }
  return res.data;
}

export const fetchImageQuizzesAdmin = () =>
  unwrap<any[]>(adminAxios.get("/image-quiz/admin"));

export const fetchImageQuizAdmin = (slug: string) =>
  unwrap<any>(adminAxios.get(`/image-quiz/admin/${slug}`));

export const createImageQuiz = (payload: ImageQuizPayload) =>
  unwrap<any>(adminAxios.post("/image-quiz/admin", payload));

export const setImageQuizStatus = (slug: string, status: "draft" | "published") =>
  unwrap<any>(adminAxios.patch(`/image-quiz/admin/${slug}`, { status }));

export const setImageQuizPrice = (slug: string, price: number) =>
  unwrap<any>(adminAxios.patch(`/image-quiz/admin/${slug}`, { price }));

export const deleteImageQuiz = (slug: string) =>
  unwrap<any>(adminAxios.delete(`/image-quiz/admin/${slug}`));

export const addImageQuizItem = (
  slug: string,
  file: File,
  optionsCount: number,
  correctOptionId: string,
  note_bn?: string
) => {
  const form = new FormData();
  form.append("image", file);
  form.append("optionsCount", String(optionsCount));
  form.append("correctOptionId", correctOptionId);
  if (note_bn) form.append("note_bn", note_bn);
  return unwrap<any>(adminAxios.post(`/image-quiz/admin/${slug}/items`, form));
};

export const updateImageQuizItem = (
  slug: string,
  itemId: string,
  fields: { optionsCount: number; correctOptionId: string; note_bn?: string },
  file?: File | null
) => {
  const form = new FormData();
  if (file) form.append("image", file);
  form.append("optionsCount", String(fields.optionsCount));
  form.append("correctOptionId", fields.correctOptionId);
  if (fields.note_bn) form.append("note_bn", fields.note_bn);
  return unwrap<any>(adminAxios.put(`/image-quiz/admin/${slug}/items/${itemId}`, form));
};

export const deleteImageQuizItem = (slug: string, itemId: string) =>
  unwrap<any>(adminAxios.delete(`/image-quiz/admin/${slug}/items/${itemId}`));
