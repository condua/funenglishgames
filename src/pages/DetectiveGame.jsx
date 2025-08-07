import React, { useState, useEffect, useMemo } from "react";

// --- Dữ liệu "Vụ án" ---
const caseFiles = [
  {
    id: 1,
    title: "The Case of the Weekend Plan",
    context: "Một đoạn tin nhắn giữa hai người bạn. Hãy tìm ra lỗi sai.",
    text: "I am going to the movies with my friends tomorrow. Do you want to come with us?",
    error: {
      word: "am going",
      correction: "will go",
      options: ["will go", "went", "goes"],
      explanation:
        "Khi đưa ra một quyết định tự phát ngay tại thời điểm nói, chúng ta dùng thì Tương lai đơn (will + V). 'Be going to' dùng cho kế hoạch đã định trước.",
    },
  },
  {
    id: 2,
    title: "The Case of the Misplaced Book",
    context: "Một học sinh báo cáo với thủ thư. Lỗi sai nằm ở đâu?",
    text: "I can't find my book. I think I left it on the table yesterday.",
    error: {
      word: "on",
      correction: "on", // Correct word is 'on', let's find a better example.
      // Let's change this case to be more interesting.
      // New Case: Subject-verb agreement
      word: "are", // Incorrect word in the sentence
      correction: "is", // The correct word
      options: ["is", "were", "be"],
      explanation:
        "Chủ ngữ 'One of my friends' là số ít, vì vậy động từ phải là 'is'.",
    },
    // Let's rewrite the text for the new case
    text: "One of my friends are coming over to study.",
  },
  {
    id: 3,
    title: "The Case of the Strange Advice",
    context: "Một người bạn đang đưa ra lời khuyên. Có gì đó không đúng...",
    text: "If I was you, I would take that job opportunity.",
    error: {
      word: "was",
      correction: "were",
      options: ["were", "am", "be"],
      explanation:
        "Trong câu điều kiện loại 2, chúng ta dùng 'were' cho tất cả các ngôi (kể cả I, he, she, it) để diễn tả một giả định trái với sự thật.",
    },
  },
  {
    id: 4,
    title: "The Case of the Confusing Trip",
    context:
      "Email kể về một chuyến đi. Hãy tìm ra điểm bất hợp lý về thời gian.",
    text: "Last year, we visit the beautiful city of Paris.",
    error: {
      word: "visit",
      correction: "visited",
      options: ["visited", "will visit", "are visiting"],
      explanation:
        "Cụm từ 'Last year' chỉ thời gian trong quá khứ, vì vậy chúng ta phải dùng thì Quá khứ đơn (V-ed).",
    },
  },
  {
    id: 5,
    title: "The Case of the Eager Student",
    context: "Một học sinh đang nói về sở thích của mình.",
    text: "I am very interested on learning about space.",
    error: {
      word: "on",
      correction: "in",
      options: ["in", "at", "about"],
      explanation:
        "Cụm từ cố định (collocation) là 'interested in something', không phải 'on'.",
    },
  },
];

// Component Card để hiển thị chữ
const Word = ({ text, isError, onClick, isSelected, isDisabled }) => {
  const baseClasses =
    "cursor-pointer rounded-md px-2 py-1 transition-all duration-200";
  const selectedClasses =
    "bg-yellow-400 text-black ring-2 ring-yellow-500 scale-105";
  const disabledClasses = "cursor-not-allowed opacity-60";
  const normalClasses = "hover:bg-gray-700";

  return (
    <span
      onClick={isDisabled ? null : onClick}
      className={`${baseClasses} ${
        isSelected ? selectedClasses : normalClasses
      } ${isDisabled ? disabledClasses : ""}`}
    >
      {text}
    </span>
  );
};

