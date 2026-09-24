import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchImageQuizList } from "../api/imageQuizPublic";

interface QuizCard {
  _id: string;
  slug: string;
  name: { bn: string; en?: string };
  coverImage?: string;
  price: number;
}

export default function ImageQuizListPublic() {
  const [quizzes, setQuizzes] = useState<QuizCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImageQuizList()
      .then(setQuizzes)
      .catch((err) => setError(err.message || "তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, []);

  // ==========================================
  // Premium Leaf Loading Spinner
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
          লোড হচ্ছে...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State
  // ==========================================
  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[50px]">
        <div className="bg-[#132644] border border-red-500/50 px-8 py-6 flex flex-col items-center gap-4 shadow-2xl">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-white/80 font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#0A1930] overflow-hidden">
      
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
          BACKGROUND IMAGE (Clear Visibility)
          ========================================= */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Light Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-[#0A1930]/40 to-[#0A1930]/95" />

      {/* =========================================
          MAIN CONTENT WRAPPER (Sidebar Spacing)
          ========================================= */}
      <div className="relative z-10 flex-1 lg:pl-12.5 flex flex-col">
        
        <div className="w-full pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto flex-1">
          
          {/* Header Section */}
          <div className="mb-14 text-center lg:text-left border-b border-[#3c5685]/40 pb-8 flex flex-col lg:flex-row justify-between items-center gap-6 bg-[#0A1930]/40 p-8 backdrop-blur-md border-t">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                </svg>
                <span className="text-transparent bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold text-sm uppercase">
                  অ্যাসেসমেন্ট সূচিপত্র
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white font-serif tracking-tight drop-shadow-lg">
             ছবি ভিত্তিক কুইজ
              </h1>
            </div>
            
            <div className="max-w-md text-center lg:text-left">
              <p className="text-white/80 text-sm sm:text-base lato-regular leading-relaxed border-l-2 border-[#5DBB4D] pl-4">
                ছবি দেখে উত্তর দিন -যোগ্যতা, যুক্তি ও স্থানিক কল্পনা টাইপ প্রশ্ন।
              </p>
            </div>
          </div>

          {/* =========================================
              QUIZ GRID OR EMPTY STATE
              ========================================= */}
          {quizzes.length === 0 ? (
            <div className="bg-[#132644]/70 backdrop-blur-md border border-[#3c5685]/50 p-16 flex flex-col items-center justify-center text-center shadow-xl">
              <svg className="w-12 h-12 text-[#3c5685] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
              </svg>
              <p className="text-white/60 text-lg font-serif tracking-wide">এখনো কোনো Quiz পাবলিশ করা হয়নি।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((q, index) => {
                const serialNum = String(index + 1).padStart(2, '0');

                return (
                  <Link
                    to={`/image-quiz/${q.slug}`}
                    key={q._id}
                    className="group flex flex-col bg-[#132644]/80 backdrop-blur-md border border-[#3c5685]/50 overflow-hidden hover:border-[#5DBB4D]/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:-translate-y-2 transition-all duration-300 relative"
                  >
                    {/* Index Badge */}
                    <div className="absolute top-0 right-0 z-20 bg-gradient-to-bl from-[#1A6BBA] to-[#5DBB4D] text-white font-bold font-serif text-sm px-4 py-2 shadow-lg">
                      {serialNum}
                    </div>

                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-[#0A1930]">
                      <img
                        src={q.coverImage || "/placeholder.png"}
                        alt={q.name?.bn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#132644] via-[#132644]/20 to-transparent" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col relative z-10 -mt-10">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 line-clamp-2 leading-snug drop-shadow-md font-serif group-hover:text-[#5DBB4D] transition-colors">
                        {q.name?.bn}
                      </h3>
                      
                      {/* Price & Hover Action */}
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#3c5685]/40">
                        <span 
                          className={`px-5 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase border ${
                            q.price > 0 
                              ? 'bg-[#1A6BBA]/10 text-white border-[#1A6BBA]/50' 
                              : 'bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-[#0A1930] border-transparent'
                          }`}
                        >
                          {q.price > 0 ? `৳ ${q.price}` : "ফ্রি"}
                        </span>
                        
                        {/* Leaf Hover Button */}
                        <span className="w-10 h-10 border border-[#3c5685]/80 bg-[#0A1930] flex items-center justify-center group-hover:border-[#5DBB4D] group-hover:bg-[#5DBB4D]/10 transition-all duration-300">
                          <svg 
                            className="w-5 h-5 text-white/50 group-hover:text-[#5DBB4D] group-hover:rotate-12 transition-all duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}