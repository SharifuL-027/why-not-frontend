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
      setError("Slug ও বাংলা নাম দেওয়া আবশ্যক।");
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
      setError(err.message || "তৈরি করা যায়নি।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">নতুন Image Quiz</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-100 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Slug (URL-এ ব্যবহৃত হবে)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            placeholder="gat-bd-band-a"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">নাম (বাংলা)</label>
          <input
            value={nameBn}
            onChange={(e) => setNameBn(e.target.value)}
            placeholder="GAT-BD Band A — Aptitude Quiz"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">নাম (ইংরেজি, ঐচ্ছিক)</label>
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">বিবরণ</label>
          <textarea
            value={descBn}
            onChange={(e) => setDescBn(e.target.value)}
            rows={3}
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">দাম (৳)</label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Cover Image URL</label>
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 text-amber-800 rounded-lg p-3 text-xs leading-relaxed">
          ℹ️ Submit করলে draft অবস্থায় একটা খালি Image Quiz তৈরি হবে। এরপর পরের পেজে গিয়ে
          ছবি আপলোড করে প্রশ্ন যোগ করতে হবে — প্রশ্ন যোগ না হওয়া পর্যন্ত এটা Publish করবেন না।
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg"
        >
          {saving ? "তৈরি হচ্ছে..." : "তৈরি করুন"}
        </button>
      </form>
    </div>
  );
}
