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

  // প্রফেশনাল লোডিং স্টেট
  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col justify-center items-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );
  }

  // প্রফেশনাল এরর স্টেট
  if (error || !instrument) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex justify-center items-center bg-slate-50 px-4">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-sm border border-red-100 text-center max-w-md">
          <svg className="w-8 h-8 mx-auto mb-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{error || "তথ্য পাওয়া যায়নি"}</p>
        </div>
      </div>
    );
  }

  return (
    // ন্যাভবারের জন্য pt-28 এবং পুরো পেজের ব্যাকগ্রাউন্ড
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        
        {/* ইমেজের অংশ */}
        <div className="relative">
          <img
            src={instrument.coverImage || "/placeholder.png"}
            alt={instrument.instrumentName.bn}
            className="w-full h-64 sm:h-80 object-cover bg-slate-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
          {/* ফ্রি ব্যাজ (যদি ফ্রি হয়) */}
          {instrument.price === 0 && (
            <span className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
              ফ্রি
            </span>
          )}
        </div>

        {/* কন্টেন্ট অংশ */}
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {instrument.instrumentName.bn}
          </h1>

          {/* ট্যাগস (সময় ও প্রশ্নের সংখ্যা) */}
          <div className="flex flex-wrap gap-3 mb-6">
            {instrument.estimatedMinutes && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-sm font-medium px-3 py-1.5 rounded-lg">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {instrument.estimatedMinutes[0]}–{instrument.estimatedMinutes[1]} মিনিট
              </span>
            )}
            {instrument.itemCount && (
              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-sm font-medium px-3 py-1.5 rounded-lg">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                {instrument.itemCount} প্রশ্ন
              </span>
            )}
          </div>

          {/* ডেসক্রিপশন */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            {instrument.description?.bn}
          </p>

          {/* প্রাইস এবং বাটন সেকশন */}
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-slate-100">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="text-sm font-medium text-slate-500 mb-1">অ্যাসেসমেন্ট ফি</p>
              <p className="text-3xl font-extrabold text-emerald-600">
                {instrument.price > 0 ? `৳ ${instrument.price}` : "ফ্রি"}
              </p>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto flex-1 max-w-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center flex justify-center items-center gap-2"
            >
              <span>শুরু করুন</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}