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

  // Professional Loading State
  if (loading) {
    return (
      <div className="w-full min-h-screen pt-32 flex flex-col items-center justify-center bg-[#0A1930]">
        <div className="w-12 h-12 border-4 border-[#3c5685] border-t-[#ffba12] rounded-full animate-spin"></div>
        <p className="mt-4 text-white/70 font-medium tracking-wide">অ্যাসেসমেন্ট লোড হচ্ছে...</p>
      </div>
    );
  }

  // Professional Error State
  if (error) {
    return (
      <div className="w-full min-h-screen pt-32 flex flex-col items-center justify-center bg-[#0A1930]">
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    // pt-32 বা pt-36 দেওয়া হয়েছে যাতে Navbar এর নিচে কন্টেন্ট না ঢুকে যায়
    <div className="w-full min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-24 bg-[#0A1930]">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left border-b border-[#3c5685]/30 pb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-serif tracking-tight">
            সব অ্যাসেসমেন্ট
          </h1>
          <p className="text-white/60 text-base lg:text-lg lato-regular">
            আপনার ব্যক্তিত্ব এবং প্রফেশনাল স্কিল যাচাই করার জন্য উপযুক্ত টেস্ট বেছে নিন
          </p>
        </div>

        {/* Assessment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {instruments.map((inst) => (
            <Link
              to={`/tests/${inst.instrumentSlug}`}
              key={inst._id}
              className="group flex flex-col bg-[#132644] rounded-2xl border border-[#3c5685]/30 overflow-hidden hover:border-[#ffba12]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-[#0A1930]">
                <img
                  src={inst.coverImage || "/placeholder.png"}
                  alt={inst.instrumentName.bn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                {/* Dark Gradient overlay to blend image with card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#132644] via-transparent to-transparent opacity-90" />
              </div>
              
              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col justify-between relative z-10 -mt-6">
                
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 line-clamp-2 leading-snug">
                  {inst.instrumentName.bn}
                </h3>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#3c5685]/30">
                  
                  {/* Price Tag */}
                  <span 
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide ${
                      inst.price > 0 
                        ? 'bg-[#ffba12]/10 text-[#ffba12] border border-[#ffba12]/20' 
                        : 'bg-[#5DBB4D]/10 text-[#5DBB4D] border border-[#5DBB4D]/20'
                    }`}
                  >
                    {inst.price > 0 ? `৳ ${inst.price}` : "ফ্রি"}
                  </span>
                  
                  {/* Action Icon */}
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
  );
}