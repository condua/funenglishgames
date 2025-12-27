// src/components/features/VocabularyBuilder.jsx
import React, { useState, useEffect } from "react";
import { BookOpen, List, X } from "lucide-react";
import { generateContent } from "../../api/aiService";

export const VocabularyBuilder = ({ addToast }) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const [savedWords, setSavedWords] = useState(() => {
    try {
      const saved = localStorage.getItem("linguaAI_vocab");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("linguaAI_vocab", JSON.stringify(savedWords));
    } catch (e) {
      console.error("Save failed", e);
    }
  }, [savedWords]);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const prompt = `Topic: ${topic}. Generate 4 useful English words related to this topic. Output strict JSON array: [{ "word": "Word", "ipa": "/ipa/", "type": "n/v/adj", "definition": "Vietnamese meaning", "example": "English example sentence" }]`;
      const newWords = await generateContent(prompt);
      if (Array.isArray(newWords)) {
        setSavedWords((prev) => [...newWords, ...prev].slice(0, 100));
        addToast(`Đã thêm ${newWords.length} từ vựng mới!`, "success");
        setTopic("");
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      addToast("Lỗi khi tạo từ vựng.", "error");
    }
    setLoading(false);
  };

  const removeWord = (index) => {
    setSavedWords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 md:p-10 rounded-3xl shadow-lg text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">
            Mở rộng Vốn Từ Vựng
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 bg-white/20 p-2 rounded-2xl backdrop-blur-md border border-white/30">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Nhập chủ đề (VD: Môi trường, Công nghệ...)"
              className="flex-1 bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-xl outline-none"
            />
            <button
              onClick={generate}
              disabled={loading || !topic}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black disabled:opacity-50 transition shadow-lg whitespace-nowrap"
            >
              {loading ? "Đang tạo..." : "Tạo Thẻ"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end px-2 border-b border-gray-200 pb-2">
        <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
          <BookOpen className="text-amber-500" /> Bộ sưu tập của bạn
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {savedWords.length}
          </span>
        </h3>
        {savedWords.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Xóa toàn bộ từ vựng đã lưu?")) setSavedWords([]);
            }}
            className="text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {savedWords.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
            <List size={32} />
          </div>
          <p className="text-gray-500 font-medium">
            Chưa có từ vựng nào.
            <br />
            Nhập chủ đề phía trên để AI tạo giúp bạn!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {savedWords.map((w, i) => (
            <div
              key={i}
              className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 relative flex flex-col h-full"
            >
              <button
                onClick={() => removeWord(i)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition"
              >
                <X size={16} />
              </button>

              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-xl text-gray-900">{w.word}</h3>
                <span className="text-xs font-mono text-gray-400">
                  {w.type}
                </span>
              </div>

              <div className="text-sm text-amber-600 mb-3 font-medium">
                {w.ipa}
              </div>

              <p
                className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3"
                title={w.definition}
              >
                {w.definition}
              </p>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-500 italic relative">
                <span className="absolute -top-2 -left-1 text-2xl text-gray-300 leading-none">
                  “
                </span>
                {w.example}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
