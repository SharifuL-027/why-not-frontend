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
  config: { instruments: { key: string; name_en?: string; name_bn: string }[] };
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
      .catch(() => setError("Failed to load battery details."))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleStart = () => {
    // Navigate to quiz. If payment gateway is added later, route to payment first.
    navigate(`/selection/${slug}/quiz`);
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
  if (error || !battery) {
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
    // Main Container with Sidebar Spacing (lg:pl-[320px])
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] overflow-hidden lg:pl-[320px]">
      
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
          backgroundImage: "url('/watermarked_img_4680048593054709329.jpg')",
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

      <div className="w-full pt-24 pb-20 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto relative z-10 flex-1 flex flex-col justify-center">
        
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
          <div className="relative w-full h-64 sm:h-80 md:h-[350px] overflow-hidden bg-[#EDE5DA]">
            <img
              src={battery.coverImage || "/placeholder.png"}
              alt={battery.name?.en || battery.name?.bn}
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.png";
              }}
            />
            {/* Light Gradient Overlay for seamless blending with content */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
            
            {/* Free Badge (Sage Mist) */}
            {battery.price === 0 && (
              <div className="absolute top-6 right-6 bg-[#C8D0C0] text-[#2C3338] text-sm font-bold px-6 py-2.5 tracking-[0.2em] uppercase shadow-sm">
                Free
              </div>
            )}
          </div>

          {/* ==========================================
              CONTENT SECTION
              ========================================== */}
          <div className="p-8 sm:p-12 md:p-16 relative z-10 -mt-16 md:-mt-24">
            
            {/* Title & Version Tag */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3338] mb-6 font-serif tracking-tight leading-tight drop-shadow-sm">
              {battery.name?.en || battery.name?.bn}
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <span className="border border-[#C8D0C0]/80 bg-[#FAF7F2] text-[#596573] text-xs font-bold px-4 py-2 uppercase tracking-widest">
                Version {battery.version}
              </span>
              <span className="border border-[#D4BCA6]/60 bg-white text-[#D4BCA6] text-xs font-bold px-4 py-2 uppercase tracking-widest">
                Provisional
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#596573] font-light leading-relaxed mb-12 lato-regular">
              {battery.description?.en || battery.description?.bn}
            </p>

            {/* Instruments List / What's inside */}
            {battery.config?.instruments?.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6 border-b border-[#EAEFF0] pb-4">
                  {/* Leaf icon utilizing original Blue-Green Gradient */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="url(#leafGrad)">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-sm font-bold text-[#D4BCA6] uppercase tracking-widest">
                    What this assessment covers
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {battery.config.instruments.map((inst) => (
                    <div
                      key={inst.key}
                      className="group flex items-start gap-3 bg-[#FAF7F2]/50 border border-[#EAEFF0] px-5 py-4 hover:border-[#D4BCA6]/50 transition-colors duration-300"
                    >
                      {/* Sub-icons keep the original blue/green pop */}
                      <svg className="w-5 h-5 text-[#1A6BBA] group-hover:text-[#5DBB4D] shrink-0 mt-0.5 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
                      </svg>
                      <span className="text-[#596573] text-sm font-medium leading-relaxed group-hover:text-[#2C3338] transition-colors duration-300">
                        {inst.name_en || inst.name_bn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                PRICE & ACTION BUTTON
                ========================================== */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-[#EAEFF0] mt-auto">
              
              <div className="text-center sm:text-left w-full sm:w-auto">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#A0AAB2] mb-2">Assessment Fee</p>
                <p className="text-4xl font-serif text-[#2C3338] font-bold">
                  {battery.price > 0 ? `৳ ${battery.price}` : "Free"}
                </p>
              </div>

              <button
                onClick={handleStart}
                className="w-full sm:w-auto relative overflow-hidden bg-[#C8D0C0] text-[#2C3338] font-bold text-sm sm:text-base py-4 px-10 shadow-[0_8px_20px_rgba(200,208,192,0.3)] hover:bg-[#b5bead] hover:shadow-[0_12px_25px_rgba(200,208,192,0.5)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest"
              >
                <span className="relative z-10">
                  {battery.price > 0 ? "Purchase & Start" : "Start Assessment"}
                </span>
                {/* Premium Leaf Icon */}
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