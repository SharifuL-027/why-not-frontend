import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAmBatteryResult } from "../api/amBatteryPublic";
import { AM_NARRATIVE_TEMPLATES } from "../ADMIN/AmBattery/Aminstrumentmeta";


const CLUSTER_LABELS: Record<string, string> = {
  capability: "সক্ষমতা (Capability)",
  disposition: "স্বভাব (Disposition)",
  judgment_integrity: "বিচার ও সততা (Judgment & Integrity)",
};

const FIT_STATEMENT_BN: Record<string, string> = {
  "Well suited": "উপযুক্ত (Well suited)",
  "Suited, with coaching support": "উপযুক্ত, তবে কোচিং সহায়তাসহ",
  "Likely to need substantial management coaching": "উল্লেখযোগ্য ব্যবস্থাপনাগত কোচিং প্রয়োজন হতে পারে",
  "Recommend a structured interview before deciding": "সিদ্ধান্তের আগে একটি কাঠামোবদ্ধ সাক্ষাৎকার সুপারিশ করা হচ্ছে",
};

function bandLevel(rank: number): "low" | "mid" | "high" {
  if (rank <= 2) return "low";
  if (rank === 3) return "mid";
  return "high";
}

export default function AmBatteryResult() {
  const { responseId } = useParams<{ responseId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!responseId) return;
    fetchAmBatteryResult(responseId)
      .then(setData)
      .catch((err) => setError(err.message || "রিপোর্ট পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [responseId]);

  if (loading) return <div className="p-16 text-center text-slate-500">লোড হচ্ছে...</div>;
  if (error) return <div className="p-16 text-center text-red-600">{error}</div>;
  if (!data) return null;

  if (data.paymentRequired) {
    return (
      <div className="p-16 text-center">
        <p className="text-slate-600 mb-2">এই রিপোর্ট দেখতে হলে পেমেন্ট সম্পন্ন করতে হবে।</p>
        <p className="text-xs text-slate-400">Response ID: {data.responseId}</p>
      </div>
    );
  }

  const r = data.result;
  const domains: Record<string, any> = r.domainResults || {};
  const clusters = ["capability", "disposition", "judgment_integrity"];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-900">Selection Report</h1>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
              PROVISIONAL — SAMPLE NORMING
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">
            <div>প্রার্থী: <b className="text-slate-800">{data.candidateInfo?.name || "—"}</b></div>
            <div>পদ: <b className="text-slate-800">{data.candidateInfo?.position || "—"}</b></div>
            <div>প্রতিষ্ঠান: <b className="text-slate-800">{data.candidateInfo?.organisation || "—"}</b></div>
            <div>Form: <b className="text-slate-800">{data.assignedForm}</b></div>
          </div>

          {r.needsManualReview && (
            <div className="mt-4 bg-red-50 border border-red-100 text-red-700 rounded-lg p-3 text-sm">
              ⚠ একাধিক ভ্যালিডিটি চেক ব্যর্থ হয়েছে — এই রিপোর্টটি hiring panel-এ পাঠানোর আগে ম্যানুয়াল রিভিউ প্রয়োজন।
            </div>
          )}

          {r.convergenceFlag === "inconsistent" && (
            <div className="mt-3 bg-amber-50 border border-amber-100 text-amber-800 rounded-lg p-3 text-sm">
              ⚠ Convergence check: honesty ও conscientiousness স্কোরে অসামঞ্জস্য পাওয়া গেছে — একটা কাঠামোবদ্ধ সাক্ষাৎকার সুপারিশ করা হচ্ছে।
            </div>
          )}

          {r.fitStatement && (
            <div className="mt-4 bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">সার্বিক উপযুক্ততা</p>
              <p className="text-base font-bold text-slate-800">
                {FIT_STATEMENT_BN[r.fitStatement] || r.fitStatement}
              </p>
            </div>
          )}
        </div>

        {clusters.map((cluster) => {
          const domainKeys = Object.keys(domains).filter((k) => domains[k].cluster === cluster);
          if (domainKeys.length === 0) return null;
          return (
            <div key={cluster} className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-4">
                {CLUSTER_LABELS[cluster]}
              </h3>
              <div className="flex flex-col gap-4">
                {domainKeys.map((key) => {
                  const d = domains[key];
                  return (
                    <div key={key} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm text-slate-800">{d.name_bn}</span>
                        {d.scored ? (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                            {d.band?.label_bn} · {d.percentile}
                          </span>
                        ) : (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                            {d.inconclusive ? "Inconclusive" : "স্কোর করা যায়নি"}
                          </span>
                        )}
                      </div>
                      {d.scored && (
                        <>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${d.percentile}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {AM_NARRATIVE_TEMPLATES[key]?.[bandLevel(d.band.rank)]}
                          </p>
                        </>
                      )}
                      {d.inconclusive && (
                        <p className="text-xs text-red-500">{d.note_bn}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-xl p-4 text-xs leading-relaxed">
          এই রিপোর্টটি self-report, situational-judgment, ও reasoning ডাটার ওপর ভিত্তি করে তৈরি।
          এটা একটা decision-support টুল, একক hiring সিদ্ধান্ত নয় — interview ও reference check এর
          পাশাপাশি ব্যবহার করা উচিত। Percentile band গুলো এখনো provisional (norm sample যাচাই করা হয়নি)।
        </div>
      </div>
    </div>
  );
}