// src/components/features/ListeningPractice.jsx
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Sparkles, CheckCircle, Headphones } from "lucide-react";
import { generateContent } from "../../api/aiService";

export const ListeningPractice = ({ addToast }) => {
  const [topic, setTopic] = useState("Daily Routine");
  const [level, setLevel] = useState("Intermediate");
  const [exercise, setExercise] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(1);
  const synth = useRef(window.speechSynthesis);

  useEffect(() => {
    return () => synth.current.cancel();
  }, []);

  const generate = async () => {
    setLoading(true);
    setExercise(null);
    setResult(null);
    setUserInput("");
    try {
      if (synth.current.speaking) synth.current.cancel();
      const prompt = `Topic: ${topic}. Level: ${level}. Generate a short paragraph (30-50 words) for dictation practice. Output strict JSON: {"text": "English text here", "translation": "Vietnamese translation here", "difficult_words": ["word1", "word2"]}`;
      const data = await generateContent(prompt, "You are an English teacher.");
      if (data && data.text) {
        setExercise(data);
        addToast("Đã tạo bài tập thành công!", "success");
      } else {
        throw new Error("Dữ liệu không hợp lệ");
      }
    } catch (e) {
      addToast("Lỗi tạo bài tập. Thử lại nhé!", "error");
    }
    setLoading(false);
  };

  const toggleAudio = () => {
    if (!exercise) return;
    if (isPlaying) {
      synth.current.cancel();
      setIsPlaying(false);
    } else {
      const u = new SpeechSynthesisUtterance(exercise.text);
      u.rate = rate;
      u.lang = "en-US";
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      synth.current.speak(u);
      setIsPlaying(true);
    }
  };

  const check = () => {
    if (!exercise) return;
    const clean = (s) =>
      s
        .replace(/[^\w\s]/g, "")
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w);
    const org = clean(exercise.text);
    const usr = clean(userInput);

    let matches = 0;
    org.forEach((w, i) => {
      if (usr[i] === w) matches++;
    });

    const accuracy =
      org.length > 0 ? Math.round((matches / org.length) * 100) : 0;
    setResult({ acc: accuracy });
    addToast(`Độ chính xác: ${accuracy}%`, accuracy > 80 ? "success" : "error");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Controls Card */}
      <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Chủ đề
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              placeholder="Ví dụ: Technology..."
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Trình độ
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            >
              <option>Beginner (A1-A2)</option>
              <option>Intermediate (B1-B2)</option>
              <option>Advanced (C1-C2)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={generate}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles size={18} /> Tạo Bài Mới
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {exercise && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg border-l-8 border-blue-500 flex flex-col h-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isPlaying
                      ? "bg-red-500 text-white rotate-180"
                      : "bg-blue-500 text-white hover:scale-110"
                  }`}
                >
                  {isPlaying ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} className="ml-1" />
                  )}
                </button>
                <div className="text-sm font-medium text-gray-500">
                  {isPlaying ? "Đang đọc..." : "Nhấn để nghe"}
                </div>
              </div>

              <div className="flex bg-gray-100 p-1 rounded-lg">
                {[0.7, 1, 1.2].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md transition ${
                      rate === r
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 w-full min-h-[150px] p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-700 text-lg leading-relaxed custom-scrollbar resize-none"
              placeholder="Nghe và chép lại..."
            />

            <button
              onClick={check}
              className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 font-bold shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} /> Kiểm tra kết quả
            </button>
          </div>

          <div className="space-y-4">
            {result ? (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 animate-slide-in h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Kết quả chi tiết
                  </h3>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-bold ${
                      result.acc >= 80
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {result.acc}% Chính xác
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Văn bản gốc
                    </span>
                    <div className="mt-1 p-4 bg-indigo-50 rounded-2xl text-gray-800 border border-indigo-100 text-base leading-relaxed">
                      {exercise.text}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Dịch nghĩa
                    </span>
                    <div className="mt-1 p-4 bg-gray-50 rounded-2xl text-gray-600 border border-gray-100 italic">
                      {exercise.translation}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 p-6 text-center">
                <Headphones size={48} className="mb-3 opacity-50" />
                <p>Kết quả so sánh sẽ hiển thị tại đây sau khi bạn nộp bài.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
