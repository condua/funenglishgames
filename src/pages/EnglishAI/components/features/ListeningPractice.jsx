// src/components/features/ListeningPractice.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Sparkles,
  CheckCircle,
  Headphones,
  RotateCcw,
} from "lucide-react";
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

  // --- STATE AUDIO ---
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // -------------------

  const synth = useRef(window.speechSynthesis);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0); // Lưu thời điểm bắt đầu của đoạn hiện tại
  const startOffsetRef = useRef(0); // Lưu offset thời gian (khi tua)

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Ước tính thời lượng tổng dựa trên số từ và tốc độ
  useEffect(() => {
    if (exercise?.text) {
      const wordCount = exercise.text.split(/\s+/).length;
      // Ước tính: 150 từ/phút là tốc độ trung bình (1.0x)
      const baseSeconds = (wordCount / 150) * 60;
      const estimatedDuration = Math.ceil(baseSeconds / rate) + 2;
      setDuration(estimatedDuration);
    }
  }, [exercise, rate]);

  const formatTime = (seconds) => {
    const s = Math.min(Math.max(0, seconds), duration); // Clamp
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const generate = async () => {
    setLoading(true);
    stopAudio();
    setExercise(null);
    setResult(null);
    setUserInput("");

    try {
      const prompt = `Topic: ${topic}. Level: ${level}. Generate a short paragraph (30-50 words) for dictation practice. Output strict JSON: {"text": "English text here", "translation": "Vietnamese translation here", "difficult_words": ["word1", "word2"]}`;
      const data = await generateContent(prompt, "You are an English teacher.");
      if (data && data.text) {
        setExercise(data);
        addToast("Đã tạo bài tập thành công!", "success");
      } else {
        throw new Error("Dữ liệu lỗi");
      }
    } catch (e) {
      addToast("Lỗi tạo bài tập.", "error");
    }
    setLoading(false);
  };

  const stopAudio = () => {
    synth.current.cancel();
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Hàm phát audio (có hỗ trợ bắt đầu từ một đoạn text cụ thể)
  const playAudio = (startTime = 0) => {
    if (!exercise) return;

    // 1. Dừng audio cũ
    synth.current.cancel();
    if (timerRef.current) clearInterval(timerRef.current);

    // 2. Tính toán đoạn text cần đọc dựa trên startTime (kỹ thuật Slicing)
    const ratio = Math.min(startTime / duration, 1);
    const charIndex = Math.floor(exercise.text.length * ratio);

    // Tìm khoảng trắng gần nhất để không cắt giữa từ
    let safeIndex = charIndex === 0 ? 0 : exercise.text.indexOf(" ", charIndex);
    if (safeIndex === -1) safeIndex = charIndex; // Fallback nếu gần cuối

    const textToSpeak = exercise.text.substring(safeIndex).trim();
    if (!textToSpeak) {
      setIsPlaying(false);
      setCurrentTime(duration);
      return;
    }

    // 3. Thiết lập Utterance
    const u = new SpeechSynthesisUtterance(textToSpeak);
    u.rate = rate;
    u.lang = "en-US";

    u.onstart = () => {
      setIsPlaying(true);
      startOffsetRef.current = startTime; // Lưu mốc thời gian đã tua tới
      startTimeRef.current = Date.now(); // Lưu thời gian thực tế bắt đầu chạy

      // Chạy timer cập nhật UI
      timerRef.current = setInterval(() => {
        const now = Date.now();
        // Thời gian hiện tại = Thời gian đã tua + Thời gian trôi qua từ lúc play
        const elapsed = (now - startTimeRef.current) / 1000;
        const actualTime = startOffsetRef.current + elapsed;

        if (actualTime >= duration) {
          setCurrentTime(duration);
          stopAudio();
        } else {
          setCurrentTime(actualTime);
        }
      }, 100);
    };

    u.onend = () => {
      // Chỉ stop nếu tự nhiên kết thúc (không phải do bị cancel để tua)
      // Sự kiện onend của speech synthesis đôi khi fire khi cancel, cần cẩn thận
      // Logic ở timer sẽ handle việc hiển thị hết giờ
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Nếu đọc hết thì set về 0 sau 1s
      if (Math.abs(currentTime - duration) < 2) {
        setTimeout(() => setCurrentTime(0), 1000);
      }
    };

    u.onerror = () => stopAudio();

    synth.current.speak(u);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      // Nếu đang ở cuối bài thì phát lại từ đầu, ngược lại phát tiếp từ vị trí hiện tại
      const startFrom = currentTime >= duration - 1 ? 0 : currentTime;
      playAudio(startFrom);
    }
  };

  // Xử lý khi người dùng kéo thanh trượt
  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime); // Cập nhật UI mượt mà ngay lập tức
  };

  // Xử lý khi người dùng thả chuột ra (mới thực sự tua audio)
  const handleSeekCommit = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (isPlaying) {
      // Nếu đang play thì tua và play tiếp
      playAudio(newTime);
    } else {
      // Nếu đang pause thì chỉ tua mốc thời gian (lần tới bấm play sẽ play từ đây)
      startOffsetRef.current = newTime;
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
      {/* Controls Card - Giữ nguyên */}
      <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Chủ đề
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-70 font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex justify-center items-center gap-2"
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
            {/* --- AUDIO PLAYER CÓ SEEK BAR --- */}
            <div className="mb-6 bg-blue-50 rounded-2xl p-4 border border-blue-100 select-none">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md shrink-0 ${
                    isPlaying
                      ? "bg-red-500 text-white"
                      : "bg-blue-600 text-white hover:scale-105"
                  }`}
                >
                  {isPlaying ? (
                    <Pause size={20} fill="currentColor" />
                  ) : (
                    <Play size={20} fill="currentColor" className="ml-1" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>{isPlaying ? "Đang đọc..." : "Tạm dừng"}</span>
                    <span className="font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  {/* Slider Input thay vì div tĩnh */}
                  <div className="relative w-full h-4 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeekChange}
                      onMouseUp={handleSeekCommit}
                      onTouchEnd={handleSeekCommit}
                      className="absolute w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:h-2 transition-all z-10"
                      style={{
                        background: `linear-gradient(to right, #2563eb ${
                          (currentTime / duration) * 100
                        }%, #bfdbfe ${(currentTime / duration) * 100}%)`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Speed Controls & Reset */}
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-blue-100/50">
                <button
                  onClick={() => {
                    stopAudio();
                    setCurrentTime(0);
                  }}
                  className="text-gray-400 hover:text-blue-500 transition text-xs font-bold flex items-center gap-1"
                >
                  <RotateCcw size={14} /> Reset
                </button>

                <div className="flex gap-1">
                  {[0.7, 1, 1.2].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRate(r);
                        if (isPlaying) {
                          stopAudio(); // Cần stop để apply tốc độ mới cho lần play tới
                          setTimeout(() => playAudio(currentTime), 100);
                        }
                      }}
                      className={`text-xs font-bold px-2 py-1 rounded-md transition border ${
                        rate === r
                          ? "bg-white text-blue-600 border-blue-200 shadow-sm"
                          : "bg-transparent text-gray-500 border-transparent hover:bg-white/50"
                      }`}
                    >
                      {r}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* -------------------------------------- */}

            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 w-full min-h-[150px] p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-lg leading-relaxed custom-scrollbar resize-none"
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
