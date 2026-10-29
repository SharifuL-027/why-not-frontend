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
  ageGroup?: string;
}


const AGE_GROUP_CONFIGS = [
  {
    label: "৫–৮ বছর",
    labelEn: "Age 5–8",
    gradient: "from-[#FFF0F0] to-[#FFD6D6]",
    borderColor: "border-[#FFB3B3]",
    accentColor: "#E05C5C",
    hoverGlow: "hover:shadow-[0_12px_40px_rgba(224,92,92,0.18)]",
    badgeBg: "bg-[#FFD6D6] text-[#C0392B]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="14" r="7" fill="#E05C5C" opacity="0.85" />
        <ellipse cx="20" cy="30" rx="11" ry="7" fill="#E05C5C" opacity="0.6" />
        <circle cx="13" cy="22" r="3" fill="#FFB3B3" />
        <circle cx="27" cy="22" r="3" fill="#FFB3B3" />
      </svg>
    ),
  },
  {
    label: "৯–১২ বছর",
    labelEn: "Age 9–12",
    gradient: "from-[#FFF6E6] to-[#FFE0A8]",
    borderColor: "border-[#FFCC6B]",
    accentColor: "#D48A00",
    hoverGlow: "hover:shadow-[0_12px_40px_rgba(212,138,0,0.18)]",
    badgeBg: "bg-[#FFE0A8] text-[#9A6000]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <polygon points="20,4 35,34 5,34" fill="#D48A00" opacity="0.85" />
        <circle cx="20" cy="22" r="5" fill="#FFE0A8" />
      </svg>
    ),
  },
  {
    label: "১৩–১৭ বছর",
    labelEn: "Age 13–17",
    gradient: "from-[#EDFFF3] to-[#C3F0D2]",
    borderColor: "border-[#7DD9A0]",
    accentColor: "#27AE60",
    hoverGlow: "hover:shadow-[0_12px_40px_rgba(39,174,96,0.18)]",
    badgeBg: "bg-[#C3F0D2] text-[#1A7840]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="8" y="8" width="24" height="24" rx="6" fill="#27AE60" opacity="0.85" />
        <path d="M14 20 L18 24 L26 16" stroke="#EDFFF3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "১৮–২৯ বছর",
    labelEn: "Age 18–29",
    gradient: "from-[#EEF4FF] to-[#C5D8FF]",
    borderColor: "border-[#7AAEFF]",
    accentColor: "#2563EB",
    hoverGlow: "hover:shadow-[0_12px_40px_rgba(37,99,235,0.18)]",
    badgeBg: "bg-[#C5D8FF] text-[#1A3E9A]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="14" fill="#2563EB" opacity="0.85" />
        <path d="M20 12 L20 20 L27 20" stroke="#EEF4FF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "৩০+ বছর",
    labelEn: "Age 30+",
    gradient: "from-[#F5F0FF] to-[#DDD0FF]",
    borderColor: "border-[#B39DFF]",
    accentColor: "#7C3AED",
    hoverGlow: "hover:shadow-[0_12px_40px_rgba(124,58,237,0.18)]",
    badgeBg: "bg-[#DDD0FF] text-[#4C1D95]",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M20 6 L36 16 L36 24 L20 34 L4 24 L4 16 Z" fill="#7C3AED" opacity="0.85" />
        <circle cx="20" cy="20" r="5" fill="#F5F0FF" />
      </svg>
    ),
  },
];

// ageGroup value → config index
const AGE_GROUP_INDEX: Record<string, number> = {
  "5-8": 0,
  "9-12": 1,
  "13-17": 2,
  "18-29": 3,
  "30+": 4,
};

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
  // Loading Spinner
  // ==========================================
  if (loading) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px]">
        <div className="w-16 h-16 relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
          <svg className="w-10 h-10 text-[#5DBB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M20 4C20 4 14 3 9 8C4 13 4 20 4 20C4 20 11 20 16 15C21 10 20 4 20 4ZM4 20L10 14" />
          </svg>
        </div>
        <p className="mt-6 text-black font-bold tracking-[0.2em] uppercase text-sm">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px]">
        <div className="bg-white border border-[#EAEFF0] px-8 py-6 flex flex-col items-center gap-4 shadow-sm rounded-sm">
          <span className="text-black font-serif text-lg tracking-wide">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752896/WhatsApp_Image_2026-09-28_at_11.03.35_AM_ca5ep5.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/85 to-[#FAF7F2] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="w-full pt-16 pb-24 px-4 sm:px-6 md:px-8 lg:px-14 max-w-7xl mx-auto flex-1">

          {/* ========== HEADER ========== */}
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-[#EAEFF0] px-5 py-2.5 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#5DBB4D] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Intelligence Assessment</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-black font-serif tracking-tight mb-5 leading-tight">
              আপনার বয়স গ্রুপ বেছে নিন
            </h1>
            <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              নিচের কার্ড থেকে আপনার বয়সের গ্রুপটি খুঁজে বের করুন এবং বুদ্ধিমত্তা মূল্যায়ন পরীক্ষা শুরু করুন।
            </p>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-32 h-px bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
          </div>

          {/* ========== AGE GROUP CARDS ========== */}
          {quizzes.length === 0 ? (
            <div className="bg-white border border-[#EAEFF0] p-16 flex flex-col items-center justify-center text-center shadow-sm rounded-sm">
              <p className="text-gray-500 text-lg font-serif tracking-wide">এখনো কোনো পরীক্ষা প্রকাশিত হয়নি।</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {quizzes.map((q, index) => {
                // ageGroup থেকে config বের করো, না থাকলে index দিয়ে fallback
                const configIndex =
                  q.ageGroup !== undefined
                    ? (AGE_GROUP_INDEX[q.ageGroup] ?? index % AGE_GROUP_CONFIGS.length)
                    : index % AGE_GROUP_CONFIGS.length;
                const config = AGE_GROUP_CONFIGS[configIndex];

                return (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      to={`/image-quiz/${q.slug}`}
                      className={`group flex flex-col bg-gradient-to-br ${config.gradient} border-2 ${config.borderColor} overflow-hidden ${config.hoverGlow} hover:-translate-y-2 transition-all duration-300 rounded-2xl relative shadow-sm hover:shadow-lg`}
                    >
                      {/* Top icon area */}
                      <div className="flex flex-col items-center pt-8 pb-4 px-5 text-center">
                        {/* Icon */}
                        <div className="mb-4 p-3 bg-white/70 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {config.icon}
                        </div>

                        {/* Age Group Badge */}
                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3 ${config.badgeBg}`}>
                          {config.labelEn}
                        </div>

                        {/* Bengali Label */}
                        <div
                          className="text-2xl font-bold mb-1"
                          style={{ color: config.accentColor }}
                        >
                          {config.label}
                        </div>
                      </div>

                      {/* Quiz Name */}
                      <div className="px-5 pb-4 text-center flex-1 flex flex-col justify-between">
                        <p className="text-sm text-gray-600 font-medium leading-snug line-clamp-2 mb-4">
                          {q.name?.bn || q.name?.en}
                        </p>

                        {/* Bottom bar */}
                        <div className="border-t border-white/60 pt-4 flex items-center justify-between">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${config.badgeBg}`}>
                            {q.price > 0 ? `৳ ${q.price}` : "বিনামূল্যে"}
                          </span>
                          <span
                            className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                            style={{ color: config.accentColor }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Hover shimmer effect */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-2xl pointer-events-none"></div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              সঠিক বয়স গ্রুপ না বেছে নিলে ফলাফল সঠিক নাও হতে পারে।
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}