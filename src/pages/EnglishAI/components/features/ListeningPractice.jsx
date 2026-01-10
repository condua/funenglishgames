import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Sparkles,
  CheckCircle,
  Headphones,
  RotateCcw,
  RefreshCw,
  X,
  AlertCircle,
  Info,
  AlignLeft,
  Type,
  Mic,
  BookOpen,
} from "lucide-react";
import { generateContent } from "../../api/aiService";

// --- Sub-components ---

const ListeningPractice = ({ addToast }) => {
  const [topic, setTopic] = useState("Daily Routine");
  const [level, setLevel] = useState("Intermediate");
  const [exercise, setExercise] = useState(null);
  const [mode, setMode] = useState("gap"); // 'gap' (Điền từ) | 'full' (Chép cả câu)

  // --- Voice State ---
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");

  // State cho chế độ Gap Fill
  const [tokens, setTokens] = useState([]);

  // State cho chế độ Full Dictation
  const [fullInput, setFullInput] = useState("");

  const [isChecked, setIsChecked] = useState(false);
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
  const startTimeRef = useRef(0);
  const startOffsetRef = useRef(0);

  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Lọc các giọng tiếng Anh (bắt đầu bằng 'en')
      const enVoices = allVoices.filter((v) => v.lang.startsWith("en"));
      setVoices(enVoices);

      // Nếu chưa chọn giọng nào, hoặc giọng đã chọn không còn tồn tại, chọn giọng mặc định
      if (enVoices.length > 0) {
        // Ưu tiên Google US English hoặc giọng đầu tiên
        const defaultVoice =
          enVoices.find((v) => v.name.includes("Google US")) || enVoices[0];
        if (!selectedVoiceName) {
          setSelectedVoiceName(defaultVoice.name);
        }
      }
    };

    loadVoices();
    // Sự kiện này cần thiết cho Chrome vì voices load bất đồng bộ
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      stopAudio();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Khi chuyển chế độ, reset lại trạng thái làm bài (nhưng giữ nguyên đề bài)
  useEffect(() => {
    setIsChecked(false);
    setResult(null);
    setFullInput("");
    // Reset tokens input về rỗng
    if (tokens.length > 0) {
      setTokens((prev) =>
        prev.map((t) =>
          t.type === "gap" ? { ...t, userInput: "", isCorrect: null } : t
        )
      );
    }
  }, [mode]);

  // Ước tính thời lượng dựa trên số từ và tốc độ
  useEffect(() => {
    if (exercise?.text) {
      const wordCount = exercise.text.split(/\s+/).length;
      const baseSeconds = (wordCount / 150) * 60;
      const estimatedDuration = Math.ceil(baseSeconds / rate) + 2;
      setDuration(estimatedDuration);
    }
  }, [exercise, rate]);

  const formatTime = (seconds) => {
    const s = Math.min(Math.max(0, seconds), duration);
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Hàm xử lý text thành dạng điền từ
  const processTextToTokens = (text) => {
    const rawWords = text.split(" ");
    const candidates = [];
    rawWords.forEach((word, index) => {
      const cleanWord = word.replace(/[^\w]/g, "");
      if (cleanWord.length > 2 && !/\d/.test(cleanWord)) {
        candidates.push(index);
      }
    });

    const shuffled = candidates.sort(() => 0.5 - Math.random());
    const selectedIndices = shuffled.slice(0, 5);

    const newTokens = rawWords.map((word, index) => {
      if (selectedIndices.includes(index)) {
        const match = word.match(/^([^\w]*)([\w]+)([^\w]*)$/);
        if (match) {
          return {
            id: index,
            type: "gap",
            prefix: match[1],
            answer: match[2],
            suffix: match[3],
            userInput: "",
            isCorrect: null,
          };
        }
      }
      return { id: index, type: "text", content: word };
    });

    return newTokens;
  };

  const generate = async () => {
    setLoading(true);
    stopAudio();
    setExercise(null);
    setResult(null);
    setTokens([]);
    setFullInput("");
    setIsChecked(false);

    try {
      // Cập nhật prompt để yêu cầu part_of_speech
      const prompt = `Topic: ${topic}. Level: ${level}. Generate a short paragraph (80-100 words) suitable for listening practice. Output strict JSON: {"text": "English text here", "translation": "Vietnamese translation here", "difficult_words": [{"word": "word1", "part_of_speech": "n/v/adj", "meaning": "nghĩa tiếng việt"}]}`;
      const data = await generateContent(prompt, "You are an English teacher.");

      if (data && data.text) {
        setExercise(data);
        const processedTokens = processTextToTokens(data.text);
        setTokens(processedTokens);
        if (addToast) addToast("Đã tạo bài tập mới!", "success");
      } else {
        throw new Error("Dữ liệu lỗi");
      }
    } catch (e) {
      console.error(e);
      if (addToast) addToast("Lỗi tạo bài tập.", "error");
    }
    setLoading(false);
  };

  const stopAudio = () => {
    synth.current.cancel();
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const playAudio = (startTime = 0) => {
    if (!exercise) return;

    synth.current.cancel();
    if (timerRef.current) clearInterval(timerRef.current);

    const ratio = Math.min(startTime / duration, 1);
    const charIndex = Math.floor(exercise.text.length * ratio);

    let safeIndex = charIndex === 0 ? 0 : exercise.text.indexOf(" ", charIndex);
    if (safeIndex === -1) safeIndex = charIndex;

    const textToSpeak = exercise.text.substring(safeIndex).trim();
    if (!textToSpeak) {
      setIsPlaying(false);
      setCurrentTime(duration);
      return;
    }

    const u = new SpeechSynthesisUtterance(textToSpeak);

    // --- Thiết lập giọng đọc đã chọn ---
    if (selectedVoiceName) {
      const voice = voices.find((v) => v.name === selectedVoiceName);
      if (voice) u.voice = voice;
    }
    // -----------------------------------

    u.rate = rate;
    u.lang = "en-US"; // Fallback nếu không chọn voice cụ thể

    u.onstart = () => {
      setIsPlaying(true);
      startOffsetRef.current = startTime;
      startTimeRef.current = Date.now();

      timerRef.current = setInterval(() => {
        const now = Date.now();
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
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
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
      const startFrom = currentTime >= duration - 1 ? 0 : currentTime;
      playAudio(startFrom);
    }
  };

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleSeekCommit = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (isPlaying) {
      playAudio(newTime);
    } else {
      startOffsetRef.current = newTime;
    }
  };

  const handleTokenInputChange = (id, value) => {
    if (isChecked) return;
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, userInput: value } : t))
    );
  };

  const check = () => {
    if (!exercise) return;

    let accuracy = 0;

    if (mode === "gap") {
      // --- Logic Check cho Gap Fill ---
      let correctCount = 0;
      let totalGaps = 0;

      const checkedTokens = tokens.map((t) => {
        if (t.type === "gap") {
          totalGaps++;
          const isCorrect =
            t.userInput.trim().toLowerCase() === t.answer.toLowerCase();
          if (isCorrect) correctCount++;
          return { ...t, isCorrect };
        }
        return t;
      });

      setTokens(checkedTokens);
      accuracy =
        totalGaps > 0 ? Math.round((correctCount / totalGaps) * 100) : 0;
      setResult({
        acc: accuracy,
        type: "gap",
        correct: correctCount,
        total: totalGaps,
      });

      if (addToast) {
        addToast(
          `Bạn đúng ${correctCount}/${totalGaps} từ!`,
          accuracy > 80 ? "success" : "info"
        );
      }
    } else {
      // --- Logic Check cho Full Dictation ---
      const clean = (s) =>
        s
          .replace(/[^\w\s]/g, "")
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w);
      const org = clean(exercise.text);
      const usr = clean(fullInput);

      let matches = 0;
      // So sánh đơn giản từng từ theo vị trí
      org.forEach((w, i) => {
        if (usr[i] === w) matches++;
      });

      accuracy = org.length > 0 ? Math.round((matches / org.length) * 100) : 0;
      setResult({ acc: accuracy, type: "full" });

      if (addToast) {
        addToast(
          `Độ chính xác: ${accuracy}%`,
          accuracy > 80 ? "success" : "info"
        );
      }
    }

    setIsChecked(true);
  };

  const resetExercise = () => {
    if (mode === "gap") {
      setTokens((prev) =>
        prev.map((t) =>
          t.type === "gap" ? { ...t, userInput: "", isCorrect: null } : t
        )
      );
    } else {
      setFullInput("");
    }
    setIsChecked(false);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Controls Card */}
      <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              💬Chủ đề
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
              placeholder="Topic..."
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              📈Trình độ
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            >
              <option>Beginner (A1-A2)</option>
              <option>Intermediate (B1-B2)</option>
              <option>Advanced (C1-C2)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              🎙️Giọng đọc
            </label>
            <select
              value={selectedVoiceName}
              onChange={(e) => {
                setSelectedVoiceName(e.target.value);
                // Stop nếu đang đọc để lần tới play sẽ áp dụng giọng mới
                if (isPlaying) stopAudio();
              }}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition text-sm truncate"
              disabled={voices.length === 0}
            >
              {voices.length === 0 && <option>Đang tải giọng...</option>}
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name
                    .replace("Google", "")
                    .replace("Microsoft", "")
                    .substring(0, 25)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={generate}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-70 font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex justify-center items-center gap-2 text-sm"
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
            {/* --- AUDIO PLAYER --- */}
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

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-blue-100/50">
                <button
                  onClick={() => {
                    stopAudio();
                    setCurrentTime(0);
                  }}
                  className="text-gray-400 hover:text-blue-500 transition text-xs font-bold flex items-center gap-1"
                >
                  <RotateCcw size={14} /> Replay
                </button>

                <div className="flex gap-1">
                  {[0.7, 1, 1.2].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRate(r);
                        if (isPlaying) {
                          stopAudio();
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

            {/* --- MODE SWITCHER & INPUT AREA --- */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Tabs */}
              <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                <button
                  onClick={() => setMode("gap")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    mode === "gap"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Type size={16} /> Điền từ
                </button>
                <button
                  onClick={() => setMode("full")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    mode === "full"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <AlignLeft size={16} /> Chép cả đoạn
                </button>
              </div>

              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-6 text-lg leading-loose text-gray-700 font-medium overflow-y-auto max-h-[400px]">
                {mode === "gap" ? (
                  // --- GAP FILL UI ---
                  <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-2">
                    {tokens.map((token, idx) => {
                      if (token.type === "text") {
                        return <span key={idx}>{token.content}</span>;
                      } else {
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-baseline"
                          >
                            {token.prefix}
                            <span className="relative inline-block mx-1">
                              <input
                                type="text"
                                value={token.userInput}
                                onChange={(e) =>
                                  handleTokenInputChange(
                                    token.id,
                                    e.target.value
                                  )
                                }
                                disabled={isChecked}
                                className={`
                                                            w-24 px-2 py-0.5 text-center text-blue-900 border-b-2 outline-none bg-white transition-all
                                                            ${
                                                              isChecked &&
                                                              token.isCorrect
                                                                ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold"
                                                                : isChecked &&
                                                                  !token.isCorrect
                                                                ? "border-red-400 bg-red-50 text-red-600 line-through decoration-2"
                                                                : "border-gray-300 focus:border-blue-500 focus:bg-blue-50"
                                                            }
                                                        `}
                                placeholder={isChecked ? "" : "..."}
                                autoComplete="off"
                              />
                              {isChecked && !token.isCorrect && (
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                                  {token.answer}
                                </span>
                              )}
                            </span>
                            {token.suffix}
                          </span>
                        );
                      }
                    })}
                  </div>
                ) : (
                  // --- FULL DICTATION UI ---
                  <textarea
                    value={fullInput}
                    onChange={(e) => setFullInput(e.target.value)}
                    disabled={isChecked}
                    placeholder="Nghe và chép lại toàn bộ đoạn văn..."
                    className={`w-full h-full min-h-[200px] bg-transparent outline-none resize-none ${
                      isChecked ? "text-gray-500" : "text-gray-800"
                    }`}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {!isChecked ? (
                <button
                  onClick={check}
                  className="flex-1 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 font-bold shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} /> Kiểm tra
                </button>
              ) : (
                <button
                  onClick={resetExercise}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 font-bold border border-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} /> Làm lại
                </button>
              )}
            </div>
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

                  {/* Hiển thị bài làm của user nếu là chế độ Full Dictation */}
                  {mode === "full" && (
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase">
                        Bài làm của bạn
                      </span>
                      <div
                        className={`mt-1 p-4 rounded-2xl border text-base leading-relaxed ${
                          result.acc >= 80
                            ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                            : "bg-red-50 border-red-100 text-red-800"
                        }`}
                      >
                        {fullInput}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Dịch nghĩa
                    </span>
                    <div className="mt-1 p-4 bg-gray-50 rounded-2xl text-gray-600 border border-gray-100 italic">
                      {exercise.translation}
                    </div>
                  </div>

                  {exercise.difficult_words &&
                    exercise.difficult_words.length > 0 && (
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1 mb-2">
                          <BookOpen size={14} /> Từ vựng gợi ý
                        </span>
                        <div className="flex flex-col gap-2">
                          {exercise.difficult_words.map((item, i) => (
                            <div
                              key={i}
                              className="bg-white px-4 py-2 border border-gray-200 rounded-xl shadow-sm text-sm text-gray-700 flex items-center gap-2 hover:bg-blue-50 transition-colors"
                            >
                              <span className="font-bold text-blue-600 min-w-[80px]">
                                {item.word}
                              </span>
                              {/* Hiển thị từ loại */}
                              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200 font-mono italic">
                                {item.part_of_speech}
                              </span>
                              <span className="text-gray-300">|</span>
                              <span className="italic text-gray-600">
                                {item.meaning}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 p-6 text-center">
                <Headphones size={48} className="mb-3 opacity-50" />
                <p>
                  {mode === "gap"
                    ? "Nghe đoạn văn và điền 5 từ còn thiếu vào ô trống."
                    : "Nghe và chép lại toàn bộ đoạn văn chính xác nhất có thể."}
                </p>
                <p className="text-sm mt-2 opacity-75">
                  Bấm "Kiểm tra" để xem đáp án.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App with Toast Provider ---

const Toast = ({ message, type, onClose }) => {
  return (
    <div
      className={`
      flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-slide-in-right max-w-sm
      ${
        type === "success"
          ? "bg-white border-emerald-100 text-emerald-700"
          : type === "error"
          ? "bg-white border-red-100 text-red-700"
          : "bg-white border-blue-100 text-blue-700"
      }
    `}
    >
      <div
        className={`p-1 rounded-full ${
          type === "success"
            ? "bg-emerald-100"
            : type === "error"
            ? "bg-red-100"
            : "bg-blue-100"
        }`}
      >
        {type === "success" ? (
          <CheckCircle size={16} />
        ) : type === "error" ? (
          <AlertCircle size={16} />
        ) : (
          <Info size={16} />
        )}
      </div>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto text-gray-400 hover:text-gray-600 transition"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export { ListeningPractice };
