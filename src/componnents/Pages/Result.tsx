import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResult } from "../api/instruments";

const bandColor: Record<string, string> = {
  strong: "bg-emerald-50 text-emerald-700",
  good: "bg-blue-50 text-blue-700",
  explore: "bg-amber-50 text-amber-700",
};
function cfiBandClass(label_en: string) {
  if (label_en === "Strong fit") return bandColor.strong;
  if (label_en === "Good fit") return bandColor.good;
  return bandColor.explore;
}

const rankColor: Record<number, string> = {
  0: "bg-emerald-50 text-emerald-700",
  1: "bg-blue-50 text-blue-700",
  2: "bg-amber-50 text-amber-700",
  3: "bg-orange-50 text-orange-700",
  4: "bg-red-50 text-red-700",
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
          setError("রিপোর্ট পাওয়া যায়নি।");
        }
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  if (loading) return <div className="p-16 text-center text-slate-500">লোড হচ্ছে...</div>;
  if (error || !result) return <div className="p-16 text-center text-slate-500">{error}</div>;

  if (result.scoringType === "vector_matching") return <CfiReport r={result} />;
  if (result.scoringType === "sum_and_band") return <FadssReport r={result} />;

  return <div className="p-16 text-center text-slate-500">অজানা রিপোর্ট ধরন।</div>;
}

