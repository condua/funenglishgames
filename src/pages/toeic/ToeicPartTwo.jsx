import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Volume2,
  Settings2,
  Eye,
  EyeOff,
  Play,
  Sparkles,
  Flag,
  LayoutGrid,
  X,
} from "lucide-react";

import { rawQuizData } from "./data/toeicPartTwo";

// --- HÀM CÂN BẰNG ĐÁP ÁN ---
const generateBalancedData = () => {
  const balanced = [];
  rawQuizData.forEach((item, index) => {
    const targetIndex = index % 3;
    const pureOptions = item.options.map((opt) => opt.substring(3));
    const pureMeanings = item.optionsMeaning.map((opt) => opt.substring(3));
    const pureAnswerText = item.answer.substring(3);
    const currentCorrectIndex = pureOptions.indexOf(pureAnswerText);

    if (currentCorrectIndex !== targetIndex) {
      let tempOpt = pureOptions[targetIndex];
      pureOptions[targetIndex] = pureOptions[currentCorrectIndex];
      pureOptions[currentCorrectIndex] = tempOpt;

      let tempMean = pureMeanings[targetIndex];
      pureMeanings[targetIndex] = pureMeanings[currentCorrectIndex];
      pureMeanings[currentCorrectIndex] = tempMean;
    }

    const prefixes = ["A", "B", "C"];
    const newOptions = pureOptions.map((opt, i) => `${prefixes[i]}. ${opt}`);
    const newMeanings = pureMeanings.map(
      (mean, i) => `${prefixes[i]}. ${mean}`,
    );
    const newAnswer = newOptions[targetIndex];

    balanced.push({
      ...item,
      options: newOptions,
      optionsMeaning: newMeanings,
      answer: newAnswer,
    });
  });
  return balanced;
};

const balancedQuizData = generateBalancedData();

