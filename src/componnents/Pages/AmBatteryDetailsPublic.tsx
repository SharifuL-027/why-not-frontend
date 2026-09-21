import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAmBatteryDetails } from "../api/amBatteryPublic";

interface BatteryDetails {
  slug: string;
  name: { bn: string; en?: string };
  description?: { bn: string; en?: string };
  coverImage?: string;
  price: number;
  version: string;
  config: { instruments: { key: string; name_bn: string }[] };
}

export default function AmBatteryDetailsPublic() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [battery, setBattery] = useState<BatteryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchAmBatteryDetails(slug)
      .then(setBattery)
      .catch(() => setError("এই ব্যাটারির তথ্য পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleStart = () => {
    // এখন সরাসরি quiz-এ পাঠাচ্ছে। পরে পেমেন্ট গেটওয়ে বসালে
    // এখানে প্রথমে পেমেন্ট পেজে পাঠাবেন, সফল হলে quiz-এ রিডাইরেক্ট করবেন।
    navigate(`/selection/${slug}/quiz`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col justify-center items-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !battery) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex justify-center items-center bg-slate-50 px-4">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-sm border border-red-100 text-center max-w-md">
          <p>{error || "তথ্য পাওয়া যায়নি"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="relative">
          <img
            src={battery.coverImage || "/placeholder.png"}
            alt={battery.name?.bn}
            className="w-full h-64 sm:h-72 object-cover bg-slate-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
          {battery.price === 0 && (
            <span className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
              ফ্রি
            </span>
          )}
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {battery.name?.bn}
          </h1>

          <span className="inline-block bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Version {battery.version} · Provisional
          </span>

          <p className="text-base text-slate-600 leading-relaxed mb-8">
            {battery.description?.bn}
          </p>

          {battery.config?.instruments?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                এই ব্যাটারিতে যা যা মূল্যায়ন হবে
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {battery.config.instruments.map((inst) => (
                  <div
                    key={inst.key}
                    className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-700"
                  >
                    {inst.name_bn}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-slate-100">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="text-sm font-medium text-slate-500 mb-1">মূল্য</p>
              <p className="text-3xl font-extrabold text-emerald-600">
                {battery.price > 0 ? `৳ ${battery.price}` : "ফ্রি"}
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full sm:w-auto flex-1 max-w-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center flex justify-center items-center gap-2"
            >
              <span>{battery.price > 0 ? "কিনুন ও শুরু করুন" : "শুরু করুন"}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}