/* ================= CFI-BD REPORT ================= */
function CfiReport({ r }: { r: Record<string, any> }) {
  const codeBn = r.hollandCode.map((t: string) => r.typeLabels_bn[t]).join(" · ");

  return (
    <div className="pb-16">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 text-white text-center px-5 py-10">
        <div className="text-xs uppercase tracking-widest text-slate-300 mb-2">
          আপনার প্রোফাইল
        </div>
        <h1 className="text-2xl font-bold mb-2">{codeBn}</h1>
        <div className="flex justify-center gap-1.5">
          {r.hollandCode.map((t: string) => (
            <span
              key={t}
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="text-xs text-slate-300 mt-2">
          Track {r.track} · Clarity {r.clarity.toFixed(1)} ({r.clarityVerdict}) · Coherence{" "}
          {r.coherence}/3
        </div>
      </div>

      <div className="max-w-xl mx-auto px-5">
        {r.clarityVerdict === "FLAT" ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mt-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              আপনার আগ্রহের ধরন এখনো যথেষ্ট স্পষ্ট না — তাই নির্দিষ্ট পেশার তালিকা দেখানো হচ্ছে
              না। আরও কিছু বিষয় explore করে আবার চেষ্টা করার পরামর্শ দেওয়া হচ্ছে।
            </p>
          </div>
        ) : (
          <>
            {/* Interest/Confidence table */}
            <Section title="আগ্রহ ও আত্মবিশ্বাস">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase">
                    <th className="text-left pb-2">টাইপ</th>
                    <th className="text-right pb-2">আগ্রহ</th>
                    <th className="text-right pb-2">আত্মবিশ্বাস</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(r.typeLabels_bn).map((t) => (
                    <tr key={t} className="border-t border-slate-100">
                      <td className="py-2">{r.typeLabels_bn[t]}</td>
                      <td className="py-2 text-right font-mono">{r.interest[t].toFixed(1)}</td>
                      <td className="py-2 text-right font-mono">{r.confidence[t].toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            {/* Values table */}
            <Section title="কর্মমূল্যবোধ">
              <table className="w-full text-sm">
                <tbody>
                  {Object.keys(r.valueLabels_bn).map((v) => (
                    <tr key={v} className="border-t border-slate-100">
                      <td className="py-2">{r.valueLabels_bn[v]}</td>
                      <td className="py-2 text-right font-mono">{r.values[v].toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            {/* Matched occupations */}
            <Section title={`মিলে যাওয়া পেশা (${r.matches.length}টি)`}>
              <div className="flex flex-col gap-2">
                {r.matches.map((m: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border border-slate-100 rounded-xl px-4 py-3"
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{m.name_bn}</div>
                      <div className="text-xs text-slate-400">{m.cluster}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-800">
                        {m.match.toFixed(1)}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfiBandClass(
                          m.band.label_en
                        )}`}
                      >
                        {m.band.label_bn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Training */}
            {r.training.length > 0 && (
              <Section title="প্রশিক্ষণ">
                {r.training.map((t: any, i: number) => (
                  <div key={i} className="mb-4">
                    <h4 className="text-sm font-bold text-slate-800 mb-2">{t.cluster}</h4>
                    {t.entries.map((e: any, j: number) => (
                      <div key={j} className="text-xs text-slate-600 mb-1.5">
                        <b className="text-slate-800">{e.bn}</b> — {e.provider} ({e.kind}, {e.dur})
                      </div>
                    ))}
                  </div>
                ))}
              </Section>
            )}

            {/* Cross-cutting skills */}
            {r.crossCuttingSkills.length > 0 && (
              <Section title="অতিরিক্ত দক্ষতা সাজেশন">
                {r.crossCuttingSkills.map((s: any, i: number) => (
                  <div key={i} className="bg-emerald-50 rounded-xl px-4 py-3 mb-2">
                    <b className="text-sm text-slate-800">{s.name_bn}</b> — {s.provider}
                    <div className="text-xs text-slate-500 mt-1">{s.why}</div>
                  </div>
                ))}
              </Section>
            )}

            {/* Overseas */}
            {r.overseas && (
              <Section title="বিদেশে সুযোগ">
                {r.overseas.sections.map((sec: any, i: number) => (
                  <div key={i} className="mb-4">
                    <h4 className="text-sm font-bold text-slate-800 mb-2">{sec.cluster}</h4>
                    {sec.routes.map((route: any, j: number) => (
                      <div key={j} className="border border-slate-100 rounded-xl p-3 mb-2">
                        <div className="text-sm font-bold text-slate-800">{route.t}</div>
                        <div className="text-xs text-slate-400">{route.auth}</div>
                        <div className="text-xs text-slate-600 mt-1">{route.scope}</div>
                      </div>
                    ))}
                  </div>
                ))}

                {r.overseas.weakEnglish && (
                  <p className="text-xs text-slate-500 mb-3">
                    প্রায় প্রতিটি বিদেশি রুট ভাষা দিয়ে গেটেড — ইংরেজি আগে, টেকনিক্যাল প্রশিক্ষণ
                    পরে।
                  </p>
                )}

                {r.overseas.showScholarships && (
                  <>
                    <h4 className="text-sm font-bold text-slate-800 mb-2 mt-3">স্কলারশিপ</h4>
                    {r.overseas.scholarships.map((s: any, i: number) => (
                      <div key={i} className="border border-slate-100 rounded-xl p-3 mb-2">
                        <div className="text-sm font-bold text-slate-800">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.where}</div>
                        <div className="text-xs text-slate-600 mt-1">{s.note}</div>
                      </div>
                    ))}
                  </>
                )}

                <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl p-3 text-xs leading-relaxed mt-3">
                  ⚠ {r.overseas.fraudWarning_bn}
                </div>
              </Section>
            )}

            {/* Gaps */}
            {r.gaps.length > 0 && (
              <Section title="Interest-Confidence গ্যাপ">
                {r.gaps.map((g: any, i: number) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 mb-2">
                    {g.message_bn}
                  </div>
                ))}
              </Section>
            )}
          </>
        )}

        <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-xl p-4 text-xs leading-relaxed mt-6">
          ⚠ এই প্রতিবেদন চূড়ান্ত রায় নয়, আলোচনার সূচনা মাত্র। CFI-BD-এর এখনও কোনো বাংলাদেশি নর্ম
          নেই।
        </div>
      </div>
    </div>
  );
}

/* ================= FADSS REPORT ================= */
function FadssReport({ r }: { r: Record<string, any> }) {
  const constructKeys = Object.keys(r.constructResults);

  return (
    <div className="max-w-xl mx-auto px-5 pb-16">
      <div className="mt-6 text-center">
        <div
          className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
            rankColor[r.overallState.rank]
          }`}
        >
          {r.overallState.label_bn}
        </div>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">{r.overallState.message_bn}</p>
        {r.dominant?.length > 0 && (
          <p className="text-xs text-slate-400 mt-2">সবচেয়ে বেশি প্রভাবিত: {r.dominant.join(", ")}</p>
        )}
      </div>

      {(r.referral || r.crisisNote) && (
        <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl p-4 text-sm leading-relaxed mt-5">
          {r.referral && <p className="mb-2">⚠ {r.referral}</p>}
          {r.crisisNote && <p>{r.crisisNote}</p>}
        </div>
      )}

      <Section title="চারটি ক্ষেত্রের তুলনা">
        <div className="flex flex-col gap-3">
          {constructKeys.map((c) => {
            const cr = r.constructResults[c];
            const pct = cr.score !== null ? (cr.score / cr.maxScore) * 100 : 0;
            return (
              <div key={c}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-800">{cr.name_bn}</span>
                  <span className="font-mono text-slate-500">
                    {cr.score ?? "—"}/{cr.maxScore}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {cr.band && (
                  <span
                    className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rankColor[cr.band.rank]
                    }`}
                  >
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
            <div key={c} className="mb-5">
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                {cr.name_bn} — {cr.band.label_bn}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                {cr.interpretation.bn}
              </p>
              <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                {cr.interpretation.actions_bn.map((a: string, i: number) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </Section>

      {r.helplines?.length > 0 && (
        <Section title="পরামর্শ ও সহায়তার জন্য যোগাযোগ">
          {r.helplines.map((h: any, i: number) => (
            <div key={i} className="flex justify-between text-xs py-2 border-t border-slate-100">
              <span className="text-slate-700">{h.name_bn}</span>
              <span className="font-mono text-slate-500">{h.number}</span>
            </div>
          ))}
        </Section>
      )}

      <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-xl p-4 text-xs leading-relaxed mt-6">
        ⚠ এই প্রতিবেদনটি FADSS স্ক্রিনিং টুলের ভিত্তিতে তৈরি একটি প্রাথমিক ধারণা মাত্র — এটি কোনো
        চূড়ান্ত রোগ নির্ণয় নয়। কাট-অফগুলো এখনো provisional।
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 mt-4">
      <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">{title}</div>
      {children}
    </div>
  );
}