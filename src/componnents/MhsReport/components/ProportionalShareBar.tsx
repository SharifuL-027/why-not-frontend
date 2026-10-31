import React from "react";
import { MhsDomainScore, MhsLang } from "../types";

interface ProportionalShareBarProps {
  domainScores: {
    anxiety: MhsDomainScore;
    stress: MhsDomainScore;
    depression: MhsDomainScore;
    sleep: MhsDomainScore;
    somatic: MhsDomainScore;
  };
  lang: MhsLang;
}

export default function ProportionalShareBar({
  domainScores,
  lang,
}: ProportionalShareBarProps) {
  const domains = [
    { key: "anxiety", color: "#EA580C", data: domainScores.anxiety },
    { key: "stress", color: "#F59E0B", data: domainScores.stress },
    { key: "depression", color: "#6366F1", data: domainScores.depression },
    { key: "sleep", color: "#0284C7", data: domainScores.sleep },
    { key: "somatic", color: "#10B981", data: domainScores.somatic },
  ];

  const totalScore = domains.reduce((acc, d) => acc + d.data.score, 0);

  const calculated = domains.map((d) => {
    const share = totalScore > 0 ? Math.round((d.data.score / totalScore) * 100) : 20;
    return {
      ...d,
      share,
    };
  });

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      {/* Visual Segmented Bar */}
      <div className="h-6 w-full rounded-lg overflow-hidden flex shadow-inner bg-slate-200">
        {calculated.map((d) => (
          <div
            key={d.key}
            style={{ width: `${d.share}%`, backgroundColor: d.color }}
            className="h-full flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 relative group cursor-pointer"
            title={`${lang === "bn" ? d.data.name_bn : d.data.name_en}: ${d.share}%`}
          >
            {d.share >= 12 && <span>{d.share}%</span>}
          </div>
        ))}
      </div>

      {/* Domain Breakdown Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
        {calculated.map((d) => (
          <div
            key={d.key}
            className="bg-white border border-slate-200 rounded-lg p-2 flex flex-col justify-between"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-[11px] font-bold text-slate-800 truncate">
                {lang === "bn" ? d.data.name_bn.split(" ")[0] : d.data.name_en.split(" ")[0]}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-mono font-semibold text-slate-500">
                {d.data.score}/100
              </span>
              <span
                className="text-xs font-mono font-bold"
                style={{ color: d.color }}
              >
                {d.share}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