export default function DetectiveGame() {
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState("identifying"); // 'identifying', 'correcting', 'finished'
  const [selectedWord, setSelectedWord] = useState(null);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [score, setScore] = useState(0);

  const currentCase = cases[currentCaseIndex];

  // Tạo câu có lỗi để hiển thị
  const sentenceWithErr = useMemo(() => {
    if (!currentCase) return [];
    return currentCase.text
      .replace(currentCase.error.correction, currentCase.error.word)
      .split(" ");
  }, [currentCase]);

  // Khởi tạo game
  useEffect(() => {
    setCases(caseFiles.sort(() => Math.random() - 0.5));
  }, []);

  const handleWordClick = (word, index) => {
    if (gamePhase !== "identifying") return;
    setSelectedWord({ word, index });
    if (word.replace(/[,.]/g, "") === currentCase.error.word) {
      setFeedback({
        show: true,
        message: "Đã tìm thấy lỗi! Giờ hãy sửa nó.",
        type: "success",
      });
      setTimeout(() => {
        setGamePhase("correcting");
        setFeedback({ show: false, message: "", type: "" });
      }, 1500);
    } else {
      setFeedback({
        show: true,
        message: "Đây không phải lỗi. Hãy tìm tiếp!",
        type: "error",
      });
    }
  };

  const handleCorrection = (option) => {
    if (gamePhase !== "correcting") return;
    if (option === currentCase.error.correction) {
      setFeedback({
        show: true,
        message: `Chính xác! ${currentCase.error.explanation}`,
        type: "success",
      });
      setScore(score + 1);
    } else {
      setFeedback({
        show: true,
        message: `Chưa đúng. Đáp án đúng là '${currentCase.error.correction}'.`,
        type: "error",
      });
    }
    setGamePhase("finished");
  };

  const handleNextCase = () => {
    if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
      setGamePhase("identifying");
      setSelectedWord(null);
      setFeedback({ show: false, message: "", type: "" });
    } else {
      // End game
      setGamePhase("gameOver");
    }
  };

  if (cases.length === 0) return <div>Loading...</div>;

  if (gamePhase === "gameOver") {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-800 text-white">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold">Vụ án đã kết thúc!</h1>
          <p className="text-2xl mt-4">
            Điểm điều tra của bạn: {score}/{cases.length}
          </p>
          <button
            onClick={() => {
              setCurrentCaseIndex(0);
              setCases(caseFiles.sort(() => Math.random() - 0.5));
              setGamePhase("identifying");
              setScore(0);
              setSelectedWord(null);
              setFeedback({ show: false, message: "", type: "" });
            }}
            className="mt-8 rounded-lg bg-yellow-500 px-6 py-3 text-xl font-bold text-black"
          >
            Mở một vụ án mới
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-800 p-4 font-sans">
      <div
        className="w-full max-w-3xl rounded-lg bg-slate-200 p-6 md:p-8 shadow-2xl"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <div className="mb-4 border-b-2 border-slate-400 pb-2 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            HỒ SƠ VỤ ÁN #{currentCase.id}
          </h1>
          <p className="text-slate-600">Điểm: {score}</p>
        </div>

        <div className="rounded-lg bg-white p-4 mb-6 shadow-inner">
          <h2 className="text-xl font-bold text-red-700">
            Chủ đề: {currentCase.title}
          </h2>
          <p className="text-md mt-2 text-slate-700">
            <i>{currentCase.context}</i>
          </p>
        </div>

        <div className="min-h-[10rem] rounded-lg bg-gray-900 text-white p-6 text-2xl leading-relaxed shadow-lg">
          {sentenceWithErr.map((word, index) => (
            <Word
              key={index}
              text={word}
              onClick={() => handleWordClick(word, index)}
              isSelected={selectedWord?.index === index}
              isDisabled={gamePhase !== "identifying"}
            />
          ))}
        </div>

        {/* Feedback Popup */}
        {feedback.show && gamePhase === "identifying" && (
          <div
            className={`mt-4 rounded p-3 text-center text-white ${
              feedback.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Correction Phase */}
        {gamePhase === "correcting" && (
          <div className="mt-4 animate-fade-in">
            <h3 className="text-center text-xl font-bold text-slate-800 mb-3">
              Chọn cách sửa đúng:
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {currentCase.error.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleCorrection(option)}
                  className="rounded-lg bg-blue-600 p-4 text-xl text-white hover:bg-blue-700"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Finished Phase */}
        {gamePhase === "finished" && (
          <div
            className={`mt-4 rounded-lg p-4 text-white animate-fade-in ${
              feedback.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <p className="text-lg">{feedback.message}</p>
            <button
              onClick={handleNextCase}
              className="mt-4 w-full rounded-md bg-white py-2 text-lg font-bold text-black"
            >
              Tiếp tục vụ án tiếp theo →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
