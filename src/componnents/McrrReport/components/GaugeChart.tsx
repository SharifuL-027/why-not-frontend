import React from "react";
import { ReportLang } from "../types";

interface GaugeChartProps {
  score: number;
  lang: ReportLang;
}

export default function GaugeChart({ score, lang }: GaugeChartProps) {
  const clampedScore = Math.max(0, Math.min(100, score));

  // Geometry parameters
  const cx = 150;
  const cy = 130;
  const rOuter = 105;
  const rInner = 68;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Arc path generator
  const createArc = (startDeg: number, endDeg: number, fill: string) => {
    const s = toRad(startDeg);
    const e = toRad(endDeg);

    const x1 = cx + rOuter * Math.cos(s);
    const y1 = cy + rOuter * Math.sin(s);
    const x2 = cx + rOuter * Math.cos(e);
    const y2 = cy + rOuter * Math.sin(e);

    const x3 = cx + rInner * Math.cos(e);
    const y3 = cy + rInner * Math.sin(e);
    const x4 = cx + rInner * Math.cos(s);
    const y4 = cy + rInner * Math.sin(s);

    return (
      <path
        d={`M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`}
        fill={fill}
      />
    );
  };

  const segments = [
    { start: -180, end: -144, color: "#DC2626", label: "0-40" },
    { start: -144, end: -108, color: "#EA580C", label: "40-55" },
    { start: -108, end: -72, color: "#D97706", label: "55-70" },
    { start: -72, end: -36, color: "#84CC16", label: "70-85" },
    { start: -36, end: 0, color: "#1B4D3E", label: "85-100" },
  ];

  // Needle angle: from -180 deg (0) to 0 deg (100)
  const needleAngle = -180 + (clampedScore / 100) * 180;
  const needleLen = 85;
  const nx = cx + needleLen * Math.cos(toRad(needleAngle));
  const ny = cy + needleLen * Math.sin(toRad(needleAngle));

  const getScoreColor = (val: number) => {
    if (val >= 85) return "#1B4D3E";
    if (val >= 70) return "#15803D";
    if (val >= 55) return "#D97706";
    if (val >= 40) return "#EA580C";
    return "#DC2626";
  };

  const getStatusText = (val: number) => {
    if (lang === "en") {
      if (val >= 70) return "Resilient (Protected)";
      if (val >= 55) return "Moderate Resilience";
      if (val >= 40) return "Mixed / Permeable";
      return "Under Strain (Vulnerable)";
    } else {
      if (val >= 70) return "সুরক্ষিত ও স্থিতিস্থাপক";
      if (val >= 55) return "মাঝারি স্থিতিস্থাপকতা";
      if (val >= 40) return "মিশ্র ও ঝুঁকিপূর্ণ";
      return "তীব্র চাপের মুখে";
    }
  };

  const scoreColor = getScoreColor(clampedScore);

  return (
    <div className="flex flex-col items-center justify-center py-2 select-none">
      <div className="relative">
        <svg width="300" height="175" viewBox="0 0 300 175" className="overflow-visible">
          {/* Segments */}
          {segments.map((seg, idx) => (
            <g key={idx}>
              {createArc(seg.start, seg.end, seg.color)}
            </g>
          ))}

          {/* Segment Dividers */}
          {segments.slice(1).map((seg, idx) => {
            const rad = toRad(seg.start);
            const x1 = cx + (rInner - 2) * Math.cos(rad);
            const y1 = cy + (rInner - 2) * Math.sin(rad);
            const x2 = cx + (rOuter + 2) * Math.cos(rad);
            const y2 = cy + (rOuter + 2) * Math.sin(rad);
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            );
          })}

          {/* Gauge Center Arch Baseline */}
          <line
            x1={cx - rOuter - 6}
            y1={cy}
            x2={cx + rOuter + 6}
            y2={cy}
            stroke="#E5E7EB"
            strokeWidth="1.5"
          />

          {/* Dynamic Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={nx}
            y2={ny}
            stroke="#1F2937"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          <circle cx={cx} cy={cy} r="8" fill="#1F2937" />
          <circle cx={cx} cy={cy} r="4" fill="#FFFFFF" />

          {/* Numerical Score */}
          <text
            x={cx}
            y={cy + 26}
            textAnchor="middle"
            fill={scoreColor}
            fontSize="26"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            {clampedScore}
          </text>

          <text
            x={cx}
            y={cy + 42}
            textAnchor="middle"
            fill="#6B7280"
            fontSize="10"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            {lang === "en" ? "Pressure Resilience Index (PRI)" : "পারিবারিক চাপ সহনশীলতা সূচক (PRI)"}
          </text>

          {/* Lower / Higher Indicators */}
          <text x={cx - rOuter + 5} y={cy + 15} fill="#9CA3AF" fontSize="9" fontFamily="sans-serif">
            {lang === "en" ? "0 (Vulnerable)" : "০ (দুর্বল)"}
          </text>
          <text x={cx + rOuter - 55} y={cy + 15} fill="#9CA3AF" fontSize="9" fontFamily="sans-serif">
            {lang === "en" ? "100 (Resilient)" : "১০০ (সুরক্ষিত)"}
          </text>
        </svg>
      </div>

      {/* Status Pill */}
      <div className="mt-1 flex items-center gap-2">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
          style={{ backgroundColor: scoreColor }}
        >
          {getStatusText(clampedScore)}
        </span>
      </div>
    </div>
  );
}
