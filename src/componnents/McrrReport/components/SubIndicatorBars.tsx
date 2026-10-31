import React from "react";
import { ReportLang, SubIndicatorItem } from "../types";
import { SUB_INDICATOR_TRANSLATIONS } from "../translations";

interface SubIndicatorBarsProps {
  indicators: SubIndicatorItem[];
  lang: ReportLang;
}

export default function SubIndicatorBars({ indicators, lang }: SubIndicatorBarsProps) {
  const getColor = (score: number) => {
    if (score >= 70) return "#15803D"; // Green
    if (score >= 55) return "#D97706"; // Amber
    if (score >= 40) return "#EA580C"; // Orange
    return "#DC2626"; // Crimson
  };

  const d4Items = indicators.filter((i) => i.domain === "D4");
  const d5Items = indicators.filter((i) => i.domain === "D5");

  const renderGroup = (
    title_en: string,
    title_bn: string,
    code: string,
    items: SubIndicatorItem[]
  ) => {
    return (
      <div className="mb-6 last:mb-0">
        <div className="flex items-center gap-2 mb-3 pb-1 border-b border-stone-200">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
            {code}
          </span>
          <h4 className="text-sm font-bold text-stone-800">
            {lang === "en" ? title_en : title_bn}
          </h4>
        </div>

        <div className="space-y-3.5">
          {items.map((item) => {
            const trans = SUB_INDICATOR_TRANSLATIONS[item.id];
            const label = trans
              ? lang === "en"
                ? trans.en
                : trans.bn
              : lang === "en"
              ? item.label_en
              : item.label_bn;

            const score = Math.max(0, Math.min(100, item.score));
            const color = getColor(score);

            return (
              <div key={item.id} className="group">
                <div className="flex justify-between items-baseline mb-1 text-xs">
                  <span className="font-medium text-stone-700 group-hover:text-stone-900 transition-colors">
                    {label}
                  </span>
                  <span
                    className="font-bold text-[13px] ml-3"
                    style={{ color }}
                  >
                    {score}
                  </span>
                </div>

                {/* Progress Track */}
                <div className="w-full h-3.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60 p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out shadow-xs"
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
    );
  };

  return (
    <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-5 sm:p-6 my-4 shadow-sm">
      <div className="flex justify-between items-center mb-4 text-[11px] font-semibold text-stone-500 uppercase tracking-wider border-b border-stone-200/60 pb-2">
        <span>{lang === "en" ? "Sub-Indicator Analysis" : "উপ-সূচক বিশ্লেষণ"}</span>
        <span>{lang === "en" ? "Scale: 0 — 100" : "স্কেল: ০ — ১০০"}</span>
      </div>

      {d4Items.length > 0 &&
        renderGroup(
          "Family Integration & Boundary Micro-Indicators",
          "পারিবারিক-সংযোগ ও সীমারেখার সূচকসমূহ",
          "D4",
          d4Items
        )}

      {d5Items.length > 0 &&
        renderGroup(
          "Social Pressure & Dyadic Coping Micro-Indicators",
          "সামাজিক চাপ মোকাবিলা ও যৌথ সমর্থনের সূচকসমূহ",
          "D5",
          d5Items
        )}

      {/* Axis Scale Legend */}
      <div className="flex justify-between text-[10px] text-stone-400 font-sans mt-4 pt-2 border-t border-stone-200">
        <span>0 ({lang === "en" ? "High Strain" : "অত্যধিক চাপ"})</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100 ({lang === "en" ? "Fully Protected" : "সম্পূর্ণ সুরক্ষিত"})</span>
      </div>
    </div>
  );
}
