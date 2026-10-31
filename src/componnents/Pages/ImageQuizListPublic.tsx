import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchImageQuizList } from "../api/imageQuizPublic";

interface QuizCard {
  _id: string;
  slug: string;
  name: { bn: string; en?: string };
  coverImage?: string;
  price: number;
  ageGroup?: string;
  itemCount?: number;
}

interface AgeTheme {
  key: string;
  label: string;
  labelEn: string;
  targetEn: string;
  bandBadge?: string;
  gradient: string;
  borderColor: string;
  accentColor: string;
  badgeBg: string;
  hoverGlow: string;
  cardBg: string;
  iconBg: string;
}

const AGE_THEMES: Record<string, AgeTheme> = {
  "5-8": {
    key: "5-8",
    label: "Age 5–8",
    labelEn: "Early Childhood",
    targetEn: "Kindergarten & Primary Level",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    borderColor: "border-rose-200 hover:border-rose-400",
    accentColor: "#E11D48",
    badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(225,29,72,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-rose-50 text-rose-600",
  },
  "9-12": {
    key: "9-12",
    label: "Age 9–12",
    labelEn: "Middle Childhood",
    targetEn: "Primary & Pre-Teen Cognitive Stage",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    borderColor: "border-amber-200 hover:border-amber-400",
    accentColor: "#D97706",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(217,119,6,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-amber-50 text-amber-600",
  },
  "11-12": {
    key: "11-12",
    label: "Age 11–12",
    labelEn: "Pre-Adolescence",
    targetEn: "Pre-Teens Analytical Reasoning",
    bandBadge: "Band A",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    borderColor: "border-amber-200 hover:border-amber-400",
    accentColor: "#D97706",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(217,119,6,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-amber-50 text-amber-600",
  },
  "13-14": {
    key: "13-14",
    label: "Age 13–14",
    labelEn: "Early Teens",
    targetEn: "Junior High Cognitive Reasoning",
    bandBadge: "Band B",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    accentColor: "#059669",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(5,150,105,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  "13-17": {
    key: "13-17",
    label: "Age 13–17",
    labelEn: "Adolescent Teens",
    targetEn: "Secondary School Cognitive Aptitude",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    accentColor: "#059669",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(5,150,105,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  "15-16": {
    key: "15-16",
    label: "Age 15–16",
    labelEn: "Mid Teens",
    targetEn: "Secondary Education Analytical Thinking",
    bandBadge: "Band C",
    gradient: "from-teal-500/10 via-teal-500/5 to-transparent",
    borderColor: "border-teal-200 hover:border-teal-400",
    accentColor: "#0D9488",
    badgeBg: "bg-teal-100 text-teal-800 border-teal-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(13,148,136,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-teal-50 text-teal-600",
  },
  "17-18": {
    key: "17-18",
    label: "Age 17–18",
    labelEn: "Late Teens",
    targetEn: "Higher Secondary & College Prep",
    bandBadge: "Band D",
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent",
    borderColor: "border-sky-200 hover:border-sky-400",
    accentColor: "#0284C7",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(2,132,199,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-sky-50 text-sky-600",
  },
  "18-29": {
    key: "18-29",
    label: "Age 18–29",
    labelEn: "Youth & College",
    targetEn: "University Students & Young Graduates",
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    borderColor: "border-blue-200 hover:border-blue-400",
    accentColor: "#2563EB",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(37,99,235,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-blue-50 text-blue-600",
  },
  "19-24": {
    key: "19-24",
    label: "Age 19–24",
    labelEn: "Young Adults",
    targetEn: "Adolescents & University Students",
    bandBadge: "Band E",
    gradient: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    borderColor: "border-indigo-200 hover:border-indigo-400",
    accentColor: "#4F46E5",
    badgeBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(79,70,229,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  "25+": {
    key: "25+",
    label: "Age 25+",
    labelEn: "Adults (25 & Above)",
    targetEn: "Working Professionals & Adults",
    bandBadge: "Band F",
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    borderColor: "border-purple-200 hover:border-purple-400",
    accentColor: "#7C3AED",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(124,58,237,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-purple-50 text-purple-600",
  },
  "30+": {
    key: "30+",
    label: "Age 30+",
    labelEn: "Experienced Adults",
    targetEn: "Mid-Career & Senior Adults",
    gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
    borderColor: "border-violet-200 hover:border-violet-400",
    accentColor: "#6D28D9",
    badgeBg: "bg-violet-100 text-violet-800 border-violet-200",
    hoverGlow: "hover:shadow-[0_16px_40px_rgba(109,40,217,0.15)]",
    cardBg: "bg-white",
    iconBg: "bg-violet-50 text-violet-600",
  },
};

// Smart resolver to detect correct age group from metadata or quiz title
function resolveQuizTheme(q: QuizCard, index: number): AgeTheme {
  // 1. Explicit ageGroup from database
  if (q.ageGroup && AGE_THEMES[q.ageGroup]) {
    return AGE_THEMES[q.ageGroup];
  }

  // 2. Fallback heuristic from quiz title / slug
  const title = `${q.name?.en || ""} ${q.name?.bn || ""} ${q.slug || ""}`.toLowerCase();

  if (title.includes("25") || title.includes("band f") || title.includes("adult")) {
    return AGE_THEMES["25+"];
  }
  if (title.includes("19") || title.includes("band e") || title.includes("university")) {
    return AGE_THEMES["19-24"];
  }
  if (title.includes("17") || title.includes("band d")) {
    return AGE_THEMES["17-18"];
  }
  if (title.includes("15") || title.includes("band c")) {
    return AGE_THEMES["15-16"];
  }
  if (title.includes("13") || title.includes("band b")) {
    return AGE_THEMES["13-14"];
  }
  if (title.includes("11") || title.includes("band a")) {
    return AGE_THEMES["11-12"];
  }
  if (title.includes("9-12") || title.includes("9 – 12")) {
    return AGE_THEMES["9-12"];
  }
  if (title.includes("5-8") || title.includes("5 – 8")) {
    return AGE_THEMES["5-8"];
  }

  // 3. Graceful rotation
  const keys = Object.keys(AGE_THEMES);
  return AGE_THEMES[keys[index % keys.length]];
}

export default function ImageQuizListPublic() {
  const [quizzes, setQuizzes] = useState<QuizCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchImageQuizList()
      .then(setQuizzes)
      .catch((err) => setError(err.message || "Failed to load image quiz tests."))
      .finally(() => setLoading(false));
  }, []);

  const filteredQuizzes = useMemo(() => {
    if (filter === "all") return quizzes;
    return quizzes.filter((q, idx) => {
      const theme = resolveQuizTheme(q, idx);
      if (filter === "child") return ["5-8", "9-12", "11-12"].includes(theme.key);
      if (filter === "teen") return ["13-14", "13-17", "15-16", "17-18"].includes(theme.key);
      if (filter === "youth") return ["18-29", "19-24"].includes(theme.key);
      if (filter === "adult") return ["25+", "30+"].includes(theme.key);
      return true;
    });
  }, [quizzes, filter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center lg:pl-80 pt-28">
        <div className="w-14 h-14 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-base font-bold text-slate-800 font-sans tracking-wide">
          Loading Aptitude Assessments...
        </h2>
        <p className="text-xs text-slate-500 mt-1">Calibrating Visual Matrix Instruments</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center lg:pl-80 pt-28">
        <div className="bg-white border border-rose-200 p-8 rounded-2xl max-w-md shadow-sm">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
            !
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Unable to Load Tests</h3>
          <p className="text-xs text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-[#0F172A] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans antialiased pb-28 pt-10 sm:pt-14 lg:pt-16">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 left-0 w-[450px] h-[450px] bg-emerald-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-8 pt-2">
          <Link
            to="/tests"
            className="inline-flex items-center gap-1.5 font-semibold hover:text-slate-900 transition-colors"
          >
            <span>←</span>
            <span>All Assessment Directory</span>
          </Link>
          <span className="font-mono text-[11px] bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-600 shadow-2xs">
            Visual Cognitive Matrix Assessment
          </span>
        </div>

        {/* Hero Section with Generous Top Spacing */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4 leading-tight">
            Choose Your Age Group
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
            Select your age-appropriate assessment band to begin the standardized visual pattern recognition and logical reasoning evaluation.
          </p>

          {/* Value Propositions Pill Bar in English */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 text-xs text-slate-700 font-medium">
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="text-blue-600 font-bold">✓</span> Standardized Visual Matrices
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="text-emerald-600 font-bold">✓</span> Instant Psychometric Analytics
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="text-purple-600 font-bold">✓</span> Culture-Fair & Non-Verbal
            </span>
          </div>

          {/* Category Filter Pills in English */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All Bands" },
              { id: "child", label: "Children (Age 5–12)" },
              { id: "teen", label: "Teens (Age 13–18)" },
              { id: "youth", label: "University & Youth (Age 19–24)" },
              { id: "adult", label: "Adults (Age 25+)" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  filter === f.id
                    ? "bg-[#0F172A] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length === 0 ? (
          <div className="bg-white border border-slate-200 p-12 rounded-2xl text-center max-w-lg mx-auto shadow-sm">
            <div className="text-4xl mb-3">🧩</div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              No Active Tests Found in this Category
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Explore other age categories or check back soon for upcoming assessment releases.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              View All Tests
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredQuizzes.map((q, idx) => {
                const theme = resolveQuizTheme(q, idx);

                return (
                  <motion.div
                    key={q._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                  >
                    <Link
                      to={`/image-quiz/${q.slug}`}
                      className={`group flex flex-col justify-between h-full bg-white border-2 ${theme.borderColor} ${theme.hoverGlow} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden shadow-sm`}
                    >
                      {/* Top Gradient Background Accent */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${theme.gradient} pointer-events-none`}
                      />

                      {/* Header Row: Age Badge & Band */}
                      <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
                        <div className="flex flex-col">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${theme.badgeBg} mb-1.5 w-fit shadow-2xs`}
                          >
                            {theme.labelEn}
                          </span>
                          <span
                            className="text-2xl font-black tracking-tight"
                            style={{ color: theme.accentColor }}
                          >
                            {theme.label}
                          </span>
                        </div>

                        {/* Band or Category Badge */}
                        <div className="text-right">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {theme.bandBadge || "Standard"}
                          </span>
                        </div>
                      </div>

                      {/* Title & Target Details */}
                      <div className="relative z-10 flex-1 mb-6">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          {theme.targetEn}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug mb-2">
                          {q.name?.en || q.name?.bn}
                        </h3>
                        {q.name?.en && q.name?.bn && (
                          <p className="text-xs text-slate-500 font-sans line-clamp-1 italic">
                            {q.name.bn}
                          </p>
                        )}
                      </div>

                      {/* Bottom Action Section */}
                      <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                            Assessment Fee
                          </span>
                          <span className="text-lg font-black text-slate-900 font-sans">
                            {q.price > 0 ? `৳ ${q.price}` : "Free"}
                          </span>
                        </div>

                        {/* CTA Arrow Button */}
                        <span
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs group-hover:shadow-md transition-all duration-300"
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          <span>Start Test</span>
                          <svg
                            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Trust & Methodology Footer Card in English */}
        <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              <span className="text-base">💡</span>
              <span>Why Choosing the Correct Age Band Matters</span>
            </h4>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Each test band is calibrated according to developmental neurocognitive norms and visual reasoning speed. Selecting your exact age band ensures valid, reliable, and standardized psychometric insights.
            </p>
          </div>
          <Link
            to="/tests"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold whitespace-nowrap transition-colors"
          >
            Explore All Assessments
          </Link>
        </div>
      </div>
    </div>
  );
}