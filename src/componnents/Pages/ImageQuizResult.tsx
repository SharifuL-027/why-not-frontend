import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchImageQuizResult } from "../api/imageQuizPublic";

export default function ImageQuizResult() {
  const { responseId } = useParams<{ responseId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!responseId) return;
    fetchImageQuizResult(responseId)
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

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 pt-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-6 text-center">
          <p className="text-sm text-slate-500 mb-2">{data.quizName?.bn}</p>
          <div className="text-5xl font-bold text-slate-800 font-mono">
            {r.score}/{r.total}
          </div>
          <div className="text-lg font-bold text-emerald-600 mt-1">{r.percentage}%</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-4">
            প্রশ্নভিত্তিক ফলাফল
          </h3>
          <div className="flex flex-col gap-3">
            {r.details.map((d: any, i: number) => (
              <div
                key={d.itemId}
                className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    প্রশ্ন {i + 1} ({d.itemId})
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    আপনার উত্তর: <b>{d.selected || "—"}</b> · সঠিক উত্তর: <b>{d.correctOptionId}</b>
                  </div>
                  {d.note_bn && <p className="text-xs text-slate-400 mt-1">{d.note_bn}</p>}
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${
                    d.isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {d.isCorrect ? "সঠিক" : "ভুল"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
