import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Âm thanh ---
const playSound = (src, volume = 0.5) => {
  const sound = new Audio(src);
  sound.volume = volume;
  sound.play().catch((e) => console.error("Audio play failed:", e));
};

const sounds = {
  incorrect:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3",
  correct:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3",
  suspense:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754664209/the-suspenseful-braam-334309_ggotug.mp3",
  start:
    "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754664206/gamestart-272829_ccnfqa.mp3",
};

// --- Dữ liệu Game ---
const prizeLevels = [
  "100.000",
  "200.000",
  "300.000",
  "500.000",
  "1.000.000",
  "2.000.000",
  "3.000.000",
  "6.000.000",
  "10.000.000",
  "14.000.000",
  "22.000.000",
  "30.000.000",
  "40.000.000",
  "60.000.000",
  "150.000.000",
].reverse();

const questions = [
  // Cấp 1-5 (Dễ)
  {
    question: "Thủ đô của Việt Nam là gì?",
    options: ["Hà Nội", "Đà Nẵng", "TP. Hồ Chí Minh", "Hải Phòng"],
    answer: "Hà Nội",
  },
  {
    question: "Đâu là một loại trái cây?",
    options: ["Cà rốt", "Khoai tây", "Táo", "Bắp cải"],
    answer: "Táo",
  },
  {
    question: "Mặt trời mọc ở hướng nào?",
    options: ["Tây", "Đông", "Bắc", "Nam"],
    answer: "Đông",
  },
  {
    question: "Một năm có bao nhiêu tháng?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "Loài vật nào sau đây sống dưới nước?",
    options: ["Gà", "Chó", "Cá", "Mèo"],
    answer: "Cá",
  },
  // Cấp 6-10 (Trung bình)
  {
    question: "Ai là người viết 'Truyện Kiều'?",
    options: [
      "Hồ Xuân Hương",
      "Nguyễn Du",
      "Nguyễn Trãi",
      "Bà Huyện Thanh Quan",
    ],
    answer: "Nguyễn Du",
  },
  {
    question: "Hành tinh nào gần Mặt trời nhất?",
    options: ["Trái Đất", "Sao Hỏa", "Sao Kim", "Sao Thủy"],
    answer: "Sao Thủy",
  },
  {
    question: "Công thức hóa học của nước là gì?",
    options: ["O2", "CO2", "H2O", "N2"],
    answer: "H2O",
  },
  {
    question: "Dãy núi dài nhất thế giới là gì?",
    options: ["Himalaya", "Andes", "Rocky", "Alps"],
    answer: "Andes",
  },
  {
    question: "Tác phẩm 'Mona Lisa' được vẽ bởi ai?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
  },
  // Cấp 11-15 (Khó)
  {
    question: "Nguyên tố nào có ký hiệu hóa học là 'Au'?",
    options: ["Bạc", "Chì", "Vàng", "Sắt"],
    answer: "Vàng",
  },
  {
    question: "Năm nào con người lần đầu tiên đặt chân lên Mặt trăng?",
    options: ["1965", "1969", "1972", "1975"],
    answer: "1969",
  },
  {
    question: "Trong thần thoại Hy Lạp, vị thần nào là vua của các vị thần?",
    options: ["Apollo", "Hades", "Poseidon", "Zeus"],
    answer: "Zeus",
  },
  {
    question: "Thành phố nào được mệnh danh là 'Thành phố vĩnh cửu'?",
    options: ["Athens", "Rome", "Jerusalem", "Cairo"],
    answer: "Rome",
  },
  {
    question: "Lý thuyết tương đối được phát triển bởi nhà khoa học nào?",
    options: [
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
      "Albert Einstein",
    ],
    answer: "Albert Einstein",
  },
];

