import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  deleteAmBattery, 
  fetchAmBatteriesAdmin, 
  setAmBatteryPrice, 
  setAmBatteryStatus 
} from "../../api/amBatteryAdmin";

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
      .catch((err) => setError(err.message || "Failed to load the list."))
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
      alert(err.message || "Failed to change status.");
    } finally {
      setBusySlug(null);
    }
  };

  const handleSavePrice = async (b: BatteryRow) => {
    const draft = priceDrafts[b.slug];
    if (draft === undefined) return;
    const price = Number(draft);
    if (Number.isNaN(price) || price < 0) {
      alert("Please enter a valid price.");
      return;
    }
    setBusySlug(b.slug);
    try {
      await setAmBatteryPrice(b.slug, price);
      load();
    } catch (err: any) {
      alert(err.message || "Failed to update price.");
    } finally {
      setBusySlug(null);
    }
  };

  const handleDelete = async (b: BatteryRow) => {
    if (!confirm(`Are you sure you want to delete "${b.name?.en || b.name?.bn}"? This action cannot be undone.`)) return;
    setBusySlug(b.slug);
    try {
      await deleteAmBattery(b.slug);
      load();
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusySlug(null);
    }
  };

  if (loading) return <div className="p-8 text-[#4A4A4A] font-medium tracking-wide">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 font-medium">{error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-0 font-sans pb-16">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#222222] tracking-wide">
          Selection Batteries
        </h1>
        <Link
          to="/dashboard/admin/why-not-you/am-battery/create"
          className="bg-[#222222] hover:bg-[#A38771] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-colors duration-300 rounded-sm shadow-sm whitespace-nowrap text-center"
        >
          + New Battery
        </Link>
      </div>

      {/* Content Section */}
      {batteries.length === 0 ? (
        <div className="bg-white border border-[#EFECE5] rounded-sm p-12 text-center text-[#4A4A4A] text-sm shadow-sm">
          No batteries have been created yet.
        </div>
      ) : (
        <div className="bg-white border border-[#EFECE5] rounded-sm shadow-sm overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#F9F6F0] text-[#4A4A4A] text-xs uppercase tracking-widest border-b border-[#EFECE5]">
              <tr>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Slug</th>
                <th className="px-6 py-4 font-bold">Price (৳)</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE5]">
              {batteries.map((b) => (
                <tr key={b._id} className="hover:bg-[#F9F6F0]/50 transition-colors">
                  
                  {/* Name */}
                  <td className="px-6 py-4 font-bold text-[#222222]">
                    {b.name?.en || b.name?.bn}
                  </td>
                  
                  {/* Slug */}
                  <td className="px-6 py-4 text-[#4A4A4A] font-mono text-xs">
                    {b.slug}
                  </td>
                  
                  {/* Price Update */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={0}
                        className="w-20 bg-[#F9F6F0] border border-[#EFECE5] rounded-sm px-3 py-1.5 outline-none focus:border-[#A38771] text-[#222222] transition-colors"
                        placeholder={String(b.price)}
                        value={priceDrafts[b.slug] ?? ""}
                        onChange={(e) =>
                          setPriceDrafts((p) => ({ ...p, [b.slug]: e.target.value }))
                        }
                      />
                      <button
                        disabled={busySlug === b.slug || priceDrafts[b.slug] === undefined}
                        onClick={() => handleSavePrice(b)}
                        className="text-[#A38771] hover:text-[#222222] text-xs font-bold uppercase tracking-widest disabled:opacity-40 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </td>
                  
                  {/* Status Toggle */}
                  <td className="px-6 py-4">
                    <button
                      disabled={busySlug === b.slug}
                      onClick={() => handleToggleStatus(b)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest transition-colors shadow-sm ${
                        b.status === "published"
                          ? "bg-[#222222] text-[#F9F6F0] hover:bg-[#4A4A4A]"
                          : "bg-amber-500/10 text-amber-800 border border-amber-500/30 hover:bg-amber-500/20"
                      }`}
                    >
                      {b.status === "published" ? "Published" : "Draft"}
                    </button>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4 text-right space-x-5">
                    <Link
                      to={`/dashboard/admin/why-not-you/am-battery/${b.slug}/items`}
                      className="text-[#A38771] hover:text-[#222222] text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Manage
                    </Link>
                    <button
                      disabled={busySlug === b.slug}
                      onClick={() => handleDelete(b)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      Delete
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