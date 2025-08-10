import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  CheckCircle,
  XCircle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

// --- Âm thanh (Không thay đổi) ---
const sounds = {
  correct: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
  ),
  incorrect: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
  ),
  click: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3"
  ),
};
Object.values(sounds).forEach((sound) => (sound.volume = 0.5));

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

// --- Helper đọc từ (Không thay đổi) ---
const speakWord = (text) => {
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel(); // Hủy các lượt đọc trước đó
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    const voices = speechSynthesis.getVoices();
    utterance.voice =
      voices.find((v) => v.lang.startsWith("en-")) ||
      voices.find((v) => v.lang === "en-US");
    speechSynthesis.speak(utterance);
  }
};

// ✨ MỚI: Component Thanh tiến trình
const ProgressBar = ({ current, total }) => {
  const progress = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
      <motion.div
        className="bg-violet-500 h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

// ✨ MỚI: Component Màn hình chọn chủ đề
const TopicSelectionScreen = ({ topics, onSelect }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-gray-900 p-4 sm:p-8 flex flex-col justify-center">
    <h1 className="text-center text-4xl sm:text-5xl font-bold text-white mb-10 tracking-tight">
      Choose a Topic
    </h1>
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {topics.map((topic) => (
        <motion.button
          key={topic.slug}
          onClick={() => onSelect(topic)}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 text-white text-3xl font-bold hover:bg-violet-600 transition-colors shadow-lg"
        >
          {topic.name}
        </motion.button>
      ))}
    </motion.div>
  </div>
);

// ✨ MỚI: Component Màn hình chơi game
const GameScreen = ({ questions, onBack, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex]
  );
  const isCorrect = selectedAnswer === currentQuestion?.word;

  // ✨ UX: Tự động phát âm thanh khi câu hỏi mới xuất hiện
  useEffect(() => {
    if (currentQuestion) {
      // Đợi một chút để hiệu ứng chuyển cảnh hoàn tất rồi mới đọc
      const timer = setTimeout(() => speakWord(currentQuestion.word), 400);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswerClick = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    if (option === currentQuestion.word) {
      playSound(sounds.correct);
      setScore((s) => s + 1);
    } else {
      playSound(sounds.incorrect);
    }
  };

  const handleNextQuestion = () => {
    playSound(sounds.click);
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setIsAnswered(false);
      setSelectedAnswer(null);
      setCurrentQuestionIndex(nextIndex);
    } else {
      onFinish(score, questions.length);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-slate-900 to-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          // 🔧 SỬA LỖI: Key thay đổi theo câu hỏi để buộc render lại hoàn toàn
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl rounded-2xl bg-slate-800/70 backdrop-blur-sm p-6 sm:p-8 text-white shadow-2xl shadow-violet-500/20 ring-1 ring-white/10"
        >
          <header className="mb-6 sm:mb-8 flex justify-between items-center text-lg text-slate-300">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
            >
              <ArrowLeft size={20} /> Back to Topics
            </button>

            {/* ✨ MỚI: Thêm div để nhóm thông tin */}
            <div className="flex items-center gap-x-6 font-mono">
              {/* ✨ MỚI: Hiển thị câu hiện tại / tổng số câu */}
              <p>
                Question:{" "}
                <span className="font-bold text-xl text-white">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </p>
              <p>
                Score:{" "}
                <span className="font-bold text-xl text-white">{score}</span>
              </p>
            </div>
          </header>

          <ProgressBar
            current={currentQuestionIndex}
            total={questions.length}
          />

          <div className="text-center mb-8">
            <p className="mb-4 text-gray-300 text-lg">
              Listen and choose the correct word:
            </p>
            <motion.button
              onClick={() => speakWord(currentQuestion.word)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group rounded-full bg-violet-600 p-5 text-white shadow-lg shadow-violet-600/30"
            >
              <Volume2 size={48} />
            </motion.button>
          </div>

          <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {shuffledOptions.map((option) => {
              const isSelected = selectedAnswer === option;
              const isTheCorrectAnswer = option === currentQuestion.word;
              let buttonClass = "bg-slate-700 hover:bg-violet-500";
              if (isAnswered) {
                if (isTheCorrectAnswer) buttonClass = "bg-green-500/90";
                else if (isSelected) buttonClass = "bg-red-500/90";
                else buttonClass = "bg-slate-700 opacity-50 cursor-not-allowed";
              }
              return (
                <button
                  // 🔧 SỬA LỖI: Key độc nhất cho mỗi lựa chọn của mỗi câu hỏi
                  key={`${currentQuestion.word}-${option}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={`rounded-lg p-4 text-xl font-medium shadow-md transition-all duration-300 flex items-center justify-center gap-3 ${buttonClass}`}
                >
                  {isAnswered &&
                    (isTheCorrectAnswer ? (
                      <CheckCircle />
                    ) : (
                      isSelected && <XCircle />
                    ))}
                  {option}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-lg bg-slate-900/50 p-5 ring-1 ring-white/10">
                  <div className="mb-4 flex items-baseline justify-between border-b border-slate-700 pb-3">
                    <h2 className="text-3xl font-bold text-white">
                      {currentQuestion.word}
                    </h2>
                    <span className="text-lg text-cyan-400 font-mono">
                      {currentQuestion.ipa}
                    </span>
                  </div>
                  <div className="space-y-3 text-lg">
                    <p>
                      <strong className="w-24 inline-block text-violet-400">
                        Meaning:
                      </strong>{" "}
                      {currentQuestion.meaning}
                    </p>
                    <div>
                      <strong className="w-24 inline-block text-violet-400 align-top">
                        Example:
                      </strong>
                      <em className="inline-block max-w-[calc(100%-6.5rem)] text-slate-300">
                        "{currentQuestion.example}"
                      </em>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleNextQuestion}
                      className={`w-full rounded-lg px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
                        isCorrect
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-red-600 hover:bg-red-500"
                      }`}
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next Question →"
                        : "Finish"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ✨ MỚI: Component Màn hình kết thúc
const FinishedScreen = ({ score, total, onRestart }) => (
  <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-gray-900 text-white text-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      <h2 className="text-5xl font-bold">Topic Complete!</h2>
      <p className="mt-4 text-2xl text-slate-300">Your final score is:</p>
      <p className="my-8 text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
        {score} / {total}
      </p>
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 rounded-full bg-violet-600 px-8 py-4 text-xl font-semibold text-white shadow-xl shadow-violet-600/30 transition-transform"
      >
        <RefreshCw /> Choose Another Topic
      </motion.button>
    </motion.div>
  </div>
);

// --- Component Chính (được đơn giản hóa) ---
export default function ListeningGame() {
  const [gameState, setGameState] = useState("loading"); // loading, topic_selection, playing, finished
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  useEffect(() => {
    fetch("/vocabulary.json")
      .then((res) => res.json())
      .then((data) => {
        // Bạn có thể sử dụng dữ liệu mẫu tôi đã lưu nếu muốn
        // const myData = { "topics": [{"name": "Animals 🐘", "slug": "animals", ...}]};
        setTopics(data.topics);
        setGameState("topic_selection");
      })
      .catch((error) => {
        console.error("Failed to load vocabulary data:", error);
        setGameState("error");
      });

    // Tải giọng đọc sẵn
    if ("speechSynthesis" in window) {
      speechSynthesis.getVoices();
    }
  }, []);

  const handleTopicSelect = (topic) => {
    playSound(sounds.click);
    setCurrentTopic({
      ...topic,
      words: [...topic.words].sort(() => Math.random() - 0.5), // Xáo trộn câu hỏi ngay khi chọn
    });
    setGameState("playing");
  };

  const handleFinish = (score, total) => {
    setFinalScore({ score, total });
    setGameState("finished");
  };

  const handleRestart = () => {
    playSound(sounds.click);
    setGameState("topic_selection");
    setCurrentTopic(null);
  };

  if (gameState === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white text-2xl">
        Loading Vocabulary...
      </div>
    );
  }
  if (gameState === "error") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-red-500 text-2xl">
        Error: Could not load data.
      </div>
    );
  }
  if (gameState === "topic_selection") {
    return (
      <TopicSelectionScreen topics={topics} onSelect={handleTopicSelect} />
    );
  }
  if (gameState === "playing") {
    return (
      <GameScreen
        questions={currentTopic.words}
        onBack={handleRestart}
        onFinish={handleFinish}
      />
    );
  }
  if (gameState === "finished") {
    return (
      <FinishedScreen
        score={finalScore.score}
        total={finalScore.total}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
