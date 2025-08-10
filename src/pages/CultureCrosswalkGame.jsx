import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scenarios } from "./socialScenarios.js";

// --- Âm thanh ---
const sounds = {
  correct: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
  ),
  incorrect: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
  ),
  select: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754667282/computer-mouse-click-351398_wrnaek.mp3"
  ),
  start: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754664206/gamestart-272829_ccnfqa.mp3"
  ),
};
Object.values(sounds).forEach((s) => (s.volume = 0.5));

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

// --- Component Progress Bar ---
const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-slate-700/50 rounded-full h-2.5">
      <motion.div
        className="bg-cyan-400 h-2.5 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.7)]"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default function CultureCrosswalkGame() {
  const [gameState, setGameState] = useState("menu"); // menu, playing, gameOver
  const [shuffledScenarios, setShuffledScenarios] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const currentScenario = useMemo(
    () => shuffledScenarios[currentScenarioIndex],
    [shuffledScenarios, currentScenarioIndex]
  );

  // ✅ THAY ĐỔI 1: Xáo trộn các lựa chọn cho mỗi câu hỏi
  const shuffledOptions = useMemo(() => {
    if (!currentScenario) return [];
    return [...currentScenario.options].sort(() => Math.random() - 0.5);
  }, [currentScenario]);

  const startGame = () => {
    playSound(sounds.start);
    setShuffledScenarios(scenarios.sort(() => Math.random() - 0.5));
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setScore(0);
    setGameState("playing");
  };

  const handleOptionSelect = (option) => {
    if (selectedOption) return;

    playSound(sounds.select);
    setSelectedOption(option);

    if (option.correct) {
      setTimeout(() => playSound(sounds.correct), 300);
      setScore((prev) => prev + 1);
    } else {
      setTimeout(() => playSound(sounds.incorrect), 300);
    }
  };

  const handleNext = () => {
    playSound(sounds.select);
    if (currentScenarioIndex < shuffledScenarios.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setGameState("gameOver");
    }
  };

  const getOptionClass = (option) => {
    const base = "ring-1 ring-white/10 shadow-lg backdrop-blur-sm text-white";
    if (!selectedOption) {
      return `${base} bg-slate-700/50 hover:bg-slate-600/70 hover:ring-white/20`;
    }
    if (option.correct) {
      return `${base} bg-green-500/80 ring-2 ring-white`;
    }
    if (option === selectedOption && !option.correct) {
      return `${base} bg-red-500/80`;
    }
    return `${base} bg-slate-800/50 opacity-60`;
  };

  if (gameState === "menu" || gameState === "gameOver") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-white p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center relative w-full max-w-2xl"
        >
          <a
            href="/games"
            className="absolute -top-8 left-0 text-cyan-300 hover:text-cyan-100 transition-colors text-lg flex items-center gap-2"
          >
            <span className="text-2xl">←</span> Quay lại
          </a>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
            Culture Crosswalk
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mt-2">
            Navigate real-life English conversations.
          </p>
          {gameState === "gameOver" && (
            <div className="mt-8">
              <p className="text-2xl">Your final score:</p>
              <p className="text-7xl font-bold my-4">
                {score} / {scenarios.length}
              </p>
            </div>
          )}
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 rounded-full bg-cyan-400 px-10 py-4 text-2xl font-bold text-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.7)]"
          >
            {gameState === "menu" ? "Start Learning" : "Play Again"}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 p-4 font-sans">
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-grow">
            <ProgressBar
              current={currentScenarioIndex + 1}
              total={scenarios.length}
            />
          </div>
          <div className="text-white font-semibold text-lg flex items-center gap-2">
            🏆 {score} / {scenarios.length}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 rounded-2xl p-6 shadow-lg">
              <p className="text-sm text-cyan-400 font-semibold mb-2">
                SITUATION {currentScenarioIndex + 1} / {scenarios.length}
              </p>
              <p className="text-xl md:text-2xl text-slate-100">
                {currentScenario.scenario}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {/* ✅ THAY ĐỔI 2: Render từ mảng shuffledOptions */}
              {shuffledOptions.map((option, index) => (
                <motion.button
                  key={option.text}
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!selectedOption}
                  whileHover={{ scale: selectedOption ? 1 : 1.03 }}
                  whileTap={{ scale: selectedOption ? 1 : 0.97 }}
                  className={`w-full p-4 rounded-lg text-left text-lg transition-all duration-300 flex items-center justify-between ${getOptionClass(
                    option
                  )}`}
                >
                  <span className="flex items-center">
                    <span className="mr-4 font-bold opacity-70 border border-white/20 rounded-md w-8 h-8 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option.text}
                  </span>
                  {selectedOption && (
                    <span className="text-2xl">
                      {option.correct
                        ? "✅"
                        : option === selectedOption
                        ? "❌"
                        : ""}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedOption && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: "1.5rem" }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-black/30 ring-1 ring-white/10 rounded-2xl p-6 overflow-hidden"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-2 flex items-center gap-2">
                💡 Cultural Insight
              </h3>
              <p className="text-slate-300 mb-4">{currentScenario.feedback}</p>
              <button
                onClick={handleNext}
                className="w-full rounded-lg bg-slate-100 py-3 text-lg font-bold text-slate-900"
              >
                Next Situation →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
