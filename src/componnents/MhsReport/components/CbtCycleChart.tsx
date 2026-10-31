import React from "react";
import { MhsLang } from "../types";

interface CbtCycleChartProps {
  lang: MhsLang;
}

export default function CbtCycleChart({ lang }: CbtCycleChartProps) {
  const isBn = lang === "bn";

  const nodes = [
    {
      title: isBn ? "চিন্তা (Thoughts)" : "Thoughts (Cognition)",
      subtitle: isBn ? "স্বয়ংক্রিয় নেতিবাচক ধারণা ('আমি পারবো না')" : "Automatic thoughts ('What if I fail?')",
      color: "#2563EB",
      bg: "bg-blue-50 border-blue-200",
    },
    {
      title: isBn ? "আবেগ (Emotions)" : "Emotions (Feelings)",
      subtitle: isBn ? "ভয়, উদ্বেগ, বিরক্তি বা বিষাদ" : "Anxiety, irritability, overwhelm",
      color: "#EA580C",
      bg: "bg-orange-50 border-orange-200",
    },
    {
      title: isBn ? "শারীরিক অনুভূতি (Physical)" : "Physical Sensations",
      subtitle: isBn ? "বুক ধড়ফড়, ঘাড় শক্ত হওয়া, ক্লান্তি" : "Racing heart, neck tension, fatigue",
      color: "#DC2626",
      bg: "bg-rose-50 border-rose-200",
    },
    {
      title: isBn ? "আচরণ (Behaviors)" : "Behaviors (Actions)",
      subtitle: isBn ? "দেরি করা, গুটিয়ে নেওয়া, রাত জাগা" : "Procrastination, isolation, late screens",
      color: "#7C3AED",
      bg: "bg-purple-50 border-purple-200",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
          {isBn ? "সিবিটি মনস্তাত্ত্বিক চক্র" : "Cognitive Behavioral Cycle"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
        {nodes.map((node, i) => (
          <div
            key={i}
            className={`border rounded-lg p-3 transition-all hover:shadow-xs ${node.bg}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: node.color }}
              />
              <h4 className="text-xs font-bold text-slate-900">{node.title}</h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">{node.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-center">
        <p className="text-[11px] text-slate-700 leading-relaxed font-sans">
          {isBn
            ? "💡 সূত্র: যেকোনো একটি পয়েন্ট পরিবর্তন করলেই (যেমন: নেতিবাচক চিন্তাকে প্রশ্ন করা বা গভীর শ্বাস নেওয়া) পুরো চক্রটি ভেঙে যায় এবং মনের স্বস্তি ফিরে আসে।"
            : "💡 Core Principle: Intervening at any single node (e.g., reframing a catastrophic thought or regulating physiology through breathing) halts the entire distress cycle."}
        </p>
      </div>
    </div>
  );
}
