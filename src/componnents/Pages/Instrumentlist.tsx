import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchInstrumentList } from "../api/instruments";
import type { InstrumentListItem } from "../types/instrument";

export default function InstrumentList() {
  const [instruments, setInstruments] = useState<InstrumentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInstrumentList()
      .then(setInstruments)
      .catch(() => setError("তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-16 text-center text-slate-500">লোড হচ্ছে...</div>;
  if (error) return <div className="p-16 text-center text-slate-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">সব অ্যাসেসমেন্ট</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {instruments.map((inst) => (
          <Link
            to={`/tests/${inst.instrumentSlug}`}
            key={inst._id}
            className="block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={inst.coverImage || "/placeholder.png"}
              alt={inst.instrumentName.bn}
              className="w-full h-36 object-cover bg-emerald-50"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold text-slate-800 mb-1">
                {inst.instrumentName.bn}
              </h3>
              <span className="text-sm font-bold text-emerald-700">
                {inst.price > 0 ? `৳ ${inst.price}` : "ফ্রি"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}