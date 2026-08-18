import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizConfig, submitAnswers } from "../api/instruments";
import type { QuizInstrument } from "../types/instrument";

interface NormalizedQuestion {
  id: string;
  text_bn: string;
  scale: "likert5" | "likert4" | "yesno" | "multipleChoice";
  options?: string[];
}

const PAGE_SIZE = 5;

function normalizeQuestions(instrument: QuizInstrument): NormalizedQuestion[] {
  const { scoringType, data } = instrument;
  const list: NormalizedQuestion[] = [];

  if (scoringType === "vector_matching") {
    data.items.A.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "likert5" }));
    data.items.B.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "likert5" }));
    data.items.C.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "likert5" }));
    data.items.D.forEach((it: any) => list.push({ id: it.id, text_bn: it.bn, scale: "yesno" }));
    data.items.E.forEach((it: any) =>
      list.push({ id: it.id, text_bn: it.bn, scale: "multipleChoice", options: it.options })
    );
  }

  if (scoringType === "sum_and_band") {
    data.items.forEach((it: any) =>
      list.push({ id: String(it.id), text_bn: it.text_bn, scale: "likert4" })
    );
  }

  return list;
}

export default function Quiz() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [instrument, setInstrument] = useState<QuizInstrument | null>(null);
  const [questions, setQuestions] = useState<NormalizedQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [consentAck, setConsentAck] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchQuizConfig(slug).then((inst) => {
      setInstrument(inst);
      setQuestions(normalizeQuestions(inst));
      setLoading(false);
    });
  }, [slug]);

  if (loading || !instrument) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col justify-center items-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">প্রশ্নপত্র তৈরি হচ্ছে...</p>
      </div>
    );
  }

  const consentRequired = instrument.data.consent?.required;
  if (consentRequired && !consentAck) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-slate-50 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">সম্মতি প্রয়োজন</h2>
          <p className="text-slate-600 leading-relaxed mb-8 text-center">
            {instrument.data.consent.text_bn}
          </p>
          <button
            onClick={() => setConsentAck(true)}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            আমি সম্মত আছি — শুরু করুন
          </button>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(questions.length / PAGE_SIZE);
  const pageQuestions = questions.slice(
    pageIndex * PAGE_SIZE,
    pageIndex * PAGE_SIZE + PAGE_SIZE
  );
  const isLastPage = pageIndex === totalPages - 1;
  const allCurrentPageAnswered = pageQuestions.every((q) => answers[q.id] !== undefined);
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / questions.length) * 100;

  const selectAnswer = (qId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const next = async () => {
    if (!isLastPage) {
      setPageIndex((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const result = await submitAnswers(
        slug!,
        answers,
        consentAck,
        instrument.data.consent?.version
      );
      navigate(`/tests/${slug}/result/${result.responseId}`);
    } catch (err) {
      console.error(err);
      setSubmitError("সাবমিট করতে সমস্যা হয়েছে। অনুগ্রহ করে ইন্টারনেট চেক করে আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  const prev = () => {
    if (pageIndex > 0) {
      setPageIndex((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    // pb-32 দেওয়া হয়েছে যাতে শেষের প্রশ্নগুলো স্টিকি ফুটারের নিচে ঢাকা না পড়ে
    <div className="min-h-screen bg-slate-50 pt-28 pb-32 relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* মডার্ন প্রগ্রেস বার */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 mb-6 sticky top-24 z-40">
          <div className="flex justify-between text-sm font-semibold text-slate-600 mb-2">
            <span>কুইজ প্রগ্রেস</span>
            <span className="text-emerald-600">{Math.round(progressPercentage)}% সম্পন্ন</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-400 mt-2 text-center">
            {questions.length} টি প্রশ্নের মধ্যে {answeredCount} টির উত্তর দিয়েছেন (পৃষ্ঠা {pageIndex + 1}/{totalPages})
          </div>
        </div>

        {/* প্রশ্নগুলো */}
        <div className="flex flex-col gap-5">
          {pageQuestions.map((q, idx) => (
            <div key={q.id} className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 mb-6">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                  {pageIndex * PAGE_SIZE + idx + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 leading-relaxed pt-1">
                  {q.text_bn}
                </h3>
              </div>

              {/* Likert 5 */}
              {q.scale === "likert5" && (
                <div className="flex gap-2 sm:gap-4 justify-between">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      onClick={() => selectAnswer(q.id, v)}
                      className={`flex-1 aspect-square rounded-2xl border-2 font-bold text-lg transition-all duration-200 transform ${
                        answers[q.id] === v
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md scale-105"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}

              {/* Likert 4 */}
              {q.scale === "likert4" && (
                <div className="flex gap-2 sm:gap-4 justify-between">
                  {[0, 1, 2, 3].map((v) => (
                    <button
                      key={v}
                      onClick={() => selectAnswer(q.id, v)}
                      className={`flex-1 aspect-square rounded-2xl border-2 font-bold text-lg transition-all duration-200 transform ${
                        answers[q.id] === v
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md scale-105"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}

              {/* Yes / No */}
              {q.scale === "yesno" && (
                <div className="flex gap-4">
                  {["Yes", "No"].map((v) => (
                    <button
                      key={v}
                      onClick={() => selectAnswer(q.id, v)}
                      className={`flex-1 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-200 ${
                        answers[q.id] === v
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {v === "Yes" ? "হ্যাঁ" : "না"}
                    </button>
                  ))}
                </div>
              )}

              {/* Multiple Choice */}
              {q.scale === "multipleChoice" && q.options && (
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(q.id, i)}
                      className={`text-left px-5 py-4 rounded-2xl border-2 text-base transition-all duration-200 flex items-center justify-between ${
                        answers[q.id] === i
                          ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-slate-50"
                      }`}
                    >
                      <span>{opt}</span>
                      {answers[q.id] === i && (
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {submitError && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{submitError}</span>
          </div>
        )}
      </div>

      {/* স্টিকি গ্লাস-মর্ফিজম ফুটার */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200/60 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          <button
            disabled={pageIndex === 0}
            onClick={prev}
            className="px-6 py-3.5 rounded-xl text-slate-600 font-semibold bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span>আগের</span>
          </button>

          <button
            disabled={!allCurrentPageAnswered || submitting}
            onClick={next}
            className={`px-8 py-3.5 rounded-xl text-white font-bold transition-all duration-300 flex items-center gap-2 shadow-md ${
              !allCurrentPageAnswered || submitting
                ? "bg-slate-300 cursor-not-allowed opacity-70"
                : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>জমা হচ্ছে...</span>
              </>
            ) : isLastPage ? (
              <>
                <span>শেষ করুন</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </>
            ) : (
              <>
                <span>পরের ৫টি</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}