// src/components/features/SentenceChecker.jsx
import React, { useState } from "react";
import { Search, ThumbsUp, AlertCircle, Copy, Sparkles } from "lucide-react";
import { generateContent } from "../../api/aiService";

export const SentenceChecker = ({ addToast }) => {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!sentence.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Analyze grammar for sentence: "${sentence}". Output strict JSON: {"is_correct": boolean, "corrected": "Correct version", "explanation": "Vietnamese explanation why", "translation": "Vietnamese translation", "alternatives": ["Alternative way 1", "Alternative way 2"]}`;
      const data = await generateContent(
        prompt,
        "You are an expert Grammar checker."
      );
      if (data) {
        setResult(data);
        addToast("Đã kiểm tra xong!", "success");
      }
    } catch (e) {
      addToast("Lỗi kiểm tra.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-pink-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50"></div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">
          Kiểm tra Ngữ pháp
        </h2>

        <div className="flex flex-col md:flex-row gap-3 relative z-10">
          <input
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && check()}
            placeholder="Nhập câu tiếng Anh cần kiểm tra..."
            className="flex-1 border-2 border-gray-100 bg-gray-50 p-4 rounded-xl outline-none focus:border-pink-500 focus:bg-white transition text-lg"
          />
          <button
            onClick={check}
            disabled={loading || !sentence}
            className="bg-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-600 disabled:opacity-50 transition shadow-lg shadow-pink-200 whitespace-nowrap flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search size={20} /> Check
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 animate-slide-in">
          <div
            className={`flex items-center gap-4 p-4 rounded-2xl mb-6 ${
              result.is_correct
                ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                : "bg-red-50 text-red-800 border border-red-100"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                result.is_correct ? "bg-emerald-200" : "bg-red-200"
              }`}
            >
              {result.is_correct ? (
                <ThumbsUp size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {result.is_correct
                  ? "Tuyệt vời! Câu chính xác."
                  : "Cần chỉnh sửa một chút."}
              </h3>
              {!result.is_correct && (
                <p className="text-sm opacity-90">
                  Chúng tôi tìm thấy lỗi ngữ pháp trong câu của bạn.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {!result.is_correct && (
              <div className="group">
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Câu đã sửa
                </div>
                <div className="text-xl md:text-2xl font-bold text-emerald-600 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 shadow-sm flex justify-between items-center">
                  {result.corrected}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result.corrected);
                      addToast("Copied!", "success");
                    }}
                    className="text-emerald-300 hover:text-emerald-600 transition"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Giải thích chi tiết
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed h-full">
                  {result.explanation}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Dịch nghĩa
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-indigo-900 italic h-full">
                  "{result.translation}"
                </div>
              </div>
            </div>

            {result.alternatives?.length > 0 && (
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Cách diễn đạt khác tự nhiên hơn
                </div>
                <ul className="space-y-2">
                  {result.alternatives.map((alt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm text-gray-600 hover:border-pink-200 transition"
                    >
                      <Sparkles
                        size={16}
                        className="text-pink-400 mt-1 shrink-0"
                      />
                      <span>{alt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
