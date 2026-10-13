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
      .catch((err) => setError(err.message || "Failed to load the quiz list."))
      .finally(() => setLoading(false));
  }, []);

  // ==========================================
  // Premium Leaf Loading Spinner (Light Theme)
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-black font-bold tracking-[0.2em] uppercase text-sm">
          Loading...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State (Light Theme)
  // ==========================================
  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px]">
        <div className="bg-white border border-[#EAEFF0] px-8 py-6 flex flex-col items-center gap-4 shadow-sm rounded-sm">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-black font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] overflow-hidden">
      
      {/* SVG Definitions for Global Blue-Green Gradient (Preserved for icons) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* =========================================
          BACKGROUND IMAGE & LIGHT OVERLAY
          ========================================= */}
      <div 
        className="absolute inset-0 z-5 opacity-100 pointer-events-none"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752896/WhatsApp_Image_2026-09-28_at_11.03.35_AM_ca5ep5.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Light Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/80 to-[#FAF7F2] pointer-events-none" />

      {/* =========================================
          MAIN CONTENT WRAPPER (Sidebar Spacing)
          ========================================= */}
      <div className="relative z-10 flex-1 lg:pl-12.5 flex flex-col">
        
        <div className="w-full pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto flex-1">
          
          {/* Header Section */}
          <div className="mb-14 text-center lg:text-left border-b border-[#EAEFF0] pb-8 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white/50 p-8 backdrop-blur-md border-t">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                </svg>
                <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                  Quiz Index
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-medium text-black font-serif tracking-tight drop-shadow-sm">
                Intelligence Assessment based Quizzes
              </h1>
            </div>
            
            <div className="max-w-md text-center lg:text-left">
              <p className="text-gray-600 text-sm sm:text-base lato-regular leading-relaxed border-l-2 border-[#C8D0C0] pl-4">
                Answer based on images — aptitude, logical, and spatial reasoning questions.
              </p>
            </div>
          </div>

          {/* =========================================
              QUIZ GRID OR EMPTY STATE
              ========================================= */}
          {quizzes.length === 0 ? (
            <div className="bg-white border border-[#EAEFF0] p-16 flex flex-col items-center justify-center text-center shadow-sm rounded-sm">
              <svg className="w-12 h-12 text-[#C8D0C0] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
              </svg>
              <p className="text-gray-500 text-lg font-serif tracking-wide">No quizzes have been published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((q, index) => {
                const serialNum = String(index + 1).padStart(2, '0');

                return (
                  <Link
                    to={`/image-quiz/${q.slug}`}
                    key={q._id}
                    className="group flex flex-col bg-white border border-[#EAEFF0] overflow-hidden hover:border-[#C8D0C0] shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300 relative rounded-sm"
                  >
                    {/* Index Badge */}
                    <div className="absolute top-0 right-0 z-20 bg-[#C8D0C0] text-black font-bold font-serif text-sm px-4 py-2 shadow-sm rounded-bl-sm">
                      {serialNum}
                    </div>

                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-[#FAF7F2]">
                      <img
                        src={q.coverImage || "/placeholder.png"}
                        alt={q.name?.en || q.name?.bn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col relative z-10 -mt-10">
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-4 line-clamp-2 leading-snug drop-shadow-sm font-serif group-hover:text-gray-600 transition-colors">
                        {q.name?.en || q.name?.bn}
                      </h3>
                      
                      {/* Price & Hover Action */}
                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#EAEFF0]">
                        <span 
                          className={`px-5 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase border rounded-sm ${
                            q.price > 0 
                              ? 'bg-[#FAF7F2] text-black border-[#C8D0C0]/50' 
                              : 'bg-[#C8D0C0] text-black border-transparent'
                          }`}
                        >
                          {q.price > 0 ? `৳ ${q.price}` : "Free"}
                        </span>
                        
                        {/* Leaf Hover Button (Original Green Highlight Preserved) */}
                        <span className="w-10 h-10 border border-[#EAEFF0] bg-white flex items-center justify-center group-hover:border-[#5DBB4D] group-hover:bg-[#5DBB4D]/10 transition-all duration-300 rounded-sm">
                          <svg 
                            className="w-5 h-5 text-gray-400 group-hover:text-[#5DBB4D] group-hover:rotate-12 transition-all duration-300" 
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