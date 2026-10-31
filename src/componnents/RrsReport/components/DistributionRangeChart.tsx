import React from "react";
import { RrsLang, RrsDomainResult } from "../types";

interface DistributionRangeChartProps {
  domain: RrsDomainResult;
  lang: RrsLang;
}

export default function DistributionRangeChart({ domain, lang }: DistributionRangeChartProps) {
  const score = Math.max(1, Math.min(5, domain.score));

  // Thresholds on 1.00 - 5.00 scale:
  // Band 1: 1.00 to 2.50 (span 1.50)
  // Band 2: 2.50 to 3.00 (span 0.50)
  // Band 3: 3.00 to 4.12 (span 1.12)
  // Band 4: 4.12 to 4.75 (span 0.63)
  // Band 5: 4.75 to 5.00 (span 0.25)
  // For balanced visual representation across 5 bands, we can map percentage:
  let pct = 0;
  if (score <= 2.50) {
    pct = ((score - 1) / 1.5) * 20;
  } else if (score <= 3.00) {
    pct = 20 + ((score - 2.50) / 0.5) * 20;
  } else if (score <= 4.12) {
    pct = 40 + ((score - 3.00) / 1.12) * 20;
  } else if (score <= 4.75) {
    pct = 60 + ((score - 4.12) / 0.63) * 20;
  } else {
    pct = 80 + ((score - 4.75) / 0.25) * 20;
  }
  pct = Math.max(2, Math.min(98, pct));

  const getPinColor = (val: number) => {
    if (val >= 4.12) return "#1B4D3E"; // Forest Green (High)
    if (val >= 3.00) return "#0D9488"; // Teal (Average)
    if (val >= 2.50) return "#EA580C"; // Orange (Low)
    return "#DC2626"; // Crimson (Very Low)
  };

  const pinColor = getPinColor(score);

  return (
    <div className="bg-white border border-stone-200/90 rounded-xl p-4 sm:p-5 shadow-xs mb-4">
      {/* Title & Score Pill */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mr-2">
            {domain.code}
          </span>
          <span className="font-bold text-stone-900 text-sm">
            {lang === "en" ? domain.name_en : domain.name_bn}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-extrabold text-base text-stone-900">
            {domain.scoreDisplay.toFixed(2)}
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
            {lang === "en" ? domain.band.label_en : domain.band.label_bn}
          </span>
        </div>
      </div>

      {/* Distribution Range Track */}
      <div className="relative pt-6 pb-2 px-1 select-none">
        {/* Positional Marker Pin */}
        <div
          className="absolute top-0 transition-all duration-700 ease-out z-20 flex flex-col items-center pointer-events-none -translate-x-1/2"
          style={{ left: `${pct}%` }}
        >
          <div
            className="text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap"
            style={{ backgroundColor: pinColor }}
          >
            {domain.scoreDisplay.toFixed(2)}
          </div>
          <div className="w-0.5 h-3" style={{ backgroundColor: pinColor }} />
          <div
            className="w-2.5 h-2.5 rounded-full border-2 border-white shadow-xs"
            style={{ backgroundColor: pinColor }}
          />
        </div>

        {/* 5 Segmented Bands */}
        <div className="flex h-4 rounded-full overflow-hidden shadow-inner border border-stone-200 p-0.5 bg-stone-100">
          <div
            className="h-full rounded-l-full bg-red-400"
            style={{ flex: 1 }}
            title="Very Low (1.00–2.50)"
          />
          <div
            className="h-full bg-orange-400"
            style={{ flex: 1 }}
            title="Low (2.50–3.00)"
          />
          <div
            className="h-full bg-teal-500"
            style={{ flex: 1 }}
            title="Average (3.00–4.12)"
          />
          <div
            className="h-full bg-emerald-600"
            style={{ flex: 1 }}
            title="High (4.12–4.75)"
          />
          <div
            className="h-full rounded-r-full bg-[#1B4D3E]"
            style={{ flex: 1 }}
            title="Very High (4.75–5.00)"
          />
        </div>

        {/* Band Range Labels */}
        <div className="flex justify-between items-center text-[10px] font-semibold text-stone-500 mt-2 px-0.5">
          <span className="text-left w-1/5">{lang === "en" ? "V. Low" : "অত্যন্ত নিম্ন"}</span>
          <span className="text-center w-1/5">{lang === "en" ? "Low" : "নিম্ন"}</span>
          <span className="text-center w-1/5">{lang === "en" ? "Average" : "গড়"}</span>
          <span className="text-center w-1/5">{lang === "en" ? "High" : "উচ্চ"}</span>
          <span className="text-right w-1/5">{lang === "en" ? "V. High" : "অত্যন্ত উচ্চ"}</span>
        </div>
      </div>
    </div>
  );
}
