import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shuffle, Volume2 } from "lucide-react";
import { decks } from "./flashcardData.js"; // Import dữ liệu từ file riêng

// --- Component Card chính ---
const Flashcard = ({ card, isFlipped, onFlip, onSpeak }) => {
  return (
    <div
      className="w-full h-64 md:h-80 cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Mặt trước của thẻ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/10 backdrop-blur-lg ring-1 ring-white/20 rounded-2xl shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {card.word}
          </h2>
          <p className="mt-2 text-lg text-cyan-300 font-mono">{card.ipa}</p>
        </div>

        {/* Mặt sau của thẻ */}
        <div
          className="absolute inset-0 flex flex-col p-6 bg-white/10 backdrop-blur-lg ring-1 ring-white/20 rounded-2xl shadow-2xl space-y-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-2xl font-bold text-white">{card.meaning}</p>
              <p className="text-sm text-cyan-300 uppercase tracking-widest">
                {card.type}
              </p>
            </div>
            <motion.button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn việc lật thẻ khi bấm nút loa
                onSpeak(card.word);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40"
            >
              <Volume2 className="h-6 w-6 text-cyan-300" />
            </motion.button>
          </div>
          <p className="text-base text-slate-200 flex-grow">
            <span className="font-semibold text-slate-400">Example: </span>
            <i>"{card.example}"</i>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Component chính của Game ---
export default function FlashcardGame() {
  const [deck, setDeck] = useState(decks[0].cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const speak = useCallback((text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const shuffleDeck = useCallback(() => {
    setDeck((prevDeck) => [...prevDeck].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const navigate = useCallback(
    (offset) => {
      setIsFlipped(false);
      setDirection(offset);
      // Dùng timeout nhỏ để thẻ kịp lật úp lại trước khi chuyển
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const newIndex = prev + offset;
          if (newIndex < 0) return deck.length - 1;
          if (newIndex >= deck.length) return 0;
          return newIndex;
        });
      }, 150);
    },
    [deck.length]
  );

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-white p-4 font-sans overflow-hidden">
      <div className="w-full max-w-xl">
        <h1 className="text-center text-3xl font-bold mb-4">
          English Flashcards
        </h1>

        {/* Thanh tiến trình */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-6">
          <motion.div
            className="bg-cyan-400 h-2 rounded-full"
            animate={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Khu vực Flashcard */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) navigate(1);
              else if (swipe > 10000) navigate(-1);
            }}
            className="h-64 md:h-80"
          >
            <Flashcard
              card={deck[currentIndex]}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((prev) => !prev)}
              onSpeak={speak}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bảng điều khiển */}
        <div className="mt-8 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronLeft className="h-8 w-8" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={shuffleDeck}
            className="p-4 rounded-full bg-cyan-500/80 text-slate-900 font-bold hover:bg-cyan-400"
          >
            <Shuffle className="h-8 w-8" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(1)}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20"
          >
            <ChevronRight className="h-8 w-8" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
