import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      .catch(() => setError("এই টেস্টের তথ্য পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleBuyNow = () => {
    // পেমেন্ট গেটওয়ে বা সরাসরি কুইজ পেজ
    navigate(`/tests/${slug}/quiz`);
  };

  // ==========================================
  // Premium Loading State (Square Spinner)
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#0A1930] lg:pl-[320px]">
        {/* Square Spinner */}
        <div className="w-12 h-12 border-2 border-[#3c5685] border-t-[#ffba12] animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-6 text-[#ffba12] tracking-[0.2em] uppercase text-sm font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  // ==========================================
  // Premium Error State
  // ==========================================
  if (error || !instrument) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0A1930] lg:pl-80 px-4">
        <div className="bg-[#132644] border border-red-500/50 px-8 py-6 text-center max-w-md shadow-2xl">
          <svg className="w-10 h-10 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white/80 text-lg">{error || "তথ্য পাওয়া যায়নি"}</p>
        </div>
      </div>
    );
  }

  return (
    // Main Container with Sidebar Spacing
    <div className="min-h-screen bg-[#0A1930] pt-32 pb-20 px-4 sm:px-6 lg:pl-12.5 flex flex-col relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-[#1A6BBA]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Premium Square Card Wrapper */}
        <div className="bg-[#132644] border border-[#3c5685]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col relative">
          
          {/* ==========================================
              IMAGE SECTION
              ========================================== */}
          <div className="relative w-full h-64 sm:h-80 md:h-100 overflow-hidden bg-[#0A1930]">
            <img
              src={instrument.coverImage || "/placeholder.png"}
              alt={instrument.instrumentName.bn}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
            {/* Gradient Overlay for seamless blending with content */}
            <div className="absolute inset-0 bg-linear-to-t from-[#132644] via-[#132644]/40 to-transparent" />
            
            {/* Free Badge (Square & Premium) */}
            {instrument.price === 0 && (
              <div className="absolute top-6 right-6 bg-[#ffba12] text-[#0A1930] text-sm font-bold px-6 py-2 tracking-[0.2em] uppercase shadow-lg">
                ফ্রি
              </div>
            )}
          </div>

          {/* ==========================================
              CONTENT SECTION
              ========================================== */}
          <div className="p-8 sm:p-12 relative z-10 -mt-16 md:-mt-24">
            
            {/* Tags (Time & Questions) - Square borders */}
            <div className="flex flex-wrap gap-4 mb-6">
              {instrument.estimatedMinutes && (
                <span className="flex items-center gap-2 border border-[#3c5685]/60 bg-[#0A1930]/80 backdrop-blur-sm text-white/80 text-sm font-medium px-4 py-2">
                  <svg className="w-4 h-4 text-[#ffba12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {instrument.estimatedMinutes[0]}–{instrument.estimatedMinutes[1]} মিনিট
                </span>
              )}
              {instrument.itemCount && (
                <span className="flex items-center gap-2 border border-[#3c5685]/60 bg-[#0A1930]/80 backdrop-blur-sm text-white/80 text-sm font-medium px-4 py-2">
                  <svg className="w-4 h-4 text-[#ffba12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {instrument.itemCount} প্রশ্ন
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-serif tracking-tight leading-tight drop-shadow-md">
              {instrument.instrumentName.bn}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-12 lato-regular">
              {instrument.description?.bn}
            </p>

            {/* ==========================================
                PRICE & ACTION BUTTON
                ========================================== */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-[#3c5685]/40 mt-auto">
              
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/50 mb-2">অ্যাসেসমেন্ট ফি</p>
                <p className="text-4xl font-serif text-[#ffba12]">
                  {instrument.price > 0 ? `৳ ${instrument.price}` : "ফ্রি"}
                </p>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto bg-[#ffba12] hover:bg-white text-[#0A1930] font-bold text-lg py-4 px-10 shadow-[0_0_20px_rgba(255,186,18,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-wider"
              >
                <span>শুরু করুন</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}