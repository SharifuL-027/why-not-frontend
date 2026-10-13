import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createImageQuiz } from "../api/imageQuizAdmin";

export default function ImageQuizCreate() {
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [nameBn, setNameBn] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descBn, setDescBn] = useState("");
  const [price, setPrice] = useState("0");
  const [coverImage, setCoverImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!slug.trim() || !nameBn.trim()) {
      setError("Slug and Primary Name are required.");
      return;
    }

    setSaving(true);
    try {
      const quiz = await createImageQuiz({
        slug: slug.trim(),
        name: { bn: nameBn.trim(), en: nameEn.trim() || undefined },
        description: { bn: descBn.trim() },
        coverImage: coverImage.trim(),
        price: Number(price) || 0,
      });
      navigate(`/dashboard/admin/why-not-you/image-quiz/${quiz.slug}/items`);
    } catch (err: any) {
      setError(err.message || "Failed to create the quiz.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-2xl px-4 sm:px-0 mx-auto font-sans pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#222222] tracking-wide mb-8">
        Create New Image Quiz
      </h1>

      <form onSubmit={handleSubmit} className="bg-white border border-[#EFECE5] shadow-sm rounded-sm p-6 sm:p-8 space-y-6">
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 text-red-700 border border-red-500/30 rounded-sm px-5 py-3 text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
            Slug (Used in URL)
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            placeholder="gat-bd-band-a"
            className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
            Name (Primary)
          </label>
          <input
            value={nameBn}
            onChange={(e) => setNameBn(e.target.value)}
            placeholder="GAT-BD Band A — Aptitude Quiz"
            className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
            Name (English, Optional)
          </label>
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
            Description
          </label>
          <textarea
            value={descBn}
            onChange={(e) => setDescBn(e.target.value)}
            rows={4}
            className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
              Price (৳)
            </label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">
              Cover Image URL
            </label>
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] px-4 py-3 outline-none focus:border-[#A38771] transition-colors rounded-sm"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-800 rounded-sm p-4 text-xs sm:text-sm leading-relaxed flex items-start gap-3 mt-4">
          <span className="text-amber-600 mt-0.5">ℹ️</span>
          <p>
            Submitting this form will generate an empty Image Quiz in draft mode. You will be redirected to the next page to upload images and add questions. Please refrain from publishing until all questions are added.
          </p>
        </div>

        <div className="pt-4 border-t border-[#EFECE5]">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto bg-[#222222] hover:bg-[#A38771] disabled:bg-[#EFECE5] disabled:text-[#4A4A4A] disabled:cursor-not-allowed text-[#F9F6F0] font-bold text-xs uppercase tracking-widest px-10 py-4 transition-colors duration-300 rounded-sm shadow-sm"
          >
            {saving ? "Creating..." : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}