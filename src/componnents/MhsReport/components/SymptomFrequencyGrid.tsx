import React from "react";
import { MhsLang, MhsSymptomItem } from "../types";

interface SymptomFrequencyGridProps {
  symptoms: MhsSymptomItem[];
  lang: MhsLang;
}

export default function SymptomFrequencyGrid({
  symptoms,
  lang,
}: SymptomFrequencyGridProps) {
  const getFrequencyColor = (freq: number) => {
    switch (freq) {
      case 3:
        return "bg-rose-100 text-rose-800 border-rose-300";
      case 2:
        return "bg-amber-100 text-amber-800 border-amber-300";
      case 1:
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getFreqScaleLabels = () => {
    if (lang === "bn") {
      return ["০ = একদমই না", "১ = কয়েকদিন", "২ = অর্ধেকের বেশি দিন", "৩ = প্রায় প্রতিদিনই"];
    }
    return ["0 = Not at all", "1 = Several days", "2 = > Half the days", "3 = Nearly every day"];
  };

  const labels = getFreqScaleLabels();

  return (
    <div className="space-y-4">
      {/* Frequency Scale Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] bg-slate-200 text-slate-700">0</span>
          <span>{labels[0]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] bg-blue-100 text-blue-800 border border-blue-300">1</span>
          <span>{labels[1]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] bg-amber-100 text-amber-800 border border-amber-300">2</span>
          <span>{labels[2]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] bg-rose-100 text-rose-800 border border-rose-300">3</span>
          <span>{labels[3]}</span>
        </div>
      </div>

      {/* Symptom Grid Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0F172A] text-white">
            <tr>
              <th className="py-2.5 px-3 font-semibold w-12 text-center">#</th>
              <th className="py-2.5 px-3 font-semibold">
                {lang === "bn" ? "উপসর্গের বিবরণ (গত ১৪ দিন)" : "Reported Symptom (Past 14 Days)"}
              </th>
              <th className="py-2.5 px-3 font-semibold w-24 text-center">
                {lang === "bn" ? "স্কেল (০-৩)" : "Scale (0-3)"}
              </th>
              <th className="py-2.5 px-3 font-semibold w-36 text-right">
                {lang === "bn" ? "পুনরাবৃত্তি" : "Frequency"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {symptoms.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2 px-3 text-center font-mono font-medium text-slate-500">
                  {idx + 1}
                </td>
                <td className="py-2 px-3 font-sans text-slate-800">
                  {lang === "bn" ? item.text_bn : item.text_en}
                </td>
                <td className="py-2 px-3 text-center">
                  <span
                    className={`inline-block w-6 h-6 leading-6 text-center rounded-full font-bold text-xs border ${getFrequencyColor(
                      item.frequency
                    )}`}
                  >
                    {item.frequency}
                  </span>
                </td>
                <td className="py-2 px-3 text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold border ${getFrequencyColor(
                      item.frequency
                    )}`}
                  >
                    {lang === "bn" ? item.tag_bn : item.tag_en}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
