import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAmBatteryResult } from "../api/amBatteryPublic";
import { AM_NARRATIVE_TEMPLATES } from "../ADMIN/AmBattery/Aminstrumentmeta";

const CLUSTER_LABELS: Record<string, string> = {
  capability: "Capability",
  disposition: "Disposition",
  judgment_integrity: "Judgment & Integrity",
};

const FIT_STATEMENT_EN: Record<string, string> = {
  "Well suited": "Well suited",
  "Suited, with coaching support": "Suited, with coaching support",
  "Likely to need substantial management coaching": "Likely to need substantial management coaching",
  "Recommend a structured interview before deciding": "Recommend a structured interview before deciding",
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
      .catch((err) => setError(err.message || "Report not found."))
      .finally(() => setLoading(false));
  }, [responseId]);

  // ==========================================
  // Premium Leaf Loading Spinner (Light Theme)
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-[#2C3338] font-bold tracking-[0.2em] uppercase text-sm">
          Generating report...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State (Light Theme)
  // ==========================================
  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] px-4">
        <div className="bg-white border border-[#EAEFF0] px-8 py-8 flex flex-col items-center gap-4 shadow-sm rounded-sm">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[#2C3338] font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // ==========================================
  // Global Shared Background (Light Theme)
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
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2]/90 to-[#FAF7F2]" />
    </>
  );

  // ==========================================
  // Payment Required State (Light Theme)
  // ==========================================
  if (data.paymentRequired) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] px-4">
        <SharedBackground />
        <div className="bg-white border border-[#EAEFF0] px-10 py-10 flex flex-col items-center text-center shadow-sm relative z-10 rounded-sm">
          <svg className="w-12 h-12 text-[#D4BCA6] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[#2C3338] font-serif text-xl tracking-wide mb-2">Payment is required to unlock this report.</p>
          <p className="text-[#596573] text-sm uppercase tracking-widest font-bold">Response ID: {data.responseId}</p>
        </div>
      </div>
    );
  }

  const r = data.result;
  const domains: Record<string, any> = r.domainResults || {};
  const clusters = ["capability", "disposition", "judgment_integrity"];

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] lg:pl-[50px] pb-24 flex flex-col">
      <SharedBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full pt-20 relative z-10">
        
        {/* =========================================
            HEADER & OVERVIEW CARD
            ========================================= */}
        <div className="bg-white border border-[#EAEFF0] p-8 sm:p-10 shadow-sm mb-8 rounded-sm">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-[#EAEFF0] pb-6">
            <h1 className="text-3xl font-bold text-black font-serif tracking-tight flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Selection Report
            </h1>
            <span className="text-xs font-bold tracking-[0.2em] bg-[#EAEFF0] border border-[#C8D0C0] text-[#596573] px-4 py-2 uppercase rounded-sm">
              PROVISIONAL — SAMPLE NORMING
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base">
            <div className="text-[#596573] uppercase tracking-widest text-xs font-bold">Candidate: <br/>
              <span className="text-black font-serif text-lg normal-case font-normal">{data.candidateInfo?.name || "—"}</span>
            </div>
            <div className="text-[#596573] uppercase tracking-widest text-xs font-bold">Position: <br/>
              <span className="text-black font-serif text-lg normal-case font-normal">{data.candidateInfo?.position || "—"}</span>
            </div>
            <div className="text-[#596573] uppercase tracking-widest text-xs font-bold">Organisation: <br/>
              <span className="text-black font-serif text-lg normal-case font-normal">{data.candidateInfo?.organisation || "—"}</span>
            </div>
            <div className="text-[#596573] uppercase tracking-widest text-xs font-bold">Form: <br/>
              <span className="text-black font-serif text-lg normal-case font-normal">{data.assignedForm}</span>
            </div>
          </div>

          {/* Alerts (Clean and minimal) */}
          {r.needsManualReview && (
            <div className="mt-8 bg-red-50 border border-red-200 text-red-700 p-5 text-sm leading-relaxed flex items-start gap-3 rounded-sm">
              <span className="text-lg font-bold">⚠</span>
              <span>Multiple validity checks failed — this report requires manual review before distribution to the hiring panel.</span>
            </div>
          )}

          {r.convergenceFlag === "inconsistent" && (
            <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 p-5 text-sm leading-relaxed flex items-start gap-3 rounded-sm">
              <span className="text-lg font-bold">⚠</span>
              <span>Convergence check: Inconsistencies detected between honesty and conscientiousness scores — a structured interview is highly recommended.</span>
            </div>
          )}

          {/* Fit Statement */}
          {r.fitStatement && (
            <div className="mt-8 bg-[#FAF7F2] border-l-4 border-[#5DBB4D] p-6">
              <p className="text-xs text-[#596573] mb-2 uppercase tracking-widest font-bold">Overall Suitability</p>
              <p className="text-xl font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-serif">
                {FIT_STATEMENT_EN[r.fitStatement] || r.fitStatement}
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
            <div key={cluster} className="bg-white border border-[#EAEFF0] p-8 mb-6 shadow-sm rounded-sm">
              <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-[#EAEFF0] pb-4">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                </svg>
                {CLUSTER_LABELS[cluster]}
              </h3>
              
              <div className="flex flex-col gap-8">
                {domainKeys.map((key) => {
                  const d = domains[key];
                  return (
                    <div key={key} className="border-b border-[#EAEFF0] pb-6 last:border-0 last:pb-0">
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                        <span className="font-serif font-bold text-lg text-black">{d.name_en || d.name_bn}</span>
                        {d.scored ? (
                          <span className="text-xs font-bold px-3 py-1.5 border border-[#C8D0C0] bg-[#FAF7F2] text-black tracking-widest uppercase rounded-sm">
                            {d.band?.label_en || d.band?.label_bn} · {d.percentile}
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-3 py-1.5 border border-[#EAEFF0] bg-white text-gray-400 tracking-widest uppercase rounded-sm">
                            {d.inconclusive ? "Inconclusive" : "Could not be scored"}
                          </span>
                        )}
                      </div>

                      {d.scored && (
                        <>
                          <div className="h-1.5 bg-[#EAEFF0] overflow-hidden mb-4 rounded-sm">
                            <div
                              className="h-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]"
                              style={{ width: `${d.percentile}%` }}
                            />
                          </div>
                          <p className="text-sm text-[#596573] leading-relaxed lato-regular">
                            {AM_NARRATIVE_TEMPLATES[key]?.[bandLevel(d.band.rank)]}
                          </p>
                        </>
                      )}
                      
                      {d.inconclusive && (
                        <p className="text-sm text-red-600 mt-2 bg-red-50 p-3 border border-red-200 rounded-sm">
                          {d.note_en || d.note_bn}
                        </p>
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
        <div className="bg-[#FAF7F2] border border-[#C8D0C0] p-6 text-sm text-[#596573] leading-relaxed tracking-wide rounded-sm">
          <strong className="text-black">Disclaimer:</strong> This report is based on self-reported, situational-judgment, and reasoning data. 
          It is a decision-support tool, not a sole determinant for hiring — and should be used alongside interviews and reference checks. 
          Percentile bands are provisional (norm sample validation pending).
        </div>

      </div>
    </div>
  );
}