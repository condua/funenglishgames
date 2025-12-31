// src/components/features/WordAnalysis.jsx
import React, { useState } from "react";
import {
  Search,
  Volume2,
  BookOpen,
  AlertCircle,
  Check,
  ArrowRight,
} from "lucide-react";
// Import hàm gọi AI thật
import { generateContent } from "../../api/aiService";

export const WordAnalysis = ({ addToast }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeWord = async (word) => {
    setIsLoading(true);
    setResult(null);

    try {
      // 1. Định nghĩa System Instruction để ép kiểu JSON và logic sửa lỗi
      const systemInstruction = `
        Bạn là một từ điển tiếng Anh AI thông minh dành cho người Việt.
        Nhiệm vụ của bạn là nhận vào một từ (có thể sai chính tả), sửa lỗi (nếu có), và phân tích nó.
        
        Hãy trả về kết quả dưới dạng JSON STRICT MODE với cấu trúc sau:
        {
          "isCorrected": boolean, // true nếu từ người dùng nhập bị sai chính tả và bạn đã sửa lại
          "originalInput": string, // Từ gốc người dùng nhập
          "word": string, // Từ tiếng Anh chính xác (viết hoa chữ cái đầu)
          "ipa": string, // Phiên âm IPA
          "type": string, // Từ loại (kèm nghĩa tiếng Việt trong ngoặc, VD: "Noun (Danh từ)")
          "meaning": string, // Nghĩa tiếng Việt ngắn gọn, súc tích
          "example": string // Một câu ví dụ tiếng Anh hay sử dụng từ này
          "example_vn": string // Dịch câu ví dụ sang tiếng Việt
        }

        Nếu từ nhập vào hoàn toàn vô nghĩa hoặc không thể đoán được, hãy trả về JSON với "word": "Unknown" và "meaning": "Không tìm thấy từ này".
      `;

      // 2. Tạo User Prompt //
      const userPrompt = `Phân tích từ vựng sau: "${word}"`;

      // 3. Gọi API
      const data = await generateContent(userPrompt, systemInstruction);

      // 4. Kiểm tra dữ liệu trả về.
      if (data && data.word !== "Unknown") {
        setResult(data);
        addToast("Đã phân tích xong!", "success");
      } else {
        addToast("Không tìm thấy từ này hoặc từ quá vô nghĩa.", "error");
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      addToast("Lỗi kết nối AI. Vui lòng thử lại.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    analyzeWord(searchTerm);
  };

  // Hàm đọc từ (Text-to-Speech trình duyệt)
  const speakWord = () => {
    if (result?.word) {
      const utterance = new SpeechSynthesisUtterance(result.word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Tra cứu & Sửa lỗi</h2>
        <p className="text-gray-500">
          Nhập từ vựng bất kỳ, AI sẽ sửa lỗi chính tả và giải nghĩa chi tiết.
        </p>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập từ vựng (ví dụ: eliphan, beautiful...)"
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg"
          disabled={isLoading}
        />
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={24}
        />
        <button
          type="submit"
          disabled={isLoading || !searchTerm}
          className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-6 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Đang dịch...</span>
            </>
          ) : (
            "Kiểm tra"
          )}
        </button>
      </form>

      {/* Result Section */}
      {result && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6 animate-scale-in">
          {/* Correction Notice: Chỉ hiện khi AI detect sai chính tả */}
          {result.isCorrected && (
            <div className="flex items-center gap-3 bg-orange-50 text-orange-700 p-4 rounded-xl border border-orange-100">
              <AlertCircle size={20} className="shrink-0" />
              <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                <span>Bạn gõ:</span>
                <span className="line-through opacity-60 decoration-orange-700/50">
                  {result.originalInput}
                </span>
                <ArrowRight size={16} />
                <span>Có phải ý bạn là:</span>
                <span className="font-bold bg-white px-2 py-0.5 rounded shadow-sm border border-orange-100">
                  {result.word}
                </span>
              </div>
            </div>
          )}

          {/* Word Header */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-6">
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                <h3 className="text-4xl font-bold text-indigo-900">
                  {result.word}
                </h3>
                <span className="text-xl text-gray-500 font-serif italic">
                  {result.ipa}
                </span>
              </div>
              <span className="inline-block mt-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full">
                {result.type}
              </span>
            </div>
            <button
              onClick={speakWord}
              className="p-3 hover:bg-indigo-50 rounded-full transition-colors text-indigo-600 group"
              title="Nghe phát âm"
            >
              <Volume2
                size={28}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>

          {/* Meaning & Example */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-900 font-semibold">
                <BookOpen size={20} className="text-indigo-500" />
                <h4>Định nghĩa</h4>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed ml-7 font-medium">
                {result.meaning}
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Check size={18} className="text-green-500" />
                <h4>Ví dụ mẫu</h4>
              </div>
              <p className="text-gray-800 italic font-serif ml-6 text-xl">
                "{result.example}"
              </p>
              <p className="text-gray-500 italic text-lg mt-2 ml-6">
                "{result.example_vn}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
