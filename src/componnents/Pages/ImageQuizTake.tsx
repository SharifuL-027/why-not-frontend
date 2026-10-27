import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchImageQuizForTaking, submitImageQuizResponse } from "../api/imageQuizPublic";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

interface QuizItem {
  id: string;
  imageUrl: string;
  optionsCount: number;
}

// ==========================================
// Global Shared Background (Light & Minimal)
// ==========================================
const SharedBackground = () => (
  <>
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A6BBA" />
          <stop offset="100%" stopColor="#5DBB4D" />
        </linearGradient>
      </defs>
    </svg>
    <div
      className="absolute inset-0 z-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    />
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/85 to-[#FAF7F2] pointer-events-none" />
  </>
);

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

  // Read candidateInfo from sessionStorage (set in details page)
  const candidateInfo = (() => {
    try {
      const raw = sessionStorage.getItem(`candidateInfo_${slug}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  })();

  useEffect(() => {
    if (!slug) return;
    fetchImageQuizForTaking(slug)
      .then((data) => {
        setQuizName(data.name?.bn || data.name?.en || "");
        setItems(data.items || []);
      })
      .catch((err) => setError(err.message || "This quiz could not be found."))
      .finally(() => setLoading(false));
  }, [slug]);

  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] lg:pl-[50px] pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
      <SharedBackground />
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );

  // Loading
  if (loading) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
            <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
          </div>
          <p className="mt-6 text-black font-bold tracking-[0.2em] uppercase text-sm">লোড হচ্ছে...</p>
        </div>
      </LayoutWrapper>
    );
  }

  if (error) {
    return (
      <LayoutWrapper>
        <div className="bg-white border border-[#EAEFF0] px-8 py-8 flex flex-col items-center gap-4 shadow-sm text-center max-w-md mx-auto rounded-xl">
          <span className="text-black font-serif text-lg tracking-wide">{error}</span>
        </div>
      </LayoutWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="bg-yellow-50 border border-yellow-200 p-8 text-center shadow-sm max-w-md mx-auto rounded-xl">
          <p className="text-yellow-800 font-serif text-lg tracking-wide">এই পরীক্ষায় এখনো কোনো প্রশ্ন যোগ করা হয়নি।</p>
        </div>
      </LayoutWrapper>
    );
  }

  const item = items[cursor];
  const letters = LETTERS.slice(0, item.optionsCount);
  const isLast = cursor === items.length - 1;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((cursor / items.length) * 100);

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
      const res = await submitImageQuizResponse(slug, {
        answers,
        candidateInfo,
      });
      // Clear stored candidateInfo
      sessionStorage.removeItem(`candidateInfo_${slug}`);
      navigate(`/image-quiz/${slug}/result/${res.responseId}`);
    } catch (err: any) {
      alert(err.message || "Failed to submit. Please try again.");
      setSubmitting(false);
    }
  };

  const prev = () => cursor > 0 && setCursor((c) => c - 1);

  return (
    <LayoutWrapper>

      {/* Quiz Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Intelligence Assessment</p>
            <h2 className="text-lg font-bold text-gray-800 font-serif line-clamp-1">{quizName}</h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800 font-mono">
              {String(cursor + 1).padStart(2, "0")}
              <span className="text-gray-300 text-base"> / {String(items.length).padStart(2, "0")}</span>
            </div>
            <p className="text-xs text-gray-400">{answeredCount} টি উত্তর দেওয়া হয়েছে</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#EAEFF0] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#5DBB4D] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main Quiz Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cursor}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#EAEFF0] shadow-[0_10px_40px_rgba(0,0,0,0.06)] w-full rounded-2xl overflow-hidden"
        >
          {/* Question Image */}
          <div className="relative w-full bg-[#F8F9FA] flex justify-center items-center p-6 md:p-10 border-b border-[#EAEFF0]">
            <img
              src={item.imageUrl}
              alt={`Question ${cursor + 1}`}
              className="max-w-full max-h-[55vh] object-contain"
            />
          </div>

          {/* Question Instruction */}
          <div className="px-8 py-5 bg-gradient-to-r from-blue-50 to-green-50 border-b border-[#EAEFF0]">
            <p className="text-sm font-semibold text-gray-600 text-center">
              ছবির উপর ভিত্তি করে সঠিক উত্তরটি নির্বাচন করুন
            </p>
          </div>

          {/* Options */}
          <div className="p-6 md:p-10">
            <div
              className={`grid gap-3 ${
                item.optionsCount <= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-4 sm:grid-cols-8"
              }`}
            >
              {letters.map((l) => {
                const isSelected = answers[item.id] === l;
                return (
                  <button
                    key={l}
                    onClick={() => selectAnswer(l)}
                    className={`py-4 sm:py-5 text-xl font-bold transition-all duration-200 rounded-xl border-2 ${
                      isSelected
                        ? "bg-gradient-to-br from-[#2563EB] to-[#5DBB4D] text-white border-transparent shadow-[0_6px_20px_rgba(37,99,235,0.3)] scale-105"
                        : "bg-[#FAF7F2] text-gray-700 border-[#EAEFF0] hover:border-[#2563EB]/40 hover:bg-blue-50"
                    }`}
                  >
                    {l}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#EAEFF0]">
              <button
                disabled={cursor === 0}
                onClick={prev}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-600 disabled:opacity-30 flex items-center gap-2 transition-colors hover:text-gray-900 rounded-full hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                আগের প্রশ্ন
              </button>

              <button
                disabled={answers[item.id] === undefined || submitting}
                onClick={next}
                className="bg-gradient-to-r from-[#2563EB] to-[#5DBB4D] disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 px-8 py-3.5 rounded-full shadow-[0_6px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.35)]"
              >
                <span>
                  {submitting ? "জমা দেওয়া হচ্ছে..." : isLast ? "জমা দিন" : "পরের প্রশ্ন"}
                </span>
                {answers[item.id] !== undefined && !submitting && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isLast ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    )}
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </LayoutWrapper>
  );
}