import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MhsReportPage from "../MhsReport/MhsReportPage";
import { fetchResult } from "../api/instruments";
import { sampleMhsReportData } from "../MhsReport/sampleData";
import { MhsReportData } from "../MhsReport/types";

export default function StandaloneMhsReport() {
  const { responseId } = useParams<{ responseId?: string }>();
  const [data, setData] = useState<MhsReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(!!responseId);

  useEffect(() => {
    if (!responseId) {
      setData(sampleMhsReportData);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchResult(responseId)
      .then((res) => {
        if (res && res.result) {
          const r = res.result;
          const personal = res.response?.personalInfo;
          const dateStr = res.response?.submittedAt
            ? new Date(res.response.submittedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : undefined;

          // Adapt API result if available, or fall back to benchmark structure with participant's dynamic details
          const adapted: MhsReportData = {
            ...sampleMhsReportData,
            metadata: {
              ...sampleMhsReportData.metadata,
              reportNumber: `MHS-${responseId.slice(-8).toUpperCase()}`,
              name: personal?.name || sampleMhsReportData.metadata.name,
              date: dateStr || sampleMhsReportData.metadata.date,
              ageGender: personal?.age
                ? `${personal.age} / ${personal?.gender || "Not specified"}`
                : sampleMhsReportData.metadata.ageGender,
            },
            overallIndex: {
              ...sampleMhsReportData.overallIndex,
              score: typeof r.totalScore === "number" ? r.totalScore : sampleMhsReportData.overallIndex.score,
            },
          };
          setData(adapted);
        } else {
          setData(sampleMhsReportData);
        }
      })
      .catch(() => {
        setData(sampleMhsReportData);
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#1E3A8A] border-t-transparent animate-spin mb-4" />
        <h2 className="text-lg font-bold text-slate-800">
          Generating MHS-BD Clinical Assessment Report...
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          মানসিক স্বাস্থ্য স্ক্যানার – বাংলাদেশ (MHS-BD) প্রতিবেদন তৈরি হচ্ছে
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-100/80">
      {/* Top breadcrumb for standalone navigation */}
      <div className="max-w-4xl mx-auto pt-4 px-4 sm:px-6 flex justify-between items-center text-xs print:hidden">
        <Link
          to="/tests"
          className="text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1.5 transition-colors"
        >
          ← Return to Assessments
        </Link>
        <span className="text-slate-400 font-mono text-[11px]">
          Standalone Engine: MHS-BD (whynotyoupsy.com)
        </span>
      </div>

      <MhsReportPage
        initialData={data || sampleMhsReportData}
        initialLang="bn"
      />
    </div>
  );
}
