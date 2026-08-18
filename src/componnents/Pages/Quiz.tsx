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
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [consentAck, setConsentAck] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchQuizConfig(slug).then((inst) => {
      setInstrument(inst);
      setQuestions(normalizeQuestions(inst));
      setLoading(false);
    });
  }, [slug]);

  if (loading || !instrument)
    return <div className="p-16 text-center text-slate-500">লোড হচ্ছে...</div>;

  const consentRequired = instrument.data.consent?.required;
  if (consentRequired && !consentAck) {
    return (
      <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-2xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-3">সম্মতি প্রয়োজন</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {instrument.data.consent.text_bn}
        </p>
        <button
          onClick={() => setConsentAck(true)}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl transition-colors"
        >
          আমি সম্মত আছি — শুরু করুন
        </button>
      </div>
    );
  }

  const q = questions[cursor];

  const selectAnswer = (value: any) => {
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
  };

const next = async () => {
  if (cursor < questions.length - 1) {
    setCursor((c) => c + 1);
    return;
  }
  setSubmitting(true);
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
    // চাইলে এখানে setError() দিয়ে ইউজারকে একটা মেসেজ দেখাতে পারেন
  } finally {
    setSubmitting(false);
  }
};

  const prev = () => cursor > 0 && setCursor((c) => c - 1);

  return (
    <div className="max-w-xl mx-auto p-5">
      <div className="flex gap-1 mb-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full ${
              i <= cursor ? "bg-emerald-600" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-slate-500 mb-4">
        প্রশ্ন {cursor + 1} / {questions.length}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="text-lg font-semibold text-slate-800 mb-5 leading-relaxed">
          {q.text_bn}
        </div>

        {q.scale === "likert5" && (
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => selectAnswer(v)}
                className={`flex-1 aspect-square rounded-xl border-2 font-bold text-slate-700 transition-colors ${
                  answers[q.id] === v
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white border-slate-200 hover:border-emerald-400"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {q.scale === "likert4" && (
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((v) => (
              <button
                key={v}
                onClick={() => selectAnswer(v)}
                className={`flex-1 aspect-square rounded-xl border-2 font-bold text-slate-700 transition-colors ${
                  answers[q.id] === v
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white border-slate-200 hover:border-emerald-400"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {q.scale === "yesno" && (
          <div className="flex gap-3">
            {["Yes", "No"].map((v) => (
              <button
                key={v}
                onClick={() => selectAnswer(v)}
                className={`flex-1 py-3 rounded-xl border-2 font-bold transition-colors ${
                  answers[q.id] === v
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400"
                }`}
              >
                {v === "Yes" ? "হ্যাঁ" : "না"}
              </button>
            ))}
          </div>
        )}

        {q.scale === "multipleChoice" && q.options && (
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`text-left px-4 py-3 rounded-xl border-2 text-sm transition-colors ${
                  answers[q.id] === i
                    ? "bg-emerald-50 border-emerald-600 text-slate-800 font-semibold"
                    : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            disabled={cursor === 0}
            onClick={prev}
            className="px-4 py-2 text-sm font-semibold text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← আগের
          </button>
          <button
            disabled={answers[q.id] === undefined || submitting}
            onClick={next}
            className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {submitting
              ? "জমা হচ্ছে..."
              : cursor === questions.length - 1
              ? "শেষ করুন →"
              : "পরের →"}
          </button>
        </div>
      </div>
    </div>
  );
}