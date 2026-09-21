import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  addImageQuizItem,
  deleteImageQuizItem,
  fetchImageQuizAdmin,
  updateImageQuizItem,
} from "../api/imageQuizAdmin";


const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

interface ImageQuizItemRow {
  id: string;
  imageUrl: string;
  optionsCount: number;
  correctOptionId: string;
  note_bn?: string;
}

export default function ImageQuizItemManager() {
  const { slug } = useParams<{ slug: string }>();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [optionsCount, setOptionsCount] = useState(4);
  const [correctOptionId, setCorrectOptionId] = useState("A");
  const [noteBn, setNoteBn] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const load = () => {
    if (!slug) return;
    setLoading(true);
    fetchImageQuizAdmin(slug)
      .then(setQuiz)
      .catch((err) => setError(err.message || "লোড করা যায়নি।"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const items: ImageQuizItemRow[] = quiz?.items || [];
  const availableLetters = useMemo(
    () => LETTERS.slice(0, optionsCount),
    [optionsCount],
  );

  const resetForm = () => {
    setFile(null);
    setPreview("");
    setOptionsCount(4);
    setCorrectOptionId("A");
    setNoteBn("");
    setEditingId(null);
    setFormError("");
  };

  const handleFileChange = (f: File | null) => {
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const startEdit = (it: ImageQuizItemRow) => {
    setEditingId(it.id);
    setOptionsCount(it.optionsCount);
    setCorrectOptionId(it.correctOptionId);
    setNoteBn(it.note_bn || "");
    setFile(null);
    setPreview(it.imageUrl);
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (itemId: string) => {
    if (!slug) return;
    if (!confirm(`প্রশ্ন "${itemId}" ডিলিট করবেন?`)) return;
    try {
      await deleteImageQuizItem(slug, itemId);
      load();
    } catch (err: any) {
      alert(err.message || "ডিলিট করা যায়নি।");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    setFormError("");

    if (!editingId && !file) {
      setFormError("প্রশ্নের ছবি আবশ্যক।");
      return;
    }
    if (!availableLetters.includes(correctOptionId)) {
      setFormError("সঠিক উত্তর, অপশন সংখ্যার মধ্যেই বেছে নিতে হবে।");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateImageQuizItem(
          slug,
          editingId,
          { optionsCount, correctOptionId, note_bn: noteBn || undefined },
          file,
        );
      } else {
        await addImageQuizItem(
          slug,
          file as File,
          optionsCount,
          correctOptionId,
          noteBn || undefined,
        );
      }
      resetForm();
      load();
    } catch (err: any) {
      setFormError(err.message || "সেভ করা যায়নি।");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">লোড হচ্ছে...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!quiz) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            to="/dashboard/admin/why-not-you/image-quiz"
            className="text-xs text-blue-600"
          >
            ← সব Image Quiz
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-1">
            {quiz.name?.bn} — প্রশ্ন পরিচালনা
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            মোট {items.length}টা প্রশ্ন যোগ হয়েছে · স্ট্যাটাস: {quiz.status}
          </p>
        </div>
      </div>

      {/* ---------- Add / Edit form ---------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 space-y-4"
      >
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
          {editingId
            ? `প্রশ্ন এডিট করছেন: ${editingId}`
            : "নতুন প্রশ্ন যোগ করুন"}
        </h2>

        {formError && (
          <div className="bg-red-50 text-red-700 border border-red-100 rounded-lg px-4 py-2 text-sm">
            {formError}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            প্রশ্নের ছবি {editingId && "(না বদলাতে চাইলে খালি রাখুন)"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 max-h-64 rounded-lg border border-slate-200"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              কয়টা অপশন থাকবে
            </label>
            <select
              value={optionsCount}
              onChange={(e) => {
                const n = Number(e.target.value);
                setOptionsCount(n);
                if (!LETTERS.slice(0, n).includes(correctOptionId)) {
                  setCorrectOptionId(LETTERS[0]);
                }
              }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n}টা (A–{LETTERS[n - 1]})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              সঠিক উত্তর
            </label>
            <select
              value={correctOptionId}
              onChange={(e) => setCorrectOptionId(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            >
              {availableLetters.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            ব্যাখ্যা / নোট (ঐচ্ছিক — রেজাল্টে দেখানো হবে)
          </label>
          <textarea
            value={noteBn}
            onChange={(e) => setNoteBn(e.target.value)}
            rows={2}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-lg text-sm"
          >
            {saving
              ? "সেভ হচ্ছে..."
              : editingId
                ? "আপডেট করুন"
                : "প্রশ্ন যোগ করুন"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-slate-500 text-sm font-semibold"
            >
              বাতিল
            </button>
          )}
        </div>
      </form>

      {/* ---------- Item list ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it) => (
          <div
            key={it.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <img
              src={it.imageUrl}
              alt={it.id}
              className="w-full h-48 object-contain bg-slate-50"
            />
            <div className="p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                  {it.id}
                </span>
                <span>
                  {it.optionsCount} অপশন · সঠিক:{" "}
                  <b className="text-emerald-700">{it.correctOptionId}</b>
                </span>
              </div>
              {it.note_bn && (
                <p className="text-xs text-slate-500 mb-2">{it.note_bn}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(it)}
                  className="text-blue-600 text-xs font-semibold"
                >
                  এডিট
                </button>
                <button
                  onClick={() => handleDelete(it.id)}
                  className="text-red-600 text-xs font-semibold"
                >
                  ডিলিট
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-2 text-center text-slate-400 text-sm py-8">
            এখনো কোনো প্রশ্ন যোগ করা হয়নি।
          </div>
        )}
      </div>
    </div>
  );
}