export default function MillionaireGame() {
  const [gameState, setGameState] = useState("ready"); // ready, playing, gameOver, won
  const [level, setLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lockedAnswer, setLockedAnswer] = useState(null);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    audience: true,
  });
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [audiencePoll, setAudiencePoll] = useState(null);

  const currentQuestion = useMemo(() => questions[level], [level]);

  const resetForNextLevel = useCallback(() => {
    setSelectedAnswer(null);
    setLockedAnswer(null);
    setDisabledOptions([]);
    setAudiencePoll(null);
  }, []);

  const handleAnswerSelect = useCallback(
    (option) => {
      if (!lockedAnswer) {
        setSelectedAnswer(option);
      }
    },
    [lockedAnswer]
  );

  const handleLockAnswer = useCallback(() => {
    if (!selectedAnswer) return;
    playSound(sounds.suspense, 0.3);
    setLockedAnswer(selectedAnswer);

    setTimeout(() => {
      const isCorrect = selectedAnswer === currentQuestion.answer;
      if (isCorrect) {
        playSound(sounds.correct);
        setTimeout(() => {
          if (level === questions.length - 1) {
            setGameState("won");
          } else {
            setLevel((l) => l + 1);
            resetForNextLevel();
          }
        }, 1500);
      } else {
        playSound(sounds.incorrect);
        setTimeout(() => setGameState("gameOver"), 1500);
      }
    }, 3500);
  }, [selectedAnswer, currentQuestion, level, resetForNextLevel]);

  const useLifeline = useCallback(
    (type) => {
      if (type === "fiftyFifty" && lifelines.fiftyFifty) {
        const incorrect = currentQuestion.options.filter(
          (o) => o !== currentQuestion.answer
        );
        const toRemove = incorrect.sort(() => 0.5 - Math.random()).slice(0, 2);
        setDisabledOptions(toRemove);
        setLifelines((l) => ({ ...l, fiftyFifty: false }));
      }
      if (type === "audience" && lifelines.audience) {
        const poll = {};
        const correctAnswer = currentQuestion.answer;
        let remainingPct = 100;
        const options = currentQuestion.options.filter(
          (o) => !disabledOptions.includes(o)
        );

        options.forEach((opt) => {
          if (opt === correctAnswer) {
            const pct = 50 + Math.floor(Math.random() * 25);
            poll[opt] = pct;
            remainingPct -= pct;
          }
        });
        options
          .filter((o) => o !== correctAnswer)
          .forEach((opt, idx, arr) => {
            if (idx === arr.length - 1) {
              poll[opt] = remainingPct;
            } else {
              const pct = Math.floor(
                (Math.random() * remainingPct) / (arr.length - idx)
              );
              poll[opt] = pct;
              remainingPct -= pct;
            }
          });
        setAudiencePoll(poll);
        setLifelines((l) => ({ ...l, audience: false }));
      }
    },
    [lifelines, currentQuestion, disabledOptions]
  );

  const resetGame = useCallback(() => {
    playSound(sounds.start);
    setGameState("playing");
    setLevel(0);
    resetForNextLevel();
    setLifelines({ fiftyFifty: true, audience: true });
  }, [resetForNextLevel]);

  const getOptionClass = (option) => {
    if (lockedAnswer) {
      if (option === currentQuestion.answer)
        return "bg-green-600 animate-pulse ring-2 ring-white";
      if (option === lockedAnswer) return "bg-red-600";
    }
    if (selectedAnswer === option) return "bg-orange-500 ring-2 ring-white";
    if (disabledOptions.includes(option))
      return "opacity-40 pointer-events-none";
    return "bg-blue-800 hover:bg-blue-700";
  };

  // --- Màn hình Bắt đầu / Kết thúc ---
  if (gameState !== "playing") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-white font-sans">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8"
        >
          <h1 className="text-5xl font-bold">Ai Là Triệu Phú</h1>
          {gameState !== "ready" && (
            <div className="mt-6">
              <p className="text-3xl">Bạn đã giành được</p>
              <p className="text-6xl font-bold text-yellow-400 my-4">
                {level > 0 ? prizeLevels[prizeLevels.length - level] : "0"} VNĐ
              </p>
            </div>
          )}
          {gameState === "won" && (
            <p className="text-4xl text-green-400 mt-2">
              XIN CHÚC MỪNG BẠN LÀ TRIỆU PHÚ!
            </p>
          )}
          <button
            onClick={resetGame}
            className="mt-8 rounded-lg bg-blue-600 px-8 py-4 text-2xl hover:bg-blue-500 transition-colors"
          >
            {gameState === "ready" ? "Bắt đầu" : "Chơi lại"}
          </button>
        </motion.div>
      </div>
    );
  }

  // --- Giao diện chơi game chính ---
  return (
    <div className="flex h-screen w-full flex-col lg:flex-row bg-slate-900 text-white font-sans p-2 sm:p-4 gap-4">
      {/* Cột chính (Câu hỏi & Trả lời) */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex justify-around mb-4">
          {Object.entries(lifelines).map(([key, isAvailable]) => (
            <button
              key={key}
              onClick={() => useLifeline(key)}
              disabled={!isAvailable || lockedAnswer}
              className="p-3 text-2xl bg-purple-700 rounded-full disabled:opacity-40 disabled:bg-gray-600 transition-transform hover:scale-110"
            >
              {key === "fiftyFifty" ? "50:50" : "📊"}
            </button>
          ))}
        </div>

        {audiencePoll && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg mb-4 absolute top-16 left-4 right-4 lg:left-auto lg:right-auto z-10 w-auto"
          >
            <h3 className="text-center mb-2">Khán giả bình chọn:</h3>
            <div className="flex justify-around items-end gap-4 h-32">
              {Object.entries(audiencePoll).map(([opt, pct]) => (
                <div
                  key={opt}
                  className="text-center flex flex-col justify-end h-full"
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    className="w-8 sm:w-12 bg-blue-500 rounded-t-md"
                  ></motion.div>
                  <p className="text-xs mt-1">{opt.substring(0, 5)}</p>
                  <p className="font-bold text-sm">{pct}%</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setAudiencePoll(null)}
              className="w-full mt-2 bg-red-600/80 text-xs py-1 rounded hover:bg-red-500"
            >
              Đóng
            </button>
          </motion.div>
        )}

        <motion.div
          key={level}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-900/50 ring-2 ring-blue-500 rounded-lg p-6 flex items-center justify-center text-center text-xl sm:text-3xl flex-grow"
        >
          <p>{currentQuestion.question}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <AnimatePresence>
            {currentQuestion.options.map((option, i) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                onClick={() => handleAnswerSelect(option)}
                disabled={lockedAnswer || disabledOptions.includes(option)}
                className={`p-4 rounded-lg text-lg text-left transition-all duration-300 ${getOptionClass(
                  option
                )}`}
              >
                <span className="font-bold text-orange-400">
                  {String.fromCharCode(65 + i)}:
                </span>{" "}
                {option}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={handleLockAnswer}
          disabled={!selectedAnswer || lockedAnswer}
          className="w-full mt-6 bg-green-700 p-4 rounded-lg text-2xl font-bold hover:bg-green-600 disabled:bg-gray-600 transition-colors"
        >
          CHỐT ĐÁP ÁN
        </button>
      </div>

      {/* Cột phụ (Thang tiền thưởng) */}
      <div className="flex-shrink-0 w-full lg:w-72 bg-slate-800/60 p-4 rounded-lg mt-4 lg:mt-0">
        <ul className="flex flex-row-reverse flex-wrap justify-center lg:flex-col gap-1">
          {prizeLevels.map((prize, i) => (
            <motion.li
              key={prize}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: i * 0.05 } }}
              className={`p-2 rounded-md text-sm sm:text-base text-right transition-colors duration-300
                ${
                  level === prizeLevels.length - 1 - i
                    ? "bg-orange-500 animate-pulse"
                    : ""
                }
                ${
                  [4, 9, 14].includes(prizeLevels.length - 1 - i)
                    ? "font-bold text-white"
                    : "text-gray-300"
                }
              `}
            >
              <span className="text-gray-500 mr-2">
                {prizeLevels.length - i}
              </span>
              {prize} VNĐ
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
