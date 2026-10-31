import React, { useState } from "react";
import { RrsReportData, RrsLang, RrsDomainResult } from "./types";
import { SAMPLE_RRS_DATA, RRS_BANDS } from "./sampleData";
import {
  RRS_DOMAINS_CONTENT,
  WHAT_THE_REPORT_GIVES_YOU,
  PROFILE_GAP_TENDENCIES,
  ACTION_PLAN_30_DAYS,
  ACTION_PLAN_90_DAYS,
  THREE_CORE_HABITS,
  FIVE_REFLECTION_QUESTIONS,
} from "./translations";
import DistributionRangeChart from "./components/DistributionRangeChart";
import HorizontalScoreBar from "./components/HorizontalScoreBar";
import RrsHeader from "./components/RrsHeader";

interface RrsReportPageProps {
  initialData?: RrsReportData;
  responseId?: string;
  submittedDate?: string;
  defaultLang?: RrsLang;
}

export default function RrsReportPage({
  initialData,
  responseId,
  submittedDate,
  defaultLang = "en",
}: RrsReportPageProps) {
  const [lang, setLang] = useState<RrsLang>(defaultLang);
  const reportData: RrsReportData = initialData || SAMPLE_RRS_DATA;

  const toggleLang = () => setLang((prev) => (prev === "en" ? "bn" : "en"));

  const handlePrint = () => {
    window.print();
  };

  const reportNumber =
    reportData.metadata?.reportNumber ||
    (responseId ? `RRS-${responseId.slice(-8).toUpperCase()}` : "RRS-2026-004187");
  const dateStr =
    reportData.metadata?.date || submittedDate || "October 31, 2026";
  const candidateName = reportData.metadata?.name || "Career Stride Participant";
  const reference = reportData.metadata?.reference || "Career Stride Bangladesh";

  const { PR, MR, SR } = reportData.domainResults;
  const total = reportData.total;
  const gap = reportData.gap;

  // Header for each page
  const PageHeader = ({ pageNumber }: { pageNumber: number }) => (
    <div className="flex items-center justify-between text-xs text-stone-400 font-sans pb-3 mb-6 border-b border-stone-200/80">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
        <span className="font-semibold text-stone-700">whynotyoupsy.com</span>
      </div>
      <div className="hidden sm:block font-mono text-stone-400 text-[11px]">
        {reportNumber} · RRS-24
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleLang}
          className="print:hidden px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-[#B45309]/30 bg-stone-50 hover:bg-stone-100 text-[#B45309] cursor-pointer shadow-2xs"
          title="Toggle Language"
        >
          {lang === "en" ? "বাংলায় দেখুন" : "View in English"}
        </button>
        <span className="px-2 py-0.5 rounded bg-stone-100 font-bold text-stone-600">
          {lang === "en" ? `Page ${pageNumber}` : `পৃষ্ঠা ${pageNumber}`}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-stone-800 font-sans antialiased py-6 px-3 sm:px-6">
      {/* Main Pages Stack Container with Report Controls at the very top */}
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-0">
        {/* Report Top Action Toolbar (Print / PDF & Bangla-English Toggle) */}
        <RrsHeader
          lang={lang}
          onToggleLang={toggleLang}
          reportNumber={reportNumber}
          onPrint={handlePrint}
        />
        {/* =========================================================================
            PAGE 1: COVER & METADATA PAGE
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] overflow-hidden p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={1} />

          {/* Warm Bronze / Terracotta Top Cover Banner */}
          <div className="bg-gradient-to-br from-[#8C3C1E] via-[#A0522D] to-[#B45309] text-white rounded-xl p-8 sm:p-12 mb-10 relative overflow-hidden shadow-sm">
            <div className="absolute -right-10 -bottom-12 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-amber-200 bg-black/25 px-3 py-1 rounded">
                whynotyoupsy.com
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-rose-600/90 text-white font-bold px-3 py-1 rounded shadow-xs">
                  {lang === "en" ? "CONFIDENTIAL" : "গোপনীয়"}
                </span>

                {/* Quick Toggle in Banner */}
                <button
                  onClick={toggleLang}
                  className="print:hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <span className={lang === "bn" ? "text-amber-300 font-black underline underline-offset-2" : "text-white/80"}>বাংলা</span>
                  <span className="text-white/40">|</span>
                  <span className={lang === "en" ? "text-amber-300 font-black underline underline-offset-2" : "text-white/80"}>English</span>
                </button>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white mb-3 leading-tight">
              {lang === "en"
                ? "Responsibility and Reliability Assessment Report"
                : "দায়িত্বশীলতা ও নির্ভরযোগ্যতা মূল্যায়ন প্রতিবেদন"}
            </h1>

            <p className="text-sm sm:text-base text-amber-100 font-sans font-light max-w-2xl leading-relaxed">
              {lang === "en"
                ? "Responsibility and Reliability Scale — RRS-24"
                : "দায়িত্বশীলতা ও নির্ভরযোগ্যতা স্কেল — RRS-24"}
            </p>
          </div>

          {/* Centered Metadata Table */}
          <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-6 sm:p-8 mb-10 shadow-xs">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-stone-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {lang === "en" ? "Participant Record & Metadata" : "অংশগ্রহণকারী রেকর্ড ও মেটাডাটা"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex justify-between py-2 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Name" : "নাম"}
                </span>
                <span className="font-bold text-stone-900">{candidateName}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Report Number" : "প্রতিবেদন নম্বর"}
                </span>
                <span className="font-mono font-bold text-[#B45309]">
                  {reportNumber}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Date Completed" : "সম্পন্নের তারিখ"}
                </span>
                <span className="font-bold text-stone-900">{dateStr}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Reference Source" : "উৎস মাধ্যম"}
                </span>
                <span className="font-bold text-stone-900">{reference}</span>
              </div>

              <div className="flex justify-between py-2 sm:border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Report Language" : "প্রতিবেদনের ভাষা"}
                </span>
                <span className="font-bold text-[#1B4D3E]">
                  {lang === "en" ? "English (Official)" : "বাংলা (প্রমিত)"}
                </span>
              </div>

              <div className="flex justify-between py-2 sm:border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Validation Scale" : "মূল্যায়ন স্কেল"}
                </span>
                <span className="font-bold text-stone-800">RRS-24 (Edition 1.0)</span>
              </div>
            </div>
          </div>

          {/* Footer Credit Note */}
          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/90 text-stone-800 text-xs sm:text-sm leading-relaxed text-center font-serif">
            <p className="font-bold text-[#B45309] mb-1">
              {lang === "en"
                ? "Scale Author & Report Preparer"
                : "স্কেল প্রণেতা ও মূল্যায়ন সমন্বয়কারী"}
            </p>
            <p className="text-stone-700">
              {reportData.metadata.authorCredit}, {reportData.metadata.authorTitle} ·{" "}
              {reportData.metadata.affiliation}
            </p>
          </div>
        </section>

        {/* =========================================================================
            PAGE 2: INTRODUCTION & OVERVIEW ("1 Before You Begin")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={2} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "1 Orientation" : "১ প্রেক্ষাপট"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en" ? "1 Before You Begin" : "১ শুরু করার আগে"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          <div className="space-y-4 text-sm sm:text-base text-stone-700 font-serif leading-relaxed mb-8">
            <p>
              {lang === "en"
                ? "Responsibility and reliability are not abstract virtues; they are the practical structural framework that determines whether your commitments can be trusted in work, personal relationships, and social life. Being dependable allows individuals to build enduring social capital, quiet anxiety, and create safe environments for those around them."
                : "দায়িত্বশীলতা ও নির্ভরযোগ্যতা কেবল কোনো বিমূর্ত নৈতিক গুণ নয়; এগুলো হলো সেই ব্যবহারিক কাঠামো যা নির্ধারণ করে কর্মক্ষেত্রে, ব্যক্তিগত সম্পর্কে এবং সমাজে আপনার প্রতিশ্রুতি কতটা বিশ্বাসযোগ্য। নির্ভরযোগ্য মানুষ আশপাশে নিরাপত্তা তৈরি করেন এবং দীর্ঘমেয়াদী আস্থা অর্জন করেন।"}
            </p>
            <p>
              {lang === "en"
                ? "This 24-item assessment (RRS-24) maps your accountability across three interdependent dimensions: Personal Responsibility (your internal discipline and task follow-through), Moral Responsibility (your ethical consistency under private pressure), and Social Responsibility (your dependability toward the broader collective)."
                : "এই ২৪-আইটেম বিশিষ্ট স্কেলটি (RRS-24) আপনার দায়বদ্ধতাকে তিনটি পরস্পর নির্ভরশীল ক্ষেত্রে পরিমাপ করে: ব্যক্তিগত দায়িত্বশীলতা (স্ব-শৃঙ্খলা ও কাজ সম্পন্ন করা), নৈতিক দায়িত্বশীলতা (চাপের মুখে সততা রক্ষা), এবং সামাজিক দায়িত্বশীলতা (পরিবার ও সমাজের কল্যাণে ভূমিকা)।"}
            </p>
          </div>

          {/* Content Table Mapping: 7 Numbered Points */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "What this report gives you (7 Core Sections)"
                : "এই প্রতিবেদনে আপনি যা পাবেন (৭টি প্রধান অংশ)"}
            </h3>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#B45309] text-white">
                    <th className="py-2.5 px-3 w-12 text-center font-bold">#</th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Analytical Section" : "অংশের নাম"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Practical Insight" : "ব্যবহারিক অন্তর্দৃষ্টি"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {WHAT_THE_REPORT_GIVES_YOU.map((item, idx) => (
                    <tr
                      key={item.num}
                      className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-center text-[#B45309]">
                        {item.num}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-stone-900 whitespace-nowrap">
                        {lang === "en" ? item.title_en : item.title_bn}
                      </td>
                      <td className="py-2.5 px-4 text-stone-600 font-serif leading-relaxed">
                        {lang === "en" ? item.desc_en : item.desc_bn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Styled Info / Disclaimer Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* "How to read this" (amber border) */}
            <div className="p-5 rounded-xl bg-amber-50/60 border-l-4 border-amber-600 text-stone-800 text-xs sm:text-sm leading-relaxed shadow-xs">
              <span className="font-bold text-amber-900 block mb-1">
                {lang === "en" ? "How to read this" : "কীভাবে পড়বেন"}
              </span>
              <p className="font-serif italic text-stone-700">
                {lang === "en"
                  ? "Read this profile without defensiveness. No score defines you permanently. A lower number indicates an area where habits have not yet caught up with good intentions — nothing more."
                  : "কোনো আত্মপক্ষ সমর্থন ছাড়া এই রিপোর্টটি পড়ুন। কোনো স্কোর আপনার চিরন্তন পরিচয় নয়। নিম্ন স্কোর কেবল নির্দেশ করে যেখানে শুভ ইচ্ছার সাথে এখনো সঠিক অভ্যাসের মেলবন্ধন ঘটেনি।"}
              </p>
            </div>

            {/* "One honest word" (mirror metaphor, teal border) */}
            <div className="p-5 rounded-xl bg-teal-50/60 border-l-4 border-teal-600 text-stone-800 text-xs sm:text-sm leading-relaxed shadow-xs">
              <span className="font-bold text-teal-900 block mb-1">
                {lang === "en" ? "One honest word (The Mirror)" : "একটি অকপট কথা (আয়নার উপমা)"}
              </span>
              <p className="font-serif italic text-stone-700">
                {lang === "en"
                  ? "This report functions like an honest mirror: it reflects where you stand today. It does not judge; it simply provides a calibrated baseline so you can choose where to step next."
                  : "এই রিপোর্টটি একটি স্বচ্ছ আয়নার মতো: এটি দেখায় আজ আপনি কোথায় দাঁড়িয়ে আছেন। এটি কোনো রায় দেয় না, কেবল একটি পরিচ্ছন্ন ভিত্তি দেয় যাতে পরবর্তী পদক্ষেপ সচেতনভাবে নেওয়া যায়।"}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGE 3: VISUAL DASHBOARD ("2 Your Results at a Glance")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={3} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "2 Dashboard" : "২ ড্যাশবোর্ড"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en"
                ? "2 Your Results at a Glance"
                : "২ এক নজরে আপনার ফলাফল"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          {/* Overall Responsibility Score Card */}
          <div className="bg-gradient-to-b from-stone-50 to-white p-6 sm:p-8 rounded-xl border border-stone-200/90 shadow-sm text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-1">
              {lang === "en"
                ? "Overall Responsibility Score"
                : "সামগ্রিক দায়িত্বশীলতা স্কোর"}
            </span>

            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-6xl sm:text-7xl font-extrabold font-mono text-[#0D9488]">
                {total.scoreDisplay.toFixed(2)}
              </span>
              <span className="text-xl sm:text-2xl font-mono text-stone-400">
                / 5.00
              </span>
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 mb-3 shadow-2xs">
              {lang === "en" ? total.band.label_en : total.band.label_bn}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-serif leading-relaxed">
              {lang === "en"
                ? "Your overall score places you within the expected population average (3.00–4.12). You manage essential responsibilities reliably, with high personal execution and room for growth in collective social commitments."
                : "আপনার সামগ্রিক স্কোর প্রত্যাশিত গড় জনসংখ্যা সীমায় (৩.০০–৪.১২) রয়েছে। আপনি ব্যক্তিগত দায়িত্বগুলো অত্যন্ত দক্ষতার সাথে পালন করেন, তবে সামাজিক ক্ষেত্রে আরও অগ্রগতির সুযোগ রয়েছে।"}
            </p>
          </div>

          {/* Horizontal Bar Breakdown */}
          <div className="mb-8 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "Three-Area Performance Bars"
                : "তিনটি ক্ষেত্রের তুলনামূলক বার"}
            </h3>

            <HorizontalScoreBar
              label={lang === "en" ? PR.name_en : PR.name_bn}
              score={PR.scoreDisplay}
              level={lang === "en" ? PR.band.label_en : PR.band.label_bn}
              color="#1B4D3E"
              lang={lang}
              subLabel={lang === "en" ? "Internal follow-through" : "ব্যক্তিগত কাজ সম্পন্ন করা"}
            />

            <HorizontalScoreBar
              label={lang === "en" ? MR.name_en : MR.name_bn}
              score={MR.scoreDisplay}
              level={lang === "en" ? MR.band.label_en : MR.band.label_bn}
              color="#0D9488"
              lang={lang}
              subLabel={lang === "en" ? "Ethical consistency" : "নৈতিক মূল্যবোধ ও সততা"}
            />

            <HorizontalScoreBar
              label={lang === "en" ? SR.name_en : SR.name_bn}
              score={SR.scoreDisplay}
              level={lang === "en" ? SR.band.label_en : SR.band.label_bn}
              color="#B45309"
              lang={lang}
              subLabel={lang === "en" ? "Community & family care" : "পরিবার ও সামাজিক কল্যাণ"}
            />
          </div>

          {/* Segmented Distribution Range Charts ("Where you stand") */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-4 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "Where You Stand (Segmented 5-Level Ranges)"
                : "আপনার অবস্থান (৫টি স্তরের বিন্যাস চার্ট)"}
            </h3>

            <div className="space-y-4">
              <DistributionRangeChart domain={PR} lang={lang} />
              <DistributionRangeChart domain={MR} lang={lang} />
              <DistributionRangeChart domain={SR} lang={lang} />
            </div>
          </div>

          {/* Notice Box ("Worth noticing") */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs sm:text-sm text-stone-800 leading-relaxed shadow-xs">
            <span className="font-bold text-[#B45309] flex items-center gap-1.5 mb-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {lang === "en" ? "Worth Noticing: Critical Boundary Score" : "বিশেষ লক্ষ্যণীয়: গুরুত্বপূর্ণ সীমারেখা স্কোর"}
            </span>
            <p className="font-serif">
              {lang === "en"
                ? "Notice that your Social Responsibility score of 3.00 sits directly on the boundary separating Low (2.50–3.00) from Average (3.00–4.12). A modest positive habit can solidify this into stable ground, whereas a period of neglect could drop it into the Low category."
                : "লক্ষ্য করুন যে আপনার সামাজিক দায়িত্বশীলতার স্কোর ৩.০০ সরাসরি 'নিম্ন' (২.৫০–৩.০০) এবং 'গড়' (৩.০০–৪.১২)-এর সীমানায় অবস্থান করছে। সামান্য ইতিবাচক সচেতনতা এটিকে মজবুত অবস্থানে নিয়ে যেতে পারে, অন্যদিকে অবহেলা এটিকে নিম্ন স্তরে নামিয়ে দিতে পারে।"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            PAGES 4 & 5: DETAILED DOMAIN BREAKDOWN ("3 The Three Areas Separately")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={4} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "3 In-Depth Analysis" : "৩ বিস্তারিত পর্যালোচনা"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en"
                ? "3 The Three Areas Separately"
                : "৩ তিনটি ক্ষেত্র পৃথকভাবে"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          {/* Area 1: Personal Responsibility */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-6 mb-8 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#1B4D3E] font-mono font-bold text-xs">
                  PR
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {lang === "en"
                    ? RRS_DOMAINS_CONTENT.PR.title_en
                    : RRS_DOMAINS_CONTENT.PR.title_bn}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-extrabold text-[#1B4D3E]">
                  4.25
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-[#1B4D3E] border border-emerald-300">
                  {lang === "en" ? "High / Strength" : "উচ্চ / শক্তি"}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-serif italic mb-4">
              {lang === "en"
                ? RRS_DOMAINS_CONTENT.PR.scoreContext_en
                : RRS_DOMAINS_CONTENT.PR.scoreContext_bn}
            </p>

            {/* How this shows up day to day */}
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {lang === "en"
                  ? "How this shows up day to day:"
                  : "দৈনন্দিন জীবনে এটি যেভাবে প্রকাশ পায়:"}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 font-serif list-disc pl-5 leading-relaxed">
                {(lang === "en"
                  ? RRS_DOMAINS_CONTENT.PR.dayToDay_en
                  : RRS_DOMAINS_CONTENT.PR.dayToDay_bn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* What you could try */}
            <div className="pt-3 border-t border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                {lang === "en" ? "What you could try:" : "আপনি যা চেষ্টা করতে পারেন:"}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 font-serif list-circle pl-5 leading-relaxed">
                {(lang === "en"
                  ? RRS_DOMAINS_CONTENT.PR.suggestions_en
                  : RRS_DOMAINS_CONTENT.PR.suggestions_bn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Area 2: Moral Responsibility */}
          <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono font-bold text-xs">
                  MR
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {lang === "en"
                    ? RRS_DOMAINS_CONTENT.MR.title_en
                    : RRS_DOMAINS_CONTENT.MR.title_bn}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-extrabold text-[#0D9488]">
                  3.50
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-teal-50 text-teal-800 border border-teal-300">
                  {lang === "en" ? "Average / Expected" : "গড় / প্রত্যাশিত"}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-serif italic mb-4">
              {lang === "en"
                ? RRS_DOMAINS_CONTENT.MR.scoreContext_en
                : RRS_DOMAINS_CONTENT.MR.scoreContext_bn}
            </p>

            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                {lang === "en"
                  ? "Behavioral Insights & Pressure Points:"
                  : "আচরণগত বৈশিষ্ট্য ও চাপের মুহূর্ত:"}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 font-serif list-disc pl-5 leading-relaxed">
                {(lang === "en"
                  ? RRS_DOMAINS_CONTENT.MR.dayToDay_en
                  : RRS_DOMAINS_CONTENT.MR.dayToDay_bn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2">
                {lang === "en" ? "Action Suggestions:" : "কর্মপরিকল্পনার পরামর্শ:"}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 font-serif list-circle pl-5 leading-relaxed">
                {(lang === "en"
                  ? RRS_DOMAINS_CONTENT.MR.suggestions_en
                  : RRS_DOMAINS_CONTENT.MR.suggestions_bn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGE 5: CONTINUATION OF DOMAIN BREAKDOWN (Area 3: Social Responsibility)
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={5} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "3 In-Depth Analysis (Cont.)" : "৩ বিস্তারিত পর্যালোচনা (চলমান)"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en"
                ? "3 The Third Area: Social Responsibility"
                : "৩ তৃতীয় ক্ষেত্র: সামাজিক দায়িত্বশীলতা"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          {/* Area 3: Social Responsibility */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3 pb-2 border-b border-amber-200/80">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono font-bold text-xs">
                  SR
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {lang === "en"
                    ? RRS_DOMAINS_CONTENT.SR.title_en
                    : RRS_DOMAINS_CONTENT.SR.title_bn}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-extrabold text-[#B45309]">
                  3.00
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {lang === "en" ? "Average (Lower Edge)" : "গড় (নিম্ন সীমায়)"}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 font-serif italic mb-4">
              {lang === "en"
                ? RRS_DOMAINS_CONTENT.SR.scoreContext_en
                : RRS_DOMAINS_CONTENT.SR.scoreContext_bn}
            </p>

            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                {lang === "en"
                  ? "Community & Family Dependency Observations:"
                  : "সামাজিক ও পারিবারিক নির্ভরতার পর্যবেক্ষণ:"}
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-serif list-disc pl-5 leading-relaxed">
                {(lang === "en"
                  ? RRS_DOMAINS_CONTENT.SR.dayToDay_en
                  : RRS_DOMAINS_CONTENT.SR.dayToDay_bn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-amber-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-2">
                {lang === "en"
                  ? "Targeted Growth Recommendations:"
                  : "অগ্রগতির সুনির্দিষ্ট সুপারিশ:"}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 font-serif list-circle pl-5 leading-relaxed">
                {(lang === "en"
                  ? RRS_DOMAINS_CONTENT.SR.suggestions_en
                  : RRS_DOMAINS_CONTENT.SR.suggestions_bn
                ).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 font-serif leading-relaxed">
            <strong className="text-stone-800">
              {lang === "en" ? "Psychological Summary: " : "মনস্তাত্ত্বিক সারসংক্ষেপ: "}
            </strong>
            {lang === "en"
              ? "Notice that low social engagement is rarely a lack of caring; in most high-PR profiles, it is simply the byproduct of exhausting one's cognitive and time resources on isolated individual duties."
              : "মনে রাখবেন, সামাজিক সম্পৃক্ততার অভাব মানে ভালোবাসার অভাব নয়; অধিকাংশ উচ্চ ব্যক্তিগত দক্ষতাসম্পন্ন মানুষের ক্ষেত্রে এটি কেবল নিজের কাজ নিয়ে অতিরিক্ত ব্যস্ত থাকার স্বাভাবিক ফলাফল।"}
          </div>
        </section>

        {/* =========================================================================
            PAGE 6: COMPARATIVE PROFILE ANALYSIS ("4 The Shape of Your Profile")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={6} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "4 Profile Shape" : "৪ প্রোফাইলের রূপ"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en"
                ? "4 The Shape of Your Profile"
                : "৪ আপনার প্রোফাইলের রূপরেখা"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          {/* Summary Comparison Table */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en" ? "Profile Comparison Table" : "প্রোফাইল তুলনামূলক সারণি"}
            </h3>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#B45309] text-white">
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Responsibility Area" : "মূল্যায়ন ক্ষেত্র"}
                    </th>
                    <th className="py-2.5 px-4 font-bold text-center">
                      {lang === "en" ? "Score" : "স্কোর"}
                    </th>
                    <th className="py-2.5 px-4 font-bold text-center">
                      {lang === "en" ? "Normative Level" : "মাত্রা"}
                    </th>
                    <th className="py-2.5 px-4 font-bold text-center">
                      {lang === "en" ? "Standing" : "অবস্থান"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  <tr>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      {lang === "en" ? PR.name_en : PR.name_bn} (PR)
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-extrabold text-[#1B4D3E]">
                      {PR.scoreDisplay.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                        {lang === "en" ? "High" : "উচ্চ"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs font-semibold text-emerald-800">
                      {lang === "en" ? "Your Strength" : "আপনার প্রধান শক্তি"}
                    </td>
                  </tr>

                  <tr className="bg-stone-50/50">
                    <td className="py-3 px-4 font-bold text-stone-900">
                      {lang === "en" ? MR.name_en : MR.name_bn} (MR)
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-extrabold text-[#0D9488]">
                      {MR.scoreDisplay.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-300">
                        {lang === "en" ? "Average" : "গড়"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs font-semibold text-stone-600">
                      {lang === "en" ? "Expected Baseline" : "প্রত্যাশিত মান"}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      {lang === "en" ? SR.name_en : SR.name_bn} (SR)
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-extrabold text-[#B45309]">
                      {SR.scoreDisplay.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
                        {lang === "en" ? "Average (Lower)" : "গড় (নিম্ন)"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-xs font-semibold text-[#B45309]">
                      {lang === "en" ? "Main Area to Work On" : "উন্নতির প্রধান ক্ষেত্র"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gap Analysis Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-8 shadow-xs">
            <div className="flex items-center gap-2 mb-2 font-bold text-stone-900">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
              <span>
                {lang === "en"
                  ? `Spread Analysis: ${gap.display.toFixed(2)} Point Divergence`
                  : `ব্যবধান বিশ্লেষণ: ${gap.display.toFixed(2)} পয়েন্ট ব্যবধান`}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
              {lang === "en" ? gap.reading_en : gap.reading_bn}
            </p>
          </div>

          {/* "What this gap could mean over time" Table */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "What this gap could mean over time (4 Potential Tendencies)"
                : "সময়ের সাথে সাথে এই ব্যবধানের সম্ভাব্য প্রভাব"}
            </h3>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-800 text-white">
                    <th className="py-2.5 px-4 font-bold w-1/3">
                      {lang === "en" ? "Observable Tendency" : "সম্ভাব্য প্রবণতা"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Mechanism & Long-Term Risk" : "কারণ ও সম্ভাব্য ঝুঁকি"}
                    </th>
                    <th className="py-2.5 px-4 font-bold w-1/3">
                      {lang === "en" ? "What Helps" : "কী সাহায্য করবে"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {PROFILE_GAP_TENDENCIES.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}
                    >
                      <td className="py-3 px-4 font-bold text-stone-900 align-top">
                        {lang === "en" ? row.tendency_en : row.tendency_bn}
                      </td>
                      <td className="py-3 px-4 text-stone-600 font-serif leading-relaxed align-top">
                        {lang === "en" ? row.desc_en : row.desc_bn}
                      </td>
                      <td className="py-3 px-4 text-[#1B4D3E] font-medium font-serif leading-relaxed align-top">
                        {lang === "en" ? row.remedy_en : row.remedy_bn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Positive Reading Summary Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/70 border border-emerald-300 text-xs sm:text-sm text-emerald-950 font-serif leading-relaxed">
            <span className="font-bold text-emerald-900 block mb-1">
              {lang === "en" ? "The Positive Reading:" : "ইতিবাচক দিক:"}
            </span>
            {lang === "en"
              ? "Your profile reveals exceptional discipline and internal drive. Because you already possess high self-regulation (PR: 4.25), directing a fraction of that discipline outward toward social commitments is entirely within your existing capability."
              : "আপনার প্রোফাইল প্রমাণ করে যে আপনার তীব্র আত্ম-শৃঙ্খলা ও সংকল্প রয়েছে। যেহেতু ব্যক্তিগত কার্যক্ষমতা ইতোমধ্যে অত্যন্ত সুদৃঢ়, তাই এই সক্ষমতার একটি সামান্য অংশ সামাজিক কল্যাণে পরিচালিত করা আপনার সম্পূর্ণ নিয়ন্ত্রণে রয়েছে।"}
          </div>
        </section>

        {/* =========================================================================
            PAGE 7: STRUCTURED ACTION PLAN ("5 Your Action Plan")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={7} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "5 Implementation" : "৫ বাস্তবায়ন"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en"
                ? "5 Your Action Plan (Targeting Social Responsibility)"
                : "৫ আপনার কর্মপরিকল্পনা (সামাজিক দায়িত্বে বিশেষ নজর)"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          {/* First 30 Days Table ("Start small") */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "First 30 Days: Start Small (Week by Week)"
                : "প্রথম ৩০ দিন: ছোট পদক্ষেপ (সপ্তাহভিত্তিক)"}
            </h3>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#B45309] text-white">
                    <th className="py-2.5 px-3 w-20 text-center font-bold">
                      {lang === "en" ? "Week" : "সপ্তাহ"}
                    </th>
                    <th className="py-2.5 px-4 w-44 font-bold">
                      {lang === "en" ? "Theme / Focus" : "মূল প্রতিপাদ্য"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Concrete Action Step" : "সুনির্দিষ্ট করণীয়"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {ACTION_PLAN_30_DAYS.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-center text-[#B45309]">
                        {lang === "en" ? row.week_en : row.week_bn}
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        {lang === "en" ? row.focus_en : row.focus_bn}
                      </td>
                      <td className="py-3 px-4 text-stone-700 font-serif leading-relaxed">
                        {lang === "en" ? row.task_en : row.task_bn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Days 31 to 90 Table ("Turning it into habit") */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "Days 31 to 90: Turning It into Habit (Months 2 & 3)"
                : "৩১ থেকে ৯০ দিন: অভ্যাসে রূপান্তর (২য় ও ৩য় মাস)"}
            </h3>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-800 text-white">
                    <th className="py-2.5 px-4 w-48 font-bold">
                      {lang === "en" ? "Timeframe" : "সময়কাল"}
                    </th>
                    <th className="py-2.5 px-4 w-48 font-bold">
                      {lang === "en" ? "Milestone Objective" : "লক্ষ্য"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Practice Strategy" : "কৌশল"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {ACTION_PLAN_90_DAYS.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#B45309]">
                        {lang === "en" ? row.period_en : row.period_bn}
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        {lang === "en" ? row.title_en : row.title_bn}
                      </td>
                      <td className="py-3 px-4 text-stone-700 font-serif leading-relaxed">
                        {lang === "en" ? row.detail_en : row.detail_bn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Core Habits Guide Table */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "Three Rules for Sustaining Change"
                : "স্থায়ী পরিবর্তনের তিনটি মূল নিয়ম"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {THREE_CORE_HABITS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 border border-stone-200 rounded-xl p-4 shadow-xs"
                >
                  <span className="text-xs font-mono font-bold text-[#B45309] block mb-1">
                    Rule #{idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 mb-2">
                    {lang === "en" ? item.habit_en : item.habit_bn}
                  </h4>
                  <p className="text-xs text-stone-600 font-serif leading-relaxed">
                    {lang === "en" ? item.rule_en : item.rule_bn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Milestone Box */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 text-xs text-amber-900 font-serif leading-relaxed">
            <strong className="text-[#B45309]">
              {lang === "en" ? "90-Day Reassessment Recommendation: " : "৯০ দিন পর পুনরায় মূল্যায়ন: "}
            </strong>
            {lang === "en"
              ? "Re-take the RRS-24 assessment at the end of 90 days. Tracking changes in your numerical profile demonstrates whether new routines have stabilized into authentic behavioral defaults."
              : "৯০ দিন পর RRS-24 মূল্যায়নটি আবার দিন। স্কোরের পরিবর্তন পর্যবেক্ষণ করলে স্পষ্ট হবে নতুন পদক্ষেপগুলো আপনার স্থায়ী আচরণে পরিণত হয়েছে কি না।"}
          </div>
        </section>

        {/* =========================================================================
            PAGE 8: PSYCHOLOGICAL FRAMEWORK ("6 What the Psychology Says")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={8} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "6 Scientific Grounding" : "৬ মনস্তাত্ত্বিক ভিত্তি"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en"
                ? "6 What the Psychology Says"
                : "৬ মনস্তত্ত্ব কী বলে"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          <div className="space-y-6 text-sm text-stone-700 font-serif leading-relaxed">
            {/* Concept 1 */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs">
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {lang === "en"
                  ? "1. Responsibility is learned, not inherited (The Self-Regulation Model)"
                  : "১. দায়িত্বশীলতা জন্মগত নয়, শিক্ষণীয় (সেলফ-রেগুলেশন মডেল)"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === "en"
                  ? "Contemporary behavioral science confirms that dependability is built upon executive self-regulation rather than innate genetics. The capacity to delay immediate impulses, tolerate cognitive friction, and fulfill commitments behaves like a muscular faculty: it strengthens with deliberate, repeated micro-practice."
                  : "মনোবিজ্ঞান প্রমাণ করে যে দায়িত্বশীলতা কোনো জিনগত বৈশিষ্ট্য নয়, বরং মস্তিষ্কের আত্মনিয়ন্ত্রণ ক্ষমতার ফল। তাৎক্ষণিক তৃপ্তি ত্যাগ করে প্রতিশ্রুতি পূরণ করার সক্ষমতা একটি পেশির মতো — নিয়মিত ক্ষুদ্র অনুশীলনের মাধ্যমে এটি দিন দিন শক্তিশালী হয়।"}
              </p>
            </div>

            {/* Concept 2 */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs">
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {lang === "en"
                  ? "2. Why three separate areas matter"
                  : "২. কেন তিনটি ভিন্ন ক্ষেত্র থাকা প্রয়োজন"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === "en"
                  ? "Psychology historically grouped accountability into a monolithic trait. However, empirical factor modeling demonstrates that a person can be extraordinarily diligent in personal tasks (PR) while struggling with ethical dilemmas (MR) or withdrawing from community duties (SR). Measuring them independently prevents false generalizations."
                  : "অতীতে দায়িত্বশীলতাকে একটি অবিভাজ্য গুণ মনে করা হতো। কিন্তু আধুনিক গবেষণা দেখায় একজন ব্যক্তি ব্যক্তিগত কাজে নিখুঁত হলেও নৈতিক দ্বন্দ্বে আপস করতে পারেন কিংবা সামাজিক ক্ষেত্রে পিছিয়ে থাকতে পারেন। তিনটি দিক আলাদা দেখলে ব্যক্তিত্বের সত্য রূপ স্পষ্ট হয়।"}
              </p>
            </div>

            {/* Concept 3 & 4 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  {lang === "en" ? "Moral Identity Concept" : "নৈতিক আত্মপরিচয়ের ধারণা"}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === "en"
                    ? "Ethical action occurs when honesty is integrated into one's core self-concept rather than being followed merely as external compliance."
                    : "বাহ্যিক আইন বা ভয়ের বদলে সততা যখন একজন মানুষের আত্মপরিচয়ের অবিচ্ছেদ্য অংশে রূপ নেয়, তখনই নৈতিক আচরণ স্থায়ী হয়।"}
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  {lang === "en" ? "Social Capital & Mutual Trust" : "সামাজিক আস্থা ও যৌথ পুঁজি"}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {lang === "en"
                    ? "Communities function when members invest in collective welfare without expecting dollar-for-dollar reciprocity on the same day."
                    : "সমাজ তখনই নিরাপদে বাঁচে যখন সদস্যরা প্রতি মুহূর্তে তাৎক্ষণিক লাভের হিসাব না করে পরস্পরের কল্যাণে ভূমিকা রাখেন।"}
                </p>
              </div>
            </div>

            {/* Concept 5 */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs">
              <h3 className="font-bold text-stone-900 text-base mb-1">
                {lang === "en"
                  ? "3. How long authentic behavioral change takes (66 to 90 Days)"
                  : "৩. অভ্যাসের প্রকৃত রূপান্তরে কত সময় লাগে (৬৬ থেকে ৯০ দিন)"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === "en"
                  ? "Dr. Phillippa Lally's habit formation research at University College London demonstrates that establishing automatic neurological behavioral defaults requires an average of 66 days. Trying to rush transformation through emotional intensity burns out; consistency over 10 to 12 weeks creates permanent shifts."
                  : "ইউনিভার্সিটি কলেজ লন্ডনের গবেষণা নির্দেশ করে যে একটি নতুন অভ্যাস মস্তিষ্কে স্বয়ংক্রিয় রূপ নিতে গড়ে ৬৬ দিন সময় নেয়। অতিরিক্ত উত্তেজনায় দ্রুত পরিবর্তনের চেষ্টা করলে ক্লান্তি আসে; কিন্তু ১০ থেকে ১২ সপ্তাহ শান্তভাবে চর্চা করলে তা স্থায়ী হয়।"}
              </p>
            </div>
          </div>

          {/* Common Misconception Callout */}
          <div className="mt-8 p-5 rounded-xl bg-rose-50/70 border-l-4 border-rose-600 text-stone-800 text-xs sm:text-sm leading-relaxed shadow-xs">
            <span className="font-bold text-rose-900 block mb-1">
              {lang === "en"
                ? "A Common Misconception: 'If I just try harder...'"
                : "একটি সাধারণ ভ্রান্ত ধারণা: 'আরেকটু চেষ্টা করলেই সব ঠিক হয়ে যাবে...'"}
            </span>
            <p className="font-serif italic text-stone-700">
              {lang === "en"
                ? "Willpower is a depletable biological resource. Sustainable dependability is never built on raw strain; it is built on structured external systems, clear calendar boundaries, and environment design that makes keeping commitments easy."
                : "ইচ্ছাশক্তি একটি ক্ষয়িষ্ণু শক্তি। দীর্ঘস্থায়ী নির্ভরযোগ্যতা কেবল জোর করে ইচ্ছাশক্তি খাটানোর ওপর গড়ে ওঠে না; এটি গড়ে ওঠে সুপরিকল্পিত ব্যবস্থাপনা ও সহায়ক পরিবেশ রচনার মাধ্যমে।"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            PAGE 9: RESOURCES & FURTHER GUIDANCE ("7 Going Further")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={9} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">
              {lang === "en" ? "7 Continuity" : "৭ ধারাবাহিকতা"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
              {lang === "en" ? "7 Going Further" : "৭ আরও জানার জন্য"}
            </h2>
            <div className="w-16 h-1 bg-[#B45309] rounded-full" />
          </div>

          {/* Platform Services Table */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "Whynotyoupsy.com Developmental Services"
                : "আমাদের বিশেষায়িত সেবা ও দিকনির্দেশনা"}
            </h3>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#B45309] text-white">
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Service" : "সেবা"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Focus Area" : "বিবরণ"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Direct Access" : "যোগাযোগ"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  <tr>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      Writing on Responsibility
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-serif">
                      {lang === "en"
                        ? "Curated essays and research on adult accountability in Bangladesh"
                        : "বাংলাদেশের বাস্তবতায় দায়িত্বশীলতার ওপর বিশেষ নিবন্ধ ও গবেষণা"}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#B45309]">
                      whynotyoupsy.com/articles
                    </td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <td className="py-3 px-4 font-bold text-stone-900">
                      Personal Consultation Booking
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-serif">
                      {lang === "en"
                        ? "One-on-one psychological consultation with certified specialists"
                        : "অভিজ্ঞ মনোবিজ্ঞানীদের সাথে ব্যক্তিগত কাউন্সেলিং সেশন"}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#B45309]">
                      whynotyoupsy.com/counselling
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      Reassessment Tracking
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-serif">
                      {lang === "en"
                        ? "Log your progress and track longitudinal profile shifts over time"
                        : "সময়ের সাথে সাথে প্রোফাইলের অগ্রগতি ও পরিবর্তন ট্র্যাকিং"}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#B45309]">
                      whynotyoupsy.com/tests
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Reliable Institutional Sources Table */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 pb-2 border-b border-stone-200">
              {lang === "en"
                ? "Reliable Institutional Sources"
                : "নির্ভরযোগ্য প্রাতিষ্ঠানিক তথ্যসূত্র"}
            </h3>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-800 text-white">
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Institution" : "প্রতিষ্ঠান"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Scope of Guidance" : "সহায়তা ক্ষেত্র"}
                    </th>
                    <th className="py-2.5 px-4 font-bold">
                      {lang === "en" ? "Official Reference" : "ওয়েবসাইট / তথ্যসূত্র"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  <tr>
                    <td className="py-3 px-4 font-bold text-stone-900">
                      World Health Organization (WHO)
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-serif">
                      {lang === "en"
                        ? "Global guidelines on psychosocial wellbeing and self-efficacy"
                        : "মানসিক স্বাস্থ্য ও আত্মনিয়ন্ত্রণ সংক্রান্ত আন্তর্জাতিক গাইডলাইন"}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-stone-700">
                      who.int/mental_health
                    </td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <td className="py-3 px-4 font-bold text-stone-900">
                      National Institute of Mental Health (NIMH, Dhaka)
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-serif">
                      {lang === "en"
                        ? "Premier national psychiatric and clinical psychology institution in Bangladesh"
                        : "জাতীয় মানসিক স্বাস্থ্য ইনস্টিটিউট ও হাসপাতাল, ঢাকা"}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-stone-700">
                      nimh.gov.bd
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Five Questions to Ask Yourself After 90 Days */}
          <div className="mb-8 p-5 bg-stone-50 border border-stone-200 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-3 pb-1 border-b border-stone-200">
              {lang === "en"
                ? "Five Questions to Ask Yourself After 90 Days"
                : "৯০ দিন পর নিজেকে যে পাঁচটি প্রশ্ন করবেন"}
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
              {FIVE_REFLECTION_QUESTIONS.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-white border border-stone-200/80 rounded-lg">
                  {lang === "en" ? item.q_en : item.q_bn}
                </div>
              ))}
            </div>
          </div>

          {/* Support Guidance for Prolonged Exhaustion */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 font-serif leading-relaxed mb-8">
            <strong className="text-stone-800">
              {lang === "en" ? "Clinical Note on Exhaustion: " : "মানসিক ক্লান্তি সংক্রান্ত পরামর্শ: "}
            </strong>
            {lang === "en"
              ? "If you persistently feel that fulfilling basic personal or social expectations requires overwhelming emotional effort, this can reflect chronic fatigue or subtle burnout rather than a deficit in responsibility. Professional psychological consultation can help uncouple internal standards from exhaustion."
              : "নিয়মিত দায়িত্ব পালন করতে গিয়ে যদি অতিরিক্ত মানসিক ক্লান্তি বা শূন্যতা অনুভূত হয়, তবে তা অবহেলার লক্ষণ নয় — বরং দীর্ঘস্থায়ী মানসিক চাপের ইঙ্গিত হতে পারে। একজন পেশাদার মনোবিজ্ঞানীর সাথে কথা বললে চাপমুক্তভাবে দায়িত্ব পালনের সুস্থ ভারসাম্য ফিরে পাওয়া সম্ভব।"}
          </div>

          {/* Legal / Clinical Disclaimer & Author Copyright Credit */}
          <div className="pt-6 border-t border-stone-200 text-center text-xs text-stone-500 font-serif">
            <p className="font-semibold text-stone-700">
              © {new Date().getFullYear()} Kazi Fardous Iqbal · All Rights Reserved
            </p>
            <p className="mt-1">
              Responsibility and Reliability Scale (RRS-24) · whynotyoupsy.com
            </p>
            <p className="mt-2 text-[10px] text-stone-400 font-mono">
              Report Engine ID: {reportNumber} · BUP Research Series
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
