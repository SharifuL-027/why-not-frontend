import React, { useState } from "react";
import { MhsLang, MhsReportData, MhsSeverity } from "./types";
import { mhsTranslations } from "./translations";
import { sampleMhsReportData } from "./sampleData";
import MhsHeader from "./components/MhsHeader";
import SymptomFrequencyGrid from "./components/SymptomFrequencyGrid";
import ProportionalShareBar from "./components/ProportionalShareBar";
import CbtCycleChart from "./components/CbtCycleChart";
import StressBucketChart from "./components/StressBucketChart";

interface MhsReportPageProps {
  initialData?: MhsReportData;
  initialLang?: MhsLang;
}

export default function MhsReportPage({
  initialData = sampleMhsReportData,
  initialLang = "bn", // Default to Bangla as per user request & demographic context
}: MhsReportPageProps) {
  const [data] = useState<MhsReportData>(initialData);
  const [lang, setLang] = useState<MhsLang>(initialLang);

  const t = mhsTranslations[lang];
  const isBn = lang === "bn";

  const toggleLang = () => {
    setLang((prev) => (prev === "bn" ? "en" : "bn"));
  };

  const handlePrint = () => {
    window.print();
  };

  const getSeverityBadge = (severity: MhsSeverity, customText?: string) => {
    switch (severity) {
      case "minimal":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            {customText || (isBn ? "ন্যূনতম / স্বাভাবিক" : "Minimal / Normal")}
          </span>
        );
      case "mild":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            {customText || (isBn ? "মৃদু / প্রাথমিক সংকেত" : "Mild / Warning")}
          </span>
        );
      case "moderate":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-300">
            {customText || (isBn ? "মাঝারি / পরামর্শযোগ্য" : "Moderate / Action")}
          </span>
        );
      case "severe":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            {customText || (isBn ? "তীব্র / জরুরি" : "Severe / Urgent")}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 py-6 px-3 sm:px-6 font-sans antialiased text-slate-800">
      {/* Print styles */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-size: 11pt !important;
          }
          .mhs-page {
            page-break-after: always !important;
            break-after: page !important;
            box-shadow: none !important;
            margin-bottom: 0 !important;
            border: none !important;
            padding: 24px !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* Integrated Control Toolbar directly on top of report container */}
      <MhsHeader
        lang={lang}
        onToggleLang={toggleLang}
        reportNumber={data.metadata.reportNumber}
        onPrint={handlePrint}
      />

      {/* Master 12-Page Container */}
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-0">
        {/* ========================================================= */}
        {/* PAGE 1: COVER, METADATA & AT-A-GLANCE SUMMARY */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative overflow-hidden">
          {/* Header Banner - Deep Dark Navy with Multi-Color Accent line */}
          <div className="bg-[#0F172A] text-white rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3 mb-4">
              <span className="text-xs font-mono tracking-widest uppercase text-sky-400 font-bold">
                {t.brandName}
              </span>
              <span className="px-3 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-700 text-[10px] font-mono font-bold tracking-wider uppercase">
                {t.confidentialBadge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
              {t.mainTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>

            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
              <span>{t.edition}</span>
              <span className="text-amber-400 font-bold">{data.metadata.reportNumber}</span>
            </div>

            {/* Bottom Multi-Color Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
              <div className="w-1/4 bg-emerald-500" />
              <div className="w-1/4 bg-amber-400" />
              <div className="w-1/4 bg-orange-500" />
              <div className="w-1/4 bg-rose-600" />
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">{t.lblName}:</span>
                <span className="font-bold text-slate-900 text-sm">{data.metadata.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">{t.lblReportNo}:</span>
                <span className="font-mono font-bold text-blue-900">{data.metadata.reportNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">{t.lblDate}:</span>
                <span className="font-semibold text-slate-800">{data.metadata.date}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">{t.lblAgeGender}:</span>
                <span className="font-semibold text-slate-800">{data.metadata.ageGender}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">{t.lblOccupation}:</span>
                <span className="font-semibold text-slate-800">{data.metadata.occupation}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">{t.lblRef}:</span>
                <span className="font-semibold text-slate-800">{data.metadata.reference}</span>
              </div>
            </div>
          </div>

          {/* At-a-glance Section */}
          <div className="border border-slate-200 rounded-xl p-5 mb-6 bg-linear-to-b from-white to-slate-50/70 shadow-xs">
            <h2 className="text-base font-extrabold text-[#0F172A] mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>{t.secAtAGlance}</span>
            </h2>

            {/* Mental Health Index Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500 block">
                    {t.mentalHealthIndex}
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-extrabold text-[#0F172A] font-mono">
                      {data.overallIndex.score}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      / 100 ({t.indexScoreUnit})
                    </span>
                  </div>
                </div>
                <div>
                  {getSeverityBadge(
                    data.overallIndex.severity,
                    isBn ? data.overallIndex.category_bn : data.overallIndex.category_en
                  )}
                </div>
              </div>

              {/* Segmented Range Bar */}
              <div className="space-y-1 mb-2">
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex relative">
                  <div className="w-1/4 bg-emerald-500" title="0-25 Minimal" />
                  <div className="w-1/5 bg-amber-400" title="26-45 Mild" />
                  <div className="w-1/4 bg-orange-500" title="46-70 Moderate" />
                  <div className="w-3/10 bg-rose-600" title="71-100 Severe" />
                </div>
                {/* Pointer indicator */}
                <div className="relative w-full h-4">
                  <div
                    style={{ left: `${data.overallIndex.score}%` }}
                    className="absolute -top-1 -translate-x-1/2 flex flex-col items-center"
                  >
                    <span className="w-0 h-0 border-x-4 border-x-transparent border-b-6 border-b-[#0F172A]" />
                    <span className="text-[10px] font-mono font-bold text-[#0F172A]">
                      ▲ {data.overallIndex.score}
                    </span>
                  </div>
                </div>
              </div>

              {/* Range Bands Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] text-slate-600 pt-1">
                <span className="text-emerald-700 font-medium">● 0-25: {isBn ? "ভারসাম্যপূর্ণ" : "Minimal"}</span>
                <span className="text-amber-700 font-medium">● 26-45: {isBn ? "মৃদু চাপ" : "Mild"}</span>
                <span className="text-orange-700 font-bold">● 46-70: {isBn ? "মাঝারি চাপ (বর্তমান)" : "Moderate (Current)"}</span>
                <span className="text-rose-700 font-medium">● 71-100: {isBn ? "তীব্র চাপ" : "Severe"}</span>
              </div>
            </div>

            {/* Overall Status Callout Box */}
            <div className="bg-orange-50/70 border-l-4 border-orange-500 p-4 rounded-r-xl mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wide text-orange-900 mb-1 flex items-center gap-1.5">
                <span>📋</span>
                <span>{t.indexInterpretationTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-orange-950 leading-relaxed font-sans">
                {isBn ? data.overallIndex.guidance_bn : data.overallIndex.guidance_en}
              </p>
            </div>

            {/* Primary Concerns & Strengths Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Focus Areas */}
              <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span>⚠️</span>
                  <span>{t.summaryConcernsTitle}</span>
                </h4>
                <ul className="text-xs text-rose-950 space-y-1.5">
                  {data.primaryConcerns.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protective Strengths */}
              <div className="bg-emerald-50/40 border border-emerald-200 rounded-xl p-3.5">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span>🛡️</span>
                  <span>{t.summaryStrengthsTitle}</span>
                </h4>
                <ul className="text-xs text-emerald-950 space-y-1.5">
                  {data.protectiveStrengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              <span>{t.tocTitle}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {t.tocItems.map((item, idx) => (
                <div key={idx} className="flex items-baseline justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-800 font-medium pr-2 truncate">{item.title}</span>
                  <span className="font-mono text-slate-500 font-bold shrink-0 text-[11px]">{item.page}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Page Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 1 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 2: INTRODUCTION & EVALUATION FRAMEWORK */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.secFrameworkTitle}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 1</span>
          </div>

          {/* Bangladesh Context Narrative */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-2">
              <span className="text-base">🇧🇩</span>
              <span>{t.bdContextTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {t.bdContextText}
            </p>
          </div>

          {/* Validated Screening Tools List */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">
              {t.screeningToolsTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-3">{t.screeningToolsText}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.toolsList.map((tool, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg p-3 bg-white hover:border-blue-300 transition-colors">
                  <h4 className="text-xs font-bold text-blue-900 mb-1">{tool.name}</h4>
                  <p className="text-[11px] text-slate-600 leading-snug">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Reference Guide */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-3">
              {t.colorGuideTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {t.colorGuide.map((g, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border p-3 bg-white"
                  style={{ borderColor: `${g.color}50` }}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                    <span className="text-xs font-bold" style={{ color: g.color }}>
                      {g.tier}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mb-1">{g.label}</div>
                  <p className="text-[11px] text-slate-600 leading-tight">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Diagnostic Disclaimer */}
          <div className="bg-slate-100/90 border border-slate-300 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800 mb-1 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>{t.disclaimerTitle}</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              {t.disclaimerText}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 2 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 3: FIVE-AREA SCORES & IMPACT DASHBOARD */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                {t.secDomainScoresTitle}
              </h2>
              <p className="text-xs text-slate-500">{t.domainScoresSubtitle}</p>
            </div>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 2</span>
          </div>

          {/* Horizontal Bar Chart for all 5 domains */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 space-y-4">
            {Object.values(data.domainScores).map((domain) => (
              <div key={domain.code} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {isBn ? domain.name_bn : domain.name_en}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800">
                      {domain.score}/100
                    </span>
                    {getSeverityBadge(
                      domain.severity,
                      isBn ? domain.severity_bn : domain.severity_en
                    )}
                  </div>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    style={{ width: `${domain.score}%`, backgroundColor: domain.color }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Summary Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0F172A] text-white">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">{t.colDomain}</th>
                  <th className="py-2.5 px-3 font-semibold text-center">{t.colScore}</th>
                  <th className="py-2.5 px-3 font-semibold">{t.colSeverity}</th>
                  <th className="py-2.5 px-3 font-semibold text-center">{t.colDeviation}</th>
                  <th className="py-2.5 px-3 font-semibold">{t.colTools}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {Object.values(data.domainScores).map((domain) => (
                  <tr key={domain.code} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {isBn ? domain.name_bn : domain.name_en}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold">
                      {domain.score}
                    </td>
                    <td className="py-2.5 px-3">
                      {getSeverityBadge(
                        domain.severity,
                        isBn ? domain.severity_bn : domain.severity_en
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono">
                      {domain.percentDeviation > 0 ? (
                        <span className="text-rose-600 font-bold">+{domain.percentDeviation}%</span>
                      ) : (
                        <span className="text-emerald-600 font-bold">0% (Safe)</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                      {isBn ? domain.tools_bn : domain.tools_en}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Proportional Distribution Breakdown Bar */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-1">
              {t.proportionalShareTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-2">{t.proportionalShareDesc}</p>
            <ProportionalShareBar domainScores={data.domainScores} lang={lang} />
          </div>

          {/* Daily Life Impact Assessment Grid */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide mb-1">
              {t.dailyImpactTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-3">{t.dailyImpactDesc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <span>💼</span>
                    <span>{t.impactWorkLabel}</span>
                  </span>
                  {getSeverityBadge(data.dailyImpact.workSeverity)}
                </div>
                <p className="text-xs text-amber-950 leading-relaxed font-sans">
                  {isBn ? data.dailyImpact.work_bn : data.dailyImpact.work_en}
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <span>👥</span>
                    <span>{t.impactSocialLabel}</span>
                  </span>
                  {getSeverityBadge(data.dailyImpact.socialSeverity)}
                </div>
                <p className="text-xs text-blue-950 leading-relaxed font-sans">
                  {isBn ? data.dailyImpact.social_bn : data.dailyImpact.social_en}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 3 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 4: SYMPTOM MAPPING & FREQUENCY MATRIX */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                {t.secSymptomMatrixTitle}
              </h2>
              <p className="text-xs text-slate-500">{t.symptomMatrixSubtitle}</p>
            </div>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 3</span>
          </div>

          {/* Full Frequency Matrix Grid */}
          <SymptomFrequencyGrid symptoms={data.symptoms} lang={lang} />

          {/* High-frequency symptoms breakdown box */}
          <div className="mt-6 bg-rose-50/50 border border-rose-200 rounded-xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wide text-rose-900 mb-2 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>{t.frequentSymptomsTitle}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.symptoms
                .filter((s) => s.frequency >= 2)
                .map((s) => (
                  <div key={s.id} className="bg-white border border-rose-200 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="text-slate-800 pr-2 font-medium">
                      {isBn ? s.text_bn : s.text_en}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 shrink-0">
                      {isBn ? s.tag_bn : s.tag_en}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 4 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 5: PROFILE INTERPRETATION & CONTEXT */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.secProfileTitle}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 4</span>
          </div>

          {/* Combined Psychological Patterns Callouts */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-2">
              <span>🧩</span>
              <span>{t.combinedPatternsTitle}</span>
            </h3>
            <div className="space-y-3">
              {t.patterns.map((pat, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-white transition-colors">
                  <h4 className="text-xs font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{pat.title}</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{pat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Life Context & Environmental Modifiers Table */}
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-2">
              <span>🌍</span>
              <span>{t.lifeContextTitle}</span>
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F172A] text-white">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">{isBn ? "জীবনযাত্রার উপাদান" : "Life Factor"}</th>
                    <th className="py-2.5 px-3 font-semibold">{isBn ? "বর্তমান অবস্থা" : "Current Status"}</th>
                    <th className="py-2.5 px-3 font-semibold">{isBn ? "মনস্তাত্ত্বিক প্রভাব ও বিশ্লেষণ" : "Impact & Observations"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {t.contextItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{item.factor}</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 leading-relaxed font-sans">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 5 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGES 6, 7, 8 & 9: DETAILED DOMAIN ANALYSIS */}
        {/* ========================================================= */}

        {/* PAGE 6: DOMAIN 1 - ANXIETY & RESTLESSNESS */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.domains.anxiety.title}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 5.1</span>
          </div>

          {/* Score Banner */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-orange-800">
                {isBn ? "প্রাপ্ত স্কোর ও তীব্রতা" : "Score & Clinical Severity"}
              </span>
              <div className="text-2xl font-extrabold text-orange-950 font-mono">
                {data.domainScores.anxiety.score}/100
              </div>
            </div>
            <div>{getSeverityBadge(data.domainScores.anxiety.severity, isBn ? data.domainScores.anxiety.severity_bn : data.domainScores.anxiety.severity_en)}</div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-sans">
            {t.domains.anxiety.clinicalDesc}
          </p>

          <div className="bg-blue-50/50 border-l-4 border-blue-600 p-3.5 rounded-r-xl mb-4 text-xs sm:text-sm text-blue-950 leading-relaxed font-sans">
            <strong>{isBn ? "ব্যক্তিগত ফলাফল বিশ্লেষণ: " : "Personalized Clinical Feedback: "}</strong>
            {t.domains.anxiety.feedback}
          </div>

          {/* Key Symptoms & Biological Mechanism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                {isBn ? "প্রধান লক্ষণসমূহ" : "Key Clinical Symptoms"}
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5">
                {t.domains.anxiety.keySymptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
                {isBn ? "কেন এমন হয় (মনস্তাত্ত্বিক কারণ)" : "Psychological Mechanism"}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-2 font-sans">{t.domains.anxiety.mechanism}</p>
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-1">
                {isBn ? "অবহেলা করলে কী ক্ষতি হতে পারে" : "Risks of Neglect"}
              </h4>
              <p className="text-xs text-rose-900 leading-relaxed font-sans">{t.domains.anxiety.neglectRisk}</p>
            </div>
          </div>

          {/* Action Steps & Exercise */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 mb-4">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <span>🧘</span>
              <span>{t.domains.anxiety.exerciseTitle}</span>
            </h4>
            <ul className="text-xs text-emerald-900 space-y-1 font-sans">
              {t.domains.anxiety.exerciseSteps.map((st, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Referral */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 font-sans">
            <strong>{isBn ? "কখন বিশেষজ্ঞের কাছে যাবেন: " : "Emergency Specialist Trigger: "}</strong>
            {t.domains.anxiety.referralTrigger}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 6 of 12</span>
          </div>
        </section>

        {/* PAGE 7: DOMAIN 2 - MENTAL STRESS & BURNOUT */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.domains.stress.title}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 5.2</span>
          </div>

          {/* Score Banner */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-orange-800">
                {isBn ? "প্রাপ্ত স্কোর ও তীব্রতা" : "Score & Clinical Severity"}
              </span>
              <div className="text-2xl font-extrabold text-orange-950 font-mono">
                {data.domainScores.stress.score}/100
              </div>
            </div>
            <div>{getSeverityBadge(data.domainScores.stress.severity, isBn ? data.domainScores.stress.severity_bn : data.domainScores.stress.severity_en)}</div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-sans">
            {t.domains.stress.clinicalDesc}
          </p>

          <div className="bg-blue-50/50 border-l-4 border-blue-600 p-3.5 rounded-r-xl mb-4 text-xs sm:text-sm text-blue-950 leading-relaxed font-sans">
            <strong>{isBn ? "ব্যক্তিগত ফলাফল বিশ্লেষণ: " : "Personalized Clinical Feedback: "}</strong>
            {t.domains.stress.feedback}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                {isBn ? "প্রধান লক্ষণসমূহ" : "Key Clinical Symptoms"}
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5">
                {t.domains.stress.keySymptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
                {isBn ? "কেন এমন হয় (মনস্তাত্ত্বিক কারণ)" : "Psychological Mechanism"}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-2 font-sans">{t.domains.stress.mechanism}</p>
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-1">
                {isBn ? "অবহেলা করলে কী ক্ষতি হতে পারে" : "Risks of Neglect"}
              </h4>
              <p className="text-xs text-rose-900 leading-relaxed font-sans">{t.domains.stress.neglectRisk}</p>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 mb-4">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <span>🎯</span>
              <span>{t.domains.stress.exerciseTitle}</span>
            </h4>
            <ul className="text-xs text-emerald-900 space-y-1 font-sans">
              {t.domains.stress.exerciseSteps.map((st, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 font-sans">
            <strong>{isBn ? "কখন বিশেষজ্ঞের কাছে যাবেন: " : "Emergency Specialist Trigger: "}</strong>
            {t.domains.stress.referralTrigger}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 7 of 12</span>
          </div>
        </section>

        {/* PAGE 8: DOMAIN 3 - DEPRESSION & LOW MOOD */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.domains.depression.title}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 5.3</span>
          </div>

          {/* Score Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-amber-800">
                {isBn ? "প্রাপ্ত স্কোর ও তীব্রতা" : "Score & Clinical Severity"}
              </span>
              <div className="text-2xl font-extrabold text-amber-950 font-mono">
                {data.domainScores.depression.score}/100
              </div>
            </div>
            <div>{getSeverityBadge(data.domainScores.depression.severity, isBn ? data.domainScores.depression.severity_bn : data.domainScores.depression.severity_en)}</div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 font-sans">
            {t.domains.depression.clinicalDesc}
          </p>

          <div className="bg-blue-50/50 border-l-4 border-blue-600 p-3.5 rounded-r-xl mb-4 text-xs sm:text-sm text-blue-950 leading-relaxed font-sans">
            <strong>{isBn ? "ব্যক্তিগত ফলাফল বিশ্লেষণ: " : "Personalized Clinical Feedback: "}</strong>
            {t.domains.depression.feedback}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                {isBn ? "প্রধান লক্ষণসমূহ" : "Key Clinical Symptoms"}
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5">
                {t.domains.depression.keySymptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
                {isBn ? "কেন এমন হয় (মনস্তাত্ত্বিক কারণ)" : "Psychological Mechanism"}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-2 font-sans">{t.domains.depression.mechanism}</p>
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-1">
                {isBn ? "অবহেলা করলে কী ক্ষতি হতে পারে" : "Risks of Neglect"}
              </h4>
              <p className="text-xs text-rose-900 leading-relaxed font-sans">{t.domains.depression.neglectRisk}</p>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 mb-4">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <span>🌱</span>
              <span>{t.domains.depression.exerciseTitle}</span>
            </h4>
            <ul className="text-xs text-emerald-900 space-y-1 font-sans">
              {t.domains.depression.exerciseSteps.map((st, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 font-sans">
            <strong>{isBn ? "কখন বিশেষজ্ঞের কাছে যাবেন: " : "Emergency Specialist Trigger: "}</strong>
            {t.domains.depression.referralTrigger}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 8 of 12</span>
          </div>
        </section>

        {/* PAGE 9: DOMAINS 4 & 5 - SLEEP & SOMATICS */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {isBn ? "ক্ষেত্র ৪ ও ৫: ঘুম ও শারীরিক উপসর্গ" : "Domains 4 & 5: Sleep & Somatic Symptoms"}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 5.4-5.5</span>
          </div>

          {/* Domain 4: Sleep */}
          <div className="mb-6 border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-blue-900">
                {t.domains.sleep.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs">{data.domainScores.sleep.score}/100</span>
                {getSeverityBadge(data.domainScores.sleep.severity, isBn ? data.domainScores.sleep.severity_bn : data.domainScores.sleep.severity_en)}
              </div>
            </div>
            <p className="text-xs text-slate-700 mb-2 font-sans">{t.domains.sleep.feedback}</p>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 mb-2 font-sans">
              <strong>{isBn ? "স্লিপ হাইজিন নিয়ম: " : "Sleep Hygiene Protocol: "}</strong>
              {t.domains.sleep.exerciseSteps.join(" ")}
            </div>
          </div>

          {/* Domain 5: Somatic Symptoms */}
          <div className="mb-6 border border-slate-200 rounded-xl p-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-emerald-900">
                {t.domains.somatic.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs">{data.domainScores.somatic.score}/100</span>
                {getSeverityBadge(data.domainScores.somatic.severity, isBn ? data.domainScores.somatic.severity_bn : data.domainScores.somatic.severity_en)}
              </div>
            </div>
            <p className="text-xs text-slate-700 mb-2 font-sans">{t.domains.somatic.feedback}</p>
            <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 mb-2 font-sans">
              <strong>{isBn ? "প্রগ্রেসিভ মাসল রিলাক্সেশন (PMR): " : "Progressive Muscle Relaxation: "}</strong>
              {t.domains.somatic.exerciseSteps.join(" ")}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 9 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 10: STRENGTHS, ROADMAP & FAMILY ROLE */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.secStrengthsRoadmapTitle}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 6-7</span>
          </div>

          {/* Structured Action Plan Roadmap Table */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span>📅</span>
              <span>{t.actionPlanTitle}</span>
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F172A] text-white">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold w-28">{isBn ? "সময়কাল" : "Timeline"}</th>
                    <th className="py-2.5 px-3 font-semibold w-40">{isBn ? "মূল লক্ষ্য" : "Strategic Focus"}</th>
                    <th className="py-2.5 px-3 font-semibold">{isBn ? "বাস্তবমুখী পদক্ষেপ" : "Action Steps"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {t.planStages.map((stg, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-900">{stg.stage}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{stg.focus}</td>
                      <td className="py-2.5 px-3 text-slate-700 leading-relaxed font-sans">{stg.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Professional Suitability Table */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-1 flex items-center gap-1.5">
              <span>🩺</span>
              <span>{t.triageTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-2">{t.triageDesc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {t.triageList.map((trg, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                  <div className="text-xs font-bold text-slate-900 mb-1">{trg.role}</div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 mb-2">
                    {trg.fit}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug font-sans">{trg.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Family Support Section */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-1.5">
              <span>👨‍👩‍👧‍👦</span>
              <span>{t.familyRoleTitle}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3">
                <h4 className="font-bold text-emerald-950 mb-2">{t.familyDoTitle}</h4>
                <ul className="space-y-1.5 text-emerald-900 font-sans">
                  {t.familyDoList.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/50 border border-rose-200 rounded-lg p-3">
                <h4 className="font-bold text-rose-950 mb-2">{t.familyDontTitle}</h4>
                <ul className="space-y-1.5 text-rose-900 font-sans">
                  {t.familyDontList.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 10 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 11: FORWARD PATHS & SCIENCE OF MIND */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.secForwardPathsTitle}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 9-10</span>
          </div>

          {/* Comparative Paths: Path A vs Path B */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-1.5">
              <span>⚖️</span>
              <span>{t.pathsTitle}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Path A */}
              <div className="border border-rose-200 rounded-xl p-4 bg-rose-50/40">
                <h4 className="text-xs font-bold text-rose-900 mb-1">{t.pathA.title}</h4>
                <p className="text-[11px] text-rose-800 mb-3 italic">{t.pathA.desc}</p>
                <ul className="text-xs text-rose-950 space-y-1.5 font-sans">
                  {t.pathA.outcomes.map((out, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">✕</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Path B */}
              <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/40">
                <h4 className="text-xs font-bold text-emerald-900 mb-1">{t.pathB.title}</h4>
                <p className="text-[11px] text-emerald-800 mb-3 italic">{t.pathB.desc}</p>
                <ul className="text-xs text-emerald-950 space-y-1.5 font-sans">
                  {t.pathB.outcomes.map((out, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Science of Mind Visuals: Stress Bucket & CBT Loop */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>🧠</span>
              <span>{t.scienceTitle}</span>
            </h3>

            {/* Stress Bucket Diagram */}
            <StressBucketChart currentStrain={data.overallIndex.score} lang={lang} />

            {/* CBT Interconnection Cycle */}
            <CbtCycleChart lang={lang} />
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 11 of 12</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 12: HELP, HELPLINES & VIDEO RESOURCES */}
        {/* ========================================================= */}
        <section className="mhs-page bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative">
          <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              {t.secHelpTitle}
            </h2>
            <span className="text-xs font-mono text-slate-400">MHS-BD / Sec 11-12</span>
          </div>

          {/* Emergency Hotlines Directory */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-rose-900 mb-2 flex items-center gap-1.5">
              <span>🚨</span>
              <span>{t.crisisHotlineTitle}</span>
            </h3>
            <div className="overflow-x-auto border border-rose-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-rose-900 text-white">
                  <tr>
                    <th className="py-2 px-3 font-semibold">{isBn ? "সেবা ও সংস্থার নাম" : "Helpline / Agency"}</th>
                    <th className="py-2 px-3 font-semibold font-mono">{isBn ? "ফোন নম্বর" : "Contact Number"}</th>
                    <th className="py-2 px-3 font-semibold">{isBn ? "বিবরণ ও কার্যপদ্ধতি" : "Description & Scope"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-200 bg-rose-50/30">
                  {t.hotlineList.map((h, idx) => (
                    <tr key={idx} className="hover:bg-rose-100/40">
                      <td className="py-2 px-3 font-bold text-rose-950">{h.name}</td>
                      <td className="py-2 px-3 font-mono font-bold text-rose-700">{h.number}</td>
                      <td className="py-2 px-3 text-slate-700 leading-snug font-sans">{h.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Professional Services */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span>🌐</span>
              <span>{t.professionalServicesTitle}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.serviceList.map((s, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                  <div className="text-xs font-bold text-blue-900">{s.name}</div>
                  <div className="text-[11px] font-mono text-slate-500 mb-1">{s.contact}</div>
                  <p className="text-[11px] text-slate-600 leading-snug font-sans">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Curated YouTube Video References */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span>▶️</span>
              <span>{t.videoLibraryTitle}</span>
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F172A] text-white">
                  <tr>
                    <th className="py-2 px-3 font-semibold">{isBn ? "ভিডিও শিরোনাম ও বিষয়" : "Session Title"}</th>
                    <th className="py-2 px-3 font-semibold">{isBn ? "বিশেষজ্ঞ বক্তা" : "Expert Presenter"}</th>
                    <th className="py-2 px-3 font-semibold">{isBn ? "মূল শিক্ষা" : "Key Takeaway"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {t.videoList.map((v, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2 px-3 font-semibold text-slate-900">{v.title}</td>
                      <td className="py-2 px-3">
                        <span className="font-bold text-blue-900 block">{v.presenter}</span>
                        <span className="text-[10px] text-slate-500 block">{v.role}</span>
                      </td>
                      <td className="py-2 px-3 text-slate-600 font-sans leading-snug">{v.topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reassessment Schedule & Author Sign-off */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 mb-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
              {t.reassessmentScheduleTitle}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-sans mb-3">
              {t.reassessmentScheduleText}
            </p>

            <div className="border-t border-slate-200 pt-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] text-slate-500 block">{t.authorTitle}</span>
                <span className="text-xs font-bold text-slate-900">{t.authorName}</span>
                <span className="text-[10px] text-slate-500 block">{t.authorCreds}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-slate-700">MHS-BD-2026</span>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 font-mono">
            {t.copyright}
          </div>

          <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>{t.mainTitle}</span>
            <span>Page 12 of 12</span>
          </div>
        </section>
      </div>
    </div>
  );
}
