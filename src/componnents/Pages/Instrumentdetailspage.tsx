import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchInstrumentDetails } from "../api/instruments";
import type { InstrumentDetails } from "../types/instrument";

export default function InstrumentDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [instrument, setInstrument] = useState<InstrumentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchInstrumentDetails(slug)
      .then(setInstrument)
      .catch(() => setError("Failed to load assessment details."))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleBuyNow = () => {
    // Payment gateway or direct to quiz page
    navigate(`/tests/${slug}/quiz`);
  };

  // ==========================================
  // Premium Leaf Loading State (Light Theme)
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[320px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          {/* Leaf kept in original green color */}
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-[#D4BCA6] font-bold tracking-[0.2em] uppercase text-sm">
          Loading details...
        </p>
      </div>
    );
  }

  // ==========================================
  // Premium Error State (Light Theme)
  // ==========================================
  if (error || !instrument) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[320px] px-4">
        <div className="bg-white border border-[#C8D0C0]/80 px-8 py-8 text-center max-w-md shadow-sm">
          <svg className="w-10 h-10 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[#596573] font-serif text-lg tracking-wide">{error || "Details not found"}</p>
        </div>
      </div>
    );
  }

  return (
    // Main Container with Sidebar Spacing (lg:pl-[50px] as per your updated layout)
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] overflow-hidden lg:pl-[50px]">
      
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
          BACKGROUND SETUP
          ========================================= */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1790230666/Gemini_Generated_Image_hu4k2phu4k2phu4k_pbadd2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Light Overlay to wash out image into Morning Ivory */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/60 to-[#FAF7F2]" />

      {/* Ambient Light Glows (Soft Horizon & Blush Dawn) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0EBE6]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="w-full pt-24 pb-20 px-4 sm:px-6 lg:px-10 max-w-5xl mx-auto relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Premium Square Card Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/85 backdrop-blur-md border border-[#C8D0C0]/60 shadow-[0_15px_40px_rgba(0,0,0,0.05)] flex flex-col relative"
        >
          
          {/* ==========================================
              IMAGE SECTION
              ========================================== */}
          <div className="relative w-full h-64 sm:h-80 md:h-[400px] overflow-hidden bg-[#EDE5DA]">
            <img
              src={instrument.coverImage || "/placeholder.png"}
              alt={instrument.instrumentName.en || instrument.instrumentName.bn}
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
            {/* Light Gradient Overlay for seamless blending with content */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
            
            {/* Free Badge (Sage Mist & Square) */}
            {instrument.price === 0 && (
              <div className="absolute top-6 right-6 bg-[#C8D0C0] text-[#2C3338] text-sm font-bold px-6 py-2.5 tracking-[0.2em] uppercase shadow-sm">
                Free
              </div>
            )}
          </div>

          {/* ==========================================
              CONTENT SECTION
              ========================================== */}
          <div className="p-8 sm:p-12 md:p-16 relative z-10 -mt-16 md:-mt-24">
            
            {/* Tags (Time & Questions) - Light Mode styling with Original Leaf Icons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {instrument.estimatedMinutes && (
                <span className="flex items-center gap-2.5 border border-[#C8D0C0]/80 bg-[#FAF7F2] text-[#596573] text-sm font-medium px-5 py-2.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {instrument.estimatedMinutes[0]}–{instrument.estimatedMinutes[1]} Minutes
                </span>
              )}
              {instrument.itemCount && (
                <span className="flex items-center gap-2.5 border border-[#C8D0C0]/80 bg-[#FAF7F2] text-[#596573] text-sm font-medium px-5 py-2.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {instrument.itemCount} Questions
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl playfair-bold text-[#2C3338] mb-6 tracking-tight leading-tight drop-shadow-sm">
              {instrument.instrumentName.en || instrument.instrumentName.bn}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#596573] leading-relaxed mb-12 playfair-regular">
              {instrument.description?.en || instrument.description?.bn}
            </p>

            {/* ==========================================
                PRICE & ACTION BUTTON
                ========================================== */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-[#EAEFF0] mt-auto">
              
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-xs font-medium text-[#242525] mb-2">Assessment Fee</p>
                <p className="text-3xl font-serif pt-2 text-[#2C3338] font-bold">
                  {instrument.price > 0 ? `৳ ${instrument.price}` : "Free"}
                </p>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto relative overflow-hidden bg-[#C8D0C0] text-[#2C3338] font-bold text-lg py-4 px-10 shadow-[0_8px_20px_rgba(200,208,192,0.3)] hover:bg-[#b5bead] hover:shadow-[0_12px_25px_rgba(200,208,192,0.5)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest rounded-sm"
              >
                <span className="relative z-10">Start Assessment</span>
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