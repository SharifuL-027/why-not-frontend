import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchImageQuizDetails } from "../api/imageQuizPublic";

interface QuizDetails {
  slug: string;
  name: { bn: string; en?: string };
  description?: { bn: string };
  coverImage?: string;
  price: number;
  itemCount: number;
}

export default function ImageQuizDetailsPublic() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetchImageQuizDetails(slug)
      .then(setQuiz)
      .catch(() => setError("এই কুইজের তথ্য পাওয়া যায়নি।"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleStart = () => {
    // এখন সরাসরি quiz-এ পাঠাচ্ছে। পরে পেমেন্ট গেটওয়ে বসালে
    // এখানে প্রথমে পেমেন্ট পেজে পাঠাবেন, সফল হলে quiz-এ রিডাইরেক্ট করবেন।
    navigate(`/image-quiz/${slug}/quiz`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col justify-center items-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">বিস্তারিত লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex justify-center items-center bg-slate-50 px-4">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-sm border border-red-100 text-center max-w-md">
          <p>{error || "তথ্য পাওয়া যায়নি"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="relative">
          <img
            src={quiz.coverImage || "/placeholder.png"}
            alt={quiz.name?.bn}
            className="w-full h-64 sm:h-72 object-cover bg-slate-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
          {quiz.price === 0 && (
            <span className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
              ফ্রি
            </span>
          )}
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {quiz.name?.bn}
          </h1>

          <span className="inline-block bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            {quiz.itemCount}টা প্রশ্ন
          </span>

          <p className="text-base text-slate-600 leading-relaxed mb-8">{quiz.description?.bn}</p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-8 border-t border-slate-100">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="text-sm font-medium text-slate-500 mb-1">মূল্য</p>
              <p className="text-3xl font-extrabold text-emerald-600">
                {quiz.price > 0 ? `৳ ${quiz.price}` : "ফ্রি"}
              </p>
            </div>

            <button
              onClick={handleStart}
              className="w-full sm:w-auto flex-1 max-w-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center flex justify-center items-center gap-2"
            >
              <span>{quiz.price > 0 ? "কিনুন ও শুরু করুন" : "শুরু করুন"}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
