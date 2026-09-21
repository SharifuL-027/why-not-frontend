import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchImageQuizForTaking, submitImageQuizResponse } from "../api/imageQuizPublic";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

interface QuizItem {
  id: string;
  imageUrl: string;
  optionsCount: number;
}

export default function ImageQuizTake() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quizName, setQuizName] = useState("");
  const [items, setItems] = useState<QuizItem[]>([]);
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchImageQuizForTaking(slug)
      .then((data) => {
        setQuizName(data.name?.bn || "");
        setItems(data.items || []);
      })
      .catch((err) => setError(err.message || "এই কুইজটি পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center text-slate-500">লোড হচ্ছে...</div>;
  if (error)
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-center px-4">
        এই কুইজে এখনো কোনো প্রশ্ন যোগ করা হয়নি।
      </div>
    );

  const item = items[cursor];
  const letters = LETTERS.slice(0, item.optionsCount);
  const isLast = cursor === items.length - 1;

  const selectAnswer = (letter: string) => {
    setAnswers((a) => ({ ...a, [item.id]: letter }));
  };

  const next = async () => {
    if (!isLast) {
      setCursor((c) => c + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!slug) return;
    setSubmitting(true);
    try {
      const res = await submitImageQuizResponse(slug, { answers });
      navigate(`/image-quiz/${slug}/result/${res.responseId}`);
    } catch (err: any) {
      alert(err.message || "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।");
      setSubmitting(false);
    }
  };

  const prev = () => cursor > 0 && setCursor((c) => c - 1);

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{quizName}</span>
            <span>
              {cursor + 1} / {items.length}
            </span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${((cursor + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <img
            src={item.imageUrl}
            alt={item.id}
            className="w-full max-h-[70vh] object-contain rounded-lg bg-slate-50 mb-5"
          />

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {letters.map((l) => (
              <button
                key={l}
                onClick={() => selectAnswer(l)}
                className={`py-3 rounded-lg text-base font-bold border-2 transition-colors ${
                  answers[item.id] === l
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-slate-200 text-slate-700 hover:border-emerald-400"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            disabled={cursor === 0}
            onClick={prev}
            className="text-slate-500 text-sm font-semibold disabled:opacity-30"
          >
            ← আগের
          </button>
          <button
            disabled={answers[item.id] === undefined || submitting}
            onClick={next}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 disabled:opacity-40 text-white font-bold px-8 py-3 rounded-xl"
          >
            {submitting ? "জমা হচ্ছে..." : isLast ? "জমা দিন" : "পরবর্তী →"}
          </button>
        </div>
      </div>
    </div>
  );
}
