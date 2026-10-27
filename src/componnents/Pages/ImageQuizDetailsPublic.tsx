import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchImageQuizDetails } from "../api/imageQuizPublic";

interface QuizDetails {
  slug: string;
  name: { bn: string; en?: string };
  description?: { bn: string; en?: string };
  coverImage?: string;
  price: number;
  itemCount: number;
}

// CandidateInfo form state
interface CandidateInfo {
  email: string;
  name: string;
  institution: string;
  language: "bn" | "en";
  paymentMethod: string;
}

export default function ImageQuizDetailsPublic() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<CandidateInfo>({
    email: "",
    name: "",
    institution: "",
    language: "bn",
    paymentMethod: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchImageQuizDetails(slug)
      .then(setQuiz)
      .catch(() => setError("Failed to load quiz details."))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleStartClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.email.trim()) {
      setFormError("ইমেইল আবশ্যক।");
      return;
    }
    if (!formData.paymentMethod) {
      setFormError("পেমেন্ট অপশন বেছে নিন।");
      return;
    }

    // Store candidateInfo in sessionStorage to pass to quiz page
    sessionStorage.setItem(
      `candidateInfo_${slug}`,
      JSON.stringify(formData)
    );

    navigate(`/image-quiz/${slug}/quiz`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ==========================================
  // Loading State
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

  if (error || !quiz) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#FAF7F2] lg:pl-[50px] px-4">
        <div className="bg-white border border-[#EAEFF0] px-8 py-8 text-center max-w-md shadow-sm rounded-sm">
          <p className="text-black font-serif text-lg tracking-wide">{error || "Details not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAF7F2] overflow-hidden lg:pl-[50px]">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A6BBA" />
            <stop offset="100%" stopColor="#5DBB4D" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1790752896/WhatsApp_Image_2026-09-28_at_11.03.37_AM_yfo1j3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/60 to-[#FAF7F2] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAEFF0]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0EBE6]/80 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="w-full pt-24 pb-20 px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto relative z-10 flex-1 flex flex-col justify-center">

        <AnimatePresence mode="wait">
          {!showForm ? (
            /* ==============================
               QUIZ DETAILS CARD
               ============================== */
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-md border border-[#EAEFF0] shadow-[0_15px_40px_rgba(0,0,0,0.05)] flex flex-col relative rounded-xl"
            >
              {/* Image Section */}
              <div className="relative w-full h-64 sm:h-80 md:h-[350px] overflow-hidden bg-[#FAF7F2] rounded-t-xl">
                <img
                  src={quiz.coverImage || "/placeholder.png"}
                  alt={quiz.name?.en || quiz.name?.bn}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />

                {quiz.price === 0 && (
                  <div className="absolute top-6 right-6 bg-[#C8D0C0] text-black text-sm font-bold px-6 py-2.5 tracking-[0.2em] uppercase shadow-sm rounded-full">
                    বিনামূল্যে
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 sm:p-12 md:p-16 relative z-10 -mt-16 md:-mt-24">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 font-serif tracking-tight leading-tight drop-shadow-sm">
                  {quiz.name?.bn || quiz.name?.en}
                </h1>

                <div className="flex items-center gap-3 mb-8 flex-wrap">
                  <span className="bg-[#FAF7F2] border border-[#C8D0C0]/50 text-gray-500 text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-full">
                    {quiz.itemCount} টি প্রশ্ন
                  </span>
                  <span className="bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-full">
                    Intelligence Assessment
                  </span>
                </div>

                {(quiz.description?.bn || quiz.description?.en) && (
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-12 lato-regular">
                    {quiz.description?.bn || quiz.description?.en}
                  </p>
                )}

                {/* Price & Action */}
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-[#EAEFF0] mt-auto">
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-gray-400 mb-2">পরীক্ষার ফি</p>
                    <p className="text-4xl font-serif text-black font-bold">
                      {quiz.price > 0 ? `৳ ${quiz.price}` : "বিনামূল্যে"}
                    </p>
                  </div>

                  <button
                    onClick={handleStartClick}
                    className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-[#2563EB] to-[#5DBB4D] text-white font-bold text-lg py-4 px-12 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)] transition-all duration-300 flex justify-center items-center gap-3 group uppercase tracking-widest rounded-full"
                  >
                    <span className="relative z-10">পরীক্ষা শুরু করুন</span>
                    <svg
                      className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ==============================
               CANDIDATE INFO FORM
               ============================== */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/95 backdrop-blur-md border border-[#EAEFF0] shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#2563EB] to-[#5DBB4D] px-8 py-8 text-white text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-4">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold font-serif mb-1">পরীক্ষার্থীর তথ্য</h2>
                <p className="text-white/80 text-sm">পরীক্ষা শুরু করার আগে নিচের তথ্যটি পূরণ করুন</p>
                <div className="mt-3 text-white/70 text-xs font-semibold uppercase tracking-widest">
                  {quiz.name?.bn || quiz.name?.en}
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleFormSubmit} className="p-8 sm:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Email (Required) */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      ইমেইল <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="আপনার ইমেইল লিখুন"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#EAEFF0] rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-gray-800 bg-[#FAFAFA]"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">নাম</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#EAEFF0] rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-gray-800 bg-[#FAFAFA]"
                      />
                    </div>
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">শিক্ষা প্রতিষ্ঠানের নাম</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        placeholder="প্রতিষ্ঠানের নাম লিখুন"
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#EAEFF0] rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-gray-800 bg-[#FAFAFA]"
                      />
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      ভাষা নির্বাচন <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#EAEFF0] rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-gray-800 bg-[#FAFAFA] appearance-none cursor-pointer"
                      >
                        <option value="bn">বাংলা</option>
                        <option value="en">English</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      পেমেন্ট অপশন <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#EAEFF0] rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors text-gray-800 bg-[#FAFAFA] appearance-none cursor-pointer"
                      >
                        <option value="">পেমেন্ট পদ্ধতি বেছে নিন</option>
                        <option value="bkash">bKash</option>
                        <option value="nagad">Nagad</option>
                        <option value="rocket">Rocket</option>
                        <option value="card">ক্রেডিট/ডেবিট কার্ড</option>
                        {quiz.price === 0 && <option value="free">বিনামূল্যে</option>}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Error message */}
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium"
                  >
                    {formError}
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[#EAEFF0]">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-4 border-2 border-[#EAEFF0] text-gray-600 font-bold uppercase tracking-widest rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                  >
                    ← পিছনে যান
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#2563EB] to-[#5DBB4D] text-white font-bold uppercase tracking-widest py-4 rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)] transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <span>পরীক্ষা শুরু করুন</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Privacy note */}
                <p className="text-center text-xs text-gray-400 mt-4">
                  আপনার তথ্য সম্পূর্ণ নিরাপদ এবং কারো সাথে শেয়ার করা হবে না।
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}