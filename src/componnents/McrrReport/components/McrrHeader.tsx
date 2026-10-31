import React from "react";
import { ReportLang } from "../types";

interface McrrHeaderProps {
  lang: ReportLang;
  onToggleLang: () => void;
  referenceCode: string;
  version: string;
  onPrint: () => void;
  onLoadSample?: () => void;
  isCustomData?: boolean;
}

export default function McrrHeader({
  lang,
  onToggleLang,
  referenceCode,
  version,
  onPrint,
  onLoadSample,
  isCustomData,
}: McrrHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs print:hidden mb-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Branding & Reference Identifier */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#1B4D3E]" />
            <span className="text-sm font-extrabold tracking-tight text-[#1B4D3E]">
              MCRR-BD
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-stone-300 pl-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
              {referenceCode}
            </span>
            <span className="text-[11px] text-stone-500 font-sans">
              {version}
            </span>
          </div>
        </div>

        {/* Right: Actions (Language toggle, Sample toggle, Print PDF) */}
        <div className="flex items-center gap-2.5">
          {onLoadSample && (
            <button
              onClick={onLoadSample}
              title="Toggle Benchmark / Custom Data"
              className="px-2.5 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium transition-all"
            >
              {isCustomData ? "Load Benchmark Demo" : "Reset Demo"}
            </button>
          )}

          {/* Bilingual Live Toggle Switch */}
          <div
            id="lang-toggle-btn"
            className="flex items-center p-1 rounded-full border-2 border-[#1B4D3E] bg-stone-100 cursor-pointer shadow-sm hover:shadow transition-all"
            onClick={onToggleLang}
            role="button"
            tabIndex={0}
            aria-label="Toggle language between English and Bangla"
          >
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                lang === "bn"
                  ? "bg-[#1B4D3E] text-white shadow-xs"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              বাংলা
            </span>
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                lang === "en"
                  ? "bg-[#1B4D3E] text-white shadow-xs"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              English
            </span>
          </div>

          {/* Print / Save PDF Button */}
          <button
            onClick={onPrint}
            id="print-report-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1B4D3E] hover:bg-[#143B30] text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zM9 9h6a2 2 0 002-2V4a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2z"
              />
            </svg>
            <span>{lang === "en" ? "Print / PDF" : "প্রিন্ট / পিডিএফ"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
