import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchImageQuizDetails } from "../api/imageQuizPublic";

interface QuizDetails {
  slug: string;
  name: { bn: string; en?: string };
  description?: { bn: string };
  coverImage?: string;
  price: number;
  itemCount: number;
}

export default function ImageQuizDetailsPublic() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchImageQuizDetails(slug)
      .then(setQuiz)
      .catch(() => setError("এই কুইজের তথ্য পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleStart = () => {
    navigate(`/image-quiz/${slug}/quiz`);
  };

  // ==========================================
  // Premium Leaf Loading State
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold tracking-[0.2em] uppercase text-sm">
          বিস্তারিত লোড হচ্ছে...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Error State
  // ==========================================
  if (error || !quiz) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px] px-4">
        <div className="bg-[#132644] border border-red-500/50 px-8 py-8 text-center max-w-md shadow-2xl">
          <svg className="w-10 h-10 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white/80 font-serif text-lg tracking-wide">{error || "তথ্য পাওয়া যায়নি"}</p>
        </div>
      </div>
    );
  }

  return (

    <div className="relative w-full min-h-screen flex flex-col bg-[#0A1930] overflow-hidden lg:pl-[50px]">
      
      {/* SVG Definitions for Global Blue-Green Gradient */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================
          BACKGROUND SETUP
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0A1930]/60 to-[#0A1930]" />

      {/* Subtle Blue/Green Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5DBB4D]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="w-full pt-24 pb-20 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Premium Square Card Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#132644]/90 backdrop-blur-md border border-[#3c5685]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col relative"
        >
          
          {/* ==========================================
              IMAGE SECTION
              ========================================== */}
          <div className="relative w-full h-64 sm:h-80 md:h-[350px] overflow-hidden bg-[#0A1930]">
            <img
              src={quiz.coverImage || "/placeholder.png"}
              alt={quiz.name?.bn}
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
            {/* Gradient Overlay for seamless blending with content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#132644] via-[#132644]/30 to-transparent" />
            
            {/* Free Badge (Blue-Green Gradient & Square) */}
            {quiz.price === 0 && (
              <div className="absolute top-6 right-6 bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white text-sm font-bold px-6 py-2.5 tracking-[0.2em] uppercase shadow-lg">
                ফ্রি
              </div>
            )}
          </div>

          {/* ==========================================
              CONTENT SECTION
              ========================================== */}
          <div className="p-8 sm:p-12 md:p-16 relative z-10 -mt-16 md:-mt-24">
            
            {/* Title & Version Tag */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-serif tracking-tight leading-tight drop-shadow-md">
              {quiz.name?.bn}
            </h1>

            <div className="flex items-center gap-2 mb-8">
              <span className="border border-[#1A6BBA]/40 bg-[#1A6BBA]/10 text-[#5DBB4D] text-xs font-bold px-4 py-2 uppercase tracking-widest">
                {quiz.itemCount}টা প্রশ্ন
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-12 lato-regular">
              {quiz.description?.bn}
            </p>

            {/* ==========================================
                PRICE & ACTION BUTTON
                ========================================== */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-[#3c5685]/40 mt-auto">
              
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/50 mb-2">কুইজ ফি</p>
                <p className="text-4xl font-serif text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold">
                  {quiz.price > 0 ? `৳ ${quiz.price}` : "ফ্রি"}
                </p>
              </div>

              <button
                onClick={handleStart}
                className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white font-bold text-lg py-4 px-10 shadow-[0_10px_30px_rgba(26,107,186,0.3)] hover:shadow-[0_10px_40px_rgba(93,187,77,0.5)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest border border-transparent hover:border-white/20"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                <span className="relative z-10">
                  {quiz.price > 0 ? "কিনুন ও শুরু করুন" : "শুরু করুন"}
                </span>
                {/* Premium Leaf Icon (Replacing Arrow) */}
                <svg 
                  className="w-5 h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                </svg>
              </button>
              
            </div>
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}