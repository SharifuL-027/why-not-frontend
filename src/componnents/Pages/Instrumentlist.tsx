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

  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930]">
        <div className="w-12 h-12 border-4 border-[#3c5685] border-t-[#ffba12] rounded-full animate-spin relative z-10"></div>
        <p className="mt-4 text-white/70 font-medium tracking-wide relative z-10">অ্যাসেসমেন্ট লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0A1930]">
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3 relative z-10">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#0A1930] overflow-hidden">
      
      {/* Background Image Setup */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A1930]/90 via-[#0A1930]/80 to-[#0A1930]" />

      {/* Main Content Area - (Padding komano hoyeche: pt-28 lg:pt-12) */}
      <div className="relative z-10 flex-1 pt-28 lg:pt-16 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="mb-10 text-center lg:text-left border-b border-[#3c5685]/40 pb-6 backdrop-blur-sm">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-serif tracking-tight">
              সব অ্যাসেসমেন্ট
            </h1>
            <p className="text-white/70 text-base lg:text-lg lato-regular">
              আপনার ব্যক্তিত্ব এবং প্রফেশনাল স্কিল যাচাই করার জন্য উপযুক্ত টেস্ট বেছে নিন
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {instruments.map((inst) => (
              <Link
                to={`/tests/${inst.instrumentSlug}`}
                key={inst._id}
                className="group flex flex-col bg-[#132644]/90 backdrop-blur-md rounded-2xl border border-[#3c5685]/50 overflow-hidden hover:border-[#ffba12]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-[#0A1930]">
                  <img
                    src={inst.coverImage || "/placeholder.png"}
                    alt={inst.instrumentName.bn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132644] via-transparent to-transparent opacity-95" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between relative z-10 -mt-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 line-clamp-2 leading-snug drop-shadow-md">
                    {inst.instrumentName.bn}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#3c5685]/40">
                    <span 
                      className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm ${
                        inst.price > 0 
                          ? 'bg-[#ffba12]/10 text-[#ffba12] border border-[#ffba12]/30' 
                          : 'bg-[#5DBB4D]/10 text-[#5DBB4D] border border-[#5DBB4D]/30'
                      }`}
                    >
                      {inst.price > 0 ? `৳ ${inst.price}` : "ফ্রি"}
                    </span>
                    
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-[#ffba12] group-hover:text-[#0A1930] transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}