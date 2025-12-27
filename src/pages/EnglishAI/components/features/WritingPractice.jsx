// src/components/features/WritingPractice.jsx
import React, { useState } from "react";
import {
  PenTool,
  Sparkles,
  Copy,
  Search,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { generateContent } from "../../api/aiService";

export const WritingPractice = ({ addToast }) => {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const review = async () => {
    if (!essay.trim()) {
      addToast("Hãy viết gì đó trước nhé!", "error");
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const prompt = `Analyze this writing text. Output strictly JSON: { "score": "Estimated Band score (if IELTS) or Level", "corrected_version": "Full corrected text", "general_feedback": "Vietnamese feedback summary", "mistakes": [{ "original": "wrong phrase", "correction": "right phrase", "explanation": "Vietnamese explanation" }] }`;
      const data = await generateContent(
        `Text to check: """${essay}"""`,
        prompt
      );
      if (data) {
        setFeedback(data);
        addToast("Đã chấm xong bài viết!", "success");
      }
    } catch (e) {
      addToast("Lỗi khi chấm bài. Vui lòng thử lại.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-4 animate-fade-in pb-2">
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-500">
            <PenTool size={16} />
            <span className="text-sm font-medium">Writing Editor</span>
          </div>
          <div className="text-xs font-bold bg-white border px-2 py-1 rounded text-gray-500">
            {essay.split(/\s+/).filter((w) => w).length} Words
          </div>
        </div>
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          className="flex-1 w-full p-6 text-base lg:text-lg outline-none resize-none custom-scrollbar leading-relaxed"
          placeholder="Viết bài luận hoặc đoạn văn tiếng Anh của bạn vào đây..."
        />
        <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
          <button
            onClick={review}
            disabled={loading || !essay}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 disabled:opacity-50 font-bold flex gap-2 items-center shadow-lg shadow-violet-200 transition-all active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles size={18} /> Chấm Bài Ngay
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className={`flex-1 lg:max-w-[45%] bg-gray-50/50 rounded-3xl border border-gray-200 overflow-hidden flex flex-col ${
          !feedback ? "justify-center items-center" : ""
        }`}
      >
        {!feedback ? (
          <div className="text-center text-gray-400 p-8">
            <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-4">
              <Search size={32} className="text-violet-300" />
            </div>
            <p className="font-medium">
              Kết quả phân tích và sửa lỗi <br /> sẽ hiển thị tại đây.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg opacity-90">
                  Đánh giá tổng quan
                </h3>
                <p className="text-sm opacity-75">AI Corrector</p>
              </div>
              <div className="text-3xl font-black bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                {feedback.score}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Nhận xét chung
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feedback.general_feedback}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 ml-1">
                Chi tiết lỗi ({feedback.mistakes?.length || 0})
              </h4>
              {feedback.mistakes?.map((m, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl border-l-4 border-red-400 shadow-sm text-sm"
                >
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <span className="line-through text-red-500 bg-red-50 px-2 py-0.5 rounded decoration-red-500/50">
                      {m.original}
                    </span>
                    <ArrowRight size={14} className="text-gray-300" />
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {m.correction}
                    </span>
                  </div>
                  <p className="text-gray-500 italic text-xs border-t pt-2 mt-2">
                    {m.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 relative group">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(feedback.corrected_version);
                  addToast("Đã copy bài sửa!", "success");
                }}
                className="absolute top-4 right-4 text-gray-300 hover:text-emerald-600 p-2 hover:bg-emerald-50 rounded-lg transition"
              >
                <Copy size={18} />
              </button>
              <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <CheckCircle size={16} /> Phiên bản hoàn chỉnh
              </h4>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                {feedback.corrected_version}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
