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
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    />
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/80 to-[#FAF7F2] pointer-events-none" />
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

  useEffect(() => {
    if (!slug) return;
    fetchImageQuizForTaking(slug)
      .then((data) => {
        // Fallback to English name if available, else Bengali
        setQuizName(data.name?.en || data.name?.bn || "");
        setItems(data.items || []);
      })
      .catch((err) => setError(err.message || "This quiz could not be found."))
      .finally(() => setLoading(false));
  }, [slug]);

  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] lg:pl-[50px] pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      <SharedBackground />
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );

  // ==========================================
  // Premium Leaf Loading Spinner
  // ==========================================
  if (loading) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
            <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
            </svg>
          </div>
          <p className="mt-6 text-black font-bold tracking-[0.2em] uppercase text-sm">
            Loading...
          </p>
        </div>
      </LayoutWrapper>
    );
  }

  // ==========================================
  // Premium Sharp Error State
  // ==========================================
  if (error) {
    return (
      <LayoutWrapper>
        <div className="bg-white border border-[#EAEFF0] px-8 py-8 flex flex-col items-center gap-4 shadow-sm text-center max-w-md mx-auto rounded-sm">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-black font-serif text-lg tracking-wide">{error}</span>
        </div>
      </LayoutWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="bg-yellow-50 border border-yellow-200 p-8 text-center shadow-sm max-w-md mx-auto rounded-sm">
          <p className="text-yellow-800 font-serif text-lg tracking-wide">No questions have been added to this quiz yet.</p>
        </div>
      </LayoutWrapper>
    );
  }

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
      alert(err.message || "Failed to submit. Please try again.");
      setSubmitting(false);
    }
  };

  const prev = () => cursor > 0 && setCursor((c) => c - 1);

  return (
    <LayoutWrapper>
      
      {/* =========================================
          PROGRESS INDICATOR (Matched to Reference Image)
          ========================================= */}
      <div className="flex justify-start items-end mb-6">
        <span className="text-[#D4BCA6] font-bold tracking-[0.2em] uppercase text-xs">
          Question {cursor + 1} <span className="text-[#A0AAB2]">/ {items.length}</span>
        </span>
      </div>

      {/* =========================================
          MAIN QUIZ AREA
          ========================================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cursor}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#EAEFF0] p-6 sm:p-10 shadow-sm w-full rounded-sm"
        >
          {/* Main Question Text (if applicable, based on your structure it's an image quiz, but keeping layout consistent) */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-black mb-10 leading-snug">
            Please select the correct option based on the image.
          </div>

          {/* Image Container */}
          <div className="relative w-full mb-12 bg-white flex justify-center items-center">
            <img
              src={item.imageUrl}
              alt={`Question ${item.id}`}
              className="max-w-full max-h-[50vh] object-contain"
            />
          </div>

          {/* Options Grid (Matching Reference Image styling) */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {letters.map((l) => {
              const isSelected = answers[item.id] === l;
              return (
                <button
                  key={l}
                  onClick={() => selectAnswer(l)}
                  className={`py-4 sm:py-5 border text-lg sm:text-xl font-bold transition-all duration-200 rounded-sm ${
                    isSelected
                      ? "bg-[#C8D0C0] text-black border-[#C8D0C0]"
                      : "bg-[#FAF7F2] text-black border-[#EAEFF0] hover:border-[#C8D0C0] hover:bg-white"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#EAEFF0]">
            <button
              disabled={cursor === 0}
              onClick={prev}
              className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-black disabled:opacity-30 flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <button
              disabled={answers[item.id] === undefined || submitting}
              onClick={next}
              className="bg-[#C8D0C0] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-black text-sm uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm"
            >
              <span>
                {submitting
                  ? "Submitting..."
                  : isLast
                  ? "Submit"
                  : "Next"}
              </span>
              {answers[item.id] !== undefined && !submitting && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isLast ? (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  )}
                </svg>
              )}
            </button>
          </div>

        </motion.div>
      </AnimatePresence>
      
    </LayoutWrapper>
  );
}