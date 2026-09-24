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
// Global Shared Background
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
      className="absolute inset-0 z-0 opacity-15"
      style={{
        backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    />
    <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0A1930]/90 via-[#0A1930]/80 to-[#0A1930]" />
    <div className="absolute top-0 right-0 w-100 h-100 bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="absolute bottom-0 left-0 w-75 h-75 bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
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
        setQuizName(data.name?.bn || "");
        setItems(data.items || []);
      })
      .catch((err) => setError(err.message || "এই কুইজটি পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-full min-h-screen flex flex-col bg-[#0A1930] lg:pl-12.5 pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
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
          <p className="mt-6 text-transparent bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold tracking-[0.2em] uppercase text-sm">
            লোড হচ্ছে...
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
        <div className="bg-[#132644]/90 backdrop-blur-md border border-red-500/50 px-8 py-8 flex flex-col items-center gap-4 shadow-2xl text-center max-w-md mx-auto">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-white/80 font-serif text-lg tracking-wide">{error}</span>
        </div>
      </LayoutWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <LayoutWrapper>
        <div className="bg-[#ffba12]/10 border border-[#ffba12]/30 p-8 text-center shadow-xl max-w-md mx-auto">
          <p className="text-[#ffba12] font-serif text-lg tracking-wide">এই কুইজে এখনো কোনো প্রশ্ন যোগ করা হয়নি।</p>
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
      alert(err.message || "জমা দেওয়া যায়নি। আবার চেষ্টা করুন।");
      setSubmitting(false);
    }
  };

  const prev = () => cursor > 0 && setCursor((c) => c - 1);

  return (
    <LayoutWrapper>
      
      {/* =========================================
          PROGRESS BAR
          ========================================= */}
      <div className="mb-8 bg-[#132644]/80 p-4 border border-[#3c5685]/40 backdrop-blur-sm">
        <div className="flex justify-between text-xs font-bold tracking-widest uppercase text-white/60 mb-3">
          <span className="text-[#5DBB4D]">{quizName}</span>
          <span className="text-[#1A6BBA]">
            {cursor + 1} / {items.length}
          </span>
        </div>
        <div className="flex gap-1 h-1.5 bg-transparent overflow-hidden">
          {items.map((_, i) => (
            <div key={i} className="flex-1 h-full bg-[#0A1930] border border-[#3c5685]/30">
              <motion.div 
                initial={false}
                animate={{ width: i <= cursor ? "100%" : "0%" }}
                className="h-full bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D]"
              />
            </div>
          ))}
        </div>
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
          className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/50 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full"
        >
          {/* Image Container */}
          <div className="relative w-full mb-8 bg-[#0A1930] border border-[#3c5685]/40 p-4 flex justify-center items-center min-h-75">
            <img
              src={item.imageUrl}
              alt={`Question ${item.id}`}
              className="max-w-full max-h-[60vh] object-contain shadow-lg"
            />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
            {letters.map((l) => {
              const isSelected = answers[item.id] === l;
              return (
                <button
                  key={l}
                  onClick={() => selectAnswer(l)}
                  className={`py-4 sm:py-5 border text-lg sm:text-xl font-bold transition-all duration-300 ${
                    isSelected
                      ? "bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent shadow-[0_0_15px_rgba(93,187,77,0.4)] scale-105"
                      : "bg-[#0A1930] text-white/80 border-[#3c5685]/60 hover:border-[#5DBB4D]/60 hover:bg-[#5DBB4D]/10 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#3c5685]/40">
            <button
              disabled={cursor === 0}
              onClick={prev}
              className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white disabled:opacity-0 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              আগের
            </button>
            <button
              disabled={answers[item.id] === undefined || submitting}
              onClick={next}
              className="relative overflow-hidden bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] disabled:from-[#3c5685] disabled:to-[#3c5685] disabled:text-white/40 disabled:cursor-not-allowed text-white text-sm uppercase tracking-widest font-bold transition-all shadow-[0_5px_20px_rgba(26,107,186,0.3)] flex items-center justify-center gap-2 group px-8 py-3.5 border border-transparent"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              <span className="relative z-10">
                {submitting
                  ? "জমা হচ্ছে..."
                  : isLast
                  ? "জমা দিন"
                  : "পরের"}
              </span>
              {answers[item.id] !== undefined && !submitting && (
                <svg className={`w-4 h-4 relative z-10 transition-transform duration-300 ${isLast ? 'group-hover:rotate-12 group-hover:scale-110' : 'group-hover:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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