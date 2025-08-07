import React, { useState, useEffect } from "react";

// --- Bước 1: Cập nhật cấu trúc dữ liệu với thông tin chi tiết ---
const createQuestion = (data) => ({
  ...data,
  correctAnswer: data.word,
});

const initialQuestions = [
  createQuestion({
    word: "Weather",
    options: ["Weather", "Whether", "Feather", "Leather"],
    ipa: "/ˈwɛðər/",
    type: "noun",
    meaning: "Thời tiết",
    example: "The weather is very nice today.",
  }),
  createQuestion({
    word: "Bicycle",
    options: ["Bicycle", "Article", "Vehicle", "Icicle"],
    ipa: "/ˈbaɪsɪkl/",
    type: "noun",
    meaning: "Xe đạp",
    example: "He rides his bicycle to work every day.",
  }),
  createQuestion({
    word: "Computer",
    options: ["Computer", "Commuter", "Competitor", "Compiler"],
    ipa: "/kəmˈpjuːtər/",
    type: "noun",
    meaning: "Máy tính",
    example: "I use my computer for both work and gaming.",
  }),
  createQuestion({
    word: "Mountain",
    options: ["Mountain", "Fountain", "Curtain", "Certain"],
    ipa: "/ˈmaʊntɪn/",
    type: "noun",
    meaning: "Ngọn núi",
    example: "That mountain is covered in snow.",
  }),
  createQuestion({
    word: "Strawberry",
    options: ["Strawberry", "Rosemary", "Blackberry", "Library"],
    ipa: "/ˈstrɔːbəri/",
    type: "noun",
    meaning: "Quả dâu tây",
    example: "She loves eating fresh strawberry with cream.",
  }),
  createQuestion({
    word: "Difficult",
    options: ["Difficult", "Different", "Dignified", "Terrific"],
    ipa: "/ˈdɪfɪkəlt/",
    type: "adjective",
    meaning: "Khó khăn",
    example: "This math problem is very difficult to solve.",
  }),
  createQuestion({
    word: "Library",
    options: ["Library", "Liberty", "Lingerie", "Littery"],
    ipa: "/ˈlaɪbrəri/",
    type: "noun",
    meaning: "Thư viện",
    example: "I need to return these books to the library.",
  }),
  createQuestion({
    word: "Tomorrow",
    options: ["Tomorrow", "Sorrow", "Borrow", "Marrow"],
    ipa: "/təˈmɒrəʊ/",
    type: "adverb & noun",
    meaning: "Ngày mai",
    example: "See you tomorrow!",
  }),
  createQuestion({
    word: "Vegetable",
    options: ["Vegetable", "Visible", "Valuable", "Eligible"],
    ipa: "/ˈvɛdʒtəbəl/",
    type: "noun",
    meaning: "Rau, củ",
    example: "You should eat more fresh vegetable.",
  }),
  createQuestion({
    word: "Congratulations",
    options: ["Congratulations", "Graduations", "Regulations", "Generations"],
    ipa: "/kənˌɡrætʃuˈleɪʃənz/",
    type: "exclamation",
    meaning: "Chúc mừng",
    example: "Congratulations on your new job!",
  }),
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function ListeningGame() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const speakWord = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      const voices = speechSynthesis.getVoices();
      utterance.voice =
        voices.find(
          (voice) => voice.lang === "en-US" && voice.name.includes("Google")
        ) || voices.find((voice) => voice.lang === "en-US");
      speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const startGame = () => {
    setQuestions(shuffleArray(initialQuestions));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizOver(false);
  };

  useEffect(() => {
    speechSynthesis.getVoices();
    startGame();
  }, []);

  const handlePlaySound = (text) => {
    speakWord(text);
  };

  // --- Bước 2: Bỏ setTimeout, chỉ cập nhật trạng thái ---
  const handleAnswerClick = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  // --- Bước 3: Thêm hàm xử lý cho nút "Next" ---
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsQuizOver(true);
    }
  };

  const getButtonClass = (option) => {
    // Chỉ hiển thị màu khi đã trả lời
    if (!isAnswered) return "bg-gray-700 hover:bg-violet-500";
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    const isSelected = option === selectedAnswer;
    if (isCorrect) return "bg-green-500 border-green-400";
    if (isSelected && !isCorrect) return "bg-red-500 border-red-400";
    return "bg-gray-700 opacity-50 border-gray-600";
  };

  // Các màn hình Loading và Game Over giữ nguyên...
  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-white text-2xl">
        Loading Game...
      </div>
    );
  }
  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-violet-800 text-white text-center p-4">
        <h2 className="text-5xl font-bold">You're a Listening Legend!</h2>
        <p className="mt-4 text-2xl">Final Score:</p>
        <p className="my-8 text-7xl font-extrabold">
          {score} / {questions.length}
        </p>
        <button
          onClick={startGame}
          className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-violet-800 shadow-xl transition-transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-gray-900 p-8 text-white shadow-2xl shadow-violet-500/20">
        <div className="mb-8 flex justify-between text-lg">
          <h1 className="font-bold text-violet-400">Listening Legend</h1>
          <p>
            Score: <span className="font-bold">{score}</span>
          </p>
        </div>

        {/* --- Bước 4: Hiển thị giao diện tùy theo trạng thái isAnswered --- */}

        {/* Giao diện khi CHƯA trả lời */}
        {!isAnswered && (
          <div className="text-center">
            <p className="mb-4 text-gray-300">Listen carefully to the word:</p>
            <button
              onClick={() => handlePlaySound(currentQuestion.word)}
              className="group rounded-full bg-violet-600 p-6 text-white shadow-lg transition-all duration-300 hover:bg-violet-500 hover:scale-110"
            >
              {/* SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 8.464a5 5 0 000 7.072m2.828 9.9a9 9 0 000-12.728M12 12h.01M8 12h.01M16 12h.01"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Các lựa chọn luôn hiển thị, nhưng bị vô hiệu hóa sau khi trả lời */}
        <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
              className={`rounded-lg border-2 border-transparent p-4 text-xl font-medium shadow-md transition-all duration-300 ${getButtonClass(
                option
              )}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Bảng thông tin từ vựng, chỉ hiện khi ĐÃ trả lời */}
        {isAnswered && (
          <div className="mt-6 rounded-lg bg-gray-800 p-5 animate-fade-in">
            <div className="mb-4 flex items-baseline justify-between border-b border-gray-700 pb-2">
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
                  Type:
                </strong>{" "}
                <span className="rounded-md bg-gray-700 px-2 py-1 text-sm font-medium">
                  {currentQuestion.type}
                </span>
              </p>
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
                <em className="inline-block max-w-[calc(100%-6.5rem)]">
                  "{currentQuestion.example}"
                </em>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleNextQuestion}
                className={`w-full rounded-lg px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 ${
                  isCorrect ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {isCorrect ? "Correct! Next →" : "Incorrect. Next →"}
              </button>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-8 h-2 w-full rounded-full bg-gray-700">
          <div
            className="h-2 rounded-full bg-violet-500 transition-all duration-300"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
