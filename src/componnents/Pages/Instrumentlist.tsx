import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchInstrumentList } from "../api/instruments";
import type { InstrumentListItem } from "../types/instrument";

export default function InstrumentList() {
  const [instruments, setInstruments] = useState<InstrumentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInstrumentList()
      .then(setInstruments)
      .catch(() => setError("তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, []);

  // ==========================================
  // Premium Leaf Loading Spinner (Light Theme)
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[320px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          {/* Changed text color to Sage Mist */}
          <svg className="w-10 h-10 text-[#C8D0C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        {/* Text color changed to Linen Clay */}
        <p className="mt-6 text-[#D4BCA6] font-bold tracking-[0.2em] uppercase text-sm">
          অ্যাসেসমেন্ট লোড হচ্ছে...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Error State (Light Theme)
  // ==========================================
  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[320px]">
        {/* Error box uses white background with a subtle border */}
        <div className="bg-white border border-[#C8D0C0] px-8 py-6 flex flex-col items-center gap-4 shadow-sm">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[#596573] font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] overflow-hidden">
      
      {/* =========================================
          BACKGROUND IMAGE & LIGHT OVERLAY
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752896/WhatsApp_Image_2026-09-28_at_11.03.35_AM_ca5ep5.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Light gradient overlay to blend into Morning Ivory */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/60 to-[#FAF7F2]/95" />

      {/* 
        MAIN CONTENT WRAPPER
        lg:pl-[320px] যোগ করা হয়েছে সাইডবারের স্পেসিংয়ের জন্য 
      */}
      <div className="relative z-10 flex-1 lg:pl-[50px] flex flex-col">
        
        <div className="w-full pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto flex-1">
          
          {/* =========================================
              HEADER SECTION (Suchi Potro Style)
              ========================================= */}
          <div className="mb-14 text-center lg:text-left border-b border-[#C8D0C0]/50 pb-8 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white/50 p-8 backdrop-blur-sm border-t border-x">
            <div>
              {/* Eyebrow Text */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <svg className="w-5 h-5 text-[#C8D0C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                </svg>
                {/* Changed to Linen Clay */}
                <span className="text-[#D4BCA6] playfair-semibold text-xs uppercase tracking-widest font-bold">
                  অ্যাসেসমেন্ট সূচিপত্র
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl playfair-bold text-[#2C3338] font-serif tracking-tight drop-shadow-sm">
                সকল টেস্ট সমূহ
              </h1>
            </div>
            
            <div className="max-w-md text-center lg:text-left">
              <p className="text-[#596573] text-sm sm:text-base lato-regular leading-relaxed border-l-2 border-[#D4BCA6] pl-4">
                আপনার ব্যক্তিত্ব, মানসিক স্থিতি এবং প্রফেশনাল স্কিল যাচাই করার জন্য তালিকা থেকে উপযুক্ত টেস্টটি বেছে নিন এবং আপনার যাত্রা শুরু করুন।
              </p>
            </div>
          </div>

          {/* =========================================
              INDEXED GRID (3 Columns)
              ========================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instruments.map((inst, index) => {
              // সূচিপত্রের সিরিয়াল নাম্বার জেনারেট (01, 02, 03...)
              const serialNum = String(index + 1).padStart(2, '0');

              return (
                <Link
                  to={`/tests/${inst.instrumentSlug}`}
                  key={inst._id}
                  // Changed to a clean white card with subtle shadows
                  className="group flex flex-col bg-white/80 backdrop-blur-md border border-[#EAEFF0] overflow-hidden hover:border-[#D4BCA6] hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300 relative"
                >
                  {/* Suchi Potro (Index) Badge using Sage Mist */}
                  <div className="absolute top-0 right-0 z-20 bg-[#C8D0C0] text-[#2C3338] font-bold font-serif text-sm px-4 py-2 shadow-sm">
                    {serialNum}
                  </div>

                  {/* Top Image Section (Sharp Edges) */}
                  <div className="relative h-56 overflow-hidden bg-[#EDE5DA]">
                    <img
                      src={inst.coverImage || "/placeholder.png"}
                      alt={inst.instrumentName.bn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                    {/* Gradient Overlay for Text Blending using Morning Ivory tone */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/20 to-transparent" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8 flex-1 flex flex-col relative z-10 -mt-10">
                    <h3 className="text-[18px] sm:text-2xl playfair-medium text-[#2C3338] mb-4 line-clamp-2 leading-snug drop-shadow-sm font-serif group-hover:text-[#D4BCA6] transition-colors">
                      {inst.instrumentName.bn}
                    </h3>
                    
                    {/* Price and Action Footer */}
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#EAEFF0]">
                      
                      {/* Price Tag (Sharp and Premium) */}
                      <span 
                        className={`px-5 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase border ${
                          inst.price > 0 
                            ? 'bg-[#EAEFF0] text-[#596573] border-[#C8D0C0]/50' // Paid
                            : 'bg-[#D4BCA6] text-white border-transparent' // Free
                        }`}
                      >
                        {inst.price > 0 ? `৳ ${inst.price}` : "ফ্রি"}
                      </span>
                      
                      {/* Interactive Leaf Button */}
                      <span className="w-10 h-10 border border-[#C8D0C0] bg-white flex items-center justify-center group-hover:border-[#D4BCA6] group-hover:bg-[#F0EBE6] transition-all duration-300">
                        <svg 
                          className="w-5 h-5 text-[#A0AAB2] group-hover:text-[#D4BCA6] group-hover:rotate-12 transition-all duration-300" 
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

        </div>
      </div>
    </div>
  );
}