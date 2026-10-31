import React, { useState } from "react";
import {
  McrrReportData,
  ReportLang,
  DomainResultItem,
} from "./types";
import { SAMPLE_MCRR_DATA } from "./sampleData";
import { DOMAIN_DETAILS } from "./translations";
import RadarChart from "./components/RadarChart";
import GaugeChart from "./components/GaugeChart";
import SegmentedScoreBar from "./components/SegmentedScoreBar";
import SubIndicatorBars from "./components/SubIndicatorBars";
import MilestoneTimeline from "./components/MilestoneTimeline";
import McrrHeader from "./components/McrrHeader";

interface McrrReportPageProps {
  initialData?: McrrReportData;
  responseId?: string;
  submittedDate?: string;
  defaultLang?: ReportLang;
}

export default function McrrReportPage({
  initialData,
  responseId,
  submittedDate,
  defaultLang = "en",
}: McrrReportPageProps) {
  const [lang, setLang] = useState<ReportLang>(defaultLang);
  const [reportData, setReportData] = useState<McrrReportData>(() => {
    if (initialData) return initialData;
    return SAMPLE_MCRR_DATA;
  });
  const [isCustom, setIsCustom] = useState<boolean>(!!initialData);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "bn" : "en"));

  const handlePrint = () => {
    window.print();
  };

  const handleToggleSample = () => {
    if (isCustom) {
      setReportData(SAMPLE_MCRR_DATA);
      setIsCustom(false);
    } else {
      if (initialData) {
        setReportData(initialData);
        setIsCustom(true);
      } else {
        setReportData(SAMPLE_MCRR_DATA);
      }
    }
  };

  // Derived calculations
  const refCode =
    reportData.metadata?.referenceCode ||
    (responseId ? `MC-${responseId.slice(-8).toUpperCase()}` : "MC-2026-0926-4192");
  const version = reportData.metadata?.version || "Pilot Edition 1.0-P";
  const dateStr =
    reportData.metadata?.dateCompleted || submittedDate || "October 31, 2026";

  const totalScore = reportData.total?.index ?? 58;
  const totalBand = reportData.total?.band;
  const priScore = reportData.pri?.index ?? 42;

  const domains = reportData.domainResults;
  const domainKeys = ["D1", "D2", "D3", "D4", "D5", "D6"];
  const scoredDomains = domainKeys.filter((k) => domains[k]?.scored);

  // Two sides calculation (What the two of you bring vs The world around you)
  const internalKeys = ["D1", "D2", "D3", "D6"].filter((k) => domains[k]?.scored);
  const externalKeys = ["D4", "D5"].filter((k) => domains[k]?.scored);

  const internalAvg = internalKeys.length
    ? Math.round(
        internalKeys.reduce((acc, k) => acc + (domains[k]?.index ?? 0), 0) /
          internalKeys.length
      )
    : 72;

  const externalAvg = externalKeys.length
    ? Math.round(
        externalKeys.reduce((acc, k) => acc + (domains[k]?.index ?? 0), 0) /
          externalKeys.length
      )
    : 31;

  const sideGap = Math.abs(internalAvg - externalAvg);

  // Identify Strongest and Focus areas
  const sortedDomains = [...scoredDomains].sort(
    (a, b) => (domains[b]?.index ?? 0) - (domains[a]?.index ?? 0)
  );
  const strongestKey = sortedDomains[0] || "D1";
  const focusKeys = sortedDomains.slice(-2).reverse();

  const getScoreColor = (score: number) => {
    if (score >= 70) return "#15803D"; // Green
    if (score >= 55) return "#D97706"; // Amber
    if (score >= 40) return "#EA580C"; // Orange
    return "#DC2626"; // Crimson
  };

  const getBandLabel = (item: DomainResultItem) => {
    if (item.band) {
      return lang === "en" ? item.band.label_en : item.band.label_bn;
    }
    const s = item.index ?? 0;
    if (s >= 70) return lang === "en" ? "Strong" : "শক্তিশালী";
    if (s >= 55) return lang === "en" ? "Working" : "কার্যকর";
    if (s >= 40) return lang === "en" ? "Mixed" : "মিশ্র";
    return lang === "en" ? "Under strain" : "চাপের মুখে";
  };

  const getBandBadgeClass = (score: number) => {
    if (score >= 70)
      return "bg-emerald-50 text-emerald-800 border-emerald-300";
    if (score >= 55)
      return "bg-amber-50 text-amber-800 border-amber-300";
    if (score >= 40)
      return "bg-orange-50 text-orange-800 border-orange-300";
    return "bg-rose-50 text-rose-800 border-rose-300";
  };

  // Page Header sub-component for crisp multi-page consistency
  const PageHeader = ({ pageNumber }: { pageNumber: number }) => (
    <div className="flex items-center justify-between text-xs text-stone-400 font-sans pb-3 mb-6 border-b border-stone-200/80">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#1B4D3E]" />
        <span className="font-semibold text-stone-600">MCRR-BD</span>
      </div>
      <div className="hidden sm:block font-mono text-stone-400 text-[11px]">
        {refCode} · {version}
      </div>
      <div className="flex items-center gap-2">
        {/* Per-page quick toggle */}
        <button
          onClick={toggleLang}
          className="print:hidden px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-[#1B4D3E]/30 bg-stone-50 hover:bg-stone-100 text-[#1B4D3E] cursor-pointer shadow-2xs"
          title="Toggle Language / ভাষা পরিবর্তন"
        >
          {lang === "en" ? "বাংলায় দেখুন" : "View in English"}
        </button>
        <div className="px-2 py-0.5 rounded bg-stone-100 font-bold text-stone-600">
          {lang === "en" ? `Page ${pageNumber}` : `পৃষ্ঠা ${pageNumber}`}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-stone-800 font-sans antialiased py-6 px-3 sm:px-6">
      {/* Global Interactive Header */}
      <McrrHeader
        lang={lang}
        onToggleLang={toggleLang}
        referenceCode={refCode}
        version={version}
        onPrint={handlePrint}
        onLoadSample={handleToggleSample}
        isCustomData={isCustom}
      />

      {/* Main Pages Stack Container */}
      <div className="max-w-4xl mx-auto space-y-10 print:space-y-0">
        {/* =========================================================================
            PAGE 1: COVER & METADATA
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] overflow-hidden p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={1} />

          {/* Deep Forest Green Banner */}
          <div className="bg-[#1B4D3E] text-white rounded-xl p-8 sm:p-10 mb-8 relative overflow-hidden shadow-sm">
            <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#D97706] bg-black/20 px-3 py-1 rounded">
                  MCRR-BD
                </span>
                <span className="text-xs font-mono bg-rose-600/90 text-white font-bold px-3 py-1 rounded shadow-xs">
                  {refCode}
                </span>
              </div>

              {/* Direct Banner Language Toggle */}
              <button
                onClick={toggleLang}
                id="banner-lang-toggle"
                className="print:hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                title="Toggle Language / ভাষা পরিবর্তন করুন"
              >
                <span className={lang === "bn" ? "text-amber-300 font-black underline underline-offset-2" : "text-white/80"}>বাংলা</span>
                <span className="text-white/40">|</span>
                <span className={lang === "en" ? "text-amber-300 font-black underline underline-offset-2" : "text-white/80"}>English</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white mb-2 leading-tight">
              {lang === "en"
                ? "Your Relationship Report"
                : "আপনার সম্পর্ক প্রতিবেদন"}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 font-sans font-light max-w-2xl leading-relaxed">
              {lang === "en"
                ? "Marriage Compatibility & Relationship Readiness Scale — Bangladesh"
                : "বৈবাহিক সামঞ্জস্য ও সম্পর্ক-প্রস্তুতি স্কেল — বাংলাদেশ"}
            </p>
          </div>

          {/* Metadata Grid Table */}
          <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-6 sm:p-8 mb-8 shadow-xs">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-stone-200">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B4D3E]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {lang === "en" ? "Assessment Record & Profile Metadata" : "মূল্যায়ন রেকর্ড ও প্রোফাইল মেটাডাটা"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Questionnaire Completed" : "সম্পূর্ণকৃত প্রশ্নমালা"}
                </span>
                <span className="font-bold text-stone-800">
                  {lang === "en" ? "Form M (Married Couple Profile)" : "ফর্ম M (বিবাহিত দম্পতি প্রোফাইল)"}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Age Band" : "বয়সসীমা"}
                </span>
                <span className="font-bold text-stone-800">
                  {reportData.metadata?.ageBand || "25–29"}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Length of Marriage" : "বিবাহের স্থিতিকাল"}
                </span>
                <span className="font-bold text-stone-800">
                  {reportData.metadata?.relationshipDuration || "3–5 years"}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Division" : "বিভাগ"}
                </span>
                <span className="font-bold text-stone-800">
                  {reportData.metadata?.division || "Dhaka"}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Reference Source" : "উৎস মাধ্যম"}
                </span>
                <span className="font-bold text-stone-800">
                  {reportData.metadata?.referenceSource || "Direct Web Assessment"}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Date Completed" : "সম্পন্নের তারিখ"}
                </span>
                <span className="font-bold text-stone-800">{dateStr}</span>
              </div>

              <div className="flex justify-between py-1.5 sm:border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Report Language" : "রিপোর্ট ভাষা"}
                </span>
                <span className="font-bold text-[#1B4D3E]">
                  {lang === "en" ? "English (Official)" : "বাংলা (প্রমিত)"}
                </span>
              </div>

              <div className="flex justify-between py-1.5 sm:border-b border-stone-200/60">
                <span className="text-stone-500 font-medium">
                  {lang === "en" ? "Instrument Edition" : "সংস্করণ তথ্য"}
                </span>
                <span className="font-bold text-[#D97706]">{version}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">
              {lang === "en" ? "Confidentiality Notice: " : "গোপনীয়তা তথ্য: "}
            </span>
            {lang === "en"
              ? "This document contains sensitive psychological self-report data. All identifiers are masked to uphold complete anonymity."
              : "এই নথিতে সংবেদনশীল মানসিক তথ্য অন্তর্ভুক্ত রয়েছে। পূর্ণ গোপনীয়তা বজায় রাখার স্বার্থে শনাক্তকরণ তথ্য কোডে রূপান্তর করা হয়েছে।"}
          </div>
        </section>

        {/* =========================================================================
            PAGE 2: INTRODUCTION CONTEXT ("Before you read this report")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={2} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              {lang === "en" ? "Contextual Orientation" : "প্রেক্ষাপট ও অনুধাবন"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en"
                ? "Before you read this report"
                : "রিপোর্টটি পড়ার আগে"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          <div className="space-y-4 text-sm sm:text-base text-stone-700 leading-relaxed font-serif">
            <p>
              {lang === "en"
                ? "You have just completed a questionnaire engineered specifically for marriage in Bangladesh. Almost every established marital assessment in the world was developed in Western societies where a newlywed couple routinely sets up an isolated nuclear household, and where the direct day-to-day role of elders and community opinion is minimal."
                : "আপনি এইমাত্র বাংলাদেশের বৈবাহিক বাস্তবতার জন্য বিশেষভাবে উদ্ভাবিত একটি প্রশ্নমালা সম্পন্ন করেছেন। বিশ্বের অধিকাংশ প্রতিষ্ঠিত বৈবাহিক স্কেল এমন সংস্কৃতিতে নির্মিত যেখানে বিয়ের পর দম্পতি পুরোপুরি স্বাধীন আলাদা পরিবারে বাস করে এবং সেখানে সমাজের কথা বা পরিবারের বড়দের দৈনন্দিন ভূমিকা খুবই সীমিত।"}
            </p>

            <p>
              {lang === "en"
                ? "Ours is not such a society. In Bangladesh, family and extended networks live inside the relationship — the joint household, intergenerational expectations, communal conversations, and collective approval. Until now, there has been no validated psychological instrument calibrated to assess that lived reality."
                : "আমাদের সমাজ তা নয়। বাংলাদেশে পরিবার ও সমাজ সম্পর্কের বাইরের কোনো উপাদান নয়, তারা সম্পর্কের ভেতরেই অবস্থান করে — যৌথ গৃহস্থালি, পারস্পরিক প্রত্যাশা, সমাজ ও আত্মীয়দের মূল্যায়ন। এতদিন পর্যন্ত আমাদের এই সামাজিক বাস্তবতাকে পরিমাপ করার মতো কোনো উপযুক্ত স্কেল ছিল না।"}
            </p>

            <p>
              {lang === "en"
                ? "This scale examines your bond across six discrete foundational dimensions: how you communicate and recover from friction, emotional attunement and safety, life-goal and financial alignment, boundary negotiations with family, social pressure buffering, and personal readiness. A relationship can never be summarized into a single superficial number — the greatest wisdom is found in the unique silhouette these six domains sculpt together."
                : "এই স্কেলটি আপনার সম্পর্ককে ছয়টি গুরুত্বপূর্ণ দিক থেকে পর্যালোচনা করে: কথা বলার ধরন ও দ্বন্দ্ব সংস্কার, আবেগীয় নির্ভরতা ও আস্থা, জীবনলক্ষ্য ও আর্থিক মূল্যবোধের মিল, পরিবারের সাথে সীমারেখা রক্ষা, সামাজিক চাপ সামলানো এবং ব্যক্তিগত মানসিক প্রস্তুতি। একটি সম্পর্ক কখনোই একটি সাধারণ নম্বরে সংজ্ঞায়িত হয় না — সবচেয়ে জরুরি হলো এই ছয়টি ক্ষেত্র একত্রিত হয়ে কী সামগ্রিক রূপ তৈরি করছে।"}
            </p>
          </div>

          {/* Soft Amber Border Disclaimer Box */}
          <div className="my-8 p-5 sm:p-6 rounded-xl bg-amber-50/70 border-l-4 border-[#D97706] text-stone-800 text-xs sm:text-sm leading-relaxed shadow-xs">
            <div className="flex items-center gap-2 mb-2 font-bold text-[#D97706]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{lang === "en" ? "Structured Diagnostic Disclaimer" : "কাঠামোগত সতর্কীকরণ"}</span>
            </div>
            <p className="italic">
              {lang === "en"
                ? "It is equally essential to clarify what this report does not do. It is not a clinical psychiatric diagnosis. It cannot predict whether a marriage will last — no psychometric instrument possesses that power. It does not grade or condemn your partner, nor does it adjudicate who is right. It provides an unvarnished mirror of your relationship as you currently experience it, alongside an actionable, compassionate plan to reinforce it."
                : "এই রিপোর্ট কী করে না তা জানা সমান জরুরি। এটি কোনো মানসিক রোগ নির্ণয় নয় এবং কোনো বিবাহ টিকবে কি টিকবে না তার অবধারিত ভবিষ্যদ্বাণী করে না। এটি সঙ্গীকে কোনো গ্রেড দেয় না কিংবা কে সঠিক তা নিয়ে রায় দেয় না। এটি কেবল বর্তমান বাস্তবতার একটি সুসংহত প্রতিচ্ছবি এবং সম্পর্ককে নিরাপদ রাখার একটি ব্যবহারিক পথনির্দেশিকা।"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 leading-relaxed">
            <strong className="text-stone-800">
              {lang === "en" ? "Recommended reading approach: " : "রিপোর্ট পড়ার সেরা পদ্ধতি: "}
            </strong>
            {lang === "en"
              ? "Review the entire document once calmly, then set it aside for 48 hours. Return later to focus exclusively on the Four-Week Action Plan. Lasting marital transformation occurs through small, steady relational micro-habits rather than abrupt, overwhelming confrontations."
              : "একবার মনোযোগ দিয়ে পুরো রিপোর্টটি পড়ুন, এরপর এক-দুই দিন নিজের মনে চিন্তা করুন। পরবর্তীতে চার সপ্তাহের পরিকল্পনা অংশে ফিরে আসুন। যেকোনো স্থায়ী ইতিবাচক পরিবর্তন হঠাৎ বড় কোনো সিদ্ধান্তের চেয়ে ক্ষুদ্র দৈনিক অভ্যাসের মাধ্যমেই ঘটে।"}
          </div>
        </section>

        {/* =========================================================================
            PAGE 3: OVERVIEW & CORE VISUALS ("At a glance")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={3} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              {lang === "en" ? "Executive Summary" : "সারসংক্ষেপ ও এক নজরে"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en" ? "At a glance" : "এক নজরে আপনার সম্পর্ক"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          {/* Segmented Gradient Bar Component */}
          <SegmentedScoreBar
            score={totalScore}
            band={totalBand}
            lang={lang}
          />

          <p className="text-sm text-stone-700 font-serif leading-relaxed mb-6">
            {lang === "en"
              ? `Your overall relationship index is ${totalScore} — situating your profile in the ${totalBand?.label_en.toLowerCase() || "working"} category. This is the most common cohort score. Crucially, the aggregate score matters far less than your structural balance: which pillars are holding the arch up, and where weight is causing strain.`
              : `আপনার সামগ্রিক সম্পর্ক সূচক ${totalScore} — যা আপনার প্রোফাইলকে ${totalBand?.label_bn || "কার্যকর"} পরিসরে স্থাপন করে। এটি সর্বাধিক পরিলক্ষিত একটি সাধারণ স্কোর। তবে সামগ্রিক নম্বরের চেয়ে জরুরি হলো কাঠামোগত ভারসাম্য: কোন ক্ষেত্রগুলো সম্পর্ককে সুরক্ষা দিচ্ছে এবং কোথায় অতিরিক্ত চাপ সৃষ্টি হচ্ছে।`}
          </p>

          {/* Strongest vs Attention Callout Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-4 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                {lang === "en" ? "Strongest Anchor Domain" : "সবচেয়ে শক্তিশালী ভিত্তি"}
              </span>
              <div className="text-base font-bold text-emerald-950 mt-1">
                {lang === "en"
                  ? domains[strongestKey]?.name_en
                  : domains[strongestKey]?.name_bn}
              </div>
              <div className="text-xs text-emerald-700 mt-1">
                {lang === "en" ? "Index Score: " : "সূচক স্কোর: "}
                <strong className="text-emerald-900">{domains[strongestKey]?.index}/100</strong>
                {" · "}
                {lang === "en" ? "High resilience asset" : "অত্যন্ত মজবুত ভিত্তি"}
              </div>
            </div>

            <div className="bg-rose-50/70 border border-rose-200/90 rounded-xl p-4 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                {lang === "en" ? "Area Needing Attention Most" : "যেখানে মনোযোগ সবচেয়ে বেশি প্রয়োজন"}
              </span>
              <div className="text-base font-bold text-rose-950 mt-1">
                {focusKeys
                  .map((k) => (lang === "en" ? domains[k]?.name_en : domains[k]?.name_bn))
                  .join(" · ")}
              </div>
              <div className="text-xs text-rose-700 mt-1">
                {lang === "en"
                  ? "Vulnerable to external household intrusion"
                  : "পারিবারিক ও সামাজিক চাপের প্রতি সংবেদনশীল"}
              </div>
            </div>
          </div>

          {/* Horizontal Comparison: The Balance of the Two Sides */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-8 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1B4D3E]" />
              {lang === "en" ? "The Balance of the Two Sides" : "দুই দিকের ভারসাম্য"}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {lang === "en"
                ? "Comparing internal couple cohesion against external societal friction"
                : "দম্পতির অভ্যন্তরীণ ঐক্য বনাম চারপাশের পরিবেশের প্রভাব"}
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#1B4D3E]">
                    {lang === "en" ? "What the two of you bring (Internal Bond)" : "তোমরা দুজনে যা নিয়ে এসো (অভ্যন্তরীণ বন্ধন)"}
                  </span>
                  <span className="text-[#1B4D3E] font-bold">{internalAvg} / 100</span>
                </div>
                <div className="w-full h-3.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-[#1B4D3E] rounded-full transition-all duration-700"
                    style={{ width: `${internalAvg}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-rose-700">
                    {lang === "en" ? "The world around you (External Pressure Buffering)" : "তোমাদের চারপাশের জগৎ (বাহ্যিক চাপ মোকাবিলা)"}
                  </span>
                  <span className="text-rose-700 font-bold">{externalAvg} / 100</span>
                </div>
                <div className="w-full h-3.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-700 rounded-full transition-all duration-700"
                    style={{ width: `${externalAvg}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-600 italic mt-4 pt-3 border-t border-stone-200/80">
              {lang === "en"
                ? `The two sides differ by ${sideGap} points. A significant gap confirms that your difficulties are primarily situational and external, rather than stemming from personal marital incompatibility.`
                : `দুই দিকের মধ্যে ব্যবধান ${sideGap} পয়েন্ট। এই ধরনের বড় ব্যবধান প্রমাণ করে যে আপনাদের অসুবিধাগুলো পরিস্থিতিগত ও বাহ্যিক, ব্যক্তিগত অসামঞ্জস্যতা নয়।`}
            </p>
          </div>

          {/* Semi-Circle Gauge: The Family-Pressure Question */}
          <div className="border border-stone-200/90 rounded-xl p-6 bg-white shadow-xs">
            <div className="text-center mb-2">
              <h3 className="text-base font-bold text-stone-900">
                {lang === "en" ? "The Family-Pressure Question" : "পারিবারিক চাপের প্রশ্ন"}
              </h3>
              <p className="text-xs text-stone-500">
                {lang === "en"
                  ? "Evaluating how effectively your boundary buffers outside interference"
                  : "বাইরের চাপ সম্পর্কের ভেতরে ঢুকছে কি না তার পরিমাপ"}
              </p>
            </div>

            <GaugeChart score={priScore} lang={lang} />

            <div className="mt-4 p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
              {priScore >= 70
                ? lang === "en"
                  ? "Outside pressure is largely handled as a cohesive team. The two of you possess a functional perimeter for sheltering each other."
                  : "বাইরের চাপ মূলত ঐক্যবদ্ধ দল হিসেবে সামলানো হচ্ছে। আপনাদের দুজনের মধ্যে সুরক্ষামূলক বোঝাপড়া রয়েছে।"
                : priScore >= 55
                ? lang === "en"
                  ? "Outside pressure gets through some of the time. This is a snapshot of current stress, not a permanent diagnosis, and responds rapidly to boundary clarification."
                  : "বাইরের চাপ কখনো কখনো ভেতরে ঢুকে পড়ে। এটি সাময়িক পরিস্থিতির প্রতিচ্ছবি এবং সুস্থ সীমারেখা অনুশীলনের মাধ্যমে দ্রুত উন্নতি সম্ভব।"
                : lang === "en"
                ? "Outside pressure and in-law expectations are regularly entering the marital core, impacting how the two of you perceive and treat each other."
                : "বাইরের আলোচনা ও পারিবারিক প্রত্যাশা নিয়মিতভাবে বৈবাহিক অন্দরে প্রবেশ করে আপনাদের পারস্পরিক আস্থাকে প্রভাবিত করছে।"}
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGE 4: SIX-AREA VISUAL DASHBOARD
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={4} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              {lang === "en" ? "Comprehensive Architecture" : "ছয়টি ক্ষেত্রের চিত্র"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en" ? "Six-Area Visual Dashboard" : "ছয়টি ক্ষেত্রের ভিজ্যুয়াল ড্যাশবোর্ড"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          {/* Grid: Radar Chart + Horizontal Domain Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            {/* Interactive Radar Chart */}
            <div className="lg:col-span-6 bg-stone-50/70 border border-stone-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                {lang === "en" ? "Interactive Spider / Radar Profile" : "ইন্টারেক্টিভ স্পাইডার / রাডার প্রোফাইল"}
              </span>
              <RadarChart domains={domains} lang={lang} size={290} />
            </div>

            {/* Horizontal Domain Comparative Bars */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                {lang === "en" ? "Domain Rank Comparison (0 — 100)" : "ক্ষেত্রভিত্তিক তুলনামূলক স্কোর (০ — ১০০)"}
              </span>

              {domainKeys.map((key) => {
                const item = domains[key];
                if (!item || !item.scored) return null;
                const score = item.index ?? 0;
                const color = getScoreColor(score);
                const title = lang === "en" ? item.name_en : item.name_bn;

                return (
                  <div key={key} className="bg-stone-50/60 p-2.5 rounded-lg border border-stone-200/80">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-stone-800">
                        <span className="text-rose-700 mr-1.5">{key}:</span>
                        {title}
                      </span>
                      <span className="font-bold text-sm" style={{ color }}>
                        {score}
                      </span>
                    </div>

                    <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${score}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Data Table */}
          <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1B4D3E] text-white">
                  <th className="py-3 px-4 font-bold text-center w-14">Code</th>
                  <th className="py-3 px-4 font-bold">
                    {lang === "en" ? "Assessment Domain" : "মূল্যায়ন ক্ষেত্র"}
                  </th>
                  <th className="py-3 px-4 font-bold text-center w-24">
                    {lang === "en" ? "Score" : "স্কোর"}
                  </th>
                  <th className="py-3 px-4 font-bold text-center w-36">
                    {lang === "en" ? "Band Status" : "অবস্থা"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {domainKeys.map((key, idx) => {
                  const item = domains[key];
                  if (!item) return null;
                  const score = item.index ?? 0;
                  const color = getScoreColor(score);
                  const bandText = getBandLabel(item);
                  const badgeClass = getBandBadgeClass(score);

                  return (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}
                    >
                      <td className="py-3 px-4 font-mono font-extrabold text-rose-700 text-center">
                        {key}
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-800">
                        {lang === "en" ? item.name_en : item.name_bn}
                      </td>
                      <td
                        className="py-3 px-4 font-extrabold text-center text-sm"
                        style={{ color }}
                      >
                        {score}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${badgeClass}`}
                        >
                          {bandText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            PAGE 5: DETAILED "AREA BY AREA" BREAKDOWN (D1 to D3)
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={5} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              {lang === "en" ? "Internal Dynamics" : "অভ্যন্তরীণ রসায়ন"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en"
                ? "Detailed Area Breakdown: D1 to D3"
                : "বিস্তারিত ক্ষেত্র বিশ্লেষণ: D1 থেকে D3"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          <div className="space-y-8">
            {["D1", "D2", "D3"].map((key) => {
              const item = domains[key];
              const detail = DOMAIN_DETAILS[key];
              if (!item || !detail) return null;
              const score = item.index ?? 0;
              const color = getScoreColor(score);
              const badgeClass = getBandBadgeClass(score);

              return (
                <div
                  key={key}
                  className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-6 shadow-xs"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-extrabold text-xs">
                        {key}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        {lang === "en" ? detail.title_en : detail.title_bn}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold" style={{ color }}>
                        {score}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${badgeClass}`}>
                        {getBandLabel(item)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 italic mb-4">
                    {lang === "en" ? detail.summary_en : detail.summary_bn}
                  </p>

                  <div className="space-y-3 text-sm text-stone-700 font-serif leading-relaxed">
                    {(lang === "en" ? detail.detail_en : detail.detail_bn).map(
                      (p, i) => (
                        <p key={i}>{p}</p>
                      )
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                    <div>
                      <strong className="text-stone-700">
                        {lang === "en" ? "Clinical modality: " : "কাউন্সেলিং ধারা: "}
                      </strong>
                      {lang === "en" ? detail.modality_en : detail.modality_bn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            PAGE 6: DETAILED "AREA BY AREA" BREAKDOWN (D4 to D6)
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={6} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              {lang === "en" ? "Systemic & Boundary Dynamics" : "পারিবারিক ও সামাজিক বাস্তবতা"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en"
                ? "Detailed Area Breakdown: D4 to D6"
                : "বিস্তারিত ক্ষেত্র বিশ্লেষণ: D4 থেকে D6"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          <div className="space-y-8">
            {["D4", "D5", "D6"].map((key) => {
              const item = domains[key];
              const detail = DOMAIN_DETAILS[key];
              if (!item || !detail) return null;
              const score = item.index ?? 0;
              const color = getScoreColor(score);
              const badgeClass = getBandBadgeClass(score);

              return (
                <div
                  key={key}
                  className={`rounded-xl p-6 shadow-xs border ${
                    score < 40
                      ? "bg-rose-50/40 border-rose-200"
                      : "bg-stone-50/70 border-stone-200/80"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-extrabold text-xs">
                        {key}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        {lang === "en" ? detail.title_en : detail.title_bn}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold" style={{ color }}>
                        {score}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${badgeClass}`}>
                        {getBandLabel(item)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 italic mb-4">
                    {lang === "en" ? detail.summary_en : detail.summary_bn}
                  </p>

                  <div className="space-y-3 text-sm text-stone-700 font-serif leading-relaxed">
                    {(lang === "en" ? detail.detail_en : detail.detail_bn).map(
                      (p, i) => (
                        <p key={i}>{p}</p>
                      )
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                    <div>
                      <strong className="text-stone-700">
                        {lang === "en" ? "Psychological framing: " : "মনস্তাত্ত্বিক ভিত্তি: "}
                      </strong>
                      {lang === "en" ? detail.psych_en : detail.psych_bn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            PAGE 7: "WHAT THE GAPS ARE DOING" (Sub-Indicator Analysis)
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={7} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">
              {lang === "en" ? "Critical Vulnerability Deep-Dive" : "দুর্বলতার গভীর বিশ্লেষণ"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#DC2626] mt-1 mb-2">
              {lang === "en" ? "What the gaps are doing" : "ফাঁকগুলো সম্পর্কের কী ক্ষতি করছে"}
            </h2>
            <div className="w-16 h-1 bg-[#DC2626] rounded-full" />
          </div>

          <p className="text-sm text-stone-700 font-serif leading-relaxed mb-4">
            {lang === "en"
              ? "When boundaries are porous and outside judgments penetrate the home, distress does not remain an abstract concept — it translates into specific recurring behavioral frictions. The horizontal bar chart below breaks down your exact responses across all eight critical micro-indicators."
              : "যখন পারিবারিক সীমারেখা দুর্বল থাকে এবং সামাজিক চাপ ঘরে প্রবেশ করে, তখন তা তাত্ত্বিক সমস্যা থাকে না — তা বাস্তব আচরণগত সংকটে রূপ নেয়। নিচের চার্টে আটটি গুরুত্বপূর্ণ উপ-সূচকে আপনার প্রদত্ত উত্তরের সুনির্দিষ্ট বিশ্লেষণ উপস্থাপন করা হলো।"}
          </p>

          {/* Sub-Indicator Horizontal Bars Component */}
          {reportData.subIndicators && reportData.subIndicators.length > 0 && (
            <SubIndicatorBars
              indicators={reportData.subIndicators}
              lang={lang}
            />
          )}

          {/* Qualitative Deep Dives for Strained Areas */}
          <div className="space-y-6 mt-8">
            <div className="bg-rose-50/60 border-l-4 border-rose-600 rounded-r-xl p-5 sm:p-6">
              <h3 className="text-base font-bold text-rose-900 mb-2 font-serif">
                {lang === "en"
                  ? "D4: The Hidden Cost of Weak Boundaries"
                  : "D4: দুর্বল সীমারেখার মানসিক মূল্য"}
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-rose-950 font-serif leading-relaxed">
                {(lang === "en"
                  ? DOMAIN_DETAILS.D4.gap_en
                  : DOMAIN_DETAILS.D4.gap_bn
                )?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="bg-amber-50/60 border-l-4 border-amber-600 rounded-r-xl p-5 sm:p-6">
              <h3 className="text-base font-bold text-amber-900 mb-2 font-serif">
                {lang === "en"
                  ? "D5: How Outside Pressure Breaches the Sanctuary"
                  : "D5: বাইরের চাপ যেভাবে অন্দরে ফাটল ধরায়"}
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-amber-950 font-serif leading-relaxed">
                {(lang === "en"
                  ? DOMAIN_DETAILS.D5.gap_en
                  : DOMAIN_DETAILS.D5.gap_bn
                )?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGE 8: FORWARD-LOOKING GUIDANCE ("The months ahead" & 4-Week Plan)
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={8} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              {lang === "en" ? "Actionable Road Map" : "ব্যবহারিক কর্মপরিকল্পনা"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en"
                ? "The months ahead: Four-Week Action Plan"
                : "আগামী দিনগুলো: চার সপ্তাহের সুনির্দিষ্ট পরিকল্পনা"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          <p className="text-sm text-stone-700 font-serif leading-relaxed mb-4">
            {lang === "en"
              ? "Rebuilding boundary security does not require dramatic confrontations or severing family ties. It is achieved through incremental, predictable micro-agreements between spouses. Follow the four progressive weekly milestones outlined below."
              : "সম্পর্কের নিরাপত্তা ও স্বকীয়তা পুনরুদ্ধারের জন্য কোনো পারিবারিক সংঘাত বা সম্পর্কচ্ছেদের প্রয়োজন নেই। এটি অর্জিত হয় যুগলের পারস্পরিক সচেতন ক্ষুদ্র বোঝাপড়ার মাধ্যমে। নিচে ৪ সপ্তাহের ধারাবাহিক মাইলফলক দেওয়া হলো।"
            }
          </p>

          {/* Visual 4-Step Milestone Timeline Component */}
          <MilestoneTimeline lang={lang} />
        </section>

        {/* =========================================================================
            PAGE 9: EXTERNAL SUPPORT GUIDANCE ("What others around you can do")
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={9} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4D3E]">
              {lang === "en" ? "Systemic Role Delineation" : "পরিবারের পারস্পরিক ভূমিকা"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en"
                ? "What others around you can do"
                : "আপনার চারপাশের অন্যরা কী করতে পারেন"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          <p className="text-sm text-stone-700 font-serif leading-relaxed mb-6">
            {lang === "en"
              ? "A marriage in Bangladesh does not exist in a vacuum; extended family and trusted partners play an active role, whether consciously or unintentionally. You are welcomed to share this page with your partner and elders as an objective, compassionate framework."
              : "বাংলাদেশের প্রেক্ষাপটে দাম্পত্য কখনোই নিঃসঙ্গ কোনো দ্বীপ নয়; চারপাশের পরিবার জেনে বা না জেনে একটি বড় ভূমিকা পালন করে। আপনি চাইলে এই পাতাটি আপনার সঙ্গী ও পরিবারের বয়োজ্যেষ্ঠদের সাথে গঠনমূলক আলোচনার জন্য শেয়ার করতে পারেন।"
            }
          </p>

          {/* Detailed Callout Sections for Partner vs Elders */}
          <div className="space-y-6">
            {/* The Partner's Role */}
            <div className="bg-emerald-50/70 border border-emerald-300/80 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-[#1B4D3E]" />
                <h3 className="text-base font-bold text-[#1B4D3E] tracking-tight">
                  {lang === "en" ? "The Partner's Core Role" : "জীবনসঙ্গীর মূল দায়িত্ব"}
                </h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-emerald-950 font-serif leading-relaxed">
                <p>
                  <strong className="text-[#1B4D3E]">
                    {lang === "en" ? "1. Biological Buffer: " : "১. নিজের পরিবারের মুখোমুখি হওয়া: "}
                  </strong>
                  {lang === "en" ? DOMAIN_DETAILS.D4.partner_en : DOMAIN_DETAILS.D4.partner_bn}
                </p>
                <p>
                  <strong className="text-[#1B4D3E]">
                    {lang === "en" ? "2. Public Solidarity: " : "২. প্রকাশ্যে সঙ্গীর পক্ষে দাঁড়ানো: "}
                  </strong>
                  {lang === "en" ? DOMAIN_DETAILS.D5.partner_en : DOMAIN_DETAILS.D5.partner_bn}
                </p>
              </div>
            </div>

            {/* The Elders' Role */}
            <div className="bg-amber-50/70 border border-amber-300/80 rounded-xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-[#D97706]" />
                <h3 className="text-base font-bold text-[#D97706] tracking-tight">
                  {lang === "en" ? "The Elders' Guidance & Blessing" : "পরিবারের বয়োজ্যেষ্ঠদের সহযোগিতা ও আশীর্বাদ"}
                </h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-amber-950 font-serif leading-relaxed">
                <p>
                  <strong className="text-[#D97706]">
                    {lang === "en" ? "1. Respecting Sovereign Territory: " : "১. দম্পতির নিজস্ব কর্তৃত্ব স্বীকার: "}
                  </strong>
                  {lang === "en" ? DOMAIN_DETAILS.D4.elders_en : DOMAIN_DETAILS.D4.elders_bn}
                </p>
                <p>
                  <strong className="text-[#D97706]">
                    {lang === "en" ? "2. Stopping the Gossip Pipeline: " : "২. পরচর্চা ঘরে না আনা: "}
                  </strong>
                  {lang === "en" ? DOMAIN_DETAILS.D5.elders_en : DOMAIN_DETAILS.D5.elders_bn}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PAGE 10: SUPPORT SERVICES & PSYCHOLOGY REFERENCES
            ========================================================================= */}
        <section className="mcrr-page bg-white rounded-2xl border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] p-8 sm:p-14 print:p-8 print:shadow-none print:border-none">
          <PageHeader pageNumber={10} />

          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
              {lang === "en" ? "Professional Resources" : "পেশাদার সহায়তা ও তথ্যসূত্র"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4D3E] mt-1 mb-2">
              {lang === "en"
                ? "Support Services & Psychological Foundations"
                : "সহায়তা সেবা ও মনস্তাত্ত্বিক তাত্ত্বিক ভিত্তি"}
            </h2>
            <div className="w-16 h-1 bg-[#1B4D3E] rounded-full" />
          </div>

          {/* Structural Theory Deep Dive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4D3E] block mb-1">
                Salvador Minuchin
              </span>
              <h4 className="text-sm font-bold text-stone-900 mb-2">
                {lang === "en" ? "Structural Family Systems Theory" : "স্ট্রাকচারাল ফ্যামিলি সিস্টেমস থিওরি"}
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                {lang === "en" ? DOMAIN_DETAILS.D4.psych_en : DOMAIN_DETAILS.D4.psych_bn}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] block mb-1">
                Guy Bodenmann
              </span>
              <h4 className="text-sm font-bold text-stone-900 mb-2">
                {lang === "en" ? "Systemic Dyadic Coping Model" : "সিস্টেমিক ডায়াডিক কোপিং মডেল"}
              </h4>
              <p className="text-xs text-stone-600 font-serif leading-relaxed">
                {lang === "en" ? DOMAIN_DETAILS.D5.psych_en : DOMAIN_DETAILS.D5.psych_bn}
              </p>
            </div>
          </div>

          {/* Emergency & Confidential Help Table */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <h3 className="text-base font-bold text-stone-900">
                {lang === "en"
                  ? "Emergency & Confidential Assistance Directory"
                  : "জরুরি ও গোপনীয় সহায়তা ডিরেক্টরি"}
              </h3>
            </div>

            <div className="overflow-x-auto border border-stone-200 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#1B4D3E] text-white">
                    <th className="py-2.5 px-3 sm:px-4 font-bold">
                      {lang === "en" ? "Service / Organization" : "সেবা / সংস্থা"}
                    </th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold">
                      {lang === "en" ? "Scope of Support" : "সহায়তার ধরন"}
                    </th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold">
                      {lang === "en" ? "Helpline Contact" : "যোগাযোগ নম্বর"}
                    </th>
                    <th className="py-2.5 px-3 sm:px-4 font-bold">
                      {lang === "en" ? "Availability" : "সময়সূচি"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {(reportData.referralResources || SAMPLE_MCRR_DATA.referralResources)?.map(
                    (res, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}
                      >
                        <td className="py-2.5 px-3 sm:px-4 font-bold text-[#1B4D3E]">
                          {res.service}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-stone-700">
                          {lang === "en" ? res.need_en : res.need_bn}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 font-mono font-extrabold text-stone-900">
                          {res.number}
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-stone-500 text-xs">
                          {lang === "en" ? res.hours_en : res.hours_bn}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Further Reading Links */}
          <div className="mb-8 p-5 bg-stone-50/70 border border-stone-200 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706] mb-3">
              {lang === "en" ? "Curated Educational References" : "প্রস্তাবিত নির্ভরযোগ্য তথ্যসূত্র"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-white border border-stone-200/80 rounded-lg">
                <div className="font-bold text-stone-900">Why Not You Series</div>
                <div className="text-stone-500 mb-1">
                  {lang === "en" ? "Psychoeducational videos on marriage in Bangladesh" : "বাংলাদেশের বিয়ে ও পরিবারের ওপর শিক্ষামূলক ভিডিও"}
                </div>
                <a href="https://www.whynotyoupsy.com/videos" target="_blank" rel="noreferrer" className="text-[#1B4D3E] hover:underline font-mono">
                  whynotyoupsy.com/videos
                </a>
              </div>

              <div className="p-2.5 bg-white border border-stone-200/80 rounded-lg">
                <div className="font-bold text-stone-900">The Gottman Institute</div>
                <div className="text-stone-500 mb-1">
                  {lang === "en" ? "Clinical research on communication and conflict repair" : "যোগাযোগ ও দ্বন্দ্ব সংস্কারের আন্তর্জাতিক গবেষণা"}
                </div>
                <a href="https://www.gottman.com" target="_blank" rel="noreferrer" className="text-[#1B4D3E] hover:underline font-mono">
                  gottman.com
                </a>
              </div>

              <div className="p-2.5 bg-white border border-stone-200/80 rounded-lg">
                <div className="font-bold text-stone-900">ICEEFT</div>
                <div className="text-stone-500 mb-1">
                  {lang === "en" ? "Emotionally Focused Couples Therapy resources" : "ইমোশনালি ফোকাসড থেরাপি তথ্যসূত্র"}
                </div>
                <a href="https://iceeft.com" target="_blank" rel="noreferrer" className="text-[#1B4D3E] hover:underline font-mono">
                  iceeft.com
                </a>
              </div>

              <div className="p-2.5 bg-white border border-stone-200/80 rounded-lg">
                <div className="font-bold text-stone-900">World Health Organization (WHO)</div>
                <div className="text-stone-500 mb-1">
                  {lang === "en" ? "Evidence-based mental health guidance" : "প্রমাণ-ভিত্তিক মানসিক স্বাস্থ্য গাইডলাইন"}
                </div>
                <a href="https://www.who.int/health-topics/mental-health" target="_blank" rel="noreferrer" className="text-[#1B4D3E] hover:underline font-mono">
                  who.int/mental-health
                </a>
              </div>
            </div>
          </div>

          {/* Author / Psychologist Credit */}
          <div className="pt-6 border-t border-stone-200 text-center text-xs text-stone-500">
            <p className="font-semibold text-stone-700">
              Kazi Fardous Iqbal, MS (Psychology) · Licensed Clinical Psychologist
            </p>
            <p className="mt-1">
              Why Not You Psychometric Services · Dhaka, Bangladesh ·{" "}
              <a href="https://www.whynotyoupsy.com" target="_blank" rel="noreferrer" className="text-[#1B4D3E] underline">
                www.whynotyoupsy.com
              </a>
            </p>
            <p className="mt-2 text-[10px] text-stone-400 font-mono">
              Report Engine: MCRR-BD {version} · Ref: {refCode}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
