import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchAmBatteryDetails } from "../api/amBatteryPublic";

interface BatteryDetails {
  slug: string;
  name: { bn: string; en?: string };
  description?: { bn: string; en?: string };
  coverImage?: string;
  price: number;
  version: string;
  config: { instruments: { key: string; name_bn: string }[] };
}

export default function AmBatteryDetailsPublic() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [battery, setBattery] = useState<BatteryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchAmBatteryDetails(slug)
      .then(setBattery)
      .catch(() => setError("এই ব্যাটারির তথ্য পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleStart = () => {
    // এখন সরাসরি quiz-এ পাঠাচ্ছে। পরে পেমেন্ট গেটওয়ে বসালে
    // এখানে প্রথমে পেমেন্ট পেজে পাঠাবেন, সফল হলে quiz-এ রিডাইরেক্ট করবেন।
    navigate(`/selection/${slug}/quiz`);
  };

  // ==========================================
  // Premium Leaf Loading State
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[320px]">
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
  if (error || !battery) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930] lg:pl-[320px] px-4">
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
    // Main Container with Sidebar Spacing (lg:pl-[320px])
    <div className="relative w-full min-h-screen flex flex-col bg-[#0A1930] overflow-hidden lg:pl-[320px]">
      
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
              src={battery.coverImage || "/placeholder.png"}
              alt={battery.name?.bn}
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-1000 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
            {/* Gradient Overlay for seamless blending with content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#132644] via-[#132644]/30 to-transparent" />
            
            {/* Free Badge (Blue-Green Gradient & Square) */}
            {battery.price === 0 && (
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
              {battery.name?.bn}
            </h1>

            <div className="flex items-center gap-2 mb-8">
              <span className="border border-[#3c5685]/60 bg-[#0A1930]/80 backdrop-blur-sm text-white/80 text-xs font-bold px-4 py-2 uppercase tracking-widest">
                Version {battery.version}
              </span>
              <span className="border border-[#1A6BBA]/40 bg-[#1A6BBA]/10 text-[#5DBB4D] text-xs font-bold px-4 py-2 uppercase tracking-widest">
                Provisional
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-12 lato-regular">
              {battery.description?.bn}
            </p>

            {/* Instruments List / What's inside */}
            {battery.config?.instruments?.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6 border-b border-[#3c5685]/40 pb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-sm font-bold text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text uppercase tracking-widest">
                    এই ব্যাটারিতে যা যা মূল্যায়ন হবে
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {battery.config.instruments.map((inst) => (
                    <div
                      key={inst.key}
                      className="group flex items-start gap-3 bg-[#0A1930]/50 border border-[#3c5685]/40 px-5 py-4 hover:border-[#5DBB4D]/50 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 text-[#1A6BBA] group-hover:text-[#5DBB4D] shrink-0 mt-0.5 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                      </svg>
                      <span className="text-white/80 text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                        {inst.name_bn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                PRICE & ACTION BUTTON
                ========================================== */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-[#3c5685]/40 mt-auto">
              
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/50 mb-2">ব্যাটারি ফি</p>
                <p className="text-4xl font-serif text-transparent bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text font-bold">
                  {battery.price > 0 ? `৳ ${battery.price}` : "ফ্রি"}
                </p>
              </div>

              <button
                onClick={handleStart}
                className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white font-bold text-lg py-4 px-10 shadow-[0_10px_30px_rgba(26,107,186,0.3)] hover:shadow-[0_10px_40px_rgba(93,187,77,0.5)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest border border-transparent hover:border-white/20"
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                <span className="relative z-10">
                  {battery.price > 0 ? "কিনুন ও শুরু করুন" : "শুরু করুন"}
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