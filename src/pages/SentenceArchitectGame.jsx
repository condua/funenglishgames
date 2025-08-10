import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sentenceBlueprints } from "./sentenceBlueprints";

// --- Âm thanh ---
const sounds = {
  incorrect: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3"
  ),
  correct: new Audio(
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
  ),
  drop: new Audio(
    "https://cdn.pixabay.com/audio/2021/08/04/audio_5427f7a8b8.mp3"
  ),
};
Object.values(sounds).forEach((s) => (s.volume = 0.5));
const playSound = (sound) => {
  try {
    sound.currentTime = 0;
    sound.play();
  } catch {}
};

// --- Helper UI ---
function GradientBackdrop() {
  return (
    <>
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.08),transparent_50%)]" />
    </>
  );
}

// --- Utils ---
const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const uniqById = (arr) => {
  const seen = new Set();
  return arr.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true)));
};
const makeBlocks = (strings) =>
  shuffle(strings).map((text) => ({ id: newId(), text }));

export default function SentenceArchitectGame() {
  const [gameState, setGameState] = useState("menu"); // menu | playing | levelComplete
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);

  // Dùng {id, text} để phân biệt các từ giống nhau
  const [blocks, setBlocks] = useState([]); // word bank
  const [slots, setSlots] = useState([]); // constructed sentence

  const [feedback, setFeedback] = useState({ show: false, type: "idle" }); // idle | correct | incorrect
  const [shake, setShake] = useState(false);

  const levelData = useMemo(
    () => sentenceBlueprints[currentLevel],
    [currentLevel]
  );
  const puzzle = useMemo(
    () => levelData?.puzzles[currentPuzzleIndex],
    [levelData, currentPuzzleIndex]
  );

  // Init puzzle
  useEffect(() => {
    if (gameState === "playing" && puzzle) {
      setSlots([]);
      setBlocks(makeBlocks(puzzle.blocks)); // tạo block có id duy nhất
      setFeedback({ show: false, type: "idle" });
      setShake(false);
    }
  }, [gameState, puzzle]);

  // --- Safe moves (anti-duplicate) ---
  const addToSlots = (item) => {
    // chỉ move nếu item còn trong bank và chưa có trong slots
    const existsInBank = blocks.some((b) => b.id === item.id);
    const existsInSlots = slots.some((s) => s.id === item.id);
    if (!existsInBank || existsInSlots) return;

    playSound(sounds.drop);
    setSlots((prev) => uniqById([...prev, item]));
    setBlocks((prev) => prev.filter((b) => b.id !== item.id));
  };

  const returnToBank = (itemId) => {
    const found = slots.find((s) => s.id === itemId);
    if (!found) return;

    // nếu bank đã có id này thì bỏ qua
    const existsInBank = blocks.some((b) => b.id === itemId);
    if (existsInBank) {
      // chỉ cần bỏ khỏi slots
      setSlots((prev) => prev.filter((s) => s.id !== itemId));
      return;
    }

    setSlots((prev) => prev.filter((s) => s.id !== itemId));
    setBlocks((prev) => uniqById([...prev, found]));
  };

  // --- Drag & Drop ---
  const parseDataTransfer = (dt) => {
    // Ưu tiên application/json
    let json = dt.getData("application/json");
    if (!json) json = dt.getData("text/plain");
    if (!json) return null;

    try {
      const p = JSON.parse(json);
      if (p && p.id && p.text) return p;
    } catch {
      // fallback by text (ít dùng, chỉ khi kéo từ nguồn ngoài)
      const t = json;
      const byText = blocks.find((b) => b.text === t);
      if (byText) return { id: byText.id, text: byText.text };
    }
    return null;
  };

  const onDropToSlots = (e) => {
    e.preventDefault();
    const payload = parseDataTransfer(e.dataTransfer);
    if (!payload) return;
    const item = blocks.find((b) => b.id === payload.id);
    if (item) addToSlots(item);
  };

  // --- Actions ---
  const checkAnswer = () => {
    const built = slots.map((s) => s.text).join(" ");
    const answer = puzzle.correctOrder.join(" ");
    const isCorrect = built === answer;

    if (isCorrect) {
      playSound(sounds.correct);
      setFeedback({ show: true, type: "correct" });
    } else {
      playSound(sounds.incorrect);
      setFeedback({ show: true, type: "incorrect" });
      setShake(true);
      setTimeout(() => setShake(false), 350);
    }
  };

  const nextChallenge = () => {
    if (currentPuzzleIndex < levelData.puzzles.length - 1) {
      setCurrentPuzzleIndex((prev) => prev + 1);
      setFeedback({ show: false, type: "idle" });
    } else {
      if (currentLevel < sentenceBlueprints.length - 1) {
        setGameState("levelComplete");
      } else {
        alert("🎉 Congratulations! You've completed all blueprints!");
        setGameState("menu");
      }
    }
  };

  const nextLevel = () => {
    setCurrentLevel((prev) => prev + 1);
    setCurrentPuzzleIndex(0);
    setGameState("playing");
  };

  const selectLevel = (levelIndex) => {
    setCurrentLevel(levelIndex);
    setCurrentPuzzleIndex(0);
    setGameState("playing");
  };

  const shuffleBlocks = () => setBlocks((prev) => shuffle(prev));

  const undoLast = () => {
    // trả block cuối từ slots về bank (không trùng id)
    setSlots((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setBlocks((b) => (b.some((x) => x.id === last.id) ? b : [...b, last]));
      return prev.slice(0, -1);
    });
  };

  // --- MENU ---
  if (gameState === "menu") {
    return (
      <div className="relative min-h-screen bg-slate-950 text-white">
        <GradientBackdrop />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Sentence <span className="text-cyan-400">Architect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 text-slate-300"
          >
            Build sentences from blueprints. Chọn một blueprint để bắt đầu!
          </motion.p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sentenceBlueprints.map((level, index) => (
              <motion.button
                key={level.level}
                onClick={() => selectLevel(index)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-2xl text-left border border-slate-800/80 bg-slate-900/60 backdrop-blur p-5"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Blueprint #{level.level}
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-cyan-300">
                    {level.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                    {level.explanation}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-1 text-xs text-slate-300">
                    {level.puzzles.length} puzzles
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- LEVEL COMPLETE ---
  if (gameState === "levelComplete") {
    return (
      <div className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <GradientBackdrop />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl font-extrabold text-emerald-400">
            Blueprint Complete!
          </h2>
          <p className="text-lg mt-2 text-slate-300">
            You&apos;ve mastered the{" "}
            <span className="font-semibold">{levelData.title}</span>.
          </p>
          <button
            onClick={nextLevel}
            className="mt-8 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-bold shadow-lg hover:shadow-xl"
          >
            Next Blueprint →
          </button>
        </div>
      </div>
    );
  }

  // --- PLAYING ---
  const progress = levelData?.puzzles?.length
    ? Math.round((currentPuzzleIndex / levelData.puzzles.length) * 100)
    : 0;

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <GradientBackdrop />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Blueprint #{levelData.level}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              {levelData.title}
            </h2>
            <p className="font-mono text-cyan-300/90 mt-1">
              {levelData.formula}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2">
              <span className="text-slate-400 text-sm">Puzzle</span>
              <span className="text-white font-bold">
                {currentPuzzleIndex + 1}/{levelData.puzzles.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
          />
        </div>

        {/* Card */}
        <motion.div
          layout
          className="mt-6 rounded-3xl border border-slate-800/70 bg-slate-900/60 backdrop-blur-md shadow-2xl"
        >
          {/* Top controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 border-b border-slate-800/70">
            <div className="text-sm text-slate-400">
              Drag blocks to build the sentence. Click từ trong khung để trả về.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={shuffleBlocks}
                className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200 border border-slate-700 hover:bg-slate-800/80"
              >
                Shuffle ↻
              </button>
              <button
                onClick={undoLast}
                className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200 border border-slate-700 hover:bg-slate-800/80"
              >
                Undo ⌫
              </button>
            </div>
          </div>

          {/* Construction Area (Slots) */}
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            onDrop={onDropToSlots}
            onDragOver={(e) => e.preventDefault()}
            className="min-h-[8rem] bg-slate-900/40 rounded-3xl p-4 sm:p-6 flex flex-wrap gap-3 items-center border-2 border-dashed border-slate-700 m-4"
          >
            {slots.length === 0 && (
              <p className="text-slate-500">
                Drag blocks here to build the sentence…
              </p>
            )}
            <AnimatePresence initial={false}>
              {slots.map((slot) => (
                <motion.div
                  key={slot.id}
                  layout
                  onClick={() => returnToBank(slot.id)}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-2 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 text-slate-900 font-semibold cursor-pointer shadow hover:shadow-lg"
                  title="Nhấn để trả block về Word Bank"
                >
                  {slot.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Block Bank */}
          <div className="mb-6 mx-4 rounded-2xl bg-slate-900/40 border border-slate-800 p-4 sm:p-5">
            <div className="text-slate-400 text-sm mb-3">Word Bank</div>
            <div className="flex flex-wrap gap-2 items-center">
              <AnimatePresence initial={false}>
                {blocks.map((block) => (
                  <motion.div
                    key={block.id}
                    layout
                    draggable
                    onDragStart={(e) => {
                      const payload = JSON.stringify({
                        id: block.id,
                        text: block.text,
                      });
                      e.dataTransfer.setData("application/json", payload);
                      e.dataTransfer.setData("text/plain", payload);
                    }}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -6, opacity: 0 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 cursor-grab active:cursor-grabbing"
                    title="Kéo thả vào khung trên"
                    onClick={() => addToSlots(block)} // click cũng move (chặn trùng id bên trong)
                  >
                    {block.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Control & Feedback Area */}
          <div className="px-4 sm:px-6 pb-6">
            <AnimatePresence>
              {feedback.show ? (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {feedback.type === "correct" && (
                    <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-center">
                      <p className="text-xl font-bold text-emerald-300">
                        ✅ Correct! Well done, Architect!
                      </p>
                      <p className="text-lg text-slate-200 mt-2 italic">
                        “{puzzle.meaning}”
                      </p>
                      <button
                        onClick={nextChallenge}
                        className="mt-3 px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-bold shadow hover:shadow-lg"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                  {feedback.type === "incorrect" && (
                    <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500 text-center">
                      <p className="text-xl font-bold text-rose-300">
                        ❌ Not quite right. Try again.
                      </p>
                      <button
                        onClick={() =>
                          setFeedback({ show: false, type: "idle" })
                        }
                        className="mt-3 px-6 py-2 rounded-xl bg-white/95 text-slate-900 font-bold shadow hover:shadow-lg"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  key="check"
                  whileTap={{ scale: 0.98 }}
                  onClick={checkAnswer}
                  disabled={blocks.length > 0 || slots.length === 0}
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-900 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Construction
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
