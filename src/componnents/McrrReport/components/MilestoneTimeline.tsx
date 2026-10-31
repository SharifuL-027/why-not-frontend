import React from "react";
import { ReportLang } from "../types";
import { MILESTONE_PLAN } from "../translations";

interface MilestoneTimelineProps {
  lang: ReportLang;
}

export default function MilestoneTimeline({ lang }: MilestoneTimelineProps) {
  const steps = MILESTONE_PLAN;

  return (
    <div className="w-full my-6">
      {/* Header bar */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
        <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
          {lang === "en" ? "Four-Week Milestone Progression" : "চার সপ্তাহের মাইলফলক পরিকল্পনা"}
        </h3>
      </div>

      {/* Timeline Steps Container */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#D97706] before:via-[#1B4D3E] before:to-emerald-600">
        {steps.map((step) => {
          const weekLabel = lang === "en" ? step.week_en : step.week_bn;
          const title = lang === "en" ? step.title_en : step.title_bn;
          const subtitle = lang === "en" ? step.subtitle_en : step.subtitle_bn;
          const action = lang === "en" ? step.action_en : step.action_bn;
          const badge = lang === "en" ? step.badge_en : step.badge_bn;

          return (
            <div
              key={step.weekNumber}
              className="relative group bg-white border border-stone-200/90 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#1B4D3E]/40"
            >
              {/* Timeline Pin */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-5 w-6 h-6 rounded-full bg-white border-2 border-[#D97706] flex items-center justify-center text-[10px] font-extrabold text-[#D97706] shadow-sm group-hover:scale-110 group-hover:border-[#1B4D3E] group-hover:text-[#1B4D3E] transition-all">
                {step.weekNumber}
              </div>

              {/* Step Content */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#D97706]">
                    {weekLabel}
                  </span>
                  <h4 className="text-base font-bold text-stone-900 mt-0.5">
                    {title}
                  </h4>
                  <p className="text-xs text-stone-500 italic mt-0.5">
                    {subtitle}
                  </p>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#1B4D3E] border border-emerald-200/80">
                    {badge}
                  </span>
                </div>
              </div>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed mt-2">
                {action}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
