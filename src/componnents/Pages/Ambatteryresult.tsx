import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAmBatteryResult } from "../api/amBatteryPublic";
import { AM_NARRATIVE_TEMPLATES } from "../ADMIN/AmBattery/Aminstrumentmeta";

const CLUSTER_LABELS: Record<string, string> = {
  capability: "সক্ষমতা (Capability)",
  disposition: "স্বভাব (Disposition)",
  judgment_integrity: "বিচার ও সততা (Judgment & Integrity)",
};

const FIT_STATEMENT_BN: Record<string, string> = {
  "Well suited": "উপযুক্ত (Well suited)",
  "Suited, with coaching support": "উপযুক্ত, তবে কোচিং সহায়তাসহ",
  "Likely to need substantial management coaching": "উল্লেখযোগ্য ব্যবস্থাপনাগত কোচিং প্রয়োজন হতে পারে",
  "Recommend a structured interview before deciding": "সিদ্ধান্তের আগে একটি কাঠামোবদ্ধ সাক্ষাৎকার সুপারিশ করা হচ্ছে",
};

function bandLevel(rank: number): "low" | "mid" | "high" {
  if (rank <= 2) return "low";
  if (rank === 3) return "mid";
  return "high";
}

export default function AmBatteryResult() {
  const { responseId } = useParams<{ responseId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!responseId) return;
    fetchAmBatteryResult(responseId)
      .then(setData)
      .catch((err) => setError(err.message || "রিপোর্ট পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [responseId]);

  // ==========================================
  // Premium Leaf Loading Spinner
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold tracking-[0.2em] uppercase text-sm">
          রিপোর্ট তৈরি হচ্ছে...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State
  // ==========================================
  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px] px-4">
        <div className="bg-[#132644] border border-red-500/50 px-8 py-8 flex flex-col items-center gap-4 shadow-2xl">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-white/80 font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // ==========================================
  // Global Shared Background
  // ==========================================
  const SharedBackground = () => (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1930]/80 to-[#0A1930]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </>
  );

  // ==========================================
  // Payment Required State
  // ==========================================
  if (data.paymentRequired) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px] px-4">
        <SharedBackground />
        <div className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/50 px-10 py-10 flex flex-col items-center text-center shadow-2xl relative z-10">
          <svg className="w-12 h-12 text-[#ffba12] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-white font-serif text-xl tracking-wide mb-2">এই রিপোর্টটি আনলক করতে পেমেন্ট প্রয়োজন।</p>
          <p className="text-[#3c5685] text-sm uppercase tracking-widest font-bold">Response ID: {data.responseId}</p>
        </div>
      </div>
    );
  }

  const r = data.result;
  const domains: Record<string, any> = r.domainResults || {};
  const clusters = ["capability", "disposition", "judgment_integrity"];

  return (
    <div className="relative min-h-screen bg-[#0A1930] lg:pl-[50px] pb-24 flex flex-col">
      <SharedBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full pt-20 relative z-10">
        
        {/* =========================================
            HEADER & OVERVIEW CARD
            ========================================= */}
        <div className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/40 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-[#3c5685]/40 pb-6">
            <h1 className="text-3xl font-bold text-white font-serif tracking-tight flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Selection Report
            </h1>
            <span className="text-xs font-bold tracking-[0.2em] bg-gradient-to-r from-[#1A6BBA]/20 to-[#5DBB4D]/20 border border-[#5DBB4D]/50 text-[#5DBB4D] px-4 py-2 uppercase">
              PROVISIONAL — SAMPLE NORMING
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base">
            <div className="text-white/60 uppercase tracking-widest text-xs font-bold">প্রার্থী: <br/>
              <span className="text-white font-serif text-lg normal-case font-normal">{data.candidateInfo?.name || "—"}</span>
            </div>
            <div className="text-white/60 uppercase tracking-widest text-xs font-bold">পদ: <br/>
              <span className="text-white font-serif text-lg normal-case font-normal">{data.candidateInfo?.position || "—"}</span>
            </div>
            <div className="text-white/60 uppercase tracking-widest text-xs font-bold">প্রতিষ্ঠান: <br/>
              <span className="text-white font-serif text-lg normal-case font-normal">{data.candidateInfo?.organisation || "—"}</span>
            </div>
            <div className="text-white/60 uppercase tracking-widest text-xs font-bold">Form: <br/>
              <span className="text-white font-serif text-lg normal-case font-normal">{data.assignedForm}</span>
            </div>
          </div>

          {/* Alerts (Square & Premium) */}
          {r.needsManualReview && (
            <div className="mt-8 bg-red-500/10 border border-red-500/50 text-red-400 p-5 text-sm leading-relaxed flex items-start gap-3">
              <span className="text-lg font-bold">⚠</span>
              <span>একাধিক ভ্যালিডিটি চেক ব্যর্থ হয়েছে — এই রিপোর্টটি hiring panel-এ পাঠানোর আগে ম্যানুয়াল রিভিউ প্রয়োজন।</span>
            </div>
          )}

          {r.convergenceFlag === "inconsistent" && (
            <div className="mt-4 bg-[#ffba12]/10 border border-[#ffba12]/50 text-[#ffba12] p-5 text-sm leading-relaxed flex items-start gap-3">
              <span className="text-lg font-bold">⚠</span>
              <span>Convergence check: honesty ও conscientiousness স্কোরে অসামঞ্জস্য পাওয়া গেছে — একটি কাঠামোবদ্ধ সাক্ষাৎকার সুপারিশ করা হচ্ছে।</span>
            </div>
          )}

          {/* Fit Statement */}
          {r.fitStatement && (
            <div className="mt-8 bg-[#0A1930]/60 border-l-4 border-[#5DBB4D] p-6">
              <p className="text-xs text-white/50 mb-2 uppercase tracking-widest font-bold">সার্বিক উপযুক্ততা</p>
              <p className="text-xl font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-serif">
                {FIT_STATEMENT_BN[r.fitStatement] || r.fitStatement}
              </p>
            </div>
          )}
        </div>

        {/* =========================================
            CLUSTER CARDS
            ========================================= */}
        {clusters.map((cluster) => {
          const domainKeys = Object.keys(domains).filter((k) => domains[k].cluster === cluster);
          if (domainKeys.length === 0) return null;
          
          return (
            <div key={cluster} className="bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/30 p-8 mb-6 shadow-lg">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-[#3c5685]/40 pb-4">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                </svg>
                {CLUSTER_LABELS[cluster]}
              </h3>
              
              <div className="flex flex-col gap-8">
                {domainKeys.map((key) => {
                  const d = domains[key];
                  return (
                    <div key={key} className="border-b border-[#3c5685]/30 pb-6 last:border-0 last:pb-0">
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                        <span className="font-serif font-bold text-lg text-white/90">{d.name_bn}</span>
                        {d.scored ? (
                          <span className="text-xs font-bold px-3 py-1.5 border border-[#5DBB4D]/40 bg-[#5DBB4D]/10 text-[#5DBB4D] tracking-widest uppercase">
                            {d.band?.label_bn} · {d.percentile}
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-3 py-1.5 border border-[#3c5685]/60 bg-[#0A1930] text-white/50 tracking-widest uppercase">
                            {d.inconclusive ? "Inconclusive" : "স্কোর করা যায়নি"}
                          </span>
                        )}
                      </div>

                      {d.scored && (
                        <>
                          <div className="h-1.5 bg-[#0A1930] border border-[#3c5685]/40 overflow-hidden mb-4">
                            <div
                              className="h-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]"
                              style={{ width: `${d.percentile}%` }}
                            />
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed lato-regular">
                            {AM_NARRATIVE_TEMPLATES[key]?.[bandLevel(d.band.rank)]}
                          </p>
                        </>
                      )}
                      
                      {d.inconclusive && (
                        <p className="text-sm text-red-400 mt-2 bg-red-500/10 p-3 border border-red-500/20">{d.note_bn}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* =========================================
            DISCLAIMER / FOOTER NOTE
            ========================================= */}
        <div className="bg-[#1A6BBA]/10 border border-[#1A6BBA]/30 p-6 text-sm text-white/60 leading-relaxed tracking-wide">
          <strong className="text-white/80">দাবিত্যাগ:</strong> এই রিপোর্টটি self-report, situational-judgment, ও reasoning ডাটার ওপর ভিত্তি করে তৈরি।
          এটি একটি decision-support টুল, একক hiring সিদ্ধান্ত নয় — interview ও reference check এর
          পাশাপাশি ব্যবহার করা উচিত। Percentile band গুলো এখনো provisional (norm sample যাচাই করা হয়নি)।
        </div>

      </div>
    </div>
  );
}