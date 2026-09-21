import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchImageQuizList } from "../api/imageQuizPublic";

interface QuizCard {
  _id: string;
  slug: string;
  name: { bn: string; en?: string };
  coverImage?: string;
  price: number;
}

export default function ImageQuizListPublic() {
  const [quizzes, setQuizzes] = useState<QuizCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImageQuizList()
      .then(setQuizzes)
      .catch((err) => setError(err.message || "তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-16 text-center text-slate-500">লোড হচ্ছে...</div>;
  if (error) return <div className="p-16 text-center text-slate-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Image-Based Quiz</h1>
      <p className="text-sm text-slate-500 mb-6">
        ছবি দেখে উত্তর দিন — Aptitude, Reasoning ও Spatial Visualisation টাইপ প্রশ্ন।
      </p>

      {quizzes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400">
          এখনো কোনো quiz পাবলিশ করা হয়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quizzes.map((q) => (
            <Link
              to={`/image-quiz/${q.slug}`}
              key={q._id}
              className="block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={q.coverImage || "/placeholder.png"}
                alt={q.name?.bn}
                className="w-full h-40 object-cover bg-emerald-50"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold text-slate-800 mb-1">{q.name?.bn}</h3>
                <span className="text-sm font-bold text-emerald-700">
                  {q.price > 0 ? `৳ ${q.price}` : "ফ্রি"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
