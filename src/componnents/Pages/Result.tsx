import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchResult } from "../api/instruments";
import McrrsReportComponent from "./McrrsReport";

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

  // Completely isolated rendering for MCRR-BD reporting system
  if (result.scoringType === "mcrrs_triage") {
    return (
      <div className="w-full">
        <McrrsReportComponent
          r={result}
          responseId={responseId}
          submittedDate={submittedDate}
          personalInfo={participantInfo}
        />
      </div>
    );
  }

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
        {result.scoringType === "mcrrs_triage" && (
          <McrrsReportComponent
            r={result}
            responseId={responseId}
            submittedDate={submittedDate}
          />
        )}

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
  const [lang, setLang] = React.useState<"en" | "bn">("en");
  const isBn = lang === "bn";
  const tx = (en: any, bn: any) => (isBn ? bn : en) ?? en ?? bn;

  // Derived helpers
  const codeLabels = r.hollandCode
    ?.map((code: string) => tx(r.typeLabels_en?.[code], r.typeLabels_bn?.[code]) || code)
    .join(" · ");

  const bandStyle = (label_en: string) => {
    if (label_en?.toLowerCase().includes("strong")) return "text-emerald-700 font-bold";
    if (label_en?.toLowerCase().includes("good")) return "text-sky-700 font-bold";
    return "text-gray-600";
  };

  const typeLabel = (code: string) => tx(r.typeLabels_en?.[code], r.typeLabels_bn?.[code]) || code;

  // Cluster summaries built from matches
  const clusterMap: Record<string, { count: number; whyEn: string; whyBn: string }> = {};
  (r.matches || []).forEach((m: any) => {
    if (!clusterMap[m.cluster]) {
      clusterMap[m.cluster] = { count: 0, whyEn: m.cluster_why_en || "", whyBn: m.cluster_why_bn || "" };
    }
    clusterMap[m.cluster].count++;
  });
  const topClusters = Object.entries(clusterMap).slice(0, 5);

  const maxMatch = Math.max(...(r.matches || []).map((m: any) => m.match || 0), 1);

  const kindColor: Record<string, string> = {
    free: "text-green-700 bg-green-50 border-green-200",
    short: "text-blue-700 bg-blue-50 border-blue-200",
    diploma: "text-violet-700 bg-violet-50 border-violet-200",
    degree: "text-amber-700 bg-amber-50 border-amber-200",
    certificate: "text-orange-700 bg-orange-50 border-orange-200",
  };
  const kindLabel: Record<string, { en: string; bn: string }> = {
    free: { en: "Free", bn: "বিনামূল্যে" },
    short: { en: "Short course", bn: "স্বল্পমেয়াদী" },
    diploma: { en: "Diploma", bn: "ডিপ্লোমা" },
    degree: { en: "Degree", bn: "ডিগ্রি" },
    certificate: { en: "Certificate", bn: "সার্টিফিকেট" },
  };

  // Coherence note text
  const code0 = r.hollandCode?.[0];
  const code1 = r.hollandCode?.[1];
  const coherenceNote = r.coherence >= 2
    ? tx(
        `Your top two interests — ${typeLabel(code0)} and ${typeLabel(code1)} — sit next to each other on the hexagon. That means they are not in competition. Occupations that use both at once are not rare, so you will not have to give up one for the other.\n\nThis is your largest single advantage. Many people have top two interests that sit opposite each other, which forces them to satisfy one at work and the other outside it. You do not face that.`,
        `আপনার শীর্ষ দুটি আগ্রহ — ${typeLabel(code0)} এবং ${typeLabel(code1)} — ষড়ভুজে পাশাপাশি বসে। এর মানে তারা প্রতিযোগিতায় নেই। উভয়কে একসাথে ব্যবহার করে এমন পেশা বিরল নয়, তাই একটির জন্য অন্যটি ছেড়ে দিতে হবে না।\n\nএটি আপনার সবচেয়ে বড় একক সুবিধা।`
      )
    : null;

  return (
    <div className="space-y-10">

      {/* ── Language Toggle ── */}
      <div className="flex justify-end print:hidden">
        <div className="inline-flex border border-[#EAEFF0] rounded-sm overflow-hidden text-xs font-bold">
          <button onClick={() => setLang("en")} className={`px-4 py-2 transition-colors ${lang === "en" ? "bg-[#2C3338] text-white" : "bg-white text-[#596573] hover:bg-[#FAF7F2]"}`}>English</button>
          <button onClick={() => setLang("bn")} className={`px-4 py-2 transition-colors ${lang === "bn" ? "bg-[#2C3338] text-white" : "bg-white text-[#596573] hover:bg-[#FAF7F2]"}`}>বাংলা</button>
        </div>
      </div>

      {/* ── Cover Card ── */}
      <div className="border border-[#C8A96E] rounded-sm p-8 sm:p-12 text-center bg-white">
        <p className="text-sm italic text-[#7A8691] mb-3 font-serif">{tx("Your type", "আপনার ধরন")}</p>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A2332] mb-4 leading-tight">{codeLabels}</h2>
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#7A8691]">
          {tx("Code:", "কোড:")} <strong className="text-[#2C3338] tracking-widest">{r.hollandCode?.join("")}</strong>
        </p>
      </div>

      {/* ── Intro paragraphs ── */}
      <div className="text-[#2C3338] leading-[1.9] text-sm space-y-4 text-justify font-serif">
        <p>
          {tx(
            "The questionnaire you completed is built on the most widely used and most heavily researched framework in career psychology — the theory of vocational personality developed by Dr John Holland, an American psychologist. Universities, large employers and government career services have used this method to help people choose work for seventy years. O*NET, the occupational database of the United States Department of Labor, is built on it.",
            "আপনি যে প্রশ্নমালাটি পূরণ করেছেন তা ক্যারিয়ার মনোবিজ্ঞানে সবচেয়ে বেশি ব্যবহৃত এবং সবচেয়ে বেশি গবেষণা-পরীক্ষিত কাঠামোর উপর ভিত্তি করে তৈরি — আমেরিকান মনোবিজ্ঞানী ড. জন হল্যান্ড প্রণীত বৃত্তিমূলক ব্যক্তিত্বের তত্ত্ব। বিশ্ববিদ্যালয়, বড় নিয়োগকর্তা এবং সরকারি ক্যারিয়ার সেবাগুলো সত্তর বছর ধরে এই পদ্ধতি ব্যবহার করে আসছে।"
          )}
        </p>
        <p>
          {tx(
            "The Career Fit Inventory – Bangladesh applies that international method to Bangladeshi conditions. Not a list of foreign occupations — 85 Bangladeshi ones, with their real entry routes, the institutions you would apply to, and the authority that regulates each. The answer you receive is about the labour market you actually live in.",
            "ক্যারিয়ার ফিট ইনভেন্টরি – বাংলাদেশ সেই আন্তর্জাতিক পদ্ধতিটি বাংলাদেশের পরিপ্রেক্ষিতে প্রয়োগ করে। বিদেশি পেশার তালিকা নয় — ৮৫টি বাংলাদেশি পেশা, তাদের বাস্তব প্রবেশ পথ, যে প্রতিষ্ঠানে আবেদন করতে হবে, এবং যে কর্তৃপক্ষ সেগুলো নিয়ন্ত্রণ করে।"
          )}
        </p>
      </div>

      {/* ── What you will find box ── */}
      <div className="border border-[#C8A96E] bg-[#FDF8F0] rounded-sm p-5 sm:p-7">
        <h3 className="font-bold text-[#2C3338] text-sm mb-4">{tx("What you will find in this report", "এই রিপোর্টে যা পাবেন")}</h3>
        <ol className="space-y-2 text-sm text-[#2C3338] list-decimal list-inside">
          {[
            tx("The work fields and occupations that suit you best", "আপনার সবচেয়ে উপযুক্ত কর্মক্ষেত্র ও পেশা"),
            tx("The exact route into each — which institution, which examination", "প্রতিটিতে প্রবেশের সঠিক পথ — কোন প্রতিষ্ঠান, কোন পরীক্ষা"),
            tx("What to study, from your HSC group to your degree", "কী পড়বেন — এইচএসসি গ্রুপ থেকে ডিগ্রি পর্যন্ত"),
            tx("Which training and skills will make you competent", "কোন প্রশিক্ষণ ও দক্ষতা আপনাকে দক্ষ করবে"),
            tx("Which online courses and YouTube channels will help you", "কোন অনলাইন কোর্স ও ইউটিউব চ্যানেল আপনাকে সাহায্য করবে"),
            tx("Which extracurricular activities suit your type", "কোন সহশিক্ষা কার্যক্রম আপনার ধরনের সাথে মানানসই"),
            tx("Study and work opportunities abroad, and how to verify them", "বিদেশে পড়াশোনা ও কাজের সুযোগ এবং সেগুলো যাচাই করার পদ্ধতি"),
            tx("What to do in the next 30 days", "আগামী ৩০ দিনে কী করবেন"),
          ].map((item, i) => <li key={i}>{item}</li>)}
        </ol>
        <p className="mt-5 text-xs text-[#596573] italic leading-relaxed font-serif">
          {tx(
            "This is not a report to read once and put away. Keep it, show it to your family, discuss it with a counsellor, and take it to people who already do this work. A young person who actually follows the steps in a report like this is usually two to three years ahead of their peers — because their decisions rest on information rather than guesswork.",
            "এই রিপোর্ট একবার পড়ে রেখে দেওয়ার জন্য নয়। এটি রাখুন, পরিবারকে দেখান, কাউন্সেলরের সাথে আলোচনা করুন। এ ধরনের রিপোর্টের পদক্ষেপগুলো সত্যিই অনুসরণকারী একজন তরুণ সাধারণত তার সমবয়সীদের চেয়ে দুই-তিন বছর এগিয়ে থাকেন।"
          )}
        </p>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 1 — The work fields that suit you
          ══════════════════════════════════════════════ */}
      <div>
        <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
          <span className="text-2xl font-serif font-bold text-[#A38771]">1</span>
          <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("The work fields that suit you", "আপনার উপযুক্ত কর্মক্ষেত্র")}</h3>
        </div>

        {r.clarityVerdict === "FLAT" ? (
          <p className="text-sm text-[#596573] italic font-serif leading-relaxed">
            {tx(
              "Your interest profile is evenly spread — scores are similar across all work types. This makes it harder to identify a dominant field. The occupations below are still useful for exploration.",
              "আপনার আগ্রহ প্রোফাইল সমানভাবে বিস্তৃত — সব ধরনের কাজে স্কোর প্রায় কাছাকাছি। এতে প্রধান ক্ষেত্র চিহ্নিত করা কঠিন। নিচের পেশাগুলো অনুসন্ধানের জন্য উপযোগী।"
            )}
          </p>
        ) : (
          <>
            <p className="text-sm text-[#2C3338] font-serif leading-relaxed mb-5">
              {tx(
                `Your answers place you most strongly in ${topClusters.length > 1 ? "three" : "one"} field${topClusters.length > 1 ? "s" : ""}. ${topClusters.length > 1 ? "All " + topClusters.length + " are work with people — teaching, caring, and helping someone move forward through creative means." : ""}`,
                `আপনার উত্তরগুলো আপনাকে সবচেয়ে শক্তিশালীভাবে ${topClusters.length > 1 ? "তিনটি" : "একটি"} ক্ষেত্রে স্থান দেয়।`
              )}
            </p>

            {/* Cluster summary table */}
            <div className="overflow-x-auto rounded-sm border border-[#EAEFF0] mb-6">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-bold">{tx("Work field", "কর্মক্ষেত্র")}</th>
                    <th className="px-4 py-3 font-bold">{tx("Why it matches you", "কেন আপনার সাথে মেলে")}</th>
                    <th className="px-4 py-3 font-bold whitespace-nowrap">{tx("Occupations here", "এখানে পেশা")}</th>
                  </tr>
                </thead>
                <tbody>
                  {topClusters.map(([cluster, info], i) => (
                    <tr key={cluster} className={`border-b border-[#EAEFF0] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                      <td className="px-4 py-3 font-semibold text-[#2C3338] text-sm align-top">{cluster}</td>
                      <td className="px-4 py-3 text-[#4A4A4A] text-sm align-top leading-relaxed">
                        {tx(info.whyEn, info.whyBn) || tx("Matches your interest and confidence profile", "আপনার আগ্রহ ও আত্মবিশ্বাসের সাথে মেলে")}
                      </td>
                      <td className="px-4 py-3 text-[#596573] text-sm align-top whitespace-nowrap">
                        {info.count} {tx("occupations", "টি পেশা")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Coherence note */}
            {coherenceNote && (
              <div className="border border-[#C8A96E] bg-[#FDF8F0] rounded-sm p-5">
                <p className="font-bold text-sm text-[#2C3338] mb-3">{tx("One thing worth noticing", "একটি লক্ষণীয় বিষয়")}</p>
                {coherenceNote.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-[#4A4A4A] leading-relaxed font-serif mb-2 last:mb-0">{para}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 2 — Occupations matched to you
          ══════════════════════════════════════════════ */}
      <div>
        <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
          <span className="text-2xl font-serif font-bold text-[#A38771]">2</span>
          <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("Occupations matched to you", "আপনার সাথে মিলে যাওয়া পেশাসমূহ")}</h3>
        </div>

        <p className="text-sm text-[#2C3338] font-serif leading-relaxed mb-5">
          {tx(
            "Your profile was compared against all 85 Bangladeshi occupations in the database. None was excluded in advance and none was chosen by hand. Each was tested on three separate things — what you enjoy (45%), what you believe you can learn (30%), and what you want from work (25%).",
            "আপনার প্রোফাইল ডেটাবেজের ৮৫টি বাংলাদেশি পেশার সাথে তুলনা করা হয়েছে। কোনোটিই আগে থেকে বাদ দেওয়া হয়নি। প্রতিটি তিনটি বিষয়ে পরীক্ষা করা হয়েছে — আপনি কী উপভোগ করেন (৪৫%), আপনি কী শিখতে পারবেন মনে করেন (৩০%), এবং কাজ থেকে কী চান (২৫%)।"
          )}
        </p>

        {/* Bar chart — top 6 matches */}
        <div className="mb-5">
          <p className="text-xs font-bold text-[#596573] uppercase tracking-wider mb-3">{tx("Your strongest matches", "আপনার সবচেয়ে শক্তিশালী মিল")}</p>
          <div className="relative">
            {/* Score markers */}
            <div className="flex text-[10px] text-[#7A8691] mb-1 ml-[180px] sm:ml-[220px] gap-0">
              {[55, 75].map(v => (
                <span key={v} style={{ left: `${((v - 50) / 50) * 100}%` }} className="absolute text-[10px] text-[#7A8691]">
                  {v}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              {r.matches?.slice(0, 6).map((m: any, i: number) => {
                const pct = Math.min(100, Math.max(0, ((m.match - 50) / 50) * 100));
                const isStrong = m.match >= 75;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-[#4A4A4A] text-right shrink-0 w-[160px] sm:w-[200px] truncate font-serif">{tx(m.name_en, m.name_bn)}</span>
                    <div className="flex-1 bg-[#E8F0E8] rounded-sm h-5 relative overflow-hidden">
                      <div
                        className={`h-full rounded-sm transition-all ${isStrong ? "bg-[#3A7A3A]" : "bg-[#6BAD6B]"}`}
                        style={{ width: `${Math.max(10, pct)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#2C3338] w-8 text-right font-mono">{Math.round(m.match)}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-[#7A8691] mt-2 italic font-serif">
              {tx("Figure 1 · Your six strongest matches. Green = strong match (75+)", "চিত্র ১ · আপনার ছয়টি শক্তিশালী মিল। সবুজ = শক্তিশালী মিল (৭৫+)")}
            </p>
          </div>
        </div>

        {/* Full occupation table */}
        <div className="overflow-x-auto rounded-sm border border-[#EAEFF0]">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-bold w-8">#</th>
                <th className="px-4 py-3 font-bold">{tx("Occupation", "পেশা")}</th>
                <th className="px-4 py-3 font-bold text-right">{tx("Match", "মিল")}</th>
                <th className="px-4 py-3 font-bold">{tx("Band", "স্তর")}</th>
              </tr>
            </thead>
            <tbody>
              {r.matches?.map((m: any, i: number) => (
                <tr key={i} className={`border-b border-[#EAEFF0] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                  <td className="px-4 py-2.5 text-[#A38771] font-mono text-xs">{i + 1}</td>
                  <td className="px-4 py-2.5 font-semibold text-[#2C3338]">{tx(m.name_en, m.name_bn)}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-[#2C3338]">{Math.round(m.match)}</td>
                  <td className={`px-4 py-2.5 text-sm ${bandStyle(m.band?.label_en)}`}>{tx(m.band?.label_en, m.band?.label_bn)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Treat as equal note */}
        <p className="text-xs text-[#596573] italic mt-3 font-serif leading-relaxed">
          {tx(
            "Treat any two occupations within three points of each other as equal. Your first three carry the same score — all three suit you equally well, and the choice between them will rest on what kind of setting you want to work in, not on the number.",
            "যেকোনো দুটো পেশা যদি তিন পয়েন্টের মধ্যে থাকে সেগুলো সমান মনে করুন। আপনার প্রথম তিনটি একই স্কোর বহন করে — তিনটিই সমানভাবে আপনার উপযুক্ত।"
          )}
        </p>

        {/* What happens box */}
        <div className="mt-4 border border-[#C8A96E] bg-[#FDF8F0] rounded-sm p-5">
          <p className="font-bold text-sm text-[#2C3338] mb-2">{tx("What happens for almost everyone", "প্রায় সবার ক্ষেত্রেই যা ঘটে")}</p>
          <p className="text-sm text-[#4A4A4A] leading-relaxed font-serif">
            {tx(
              "At least one occupation near the top of the list is one the respondent has never considered — usually because nobody they know does that work. In your case it may be Art Therapist or Special Education Teacher. Those are the most valuable part of the list. Look at them before you look at the occupations you had already thought of.",
              "তালিকার শীর্ষের কাছাকাছি অন্তত একটি পেশা এমন যেটি উত্তরদাতা আগে কখনো বিবেচনা করেননি। এগুলোই তালিকার সবচেয়ে মূল্যবান অংশ। আপনি যে পেশাগুলো আগেই ভেবেছিলেন তা দেখার আগে এগুলো দেখুন।"
            )}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 3 — How to get there
          ══════════════════════════════════════════════ */}
      {r.pathways?.length > 0 && (
        <div>
          <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#A38771]">3</span>
            <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("How to get there", "সেখানে কীভাবে যাবেন")}</h3>
          </div>
          <p className="text-sm text-[#2C3338] font-serif leading-relaxed mb-5">
            {r.track === "A"
              ? tx("You have just finished HSC, so the routes below are written from that point. Beside each is the institution where you can verify the information yourself.",
                  "আপনি সবে এইচএসসি শেষ করেছেন, তাই নিচের পথগুলো সেই বিন্দু থেকে লেখা হয়েছে। প্রতিটির পাশে সেই প্রতিষ্ঠান আছে যেখানে আপনি নিজে তথ্যটি যাচাই করতে পারবেন।")
              : tx("You are at university or have graduated. The routes below show what comes next from your current stage.",
                  "আপনি বিশ্ববিদ্যালয়ে আছেন বা স্নাতক সম্পন্ন করেছেন। নিচের পথগুলো আপনার বর্তমান অবস্থান থেকে পরবর্তী পদক্ষেপ দেখাচ্ছে।")}
          </p>

          {r.pathways.map((sec: any, si: number) => (
            <div key={si} className="mb-6">
              <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">{tx(`For ${sec.cluster}`, `${sec.cluster}-এর জন্য`)}</p>
              <div className="overflow-x-auto rounded-sm border border-[#EAEFF0]">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                      <th className="px-3 py-2.5 font-bold">{tx("Occupation", "পেশা")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Your next step", "আপনার পরবর্তী পদক্ষেপ")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Where to verify", "যেখানে যাচাই করবেন")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.entries.map((e: any, ei: number) => (
                      <tr key={ei} className={`border-b border-[#EAEFF0] last:border-b-0 ${ei % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                        <td className="px-3 py-2.5 font-semibold text-[#2C3338] align-top">{tx(e.occ_en, e.occ_bn)}</td>
                        <td className="px-3 py-2.5 text-[#4A4A4A] align-top">{tx(e.next_en, e.next_bn)}</td>
                        <td className="px-3 py-2.5 align-top">
                          <div className="font-semibold text-[#2C3338] text-xs">{tx(e.institution_en, e.institution_bn)}</div>
                          <a href={`https://${e.verify_en}`} target="_blank" rel="noopener noreferrer" className="text-[#A38771] hover:underline text-[10px]">{e.verify_en}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="border border-[#C3E8C3] bg-[#F0FAF0] rounded-sm p-5">
            <p className="font-bold text-sm text-[#2C5F2E] mb-2">{tx("An important observation", "একটি গুরুত্বপূর্ণ পর্যবেক্ষণ")}</p>
            <p className="text-sm text-[#2C5F2E] leading-relaxed font-serif">
              {tx(
                "Notice that four of your top five occupations share the same first step: a degree in Psychology or Education. This means you do not have to choose between five paths right now. One decision keeps four doors open at once. At eighteen that is the intelligent move — choose the subject that keeps the largest number of options alive.",
                "লক্ষ্য করুন যে আপনার শীর্ষ পাঁচটি পেশার মধ্যে চারটির প্রথম পদক্ষেপ একই: মনোবিজ্ঞান বা শিক্ষায় ডিগ্রি। একটি সিদ্ধান্ত একসাথে চারটি দরজা খোলা রাখে।"
              )}
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 4 — What to study
          ══════════════════════════════════════════════ */}
      {r.hscGroup && r.hscGroup.sections?.length > 0 && r.track === "A" && (
        <div>
          <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#A38771]">4</span>
            <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("What to study", "কী পড়বেন")}</h3>
          </div>
          <p className="text-sm text-[#2C3338] font-serif leading-relaxed mb-5">
            {tx("To reach the occupations on your list, these are the group and the subjects that will take you there.", "আপনার তালিকার পেশায় পৌঁছাতে, এই গ্রুপ ও বিষয়গুলো আপনাকে সেখানে নিয়ে যাবে।")}
          </p>

          {/* HSC group box */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">{tx("Your HSC group", "আপনার এইচএসসি গ্রুপ")}</p>
            <p className="text-sm text-[#4A4A4A] font-serif leading-relaxed">{tx(r.hscGroup.note_en, r.hscGroup.note_bn)}</p>
          </div>

          {r.hscGroup.sections.map((sec: any, si: number) => (
            <div key={si} className="mb-6">
              <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">
                {tx("Degree subjects that match your list", "আপনার তালিকার সাথে মিলে যাওয়া ডিগ্রি বিষয়")}
                {r.hscGroup.sections.length > 1 && ` — ${sec.cluster}`}
              </p>
              <div className="overflow-x-auto rounded-sm border border-[#EAEFF0]">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                      <th className="px-3 py-2.5 font-bold">{tx("Subject", "বিষয়")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("How you enter", "কীভাবে ভর্তি হবেন")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Where it leads", "কোথায় নিয়ে যাবে")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.subjects.map((s: any, i: number) => (
                      <tr key={i} className={`border-b border-[#EAEFF0] last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                        <td className="px-3 py-2.5 font-semibold text-[#2C3338]">{tx(s.subject_en, s.subject_bn)}</td>
                        <td className="px-3 py-2.5 text-[#4A4A4A]">{tx(s.entry_en, s.entry_bn)}</td>
                        <td className="px-3 py-2.5 text-[#596573]">{tx(s.leads_en, s.leads_bn)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="mt-2">
            <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">{tx("Subjects to strengthen from now", "এখন থেকে যে বিষয়গুলো শক্তিশালী করবেন")}</p>
            <p className="text-sm text-[#4A4A4A] font-serif leading-relaxed">{tx(r.hscGroup.strengthenNow_en, r.hscGroup.strengthenNow_bn)}</p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 5 — Training and skills
          ══════════════════════════════════════════════ */}
      {r.training?.length > 0 && (
        <div>
          <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#A38771]">5</span>
            <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("Training and skills", "প্রশিক্ষণ ও দক্ষতা")}</h3>
          </div>
          <p className="text-sm text-[#2C3338] font-serif leading-relaxed mb-5">
            {tx(
              "A degree opens a door; training is what makes you competent to walk through it. The courses below relate directly to your strongest fields. You do not need all of them — choose the one that matches the path you intend to test first.",
              "একটি ডিগ্রি দরজা খুলে দেয়; প্রশিক্ষণ আপনাকে সেই দরজা দিয়ে হাঁটার যোগ্যতা দেয়।"
            )}
          </p>

          {r.training.map((sec: any, si: number) => (
            <div key={si} className="mb-6">
              <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">
                {tx(`For ${sec.cluster}`, `${sec.cluster}-এর জন্য`)}
              </p>
              <div className="overflow-x-auto rounded-sm border border-[#EAEFF0]">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                      <th className="px-3 py-2.5 font-bold">{tx("Course", "কোর্স")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Institution", "প্রতিষ্ঠান")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Type", "ধরন")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Length", "মেয়াদ")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.entries.map((e: any, i: number) => (
                      <tr key={i} className={`border-b border-[#EAEFF0] last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                        <td className="px-3 py-2.5 font-semibold text-[#2C3338]">{tx(e.en, e.bn) || e.bn}</td>
                        <td className="px-3 py-2.5 text-[#596573]">{e.provider}</td>
                        <td className="px-3 py-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${kindColor[e.kind] || "text-gray-600 bg-gray-50 border-gray-200"}`}>
                            {tx(kindLabel[e.kind]?.en, kindLabel[e.kind]?.bn) || e.kind}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-[#596573] text-xs">{e.dur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Cross-cutting skills table */}
          {r.crossCuttingSkills?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">{tx("Skills you will need whichever way you go", "যে পথেই যান এই দক্ষতাগুলো লাগবে")}</p>
              <div className="overflow-x-auto rounded-sm border border-[#EAEFF0]">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                      <th className="px-3 py-2.5 font-bold">{tx("Skill", "দক্ষতা")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Where to learn it", "কোথায় শিখবেন")}</th>
                      <th className="px-3 py-2.5 font-bold">{tx("Why it matters to you", "আপনার জন্য কেন গুরুত্বপূর্ণ")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.crossCuttingSkills.map((s: any, i: number) => (
                      <tr key={i} className={`border-b border-[#EAEFF0] last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                        <td className="px-3 py-2.5 font-semibold text-[#2C3338]">{tx(s.name_en, s.name_bn)}</td>
                        <td className="px-3 py-2.5 text-[#596573]">{s.provider}</td>
                        <td className="px-3 py-2.5 text-[#4A4A4A] font-serif text-xs leading-relaxed">{tx(s.why_en, s.why_bn) || tx("Directly relevant to your strongest occupations", "আপনার শক্তিশালী পেশাগুলোর জন্য সরাসরি প্রাসঙ্গিক")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-[#7A8691] mt-2 italic font-serif">
                {tx("Course names, lengths and fees change. Verify current details with the institution before committing money or time.", "কোর্সের নাম, মেয়াদ ও ফি পরিবর্তিত হতে পারে। অর্থ বা সময় ব্যয়ের আগে প্রতিষ্ঠানের সাথে বর্তমান তথ্য যাচাই করুন।")}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 6 — Online courses and YouTube
          ══════════════════════════════════════════════ */}
      {r.online && (
        <div>
          <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#A38771]">6</span>
            <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("Online courses and YouTube channels", "অনলাইন কোর্স ও ইউটিউব চ্যানেল")}</h3>
          </div>
          <p className="text-sm text-[#2C3338] font-serif leading-relaxed mb-5">
            {tx("Almost everything below is free, and you can begin today from home. None of it requires waiting for university admission.", "নিচের প্রায় সবকিছুই বিনামূল্যে, এবং আপনি আজ থেকেই বাড়িতে বসে শুরু করতে পারবেন।")}
          </p>

          {/* Online courses */}
          <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">{tx("Online courses", "অনলাইন কোর্স")}</p>
          <div className="overflow-x-auto rounded-sm border border-[#EAEFF0] mb-6">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                  <th className="px-3 py-2.5 font-bold">{tx("Course", "কোর্স")}</th>
                  <th className="px-3 py-2.5 font-bold">{tx("Platform", "প্ল্যাটফর্ম")}</th>
                  <th className="px-3 py-2.5 font-bold">{tx("Cost", "খরচ")}</th>
                </tr>
              </thead>
              <tbody>
                {r.online.courses.map((c: any, i: number) => (
                  <tr key={i} className={`border-b border-[#EAEFF0] last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                    <td className="px-3 py-2.5 font-semibold text-[#2C3338]">{tx(c.name_en, c.name_bn)}</td>
                    <td className="px-3 py-2.5 text-[#596573]">{c.platform}</td>
                    <td className="px-3 py-2.5 font-bold text-green-700 text-xs">{tx(c.cost_en, c.cost_bn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* YouTube channels */}
          <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-1">{tx("YouTube channels", "ইউটিউব চ্যানেল")}</p>
          <p className="text-[11px] text-[#7A8691] italic mb-2 font-serif">{tx("Search by name — links change, names do not.", "নাম দিয়ে সার্চ করুন — লিঙ্ক বদলায়, নাম বদলায় না।")}</p>
          <div className="overflow-x-auto rounded-sm border border-[#EAEFF0]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-[#2C3338] text-white text-xs uppercase tracking-wider">
                  <th className="px-3 py-2.5 font-bold">{tx("Channel", "চ্যানেল")}</th>
                  <th className="px-3 py-2.5 font-bold">{tx("Why it helps you", "কেন আপনার কাজে আসবে")}</th>
                </tr>
              </thead>
              <tbody>
                {r.online.youtube.map((y: any, i: number) => (
                  <tr key={i} className={`border-b border-[#EAEFF0] last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                    <td className="px-3 py-2.5 font-semibold text-[#2C3338] whitespace-nowrap">{tx(y.channel_en, y.channel_bn)}</td>
                    <td className="px-3 py-2.5 text-[#4A4A4A] font-serif text-xs leading-relaxed">{tx(y.why_en, y.why_bn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 7 — Extracurricular activities
          ══════════════════════════════════════════════ */}
      {r.extracurricular?.length > 0 && (
        <div>
          <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#A38771]">7</span>
            <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("Extracurricular activities", "সহশিক্ষা কার্যক্রম")}</h3>
          </div>
          <p className="text-sm text-[#2C3338] font-serif leading-relaxed mb-5">
            {tx(
              "These carry no marks in an admission test. But in a job interview, in a scholarship application, and in becoming sure of yourself, they are what make the difference. The activities below are matched to your own three types.",
              "এগুলো ভর্তি পরীক্ষায় কোনো নম্বর বহন করে না। কিন্তু চাকরির সাক্ষাৎকারে, বৃত্তির আবেদনে এগুলোই পার্থক্য তৈরি করে।"
            )}
          </p>
          {r.extracurricular.map((sec: any, si: number) => (
            <div key={si} className="mb-5">
              <p className="text-sm font-bold text-[#2C3338] mb-2">
                {tx(`For ${sec.label_en} — your ${si === 0 ? "highest" : si === 1 ? "second" : "third"}, at ${sec.score}`,
                    `${sec.label_bn}-এর জন্য — আপনার ${si === 0 ? "সর্বোচ্চ" : si === 1 ? "দ্বিতীয়" : "তৃতীয়"}, স্কোর ${sec.score}`)}
              </p>
              <ol className="space-y-2">
                {sec.activities.map((act: any, ai: number) => (
                  <li key={ai} className="flex items-start gap-3 text-sm text-[#4A4A4A] font-serif leading-relaxed">
                    <span className="text-[#A38771] font-bold shrink-0 w-5">{ai + 1}.</span>
                    <span>{tx(act.en, act.bn)}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 8 — Overseas
          ══════════════════════════════════════════════ */}
      {r.overseas && (
        <div>
          <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#A38771]">8</span>
            <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("Study and work opportunities abroad", "বিদেশে পড়াশোনা ও কাজের সুযোগ")}</h3>
          </div>
          <div className="border border-amber-300 bg-amber-50 rounded-sm p-4 text-sm text-amber-900 leading-relaxed mb-5 font-serif">
            ⚠️ {tx(r.overseas.fraudWarning_en, r.overseas.fraudWarning_bn)}
          </div>
          {r.overseas.sections?.map((sec: any, i: number) => (
            <div key={i} className="mb-4 p-4 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
              <p className="font-bold text-xs text-[#A38771] uppercase tracking-wider mb-2">{sec.cluster}</p>
              <div className="space-y-2">
                {sec.routes?.map((rt: any, j: number) => (
                  <div key={j} className="text-sm text-[#2C3338] font-serif">
                    <strong>{rt.t}</strong> <span className="text-[#7A8691]">({rt.auth})</span> — <span className="text-[#596573]">{rt.scope}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {r.overseas.showScholarships && r.overseas.scholarships?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-bold text-[#A38771] uppercase tracking-wider mb-2">{tx("Scholarships", "বৃত্তি")}</p>
              <div className="space-y-2">
                {r.overseas.scholarships.map((s: any, i: number) => (
                  <div key={i} className="p-3 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm text-sm font-serif">
                    <span className="font-semibold text-[#2C3338]">{s.name}</span> — <span className="text-[#596573]">{s.where}</span>
                    {s.note && <p className="text-[#7A8691] text-xs mt-1">{s.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 9 — What to do in the next 30 days
          ══════════════════════════════════════════════ */}
      {(r.nextSteps?.en?.length > 0 || r.nextSteps?.bn?.length > 0) && (
        <div>
          <div className="flex items-baseline gap-3 border-b border-[#C8A96E] pb-2 mb-4">
            <span className="text-2xl font-serif font-bold text-[#A38771]">9</span>
            <h3 className="text-xl font-serif font-bold text-[#1A2332]">{tx("What to do in the next 30 days", "আগামী ৩০ দিনে কী করবেন")}</h3>
          </div>
          <ol className="space-y-4">
            {(isBn ? r.nextSteps.bn : r.nextSteps.en).map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-[#2C3338] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">{i + 1}</span>
                <span className="text-sm text-[#2C3338] leading-relaxed font-serif">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          RIASEC Technical Profile (collapsible)
          ══════════════════════════════════════════════ */}
      <details className="group border border-[#EAEFF0] rounded-sm overflow-hidden">
        <summary className="bg-[#FAF7F2] px-5 py-3 cursor-pointer text-xs font-bold text-[#596573] uppercase tracking-wider select-none list-none flex justify-between items-center">
          {tx("Your RIASEC profile — Interest vs. Confidence", "আপনার RIASEC প্রোফাইল — আগ্রহ বনাম আত্মবিশ্বাস")}
          <span className="text-[#A38771] group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[#EAEFF0] text-[#7A8691] uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 font-bold">{tx("Holland Type", "হল্যান্ড ধরন")}</th>
                  <th className="py-2.5 text-right font-bold">{tx("Interest", "আগ্রহ")}</th>
                  <th className="py-2.5 text-right font-bold">{tx("Confidence", "আত্মবিশ্বাস")}</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(r.typeLabels_en || {}).map((code) => (
                  <tr key={code} className="border-b border-[#EAEFF0]">
                    <td className="py-2.5 font-semibold text-[#2C3338]">{tx(r.typeLabels_en?.[code], r.typeLabels_bn?.[code])} ({code})</td>
                    <td className="py-2.5 text-right font-mono font-bold text-[#A38771]">{r.interest?.[code]?.toFixed(1)}</td>
                    <td className="py-2.5 text-right font-mono text-[#2C3338]">{r.confidence?.[code]?.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-5 text-xs text-[#7A8691]">
            <span>{tx("Clarity", "স্বচ্ছতা")}: <strong className="text-[#2C3338]">{r.clarity?.toFixed(1)}</strong></span>
            <span>{tx("Coherence", "সংগতি")}: <strong className="text-[#2C3338]">{r.coherence}/3</strong></span>
            <span>{tx("Track", "ট্র্যাক")}: <strong className="text-[#2C3338]">{r.track}</strong></span>
          </div>
        </div>
      </details>

    </div>
  );
}

/* =========================================================================
   3. PCS-BD DETAILED REPORT (Parenting Capability Scale - Bangladesh)
   ========================================================================= */

// Domain colour palette (index → tailwind classes)
const DOMAIN_COLORS: Record<number, { bg: string; border: string; text: string; bar: string }> = {
  0: { bg: "bg-orange-50",  border: "border-orange-200", text: "text-orange-800", bar: "bg-orange-400" },
  1: { bg: "bg-blue-50",    border: "border-blue-200",   text: "text-blue-800",   bar: "bg-blue-400"   },
  2: { bg: "bg-teal-50",    border: "border-teal-200",   text: "text-teal-800",   bar: "bg-teal-500"   },
  3: { bg: "bg-violet-50",  border: "border-violet-200", text: "text-violet-800", bar: "bg-violet-400" },
  4: { bg: "bg-amber-50",   border: "border-amber-200",  text: "text-amber-800",  bar: "bg-amber-400"  },
  5: { bg: "bg-rose-50",    border: "border-rose-200",   text: "text-rose-700",   bar: "bg-rose-400"   },
  6: { bg: "bg-cyan-50",    border: "border-cyan-200",   text: "text-cyan-800",   bar: "bg-cyan-500"   },
};

function pcsBandMeta(score: number | null) {
  if (score === null) return { color: "bg-gray-400", label_en: "N/A", label_bn: "N/A" };
  if (score < 40)  return { color: "bg-rose-500",   label_en: "Needs Urgent Attention", label_bn: "জরুরি মনোযোগ প্রয়োজন" };
  if (score < 55)  return { color: "bg-orange-400", label_en: "Needs Attention",        label_bn: "মনোযোগ প্রয়োজন" };
  if (score < 70)  return { color: "bg-amber-400",  label_en: "Developing",             label_bn: "বিকাশমান" };
  if (score < 85)  return { color: "bg-emerald-500",label_en: "Effective",              label_bn: "কার্যকর" };
  return               { color: "bg-green-600",    label_en: "Highly Effective",       label_bn: "অত্যন্ত কার্যকর" };
}

// Static bilingual content (narratives, action plan, referrals)
const PCS_DOMAIN_NARRATIVES: Record<string, { icon: string; title_en: string; title_bn: string; high_en: string; high_bn: string; low_en: string; low_bn: string; tips_en: string[]; tips_bn: string[] }> = {
  TP: {
    icon: "⏰",
    title_en: "Time & Presence",
    title_bn: "সময় ও উপস্থিতি",
    high_en: "You are giving your child meaningful time — meals together, outdoor trips and joint activities. This consistent physical and emotional presence is one of the strongest predictors of a child's sense of security and self-worth.",
    high_bn: "আপনি সন্তানকে অর্থপূর্ণ সময় দিচ্ছেন — একসাথে খাওয়া, বাইরে যাওয়া এবং যৌথ কাজকর্ম। এই নিয়মিত শারীরিক ও আবেগীয় উপস্থিতি একটি শিশুর নিরাপত্তাবোধ ও আত্মসম্মানের সবচেয়ে শক্তিশালী পূর্বাভাসগুলোর একটি।",
    low_en: "Work and responsibilities are crowding out time with your child. Even 20 focused minutes a day — phone away, full attention — has measurable benefit. Quality matters more than quantity, but you need a minimum threshold.",
    low_bn: "কাজ ও দায়িত্ব সন্তানের সাথে সময় কমিয়ে ফেলছে। প্রতিদিন মাত্র ২০ মিনিট মনোযোগ দিয়ে সময় — ফোন সরিয়ে রেখে — পরিমাপযোগ্য উপকার করে। গুণমান পরিমাণের চেয়ে বেশি গুরুত্বপূর্ণ, কিন্তু একটি ন্যূনতম সীমা দরকার।",
    tips_en: ["Set a daily 'phone-free' window of 20–30 min during which only your child exists", "Eat at least one meal together daily — no screens at the table", "Plan one outing per week, even if it is just a walk to the park"],
    tips_bn: ["প্রতিদিন ২০–৩০ মিনিটের 'ফোন-মুক্ত' সময় রাখুন — শুধু সন্তানের জন্য", "প্রতিদিন অন্তত একবেলা একসাথে খান — টেবিলে স্ক্রিন নেই", "সপ্তাহে একটি বাইরে যাওয়ার পরিকল্পনা করুন, এমনকি পার্কে হাঁটতে যাওয়াও চলবে"],
  },
  MS: {
    icon: "🪞",
    title_en: "Modelling & Self-Regulation",
    title_bn: "আদর্শ আচরণ ও আত্মনিয়ন্ত্রণ",
    high_en: "You model composure, honesty and promise-keeping well. Children absorb character more through observation than instruction — your consistency here is quietly building your child's moral foundation.",
    high_bn: "আপনি সংযম, সততা এবং কথা রাখার উদাহরণ ভালোভাবে দেখাচ্ছেন। শিশুরা নির্দেশের চেয়ে পর্যবেক্ষণের মাধ্যমে বেশি চরিত্র গ্রহণ করে — এখানে আপনার ধারাবাহিকতা নীরবে আপনার সন্তানের নৈতিক ভিত্তি তৈরি করছে।",
    low_en: "Children are sharp observers. Quarrelling loudly in front of them, checking your phone while they speak, or small white lies all register deeply. The goal is not perfection — it is repairing quickly when you slip and naming what happened.",
    low_bn: "শিশুরা তীক্ষ্ণ পর্যবেক্ষক। তাদের সামনে জোরে ঝগড়া করা, তারা কথা বলার সময় ফোন দেখা বা ছোট সাদা মিথ্যা বলা — সবই গভীরভাবে নথিভুক্ত হয়। লক্ষ্য নিখুঁততা নয় — ভুল হলে দ্রুত মেরামত করা এবং কী হয়েছিল তা বলা।",
    tips_en: ["When you lose your temper, name it: 'I got angry and I shouldn't have — I'm sorry'", "Agree with your spouse on a signal to pause heated arguments before they reach the child", "Put your phone face-down for the first 15 min after you get home"],
    tips_bn: ["রাগ করলে স্বীকার করুন: 'আমি রাগ করেছিলাম এবং করা উচিত হয়নি — আমি দুঃখিত'", "সঙ্গীর সাথে একমত হোন যে তীব্র তর্ক সন্তানের কাছে পৌঁছানোর আগে থামানোর একটি সংকেত ব্যবহার করবেন", "বাড়ি ফেরার প্রথম ১৫ মিনিট ফোন উপুড় করে রাখুন"],
  },
  MG: {
    icon: "⚖️",
    title_en: "Moral & Character Guidance",
    title_bn: "নৈতিক ও চারিত্রিক দিকনির্দেশনা",
    high_en: "You are actively teaching values — honesty, civic responsibility, accountability — through real conversations and assigned duties. This is the long-term investment that shapes who your child becomes as a person, not just a student.",
    high_bn: "আপনি সক্রিয়ভাবে মূল্যবোধ শেখাচ্ছেন — সততা, নাগরিক দায়িত্ব, জবাবদিহিতা — বাস্তব কথোপকথন ও নির্ধারিত দায়িত্বের মাধ্যমে। এটি দীর্ঘমেয়াদী বিনিয়োগ যা আপনার সন্তান কেবল ছাত্র হিসেবে নয়, মানুষ হিসেবে কে হবে তা গঠন করে।",
    low_en: "Moral guidance often gets crowded out by academic pressure. Small, consistent conversations — using real news events, neighbourhood incidents — are far more powerful than a single lecture. Praise honesty as loudly as you praise good grades.",
    low_bn: "নৈতিক নির্দেশনা প্রায়ই একাডেমিক চাপে পিছিয়ে পড়ে। ছোট, সামঞ্জস্যপূর্ণ কথোপকথন — বাস্তব সংবাদ ঘটনা, পাড়ার ঘটনা ব্যবহার করে — একটি বক্তৃতার চেয়ে অনেক বেশি শক্তিশালী। ভালো নম্বরের মতো জোরে সততার প্রশংসা করুন।",
    tips_en: ["Use a news story once a week to start a 'what would you do?' conversation", "Give your child one household responsibility — and follow up whether it was done", "Celebrate honest moments at least as much as academic achievements"],
    tips_bn: ["সপ্তাহে একটি সংবাদ ঘটনা ব্যবহার করে 'তুমি কী করতে?' কথোপকথন শুরু করুন", "সন্তানকে একটি পারিবারিক দায়িত্ব দিন — এবং এটি করা হয়েছে কিনা অনুসরণ করুন", "একাডেমিক সাফল্যের মতো কমপক্ষে সৎ মুহূর্তগুলো উদযাপন করুন"],
  },
  AS: {
    icon: "📚",
    title_en: "Academic & Developmental Support",
    title_bn: "শিক্ষা ও বিকাশে সহায়তা",
    high_en: "You stay engaged in your child's learning — checking notebooks, contacting teachers and encouraging activities beyond the classroom. This involvement is a well-documented protective factor for both academic performance and mental health.",
    high_bn: "আপনি সন্তানের শেখার মধ্যে নিযুক্ত থাকেন — খাতা দেখা, শিক্ষকদের সাথে যোগাযোগ এবং শ্রেণিকক্ষের বাইরে কার্যক্রমে উৎসাহ দেওয়া। এই সম্পৃক্ততা একাডেমিক কর্মক্ষমতা এবং মানসিক স্বাস্থ্য উভয়ের জন্য একটি সুপ্রমাণিত সুরক্ষামূলক কারণ।",
    low_en: "Leaving education entirely to tutors disconnects you from your child's actual learning journey. You don't need to know the subjects — you need to know the teacher's feedback, your child's struggle points, and whether they are growing beyond marks.",
    low_bn: "শিক্ষা সম্পূর্ণ টিউটরের কাছে ছেড়ে দেওয়া আপনাকে সন্তানের প্রকৃত শেখার যাত্রা থেকে বিচ্ছিন্ন করে। আপনাকে বিষয়গুলো জানতে হবে না — আপনাকে শিক্ষকের মতামত, সন্তানের সংগ্রামের জায়গাগুলো এবং তারা নম্বরের বাইরে বাড়ছে কিনা জানতে হবে।",
    tips_en: ["Contact one teacher every month — even a 5-minute phone call is enough", "Ask 'what did you find hard this week?' not just 'what marks did you get?'", "Never compare your child's results with another child's in a way that shames them"],
    tips_bn: ["প্রতি মাসে একজন শিক্ষকের সাথে যোগাযোগ করুন — ৫ মিনিটের ফোন কলও যথেষ্ট", "'এই সপ্তাহে কী কঠিন লাগল?' জিজ্ঞেস করুন, শুধু 'কত নম্বর পেলে?' নয়", "কখনো অন্য শিশুর সাথে তুলনা করে সন্তানকে ছোট করবেন না"],
  },
  KA: {
    icon: "💛",
    title_en: "Knowing the Child (Attunement)",
    title_bn: "সন্তানকে জানা",
    high_en: "You know your child's world — their friends, dreams, talents and worries. This attunement is the foundation of trust. Children who feel truly known by a parent are significantly less likely to seek validation from risky peer groups.",
    high_bn: "আপনি সন্তানের জগৎ জানেন — তাদের বন্ধু, স্বপ্ন, প্রতিভা এবং উদ্বেগ। এই সুর-মিলানো বিশ্বাসের ভিত্তি। যেসব শিশু একজন অভিভাবক দ্বারা সত্যিকারভাবে পরিচিত বোধ করে, তারা ঝুঁকিপূর্ণ সহকর্মী গোষ্ঠী থেকে অনুমোদন চাওয়ার সম্ভাবনা উল্লেখযোগ্যভাবে কম।",
    low_en: "There is a gap between living with your child and knowing them. Ask open questions — not 'how was school?' but 'tell me one thing that surprised you today.' Curiosity, not interrogation, is what builds closeness.",
    low_bn: "সন্তানের সাথে বসবাস করা এবং তাদের জানার মধ্যে একটি ফাঁক আছে। উন্মুক্ত প্রশ্ন করুন — 'স্কুল কেমন ছিল?' নয়, বরং 'আজ যা তোমাকে অবাক করেছে তা বলো।' জিজ্ঞাসা, জিজ্ঞাসাবাদ নয়, যা ঘনিষ্ঠতা গড়ে তোলে।",
    tips_en: ["Ask one 'curiosity question' every evening — not about homework", "Learn the name of one friend and something about that friend's life", "When your child shares something, reflect it back before responding"],
    tips_bn: ["প্রতি সন্ধ্যায় একটি 'কৌতূহলী প্রশ্ন' করুন — বাড়ির কাজ সম্পর্কে নয়", "একজন বন্ধুর নাম এবং সেই বন্ধুর জীবন সম্পর্কে কিছু জানুন", "সন্তান কিছু শেয়ার করলে, সাড়া দেওয়ার আগে তা প্রতিফলিত করুন"],
  },
  CO: {
    icon: "💬",
    title_en: "Communication & Emotional Openness",
    title_bn: "যোগাযোগ ও আবেগীয় উন্মুক্ততা",
    high_en: "Your child comes to you first when something goes wrong — this is the gold standard of parental communication. You listen fully, allow disagreement without punishment and discuss age-appropriate sensitive topics. This is rare and very protective.",
    high_bn: "কিছু ভুল হলে সন্তান প্রথমে আপনার কাছে আসে — এটি অভিভাবক যোগাযোগের সোনার মান। আপনি পূর্ণভাবে শোনেন, শাস্তি ছাড়া দ্বিমত পোষণ করতে দেন এবং বয়স-উপযুক্ত সংবেদনশীল বিষয় নিয়ে আলোচনা করেন। এটি বিরল এবং অত্যন্ত সুরক্ষামূলক।",
    low_en: "If your child does not come to you first when things go wrong, they are going somewhere else — peers, the internet. The barrier is usually that they expect dismissal ('this is nothing') or a lecture. Listen fully once, and they will come back twice.",
    low_bn: "যদি কিছু ভুল হলে সন্তান প্রথমে আপনার কাছে না আসে, তারা অন্য কোথাও যাচ্ছে — সমবয়সীদের কাছে, ইন্টারনেটে। বাধাটি সাধারণত যে তারা প্রত্যাখ্যান প্রত্যাশা করে ('এটা কিছু না') বা বক্তৃতা। একবার পূর্ণভাবে শুনলে, তারা দুবার ফিরে আসবে।",
    tips_en: ["When your child speaks, listen completely before you respond — no advice in the first 2 minutes", "Never dismiss feelings: say 'I hear you' before anything else", "Bring up puberty/emotional changes proactively — if you don't, they learn it from elsewhere"],
    tips_bn: ["সন্তান কথা বললে, সাড়া দেওয়ার আগে সম্পূর্ণ শুনুন — প্রথম ২ মিনিটে কোনো পরামর্শ নয়", "অনুভূতি কখনো উড়িয়ে দেবেন না: অন্য কিছুর আগে বলুন 'আমি শুনছি'", "বয়ঃসন্ধি/আবেগীয় পরিবর্তন সক্রিয়ভাবে আলোচনা করুন — না করলে অন্য জায়গা থেকে শিখবে"],
  },
  MD: {
    icon: "🛡️",
    title_en: "Supervision, Safety & Digital Awareness",
    title_bn: "তত্ত্বাবধান, নিরাপত্তা ও ডিজিটাল সচেতনতা",
    high_en: "You know where your child is, who they are with, what apps they use, and you have taught safe/unsafe touch. In a world with significant offline and online risks, this vigilance is protecting your child in ways that may never be visible to you.",
    high_bn: "আপনি জানেন সন্তান কোথায় আছে, কার সাথে আছে, কোন অ্যাপ ব্যবহার করে, এবং আপনি নিরাপদ/অনিরাপদ স্পর্শ শিখিয়েছেন। উল্লেখযোগ্য অফলাইন ও অনলাইন ঝুঁকি সহ একটি জগতে, এই সতর্কতা আপনার সন্তানকে এমনভাবে রক্ষা করছে যা আপনার কাছে কখনো দৃশ্যমান নাও হতে পারে।",
    low_en: "Long unsupervised screen time is the single fastest-growing risk factor for Bangladeshi children right now. You do not need to know all the apps — you need to have the conversations. A family screen-time agreement takes 20 minutes to set up and pays back for years.",
    low_bn: "দীর্ঘ অনিয়ন্ত্রিত স্ক্রিন সময় এখন বাংলাদেশি শিশুদের জন্য সবচেয়ে দ্রুত বর্ধনশীল ঝুঁকির কারণ। আপনাকে সব অ্যাপ জানতে হবে না — কথোপকথন করতে হবে। একটি পারিবারিক স্ক্রিন-সময় চুক্তি ২০ মিনিটে স্থাপন করা যায় এবং বছরের পর বছর সুফল দেয়।",
    tips_en: ["Set up a family screen-time agreement this week — together, not imposed", "Ask 'show me what you watch' — curiosity, not policing", "Teach the 'private parts rule' explicitly and in plain language before age 8"],
    tips_bn: ["এই সপ্তাহে একটি পারিবারিক স্ক্রিন-সময় চুক্তি করুন — একসাথে, আরোপ করে নয়", "'আমাকে দেখাও তুমি কী দেখো' বলুন — কৌতূহল, নিয়ন্ত্রণ নয়", "৮ বছরের আগে স্পষ্টভাবে 'প্রাইভেট পার্টস নিয়ম' শেখান"],
  },
};

const PCS_THIRTY_DAY_PLAN: { week: string; week_bn: string; tasks_en: string[]; tasks_bn: string[] }[] = [
  {
    week: "Week 1 — Observe & Baseline",
    week_bn: "সপ্তাহ ১ — পর্যবেক্ষণ ও ভিত্তি",
    tasks_en: ["Log how many minutes of genuine 1:1 time you gave your child each day", "Note how many meals you ate together", "Identify the two lowest-scoring domains from this report"],
    tasks_bn: ["প্রতিদিন সন্তানকে কতটুকু সত্যিকারের ১:১ সময় দিয়েছেন তা নোট করুন", "কতটি খাবার একসাথে খেয়েছেন তা লক্ষ্য করুন", "এই রিপোর্টের দুটি সর্বনিম্ন স্কোরিং ডোমেইন চিহ্নিত করুন"],
  },
  {
    week: "Week 2 — One New Habit",
    week_bn: "সপ্তাহ ২ — একটি নতুন অভ্যাস",
    tasks_en: ["Begin a daily 20-minute phone-free window", "Contact one of your child's teachers", "Have one open-ended 'curiosity conversation' — not about school work"],
    tasks_bn: ["প্রতিদিন ২০ মিনিটের ফোন-মুক্ত সময় শুরু করুন", "সন্তানের একজন শিক্ষকের সাথে যোগাযোগ করুন", "একটি উন্মুক্ত 'কৌতূহলী কথোপকথন' করুন — স্কুলের কাজ সম্পর্কে নয়"],
  },
  {
    week: "Week 3 — Deepen",
    week_bn: "সপ্তাহ ৩ — গভীর করুন",
    tasks_en: ["Share a screen-time rule with your child — discuss it together", "Tell your child one story about a mistake you made and what you learned", "Praise one act of honesty explicitly this week"],
    tasks_bn: ["সন্তানের সাথে একটি স্ক্রিন-সময় নিয়ম শেয়ার করুন — একসাথে আলোচনা করুন", "আপনার করা একটি ভুলের গল্প এবং আপনি কী শিখেছিলেন তা বলুন", "এই সপ্তাহে একটি সৎ কাজের স্পষ্টভাবে প্রশংসা করুন"],
  },
  {
    week: "Week 4 — Review & Commit",
    week_bn: "সপ্তাহ ৪ — পর্যালোচনা ও প্রতিশ্রুতি",
    tasks_en: ["Review what changed in weeks 1–3: what worked, what didn't", "Choose one habit to continue for the next 6 months", "Retake this assessment in 6 months to measure growth"],
    tasks_bn: ["সপ্তাহ ১–৩-এ কী পরিবর্তন হয়েছে পর্যালোচনা করুন: কী কাজ করেছে, কী করেনি", "পরবর্তী ৬ মাসের জন্য একটি অভ্যাস চালিয়ে যেতে বেছে নিন", "বৃদ্ধি পরিমাপ করতে ৬ মাসে এই মূল্যায়ন পুনরায় নিন"],
  },
];

const PCS_SOCIAL_MEDIA: { platform: string; handle: string; why_en: string; why_bn: string }[] = [
  { platform: "UNICEF Bangladesh — Parenting", handle: "unicef.org/bangladesh", why_en: "Evidence-based parenting resources in Bengali, tailored for Bangladeshi families", why_bn: "বাংলায় প্রমাণ-ভিত্তিক অভিভাবকত্বের সম্পদ, বাংলাদেশি পরিবারের জন্য তৈরি" },
  { platform: "WHO — Parenting for Lifelong Health", handle: "who.int/parenting", why_en: "Free programme with sessions on positive parenting, reducing harsh discipline", why_bn: "ইতিবাচক অভিভাবকত্ব, কঠোর শাসন কমানোর উপর সেশন সহ বিনামূল্যে প্রোগ্রাম" },
  { platform: "Zero to Three (global)", handle: "zerotothree.org", why_en: "Research-backed articles on child development from infancy through early school years", why_bn: "শৈশব থেকে প্রাথমিক স্কুল বছর পর্যন্ত শিশু বিকাশ সম্পর্কে গবেষণা-সমর্থিত নিবন্ধ" },
];

const PCS_REFERRALS: { name_en: string; name_bn: string; role_en: string; role_bn: string; contact: string }[] = [
  { name_en: "National Institute of Mental Health (NIMH)", name_bn: "ন্যাশনাল ইনস্টিটিউট অব মেন্টাল হেলথ", role_en: "Government facility; Child & Adolescent Psychiatry wing", role_bn: "সরকারি সুবিধা; শিশু ও কিশোর মনোরোগবিদ্যা শাখা", contact: "Sher-e-Bangla Nagar, Dhaka" },
  { name_en: "Shishu Bikash Kendra (BSMMU)", name_bn: "শিশু বিকাশ কেন্দ্র (বিএসএমএমইউ)", role_en: "Development assessment, behaviour and learning evaluation", role_bn: "বিকাশ মূল্যায়ন, আচরণ ও শিক্ষার মূল্যায়ন", contact: "Shahbag, Dhaka" },
  { name_en: "Bangladesh Child Helpline", name_bn: "বাংলাদেশ চাইল্ড হেল্পলাইন", role_en: "24 h helpline; free for children in distress", role_bn: "২৪ ঘণ্টা হেল্পলাইন; বিপদে শিশুদের জন্য বিনামূল্যে", contact: "1098" },
  { name_en: "Kaan Pete Roi", name_bn: "কান পেতে রই", role_en: "Confidential emotional support for parents and teens", role_bn: "অভিভাবক ও কিশোরদের জন্য গোপনীয় আবেগীয় সহায়তা", contact: "01779-554391" },
  { name_en: "School Counsellor / Class Teacher", name_bn: "স্কুল কাউন্সেলর / শ্রেণিশিক্ষক", role_en: "First point of contact for academic and social concerns", role_bn: "একাডেমিক ও সামাজিক উদ্বেগের প্রথম যোগাযোগের স্থান", contact: "Your child's school" },
];

function PcsReport({ r }: { r: Record<string, any> }) {
  const [lang, setLang] = React.useState<"en" | "bn">("bn");
  const t = lang === "en";
  const tx = (en: string, bn: string) => t ? en : bn;

  const domainKeys = Object.keys(r.domainResults || {});
  const composite: number | null = r.composite ?? null;
  const bandMeta = pcsBandMeta(composite);

  // Sort domains: highest index first for strengths, lowest for priorities
  const scoredDomains = domainKeys.filter((d) => r.domainResults[d]?.scored && r.domainResults[d]?.index !== null);
  const sortedByIndex = [...scoredDomains].sort((a, b) => (r.domainResults[b].index ?? 0) - (r.domainResults[a].index ?? 0));
  const strengths = sortedByIndex.slice(0, 2);
  const priorities = sortedByIndex.slice(-2).reverse();

  // Band bar zones
  const bandZones = [
    { max: 40, color: "bg-rose-400",    label: t ? "Urgent" : "জরুরি" },
    { max: 55, color: "bg-orange-400",  label: t ? "Attention" : "মনোযোগ" },
    { max: 70, color: "bg-amber-400",   label: t ? "Developing" : "বিকাশমান" },
    { max: 85, color: "bg-emerald-400", label: t ? "Effective" : "কার্যকর" },
    { max: 100, color: "bg-green-500",  label: t ? "Highly Effective" : "অত্যন্ত কার্যকর" },
  ];

  return (
    <div className="space-y-6">

      {/* ── Language Toggle ── */}
      <div className="flex justify-end print:hidden">
        <div className="inline-flex border border-[#EAEFF0] rounded-sm overflow-hidden text-xs font-bold">
          <button
            onClick={() => setLang("bn")}
            className={`px-4 py-2 transition-colors ${lang === "bn" ? "bg-[#2C3338] text-white" : "bg-white text-[#596573] hover:bg-[#FAF7F2]"}`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-2 transition-colors ${lang === "en" ? "bg-[#2C3338] text-white" : "bg-white text-[#596573] hover:bg-[#FAF7F2]"}`}
          >
            English
          </button>
        </div>
      </div>

      {/* ── Overall Composite Score + Band Bar ── */}
      <div className="bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm overflow-hidden">
        <div className="p-6 sm:p-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[#A38771] font-bold block mb-3">
            {tx("Composite Parenting Capability Index", "সামগ্রিক অভিভাবকত্ব সক্ষমতা সূচক")}
          </span>

          {/* Score Circle */}
          <div className="flex items-center justify-center mb-4">
            <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 ${composite !== null && composite >= 70 ? "border-emerald-400" : composite !== null && composite >= 55 ? "border-amber-400" : "border-rose-400"} bg-white shadow-md`}>
              <span className="text-4xl font-mono font-bold text-[#2C3338] leading-none">{composite ?? "—"}</span>
              <span className="text-xs text-[#7A8691] mt-1">/ 100</span>
            </div>
          </div>

          <span className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm text-white ${bandMeta.color}`}>
            {tx(bandMeta.label_en, bandMeta.label_bn)}
          </span>
        </div>

        {/* Band Gradient Bar */}
        <div className="px-6 pb-6">
          <div className="flex h-3 rounded-full overflow-hidden mb-1.5">
            {bandZones.map((z, i) => {
              const prev = i === 0 ? 0 : bandZones[i - 1].max;
              const width = z.max - prev;
              return <div key={i} className={`${z.color}`} style={{ width: `${width}%` }} />;
            })}
          </div>
          {/* Marker */}
          {composite !== null && (
            <div className="relative h-4">
              <div
                className="absolute -top-0.5 w-3 h-4 flex flex-col items-center"
                style={{ left: `calc(${composite}% - 6px)` }}
              >
                <div className="w-0.5 h-3 bg-[#2C3338]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2C3338] -mt-0.5" />
              </div>
            </div>
          )}
          <div className="flex justify-between text-[9px] text-[#7A8691] mt-1 font-mono">
            {bandZones.map((z, i) => {
              const prev = i === 0 ? 0 : bandZones[i - 1].max;
              const mid = prev + (z.max - prev) / 2;
              return (
                <span key={i} className="text-center" style={{ width: `${z.max - prev}%` }}>
                  {z.label}
                </span>
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] text-[#A38771] mt-0.5 font-mono">
            <span>0</span>
            <span>40</span>
            <span>55</span>
            <span>70</span>
            <span>85</span>
            <span>100</span>
          </div>
        </div>

        {/* IM Note */}
        {r.imNote && (
          <div className="mx-6 mb-6 p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-800 leading-relaxed">
            ⚠️ {r.imNote.note_bn || r.imNote.note_en}
          </div>
        )}
      </div>

      {/* ── Safeguarding Flags ── */}
      {r.flagsFired?.length > 0 && (
        <div className="bg-rose-50 border border-rose-300 text-rose-900 p-4 rounded-sm text-xs leading-relaxed">
          <strong>⚠️ {tx("Attention Points:", "বিশেষ মনোযোগ:")}</strong>{" "}
          {tx(
            `Responses on ${r.flagsFired.join(", ")} indicate areas where extra parental reflection may be particularly valuable.`,
            `${r.flagsFired.join(", ")} প্রশ্নের উত্তর ইঙ্গিত দেয় যে এই ক্ষেত্রগুলোতে অতিরিক্ত অভিভাবকীয় প্রতিফলন বিশেষভাবে মূল্যবান হতে পারে।`
          )}
        </div>
      )}

      {/* ── Domain Wheel Image ── */}
      <div className="bg-white border border-[#EAEFF0] rounded-sm p-5 sm:p-6">
        <div className="text-xs font-bold text-[#A38771] uppercase tracking-[0.18em] mb-4 flex items-center gap-2.5 border-b border-[#EAEFF0] pb-3">
          <span className="w-2 h-2 rounded-full bg-[#A38771]" />
          {tx("Seven-Domain Parenting Profile — At a Glance", "সাতটি ডোমেইনের অভিভাবকত্ব প্রোফাইল — এক নজরে")}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-full sm:w-48 shrink-0">
            <img
              src="/pcs-domain-wheel.jpg"
              alt={tx("Parenting domain wheel", "অভিভাবকত্ব ডোমেইন চাকা")}
              className="w-full rounded-sm border border-[#EAEFF0]"
            />
          </div>
          {/* Domain Bars */}
          <div className="flex-1 w-full space-y-2.5">
            {domainKeys.map((d, idx) => {
              const dr = r.domainResults[d];
              const colors = DOMAIN_COLORS[idx % 7];
              const narrative = PCS_DOMAIN_NARRATIVES[d];
              return (
                <div key={d}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-[#2C3338] flex items-center gap-1.5">
                      <span>{narrative?.icon}</span>
                      {t ? (dr.name_en || dr.name_bn) : (dr.name_bn || dr.name_en)}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#A38771]">{dr.index ?? "—"}%</span>
                  </div>
                  <div className="h-2 bg-[#EAEFF0] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${colors.bar}`} style={{ width: `${dr.index || 0}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Strengths & Priorities ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-5">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>✅</span>
            {tx("Your Strengths — Build On These", "আপনার শক্তি — এগুলো আরও বাড়ান")}
          </div>
          <div className="space-y-2">
            {strengths.map((d) => {
              const dr = r.domainResults[d];
              const nar = PCS_DOMAIN_NARRATIVES[d];
              return (
                <div key={d} className="bg-white border border-emerald-100 rounded-sm p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#2C3338] flex items-center gap-1">
                      {nar?.icon} {t ? (dr.name_en || dr.name_bn) : (dr.name_bn || dr.name_en)}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-700">{dr.index}%</span>
                  </div>
                  <p className="text-[11px] text-[#596573] leading-relaxed">
                    {t ? nar?.high_en : nar?.high_bn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priorities */}
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-5">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🎯</span>
            {tx("Priority Areas — Focus Here First", "অগ্রাধিকার ক্ষেত্র — এখানে প্রথম মনোযোগ দিন")}
          </div>
          <div className="space-y-2">
            {priorities.map((d) => {
              const dr = r.domainResults[d];
              const nar = PCS_DOMAIN_NARRATIVES[d];
              return (
                <div key={d} className="bg-white border border-amber-100 rounded-sm p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#2C3338] flex items-center gap-1">
                      {nar?.icon} {t ? (dr.name_en || dr.name_bn) : (dr.name_bn || dr.name_en)}
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-700">{dr.index}%</span>
                  </div>
                  <p className="text-[11px] text-[#596573] leading-relaxed">
                    {t ? nar?.low_en : nar?.low_bn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Domain Narratives ── */}
      <div className="bg-white border border-[#EAEFF0] rounded-sm overflow-hidden">
        <div className="bg-[#FAF7F2] border-b border-[#EAEFF0] px-5 py-3">
          <h3 className="font-bold text-[#2C3338] text-xs uppercase tracking-wider">
            {tx("What Each Domain Means For You", "প্রতিটি ডোমেইন আপনার জন্য কী অর্থ বহন করে")}
          </h3>
        </div>
        <div className="divide-y divide-[#EAEFF0]">
          {domainKeys.map((d, idx) => {
            const dr = r.domainResults[d];
            const nar = PCS_DOMAIN_NARRATIVES[d];
            const colors = DOMAIN_COLORS[idx % 7];
            const isHigh = (dr.index ?? 0) >= 60;
            if (!nar) return null;
            return (
              <div key={d} className="p-5">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold mb-3 border ${colors.bg} ${colors.border} ${colors.text}`}>
                  <span>{nar.icon}</span>
                  <span>{t ? nar.title_en : nar.title_bn}</span>
                  <span className="font-mono font-normal opacity-70">— {dr.index ?? "—"}%</span>
                </div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed mb-3">
                  {t ? (isHigh ? nar.high_en : nar.low_en) : (isHigh ? nar.high_bn : nar.low_bn)}
                </p>
                <div className="bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C3338] block mb-1.5">
                    {tx("Practical steps", "ব্যবহারিক পদক্ষেপ")}
                  </span>
                  <ul className="space-y-1">
                    {(t ? nar.tips_en : nar.tips_bn).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-[#596573]">
                        <span className="text-[#A38771] mt-0.5 shrink-0">→</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Growth Journey Image + 30-Day Plan ── */}
      <div className="bg-white border border-[#EAEFF0] rounded-sm overflow-hidden">
        <div className="bg-[#FAF7F2] border-b border-[#EAEFF0] px-5 py-3">
          <h3 className="font-bold text-[#2C3338] text-xs uppercase tracking-wider">
            {tx("Your 30-Day Action Plan", "আপনার ৩০ দিনের কর্ম পরিকল্পনা")}
          </h3>
        </div>
        {/* Journey Visual */}
        <div className="px-5 pt-5">
          <img
            src="/pcs-growth-journey.jpg"
            alt={tx("Parenting growth journey", "অভিভাবকত্বের বিকাশ যাত্রা")}
            className="w-full rounded-sm border border-[#EAEFF0] mb-5"
          />
        </div>
        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PCS_THIRTY_DAY_PLAN.map((week, i) => (
            <div key={i} className="bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#2C3338] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs font-bold text-[#2C3338]">
                  {t ? week.week : week.week_bn}
                </span>
              </div>
              <ul className="space-y-1.5">
                {(t ? week.tasks_en : week.tasks_bn).map((task, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-[11px] text-[#596573]">
                    <span className="text-[#A38771] shrink-0 mt-0.5">•</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Social Media & Online Resources ── */}
      <div className="bg-white border border-[#EAEFF0] rounded-sm overflow-hidden">
        <div className="bg-[#FAF7F2] border-b border-[#EAEFF0] px-5 py-3">
          <h3 className="font-bold text-[#2C3338] text-xs uppercase tracking-wider">
            {tx("Trusted Online Resources for Parents", "অভিভাবকদের জন্য বিশ্বস্ত অনলাইন সম্পদ")}
          </h3>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-xs text-[#596573] leading-relaxed italic">
            {tx(
              "Online parenting advice is abundant but uneven. The sources below are institutional and verifiable.",
              "অনলাইনে অভিভাবকত্ব পরামর্শ প্রচুর কিন্তু অসম। নিচের উৎসগুলো প্রাতিষ্ঠানিক এবং যাচাইযোগ্য।"
            )}
          </p>
          {PCS_SOCIAL_MEDIA.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
              <div className="w-8 h-8 rounded-sm bg-[#2C3338] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                🌐
              </div>
              <div className="flex-1">
                <div className="font-bold text-xs text-[#2C3338] mb-0.5">{item.platform}</div>
                <div className="text-[10px] text-[#A38771] font-mono mb-1">{item.handle}</div>
                <div className="text-[11px] text-[#596573] leading-relaxed">
                  {t ? item.why_en : item.why_bn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Referral Directory ── */}
      <div className="bg-white border border-[#EAEFF0] rounded-sm overflow-hidden">
        <div className="bg-[#FAF7F2] border-b border-[#EAEFF0] px-5 py-3">
          <h3 className="font-bold text-[#2C3338] text-xs uppercase tracking-wider">
            {tx("Where to Get Support", "সহায়তা পাবেন যেখানে")}
          </h3>
        </div>
        <div className="p-5">
          <p className="text-xs text-[#596573] leading-relaxed mb-4">
            {tx(
              "Seeking help is not weakness — it is professional. The organisations below are Bangladesh-based and verifiable.",
              "সাহায্য নেওয়া দুর্বলতা নয় — এটা পেশাদারিত্বের লক্ষণ। নিচের সংস্থাগুলো বাংলাদেশে অবস্থিত এবং যাচাইযোগ্য।"
            )}
          </p>
          <div className="space-y-2.5">
            {PCS_REFERRALS.map((ref, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm">
                <div className="flex-1">
                  <div className="font-bold text-xs text-[#2C3338]">
                    {t ? ref.name_en : ref.name_bn}
                  </div>
                  <div className="text-[11px] text-[#596573] mt-0.5">
                    {t ? ref.role_en : ref.role_bn}
                  </div>
                </div>
                <div className="text-[11px] font-mono font-bold text-[#A38771] shrink-0 text-right">
                  {ref.contact}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#FAF7F2] border border-[#EAEFF0] rounded-sm text-[11px] text-[#7A8691] italic">
            {tx(
              "PCS-BD is a psychometric self-reflection tool, not a clinical diagnosis or legal document. If child safety is a concern, contact authorities immediately.",
              "PCS-BD একটি সাইকোমেট্রিক স্ব-প্রতিফলন সরঞ্জাম, ক্লিনিকাল ডায়াগনোসিস বা আইনি দলিল নয়। শিশুর নিরাপত্তা নিয়ে উদ্বেগ থাকলে অবিলম্বে কর্তৃপক্ষের সাথে যোগাযোগ করুন।"
            )}
          </div>
        </div>
      </div>

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
   5. MCRRS-BD REPORT — handled by McrrsReportComponent (imported above)
   ========================================================================= */