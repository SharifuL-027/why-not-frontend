import adminAxios from "./adminAxios";

const unwrap = (res: { status: number; data: any }) => {
  if (res.status >= 400) {
    throw new Error(res.data?.message || "অজানা এরর হয়েছে");
  }
  return res.data;
};

export const fetchAmBatteriesAdmin = async () => {
  const res = await adminAxios.get("/am-battery/admin/list");
  return unwrap(res).batteries;
};

export const fetchAmBatteryAdmin = async (slug: string) => {
  const res = await adminAxios.get(`/am-battery/admin/${slug}`);
  return unwrap(res).battery;
};

export const createAmBattery = async (payload: Record<string, any>) => {
  const res = await adminAxios.post("/am-battery/admin", payload);
  return unwrap(res).battery;
};

export const updateAmBattery = async (slug: string, payload: Record<string, any>) => {
  const res = await adminAxios.put(`/am-battery/admin/${slug}`, payload);
  return unwrap(res).battery;
};

export const setAmBatteryStatus = async (slug: string, status: "draft" | "published") => {
  const res = await adminAxios.patch(`/am-battery/admin/${slug}/status`, { status });
  return unwrap(res).battery;
};

export const setAmBatteryPrice = async (slug: string, price: number) => {
  const res = await adminAxios.patch(`/am-battery/admin/${slug}/price`, { price });
  return unwrap(res).battery;
};

export const deleteAmBattery = async (slug: string) => {
  const res = await adminAxios.delete(`/am-battery/admin/${slug}`);
  return unwrap(res);
};

export const addAmBatteryItem = async (slug: string, item: Record<string, any>) => {
  const res = await adminAxios.post(`/am-battery/admin/${slug}/items`, item);
  return unwrap(res).item;
};

export const updateAmBatteryItem = async (
  slug: string,
  itemId: string,
  item: Record<string, any>
) => {
  const res = await adminAxios.put(`/am-battery/admin/${slug}/items/${itemId}`, item);
  return unwrap(res).item;
};

export const deleteAmBatteryItem = async (slug: string, itemId: string) => {
  const res = await adminAxios.delete(`/am-battery/admin/${slug}/items/${itemId}`);
  return unwrap(res);
};