import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ✨ THAY ĐỔI 1: Thêm hiệu ứng âm thanh ---
// Tạo sẵn các đối tượng Audio để tái sử dụng, giúp tăng hiệu năng.
const correctSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
);
const incorrectSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
);
correctSound.volume = 0.5;
incorrectSound.volume = 0.4;

// --- Dữ liệu "Vụ án" (Không thay đổi) ---
const caseFiles = [
  {
    id: 1,
    title: "The Weekend Plan",
    context: "Một đoạn tin nhắn giữa hai người bạn. Hãy tìm ra lỗi sai.",
    textWithMistake:
      "I am going to the movies with my friends tomorrow. We will having a great time.",
    error: {
      word: "having",
      correction: "have",
      options: ["have", "had", "to have"],
      explanation:
        "Sau động từ khuyết thiếu 'will', chúng ta sử dụng động từ nguyên thể không 'to'.",
    },
  },
  {
    id: 2,
    title: "The Study Session",
    context:
      "Một người đang kể về bạn của mình. Lỗi sai nằm ở sự hòa hợp chủ-vị.",
    textWithMistake: "One of my friends are coming over to study.",
    error: {
      word: "are",
      correction: "is",
      options: ["is", "were", "be"],
      explanation:
        "Chủ ngữ chính là 'One' (Một trong những người bạn), là số ít. Vì vậy, động từ phải là 'is'.",
    },
  },
  {
    id: 3,
    title: "The Unlikely Advice",
    context:
      "Một người bạn đang đưa ra lời khuyên. Có gì đó không đúng trong câu giả định...",
    textWithMistake: "If I was you, I would take that job opportunity.",
    error: {
      word: "was",
      correction: "were",
      options: ["were", "am", "be"],
      explanation:
        "Trong câu điều kiện loại 2 (giả định trái với sự thật ở hiện tại), ta luôn dùng 'were' cho tất cả các ngôi.",
    },
  },
  {
    id: 4,
    title: "The Confusing Trip",
    context:
      "Email kể về một chuyến đi. Hãy tìm ra điểm bất hợp lý về thời gian.",
    textWithMistake: "Last year, we visit the beautiful city of Paris.",
    error: {
      word: "visit",
      correction: "visited",
      options: ["visited", "will visit", "are visiting"],
      explanation:
        "'Last year' là dấu hiệu của quá khứ, vì vậy động từ phải ở thì Quá khứ đơn (V-ed).",
    },
  },
  {
    id: 5,
    title: "The Eager Student",
    context:
      "Một học sinh đang nói về sở thích của mình. Sai lầm nằm ở giới từ.",
    textWithMistake: "I am very interested on learning about space.",
    error: {
      word: "on",
      correction: "in",
      options: ["in", "at", "about"],
      explanation:
        "Cụm từ cố định (collocation) chính xác là 'to be interested in something'.",
    },
  },
];

const Word = ({ text, onClick, isSelected, isDisabled }) => {
  const baseClasses =
    "inline-block cursor-pointer rounded-lg px-2 py-1 transition-all duration-200 ease-in-out";
  const selectedClasses =
    "bg-amber-400 text-slate-900 ring-2 ring-amber-500 scale-105";
  const disabledClasses = "cursor-not-allowed text-slate-400";
  const normalClasses = "text-slate-300 hover:bg-slate-700";

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.span
      variants={variants}
      onClick={isDisabled ? undefined : onClick}
      className={`${baseClasses} ${
        isDisabled
          ? disabledClasses
          : isSelected
          ? selectedClasses
          : normalClasses
      }`}
    >
      {text}
    </motion.span>
  );
};

