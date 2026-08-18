import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInstrumentDetails } from "../api/instruments";
import type { InstrumentDetails } from "../types/instrument";

export default function InstrumentDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [instrument, setInstrument] = useState<InstrumentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchInstrumentDetails(slug)
      .then(setInstrument)
      .catch(() => setError("এই টেস্টের তথ্য পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleBuyNow = () => {
    // এখন সরাসরি quiz-এ পাঠাচ্ছে। পরে পেমেন্ট গেটওয়ে বসালে
    // এখানে প্রথমে পেমেন্ট পেজে পাঠাবেন, সফল হলে quiz-এ রিডাইরেক্ট করবেন।
    navigate(`/tests/${slug}/quiz`);
  };

  if (loading) return <div className="p-16 text-center text-slate-500">লোড হচ্ছে...</div>;
  if (error || !instrument)
    return <div className="p-16 text-center text-slate-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto pb-10">
      <img
        src={instrument.coverImage || "/placeholder.png"}
        alt={instrument.instrumentName.bn}
        className="w-full h-56 object-cover bg-emerald-50"
      />

      <div className="p-5">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {instrument.instrumentName.bn}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {instrument.description?.bn}
        </p>

        <div className="flex gap-4 text-xs text-slate-500 my-3">
          {instrument.estimatedMinutes && (
            <span>
              ⏱ {instrument.estimatedMinutes[0]}–{instrument.estimatedMinutes[1]} মিনিট
            </span>
          )}
          {instrument.itemCount && <span>📝 {instrument.itemCount} প্রশ্ন</span>}
        </div>

        <div className="text-xl font-bold text-slate-800 my-3">
          {instrument.price > 0 ? `৳ ${instrument.price}` : "ফ্রি"}
        </div>

        <button
          onClick={handleBuyNow}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
        >
          Buy Now — শুরু করুন
        </button>
      </div>
    </div>
  );
}