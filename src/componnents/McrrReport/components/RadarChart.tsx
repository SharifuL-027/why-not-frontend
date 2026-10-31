import React, { useState } from "react";
import { DomainResultItem, ReportLang } from "../types";

interface RadarChartProps {
  domains: Record<string, DomainResultItem>;
  lang: ReportLang;
  size?: number;
}

export default function RadarChart({ domains, lang, size = 300 }: RadarChartProps) {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  const domainKeys = ["D1", "D2", "D3", "D4", "D5", "D6"];
  const n = domainKeys.length;
  const center = size / 2;
  const radius = (size / 2) - 44;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const getAngle = (i: number) => -90 + (360 / n) * i;

  const getCoordinates = (index: number, r: number) => {
    const angle = toRad(getAngle(index));
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const rings = [25, 50, 75, 100];
  const scores = domainKeys.map((key) => domains[key]?.index ?? 0);

  const polygonPoints = domainKeys
    .map((_, i) => {
      const val = Math.max(0, Math.min(100, scores[i]));
      const r = (val / 100) * radius;
      const pt = getCoordinates(i, r);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const getColor = (score: number) => {
    if (score >= 70) return "#15803D"; // Strong green
    if (score >= 55) return "#D97706"; // Working amber
    if (score >= 40) return "#EA580C"; // Mixed orange
    return "#DC2626"; // Under strain red
  };

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible drop-shadow-sm transition-all duration-300"
      >
        {/* Background Rings */}
        {rings.map((ringVal) => {
          const r = (ringVal / 100) * radius;
          const points = domainKeys
            .map((_, i) => {
              const pt = getCoordinates(i, r);
              return `${pt.x},${pt.y}`;
            })
            .join(" ");

          return (
            <g key={ringVal}>
              <polygon
                points={points}
                fill={ringVal % 50 === 0 ? "rgba(27, 77, 62, 0.03)" : "none"}
                stroke="#E5E7EB"
                strokeWidth={ringVal === 100 ? "1.5" : "0.75"}
                strokeDasharray={ringVal === 100 ? "none" : "3,3"}
              />
              <text
                x={center + 3}
                y={center - r + 9}
                fill="#9CA3AF"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="500"
              >
                {ringVal}
              </text>
            </g>
          );
        })}

        {/* Axis Lines */}
        {domainKeys.map((key, i) => {
          const pt = getCoordinates(i, radius);
          const isHovered = hoveredDomain === key;
          return (
            <line
              key={key}
              x1={center}
              y1={center}
              x2={pt.x}
              y2={pt.y}
              stroke={isHovered ? "#1B4D3E" : "#D1D5DB"}
              strokeWidth={isHovered ? "1.5" : "0.8"}
              strokeDasharray="2,2"
              className="transition-colors duration-200"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(27, 77, 62, 0.22)"
          stroke="#1B4D3E"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="transition-all duration-500 hover:fill-opacity-30"
        />

        {/* Data Markers */}
        {domainKeys.map((key, i) => {
          const score = scores[i];
          const val = Math.max(0, Math.min(100, score));
          const r = (val / 100) * radius;
          const pt = getCoordinates(i, r);
          const isHovered = hoveredDomain === key;
          const col = getColor(score);

          return (
            <g
              key={key}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredDomain(key)}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 7 : 5}
                fill={col}
                stroke="#FFFFFF"
                strokeWidth="2"
                className="transition-all duration-200 shadow-md"
              />
              {/* Score pill on hover or always */}
              <text
                x={pt.x}
                y={pt.y - 9}
                textAnchor="middle"
                fill={col}
                fontSize="10"
                fontWeight="700"
                fontFamily="sans-serif"
              >
                {score}
              </text>
            </g>
          );
        })}

        {/* Outer Domain Labels */}
        {domainKeys.map((key, i) => {
          const pt = getCoordinates(i, radius + 22);
          const item = domains[key];
          const score = item?.index ?? 0;
          const isHovered = hoveredDomain === key;

          return (
            <g
              key={key}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredDomain(key)}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              <rect
                x={pt.x - 18}
                y={pt.y - 10}
                width={36}
                height={20}
                rx={4}
                fill={isHovered ? "#1B4D3E" : "#F3F4F6"}
                stroke={isHovered ? "#1B4D3E" : "#E5E7EB"}
                strokeWidth="1"
              />
              <text
                x={pt.x}
                y={pt.y + 4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="800"
                fill={isHovered ? "#FFFFFF" : "#DC2626"}
                fontFamily="sans-serif"
              >
                {key}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Interactive Tooltip Card */}
      {hoveredDomain && domains[hoveredDomain] && (
        <div className="mt-2 px-3 py-1.5 bg-[#1B4D3E] text-white text-xs rounded-md shadow-md flex items-center gap-2 animate-fadeIn">
          <span className="font-bold text-[#D97706]">{hoveredDomain}:</span>
          <span>{lang === "en" ? domains[hoveredDomain].name_en : domains[hoveredDomain].name_bn}</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px] font-bold">
            {domains[hoveredDomain].index}/100
          </span>
        </div>
      )}
    </div>
  );
}
