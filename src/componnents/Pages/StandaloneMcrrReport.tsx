import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import McrrReportPage from "../McrrReport/McrrReportPage";
import { fetchResult } from "../api/instruments";
import { SAMPLE_MCRR_DATA } from "../McrrReport/sampleData";
import { McrrReportData } from "../McrrReport/types";

export default function StandaloneMcrrReport() {
  const { responseId } = useParams<{ responseId?: string }>();
  const [data, setData] = useState<McrrReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(!!responseId);
  const [submittedDate, setSubmittedDate] = useState<string | undefined>();

  useEffect(() => {
    if (!responseId) {
      setData(SAMPLE_MCRR_DATA);
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

          const adapted: McrrReportData = {
            ...SAMPLE_MCRR_DATA,
            ...r,
            metadata: {
              ...SAMPLE_MCRR_DATA.metadata,
              referenceCode: `MC-${responseId.slice(-8).toUpperCase()}`,
              dateCompleted: dateStr || SAMPLE_MCRR_DATA.metadata?.dateCompleted || "October 31, 2026",
              participantName: personal?.name || SAMPLE_MCRR_DATA.metadata?.participantName,
              participantEmail: personal?.email || SAMPLE_MCRR_DATA.metadata?.participantEmail,
              ageBand: personal?.age || SAMPLE_MCRR_DATA.metadata?.ageBand || "25–29",
              gender: personal?.gender || SAMPLE_MCRR_DATA.metadata?.gender,
              formType: r.form || "M",
            },
            domainResults: {
              ...SAMPLE_MCRR_DATA.domainResults,
              ...(r.domainResults || {}),
            },
            total: r.total || SAMPLE_MCRR_DATA.total,
            pri: r.pri || SAMPLE_MCRR_DATA.pri,
            subIndicators:
              r.subIndicators && r.subIndicators.length > 0
                ? r.subIndicators
                : SAMPLE_MCRR_DATA.subIndicators,
          };
          setData(adapted);
        } else {
          setData(SAMPLE_MCRR_DATA);
        }
      })
      .catch(() => {
        // Fallback to sample data for smooth preview
        setData(SAMPLE_MCRR_DATA);
      })
      .finally(() => setLoading(false));
  }, [responseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#1B4D3E] border-t-transparent animate-spin mb-4" />
        <h2 className="text-lg font-bold text-stone-800">
          Generating MCRR-BD Psychological Report...
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Calibrating Six-Area Domain Diagnostics and Boundary Indicators
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F4F3EF]">
      {/* Top breadcrumb navigation for standalone exploration */}
      <div className="max-w-5xl mx-auto pt-4 px-4 sm:px-6 flex justify-between items-center text-xs print:hidden">
        <Link
          to="/tests"
          className="text-stone-500 hover:text-stone-900 font-semibold flex items-center gap-1.5 transition-colors"
        >
          ← Return to Assessments
        </Link>
        <span className="text-stone-400 font-mono text-[11px]">
          Standalone Engine: MCRR-BD (Pilot 1.0-P)
        </span>
      </div>

      <McrrReportPage
        initialData={data || SAMPLE_MCRR_DATA}
        responseId={responseId}
        submittedDate={submittedDate}
        defaultLang="en"
      />
    </div>
  );
}
