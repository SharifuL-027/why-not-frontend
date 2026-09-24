import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResult } from "../api/instruments";

const bandColor: Record<string, string> = {
  strong: "bg-[#1A6BBA]/10 text-[#5DBB4D] border border-[#1A6BBA]/40",
  good: "bg-[#0A1930] text-[#1A6BBA] border border-[#3c5685]/60",
  explore: "bg-transparent text-white/60 border border-white/20",
};

function cfiBandClass(label_en: string) {
  if (label_en === "Strong fit") return bandColor.strong;
  if (label_en === "Good fit") return bandColor.good;
  return bandColor.explore;
}

const rankColor: Record<number, string> = {
  0: "bg-[#1A6BBA]/10 text-[#5DBB4D] border border-[#1A6BBA]/40",
  1: "bg-[#0A1930] text-[#1A6BBA] border border-[#3c5685]/60",
  2: "bg-transparent text-white/70 border border-white/30",
  3: "bg-[#ffba12]/10 text-[#ffba12] border border-[#ffba12]/30",
  4: "bg-red-500/10 text-red-400 border border-red-500/30",
};

// ==========================================
// Global Shared Background for all reports
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
    <div className="absolute inset-0 z-0 bg-[#0A1930]/90" />
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
  </>
);

export default function Result() {
  const { responseId } = useParams<{ responseId: string }>();
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!responseId) return;
    fetchResult(responseId)
      .then((res) => setResult(res.result))
      .catch((err) => {
        if (err?.response?.status === 402) {
          setError("এই রিপোর্ট দেখতে হলে পেমেন্ট সম্পন্ন করতে হবে।");
        } else {
          setError("রিপোর্ট পাওয়া যায়নি।");
        }
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px] overflow-hidden">
        <SharedBackground />
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite] z-10">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold tracking-[0.2em] uppercase text-sm z-10">
          রিপোর্ট তৈরি হচ্ছে...
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px] overflow-hidden px-4">
        <SharedBackground />
        <div className="bg-[#132644]/90 backdrop-blur-md border border-red-500/50 px-8 py-8 flex flex-col items-center gap-4 shadow-2xl relative z-10 text-center">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-white/80 font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0A1930] lg:pl-[50px] pt-24 pb-20 overflow-hidden flex flex-col">
      <SharedBackground />
      <div className="w-full relative z-10 flex-1">
        {result.scoringType === "vector_matching" && <CfiReport r={result} />}
        {result.scoringType === "sum_and_band" && <FadssReport r={result} />}
        {result.scoringType === "domain_pomp_composite" && <PcsReport r={result} />}
        {result.scoringType === "domain_mean_average" && <RrsReport r={result} />}
        {result.scoringType === "mcrrs_triage" && <McrrsReport r={result} />}
        
        {!["vector_matching", "sum_and_band", "domain_pomp_composite", "domain_mean_average", "mcrrs_triage"].includes(result.scoringType) && (
          <div className="p-16 text-center text-white/50">অজানা রিপোর্ট ধরন।</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Section Wrapper Component (Square Style)
// ==========================================
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/40 p-6 sm:p-8 mt-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      <div className="text-xs font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-[#3c5685]/40 pb-4">
        <svg className="w-4 h-4 shrink-0 text-[#1A6BBA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
        </svg>
        {title}
      </div>
      <div className="text-white/80 text-sm">{children}</div>
    </div>
  );
}

