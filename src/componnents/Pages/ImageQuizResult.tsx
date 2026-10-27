import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchImageQuizResult } from "../api/imageQuizPublic";

// =====================================================================
// IQ Conversion Logic
// =====================================================================
// Standard IQ নির্ণয়: Raw Score → IQ (20 প্রশ্নের উপর ভিত্তি করে)
// Mean IQ = 100, SD = 15
// Z-score = (score - mean_raw) / sd_raw
// IQ = 100 + 15 * z
// =====================================================================

function scoreToIQ(score: number, total: number): number {
  if (total === 0) return 100;
  const meanRaw = total * 0.5;          // 50% = mean
  const sdRaw = total * 0.16;           // ~standard deviation
  const z = (score - meanRaw) / sdRaw;
  const iq = Math.round(100 + 15 * z);
  return Math.max(40, Math.min(160, iq)); // clamp between 40-160
}

interface IQCategory {
  label: string;
  labelEn: string;
  range: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  emoji: string;
}

function getIQCategory(iq: number): IQCategory {
  if (iq >= 130) return {
    label: "অতি-উচ্চ প্রতিভাধর",
    labelEn: "Very Superior / Gifted",
    range: "১৩০+",
    description: "আপনার বুদ্ধিমত্তা অত্যন্ত উচ্চমানের। আপনি জটিল সমস্যা সমাধানে এবং সৃজনশীল চিন্তায় অসাধারণ দক্ষ। এই স্কোর জনসংখ্যার মাত্র ২% মানুষ অর্জন করে।",
    color: "#7C3AED",
    bgColor: "#F5F0FF",
    borderColor: "#DDD0FF",
    emoji: "🏆"
  };
  if (iq >= 120) return {
    label: "উচ্চতর বুদ্ধিমত্তা",
    labelEn: "Superior Intelligence",
    range: "১২০–১২৯",
    description: "আপনার বুদ্ধিমত্তা গড়ের চেয়ে উল্লেখযোগ্যভাবে উচ্চ। আপনি দ্রুত শিক্ষাগ্রহণ করতে এবং বিশ্লেষণমূলক চিন্তায় পারদর্শী।",
    color: "#2563EB",
    bgColor: "#EEF4FF",
    borderColor: "#C5D8FF",
    emoji: "⭐"
  };
  if (iq >= 110) return {
    label: "গড়ের উপরে",
    labelEn: "High Average",
    range: "১১০–১১৯",
    description: "আপনার বুদ্ধিমত্তা গড়ের উপরে। আপনি একাডেমিক ও পেশাদার ক্ষেত্রে ভালো কার্যক্ষমতা দেখাতে সক্ষম।",
    color: "#059669",
    bgColor: "#EDFFF3",
    borderColor: "#C3F0D2",
    emoji: "✅"
  };
  if (iq >= 90) return {
    label: "গড় বুদ্ধিমত্তা",
    labelEn: "Average Intelligence",
    range: "৯০–১০৯",
    description: "আপনার বুদ্ধিমত্তা স্বাভাবিক গড় পরিসরে রয়েছে। জনসংখ্যার প্রায় ৫০% মানুষ এই পরিসরে পড়ে।",
    color: "#D48A00",
    bgColor: "#FFF6E6",
    borderColor: "#FFE0A8",
    emoji: "👍"
  };
  if (iq >= 80) return {
    label: "গড়ের নিচে",
    labelEn: "Low Average",
    range: "৮০–৮৯",
    description: "আপনার স্কোর গড়ের নিচে। নিয়মিত অনুশীলন ও মনোযোগের মাধ্যমে আপনি আরও উন্নতি করতে পারবেন।",
    color: "#E05C5C",
    bgColor: "#FFF0F0",
    borderColor: "#FFD6D6",
    emoji: "💪"
  };
  return {
    label: "উন্নয়নের সুযোগ রয়েছে",
    labelEn: "Below Average",
    range: "৮০-এর নিচে",
    description: "চিন্তার দরকার নেই — নিয়মিত মানসিক অনুশীলন ও অধ্যয়নের মাধ্যমে বুদ্ধিমত্তার বিকাশ সম্ভব।",
    color: "#E05C5C",
    bgColor: "#FFF0F0",
    borderColor: "#FFD6D6",
    emoji: "🌱"
  };
}