export default function DetectiveGame() {
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState("identifying");
  const [selectedWordInfo, setSelectedWordInfo] = useState(null);
  const [isCorrectAttempt, setIsCorrectAttempt] = useState(null);
  const [score, setScore] = useState(0);

  const currentCase = useMemo(
    () => cases[currentCaseIndex],
    [cases, currentCaseIndex]
  );
  const sentenceWords = useMemo(
    () => currentCase?.textWithMistake.split(" ") || [],
    [currentCase]
  );

  useEffect(() => {
    setCases(caseFiles.sort(() => Math.random() - 0.5));
  }, []);

  const handleNextCase = () => {
    if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
      setGamePhase("identifying");
      setSelectedWordInfo(null);
      setIsCorrectAttempt(null);
    } else {
      setGamePhase("gameOver");
    }
  };

  const restartGame = () => {
    setCases(caseFiles.sort(() => Math.random() - 0.5));
    setCurrentCaseIndex(0);
    setGamePhase("identifying");
    setSelectedWordInfo(null);
    setIsCorrectAttempt(null);
    setScore(0);
  };

  const handleWordClick = (word, index) => {
    if (gamePhase !== "identifying") return;
    const cleanedWord = word.replace(/[,.]/g, "");
    setSelectedWordInfo({ word: cleanedWord, index });
    if (cleanedWord === currentCase.error.word) {
      // ✨ THAY ĐỔI 2: Phát âm thanh ĐÚNG khi tìm ra lỗi
      correctSound.play();
      setTimeout(() => setGamePhase("correcting"), 500);
    } else {
      // ✨ THAY ĐỔI 3: Phát âm thanh SAI khi chọn sai
      incorrectSound.play();
    }
  };

  const handleCorrection = (option) => {
    if (gamePhase !== "correcting") return;
    setGamePhase("result");
    if (option === currentCase.error.correction) {
      // ✨ THAY ĐỔI 4: Phát âm thanh ĐÚNG khi sửa lỗi thành công
      correctSound.play();
      setIsCorrectAttempt(true);
      setScore((s) => s + 1);
    } else {
      // ✨ THAY ĐỔI 5: Phát âm thanh SAI khi sửa lỗi thất bại
      incorrectSound.play();
      setIsCorrectAttempt(false);
    }
  };

  if (cases.length === 0)
    return (
      <div className="bg-slate-900 h-screen w-screen flex items-center justify-center text-white">
        Loading Detective Files...
      </div>
    );

  if (gamePhase === "gameOver") {
    return (
      <div className="h-screen w-screen bg-slate-900 flex items-center justify-center text-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 bg-slate-800 rounded-xl shadow-lg"
        >
          <h1 className="text-4xl font-bold text-amber-400">
            All Cases Closed!
          </h1>
          <p className="text-2xl mt-4">
            Final Score: {score}/{cases.length}
          </p>
          <button
            onClick={restartGame}
            className="mt-8 rounded-lg bg-amber-500 px-6 py-3 text-xl font-bold text-slate-900 hover:bg-amber-400 transition-colors"
          >
            Start a New Investigation
          </button>
        </motion.div>
      </div>
    );
  }

  const sentenceContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };
  const actionPanelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-2xl h-full sm:h-[95vh] sm:max-h-[750px] bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 p-4 border-b border-white/10 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              Dialogue Detective
            </h1>
            <p className="text-sm text-amber-400">Case #{currentCase?.id}</p>
          </div>
          <div className="text-right">
            <p className="text-lg sm:text-xl font-bold text-white">{score}</p>
            <p className="text-sm text-slate-400">Score</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentCase?.id}
          >
            <div className="bg-black/20 p-4 rounded-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-2">
                {currentCase?.title}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                <strong>Tình huống:</strong> <i>{currentCase?.context}</i>
              </p>
            </div>
            <motion.div
              key={currentCase?.id + "-sentence"}
              variants={sentenceContainerVariants}
              initial="hidden"
              animate="visible"
              className="bg-black/20 min-h-[12rem] rounded-lg p-4 sm:p-6 text-2xl sm:text-3xl leading-relaxed space-x-2"
            >
              {sentenceWords.map((word, index) => (
                <Word
                  key={`${index}-${word}`}
                  text={word}
                  onClick={() => handleWordClick(word, index)}
                  isSelected={selectedWordInfo?.index === index}
                  isDisabled={gamePhase !== "identifying"}
                />
              ))}
            </motion.div>
          </motion.div>
        </main>

        {/* Action Panel */}
        <footer className="flex-shrink-0 p-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
          <div className="w-full min-h-[140px]">
            <AnimatePresence mode="wait">
              {gamePhase === "identifying" && (
                <motion.div
                  key="identifying"
                  variants={actionPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <p className="text-lg text-amber-400 font-semibold">
                    FIND THE MISTAKE
                  </p>
                  <p className="text-slate-400 mt-2">
                    Chạm vào từ bạn cho là sai trong đoạn văn bản trên.
                  </p>
                </motion.div>
              )}
              {gamePhase === "correcting" && (
                <motion.div
                  key="correcting"
                  variants={actionPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className="text-lg text-amber-400 font-semibold mb-3 text-center">
                    Correct the word: "
                    <span className="text-white">{selectedWordInfo?.word}</span>
                    "
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCase?.error.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleCorrection(option)}
                        className="w-full rounded-lg bg-slate-600 p-3 text-lg text-white transition-colors hover:bg-slate-500"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {gamePhase === "result" && (
                <motion.div
                  key="result"
                  variants={actionPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`p-4 rounded-lg text-white ${
                    isCorrectAttempt
                      ? "bg-green-600/30 ring-1 ring-green-500"
                      : "bg-red-600/30 ring-1 ring-red-500"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">
                    {isCorrectAttempt ? "Excellent!" : "Incorrect."}
                  </h3>
                  <p className="text-base mb-4">
                    {currentCase?.error.explanation}
                  </p>
                  <button
                    onClick={handleNextCase}
                    className="w-full rounded-lg bg-slate-100 py-3 text-lg font-bold text-slate-900 transition-colors hover:bg-white"
                  >
                    Next Case →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </footer>
      </div>
    </div>
  );
}
