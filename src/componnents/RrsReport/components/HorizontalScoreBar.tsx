import React from "react";
import { RrsLang } from "../types";

interface HorizontalScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  level: string;
  color?: string;
  lang: RrsLang;
  subLabel?: string;
}

export default function HorizontalScoreBar({
  label,
  score,
  maxScore = 5.0,
  level,
  color = "#B45309",
  lang,
  subLabel,
}: HorizontalScoreBarProps) {
  const pct = Math.max(0, Math.min(100, (score / maxScore) * 100));

  return (
    <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 shadow-xs">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <div>
          <span className="font-bold text-stone-900 text-sm">{label}</span>
          {subLabel && (
            <span className="text-xs text-stone-500 block mt-0.5">{subLabel}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-mono font-extrabold text-base"
            style={{ color }}
          >
            {score.toFixed(2)}
          </span>
          <span className="text-[11px] font-mono text-stone-400">/ 5.00</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full border shadow-2xs"
            style={{
              backgroundColor: `${color}15`,
              color,
              borderColor: `${color}40`,
            }}
          >
            {level}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out shadow-xs"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <div className="flex justify-between text-[9px] font-mono text-stone-400 mt-1.5 px-0.5">
        <span>1.00</span>
        <span>2.00</span>
        <span>3.00</span>
        <span>4.00</span>
        <span>5.00</span>
      </div>
    </div>
  );
}
