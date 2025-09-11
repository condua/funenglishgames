import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Volume2,
  ArrowLeft,
} from "lucide-react";
import { decks } from "./flashcardData.js"; // Import dữ liệu từ file riêng
//flashcard games
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
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              {card.word}
            </h2>
            <motion.button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn việc lật thẻ khi bấm nút loa
                onSpeak(card.word);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40"
            >
              <Volume2 className="h-7 w-7 text-cyan-300" />
            </motion.button>
          </div>
          <p className="mt-2 text-lg text-cyan-300 font-mono">{card.ipa}</p>
        </div>

        {/* Mặt sau của thẻ */}
        <div
          className="absolute inset-0 flex flex-col p-6 bg-white/10 backdrop-blur-lg ring-1 ring-white/20 rounded-2xl shadow-2xl space-y-3"
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
                e.stopPropagation();
                onSpeak(card.word);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/20 hover:bg-black/40"
            >
              <Volume2 className="h-6 w-6 text-cyan-300" />
            </motion.button>
          </div>
          <div className="text-base text-slate-200 flex-grow space-y-2">
            <div>
              <span className="font-semibold text-slate-400">Example: </span>
              <i>"{card.example}"</i>
            </div>
            {card.exampleMeaning && (
              <div>
                <span className="font-semibold text-slate-400">Nghĩa: </span>
                <i className="text-slate-300">"{card.exampleMeaning}"</i>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Component chính của Game ---
export default function FlashcardGame() {
  const [gameState, setGameState] = useState("topic_selection"); // topic_selection, playing
  const [activeTopic, setActiveTopic] = useState(null);
  const [deck, setDeck] = useState([]);
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

  const handleTopicSelect = (topicSlug) => {
    const selectedDeck = decks.find((d) => d.slug === topicSlug);
    if (selectedDeck) {
      setActiveTopic(selectedDeck.topic);
      setDeck([...selectedDeck.cards].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      setIsFlipped(false);
      setGameState("playing");
    }
  };

  const handleBackToTopics = () => {
    setGameState("topic_selection");
    setActiveTopic(null);
  };

  const shuffleDeck = useCallback(() => {
    setDeck((prevDeck) => [...prevDeck].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const navigate = useCallback(
    (offset) => {
      setIsFlipped(false);
      setDirection(offset);
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
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  // Màn hình chọn chủ đề
  if (gameState === "topic_selection") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-white p-4 font-sans">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Choose a TOEIC Topic
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {decks.map((deck) => (
            <motion.button
              key={deck.slug}
              onClick={() => handleTopicSelect(deck.slug)}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 text-2xl font-semibold hover:bg-cyan-500/20 hover:ring-cyan-400 transition-all"
            >
              {deck.topic}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Màn hình chơi game
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 text-white p-4 font-sans overflow-hidden">
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <motion.button
            onClick={handleBackToTopics}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 text-cyan-300 hover:text-cyan-100"
          >
            <ArrowLeft size={20} /> Back to Topics
          </motion.button>
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            {activeTopic}
          </h1>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2 mb-6">
          <motion.div
            className="bg-cyan-400 h-2 rounded-full"
            animate={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

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