// =====================================================================
// IQ Percentile approximation
// =====================================================================
function iqToPercentile(iq: number): number {
  const table: Record<number, number> = {
    160: 99.9, 150: 99.9, 145: 99.9, 140: 99.6, 135: 99,
    130: 98, 125: 95, 120: 91, 115: 84, 110: 75,
    105: 63, 100: 50, 95: 37, 90: 25, 85: 16,
    80: 9, 75: 5, 70: 2, 65: 1, 60: 0.4,
  };
  const rounded = Math.round(iq / 5) * 5;
  return table[rounded] ?? 50;
}

// =====================================================================
// Shared Background
// =====================================================================
const SharedBackground = () => (
  <>
    <div
      className="absolute inset-0 z-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    />
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2]/95 to-[#FAF7F2] pointer-events-none" />
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EAEFF0]/50 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F0EBE6]/50 rounded-full blur-[150px] pointer-events-none z-0"></div>
  </>
);

export default function ImageQuizResult() {
  const { responseId } = useParams<{ responseId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!responseId) return;
    fetchImageQuizResult(responseId)
      .then(setData)
      .catch((err) => setError(err.message || "Report not found."))
      .finally(() => setLoading(false));
  }, [responseId]);

  const handlePrint = () => {
    window.print();
  };

  // Loading
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] overflow-hidden">
        <SharedBackground />
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite] z-10">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-black font-bold tracking-[0.2em] uppercase text-sm z-10">রিপোর্ট তৈরি হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] overflow-hidden px-4">
        <SharedBackground />
        <div className="bg-white border border-[#EAEFF0] px-8 py-8 flex flex-col items-center gap-4 shadow-sm relative z-10 text-center rounded-xl max-w-md mx-auto">
          <span className="text-black font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Payment Required
  if (data.paymentRequired) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] overflow-hidden px-4">
        <SharedBackground />
        <div className="bg-white border border-[#EAEFF0] px-10 py-10 flex flex-col items-center text-center shadow-sm relative z-10 rounded-2xl max-w-md">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-black font-bold text-xl mb-2">পেমেন্ট প্রয়োজন</p>
          <p className="text-gray-500 text-sm mb-4">রিপোর্টটি দেখতে পেমেন্ট সম্পন্ন করুন।</p>
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Response ID: {data.responseId}</p>
        </div>
      </div>
    );
  }

  const r = data.result;
  const candidateInfo = data.candidateInfo || {};

  // IQ Computation
  const iqScore = scoreToIQ(r.score, r.total);
  const iqCategory = getIQCategory(iqScore);
  const percentile = iqToPercentile(iqScore);
  const reportDate = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] lg:pl-[50px] pb-24 overflow-hidden flex flex-col">
      <SharedBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full pt-20 relative z-10 flex-1" ref={printRef}>

        {/* =====================================================
            PRINT BUTTON
            ===================================================== */}
        <div className="flex justify-end mb-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EAEFF0] rounded-full text-sm font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            রিপোর্ট প্রিন্ট করুন
          </button>
        </div>

        {/* =====================================================
            MAIN REPORT CARD (1 page)
            ===================================================== */}
        <div className="bg-white border border-[#EAEFF0] shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden">

          {/* ── Report Header ── */}
          <div className="bg-gradient-to-r from-[#1A3E9A] via-[#2563EB] to-[#27AE60] px-8 py-8 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-px bg-white/40"></div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                Intelligence Assessment Report
              </span>
              <div className="w-6 h-px bg-white/40"></div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif mb-1">
              {data.quizName?.bn || data.quizName?.en}
            </h1>
            <p className="text-white/70 text-sm">{reportDate}</p>
          </div>

          <div className="p-6 sm:p-10">

            {/* ── Candidate Info ── */}
            {(candidateInfo.name || candidateInfo.email) && (
              <div className="mb-8 p-5 bg-[#F8FAFF] border border-[#E8EEFF] rounded-xl">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">পরীক্ষার্থীর তথ্য</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {candidateInfo.name && (
                    <div>
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">নাম</span>
                      <p className="text-gray-800 font-bold mt-0.5">{candidateInfo.name}</p>
                    </div>
                  )}
                  {candidateInfo.email && (
                    <div>
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">ইমেইল</span>
                      <p className="text-gray-800 font-bold mt-0.5">{candidateInfo.email}</p>
                    </div>
                  )}
                  {candidateInfo.institution && (
                    <div className="sm:col-span-2">
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">শিক্ষা প্রতিষ্ঠান</span>
                      <p className="text-gray-800 font-bold mt-0.5">{candidateInfo.institution}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Score Row ── */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-5 bg-[#F8FAFF] border border-[#E8EEFF] rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">প্রাপ্ত স্কোর</p>
                <div className="text-4xl font-bold text-gray-900 font-mono">
                  {r.score}
                  <span className="text-gray-300 text-xl"> / {r.total}</span>
                </div>
              </div>

              <div className="text-center p-5 bg-[#F8FAFF] border border-[#E8EEFF] rounded-xl">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">সঠিকতা</p>
                <div className="text-4xl font-bold text-gray-900 font-mono">{r.percentage}%</div>
              </div>

              <div
                className="text-center p-5 rounded-xl border-2"
                style={{ backgroundColor: iqCategory.bgColor, borderColor: iqCategory.borderColor }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: iqCategory.color }}>
                  আনুমানিক IQ
                </p>
                <div className="text-4xl font-bold font-mono" style={{ color: iqCategory.color }}>
                  {iqScore}
                </div>
              </div>
            </div>

            {/* ── Score Progress Bar ── */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-400 font-semibold mb-2">
                <span>০</span>
                <span>স্কোর: {r.score} / {r.total}</span>
                <span>{r.total}</span>
              </div>
              <div className="h-4 bg-[#EAEFF0] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${r.percentage}%`,
                    background: `linear-gradient(to right, #2563EB, #27AE60)`,
                  }}
                />
              </div>
            </div>

            {/* ── IQ Category Card ── */}
            <div
              className="rounded-2xl border-2 p-6 mb-8"
              style={{ backgroundColor: iqCategory.bgColor, borderColor: iqCategory.borderColor }}
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl shrink-0">{iqCategory.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold" style={{ color: iqCategory.color }}>
                      {iqCategory.label}
                    </h3>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full border"
                      style={{
                        color: iqCategory.color,
                        borderColor: iqCategory.borderColor,
                        backgroundColor: "white",
                      }}
                    >
                      {iqCategory.labelEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-500">IQ পরিসর:</span>
                    <span className="font-bold text-sm" style={{ color: iqCategory.color }}>
                      {iqCategory.range}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Percentile:</span>
                    <span className="font-bold text-sm" style={{ color: iqCategory.color }}>
                      {percentile}তম
                    </span>
                  </div>

                  {/* IQ Scale Bar */}
                  <div className="mb-4">
                    <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, Math.max(0, ((iqScore - 40) / 120) * 100))}%`,
                          backgroundColor: iqCategory.color,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>IQ 40</span>
                      <span>IQ {iqScore}</span>
                      <span>IQ 160</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Interpretation ── */}
            <div className="rounded-2xl bg-[#F8FAFF] border border-[#E8EEFF] p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-700">ব্যাখ্যা ও পরামর্শ</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {iqCategory.description}
              </p>

              {/* IQ ranges reference */}
              <div className="mt-5 pt-5 border-t border-[#E8EEFF]">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">IQ পরিসর সারণি</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { range: "১৩০+", label: "অতি-উচ্চ প্রতিভাধর", color: "#7C3AED" },
                    { range: "১২০–১২৯", label: "উচ্চতর", color: "#2563EB" },
                    { range: "১১০–১১৯", label: "গড়ের উপরে", color: "#059669" },
                    { range: "৯০–১০৯", label: "গড়", color: "#D48A00" },
                    { range: "৮০–৮৯", label: "গড়ের নিচে", color: "#E05C5C" },
                    { range: "৮০-র নিচে", label: "উন্নয়ন প্রয়োজন", color: "#9CA3AF" },
                  ].map((item) => (
                    <div
                      key={item.range}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                        iqCategory.range === item.range
                          ? "bg-white border border-current font-bold"
                          : ""
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <div>
                        <span className="font-bold" style={{ color: item.color }}>{item.range}</span>
                        <span className="text-gray-500 ml-1">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Disclaimer ── */}
            <div className="text-center">
              <p className="text-xs text-gray-400 leading-relaxed">
                * এই IQ স্কোর শুধুমাত্র এই পরীক্ষার উপর ভিত্তি করে একটি আনুমানিক মান। 
                সম্পূর্ণ IQ নির্ধারণের জন্য একজন পেশাদার মনোবিজ্ঞানীর সাথে পরামর্শ করুন।
              </p>
            </div>

          </div>
        </div>
        {/* End Main Card */}

      </div>
    </div>
  );
}