export default function ToeicPartTwo() {
  // Khởi tạo state từ localStorage nếu có, nếu không thì dùng giá trị mặc định
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const saved = localStorage.getItem("toeic_part2_current_index");
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem("toeic_part2_answers");
    return saved
      ? JSON.parse(saved)
      : Array(balancedQuizData.length).fill(null);
  });

  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem("toeic_part2_flags");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Lưu state vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem(
      "toeic_part2_current_index",
      currentQuestionIndex.toString(),
    );
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem("toeic_part2_answers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem(
      "toeic_part2_flags",
      JSON.stringify(Array.from(flags)),
    );
  }, [flags]);

  // Modal trạng thái lưới câu hỏi
  const [isListOpen, setIsListOpen] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  const currentQuestion = balancedQuizData[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];
  const isAnswered = selectedOption !== null;

  // TTS States
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    const populateVoices = () => {
      const availableVoices = synth.getVoices();
      const englishVoices = availableVoices.filter((voice) =>
        voice.lang.startsWith("en"),
      );
      setVoices(englishVoices);
      if (englishVoices.length > 0 && !selectedVoiceURI) {
        setSelectedVoiceURI(englishVoices[0].voiceURI);
      }
    };
    populateVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoices;
    }
  }, [selectedVoiceURI]);

  const playAudio = (textToSpeak = "") => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();

    let finalText = textToSpeak;
    if (!finalText) {
      finalText = currentQuestion.q.replace(/^\d+\.\s*/, "");
    } else {
      finalText = finalText.replace(/^[A-C]\.\s*/, "");
    }

    const utterance = new SpeechSynthesisUtterance(finalText);
    if (selectedVoiceURI) {
      const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
      if (voice) utterance.voice = voice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    synth.speak(utterance);
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [currentQuestionIndex]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < balancedQuizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const toggleFlag = () => {
    const newFlags = new Set(flags);
    if (newFlags.has(currentQuestionIndex)) {
      newFlags.delete(currentQuestionIndex);
    } else {
      newFlags.add(currentQuestionIndex);
    }
    setFlags(newFlags);
  };

  const calculateScore = () => {
    return userAnswers.filter(
      (ans, idx) => ans === balancedQuizData[idx].answer,
    ).length;
  };

  const restartQuiz = () => {
    // Xóa dữ liệu cũ khỏi localStorage và đặt lại state
    localStorage.removeItem("toeic_part2_current_index");
    localStorage.removeItem("toeic_part2_answers");
    localStorage.removeItem("toeic_part2_flags");

    setCurrentQuestionIndex(0);
    setUserAnswers(Array(balancedQuizData.length).fill(null));
    setFlags(new Set());
    setShowResult(false);
  };

  const handleOptionAudioClick = (e, optionText) => {
    e.stopPropagation();
    playAudio(optionText);
  };

  const progressPercentage =
    (userAnswers.filter((ans) => ans !== null).length /
      balancedQuizData.length) *
    100;

  // --- MÀN HÌNH KẾT QUẢ ---
  if (showResult) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans text-slate-800">
        <div className="bg-white max-w-lg w-full rounded-[2rem] shadow-xl border border-slate-100 p-10 text-center">
          <div className="relative mx-auto w-24 h-24 mb-6 bg-amber-50 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-amber-500" />
            <Sparkles className="absolute top-0 right-0 w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-slate-800">
            Hoàn Thành!
          </h2>
          <p className="text-slate-500 mb-8 text-base">
            Bạn đã nộp bài kiểm tra TOEIC Part 2.
          </p>

          <div className="bg-indigo-50/50 rounded-3xl p-6 mb-8 border border-indigo-100">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-1">
              Kết quả của bạn
            </p>
            <p className="text-6xl font-black text-indigo-600">
              {score}{" "}
              <span className="text-3xl font-bold text-indigo-300">/ 100</span>
            </p>
          </div>

          <button
            onClick={restartQuiz}
            className="flex items-center justify-center w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Làm lại từ đầu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-800 font-sans flex justify-center pb-20 sm:pb-0">
      {/* --- DANH SÁCH CÂU HỎI OVERLAY --- */}
      {isListOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsListOpen(false)}
          ></div>
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  Danh sách câu hỏi
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Đã làm: {userAnswers.filter((a) => a !== null).length}/100
                </p>
              </div>
              <button
                onClick={() => setIsListOpen(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="grid grid-cols-5 gap-3">
                {balancedQuizData.map((_, idx) => {
                  const hasAnswered = userAnswers[idx] !== null;
                  const isCorrect =
                    userAnswers[idx] === balancedQuizData[idx].answer;
                  const isCurrent = idx === currentQuestionIndex;
                  const isFlagged = flags.has(idx);

                  let cellStyle =
                    "bg-white border-slate-200 text-slate-600 hover:border-indigo-400";
                  if (hasAnswered) {
                    cellStyle = isCorrect
                      ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                      : "bg-rose-50 border-rose-400 text-rose-700";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setIsListOpen(false);
                      }}
                      className={`relative aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all ${cellStyle} ${isCurrent ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <Flag className="w-3.5 h-3.5 text-rose-500 absolute -top-1.5 -right-1.5 fill-current filter drop-shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setShowResult(true)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex justify-center items-center"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" /> Nộp Bài Sớm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- GIAO DIỆN CHÍNH --- */}
      <div className="w-full max-w-3xl flex flex-col sm:my-8 bg-white sm:rounded-[2rem] shadow-sm sm:shadow-xl sm:border border-slate-200 overflow-hidden relative">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white z-10 sticky top-0">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Tiến độ: {userAnswers.filter((a) => a !== null).length}/100
            </span>
            <div className="w-32 sm:w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${showMeaning ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
            >
              {showMeaning ? (
                <EyeOff className="w-4 h-4 sm:mr-1.5" />
              ) : (
                <Eye className="w-4 h-4 sm:mr-1.5" />
              )}
              <span className="hidden sm:inline">
                {showMeaning ? "Ẩn Dịch" : "Dịch Nghĩa"}
              </span>
            </button>

            <button
              onClick={() => setIsListOpen(true)}
              className="flex items-center px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold transition-colors"
            >
              <LayoutGrid className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Danh Sách</span>
            </button>
          </div>
        </div>

        {/* Cấu hình giọng đọc (Nhỏ gọn) */}
        {voices.length > 0 && (
          <div className="px-5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-end">
            <Settings2 className="w-3 h-3 mr-1.5 text-slate-400" />
            <select
              value={selectedVoiceURI}
              onChange={(e) => setSelectedVoiceURI(e.target.value)}
              className="bg-transparent text-slate-500 text-xs font-medium outline-none cursor-pointer max-w-[150px] truncate"
            >
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nội dung câu hỏi */}
        <div className="p-6 sm:p-10 flex-1 bg-white flex flex-col">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div className="flex gap-4">
              {/* Nút Nghe Câu Hỏi */}
              <button
                onClick={() => playAudio()}
                className={`mt-1 shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${isPlaying ? "bg-indigo-100 border-indigo-200 text-indigo-600 scale-95" : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"}`}
              >
                <Volume2
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${isPlaying ? "animate-pulse" : ""}`}
                />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-md uppercase tracking-wider">
                    Câu hỏi {currentQuestionIndex + 1}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                  {currentQuestion.q.replace(/^\d+\.\s*/, "")}
                </h2>
                <p className="text-slate-400 font-serif italic mt-1.5 text-[1.05rem]">
                  {currentQuestion.ipa}
                </p>

                {showMeaning && (
                  <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3 inline-block">
                    <p className="text-slate-600 font-medium text-sm flex items-start">
                      <span className="mr-2 text-base leading-none">🇻🇳</span>
                      {currentQuestion.meaning}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Nút Đánh Cờ */}
            <button
              onClick={toggleFlag}
              className={`shrink-0 p-2.5 rounded-xl border transition-colors ${flags.has(currentQuestionIndex) ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600"}`}
              title="Đánh dấu xem lại"
            >
              <Flag
                className={`w-5 h-5 ${flags.has(currentQuestionIndex) ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Danh sách Đáp án */}
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => {
              const letterMatch = option.match(/^([A-C])\.\s*(.*)$/);
              const letter = letterMatch ? letterMatch[1] : "";
              const optionText = letterMatch ? letterMatch[2] : option;

              let cardStyles =
                "bg-white border-slate-200 hover:border-indigo-300 text-slate-700";
              let letterStyles =
                "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600";
              let icon = null;

              if (isAnswered) {
                if (option === currentQuestion.answer) {
                  cardStyles =
                    "bg-[#F0FDF4] border-[#4ADE80] text-[#166534] shadow-sm";
                  letterStyles = "bg-[#22C55E] text-white";
                  icon = <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />;
                } else if (option === selectedOption) {
                  cardStyles =
                    "bg-[#FFF1F2] border-[#FB7185] text-[#9F1239] shadow-sm";
                  letterStyles = "bg-[#F43F5E] text-white";
                  icon = <XCircle className="w-6 h-6 text-[#F43F5E]" />;
                } else {
                  cardStyles =
                    "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                  letterStyles = "bg-slate-100 text-slate-300";
                }
              }

              return (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 flex items-center ${cardStyles} ${!isAnswered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"}`}
                >
                  <div
                    className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-lg transition-colors mr-4 ${letterStyles}`}
                  >
                    {letter}
                  </div>

                  <div className="flex-1">
                    <span className="text-[1.05rem] sm:text-[1.1rem] font-semibold block leading-tight">
                      {optionText}
                    </span>

                    {showMeaning && (
                      <div
                        className={`mt-1 font-medium text-[0.9rem] ${isAnswered && option === currentQuestion.answer ? "text-emerald-700/80" : isAnswered && option === selectedOption ? "text-rose-700/80" : "text-slate-500"}`}
                      >
                        {currentQuestion.optionsMeaning[index].replace(
                          /^[A-C]\.\s*/,
                          "",
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <button
                      onClick={(e) => handleOptionAudioClick(e, option)}
                      className={`p-2.5 rounded-full transition-all focus:outline-none ${isAnswered ? "bg-white hover:bg-slate-100 text-slate-400" : "bg-slate-50 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 sm:opacity-0 group-hover:opacity-100 opacity-100"} `}
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>
                    {icon && <div className="animate-in zoom-in">{icon}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Giải thích */}
          {isAnswered && (
            <div className="mt-6 bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-2">
              <h4 className="flex items-center text-[#0369A1] font-bold text-[0.95rem] mb-1.5">
                <BookOpen className="w-4 h-4 mr-2" />
                Giải thích đáp án
              </h4>
              <p className="text-[#075985] text-[0.95rem] leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Thanh Điều Hướng (Bottom Bar) */}
        <div className="fixed sm:static bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 sm:p-6 sm:px-10 flex items-center justify-between z-40 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] sm:shadow-none">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center justify-center px-4 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Câu Trước</span>
          </button>

          <div className="flex gap-3">
            {currentQuestionIndex === balancedQuizData.length - 1 ? (
              <button
                onClick={() => setShowResult(true)}
                className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" /> Nộp Bài
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className={`flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${isAnswered ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" : "bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"}`}
              >
                <span className="hidden sm:inline">Câu Tiếp</span>
                <span className="sm:hidden">Tiếp</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
