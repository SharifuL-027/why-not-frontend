import React from "react";
import { ReportLang, ScoreBand } from "../types";

interface SegmentedScoreBarProps {
  score: number;
  band?: ScoreBand;
  lang: ReportLang;
}

export default function SegmentedScoreBar({ score, band, lang }: SegmentedScoreBarProps) {
  const clampedScore = Math.max(0, Math.min(100, score));

  // Piecewise percentage calculation matching visual scale
  let pct = 0;
  if (clampedScore <= 40) {
    pct = (clampedScore / 40) * 25;
  } else if (clampedScore <= 55) {
    pct = 25 + ((clampedScore - 40) / 15) * 15;
  } else if (clampedScore <= 70) {
    pct = 40 + ((clampedScore - 55) / 15) * 20;
  } else if (clampedScore <= 85) {
    pct = 60 + ((clampedScore - 70) / 15) * 20;
  } else {
    pct = 80 + ((clampedScore - 85) / 15) * 20;
  }

  const getScoreColor = (val: number) => {
    if (val >= 85) return "#15803D";
    if (val >= 70) return "#16A34A";
    if (val >= 55) return "#D97706";
    if (val >= 40) return "#EA580C";
    return "#DC2626";
  };

  const color = getScoreColor(clampedScore);
  const bandLabel = band
    ? lang === "en"
      ? band.label_en
      : band.label_bn
    : clampedScore >= 70
    ? lang === "en"
      ? "Strong"
      : "শক্তিশালী"
    : clampedScore >= 55
    ? lang === "en"
      ? "Working"
      : "কার্যকর"
    : lang === "en"
    ? "Under Strain"
    : "চাপের মুখে";

  return (
    <div className="w-full my-6 bg-gradient-to-b from-stone-50/60 to-white p-6 rounded-xl border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      {/* Top Readout */}
      <div className="text-center mb-6">
        <div className="text-xs font-semibold tracking-wider uppercase text-stone-500 mb-1">
          {lang === "en" ? "Overall Relationship Index" : "সামগ্রিক সম্পর্ক সূচক"}
        </div>
        <div className="flex items-baseline justify-center gap-3">
          <span
            className="text-6xl sm:text-7xl font-extrabold tracking-tight"
            style={{ color }}
          >
            {clampedScore}
          </span>
          <span
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ color }}
          >
            — {bandLabel}
          </span>
        </div>
      </div>

      {/* Segmented Gradient Bar Container */}
      <div className="relative pt-8 pb-3 px-2">
        {/* Floating Pin & Tag */}
        <div
          className="absolute top-0 transition-all duration-700 ease-out z-20 flex flex-col items-center pointer-events-none -translate-x-1/2"
          style={{ left: `${pct}%` }}
        >
          <div
            className="text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-md whitespace-nowrap"
            style={{ backgroundColor: color }}
          >
            {clampedScore}
          </div>
          <div
            className="w-0.5 h-3.5"
            style={{ backgroundColor: color }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* 5 Distinct Track Segments */}
        <div className="flex h-6 rounded-full overflow-hidden shadow-inner border border-stone-200/70 p-0.5 bg-stone-100">
          <div
            className="h-full rounded-l-full bg-gradient-to-r from-red-600 to-rose-500"
            style={{ flex: 25 }}
            title="0 - 40: Under strain"
          />
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
            style={{ flex: 15 }}
            title="40 - 55: Mixed"
          />
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
            style={{ flex: 20 }}
            title="55 - 70: Working"
          />
          <div
            className="h-full bg-gradient-to-r from-lime-500 to-emerald-500"
            style={{ flex: 20 }}
            title="70 - 85: Strong"
          />
          <div
            className="h-full rounded-r-full bg-gradient-to-r from-emerald-600 to-[#1B4D3E]"
            style={{ flex: 20 }}
            title="85 - 100: Consolidated"
          />
        </div>

        {/* Labels under the bar */}
        <div className="flex justify-between items-center text-[11px] font-semibold text-stone-500 mt-2 px-1">
          <span>{lang === "en" ? "lower" : "নিম্ন"}</span>
          <span>40</span>
          <span>55</span>
          <span>70</span>
          <span>85</span>
          <span>{lang === "en" ? "higher" : "উচ্চ"}</span>
        </div>
      </div>
    </div>
  );
}
