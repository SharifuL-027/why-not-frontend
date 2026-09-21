import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
fetchImageQuizzesAdmin, setImageQuizStatus, setImageQuizPrice, deleteImageQuiz
 } from "../api/imageQuizAdmin";


interface QuizRow {
  _id: string;
  slug: string;
  name: { bn: string; en?: string };
  price: number;
  status: "draft" | "published";
  items: any[];
}

export default function ImageQuizList() {
  const [quizzes, setQuizzes] = useState<QuizRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});
  const [busySlug, setBusySlug] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetchImageQuizzesAdmin()
      .then(setQuizzes)
      .catch((err) => setError(err.message || "তালিকা লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleStatus = async (q: QuizRow) => {
    setBusySlug(q.slug);
    try {
      const next = q.status === "published" ? "draft" : "published";
      await setImageQuizStatus(q.slug, next);
      load();
    } catch (err: any) {
      alert(err.message || "স্ট্যাটাস পরিবর্তন করা যায়নি।");
    } finally {
      setBusySlug(null);
    }
  };

  const handleSavePrice = async (q: QuizRow) => {
    const draft = priceDrafts[q.slug];
    if (draft === undefined) return;
    const price = Number(draft);
    if (Number.isNaN(price) || price < 0) {
      alert("সঠিক দাম দিন।");
      return;
    }
    setBusySlug(q.slug);
    try {
      await setImageQuizPrice(q.slug, price);
      load();
    } catch (err: any) {
      alert(err.message || "দাম আপডেট করা যায়নি।");
    } finally {
      setBusySlug(null);
    }
  };

  const handleDelete = async (q: QuizRow) => {
    if (!confirm(`"${q.name?.bn}" ডিলিট করবেন? এটা ফেরানো যাবে না।`)) return;
    setBusySlug(q.slug);
    try {
      await deleteImageQuiz(q.slug);
      load();
    } catch (err: any) {
      alert(err.message || "ডিলিট করা যায়নি।");
    } finally {
      setBusySlug(null);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">লোড হচ্ছে...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Image Quiz</h1>
        <Link
          to="/dashboard/admin/why-not-you/image-quiz/create"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
        >
          + নতুন Image Quiz
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          এখনো কোনো image quiz তৈরি হয়নি।
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">নাম</th>
                <th className="text-left px-4 py-3">Slug</th>
                <th className="text-left px-4 py-3">প্রশ্ন</th>
                <th className="text-left px-4 py-3">দাম (৳)</th>
                <th className="text-left px-4 py-3">স্ট্যাটাস</th>
                <th className="text-right px-4 py-3">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q) => (
                <tr key={q._id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-800">{q.name?.bn}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{q.slug}</td>
                  <td className="px-4 py-3 text-slate-500">{q.items?.length || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        className="w-20 border border-slate-200 rounded px-2 py-1"
                        placeholder={String(q.price)}
                        value={priceDrafts[q.slug] ?? ""}
                        onChange={(e) =>
                          setPriceDrafts((p) => ({ ...p, [q.slug]: e.target.value }))
                        }
                      />
                      <button
                        disabled={busySlug === q.slug || priceDrafts[q.slug] === undefined}
                        onClick={() => handleSavePrice(q)}
                        className="text-emerald-700 text-xs font-semibold disabled:opacity-40"
                      >
                        সেভ
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      disabled={busySlug === q.slug}
                      onClick={() => handleToggleStatus(q)}
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        q.status === "published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {q.status === "published" ? "Published" : "Draft"} — টগল
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link
                      to={`/dashboard/admin/why-not-you/image-quiz/${q.slug}/items`}
                      className="text-blue-600 text-xs font-semibold"
                    >
                      প্রশ্ন পরিচালনা
                    </Link>
                    <button
                      disabled={busySlug === q.slug}
                      onClick={() => handleDelete(q)}
                      className="text-red-600 text-xs font-semibold"
                    >
                      ডিলিট
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
