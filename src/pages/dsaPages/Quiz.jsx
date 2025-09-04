// src/components/Quiz.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Import

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  // Màn hình kết quả
  if (showResult) {
    return (
      <motion.div
        className="bg-white p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Hoàn thành!</h2>
        <p className="text-lg mb-6">
          Bạn đã trả lời đúng {score} / {questions.length} câu hỏi.
        </p>
        <button
          onClick={restartQuiz}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Làm lại
        </button>
      </motion.div>
    );
  }

  // Màn hình câu hỏi
  return (
    <div className="bg-white p-8 rounded-lg shadow-md overflow-hidden">
      {/* 👇 Bọc câu hỏi trong AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          // 👇 Dùng index làm key
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }} // Bắt đầu từ bên phải
          animate={{ opacity: 1, x: 0 }} // Đi vào giữa
          exit={{ opacity: 0, x: -50 }} // Thoát ra bên trái
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Câu hỏi {currentQuestionIndex + 1}/{questions.length}
          </h2>
          <p className="text-lg mb-6">
            {questions[currentQuestionIndex].question}
          </p>
          <div className="space-y-3">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`block w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedAnswer === option
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="text-right mt-6">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex < questions.length - 1
            ? "Câu tiếp"
            : "Hoàn thành"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
