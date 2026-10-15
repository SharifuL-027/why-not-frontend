import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchResult } from "../api/instruments";

const bandColor: Record<string, string> = {
  strong: "bg-emerald-50 text-emerald-800 border-emerald-200",
  good: "bg-blue-50 text-blue-800 border-blue-200",
  explore: "bg-gray-50 text-gray-700 border-gray-200",
};

function cfiBandClass(label_en: string) {
  if (label_en === "Strong fit") return bandColor.strong;
  if (label_en === "Good fit") return bandColor.good;
  return bandColor.explore;
}

const rankColor: Record<number, string> = {
  0: "bg-emerald-50 text-emerald-800 border-emerald-300",
  1: "bg-teal-50 text-teal-800 border-teal-300",
  2: "bg-amber-50 text-amber-800 border-amber-300",
  3: "bg-orange-50 text-orange-800 border-orange-300",
  4: "bg-rose-50 text-rose-800 border-rose-300",
};

// Section Container Component
function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#EAEFF0] p-6 sm:p-8 mt-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] rounded-md">
      <div className="text-xs font-bold text-[#A38771] uppercase tracking-[0.18em] mb-6 flex items-center gap-2.5 border-b border-[#EAEFF0] pb-4">
        {icon || (
          <span className="w-2 h-2 rounded-full bg-[#A38771]" />
        )}
        <span>{title}</span>
      </div>
      <div className="text-[#4A4A4A] text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export default function Result() {
  const { responseId } = useParams<{ responseId: string }>();
  const [data, setData] = useState<{ result: any; response?: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!responseId) return;
    fetchResult(responseId)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        if (err?.response?.status === 402) {
          setError("Payment is required to view this report.");
        } else {
          setError("Assessment report could not be found.");
        }
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px]">
        <div className="w-12 h-12 border-3 border-[#A38771] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#2C3338] font-serif font-bold tracking-widest uppercase text-sm">
          Compiling Psychological Assessment Report...
        </p>
      </div>
    );
  }

  if (error || !data?.result) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] px-4">
        <div className="bg-white border border-red-200 px-8 py-10 max-w-md w-full text-center shadow-sm rounded-md">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-4 text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-serif font-bold text-[#2C3338] mb-2">Notice</h2>
          <p className="text-sm text-[#596573] mb-6">{error || "Unable to display report."}</p>
          <Link
            to="/tests"
            className="inline-block bg-[#2C3338] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-sm hover:bg-black transition-colors"
          >
            Back to Assessment Directory
          </Link>
        </div>
      </div>
    );
  }

  const result = data.result;
  const participantInfo = data.response?.personalInfo;
  const submittedDate = data.response?.submittedAt
    ? new Date(data.response.submittedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] lg:pl-[50px] pt-24 pb-20 px-4 sm:px-6">
      {/* Top Action Header (Hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
        <Link
          to="/tests"
          className="text-xs font-bold uppercase tracking-widest text-[#596573] hover:text-[#2C3338] flex items-center gap-2 transition-colors"
        >
          ← Assessment Directory
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="bg-[#2C3338] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-sm transition-all flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zM9 9h6a2 2 0 002-2V4a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2z" />
            </svg>
            <span>Download / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="max-w-4xl mx-auto bg-white border border-[#EAEFF0] shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-md overflow-hidden p-6 sm:p-12 print:border-none print:shadow-none print:p-0">
        
        {/* Clinical Document Header */}
        <div className="border-b border-[#EAEFF0] pb-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5DBB4D]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A38771]">
                  Why Not You Psychometric Services
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C3338] tracking-tight">
                Psychometric Evaluation Report
              </h1>
              <p className="text-xs text-[#7A8691] mt-1">
                Standardized Clinical Screening & Assessment Instrument
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-[#596573] border-l-2 sm:border-l-0 sm:border-r-2 border-[#A38771] pl-3 sm:pl-0 sm:pr-3 py-1">
              <div><span className="font-semibold text-[#2C3338]">Report ID:</span> WNY-{responseId?.slice(-6).toUpperCase()}</div>
              <div><span className="font-semibold text-[#2C3338]">Date Issued:</span> {submittedDate}</div>
              <div><span className="font-semibold text-[#2C3338]">Status:</span> Completed & Verified</div>
            </div>
          </div>

          {/* Participant Profile Card */}
          {participantInfo && (
            <div className="mt-6 p-4 sm:p-5 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#7A8691] uppercase tracking-wider block font-semibold text-[10px]">Participant</span>
                <span className="font-bold text-[#2C3338] text-sm mt-0.5 block">{participantInfo.name || "Anonymous"}</span>
              </div>
              <div>
                <span className="text-[#7A8691] uppercase tracking-wider block font-semibold text-[10px]">Email Record</span>
                <span className="text-[#2C3338] font-medium mt-0.5 block truncate">{participantInfo.email || "Confidential"}</span>
              </div>
              <div>
                <span className="text-[#7A8691] uppercase tracking-wider block font-semibold text-[10px]">Age Range</span>
                <span className="text-[#2C3338] font-medium mt-0.5 block">{participantInfo.age || "18+"}</span>
              </div>
              <div>
                <span className="text-[#7A8691] uppercase tracking-wider block font-semibold text-[10px]">Gender</span>
                <span className="text-[#2C3338] font-medium mt-0.5 block">{participantInfo.gender || "Not specified"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Test Specific Results */}
        {result.scoringType === "sum_and_band" && <FadssReport r={result} />}
        {result.scoringType === "vector_matching" && <CfiReport r={result} />}
        {result.scoringType === "domain_pomp_composite" && <PcsReport r={result} />}
        {result.scoringType === "domain_mean_average" && <RrsReport r={result} />}
        {result.scoringType === "mcrrs_triage" && <McrrsReport r={result} />}

        {/* Legal & Clinical Disclaimer Footer */}
        <div className="mt-12 pt-6 border-t border-[#EAEFF0] text-[11px] text-[#7A8691] leading-relaxed">
          <p className="mb-2">
            <span className="font-bold text-[#2C3338]">Clinical & Legal Disclaimer:</span> This assessment report is compiled from self-report psychometric instruments and serves exclusively for screening, self-reflection, and developmental insight. It does not constitute a formal psychiatric diagnosis, clinical prognosis, or custodial/legal judgment.
          </p>
          <p>© {new Date().getFullYear()} Why Not You Assessment Center. Payment & response logs are stored in encrypted form in accordance with applicable privacy legislation.</p>
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   1. FADSS DETAILED REPORT (Frustration, Anxiety, Depression, Stress Scale)
   ========================================================================= */
function FadssReport({ r }: { r: Record<string, any> }) {
  const constructKeys = Object.keys(r.constructResults);
  const overallRank = r.overallState?.rank ?? 0;

  return (
    <div className="space-y-6">
      {/* Overall Mental State Severity Banner */}
      <div className={`p-6 sm:p-8 border rounded-sm text-center ${rankColor[overallRank]}`}>
        <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 block mb-2">
          Overall Mental Wellbeing State
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3">
          {r.overallState?.label_en || r.overallState?.label_bn}
        </h2>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed">
          {r.overallState?.message_en || r.overallState?.message_bn}
        </p>

        {r.dominant?.length > 0 && (
          <div className="mt-4 pt-3 border-t border-current/20 inline-block text-xs font-semibold tracking-wider uppercase">
            Primary Area of Impact: <span className="underline font-bold">{r.dominant.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Referral & Crisis Note if flagged */}
      {(r.referral || r.crisisNote) && (
        <div className="bg-rose-50 border border-rose-300 text-rose-900 p-6 rounded-sm text-sm leading-relaxed space-y-2">
          {r.referral && (
            <p className="font-medium">
              ⚠️ <span className="font-bold">Consultation Recommended:</span> {r.referral}
            </p>
          )}
          {r.crisisNote && (
            <p className="bg-white/80 p-3 rounded-sm border border-rose-200 text-xs">
              🆘 {r.crisisNote}
            </p>
          )}
        </div>
      )}

      {/* 4 Constructs Comparative Grid */}
      <Section title="Comparative Psychological Domain Analysis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {constructKeys.map((key) => {
            const cr = r.constructResults[key];
            const pct = cr.score !== null ? (cr.score / cr.maxScore) * 100 : 0;
            const rank = cr.band?.rank ?? 0;

            return (
              <div key={key} className="bg-[#FAF7F2] p-5 border border-[#EAEFF0] rounded-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-serif font-bold text-base text-[#2C3338]">
                      {cr.name_en || cr.name_bn}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#A38771]">
                      {cr.score ?? "—"} <span className="text-gray-400 font-normal">/ {cr.maxScore}</span>
                    </span>
                  </div>

                  {/* Severity Bar */}
                  <div className="h-2 bg-[#EAEFF0] rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all duration-500 ${
                        rank >= 3 ? "bg-rose-500" : rank === 2 ? "bg-amber-500" : "bg-[#5DBB4D]"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7A8691]">Severity Band:</span>
                  <span className={`px-2.5 py-0.5 font-bold uppercase tracking-wider rounded-sm text-[11px] border ${rankColor[rank]}`}>
                    {cr.band?.label_en || cr.band?.label_bn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Interpretations and Action Steps */}
      <Section title="Domain Interpretations & Evidence-Based Guidance">
        <div className="space-y-6">
          {constructKeys.map((key) => {
            const cr = r.constructResults[key];
            if (!cr.interpretation) return null;

            return (
              <div key={key} className="border-b border-[#EAEFF0] pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif font-bold text-base text-[#2C3338]">
                    {cr.name_en || cr.name_bn}
                  </h3>
                  <span className="text-xs text-[#7A8691]">·</span>
                  <span className="text-xs font-bold text-[#A38771] uppercase tracking-wider">
                    {cr.band?.label_en || cr.band?.label_bn}
                  </span>
                </div>

                <p className="text-sm text-[#596573] leading-relaxed mb-4">
                  {cr.interpretation.en || cr.interpretation.bn}
                </p>

                {(cr.interpretation.actions_en || cr.interpretation.actions_bn)?.length > 0 && (
                  <div className="bg-[#FAF7F2] p-4 rounded-sm border border-[#EAEFF0]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2C3338] block mb-2">
                      Recommended Action Steps:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#596573]">
                      {(cr.interpretation.actions_en || cr.interpretation.actions_bn).map((act: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#A38771] mt-0.5">✔</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Helplines Directory */}
      {r.helplines?.length > 0 && (
        <Section title="Immediate Mental Health Support & Helplines">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {r.helplines.map((h: any, i: number) => (
              <div key={i} className="p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm flex justify-between items-center">
                <div>
                  <div className="font-bold text-xs text-[#2C3338] mb-0.5">{h.name_en || h.name_bn}</div>
                  <div className="text-[11px] text-[#7A8691]">{h.hours_en || h.hours_bn || "Support Service"}</div>
                </div>
                <a
                  href={`tel:${h.number}`}
                  className="px-3 py-1.5 bg-[#2C3338] text-white font-mono text-xs font-bold rounded-sm hover:bg-black transition-colors"
                >
                  {h.number}
                </a>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/* =========================================================================
   2. CFI-BD DETAILED REPORT (Career Fit Inventory - Bangladesh)
   ========================================================================= */
function CfiReport({ r }: { r: Record<string, any> }) {
  const codeEn = r.hollandCode
    ?.map((t: string) => r.typeLabels_en?.[t] || r.typeLabels_bn?.[t] || t)
    .join(" · ");

  return (
    <div className="space-y-6">
      {/* Holland RIASEC Header Card */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#EAEFF0] text-center rounded-sm">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A38771] font-bold block mb-2">
          Your Primary Occupational Profile
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C3338] mb-4">
          Holland Code: {r.hollandCode?.join("")} ({codeEn})
        </h2>

        <div className="flex justify-center gap-2 mb-4">
          {r.hollandCode?.map((code: string) => (
            <span
              key={code}
              className="w-12 h-12 bg-white border border-[#EAEFF0] text-[#2C3338] font-mono font-bold text-lg rounded-sm flex items-center justify-center shadow-sm"
            >
              {code}
            </span>
          ))}
        </div>

        <div className="text-xs text-[#7A8691] flex justify-center gap-4">
          <span>Clarity: <strong className="text-[#2C3338]">{r.clarity?.toFixed(1)}</strong></span>
          <span>Coherence: <strong className="text-[#2C3338]">{r.coherence}/3</strong></span>
          <span>Track: <strong className="text-[#2C3338]">{r.track}</strong></span>
        </div>
      </div>

      {/* Interests & Confidence Table */}
      <Section title="Interest vs. Confidence Dimensions">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="border-b border-[#EAEFF0] text-[#7A8691] uppercase tracking-wider text-[11px]">
                <th className="py-2.5 font-bold">Holland Type</th>
                <th className="py-2.5 text-right font-bold">Interest (0–100)</th>
                <th className="py-2.5 text-right font-bold">Confidence (0–100)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(r.typeLabels_en || r.typeLabels_bn || {}).map((t) => (
                <tr key={t} className="border-b border-[#EAEFF0] hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 font-semibold text-[#2C3338]">
                    {r.typeLabels_en?.[t] || r.typeLabels_bn?.[t]} ({t})
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-[#A38771]">
                    {r.interest?.[t]?.toFixed(1)}
                  </td>
                  <td className="py-3 text-right font-mono font-medium text-[#2C3338]">
                    {r.confidence?.[t]?.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Matched Careers */}
      <Section title={`Top Career Pathways (${r.matches?.length || 0} Matches)`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {r.matches?.map((m: any, i: number) => (
            <div key={i} className="p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-[#2C3338] mb-0.5">{m.name_en || m.name_bn}</h4>
                <span className="text-[11px] text-[#7A8691] uppercase tracking-wider block">{m.cluster}</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-base text-[#A38771] block">
                  {m.match?.toFixed(1)}%
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border rounded-sm ${cfiBandClass(m.band?.label_en)}`}>
                  {m.band?.label_en || m.band?.label_bn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Cross-Cutting Skills & Training */}
      {r.crossCuttingSkills?.length > 0 && (
        <Section title="High-Priority Skill Recommendations">
          <div className="space-y-3">
            {r.crossCuttingSkills.map((s: any, i: number) => (
              <div key={i} className="p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-xs text-[#2C3338] uppercase tracking-wider">{s.name_en || s.name_bn}</h4>
                  <span className="text-[11px] text-[#7A8691] font-mono">{s.provider}</span>
                </div>
                <p className="text-xs text-[#596573] leading-relaxed mt-1">
                  Targeted developmental priority aligned with your interest profile.
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Overseas Pathways if triggered */}
      {r.overseas && (
        <Section title="Overseas Employment Opportunities & Precautions">
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-sm text-xs leading-relaxed">
              ⚠️ {r.overseas.fraudWarning_en || r.overseas.fraudWarning_bn}
            </div>
            {r.overseas.sections?.map((sec: any, i: number) => (
              <div key={i} className="p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
                <h4 className="font-bold text-xs text-[#A38771] uppercase tracking-wider mb-2">{sec.cluster}</h4>
                <div className="space-y-2">
                  {sec.routes?.map((rt: any, j: number) => (
                    <div key={j} className="text-xs text-[#2C3338]">
                      <strong>{rt.t}</strong> — <span className="text-[#7A8691]">{rt.scope}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/* =========================================================================
   3. PCS-BD DETAILED REPORT (Parenting Capability Scale - Bangladesh)
   ========================================================================= */
function PcsReport({ r }: { r: Record<string, any> }) {
  const domainKeys = Object.keys(r.domainResults || {});

  return (
    <div className="space-y-6">
      {/* Overall Composite Parenting Index */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#EAEFF0] text-center rounded-sm">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A38771] font-bold block mb-2">
          Composite Parenting Capability Index
        </span>
        <div className="text-5xl font-mono font-bold text-[#2C3338] mb-3">
          {r.composite ?? "—"}
        </div>
        <span className="inline-block px-4 py-1.5 bg-white border border-[#EAEFF0] text-xs font-bold uppercase tracking-wider text-[#2C3338] rounded-sm shadow-sm">
          {r.compositeBand?.label_en || r.compositeBand?.label_bn || "Standard"}
        </span>

        {r.imNote && (
          <p className="mt-4 text-xs text-[#7A8691] max-w-lg mx-auto leading-relaxed border-t border-[#EAEFF0] pt-3">
            {r.imNote.note_en || r.imNote.note_bn}
          </p>
        )}
      </div>

      {/* Safeguarding Flags */}
      {r.flagsFired?.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 p-4 rounded-sm text-xs leading-relaxed">
          <strong>⚠️ Attention Points:</strong> Specific responses on {r.flagsFired.join(", ")} indicate areas where extra parental reflection or family balance may be particularly valuable.
        </div>
      )}

      {/* 7 Parenting Domains */}
      <Section title="Seven-Domain Parenting Competency Profile">
        <div className="space-y-3.5">
          {domainKeys.map((d) => {
            const dr = r.domainResults[d];
            return (
              <div key={d} className="p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-serif font-bold text-sm text-[#2C3338]">
                    {dr.name_en || dr.name_bn}
                  </span>
                  <span className="font-mono font-bold text-sm text-[#A38771]">
                    {dr.index ?? "—"}%
                  </span>
                </div>

                <div className="h-1.5 bg-[#EAEFF0] rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#A38771]" style={{ width: `${dr.index || 0}%` }} />
                </div>

                <div className="flex justify-end">
                  <span className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider bg-white border border-[#EAEFF0] rounded-sm text-[#596573]">
                    {dr.band?.label_en || dr.band?.label_bn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

/* =========================================================================
   4. RRS-24 REPORT (Responsibility & Reliability Scale)
   ========================================================================= */
function RrsReport({ r }: { r: Record<string, any> }) {
  const domainKeys = Object.keys(r.domainResults || {});

  return (
    <div className="space-y-6">
      {/* Overall Score Banner */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#EAEFF0] text-center rounded-sm">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A38771] font-bold block mb-2">
          Responsibility & Reliability Index
        </span>
        <div className="text-5xl font-mono font-bold text-[#2C3338] mb-1">
          {r.total?.scoreDisplay}
        </div>
        <span className="text-xs font-mono text-[#7A8691] block mb-3">out of 5.00</span>
        <span className="inline-block px-4 py-1.5 bg-white border border-[#EAEFF0] text-xs font-bold uppercase tracking-wider text-[#2C3338] rounded-sm shadow-sm">
          {r.total?.band?.label_en || r.total?.band?.label_bn}
        </span>
      </div>

      {/* 3 Core Domains */}
      <Section title="Three Core Responsibility Domains">
        <div className="space-y-4">
          {domainKeys.map((d) => {
            const dr = r.domainResults[d];
            return (
              <div key={d} className="p-5 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-serif font-bold text-base text-[#2C3338]">{dr.name_en || dr.name_bn}</h4>
                  <span className="font-mono font-bold text-base text-[#A38771]">{dr.scoreDisplay}</span>
                </div>
                <p className="text-xs text-[#596573] leading-relaxed mb-3">{dr.measures_en || dr.measures_bn}</p>
                <div className="h-1.5 bg-[#EAEFF0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#A38771]" style={{ width: `${(dr.score / 5) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Gap Analysis */}
      {r.gap && (
        <Section title="Domain Spread & Balance">
          <p className="text-xs text-[#596573] mb-4 leading-relaxed">
            {r.gap.reading_en || r.gap.reading_bn}
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
              <span className="text-[#7A8691] block text-[10px] uppercase tracking-wider">Highest Domain</span>
              <strong className="text-[#2C3338]">{r.domainResults[r.highestDomain]?.name_en || r.highestDomain}</strong>
            </div>
            <div className="p-3 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
              <span className="text-[#7A8691] block text-[10px] uppercase tracking-wider">Lowest Domain</span>
              <strong className="text-[#2C3338]">{r.domainResults[r.lowestDomain]?.name_en || r.lowestDomain}</strong>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}

/* =========================================================================
   5. MCRRS-BD REPORT (Marriage Compatibility & Relationship Readiness)
   ========================================================================= */
function McrrsReport({ r }: { r: Record<string, any> }) {
  const domainKeys = Object.keys(r.domainResults || {});

  if (r.careFlag) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-300 rounded-sm text-rose-900 space-y-4">
        <h3 className="font-serif font-bold text-lg">⚠️ Safety & Wellbeing Notice</h3>
        <p className="text-xs leading-relaxed">{r.tier4Message_en || r.tier4Message_bn}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#EAEFF0] text-center rounded-sm">
        <span className="text-xs uppercase tracking-[0.2em] text-[#A38771] font-bold block mb-2">
          Relationship Readiness & Compatibility Index
        </span>
        <div className="text-5xl font-mono font-bold text-[#2C3338] mb-3">
          {r.total?.index ?? "—"}
        </div>
        <span className="inline-block px-4 py-1.5 bg-white border border-[#EAEFF0] text-xs font-bold uppercase tracking-wider text-[#2C3338] rounded-sm shadow-sm">
          {r.total?.band?.label_en || r.total?.band?.label_bn || "Evaluated"}
        </span>
      </div>

      {/* 6 Domains Profile */}
      <Section title="Six-Domain Relationship Dynamics">
        <div className="space-y-3">
          {domainKeys.map((d) => {
            const dr = r.domainResults[d];
            return (
              <div key={d} className="p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-serif font-bold text-sm text-[#2C3338]">
                    {dr.name_en || dr.name_bn}
                  </span>
                  <span className="font-mono font-bold text-sm text-[#A38771]">
                    {dr.index ?? "—"}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#EAEFF0] rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-[#A38771]" style={{ width: `${dr.index || 0}%` }} />
                </div>
                <div className="flex justify-end">
                  <span className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider bg-white border border-[#EAEFF0] rounded-sm text-[#596573]">
                    {dr.band?.label_en || dr.band?.label_bn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}