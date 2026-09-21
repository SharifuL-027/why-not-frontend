import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAmBattery, fetchAmBatteriesAdmin, setAmBatteryPrice, setAmBatteryStatus } from "../../api/amBatteryAdmin";


interface BatteryRow {
  _id: string;
  slug: string;
  name: { bn: string; en?: string };
  price: number;
  status: "draft" | "published";
  version: string;
}

export default function AmBatteryList() {
  const [batteries, setBatteries] = useState<BatteryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});
  const [busySlug, setBusySlug] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetchAmBatteriesAdmin()
      .then((data) => setBatteries(data))
      .catch((err) => setError(err.message || "তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleStatus = async (b: BatteryRow) => {
    setBusySlug(b.slug);
    try {
      const next = b.status === "published" ? "draft" : "published";
      await setAmBatteryStatus(b.slug, next);
      load();
    } catch (err: any) {
      alert(err.message || "স্ট্যাটাস পরিবর্তন করা যায়নি।");
    } finally {
      setBusySlug(null);
    }
  };

  const handleSavePrice = async (b: BatteryRow) => {
    const draft = priceDrafts[b.slug];
    if (draft === undefined) return;
    const price = Number(draft);
    if (Number.isNaN(price) || price < 0) {
      alert("সঠিক দাম দিন।");
      return;
    }
    setBusySlug(b.slug);
    try {
      await setAmBatteryPrice(b.slug, price);
      load();
    } catch (err: any) {
      alert(err.message || "দাম আপডেট করা যায়নি।");
    } finally {
      setBusySlug(null);
    }
  };

  const handleDelete = async (b: BatteryRow) => {
    if (!confirm(`"${b.name?.bn}" ডিলিট করবেন? এটা ফেরানো যাবে না।`)) return;
    setBusySlug(b.slug);
    try {
      await deleteAmBattery(b.slug);
      load();
    } catch (err: any) {
      alert(err.message || "ডিলিট করা যায়নি।");
    } finally {
      setBusySlug(null);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">লোড হচ্ছে...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Selection Batteries</h1>
        <Link
          to="/dashboard/admin/why-not-you/am-battery/create"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
        >
          + নতুন Battery
        </Link>
      </div>

      {batteries.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          এখনো কোনো battery তৈরি হয়নি।
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">নাম</th>
                <th className="text-left px-4 py-3">Slug</th>
                <th className="text-left px-4 py-3">দাম (৳)</th>
                <th className="text-left px-4 py-3">স্ট্যাটাস</th>
                <th className="text-right px-4 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {batteries.map((b) => (
                <tr key={b._id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-800">{b.name?.bn}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{b.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        className="w-20 border border-slate-200 rounded px-2 py-1"
                        placeholder={String(b.price)}
                        value={priceDrafts[b.slug] ?? ""}
                        onChange={(e) =>
                          setPriceDrafts((p) => ({ ...p, [b.slug]: e.target.value }))
                        }
                      />
                      <button
                        disabled={busySlug === b.slug || priceDrafts[b.slug] === undefined}
                        onClick={() => handleSavePrice(b)}
                        className="text-emerald-700 text-xs font-semibold disabled:opacity-40"
                      >
                        সেভ
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={busySlug === b.slug}
                      onClick={() => handleToggleStatus(b)}
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        b.status === "published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {b.status === "published" ? "Published" : "Draft"} — টগল
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link
                      to={`/dashboard/admin/why-not-you/am-battery/${b.slug}/items`}
                      className="text-blue-600 text-xs font-semibold"
                    >
                      প্রশ্ন পরিচালনা
                    </Link>
                    <button
                      disabled={busySlug === b.slug}
                      onClick={() => handleDelete(b)}
                      className="text-red-600 text-xs font-semibold"
                    >
                      ডিলিট
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}