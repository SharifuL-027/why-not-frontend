import React from "react";
import McrrReportPage from "../McrrReport/McrrReportPage";
import { McrrReportData, DomainResultItem } from "../McrrReport/types";
import { SAMPLE_MCRR_DATA } from "../McrrReport/sampleData";

interface McrrsReportProps {
  r: any;
  responseId?: string;
  submittedDate?: string;
  personalInfo?: any;
}

export default function McrrsReportComponent({
  r,
  responseId,
  submittedDate,
  personalInfo,
}: McrrsReportProps) {
  // If r is already formatted or partial, merge cleanly with benchmark defaults
  const adaptedData: McrrReportData = {
    ...SAMPLE_MCRR_DATA,
    ...r,
    metadata: {
      ...SAMPLE_MCRR_DATA.metadata,
      referenceCode: responseId
        ? `MC-${responseId.slice(-8).toUpperCase()}`
        : SAMPLE_MCRR_DATA.metadata?.referenceCode || "MC-2026-0926-4192",
      dateCompleted: submittedDate || SAMPLE_MCRR_DATA.metadata?.dateCompleted || "October 31, 2026",
      participantName: personalInfo?.name || SAMPLE_MCRR_DATA.metadata?.participantName,
      participantEmail: personalInfo?.email || SAMPLE_MCRR_DATA.metadata?.participantEmail,
      ageBand: personalInfo?.age || SAMPLE_MCRR_DATA.metadata?.ageBand || "25–29",
      gender: personalInfo?.gender || SAMPLE_MCRR_DATA.metadata?.gender,
      formType: r?.form || "M",
    },
    domainResults: {
      ...SAMPLE_MCRR_DATA.domainResults,
      ...(r?.domainResults || {}),
    },
    total: r?.total || SAMPLE_MCRR_DATA.total,
    pri: r?.pri || SAMPLE_MCRR_DATA.pri,
    subIndicators: r?.subIndicators && r.subIndicators.length > 0
      ? r.subIndicators
      : SAMPLE_MCRR_DATA.subIndicators,
    referralResources: r?.referralResources && r.referralResources.length > 0
      ? r.referralResources.map((res: any) => ({
          need_en: res.need_en || res.need_bn,
          need_bn: res.need_bn,
          service: res.service,
          number: res.number,
          hours_en: res.hours_en || res.hours_bn,
          hours_bn: res.hours_bn,
        }))
      : SAMPLE_MCRR_DATA.referralResources,
  };

  return (
    <McrrReportPage
      initialData={adaptedData}
      responseId={responseId}
      submittedDate={submittedDate}
      defaultLang="en"
    />
  );
}
