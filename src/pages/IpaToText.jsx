import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Send,
  RefreshCw,
  CheckCircle,
  Mic,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Settings,
  BarChart,
  FileText,
} from "lucide-react";

const API_KEY = import.meta.VITE_OPENAI_API_KEY; // System injects the key

const IPALearningSystem = () => {
  const [topic, setTopic] = useState("");
  const [gameState, setGameState] = useState("idle"); // idle, loading, playing, result, error
  const [data, setData] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [accuracy, setAccuracy] = useState(0);

  // New settings state
  const [level, setLevel] = useState("Easy"); // Easy, Medium, Hard
  const [length, setLength] = useState("Short"); // Short, Medium, Long

  // Focus input on load
  const inputRef = useRef(null);

  const generateContent = async () => {
    if (!topic.trim()) return;

    setGameState("loading");
    setData(null);
    setUserInput("");
    setShowHint(false);
    setFeedback([]);

    try {
      // Define complexity based on settings
      let levelDesc = "A1-A2 vocabulary, simple sentence structures";
      if (level === "Medium")
        levelDesc = "B1-B2 vocabulary, compound sentences";
      if (level === "Hard")
        levelDesc =
          "C1-C2 vocabulary, complex grammar, idioms, and advanced lexicon";

      let lengthDesc = "25-35 words (2-3 sentences)";
      if (length === "Medium") lengthDesc = "50-70 words (4-6 sentences)";
      if (length === "Long") lengthDesc = "80-120 words (paragraph)";

      const prompt = `
Create an English text about the topic: "${topic}".

Constraints:
1. Difficulty: ${level} (${levelDesc})
2. Length: ${lengthDesc}

Return ONLY valid JSON:
{
  "original": "The English text here.",
  "ipa": "/ðə ˈɪŋɡlɪʃ tekst hɪr/",
  "vietnamese": "Dịch nghĩa tiếng Việt của đoạn văn."
}

Make sure the IPA transcription is accurate (General American accent preferred).
`;

      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: prompt,
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Lấy text từ OpenAI response
      const content = result.output[0].content[0].text;

      const parsedData = JSON.parse(content);

      setData(parsedData);
      setGameState("playing");
    } catch (error) {
      console.error("Error generating content:", error);
      setGameState("error");
    }
  };

  const handleCheck = () => {
    if (!data) return;

    // Normalize strings for comparison (remove punctuation, lower case)
    const cleanWord = (w) =>
      w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase();

    const originalWords = data.original.split(/\s+/);
    const userWords = userInput.trim().split(/\s+/);

    let correctCount = 0;

    // Create detailed feedback map
    const feedbackResult = originalWords.map((word, index) => {
      const userWord = userWords[index] || "";
      const isMatch = cleanWord(word) === cleanWord(userWord);
      if (isMatch) correctCount++;

      return {
        original: word,
        user: userWord,
        isCorrect: isMatch,
      };
    });

    // Check for extra words user typed
    if (userWords.length > originalWords.length) {
      for (let i = originalWords.length; i < userWords.length; i++) {
        feedbackResult.push({
          original: "",
          user: userWords[i],
          isCorrect: false,
        });
      }
    }

    const calculatedAccuracy = Math.round(
      (correctCount / originalWords.length) * 100,
    );
    setAccuracy(calculatedAccuracy);
    setFeedback(feedbackResult);
    setGameState("result");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCheck();
    }
  };

  // --- Components ---

  const Header = () => (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg rounded-b-3xl mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Mic className="w-6 h-6" /> IPA Decoder
          </h1>
          <p className="text-indigo-100 text-sm mt-1">
            Luyện tiếng Anh qua phiên âm
          </p>
        </div>
        <div className="bg-white/20 p-2 rounded-full">
          <BookOpen className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="text-gray-500 animate-pulse">Đang nhờ AI soạn bài...</p>
      <div className="text-xs text-gray-400">
        Level: {level} • Length: {length}
      </div>
    </div>
  );

  const ErrorScreen = () => (
    <div className="text-center py-10 px-4">
      <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">Có lỗi xảy ra</h3>
      <p className="text-gray-600 mb-6">
        Không thể tạo bài học lúc này. Vui lòng thử lại.
      </p>
      <button
        onClick={() => setGameState("idle")}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Thử lại
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      <Header />

      <main className="px-4 pb-20">
        {/* INPUT STATE */}
        {gameState === "idle" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-center mb-4">
                <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Chủ đề & Cấu hình
                </h2>
              </div>

              <div className="space-y-4">
                {/* Topic Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Chủ đề
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Ví dụ: Technology, Coffee..."
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      onKeyDown={(e) => e.key === "Enter" && generateContent()}
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Difficulty Level */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
                      <BarChart className="w-3 h-3" /> Độ khó
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="Easy">Dễ (A1-A2)</option>
                      <option value="Medium">Vừa (B1-B2)</option>
                      <option value="Hard">Khó (C1-C2)</option>
                    </select>
                  </div>

                  {/* Length */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Độ dài
                    </label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="Short">Ngắn (~30 từ)</option>
                      <option value="Medium">Vừa (~60 từ)</option>
                      <option value="Long">Dài (~100 từ)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateContent}
                  disabled={!topic.trim()}
                  className="w-full bg-indigo-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition hover:bg-indigo-700 flex justify-center items-center gap-2 shadow-lg shadow-indigo-200"
                >
                  <ArrowRight className="w-5 h-5" /> Bắt đầu thử thách
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2 ml-1">
                Gợi ý chủ đề
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Daily Routine", "Shopping", "Holidays", "Music"].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setTopic(suggestion);
                      }}
                      className="text-sm bg-white border border-gray-200 py-2 px-3 rounded-xl text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition"
                    >
                      {suggestion}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {gameState === "loading" && <LoadingScreen />}

        {/* ERROR STATE */}
        {gameState === "error" && <ErrorScreen />}

        {/* PLAYING STATE */}
        {gameState === "playing" && data && (
          <div className="space-y-5 animate-fade-in">
            {/* Settings Info Badge */}
            <div className="flex justify-center gap-2">
              <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full uppercase tracking-wide">
                {level}
              </span>
              <span className="text-[10px] font-bold px-2 py-1 bg-purple-100 text-purple-700 rounded-full uppercase tracking-wide">
                {length}
              </span>
            </div>

            {/* IPA Display Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Mã hóa IPA
                </span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-indigo-400 hover:text-indigo-600 transition flex items-center gap-1 text-xs"
                >
                  <HelpCircle className="w-4 h-4" />{" "}
                  {showHint ? "Ẩn gợi ý" : "Gợi ý"}
                </button>
              </div>
              <div className="p-5 max-h-64 overflow-y-auto">
                <p className="text-xl leading-relaxed font-medium text-gray-800 font-serif tracking-wide">
                  {data.ipa}
                </p>
                {showHint && (
                  <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 italic">
                    <span className="font-semibold text-gray-700 not-italic">
                      Nghĩa tiếng Việt:{" "}
                    </span>
                    {data.vietnamese}
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dịch lại sang tiếng Anh:
              </label>
              <textarea
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Gõ văn bản tiếng Anh tương ứng vào đây..."
                className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-base"
              ></textarea>
              <button
                onClick={handleCheck}
                disabled={!userInput.trim()}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition flex justify-center items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> Kiểm tra kết quả
              </button>
            </div>
          </div>
        )}

        {/* RESULT STATE */}
        {gameState === "result" && data && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
              {/* Score Circle */}
              <div
                className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center border-4 mb-4 ${accuracy >= 80 ? "border-green-500 text-green-600" : accuracy >= 50 ? "border-yellow-500 text-yellow-600" : "border-red-500 text-red-600"}`}
              >
                <span className="text-3xl font-bold">{accuracy}%</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {accuracy >= 100
                  ? "Tuyệt vời!"
                  : accuracy >= 80
                    ? "Làm tốt lắm!"
                    : "Cần cố gắng thêm!"}
              </h3>
              <p className="text-gray-500 text-sm">
                Bạn đã dịch đúng {accuracy}% nội dung ({level} - {length}).
              </p>
            </div>

            {/* Comparison */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                So sánh chi tiết
              </div>
              <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-2 text-lg leading-relaxed">
                  {feedback.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center group relative"
                    >
                      {/* Word User Typed */}
                      <span
                        className={`px-1 rounded cursor-help ${
                          item.isCorrect
                            ? "text-green-700 bg-green-50 border-b-2 border-green-200"
                            : "text-red-600 bg-red-50 border-b-2 border-red-200 line-through decoration-red-400"
                        }`}
                      >
                        {item.user || "___"}
                      </span>

                      {/* Tooltip for correction if wrong */}
                      {!item.isCorrect && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                          {item.original}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 bg-indigo-50/50 -mx-4 px-4 py-3">
                  <p className="text-xs font-bold text-indigo-500 mb-1 uppercase">
                    Đáp án gốc đầy đủ:
                  </p>
                  <p className="text-gray-800 font-medium">{data.original}</p>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase">
                    IPA:
                  </p>
                  <p className="text-gray-500 font-serif text-sm">{data.ipa}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setGameState("playing")}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                Làm lại
              </button>
              <button
                onClick={() => {
                  setTopic("");
                  setGameState("idle");
                }}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex justify-center items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" /> Chủ đề mới
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer info */}
      <footer className="absolute bottom-0 w-full text-center py-4 text-xs text-gray-400 border-t border-gray-100 bg-gray-50">
        Powered by Gemini AI • React & Tailwind
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default IPALearningSystem;
