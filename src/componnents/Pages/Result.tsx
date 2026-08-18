import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResult } from "../api/instruments";

const bandColor: Record<string, string> = {
  strong: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  good: "bg-blue-100 text-blue-800 border border-blue-200",
  explore: "bg-amber-100 text-amber-800 border border-amber-200",
};

function cfiBandClass(label_en: string) {
  if (label_en === "Strong fit") return bandColor.strong;
  if (label_en === "Good fit") return bandColor.good;
  return bandColor.explore;
}

const rankColor: Record<number, string> = {
  0: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  1: "bg-blue-100 text-blue-800 border border-blue-200",
  2: "bg-amber-100 text-amber-800 border border-amber-200",
  3: "bg-orange-100 text-orange-800 border border-orange-200",
  4: "bg-red-100 text-red-800 border border-red-200",
};

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
          setError("রিপোর্ট পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
        }
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  // প্রফেশনাল লোডিং স্টেট
  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col justify-center items-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">আপনার রিপোর্ট প্রস্তুত করা হচ্ছে...</p>
      </div>
    );
  }

  // প্রফেশনাল এরর স্টেট
  if (error || !result) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex justify-center items-center bg-slate-50 px-4">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-red-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">সমস্যা হয়েছে</h3>
          <p className="text-slate-600 mb-6">{error || "তথ্য পাওয়া যায়নি"}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-medium transition-colors"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    // ন্যাভবার ওভারল্যাপ ফিক্স (pt-32) এবং প্রিন্ট স্টাইলিং
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-4 sm:px-6 print:pt-0 print:bg-white">
      <div className="max-w-4xl mx-auto">
        {/* অপশনাল: প্রিন্ট বাটন (ইউজার এক্সপেরিয়েন্স বাড়ানোর জন্য) */}
        <div className="flex justify-end mb-4 print:hidden">
          <button 
            onClick={() => window.print()} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            রিপোর্ট প্রিন্ট করুন
          </button>
        </div>

        {result.scoringType === "vector_matching" ? (
          <CfiReport r={result} />
        ) : result.scoringType === "sum_and_band" ? (
          <FadssReport r={result} />
        ) : (
          <div className="bg-white p-16 rounded-2xl shadow-sm text-center text-slate-500">
            অজানা রিপোর্ট ধরন।
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CFI-BD REPORT ================= */
function CfiReport({ r }: { r: Record<string, any> }) {
  const codeBn = r.hollandCode.map((t: string) => r.typeLabels_bn[t]).join(" · ");

  return (
    <div className="space-y-6 print:space-y-4">
      {/* গর্জিয়াস হেডার কার্ড */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 text-white text-center px-6 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-widest text-emerald-200 mb-6 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            আপনার ক্যারিয়ার প্রোফাইল
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 tracking-tight leading-tight">{codeBn}</h1>
          
          <div className="flex justify-center gap-3 mb-8">
            {r.hollandCode.map((t: string) => (
              <span
                key={t}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-mono font-bold text-xl sm:text-2xl shadow-inner"
              >
                {t}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-300 font-medium">
            <span className="bg-slate-950/30 px-4 py-1.5 rounded-lg">Track: <span className="text-white">{r.track}</span></span>
            <span className="bg-slate-950/30 px-4 py-1.5 rounded-lg">Clarity: <span className="text-white">{r.clarity.toFixed(1)} ({r.clarityVerdict})</span></span>
            <span className="bg-slate-950/30 px-4 py-1.5 rounded-lg">Coherence: <span className="text-white">{r.coherence}/3</span></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {r.clarityVerdict === "FLAT" ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
            <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-amber-800 leading-relaxed font-medium">
              আপনার আগ্রহের ধরন এখনো যথেষ্ট স্পষ্ট না — তাই নির্দিষ্ট পেশার তালিকা দেখানো হচ্ছে না। আরও কিছু বিষয় explore করে আবার চেষ্টা করার পরামর্শ দেওয়া হচ্ছে।
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interest/Confidence table */}
              <Section title="আগ্রহ ও আত্মবিশ্বাস" icon={<svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold rounded-tl-lg">টাইপ</th>
                        <th className="text-right py-3 px-4 font-semibold">আগ্রহ</th>
                        <th className="text-right py-3 px-4 font-semibold rounded-tr-lg">আত্মবিশ্বাস</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(r.typeLabels_bn).map((t) => (
                        <tr key={t} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-700">{r.typeLabels_bn[t]}</td>
                          <td className="py-3 px-4 text-right font-mono text-slate-600">{r.interest[t].toFixed(1)}</td>
                          <td className="py-3 px-4 text-right font-mono text-slate-600">{r.confidence[t].toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              {/* Values table */}
              <Section title="কর্মমূল্যবোধ" icon={<svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold rounded-tl-lg">মূল্যবোধ</th>
                        <th className="text-right py-3 px-4 font-semibold rounded-tr-lg">স্কোর</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(r.valueLabels_bn).map((v) => (
                        <tr key={v} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-medium text-slate-700">{r.valueLabels_bn[v]}</td>
                          <td className="py-3 px-4 text-right font-mono text-emerald-600 font-semibold">{r.values[v].toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </div>

            {/* Matched occupations */}
            <Section title={`মিলে যাওয়া পেশা (${r.matches.length}টি)`} icon={<svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {r.matches.map((m: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="font-bold text-slate-800 mb-1">{m.name_bn}</div>
                      <div className="text-xs text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded-md">{m.cluster}</div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="font-mono text-lg font-black text-slate-800 mb-1">
                        {m.match.toFixed(1)}
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide ${cfiBandClass(m.band.label_en)}`}>
                        {m.band.label_bn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Training */}
              {r.training.length > 0 && (
                <Section title="প্রশিক্ষণ">
                  <div className="space-y-5">
                    {r.training.map((t: any, i: number) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <h4 className="text-sm font-extrabold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          {t.cluster}
                        </h4>
                        <div className="space-y-3">
                          {t.entries.map((e: any, j: number) => (
                            <div key={j} className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                              <b className="text-slate-800 block mb-1">{e.bn}</b>
                              <div className="flex justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
                                <span>{e.provider}</span>
                                <span className="font-medium text-slate-700">{e.kind}, {e.dur}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {/* Cross-cutting skills */}
              {r.crossCuttingSkills.length > 0 && (
                <Section title="অতিরিক্ত দক্ষতা সাজেশন">
                  <div className="space-y-3">
                    {r.crossCuttingSkills.map((s: any, i: number) => (
                      <div key={i} className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <b className="text-sm font-bold text-slate-800">{s.name_bn}</b>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-200 px-2 py-1 rounded-md">{s.provider}</span>
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed bg-white/50 p-2 rounded-lg">{s.why}</div>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Overseas */}
            {r.overseas && (
              <Section title="বিদেশে সুযোগ" icon={<svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {r.overseas.sections.map((sec: any, i: number) => (
                      <div key={i} className="mb-6">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">{sec.cluster}</h4>
                        <div className="space-y-3">
                          {sec.routes.map((route: any, j: number) => (
                            <div key={j} className="bg-white border border-slate-200 hover:border-sky-300 rounded-xl p-4 shadow-sm transition-colors">
                              <div className="text-sm font-bold text-slate-800 mb-1">{route.t}</div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="inline-block text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{route.auth}</span>
                              </div>
                              <div className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-50 leading-relaxed">{route.scope}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    {r.overseas.weakEnglish && (
                      <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-5 shadow-sm">
                        <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wide mb-2 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          ভাষাগত সতর্কতা
                        </h4>
                        <p className="text-sm text-sky-700 leading-relaxed font-medium">
                          প্রায় প্রতিটি বিদেশি রুট ভাষা দিয়ে গেটেড — ইংরেজি আগে, টেকনিক্যাল প্রশিক্ষণ পরে।
                        </p>
                      </div>
                    )}

                    {r.overseas.showScholarships && (
                      <div className="mb-5">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 8.56l-1.221.524a1 1 0 000 1.838l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.838l-1.219-.522-1.002.43a2.992 2.992 0 01-1.572.246l-4.593-1.968a3 3 0 01-1.574-.246l-1.002-.43V14a1 1 0 001 1h4a1 1 0 001-1v-3.415a2.99 2.99 0 011.573-.246l1.002.43a1 1 0 00.788 0l1.22-.524v5.394A1 1 0 0115 19H5a1 1 0 01-1-1V8.56z" /></svg>
                          স্কলারশিপ
                        </h4>
                        <div className="space-y-3">
                          {r.overseas.scholarships.map((s: any, i: number) => (
                            <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-4 shadow-sm">
                              <div className="text-sm font-bold text-amber-900">{s.name}</div>
                              <div className="text-xs text-amber-700/80 mt-1 font-medium">{s.where}</div>
                              <div className="text-xs text-amber-800 mt-2 bg-white/50 p-2 rounded-lg">{s.note}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm leading-relaxed mt-5 shadow-sm flex items-start gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <div>
                        <span className="font-bold block mb-1">সতর্কতা</span>
                        {r.overseas.fraudWarning_bn}
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            )}

            {/* Gaps */}
            {r.gaps.length > 0 && (
              <Section title="Interest-Confidence গ্যাপ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {r.gaps.map((g: any, i: number) => (
                    <div key={i} className="bg-slate-100 rounded-xl p-4 text-sm text-slate-700 shadow-inner border border-slate-200">
                      {g.message_bn}
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </>
        )}

        <div className="bg-slate-800 text-slate-300 rounded-xl p-5 text-sm leading-relaxed flex gap-4 items-center shadow-lg print:border print:border-slate-300 print:text-slate-800 print:bg-white">
          <svg className="w-8 h-8 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p>এই প্রতিবেদন চূড়ান্ত রায় নয়, আলোচনার সূচনা মাত্র। CFI-BD-এর এখনও কোনো বাংলাদেশি নর্ম নেই।</p>
        </div>
      </div>
    </div>
  );
}

/* ================= FADSS REPORT ================= */
function FadssReport({ r }: { r: Record<string, any> }) {
  const constructKeys = Object.keys(r.constructResults);

  return (
    <div className="space-y-6 print:space-y-4">
      {/* ফোকাসড হেডার */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-amber-500"></div>
        <div className="mb-6 mt-2">
          <span className={`inline-flex items-center px-6 py-2.5 rounded-full text-base font-bold shadow-sm ${rankColor[r.overallState.rank]}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-current mr-2 opacity-75"></span>
            {r.overallState.label_bn}
          </span>
        </div>
        <p className="text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
          {r.overallState.message_bn}
        </p>
        {r.dominant?.length > 0 && (
          <div className="mt-6 inline-block bg-slate-50 border border-slate-100 rounded-xl px-5 py-3">
            <p className="text-sm text-slate-500 font-medium mb-1 uppercase tracking-wider text-xs">সবচেয়ে বেশি প্রভাবিত ক্ষেত্র</p>
            <p className="text-base font-bold text-slate-800">{r.dominant.join(", ")}</p>
          </div>
        )}
      </div>

      {(r.referral || r.crisisNote) && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 rounded-xl p-5 shadow-sm">
          <div className="flex gap-4">
            <svg className="w-6 h-6 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div className="space-y-2 font-medium">
              {r.referral && <p>{r.referral}</p>}
              {r.crisisNote && <p>{r.crisisNote}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="চারটি ক্ষেত্রের তুলনা" icon={<svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}>
          <div className="flex flex-col gap-5 mt-2">
            {constructKeys.map((c) => {
              const cr = r.constructResults[c];
              const pct = cr.score !== null ? (cr.score / cr.maxScore) * 100 : 0;
              return (
                <div key={c} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <span className="font-bold text-slate-800 block mb-1">{cr.name_bn}</span>
                      {cr.band && (
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md ${rankColor[cr.band.rank]}`}>
                          {cr.band.label_bn}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-lg font-black text-slate-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                      {cr.score ?? "—"}<span className="text-sm text-slate-400 font-normal">/{cr.maxScore}</span>
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-slate-800 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <div className="space-y-6">
          <Section title="বিস্তারিত ব্যাখ্যা ও করণীয়">
            <div className="space-y-5">
              {constructKeys.map((c) => {
                const cr = r.constructResults[c];
                if (!cr.interpretation) return null;
                return (
                  <div key={c} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                    <h4 className="text-base font-extrabold text-slate-800 mb-2 flex items-center justify-between">
                      {cr.name_bn}
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${rankColor[cr.band.rank]}`}>
                        {cr.band.label_bn}
                      </span>
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {cr.interpretation.bn}
                    </p>
                    <ul className="space-y-2">
                      {cr.interpretation.actions_bn.map((a: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-700">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span className="leading-relaxed">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Section>

          {r.helplines?.length > 0 && (
            <Section title="পরামর্শ ও সহায়তার জন্য যোগাযোগ" icon={<svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}>
              <div className="space-y-3">
                {r.helplines.map((h: any, i: number) => (
                  <a href={`tel:${h.number}`} key={i} className="flex justify-between items-center bg-white border border-slate-200 hover:border-rose-300 hover:shadow-sm rounded-xl p-4 transition-all group">
                    <span className="font-bold text-slate-700 group-hover:text-rose-600 transition-colors">{h.name_bn}</span>
                    <span className="font-mono text-sm bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                      {h.number}
                    </span>
                  </a>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>

      <div className="bg-slate-800 text-slate-300 rounded-xl p-5 text-sm leading-relaxed flex gap-4 items-center shadow-lg mt-8 print:border print:border-slate-300 print:text-slate-800 print:bg-white">
        <svg className="w-8 h-8 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p>এই প্রতিবেদনটি FADSS স্ক্রিনিং টুলের ভিত্তিতে তৈরি একটি প্রাথমিক ধারণা মাত্র — এটি কোনো চূড়ান্ত রোগ নির্ণয় নয়। কাট-অফগুলো এখনো provisional।</p>
      </div>
    </div>
  );
}

// আপডেটেড রিউজেবল সেকশন কম্পোনেন্ট
function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        {icon && <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>}
        <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{title}</h3>
      </div>
      {children}
    </div>
  );
}