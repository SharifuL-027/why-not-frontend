import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { createAmBattery } from "../../api/amBatteryAdmin";
import { AM_BANDS, AM_CONVERGENCE_CHECK, AM_DOMAINS, AM_FIT_STATEMENT_RULE, AM_INSTRUMENTS, AM_NARRATIVE_TEMPLATES } from "./Aminstrumentmeta";

export default function AmBatteryCreate() {
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
      const payload = {
        slug: slug.trim(),
        name: { bn: nameBn.trim(), en: nameEn.trim() || undefined },
        description: { bn: descBn.trim() },
        coverImage: coverImage.trim(),
        price: Number(price) || 0,
        status: "draft",
        version: "1.0",
        config: {
          forms: ["A", "B", "C"],
          instruments: AM_INSTRUMENTS,
          domains: AM_DOMAINS,
          bands: AM_BANDS,
          convergenceCheck: AM_CONVERGENCE_CHECK,
          fitStatementRule: AM_FIT_STATEMENT_RULE,
          narrativeTemplates: AM_NARRATIVE_TEMPLATES,
          items: [], 
          consent: {
            required: true,
            text_bn:
              "এটি একটি নির্বাচন-উদ্দেশ্যে ব্যবহৃত সাইকোমেট্রিক মূল্যায়ন। আপনার উত্তর গোপন রাখা হবে এবং শুধুমাত্র নিয়োগ-সংক্রান্ত সিদ্ধান্তে সহায়ক হিসেবে ব্যবহৃত হবে।",
          },
          demographics: [],
        },
      };

      const battery = await createAmBattery(payload);
      navigate(`/dashboard/admin/why-not-you/am-battery/${battery.slug}/items`);
    } catch (err: any) {
      setError(err.message || "Battery তৈরি করা যায়নি।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">নতুন Selection Battery</h1>

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
            placeholder="assistant-manager-battery"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">নাম (বাংলা)</label>
          <input
            value={nameBn}
            onChange={(e) => setNameBn(e.target.value)}
            placeholder="অ্যাসিসট্যান্ট ম্যানেজার / মিড-লেভেল ম্যানেজার নির্বাচন ব্যাটারি"
            className="w-full border border-slate-200 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">নাম (ইংরেজি, ঐচ্ছিক)</label>
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="Assistant Manager / Mid-Level Manager Battery"
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
          ℹ️ Submit করলে ৮টা instrument, ৮টা ডোমেইন, ৫টা band, convergence/fit-statement rule
          স্বয়ংক্রিয়ভাবে ম্যানুয়েল অনুযায়ী বসে যাবে (draft অবস্থায়)। এরপর পরের পেজে গিয়ে
          প্রশ্ন (item) যোগ করতে হবে — যতক্ষণ প্রশ্ন না থাকবে ততক্ষণ এটা Publish করবেন না।
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg"
        >
          {saving ? "তৈরি হচ্ছে..." : "Battery তৈরি করুন"}
        </button>
      </form>
    </div>
  );
}