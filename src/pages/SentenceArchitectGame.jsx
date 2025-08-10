import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sentenceBlueprints } from "./sentenceBlueprints"; // Import dữ liệu

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
  sound.currentTime = 0;
  sound.play();
};

export default function SentenceArchitectGame() {
  const [gameState, setGameState] = useState("menu"); // menu, playing, levelComplete
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [slots, setSlots] = useState([]);
  const [feedback, setFeedback] = useState({ show: false, type: "idle" }); // idle, correct, incorrect

  const levelData = useMemo(
    () => sentenceBlueprints[currentLevel],
    [currentLevel]
  );
  const puzzle = useMemo(
    () => levelData?.puzzles[currentPuzzleIndex],
    [levelData, currentPuzzleIndex]
  );

  useEffect(() => {
    if (gameState === "playing" && puzzle) {
      setSlots([]);
      setBlocks(puzzle.blocks.sort(() => Math.random() - 0.5));
      setFeedback({ show: false, type: "idle" });
    }
  }, [gameState, puzzle]);

  const handleDrop = (block) => {
    playSound(sounds.drop);
    setSlots((prev) => [...prev, block]);
    setBlocks((prev) => prev.filter((b) => b !== block));
  };

  const handleReturnBlock = (block) => {
    setSlots((prev) => prev.filter((s) => s !== block));
    setBlocks((prev) => [...prev, block]);
  };

  const checkAnswer = () => {
    const isCorrect = slots.join(" ") === puzzle.correctOrder.join(" ");
    if (isCorrect) {
      playSound(sounds.correct);
      setFeedback({ show: true, type: "correct" });
    } else {
      playSound(sounds.incorrect);
      setFeedback({ show: true, type: "incorrect" });
    }
  };

  const nextChallenge = () => {
    if (currentPuzzleIndex < levelData.puzzles.length - 1) {
      setCurrentPuzzleIndex((prev) => prev + 1);
    } else {
      if (currentLevel < sentenceBlueprints.length - 1) {
        setGameState("levelComplete");
      } else {
        alert("Congratulations! You've completed all blueprints!");
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

  if (gameState === "menu") {
    return (
      <div className="min-h-screen w-full bg-slate-900 p-4 sm:p-8 text-white flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-2">Sentence Architect</h1>
        <p className="text-xl text-slate-400 mb-8">
          Build sentences from blueprints!
        </p>
        <div className="grid grid-cols-1 gap-4 w-full max-w-md">
          {sentenceBlueprints.map((level, index) => (
            <motion.button
              key={level.level}
              onClick={() => selectLevel(index)}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-lg bg-slate-800 text-left"
            >
              <p className="text-slate-400">Blueprint #{level.level}</p>
              <h2 className="text-2xl font-bold text-cyan-400">
                {level.title}
              </h2>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === "levelComplete") {
    return (
      <div className="min-h-screen w-full bg-slate-900 p-4 text-white flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-green-400">
          Blueprint Complete!
        </h2>
        <p className="text-xl mt-2">You've mastered the {levelData.title}.</p>
        <button
          onClick={nextLevel}
          className="mt-8 px-8 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg"
        >
          Next Blueprint
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 p-4 sm:p-8 text-white flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Blueprint Area */}
        <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/50">
          <p className="text-sm text-blue-300">Blueprint #{levelData.level}</p>
          <h2 className="text-2xl font-bold">{levelData.title}</h2>
          <p className="font-mono text-blue-300 mt-1">{levelData.formula}</p>
        </div>

        {/* Construction Area (Slots) */}
        <motion.div
          onDrop={(e) => {
            e.preventDefault();
            const blockData = e.dataTransfer.getData("text/plain");
            if (blockData) handleDrop(blockData);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="min-h-[8rem] bg-black/30 rounded-lg p-4 flex flex-wrap gap-3 items-center border-2 border-dashed border-slate-600"
        >
          {slots.map((slot) => (
            <motion.div
              key={slot}
              layout
              onClick={() => handleReturnBlock(slot)}
              className="p-3 bg-cyan-500 text-slate-900 font-semibold rounded-md cursor-pointer"
            >
              {slot}
            </motion.div>
          ))}
          {slots.length === 0 && (
            <p className="text-slate-500">
              Drag blocks here to build the sentence
            </p>
          )}
        </motion.div>

        {/* Block Bank */}
        <div className="mt-6 min-h-[8rem] bg-slate-800/50 rounded-lg p-4 flex flex-wrap gap-3 items-center">
          {blocks.map((block) => (
            <motion.div
              key={block}
              layout
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", block)}
              className="p-3 bg-slate-700 rounded-md cursor-grab active:cursor-grabbing"
            >
              {block}
            </motion.div>
          ))}
        </div>

        {/* Control & Feedback Area */}
        <div className="mt-6">
          <AnimatePresence>
            {feedback.show ? (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {feedback.type === "correct" && (
                  <div className="p-4 bg-green-600/30 border border-green-500 rounded-lg text-center">
                    <p className="text-xl font-bold text-green-300">
                      Correct! Well done, Architect!
                    </p>
                    {/* ✨ HIỂN THỊ NGHĨA CỦA CÂU TẠI ĐÂY ✨ */}
                    <p className="text-lg text-slate-300 mt-2">
                      <i>"{puzzle.meaning}"</i>
                    </p>
                    <button
                      onClick={nextChallenge}
                      className="mt-3 px-6 py-2 bg-white text-black font-bold rounded-md"
                    >
                      Next
                    </button>
                  </div>
                )}
                {feedback.type === "incorrect" && (
                  <div className="p-4 bg-red-600/30 border border-red-500 rounded-lg text-center">
                    <p className="text-xl font-bold text-red-300">
                      Not quite right. Try again.
                    </p>
                    <button
                      onClick={() => setFeedback({ show: false, type: "idle" })}
                      className="mt-3 px-6 py-2 bg-white text-black font-bold rounded-md"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.button
                key="check"
                onClick={checkAnswer}
                disabled={blocks.length > 0}
                className="w-full p-4 bg-amber-500 text-slate-900 font-bold text-xl rounded-lg disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Check Construction
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
