import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  fetchImageQuizzesAdmin, 
  setImageQuizStatus, 
  setImageQuizPrice, 
  deleteImageQuiz 
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
      .catch((err) => setError(err.message || "Failed to load the list."))
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
      alert(err.message || "Failed to change status.");
    } finally {
      setBusySlug(null);
    }
  };

  const handleSavePrice = async (q: QuizRow) => {
    const draft = priceDrafts[q.slug];
    if (draft === undefined) return;
    const price = Number(draft);
    if (Number.isNaN(price) || price < 0) {
      alert("Please enter a valid price.");
      return;
    }
    setBusySlug(q.slug);
    try {
      await setImageQuizPrice(q.slug, price);
      load();
    } catch (err: any) {
      alert(err.message || "Failed to update price.");
    } finally {
      setBusySlug(null);
    }
  };

  const handleDelete = async (q: QuizRow) => {
    if (!confirm(`Are you sure you want to delete "${q.name?.en || q.name?.bn}"? This action cannot be undone.`)) return;
    setBusySlug(q.slug);
    try {
      await deleteImageQuiz(q.slug);
      load();
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusySlug(null);
    }
  };

  if (loading) return <div className="p-8 text-[#4A4A4A] font-medium tracking-wide">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 font-medium">{error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-0 font-sans pb-16">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#222222] tracking-wide">
          Image Quizzes
        </h1>
        <Link
          to="/dashboard/admin/why-not-you/image-quiz/create"
          className="bg-[#222222] hover:bg-[#A38771] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-colors duration-300 rounded-sm shadow-sm whitespace-nowrap text-center"
        >
          + New Image Quiz
        </Link>
      </div>

      {/* Content Section */}
      {quizzes.length === 0 ? (
        <div className="bg-white border border-[#EFECE5] rounded-sm p-12 text-center text-[#4A4A4A] text-sm shadow-sm">
          No image quizzes have been created yet.
        </div>
      ) : (
        <div className="bg-white border border-[#EFECE5] rounded-sm shadow-sm overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#F9F6F0] text-[#4A4A4A] text-xs uppercase tracking-widest border-b border-[#EFECE5]">
              <tr>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Slug</th>
                <th className="px-6 py-4 font-bold">Questions</th>
                <th className="px-6 py-4 font-bold">Price (৳)</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE5]">
              {quizzes.map((q) => (
                <tr key={q._id} className="hover:bg-[#F9F6F0]/50 transition-colors">
                  
                  {/* Name */}
                  <td className="px-6 py-4 font-bold text-[#222222]">
                    {q.name?.en || q.name?.bn}
                  </td>
                  
                  {/* Slug */}
                  <td className="px-6 py-4 text-[#4A4A4A] font-mono text-xs">
                    {q.slug}
                  </td>
                  
                  {/* Questions Count */}
                  <td className="px-6 py-4 text-[#4A4A4A] font-bold">
                    {q.items?.length || 0}
                  </td>
                  
                  {/* Price Update */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={0}
                        className="w-20 bg-[#F9F6F0] border border-[#EFECE5] rounded-sm px-3 py-1.5 outline-none focus:border-[#A38771] text-[#222222] transition-colors"
                        placeholder={String(q.price)}
                        value={priceDrafts[q.slug] ?? ""}
                        onChange={(e) =>
                          setPriceDrafts((p) => ({ ...p, [q.slug]: e.target.value }))
                        }
                      />
                      <button
                        disabled={busySlug === q.slug || priceDrafts[q.slug] === undefined}
                        onClick={() => handleSavePrice(q)}
                        className="text-[#A38771] hover:text-[#222222] text-xs font-bold uppercase tracking-widest disabled:opacity-40 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </td>
                  
                  {/* Status Toggle */}
                  <td className="px-6 py-4">
                    <button
                      disabled={busySlug === q.slug}
                      onClick={() => handleToggleStatus(q)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest transition-colors shadow-sm ${
                        q.status === "published"
                          ? "bg-[#222222] text-[#F9F6F0] hover:bg-[#4A4A4A]"
                          : "bg-amber-500/10 text-amber-800 border border-amber-500/30 hover:bg-amber-500/20"
                      }`}
                    >
                      {q.status === "published" ? "Published" : "Draft"}
                    </button>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4 text-right space-x-5">
                    <Link
                      to={`/dashboard/admin/why-not-you/image-quiz/${q.slug}/items`}
                      className="text-[#A38771] hover:text-[#222222] text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Manage
                    </Link>
                    <button
                      disabled={busySlug === q.slug}
                      onClick={() => handleDelete(q)}
                      className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      Delete
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