import React from "react";
import { MhsLang } from "../types";

interface StressBucketChartProps {
  currentStrain: number; // e.g. 52
  lang: MhsLang;
}

export default function StressBucketChart({
  currentStrain,
  lang,
}: StressBucketChartProps) {
  const isBn = lang === "bn";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
          {isBn ? "চাপের বালতি মডেল (Stress Bucket Model)" : "The Stress Vulnerability Bucket"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Left: Stress Inflows */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
            <span>⬇️</span>
            <span>{isBn ? "চাপের প্রবাহ (ইনফ্লো)" : "Stress Inflows"}</span>
          </div>
          <ul className="text-[11px] text-slate-700 space-y-1.5 bg-rose-50/50 border border-rose-100 rounded-lg p-2.5">
            <li className="flex items-start gap-1">
              <span className="text-rose-500 font-bold">•</span>
              <span>{isBn ? "কাজের ডেডলাইন ও বাড়তি দায়িত্ব" : "Work deadlines & workload"}</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-rose-500 font-bold">•</span>
              <span>{isBn ? "ভবিষ্যত নিয়ে অতিরিক্ত দুশ্চিন্তা" : "Future anticipatory anxiety"}</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-rose-500 font-bold">•</span>
              <span>{isBn ? "রাত জেগে স্ক্রিন দেখা ও ঘুমের অভাব" : "Late-night screen use & insomnia"}</span>
            </li>
          </ul>
        </div>

        {/* Center: The Bucket Visual */}
        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl relative">
          <div className="w-32 h-40 border-4 border-slate-600 border-t-0 rounded-b-2xl relative bg-slate-100 flex flex-col justify-end overflow-hidden shadow-inner">
            {/* Water Fill based on currentStrain */}
            <div
              style={{ height: `${Math.min(100, Math.max(10, currentStrain))}%` }}
              className="w-full bg-linear-to-t from-blue-600 via-amber-500 to-rose-500 transition-all duration-500 flex items-center justify-center"
            >
              <span className="text-xs font-bold text-white drop-shadow-sm font-mono">
                {currentStrain}%
              </span>
            </div>
            {/* Overflow Line */}
            <div className="absolute top-4 left-0 right-0 border-b-2 border-dashed border-rose-600 text-[9px] text-rose-700 font-bold text-right pr-1">
              {isBn ? "উপচে পড়ার সীমা" : "Overflow Threshold"}
            </div>
          </div>
          <span className="text-[10px] text-slate-500 font-medium mt-2">
            {isBn ? "মানসিক সহনশীলতা" : "Coping Capacity"}
          </span>
        </div>

        {/* Right: Healthy Release Valves */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
            <span>🚰</span>
            <span>{isBn ? "মুক্তির কল / ভালভ (রিলিজ)" : "Release Valves"}</span>
          </div>
          <ul className="text-[11px] text-slate-700 space-y-1.5 bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
            <li className="flex items-start gap-1">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{isBn ? "৪-৭-৮ শ্বাসের ব্যায়াম ও রিলাক্সেশন" : "4-7-8 breathing & grounding"}</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{isBn ? "সঠিক সময়ে ঘুম (স্ক্রিন বন্ধ রাখা)" : "Consistent sleep hygiene rules"}</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{isBn ? "পেশাদার কাউন্সেলিং ও মানসিক প্রকাশ" : "Professional counseling / CBT"}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
