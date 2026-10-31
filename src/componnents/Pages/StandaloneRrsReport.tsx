import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RrsReportPage from "../RrsReport/RrsReportPage";
import { fetchResult } from "../api/instruments";
import { SAMPLE_RRS_DATA } from "../RrsReport/sampleData";
import { RrsReportData } from "../RrsReport/types";

export default function StandaloneRrsReport() {
  const { responseId } = useParams<{ responseId?: string }>();
  const [data, setData] = useState<RrsReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(!!responseId);
  const [submittedDate, setSubmittedDate] = useState<string | undefined>();

  useEffect(() => {
    if (!responseId) {
      setData(SAMPLE_RRS_DATA);
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

          setSubmittedDate(dateStr);

          const adapted: RrsReportData = {
            ...SAMPLE_RRS_DATA,
            metadata: {
              ...SAMPLE_RRS_DATA.metadata,
              reportNumber: `RRS-${responseId.slice(-8).toUpperCase()}`,
              name: personal?.name || SAMPLE_RRS_DATA.metadata.name,
              date: dateStr || SAMPLE_RRS_DATA.metadata.date,
            },
            domainResults: {
              PR: r.domainResults?.PR || SAMPLE_RRS_DATA.domainResults.PR,
              MR: r.domainResults?.MR || SAMPLE_RRS_DATA.domainResults.MR,
              SR: r.domainResults?.SR || SAMPLE_RRS_DATA.domainResults.SR,
            },
            total: r.total || SAMPLE_RRS_DATA.total,
            gap: r.gap || SAMPLE_RRS_DATA.gap,
            highestDomain: r.highestDomain || SAMPLE_RRS_DATA.highestDomain,
            lowestDomain: r.lowestDomain || SAMPLE_RRS_DATA.lowestDomain,
          };
          setData(adapted);
        } else {
          setData(SAMPLE_RRS_DATA);
        }
      })
      .catch(() => {
        setData(SAMPLE_RRS_DATA);
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#B45309] border-t-transparent animate-spin mb-4" />
        <h2 className="text-lg font-bold text-stone-800">
          Generating RRS-24 Assessment Report...
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Calibrating Personal, Moral, and Social Responsibility Norms
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F6F2]">
      {/* Top breadcrumb for standalone navigation */}
      <div className="max-w-4xl mx-auto pt-4 px-4 sm:px-6 flex justify-between items-center text-xs print:hidden">
        <Link
          to="/tests"
          className="text-stone-500 hover:text-stone-900 font-semibold flex items-center gap-1.5 transition-colors"
        >
          ← Return to Assessments
        </Link>
        <span className="text-stone-400 font-mono text-[11px]">
          Standalone Engine: RRS-24 (whynotyoupsy.com)
        </span>
      </div>

      <RrsReportPage
        initialData={data || SAMPLE_RRS_DATA}
        responseId={responseId}
        submittedDate={submittedDate}
        defaultLang="en"
      />
    </div>
  );
}
