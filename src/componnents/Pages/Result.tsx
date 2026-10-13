import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResult } from "../api/instruments";

const bandColor: Record<string, string> = {
  strong: "bg-[#A38771]/10 text-[#A38771] border border-[#A38771]/40",
  good: "bg-white text-[#222222] border border-[#EFECE5]",
  explore: "bg-transparent text-[#4A4A4A] border border-[#EFECE5]",
};

function cfiBandClass(label_en: string) {
  if (label_en === "Strong fit") return bandColor.strong;
  if (label_en === "Good fit") return bandColor.good;
  return bandColor.explore;
}

const rankColor: Record<number, string> = {
  0: "bg-[#A38771]/10 text-[#A38771] border border-[#A38771]/40",
  1: "bg-white text-[#222222] border border-[#EFECE5]",
  2: "bg-transparent text-[#4A4A4A] border border-[#EFECE5]",
  3: "bg-amber-500/10 text-amber-700 border border-amber-500/30",
  4: "bg-red-500/10 text-red-600 border border-red-500/30",
};

// ==========================================
// Global Shared Background for all reports (Light & Minimal)
// ==========================================
const SharedBackground = () => (
  <>
    <div 
      className="absolute inset-0 z-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    />
    <div className="absolute inset-0 z-0 bg-[#F9F6F0]" />
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EFECE5]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EAEFF0]/60 rounded-full blur-[150px] pointer-events-none z-0"></div>
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
          setError("Payment is required to view this report.");
        } else {
          setError("Report not found.");
        }
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#F9F6F0] lg:pl-[50px] overflow-hidden">
        <SharedBackground />
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite] z-10">
          <svg className="w-10 h-10 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-[#A38771] font-bold tracking-[0.2em] uppercase text-sm z-10">
          Generating Report...
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#F9F6F0] lg:pl-[50px] overflow-hidden px-4">
        <SharedBackground />
        <div className="bg-white border border-red-200 px-8 py-8 flex flex-col items-center gap-4 shadow-sm relative z-10 text-center rounded-sm">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[#222222] font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F9F6F0] lg:pl-[50px] pt-24 pb-20 overflow-hidden flex flex-col">
      <SharedBackground />
      <div className="w-full relative z-10 flex-1">
        {result.scoringType === "vector_matching" && <CfiReport r={result} />}
        {result.scoringType === "sum_and_band" && <FadssReport r={result} />}
        {result.scoringType === "domain_pomp_composite" && <PcsReport r={result} />}
        {result.scoringType === "domain_mean_average" && <RrsReport r={result} />}
        {result.scoringType === "mcrrs_triage" && <McrrsReport r={result} />}
        
        {!["vector_matching", "sum_and_band", "domain_pomp_composite", "domain_mean_average", "mcrrs_triage"].includes(result.scoringType) && (
          <div className="p-16 text-center text-[#4A4A4A]">Unknown report type.</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Section Wrapper Component (Refined Style)
// ==========================================
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#EFECE5] p-6 sm:p-8 mt-6 shadow-sm rounded-sm">
      <div className="text-xs font-bold text-[#A38771] uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-[#EFECE5] pb-4">
        <svg className="w-4 h-4 shrink-0 text-[#A38771]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
        </svg>
        {title}
      </div>
      <div className="text-[#4A4A4A] text-sm">{children}</div>
    </div>
  );
}

/* ================= CFI-BD REPORT ================= */
function CfiReport({ r }: { r: Record<string, any> }) {
  const codeEn = r.hollandCode.map((t: string) => r.typeLabels_en?.[t] || r.typeLabels_bn?.[t] || t).join(" · ");

  return (
    <div className="pb-16 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="bg-white border border-[#EFECE5] text-[#222222] text-center px-6 py-12 mb-8 shadow-sm rounded-sm">
        <div className="text-xs uppercase tracking-[0.2em] text-[#A38771] font-bold mb-4">
          Your Profile
        </div>
        <h1 className="text-3xl font-bold mb-6 font-serif tracking-wide text-[#222222]">{codeEn}</h1>
        <div className="flex justify-center gap-2">
          {r.hollandCode.map((t: string) => (
            <span
              key={t}
              className="w-10 h-10 border border-[#EFECE5] bg-[#F9F6F0] flex items-center justify-center font-mono font-bold text-lg text-[#222222] rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="text-xs text-[#4A4A4A] mt-6 tracking-widest uppercase">
          Track {r.track} <span className="mx-2 text-[#EFECE5]">|</span> 
          Clarity {r.clarity.toFixed(1)} ({r.clarityVerdict}) <span className="mx-2 text-[#EFECE5]">|</span> 
          Coherence {r.coherence}/3
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {r.clarityVerdict === "FLAT" ? (
          <div className="bg-amber-500/10 border border-amber-500/30 p-6 mt-6 rounded-sm">
            <p className="text-sm text-amber-800 leading-relaxed">
              Your interest patterns are not yet distinct enough — therefore specific career matches are not being displayed. We suggest exploring further interests and re-taking the assessment.
            </p>
          </div>
        ) : (
          <>
            <Section title="Interests & Confidence">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-[#4A4A4A] uppercase tracking-widest border-b border-[#EFECE5]">
                    <th className="text-left pb-3 font-medium">Type</th>
                    <th className="text-right pb-3 font-medium">Interest</th>
                    <th className="text-right pb-3 font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(r.typeLabels_bn || r.typeLabels_en || {}).map((t) => (
                    <tr key={t} className="border-b border-[#EFECE5] hover:bg-[#F9F6F0] transition-colors">
                      <td className="py-4 text-[#222222]">{r.typeLabels_en?.[t] || r.typeLabels_bn?.[t] || t}</td>
                      <td className="py-4 text-right font-mono text-[#A38771]">{r.interest[t].toFixed(1)}</td>
                      <td className="py-4 text-right font-mono text-[#222222]">{r.confidence[t].toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title="Work Values">
              <table className="w-full text-sm">
                <tbody>
                  {Object.keys(r.valueLabels_bn || r.valueLabels_en || {}).map((v) => (
                    <tr key={v} className="border-b border-[#EFECE5] hover:bg-[#F9F6F0] transition-colors">
                      <td className="py-4 text-[#222222]">{r.valueLabels_en?.[v] || r.valueLabels_bn?.[v] || v}</td>
                      <td className="py-4 text-right font-mono text-[#A38771]">{r.values[v].toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title={`Matching Careers (${r.matches.length})`}>
              <div className="flex flex-col gap-3">
                {r.matches.map((m: any, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-[#F9F6F0] border border-[#EFECE5] px-5 py-4 rounded-sm">
                    <div>
                      <div className="font-semibold text-base text-[#222222] mb-1">{m.name_en || m.name_bn}</div>
                      <div className="text-xs text-[#4A4A4A] tracking-widest uppercase">{m.cluster}</div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <div className="font-mono font-bold text-[#A38771] text-lg">
                        {m.match.toFixed(1)}
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm ${cfiBandClass(m.band.label_en)}`}>
                        {m.band.label_en || m.band.label_bn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {r.training?.length > 0 && (
              <Section title="Training Recommendations">
                {r.training.map((t: any, i: number) => (
                  <div key={i} className="mb-6 last:mb-0">
                    <h4 className="text-sm font-bold text-[#A38771] mb-3 uppercase tracking-widest">{t.cluster}</h4>
                    {t.entries.map((e: any, j: number) => (
                      <div key={j} className="text-sm text-[#4A4A4A] mb-2 border-l-2 border-[#A38771] pl-3 py-1">
                        <b className="text-[#222222]">{e.en || e.bn}</b> — {e.provider} <span className="text-gray-400">({e.kind}, {e.dur})</span>
                      </div>
                    ))}
                  </div>
                ))}
              </Section>
            )}

            {r.crossCuttingSkills?.length > 0 && (
              <Section title="Additional Skill Suggestions">
                {r.crossCuttingSkills.map((s: any, i: number) => (
                  <div key={i} className="bg-[#F9F6F0] border border-[#EFECE5] px-5 py-4 mb-3 rounded-sm">
                    <b className="text-sm text-[#A38771] block mb-1">{s.name_en || s.name_bn}</b>
                    <span className="text-xs text-[#4A4A4A] uppercase tracking-widest">{s.provider}</span>
                    <div className="text-sm text-[#4A4A4A] mt-2 leading-relaxed">{s.why_en || s.why}</div>
                  </div>
                ))}
              </Section>
            )}

            {r.overseas && (
              <Section title="Overseas Opportunities">
                {r.overseas.sections.map((sec: any, i: number) => (
                  <div key={i} className="mb-6">
                    <h4 className="text-sm font-bold text-[#A38771] mb-3 uppercase tracking-widest">{sec.cluster}</h4>
                    {sec.routes.map((route: any, j: number) => (
                      <div key={j} className="border border-[#EFECE5] bg-[#F9F6F0] p-4 mb-3 rounded-sm">
                        <div className="text-base font-bold text-[#222222] mb-1">{route.t}</div>
                        <div className="text-xs text-[#4A4A4A] tracking-widest uppercase mb-2">{route.auth}</div>
                        <div className="text-sm text-[#4A4A4A] leading-relaxed">{route.scope}</div>
                      </div>
                    ))}
                  </div>
                ))}

                {r.overseas.weakEnglish && (
                  <p className="text-sm text-amber-800 mb-4 bg-amber-500/10 p-4 border border-amber-500/30 rounded-sm">
                    Nearly all overseas pathways require language proficiency — English language skills take precedence over technical training.
                  </p>
                )}

                {r.overseas.showScholarships && (
                  <>
                    <h4 className="text-sm font-bold text-[#A38771] mb-3 mt-6 uppercase tracking-widest">Scholarships</h4>
                    {r.overseas.scholarships.map((s: any, i: number) => (
                      <div key={i} className="border border-[#EFECE5] bg-[#F9F6F0] p-4 mb-3 rounded-sm">
                        <div className="text-base font-bold text-[#222222] mb-1">{s.name}</div>
                        <div className="text-xs text-[#4A4A4A] tracking-widest uppercase mb-2">{s.where}</div>
                        <div className="text-sm text-[#4A4A4A] leading-relaxed">{s.note}</div>
                      </div>
                    ))}
                  </>
                )}

                <div className="bg-red-500/10 border border-red-500/30 text-red-700 p-4 text-sm leading-relaxed mt-4 rounded-sm">
                  ⚠ {r.overseas.fraudWarning_en || r.overseas.fraudWarning_bn || "Warning regarding potential visa or placement fraud."}
                </div>
              </Section>
            )}

            {r.gaps?.length > 0 && (
              <Section title="Interest-Confidence Gaps">
                {r.gaps.map((g: any, i: number) => (
                  <div key={i} className="bg-[#F9F6F0] border-l-2 border-[#A38771] p-4 text-sm text-[#4A4A4A] mb-3 rounded-sm">
                    {g.message_en || g.message_bn}
                  </div>
                ))}
              </Section>
            )}
          </>
        )}

        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 p-5 text-sm leading-relaxed mt-8 rounded-sm">
          ⚠ This report is intended as a starting point for discussion, not a final verdict. CFI-BD local benchmarks are ongoing.
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
      <div className="mt-8 mb-8 text-center bg-white border border-[#EFECE5] p-8 shadow-sm rounded-sm">
        <div
          className={`inline-block px-6 py-2 border text-sm font-bold tracking-widest uppercase mb-4 rounded-sm ${rankColor[r.overallState.rank]}`}
        >
          {r.overallState.label_en || r.overallState.label_bn}
        </div>
        <p className="text-base text-[#4A4A4A] leading-relaxed">{r.overallState.message_en || r.overallState.message_bn}</p>
        {r.dominant?.length > 0 && (
          <p className="text-xs text-[#A38771] mt-4 uppercase tracking-widest font-bold">
            Most Affected: <span className="text-[#4A4A4A] font-normal">{r.dominant.join(", ")}</span>
          </p>
        )}
      </div>

      {(r.referral || r.crisisNote) && (
        <div className="bg-red-500/10 border border-red-500/40 text-red-700 p-6 text-sm leading-relaxed mb-6 rounded-sm">
          {r.referral && <p className="mb-2">⚠ {r.referral}</p>}
          {r.crisisNote && <p>{r.crisisNote}</p>}
        </div>
      )}

      <Section title="Domain Comparison">
        <div className="flex flex-col gap-5">
          {constructKeys.map((c) => {
            const cr = r.constructResults[c];
            const pct = cr.score !== null ? (cr.score / cr.maxScore) * 100 : 0;
            return (
              <div key={c} className="bg-[#F9F6F0] p-4 border border-[#EFECE5] rounded-sm">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-semibold text-[#222222]">{cr.name_en || cr.name_bn}</span>
                  <span className="font-mono text-[#A38771] font-bold">
                    {cr.score ?? "—"} <span className="text-gray-400">/ {cr.maxScore}</span>
                  </span>
                </div>
                <div className="h-1.5 bg-[#EFECE5] overflow-hidden mb-3 rounded-full">
                  <div className="h-full bg-[#A38771]" style={{ width: `${pct}%` }} />
                </div>
                {cr.band && (
                  <span className={`inline-block text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm ${rankColor[cr.band.rank]}`}>
                    {cr.band.label_en || cr.band.label_bn}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Detailed Interpretation & Action Steps">
        {constructKeys.map((c) => {
          const cr = r.constructResults[c];
          if (!cr.interpretation) return null;
          return (
            <div key={c} className="mb-8 border-b border-[#EFECE5] pb-6 last:border-0 last:pb-0">
              <h4 className="text-base font-bold text-[#A38771] mb-3 font-serif">
                {cr.name_en || cr.name_bn} <span className="text-[#EFECE5] mx-2">|</span> <span className="text-[#4A4A4A] text-sm font-sans uppercase tracking-widest">{cr.band.label_en || cr.band.label_bn}</span>
              </h4>
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">
                {cr.interpretation.en || cr.interpretation.bn}
              </p>
              <ul className="list-none space-y-2">
                {(cr.interpretation.actions_en || cr.interpretation.actions_bn || []).map((a: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-[#4A4A4A]">
                    <span className="text-[#A38771]">■</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Section>

      {r.helplines?.length > 0 && (
        <Section title="Support & Helpline Contacts">
          {r.helplines.map((h: any, i: number) => (
            <div key={i} className="flex justify-between text-sm py-4 border-b border-[#EFECE5] last:border-0">
              <span className="text-[#222222] font-medium">{h.name_en || h.name_bn}</span>
              <span className="font-mono text-[#A38771] font-bold">{h.number}</span>
            </div>
          ))}
        </Section>
      )}

      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 p-5 text-sm leading-relaxed mt-8 rounded-sm">
        ⚠ This report provides a preliminary screening based on FADSS tools — it is not a clinical diagnosis. Cut-offs remain provisional.
      </div>
    </div>
  );
}

/* ================= PCS-BD REPORT ================= */
function PcsReport({ r }: { r: Record<string, any> }) {
  const domainKeys = Object.keys(r.domainResults);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mt-8 mb-8 text-center bg-white border border-[#EFECE5] p-8 shadow-sm rounded-sm">
        {r.composite !== null ? (
          <>
            <div className="text-6xl font-bold text-[#222222] font-mono mb-4">{r.composite}</div>
            <div
              className="inline-block px-5 py-2 border text-sm font-bold tracking-widest uppercase bg-[#F9F6F0] text-[#222222] border-[#EFECE5] rounded-sm"
            >
              {r.compositeBand?.label_en || r.compositeBand?.label_bn}
            </div>
          </>
        ) : (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 p-5 text-sm rounded-sm">
            Insufficient domain scores — overall score cannot be calculated.
          </div>
        )}

        {r.imNote && (
          <div className={`mt-6 text-sm p-4 border text-left leading-relaxed rounded-sm ${r.imNote.prominent ? "bg-red-500/10 text-red-700 border-red-500/30" : "bg-[#F9F6F0] text-[#4A4A4A] border-[#EFECE5]"}`}>
            {r.imNote.note_en || r.imNote.note_bn}
          </div>
        )}
      </div>

      {r.flagsFired?.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-700 p-5 text-sm leading-relaxed mb-6 rounded-sm">
          <b className="block mb-1">⚠ Points for Attention:</b> {r.flagsFired.join(", ")} — these item responses suggest special care or focus may be beneficial.
        </div>
      )}

      <Section title="Seven-Domain Profile">
        <div className="flex flex-col gap-4">
          {domainKeys.map((d) => {
            const dr = r.domainResults[d];
            if (!dr.scored) {
              return (
                <div key={d} className="text-sm text-gray-400 bg-[#F9F6F0] p-4 border border-[#EFECE5] rounded-sm">
                  {dr.name_en || dr.name_bn} — Not scored (insufficient responses)
                </div>
              );
            }
            return (
              <div key={d} className="bg-[#F9F6F0] p-4 border border-[#EFECE5] rounded-sm">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-semibold text-[#222222]">{dr.name_en || dr.name_bn}</span>
                  <span className="font-mono text-[#A38771] font-bold">{dr.index}</span>
                </div>
                <div className="h-1.5 bg-[#EFECE5] overflow-hidden mb-3 rounded-full">
                  <div className="h-full bg-[#A38771]" style={{ width: `${dr.index}%` }} />
                </div>
                <span className="inline-block text-[10px] font-bold px-3 py-1 uppercase tracking-widest bg-white border border-[#EFECE5] text-[#4A4A4A] rounded-sm">
                  {dr.band?.label_en || dr.band?.label_bn}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 p-5 text-sm leading-relaxed mt-8 rounded-sm">
        ⚠ This tool serves as a reflective instrument for parenting insights — it is not a diagnosis, legal, or custodial evaluation. Band cut-offs are provisional.
        <br /><br />
        <span className="text-[#A38771]">■</span> Detailed domain explanations, 30-day action plans, and support guides will be added soon.
      </div>
    </div>
  );
}

/* ================= RRS-24 REPORT ================= */
function RrsReport({ r }: { r: Record<string, any> }) {
  if (r.incomplete) {
    return (
      <div className="p-16 text-center text-amber-800 bg-white border border-amber-500/30 max-w-2xl mx-auto mt-10 rounded-sm">
        {r.message_en || r.message_bn || "Incomplete submission."}
      </div>
    );
  }

  const domainKeys = Object.keys(r.domainResults);
  const rankByBandCode: Record<string, string> = {
    very_low: "bg-red-500/10 text-red-600 border border-red-500/30",
    low: "bg-amber-500/10 text-amber-800 border border-amber-500/30",
    average: "bg-white text-[#222222] border border-[#EFECE5]",
    high: "bg-[#A38771]/10 text-[#A38771] border border-[#A38771]/40",
    very_high: "bg-[#A38771]/20 text-[#222222] border border-[#A38771] font-bold",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mt-8 mb-8 text-center bg-white border border-[#EFECE5] p-10 shadow-sm rounded-sm">
        <div className="text-6xl font-bold text-[#222222] font-mono">
          {r.total.scoreDisplay}
        </div>
        <div className="text-sm text-gray-400 tracking-widest font-mono mt-2 mb-4 uppercase">/ 5.00</div>
        <div className={`inline-block px-6 py-2 border text-sm font-bold tracking-widest uppercase rounded-sm ${rankByBandCode[r.total.band.code]}`}>
          {r.total.band.label_en || r.total.band.label_bn}
        </div>
      </div>

      <Section title="Three Core Domains">
        <div className="flex flex-col gap-5">
          {domainKeys.map((d) => {
            const dr = r.domainResults[d];
            return (
              <div key={d} className="bg-[#F9F6F0] p-5 border border-[#EFECE5] rounded-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 border-b border-[#EFECE5] pb-3">
                  <span className="font-serif text-lg font-bold text-[#222222]">{dr.name_en || dr.name_bn}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-[#A38771] text-lg">{dr.scoreDisplay}</span>
                    <span className={`text-[10px] font-bold px-3 py-1 uppercase tracking-widest border rounded-sm ${rankByBandCode[dr.band.code]}`}>
                      {dr.band.label_en || dr.band.label_bn}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-4">{dr.measures_en || dr.measures_bn}</p>
                <div className="h-1.5 bg-[#EFECE5] overflow-hidden rounded-full">
                  <div className="h-full bg-[#A38771]" style={{ width: `${(dr.score / 5) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Domain Comparison & Balance">
        <p className="text-sm text-[#4A4A4A] leading-relaxed mb-6">{r.gap.reading_en || r.gap.reading_bn}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#A38771]/10 border border-[#A38771]/30 p-4 rounded-sm">
            <span className="text-xs uppercase tracking-widest text-[#4A4A4A] block mb-1">Highest Domain</span>
            <span className="text-base font-bold text-[#222222]">{r.domainResults[r.highestDomain]?.name_en || r.domainResults[r.highestDomain]?.name_bn}</span>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-sm">
            <span className="text-xs uppercase tracking-widest text-[#4A4A4A] block mb-1">Lowest Domain</span>
            <span className="text-base font-bold text-amber-800">{r.domainResults[r.lowestDomain]?.name_en || r.domainResults[r.lowestDomain]?.name_bn}</span>
          </div>
        </div>
        <div className="mt-4 text-center p-3 border border-[#EFECE5] bg-white text-sm font-mono text-[#4A4A4A] rounded-sm">
          Spread / Difference: <span className="text-[#222222] font-bold">{r.gap.display}</span>
        </div>
      </Section>

      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 p-5 text-sm leading-relaxed mt-8 rounded-sm">
        ⚠ This report is designed for self-reflection. It is not a clinical diagnosis or formal evaluation, and should not be used for employment or selection decisions.
        <br /><br />
        <span className="text-[#A38771]">■</span> Detailed explanations and guidance for each band score will be integrated soon.
      </div>
    </div>
  );
}

/* ================= MCRRS-BD REPORT ================= */
function McrrsReport({ r }: { r: Record<string, any> }) {
  const bandColorMap: Record<string, string> = {
    red: "bg-red-500/10 text-red-600 border border-red-500/30",
    orange: "bg-amber-500/10 text-amber-800 border border-amber-500/30",
    amber: "bg-[#A38771]/10 text-[#222222] border border-[#A38771]/30",
    lightgreen: "bg-[#A38771]/10 text-[#A38771] border border-[#A38771]/40",
    green: "bg-[#A38771]/20 text-[#222222] border border-[#A38771] font-bold",
  };

  if (r.careFlag) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 pt-10">
        <div className="bg-red-500/10 border border-red-500/30 p-6 sm:p-8 shadow-sm mb-6 rounded-sm">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-3">
            <span className="text-2xl">⚠</span> Safety First
          </h2>
          <p className="text-base text-red-900/80 leading-relaxed">{r.tier4Message_en || r.tier4Message_bn}</p>
        </div>

        <Section title="Support Contacts & Resources">
          {r.referralResources.map((res: any, i: number) => (
            <div key={i} className="flex justify-between items-center text-sm py-4 border-b border-[#EFECE5] last:border-0">
              <div>
                <div className="text-[#222222] font-bold mb-1">{res.need_en || res.need_bn}</div>
                <div className="text-[#A38771] text-xs uppercase tracking-widest">{res.service}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-[#222222] text-lg">{res.number}</div>
                <div className="text-[#4A4A4A] text-xs tracking-widest mt-1">{res.hours_en || res.hours_bn}</div>
              </div>
            </div>
          ))}
        </Section>

        <div className="text-sm text-[#4A4A4A] mt-10 text-center border-t border-[#EFECE5] pt-6">
          Score displayed below objectively without celebratory language.
        </div>
        {r.total && (
          <div className="text-center mt-6 bg-white p-6 border border-[#EFECE5] rounded-sm">
            <span className="font-mono text-4xl font-bold text-[#222222]">{r.total.index}</span>
            <span className="text-sm text-gray-400 font-mono tracking-widest block mt-2">/ 100</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mt-8 mb-8 text-center bg-white border border-[#EFECE5] p-10 shadow-sm rounded-sm">
        {r.total ? (
          <>
            <div className="text-6xl font-bold text-[#222222] font-mono mb-6">
              {r.total.index}
            </div>
            <div className={`inline-block px-6 py-2 border text-sm font-bold tracking-widest uppercase rounded-sm ${bandColorMap[r.total.band.color]}`}>
              {r.total.band.label_en || r.total.band.label_bn}
            </div>
            {r.total.note && <p className="text-sm text-amber-800 mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm">{r.total.note}</p>}
          </>
        ) : (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 p-5 text-sm rounded-sm">
            Insufficient domain scores — overall index cannot be calculated.
          </div>
        )}
      </div>

      {r.pri && (
        <Section title="Social Pressure Resilience Index (Provisional)">
          <div className="text-center py-4">
            <div className="text-4xl font-bold font-mono text-[#222222] mb-4">{r.pri.index}</div>
            <span className={`inline-block text-xs font-bold px-4 py-1.5 border uppercase tracking-widest rounded-sm ${bandColorMap[r.pri.band.color]}`}>
              {r.pri.band.label_en || r.pri.band.label_bn}
            </span>
            <p className="text-sm text-[#4A4A4A] mt-6 leading-relaxed bg-[#F9F6F0] p-4 border border-[#EFECE5] rounded-sm">
              An indicator of how effectively external societal pressures are currently managed — this is not a prediction.
            </p>
          </div>
        </Section>
      )}

      <Section title="Six-Domain Profile">
        <div className="flex flex-col gap-4">
          {Object.keys(r.domainResults).map((d) => {
            const dr = r.domainResults[d];
            if (!dr.scored) {
              return (
                <div key={d} className="text-sm text-gray-400 bg-[#F9F6F0] p-4 border border-[#EFECE5] rounded-sm">
                  {dr.name_en || dr.name_bn} — Not scored (insufficient responses)
                </div>
              );
            }
            return (
              <div key={d} className="bg-[#F9F6F0] p-4 border border-[#EFECE5] rounded-sm">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-semibold text-[#222222]">{dr.name_en || dr.name_bn}</span>
                  <span className="font-mono text-[#A38771] font-bold">{dr.index}</span>
                </div>
                <div className="h-1.5 bg-[#EFECE5] overflow-hidden mb-3 rounded-full">
                  <div className="h-full bg-[#A38771]" style={{ width: `${dr.index}%` }} />
                </div>
                <span className={`inline-block text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm ${bandColorMap[dr.band.color]}`}>
                  {dr.band.label_en || dr.band.label_bn}
                </span>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}