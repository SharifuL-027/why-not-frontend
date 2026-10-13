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
      .catch((err) => setError(err.message || "Failed to load."))
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
    if (!confirm(`Are you sure you want to delete question "${itemId}"?`)) return;
    try {
      await deleteImageQuizItem(slug, itemId);
      load();
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    setFormError("");

    if (!editingId && !file) {
      setFormError("Question image is required.");
      return;
    }
    if (!availableLetters.includes(correctOptionId)) {
      setFormError("Correct answer must be within the available options.");
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
      setFormError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-[#4A4A4A] font-medium tracking-wide">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 font-medium">{error}</div>;
  if (!quiz) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0 font-sans pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            to="/dashboard/admin/why-not-you/image-quiz"
            className="text-xs text-[#A38771] uppercase tracking-widest font-bold hover:text-[#222222] transition-colors"
          >
            ← All Image Quizzes
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#222222] tracking-wide mt-3">
            {quiz.name?.en || quiz.name?.bn} — Manage Questions
          </h1>
          <p className="text-xs text-[#4A4A4A] mt-2 uppercase tracking-widest font-medium">
            Total {items.length} questions added <span className="mx-2 text-[#EFECE5]">|</span> Status: {quiz.status}
          </p>
        </div>
      </div>

      {/* ---------- Add / Edit form ---------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#EFECE5] shadow-sm rounded-sm p-6 sm:p-8 mb-10 space-y-6"
      >
        <h2 className="text-sm font-bold text-[#A38771] uppercase tracking-widest border-b border-[#EFECE5] pb-4">
          {editingId
            ? `Editing Question: ${editingId}`
            : "Add New Question"}
        </h2>

        {formError && (
          <div className="bg-red-500/10 text-red-700 border border-red-500/30 rounded-sm px-5 py-3 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
            Question Image {editingId && <span className="text-gray-400 normal-case tracking-normal ml-1">(Leave empty to keep current)</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="w-full text-sm text-[#4A4A4A] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-[#EFECE5] file:text-[#222222] hover:file:bg-[#A38771] hover:file:text-white transition-colors cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-4 max-h-64 object-contain rounded-sm border border-[#EFECE5] bg-[#F9F6F0] p-2"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
              Number of Options
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
              className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
            >
              {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} Options (A–{LETTERS[n - 1]})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
              Correct Answer
            </label>
            <select
              value={correctOptionId}
              onChange={(e) => setCorrectOptionId(e.target.value)}
              className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
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
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
            Explanation / Note <span className="text-gray-400 normal-case tracking-normal ml-1">(Optional — shown in results)</span>
          </label>
          <textarea
            value={noteBn}
            onChange={(e) => setNoteBn(e.target.value)}
            rows={3}
            className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm resize-none"
          />
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-[#EFECE5]">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#222222] hover:bg-[#A38771] disabled:bg-[#EFECE5] disabled:text-[#4A4A4A] disabled:cursor-not-allowed text-[#F9F6F0] font-bold text-xs uppercase tracking-widest px-8 py-3.5 transition-colors duration-300 rounded-sm shadow-sm"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Question"
                : "Add Question"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-[#4A4A4A] hover:text-[#222222] text-xs font-bold uppercase tracking-widest transition-colors px-4 py-3.5"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ---------- Item list ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((it) => (
          <div
            key={it.id}
            className="bg-white border border-[#EFECE5] rounded-sm overflow-hidden shadow-sm flex flex-col group hover:border-[#A38771] transition-colors duration-300"
          >
            <div className="relative w-full h-48 bg-[#F9F6F0] border-b border-[#EFECE5] p-4 flex items-center justify-center">
              <img
                src={it.imageUrl}
                alt={it.id}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono bg-[#EFECE5] px-2 py-1 rounded-sm text-[#222222] text-xs font-bold">
                  ID: {it.id}
                </span>
                <span className="text-[10px] text-[#4A4A4A] uppercase tracking-widest font-bold">
                  {it.optionsCount} Options <span className="mx-1">|</span> Correct:{" "}
                  <b className="text-[#A38771] text-sm">{it.correctOptionId}</b>
                </span>
              </div>
              
              {it.note_bn && (
                <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed line-clamp-3">
                  {it.note_bn}
                </p>
              )}
              
              <div className="flex gap-6 mt-auto pt-4 border-t border-[#EFECE5]">
                <button
                  onClick={() => startEdit(it)}
                  className="text-[#A38771] hover:text-[#222222] text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(it.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="col-span-1 sm:col-span-2 text-center text-[#4A4A4A] text-sm py-12 border border-dashed border-[#EFECE5] rounded-sm bg-white">
            No questions have been added yet.
          </div>
        )}
      </div>
    </div>
  );
}