/* ================= CFI-BD REPORT ================= */
function CfiReport({ r }: { r: Record<string, any> }) {
  const codeBn = r.hollandCode.map((t: string) => r.typeLabels_bn[t]).join(" · ");

  return (
    <div className="pb-16 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-[#0A1930]/80 backdrop-blur-md border border-[#3c5685]/50 text-white text-center px-6 py-12 mb-8 shadow-xl">
        <div className="text-xs uppercase tracking-[0.2em] text-[#5DBB4D] font-bold mb-4">
          আপনার প্রোফাইল
        </div>
        <h1 className="text-3xl font-bold mb-6 font-serif tracking-wide">{codeBn}</h1>
        <div className="flex justify-center gap-2">
          {r.hollandCode.map((t: string) => (
            <span
              key={t}
              className="w-10 h-10 border border-[#1A6BBA]/60 bg-[#1A6BBA]/10 flex items-center justify-center font-mono font-bold text-lg text-white"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="text-xs text-white/50 mt-6 tracking-widest uppercase">
          Track {r.track} <span className="mx-2 text-[#3c5685]">|</span> 
          Clarity {r.clarity.toFixed(1)} ({r.clarityVerdict}) <span className="mx-2 text-[#3c5685]">|</span> 
          Coherence {r.coherence}/3
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {r.clarityVerdict === "FLAT" ? (
          <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 p-6 mt-6">
            <p className="text-sm text-[#ffba12] leading-relaxed">
              আপনার আগ্রহের ধরন এখনো যথেষ্ট স্পষ্ট না — তাই নির্দিষ্ট পেশার তালিকা দেখানো হচ্ছে
              না। আরও কিছু বিষয় explore করে আবার চেষ্টা করার পরামর্শ দেওয়া হচ্ছে।
            </p>
          </div>
        ) : (
          <>
            <Section title="আগ্রহ ও আত্মবিশ্বাস">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-white/40 uppercase tracking-widest border-b border-[#3c5685]/40">
                    <th className="text-left pb-3 font-medium">টাইপ</th>
                    <th className="text-right pb-3 font-medium">আগ্রহ</th>
                    <th className="text-right pb-3 font-medium">আত্মবিশ্বাস</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(r.typeLabels_bn).map((t) => (
                    <tr key={t} className="border-b border-[#3c5685]/20 hover:bg-[#0A1930]/40 transition-colors">
                      <td className="py-4 text-white/90">{r.typeLabels_bn[t]}</td>
                      <td className="py-4 text-right font-mono text-[#5DBB4D]">{r.interest[t].toFixed(1)}</td>
                      <td className="py-4 text-right font-mono text-[#1A6BBA]">{r.confidence[t].toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title="কর্মমূল্যবোধ">
              <table className="w-full text-sm">
                <tbody>
                  {Object.keys(r.valueLabels_bn).map((v) => (
                    <tr key={v} className="border-b border-[#3c5685]/20 hover:bg-[#0A1930]/40 transition-colors">
                      <td className="py-4 text-white/90">{r.valueLabels_bn[v]}</td>
                      <td className="py-4 text-right font-mono text-[#5DBB4D]">{r.values[v].toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title={`মিলে যাওয়া পেশা (${r.matches.length}টি)`}>
              <div className="flex flex-col gap-3">
                {r.matches.map((m: any, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-[#0A1930]/50 border border-[#3c5685]/40 px-5 py-4">
                    <div>
                      <div className="font-semibold text-base text-white/90 mb-1">{m.name_bn}</div>
                      <div className="text-xs text-white/40 tracking-widest uppercase">{m.cluster}</div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div className="font-mono font-bold text-[#5DBB4D] text-lg">
                        {m.match.toFixed(1)}
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest ${cfiBandClass(m.band.label_en)}`}>
                        {m.band.label_bn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Other Sections (Training, Skills, Overseas, Gaps) are styled similarly with Square layouts */}
            {r.training.length > 0 && (
              <Section title="প্রশিক্ষণ">
                {r.training.map((t: any, i: number) => (
                  <div key={i} className="mb-6 last:mb-0">
                    <h4 className="text-sm font-bold text-[#1A6BBA] mb-3 uppercase tracking-widest">{t.cluster}</h4>
                    {t.entries.map((e: any, j: number) => (
                      <div key={j} className="text-sm text-white/70 mb-2 border-l-2 border-[#5DBB4D] pl-3 py-1">
                        <b className="text-white/90">{e.bn}</b> — {e.provider} <span className="text-white/40">({e.kind}, {e.dur})</span>
                      </div>
                    ))}
                  </div>
                ))}
              </Section>
            )}

            {r.crossCuttingSkills.length > 0 && (
              <Section title="অতিরিক্ত দক্ষতা সাজেশন">
                {r.crossCuttingSkills.map((s: any, i: number) => (
                  <div key={i} className="bg-[#1A6BBA]/10 border border-[#1A6BBA]/30 px-5 py-4 mb-3">
                    <b className="text-sm text-[#5DBB4D] block mb-1">{s.name_bn}</b>
                    <span className="text-xs text-white/50 uppercase tracking-widest">{s.provider}</span>
                    <div className="text-sm text-white/70 mt-2 leading-relaxed">{s.why}</div>
                  </div>
                ))}
              </Section>
            )}

            {r.overseas && (
              <Section title="বিদেশে সুযোগ">
                {r.overseas.sections.map((sec: any, i: number) => (
                  <div key={i} className="mb-6">
                    <h4 className="text-sm font-bold text-[#1A6BBA] mb-3 uppercase tracking-widest">{sec.cluster}</h4>
                    {sec.routes.map((route: any, j: number) => (
                      <div key={j} className="border border-[#3c5685]/40 bg-[#0A1930]/30 p-4 mb-3">
                        <div className="text-base font-bold text-white/90 mb-1">{route.t}</div>
                        <div className="text-xs text-white/40 tracking-widest uppercase mb-2">{route.auth}</div>
                        <div className="text-sm text-white/70 leading-relaxed">{route.scope}</div>
                      </div>
                    ))}
                  </div>
                ))}

                {r.overseas.weakEnglish && (
                  <p className="text-sm text-[#ffba12] mb-4 bg-[#ffba12]/10 p-4 border border-[#ffba12]/30">
                    প্রায় প্রতিটি বিদেশি রুট ভাষা দিয়ে গেটেড — ইংরেজি আগে, টেকনিক্যাল প্রশিক্ষণ পরে।
                  </p>
                )}

                {r.overseas.showScholarships && (
                  <>
                    <h4 className="text-sm font-bold text-[#5DBB4D] mb-3 mt-6 uppercase tracking-widest">স্কলারশিপ</h4>
                    {r.overseas.scholarships.map((s: any, i: number) => (
                      <div key={i} className="border border-[#3c5685]/40 bg-[#0A1930]/30 p-4 mb-3">
                        <div className="text-base font-bold text-white/90 mb-1">{s.name}</div>
                        <div className="text-xs text-white/40 tracking-widest uppercase mb-2">{s.where}</div>
                        <div className="text-sm text-white/70 leading-relaxed">{s.note}</div>
                      </div>
                    ))}
                  </>
                )}

                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 text-sm leading-relaxed mt-4">
                  ⚠ {r.overseas.fraudWarning_bn}
                </div>
              </Section>
            )}

            {r.gaps.length > 0 && (
              <Section title="Interest-Confidence গ্যাপ">
                {r.gaps.map((g: any, i: number) => (
                  <div key={i} className="bg-[#0A1930]/50 border-l-2 border-[#1A6BBA] p-4 text-sm text-white/70 mb-3">
                    {g.message_bn}
                  </div>
                ))}
              </Section>
            )}
          </>
        )}

        <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 text-[#ffba12] p-5 text-sm leading-relaxed mt-8">
          ⚠ এই প্রতিবেদন চূড়ান্ত রায় নয়, আলোচনার সূচনা মাত্র। CFI-BD-এর এখনও কোনো বাংলাদেশি নর্ম নেই।
        </div>
      </div>
    </div>
  );
}

/* ================= FADSS REPORT ================= */
function FadssReport({ r }: { r: Record<string, any> }) {
  const constructKeys = Object.keys(r.constructResults);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mt-8 mb-8 text-center bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/40 p-8 shadow-xl">
        <div
          className={`inline-block px-6 py-2 border text-sm font-bold tracking-widest uppercase mb-4 ${rankColor[r.overallState.rank]}`}
        >
          {r.overallState.label_bn}
        </div>
        <p className="text-base text-white/80 leading-relaxed">{r.overallState.message_bn}</p>
        {r.dominant?.length > 0 && (
          <p className="text-xs text-[#1A6BBA] mt-4 uppercase tracking-widest font-bold">
            সবচেয়ে বেশি প্রভাবিত: <span className="text-white/70 font-normal">{r.dominant.join(", ")}</span>
          </p>
        )}
      </div>

      {(r.referral || r.crisisNote) && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-6 text-sm leading-relaxed mb-6">
          {r.referral && <p className="mb-2">⚠ {r.referral}</p>}
          {r.crisisNote && <p>{r.crisisNote}</p>}
        </div>
      )}

      <Section title="চারটি ক্ষেত্রের তুলনা">
        <div className="flex flex-col gap-5">
          {constructKeys.map((c) => {
            const cr = r.constructResults[c];
            const pct = cr.score !== null ? (cr.score / cr.maxScore) * 100 : 0;
            return (
              <div key={c} className="bg-[#0A1930]/50 p-4 border border-[#3c5685]/30">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-semibold text-white/90">{cr.name_bn}</span>
                  <span className="font-mono text-[#5DBB4D] font-bold">
                    {cr.score ?? "—"} <span className="text-white/30">/ {cr.maxScore}</span>
                  </span>
                </div>
                <div className="h-1.5 bg-[#132644] overflow-hidden mb-3">
                  <div className="h-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]" style={{ width: `${pct}%` }} />
                </div>
                {cr.band && (
                  <span className={`inline-block text-[10px] font-bold px-3 py-1 uppercase tracking-widest ${rankColor[cr.band.rank]}`}>
                    {cr.band.label_bn}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="বিস্তারিত ব্যাখ্যা ও করণীয়">
        {constructKeys.map((c) => {
          const cr = r.constructResults[c];
          if (!cr.interpretation) return null;
          return (
            <div key={c} className="mb-8 border-b border-[#3c5685]/30 pb-6 last:border-0 last:pb-0">
              <h4 className="text-base font-bold text-[#5DBB4D] mb-3 font-serif">
                {cr.name_bn} <span className="text-[#3c5685] mx-2">|</span> <span className="text-white/60 text-sm font-sans uppercase tracking-widest">{cr.band.label_bn}</span>
              </h4>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                {cr.interpretation.bn}
              </p>
              <ul className="list-none space-y-2">
                {cr.interpretation.actions_bn.map((a: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-white/60">
                    <span className="text-[#1A6BBA]">■</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Section>

      {r.helplines?.length > 0 && (
        <Section title="পরামর্শ ও সহায়তার জন্য যোগাযোগ">
          {r.helplines.map((h: any, i: number) => (
            <div key={i} className="flex justify-between text-sm py-4 border-b border-[#3c5685]/30 last:border-0">
              <span className="text-white/80 font-medium">{h.name_bn}</span>
              <span className="font-mono text-[#5DBB4D] font-bold">{h.number}</span>
            </div>
          ))}
        </Section>
      )}

      <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 text-[#ffba12] p-5 text-sm leading-relaxed mt-8">
        ⚠ এই প্রতিবেদনটি FADSS স্ক্রিনিং টুলের ভিত্তিতে তৈরি একটি প্রাথমিক ধারণা মাত্র — এটি কোনো চূড়ান্ত রোগ নির্ণয় নয়। কাট-অফগুলো এখনো provisional।
      </div>
    </div>
  );
}

/* ================= PCS-BD REPORT ================= */
function PcsReport({ r }: { r: Record<string, any> }) {
  const domainKeys = Object.keys(r.domainResults);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mt-8 mb-8 text-center bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/40 p-8 shadow-xl">
        {r.composite !== null ? (
          <>
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-mono mb-4">{r.composite}</div>
            <div
              className={`inline-block px-5 py-2 border text-sm font-bold tracking-widest uppercase ${
                rankColor[Math.min(4, Math.floor((100 - r.compositeBand?.min) / 15))] || "bg-transparent text-white/50 border-white/20"
              }`}
            >
              {r.compositeBand?.label_bn}
            </div>
          </>
        ) : (
          <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 text-[#ffba12] p-5 text-sm">
            পর্যাপ্ত ডোমেইন স্কোর করা যায়নি — সার্বিক স্কোর দেখানো যাচ্ছে না।
          </div>
        )}

        {r.imNote && (
          <div className={`mt-6 text-sm p-4 border text-left leading-relaxed ${r.imNote.prominent ? "bg-red-500/10 text-red-400 border-red-500/40" : "bg-[#0A1930]/50 text-white/60 border-[#3c5685]/40"}`}>
            {r.imNote.note_bn}
          </div>
        )}
      </div>

      {r.flagsFired?.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-5 text-sm leading-relaxed mb-6">
          <b className="block mb-1">⚠ নজর দেওয়ার মতো বিষয়:</b> {r.flagsFired.join(", ")} — এই আইটেমগুলোর উত্তর অনুযায়ী বিশেষ মনোযোগ প্রয়োজন হতে পারে।
        </div>
      )}

      <Section title="সাতটি ক্ষেত্রে আপনার প্রোফাইল">
        <div className="flex flex-col gap-4">
          {domainKeys.map((d) => {
            const dr = r.domainResults[d];
            if (!dr.scored) {
              return (
                <div key={d} className="text-sm text-white/40 bg-[#0A1930]/30 p-4 border border-[#3c5685]/20">
                  {dr.name_bn} — স্কোর করা যায়নি (পর্যাপ্ত উত্তর নেই)
                </div>
              );
            }
            return (
              <div key={d} className="bg-[#0A1930]/50 p-4 border border-[#3c5685]/30">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-semibold text-white/90">{dr.name_bn}</span>
                  <span className="font-mono text-[#5DBB4D] font-bold">{dr.index}</span>
                </div>
                <div className="h-1.5 bg-[#132644] overflow-hidden mb-3">
                  <div className="h-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]" style={{ width: `${dr.index}%` }} />
                </div>
                <span className="inline-block text-[10px] font-bold px-3 py-1 uppercase tracking-widest bg-white/5 border border-white/10 text-white/60">
                  {dr.band?.label_bn}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 text-[#ffba12] p-5 text-sm leading-relaxed mt-8">
        ⚠ এটি নিজের অভিভাবকত্ব নিয়ে ভাবার একটি প্রতিফলন-সরঞ্জাম মাত্র — এটি কোনো রোগ নির্ণয়, আইনি বা অভিভাবকত্ব-সংক্রান্ত মূল্যায়ন নয়। এই ব্যান্ড/কাট-অফগুলো এখনো provisional।
        <br /><br />
        <span className="text-[#5DBB4D]">■</span> প্রতিটা ক্ষেত্রের বিস্তারিত ব্যাখ্যা, ৩০-দিনের প্ল্যান এবং সহায়তা তথ্য এখনো যোগ করা হয়নি।
      </div>
    </div>
  );
}

/* ================= RRS-24 REPORT ================= */
function RrsReport({ r }: { r: Record<string, any> }) {
  if (r.incomplete) {
    return (
      <div className="p-16 text-center text-[#ffba12] bg-[#132644]/90 border border-[#ffba12]/30 max-w-2xl mx-auto mt-10">
        {r.message_bn}
      </div>
    );
  }

  const domainKeys = Object.keys(r.domainResults);
  const rankByBandCode: Record<string, string> = {
    very_low: "bg-red-500/10 text-red-400 border border-red-500/30",
    low: "bg-[#ffba12]/10 text-[#ffba12] border border-[#ffba12]/30",
    average: "bg-[#0A1930] text-[#1A6BBA] border border-[#3c5685]/60",
    high: "bg-[#1A6BBA]/10 text-[#5DBB4D] border border-[#1A6BBA]/40",
    very_high: "bg-[#5DBB4D]/10 text-[#5DBB4D] border border-[#5DBB4D]/40 font-extrabold",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mt-8 mb-8 text-center bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/40 p-10 shadow-xl">
        <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-mono">
          {r.total.scoreDisplay}
        </div>
        <div className="text-sm text-white/30 tracking-widest font-mono mt-2 mb-4 uppercase">/ 5.00</div>
        <div className={`inline-block px-6 py-2 border text-sm font-bold tracking-widest uppercase ${rankByBandCode[r.total.band.code]}`}>
          {r.total.band.label_bn}
        </div>
      </div>

      <Section title="তিনটি ক্ষেত্র">
        <div className="flex flex-col gap-5">
          {domainKeys.map((d) => {
            const dr = r.domainResults[d];
            return (
              <div key={d} className="bg-[#0A1930]/50 p-5 border border-[#3c5685]/30">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 border-b border-[#3c5685]/30 pb-3">
                  <span className="font-serif text-lg font-bold text-white">{dr.name_bn}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-[#5DBB4D] text-lg">{dr.scoreDisplay}</span>
                    <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest border ${rankByBandCode[dr.band.code]}`}>
                      {dr.band.label_bn}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{dr.measures_bn}</p>
                <div className="h-1.5 bg-[#132644] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]" style={{ width: `${(dr.score / 5) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="আপনার ক্ষেত্রগুলোর তুলনা">
        <p className="text-sm text-white/80 leading-relaxed mb-6">{r.gap.reading_bn}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#1A6BBA]/10 border border-[#1A6BBA]/30 p-4">
            <span className="text-xs uppercase tracking-widest text-white/40 block mb-1">সর্বোচ্চ</span>
            <span className="text-base font-bold text-[#5DBB4D]">{r.domainResults[r.highestDomain].name_bn}</span>
          </div>
          <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 p-4">
            <span className="text-xs uppercase tracking-widest text-white/40 block mb-1">সর্বনিম্ন</span>
            <span className="text-base font-bold text-[#ffba12]">{r.domainResults[r.lowestDomain].name_bn}</span>
          </div>
        </div>
        <div className="mt-4 text-center p-3 border border-[#3c5685]/40 text-sm font-mono text-white/60">
          পার্থক্য: <span className="text-white font-bold">{r.gap.display}</span>
        </div>
      </Section>

      <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 text-[#ffba12] p-5 text-sm leading-relaxed mt-8">
        ⚠ এই প্রতিবেদনটি আত্ম-প্রতিফলনের জন্য তৈরি। এটি কোনো ক্লিনিক্যাল নির্ণয় বা আনুষ্ঠানিক মূল্যায়ন নয়, এবং চাকরি বা নির্বাচন-সংক্রান্ত সিদ্ধান্তের ভিত্তি হিসেবে ব্যবহার করা উচিত নয়।
        <br /><br />
        <span className="text-[#5DBB4D]">■</span> প্রতিটা ব্যান্ডের জন্য বিস্তারিত ব্যাখ্যা ও পরামর্শ এখনো যোগ করা হয়নি।
      </div>
    </div>
  );
}

/* ================= MCRRS-BD REPORT ================= */
function McrrsReport({ r }: { r: Record<string, any> }) {
  const bandColorMap: Record<string, string> = {
    red: "bg-red-500/10 text-red-400 border border-red-500/30",
    orange: "bg-[#ffba12]/10 text-[#ffba12] border border-[#ffba12]/30",
    amber: "bg-[#1A6BBA]/10 text-[#1A6BBA] border border-[#1A6BBA]/30",
    lightgreen: "bg-[#1A6BBA]/10 text-[#5DBB4D] border border-[#1A6BBA]/40",
    green: "bg-[#5DBB4D]/10 text-[#5DBB4D] border border-[#5DBB4D]/40 font-extrabold",
  };

  if (r.careFlag) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 pt-10">
        <div className="bg-red-500/10 border border-red-500/50 p-6 sm:p-8 shadow-xl mb-6">
          <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
            <span className="text-2xl">⚠</span> নিরাপত্তা আগে
          </h2>
          <p className="text-base text-red-200/80 leading-relaxed">{r.tier4Message_bn}</p>
        </div>

        <Section title="সহায়তার জন্য যোগাযোগ">
          {r.referralResources.map((res: any, i: number) => (
            <div key={i} className="flex justify-between items-center text-sm py-4 border-b border-[#3c5685]/30 last:border-0">
              <div>
                <div className="text-white/90 font-bold mb-1">{res.need_bn}</div>
                <div className="text-[#1A6BBA] text-xs uppercase tracking-widest">{res.service}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-[#5DBB4D] text-lg">{res.number}</div>
                <div className="text-white/40 text-xs tracking-widest mt-1">{res.hours_bn}</div>
              </div>
            </div>
          ))}
        </Section>

        <div className="text-sm text-white/50 mt-10 text-center border-t border-[#3c5685]/30 pt-6">
          স্কোর নিচে দেখানো হলো, কোনো celebratory ভাষা ছাড়া।
        </div>
        {r.total && (
          <div className="text-center mt-6 bg-[#132644]/50 p-6 border border-[#3c5685]/30">
            <span className="font-mono text-4xl font-bold text-white/80">{r.total.index}</span>
            <span className="text-sm text-white/30 font-mono tracking-widest block mt-2">/ 100</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mt-8 mb-8 text-center bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/40 p-10 shadow-xl">
        {r.total ? (
          <>
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-mono mb-6">
              {r.total.index}
            </div>
            <div className={`inline-block px-6 py-2 border text-sm font-bold tracking-widest uppercase ${bandColorMap[r.total.band.color]}`}>
              {r.total.band.label_bn}
            </div>
            {r.total.note && <p className="text-sm text-[#ffba12] mt-4 p-3 bg-[#ffba12]/10 border border-[#ffba12]/20">{r.total.note}</p>}
          </>
        ) : (
          <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 text-[#ffba12] p-5 text-sm">
            পর্যাপ্ত ক্ষেত্র স্কোর করা যায়নি — সার্বিক ইনডেক্স দেখানো যাচ্ছে না।
          </div>
        )}
      </div>

      {r.pri && (
        <Section title="সামাজিক চাপ সহনশীলতা সূচক (Provisional)">
          <div className="text-center py-4">
            <div className="text-4xl font-bold font-mono text-white mb-4">{r.pri.index}</div>
            <span className={`inline-block text-xs font-bold px-4 py-1.5 border uppercase tracking-widest ${bandColorMap[r.pri.band.color]}`}>
              {r.pri.band.label_bn}
            </span>
            <p className="text-sm text-white/50 mt-6 leading-relaxed bg-[#0A1930]/50 p-4 border border-[#3c5685]/20">
              বাইরে থেকে আসা চাপ আজকের অবস্থায় কতটা ভালোভাবে সামলানো যাচ্ছে — এটা কোনো ভবিষ্যদ্বাণী না।
            </p>
          </div>
        </Section>
      )}

      <Section title="ছয়টি ক্ষেত্রে আপনার প্রোফাইল">
        <div className="flex flex-col gap-4">
          {Object.keys(r.domainResults).map((d) => {
            const dr = r.domainResults[d];
            if (!dr.scored) {
              return (
                <div key={d} className="text-sm text-white/40 bg-[#0A1930]/30 p-4 border border-[#3c5685]/20">
                  {dr.name_bn} — পর্যাপ্ত উত্তর নেই
                </div>
              );
            }
            return (
              <div key={d} className="bg-[#0A1930]/50 p-5 border border-[#3c5685]/30">
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="font-serif font-bold text-lg text-white/90">{dr.name_bn}</span>
                  <span className="font-mono text-[#5DBB4D] font-bold text-lg">{dr.index}</span>
                </div>
                <div className="h-1.5 bg-[#132644] overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D]" style={{ width: `${dr.index}%` }} />
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-block text-[10px] font-bold px-3 py-1 uppercase tracking-widest border ${bandColorMap[dr.band.color]}`}>
                    {dr.band.label_bn}
                  </span>
                  {dr.prorated && <span className="text-[10px] text-white/40 uppercase tracking-widest">(আংশিক উত্তর থেকে)</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="কোথায় মনোযোগ দিলে সবচেয়ে বেশি লাভ">
        {r.focusAreas.map((d: string) => (
          <div key={d} className="mb-4 last:mb-0 bg-[#1A6BBA]/10 border-l-2 border-[#5DBB4D] p-4">
            <div className="text-base font-bold text-white/90 font-serif mb-2">{r.domainResults[d].name_bn}</div>
            <p className="text-sm text-white/60 leading-relaxed">{r.domainModalityMap[d]}</p>
          </div>
        ))}
      </Section>

      <Section title="সহায়তার জন্য যোগাযোগ">
        {r.referralResources.map((res: any, i: number) => (
          <div key={i} className="flex justify-between items-center text-sm py-4 border-b border-[#3c5685]/30 last:border-0">
            <div>
              <div className="text-white/90 font-bold mb-1">{res.need_bn}</div>
              <div className="text-[#1A6BBA] text-xs uppercase tracking-widest">{res.service}</div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-[#5DBB4D] text-lg">{res.number}</div>
              <div className="text-white/40 text-xs tracking-widest mt-1">{res.hours_bn}</div>
            </div>
          </div>
        ))}
      </Section>

      <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 text-[#ffba12] p-5 text-sm leading-relaxed mt-8">
        ⚠ {r.disclaimer_bn}
      </div>
    </div>
  );
}