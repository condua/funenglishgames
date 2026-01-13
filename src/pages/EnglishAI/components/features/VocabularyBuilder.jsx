// src/components/features/VocabularyBuilder.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  List,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import { generateContent } from "../../api/aiService";

// --- Custom Confirmation Modal ---
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-lg shadow-red-200"
          >
            Xóa ngay
          </button>
        </div>
      </div>
    </div>
  );
};

// --- VocabularyBuilder Component ---
export const VocabularyBuilder = ({ addToast }) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // State riêng cho từ gợi ý
  const [generatedWords, setGeneratedWords] = useState([]);

  // State cho từ đã lưu
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
    setGeneratedWords([]);
    try {
      // Cập nhật Prompt để trả về Object { "words": [...] } thay vì Array trần
      // Lý do: response_format: { type: "json_object" } của OpenAI yêu cầu root là Object
      const prompt = `Topic: "${topic}". 
      Task: Generate 4 useful English words/phrases related to this topic.
      Output Structure: JSON Object with a key "words" containing the array.
      Example: { "words": [{ "word": "Word", "ipa": "/ipa/", "type": "n/v/adj", "definition": "Vietnamese meaning", "example": "English example sentence" }] }`;

      const result = await generateContent(prompt);

      // Xử lý kết quả trả về từ generateContent (đã là JSON object)
      let newWords = [];
      if (result && Array.isArray(result.words)) {
        newWords = result.words;
      } else if (Array.isArray(result)) {
        newWords = result;
      } else {
        throw new Error("Cấu trúc dữ liệu trả về không đúng.");
      }

      if (newWords.length > 0) {
        setGeneratedWords(newWords);
        addToast(`Đã tìm thấy ${newWords.length} từ gợi ý!`, "success");
      } else {
        throw new Error("Không tìm thấy từ vựng nào.");
      }
    } catch (e) {
      console.error(e);
      addToast("Lỗi: " + e.message, "error");
    }
    setLoading(false);
  };

  const addToCollection = (word) => {
    const isExist = savedWords.some(
      (w) => w.word.toLowerCase() === word.word.toLowerCase()
    );
    if (isExist) {
      addToast(`Từ "${word.word}" đã có trong bộ sưu tập!`, "error");
      return;
    }

    setSavedWords((prev) => [word, ...prev]);
    addToast(`Đã lưu "${word.word}"`, "success");
  };

  const removeWord = (index) => {
    setSavedWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setSavedWords([]);
    setShowDeleteConfirm(false);
    addToast("Đã xóa toàn bộ bộ sưu tập", "success");
  };

  const WordCard = ({ word, index, isSaved, onAction }) => (
    <div
      className={`group p-5 rounded-2xl shadow-sm border transition-all duration-300 relative flex flex-col h-full ${
        isSaved
          ? "bg-white border-gray-100 hover:shadow-xl hover:-translate-y-1"
          : "bg-amber-50/50 border-amber-100 hover:border-amber-300"
      }`}
    >
      <button
        onClick={() => onAction(word, index)}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
          isSaved
            ? "text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100"
            : "text-amber-600 bg-amber-100 hover:bg-amber-500 hover:text-white"
        }`}
        title={isSaved ? "Xóa thẻ này" : "Lưu vào bộ sưu tập"}
      >
        {isSaved ? <X size={16} /> : <Plus size={18} />}
      </button>

      <div className="flex justify-between items-baseline mb-1 pr-8">
        <h3 className="font-bold text-xl text-gray-900">{word.word}</h3>
        <span className="text-xs font-mono text-gray-400 border border-gray-200 px-1.5 rounded bg-white">
          {word.type}
        </span>
      </div>

      <div className="text-sm text-amber-600 mb-3 font-medium font-serif italic">
        {word.ipa}
      </div>

      <p className="text-gray-600 text-sm mb-4 flex-1" title={word.definition}>
        {word.definition}
      </p>

      <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 text-xs text-gray-500 italic relative mt-auto">
        <span className="absolute -top-2 -left-1 text-2xl text-gray-300 leading-none font-serif">
          “
        </span>
        {word.example}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-10 w-full relative">
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAll}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa toàn bộ từ vựng trong bộ sưu tập? Hành động này không thể hoàn tác."
      />

      {/* Header & Input Section */}
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
              className="flex-1 bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-300 transition"
              onKeyDown={(e) => e.key === "Enter" && !loading && generate()}
            />
            <button
              onClick={generate}
              disabled={loading || !topic}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black disabled:opacity-50 transition shadow-lg whitespace-nowrap flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Đang tạo...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Tạo Thẻ
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Words Section */}
      {generatedWords.length > 0 && (
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="text-amber-500" size={20} />
            <h3 className="font-bold text-xl text-gray-800">Gợi ý từ AI</h3>
            <span className="text-sm text-gray-400 font-normal ml-2">
              (Nhấn + để lưu vào bộ sưu tập)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {generatedWords.map((w, i) => (
              <WordCard
                key={`gen-${i}`}
                word={w}
                index={i}
                isSaved={false}
                onAction={() => addToCollection(w)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Collection Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-2 border-b border-gray-200 pb-2">
          <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
            <BookOpen className="text-amber-500" /> Bộ sưu tập của bạn
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {savedWords.length}
            </span>
          </h3>
          {savedWords.length > 0 && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              <Trash2 size={14} />
              Xóa tất cả
            </button>
          )}
        </div>

        {savedWords.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <List size={32} />
            </div>
            <p className="text-gray-500 font-medium">
              Chưa có từ vựng nào trong bộ sưu tập.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {savedWords.map((w, i) => (
              <WordCard
                key={`saved-${i}`}
                word={w}
                index={i}
                isSaved={true}
                onAction={(word, idx) => removeWord(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default VocabularyBuilder;
