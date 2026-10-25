import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchImageQuizResult } from "../api/imageQuizPublic";

// ==========================================
// Global Shared Background (Light & Minimal)
// ==========================================
const SharedBackground = () => (
  <>
    {/* SVG Definitions for Global Blue-Green Gradient (Preserved for icons) */}
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
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2]/90 to-[#FAF7F2] pointer-events-none" />
    
    {/* Soft Ambient Glows */}
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F0EBE6]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
  </>
);

export default function ImageQuizResult() {
  const { responseId } = useParams<{ responseId: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!responseId) return;
    fetchImageQuizResult(responseId)
      .then(setData)
      .catch((err) => setError(err.message || "Report not found."))
      .finally(() => setLoading(false));
  }, [responseId]);

  // ==========================================
  // Premium Leaf Loading Spinner
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] overflow-hidden">
        <SharedBackground />
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite] z-10">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-black font-bold tracking-[0.2em] uppercase text-sm z-10">
          Generating Results...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Sharp Error State
  // ==========================================
  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] overflow-hidden px-4">
        <SharedBackground />
        <div className="bg-white border border-[#EAEFF0] px-8 py-8 flex flex-col items-center gap-4 shadow-sm relative z-10 text-center rounded-sm max-w-md mx-auto">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-black font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // ==========================================
  // Payment Required State
  // ==========================================
  if (data.paymentRequired) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] overflow-hidden px-4">
        <SharedBackground />
        <div className="bg-white border border-[#EAEFF0] px-10 py-10 flex flex-col items-center text-center shadow-sm relative z-10 rounded-sm">
          <svg className="w-12 h-12 text-[#C8D0C0] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-black font-serif text-xl tracking-wide mb-2">Payment is required to view this report.</p>
          <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Response ID: {data.responseId}</p>
        </div>
      </div>
    );
  }

  const r = data.result;

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] lg:pl-[50px] pb-24 overflow-hidden flex flex-col">
      <SharedBackground />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full pt-24 relative z-10 flex-1">
        
        {/* =========================================
            HEADER SCORE CARD
            ========================================= */}
        <div className="bg-white border border-[#EAEFF0] p-8 sm:p-12 mb-8 shadow-sm text-center rounded-sm">
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            {data.quizName?.en || data.quizName?.bn}
          </p>
          
          <div className="text-6xl sm:text-7xl font-bold text-black font-mono mb-2">
            {r.score} <span className="text-gray-300 text-4xl">/ {r.total}</span>
          </div>
          
          <div className="text-xl sm:text-2xl font-bold text-black mt-2 tracking-wider">
            {r.percentage}%
          </div>
        </div>

        {/* =========================================
            DETAILED RESULTS
            ========================================= */}
        <div className="bg-white border border-[#EAEFF0] p-6 sm:p-8 shadow-sm rounded-sm">
          <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-[#EAEFF0] pb-4">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Question-level Results
          </h3>
          
          <div className="flex flex-col gap-4">
            {r.details.map((d: any, i: number) => (
              <div
                key={d.itemId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF7F2] border border-[#EAEFF0] p-5 hover:border-[#C8D0C0] transition-colors rounded-sm"
              >
                <div className="flex-1">
                  <div className="text-base font-serif font-bold text-black mb-2">
                    Question {i + 1} <span className="text-gray-400 text-sm ml-2 font-sans tracking-widest">({d.itemId})</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-500 mb-2">
                    <span>Your Answer: <b className={d.isCorrect ? "text-[#5DBB4D]" : "text-red-500"}>{d.selected || "—"}</b></span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span>Correct Answer: <b className="text-black">{d.correctOptionId}</b></span>
                  </div>
                  
                  {(d.note_en || d.note_bn) && (
                    <p className="text-xs text-gray-500 leading-relaxed border-l-2 border-gray-300 pl-3 mt-2">
                      {d.note_en || d.note_bn}
                    </p>
                  )}
                </div>
                
                <div className="w-full sm:w-auto text-right sm:text-left">
                  <span
                    className={`inline-block text-xs font-bold px-4 py-2 uppercase tracking-widest border shrink-0 rounded-sm ${
                      d.isCorrect 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}
                  >
                    {d.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}