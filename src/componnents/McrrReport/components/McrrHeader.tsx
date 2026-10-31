import React from "react";
import { ReportLang } from "../types";

interface McrrHeaderProps {
  lang: ReportLang;
  onToggleLang: () => void;
  referenceCode: string;
  version: string;
  onPrint: () => void;
}

export default function McrrHeader({
  lang,
  onToggleLang,
  referenceCode,
  version,
  onPrint,
}: McrrHeaderProps) {
  return (
    <div className="max-w-4xl mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 bg-white border border-stone-200/90 rounded-xl px-5 py-3 shadow-xs print:hidden">
      {/* Left: Branding & Reference Identifier */}
      <div className="flex items-center gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#1B4D3E]" />
        <span className="text-sm font-extrabold tracking-tight text-[#1B4D3E]">
          MCRR-BD
        </span>
        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
          {referenceCode}
        </span>
        <span className="hidden sm:inline text-xs text-stone-400 font-sans">
          {version}
        </span>
      </div>

      {/* Right: Bilingual Toggle & Print Button */}
      <div className="flex items-center gap-3">
        {/* Bilingual Live Toggle Switch */}
        <div
          id="lang-toggle-btn"
          className="flex items-center p-0.5 rounded-full border-2 border-[#1B4D3E] bg-stone-100 cursor-pointer shadow-xs hover:border-[#143B30] transition-all"
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
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1B4D3E] hover:bg-[#143B30] text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-sm cursor-pointer"
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
  );
}
