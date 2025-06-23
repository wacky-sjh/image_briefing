"use client";
import React, { useState } from "react";
import { Loader2, Sparkles, UploadCloud } from "lucide-react";

export default function ImageBriefing() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.description || data.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-violet-100 p-4">
      <div className="bg-white/80 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="flex items-center gap-2 text-2xl font-bold mb-4 text-violet-700">
          <Sparkles className="text-pink-400" size={28} />
          이미지 설명 생성기
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <label className="flex flex-col items-center gap-2 cursor-pointer bg-violet-50 border-2 border-dashed border-violet-200 rounded-xl p-4 hover:bg-violet-100 transition">
            <UploadCloud className="text-violet-400" size={32} />
            <span className="text-violet-500 font-medium">이미지 첨부하기</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="hidden"
            />
          </label>
          {imagePreview && (
            <div className="flex flex-col items-center gap-1">
              <img
                src={imagePreview}
                alt="미리보기"
                className="rounded-xl border border-violet-200 shadow w-48 h-48 object-cover object-center bg-white"
              />
              <span className="text-xs text-gray-400">미리보기</span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-violet-400 text-white font-bold py-2 px-4 rounded-xl shadow hover:from-pink-500 hover:to-violet-500 transition disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? "생성 중..." : "설명 생성"}
          </button>
        </form>
        {result && (
          <div className="mt-6 w-full bg-violet-50 rounded-xl p-4 shadow-inner">
            <div className="flex items-center gap-2 mb-2 text-violet-700 font-semibold">
              <Sparkles size={18} /> 결과
            </div>
            <div className="text-gray-700 whitespace-pre-line text-sm">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
