import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Dữ liệu các câu cho trò chơi ---
const initialSentences = [
  "The quick brown fox jumps over the lazy dog",
  "I love to learn English with fun games",
  "She reads a new book every week",
  "They are playing football in the park",
  "What is your favorite color",
  "The sun always shines brightly in the morning",
  "My brother works as a software engineer",
  "We are planning a trip to the mountains",
  "Can you please help me with my homework",
  "Elephants are the largest land animals",
];

// --- Utils ---
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function SentenceScrambleGame() {
  // State
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [wordBank, setWordBank] = useState([]);
  const [userSentence, setUserSentence] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | null
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const currentSentence = useMemo(
    () => sentences[currentSentenceIndex] || "",
    [sentences, currentSentenceIndex]
  );

  // Setup game
  const startGame = useCallback(() => {
    const shuffled = shuffleArray(initialSentences);
    setSentences(shuffled);
    setCurrentSentenceIndex(0);
    setScore(0);
    setIsQuizOver(false);
    setFeedback(null);
    setUserSentence([]);
    setWordBank([]);
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  // Setup new puzzle
  const setupNewSentence = useCallback(
    (index) => {
      const correctSentence = sentences[index];
      if (!correctSentence) return;
      const words = correctSentence.split(" ");
      setWordBank(shuffleArray(words));
      setUserSentence([]);
      setFeedback(null);
      setShake(false);
    },
    [sentences]
  );

  useEffect(() => {
    if (sentences.length > 0 && currentSentenceIndex < sentences.length) {
      setupNewSentence(currentSentenceIndex);
    }
  }, [currentSentenceIndex, sentences, setupNewSentence]);

  // Handlers
  const handleSelectWord = (word, idx) => {
    setUserSentence((prev) => [...prev, word]);
    setWordBank((prev) => prev.filter((_, i) => i !== idx));
    setFeedback(null);
  };

  const handleReturnWord = (idx) => {
    setWordBank((prev) => [...prev, userSentence[idx]]);
    setUserSentence((prev) => prev.filter((_, i) => i !== idx));
    setFeedback(null);
  };

  const handleCheckAnswer = () => {
    const built = userSentence.join(" ");
    if (built === currentSentence) {
      setFeedback("correct");
      setScore((s) => s + 1);
    } else {
      setFeedback("incorrect");
      setShake(true);
      setTimeout(() => setShake(false), 350);
    }
  };

  const handleNext = () => {
    const next = currentSentenceIndex + 1;
    if (next < sentences.length) {
      setCurrentSentenceIndex(next);
    } else {
      setIsQuizOver(true);
    }
  };

  const handleResetPuzzle = () => {
    setupNewSentence(currentSentenceIndex);
  };

  // Keyboard shortcuts: Enter = check/next, Backspace = remove last word
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter") {
        if (feedback === "correct") handleNext();
        else if (userSentence.length > 0) handleCheckAnswer();
      }
      if (e.key === "Backspace") {
        if (userSentence.length > 0) {
          e.preventDefault();
          handleReturnWord(userSentence.length - 1);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [feedback, userSentence.length]); // eslint-disable-line

  // Progress
  const progress =
    sentences.length === 0
      ? 0
      : Math.round((currentSentenceIndex / sentences.length) * 100);

  // --- Render ---
  if (sentences.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-300">
        Loading Game…
      </div>
    );
  }

  if (isQuizOver) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950">
        <GradientBackdrop />
        <div className="relative z-10 flex h-screen flex-col items-center justify-center text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-white"
          >
            Excellent Work! 🎉
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 text-lg sm:text-xl text-slate-300"
          >
            Your final score is
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.1,
            }}
            className="my-8 text-6xl sm:text-7xl font-black text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
          >
            {score} / {sentences.length}
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={startGame}
            className="rounded-2xl bg-white/95 px-8 py-3 text-slate-900 font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            Play Again
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Decorative gradient blobs */}
      <GradientBackdrop />

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sentence <span className="text-cyan-400">Scramble</span>
            </h1>
            <p className="text-slate-300/90 mt-1">
              Click từ để ghép thành câu hoàn chỉnh. (Enter: Check/Next •
              Backspace: trả từ)
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2">
              <span className="text-slate-400 text-sm">Score</span>
              <span className="text-white font-bold">{score}</span>
            </div>
            <div className="text-slate-400 text-sm mt-1">
              {currentSentenceIndex + 1} / {sentences.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-16">
        <motion.div
          layout
          className="mt-8 rounded-3xl border border-slate-800/70 bg-slate-900/60 backdrop-blur-md shadow-2xl"
        >
          {/* Top controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 border-b border-slate-800/70">
            <div className="text-sm text-slate-400">
              Build this sentence #{currentSentenceIndex + 1}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetPuzzle}
                className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200 border border-slate-700 hover:bg-slate-750/50"
              >
                Shuffle ↻
              </button>
              <button
                onClick={() => {
                  // hint = số từ đã chọn / tổng số từ
                  if (userSentence.length === 0) return;
                  handleReturnWord(userSentence.length - 1);
                }}
                className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200 border border-slate-700 hover:bg-slate-750/50"
              >
                Undo ⌫
              </button>
            </div>
          </div>

          {/* BUILDER AREA */}
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="p-4 sm:p-6"
          >
            <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 min-h-[6.5rem] p-4 flex flex-wrap items-center gap-2">
              {userSentence.length === 0 && (
                <span className="text-slate-500">
                  Click từ bên dưới để xây câu tại đây…
                </span>
              )}
              <AnimatePresence initial={false}>
                {userSentence.map((word, index) => (
                  <motion.button
                    key={`${word}-${index}`}
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReturnWord(index)}
                    className="rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 text-slate-900 font-semibold px-3 py-2 shadow hover:shadow-lg"
                    title="Nhấn để trả từ về Word Bank"
                  >
                    {word}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* WORD BANK */}
            <div className="mt-6 rounded-2xl bg-slate-900/40 border border-slate-800 p-4 sm:p-5">
              <div className="text-slate-400 text-sm mb-3">Word Bank</div>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence initial={false}>
                  {wordBank.map((word, index) => (
                    <motion.button
                      key={`${word}-${index}`}
                      layout
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -6, opacity: 0 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectWord(word, index)}
                      className="rounded-xl bg-slate-800 text-slate-200 px-3 py-2 border border-slate-700 hover:border-slate-600"
                    >
                      {word}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* FEEDBACK + ACTION */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="min-h-[2rem]">
                <AnimatePresence>
                  {feedback === "correct" && (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                    >
                      🎉 Correct! Great job.
                    </motion.div>
                  )}
                  {feedback === "incorrect" && (
                    <motion.div
                      key="no"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="px-3 py-2 rounded-lg bg-rose-500/20 border border-rose-500 text-rose-300"
                    >
                      🤔 Not quite. Try again!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {feedback === "correct" ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold px-6 py-3 shadow-lg hover:shadow-xl"
                >
                  Next →
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckAnswer}
                  disabled={userSentence.length === 0}
                  className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-900 font-semibold px-6 py-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/** Decorative gradient background */
function GradientBackdrop() {
  return (
    <>
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-28 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />
    </>
  );
}
