// src/components/ToeicPracticeApp.jsx
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  AlertCircle,
  Award,
  Printer,
  Layers,
} from "lucide-react";

// Import dữ liệu từ file tách riêng
import ALL_SETS from "./data/toeicPartFiveData";

export default function ToeicPracticeApp() {
  // Sửa: Khởi tạo state bằng ID đầu tiên có trong dữ liệu để an toàn
  const firstSetId = Number(Object.keys(ALL_SETS)[0]);
  const [currentSetId, setCurrentSetId] = useState(firstSetId || 1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(true);
  const [filterType, setFilterType] = useState("All");

  // Lấy dữ liệu của bộ đề hiện tại
  const currentSet = ALL_SETS[currentSetId];
  const questionsData = currentSet ? currentSet.data : [];

  // Filter functionality
  const questionTypes = ["All", ...new Set(questionsData.map((q) => q.type))];

  const filteredQuestions =
    filterType === "All"
      ? questionsData
      : questionsData.filter((q) => q.type === filterType);

  const currentQuestion = filteredQuestions[currentIndex];

  // Reset state when switching sets
  const switchSet = (setId) => {
    setCurrentSetId(setId);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setFilterType("All");
  };

  const handleOptionSelect = (option) => {
    if (showResults) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option,
    });
  };

  const nextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentIndex(index);
    window.scrollTo(0, 0);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    questionsData.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  // --- PRINT FUNCTION ---
  const handlePrint = () => {
    const chunkArray = (arr, size) => {
      const chunked = [];
      for (let i = 0; i < arr.length; i += size) {
        chunked.push(arr.slice(i, i + size));
      }
      return chunked;
    };

    const QUESTIONS_PER_PAGE = 4;
    const questionPages = chunkArray(filteredQuestions, QUESTIONS_PER_PAGE);

    const printContent = `
      <html>
        <head>
          <title>TOEIC Part 5 - ${currentSet.title}</title>
          <style>
            @media print {
              @page { margin: 0; size: A4; }
              body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; }
            }
            body { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; color: #1f2937; background: #f3f4f6; margin: 0; padding: 20px; }
            .page { width: 210mm; height: 297mm; padding: 15mm 15mm; margin: 0 auto 20px auto; background: white; page-break-after: always; position: relative; box-sizing: border-box; display: flex; flex-direction: column; }
            .header { text-align: center; border-bottom: 3px solid #1d4ed8; padding-bottom: 10px; margin-bottom: 25px; }
            .header h1 { margin: 0; font-size: 24px; color: #1e3a8a; text-transform: uppercase; }
            .header p { margin: 5px 0 0; color: #6b7280; font-size: 14px; font-style: italic; }
            .page-content { flex-grow: 1; }
            .question-block { margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
            .question-block:last-child { border-bottom: none; }
            .question-text { font-size: 16px; font-weight: 600; margin-bottom: 12px; line-height: 1.5; color: #111827; }
            .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-left: 0; margin-bottom: 10px; font-size: 15px; }
            .option-item { display: flex; align-items: baseline; }
            .label { font-weight: 800; margin-right: 8px; color: #2563eb; }
            .answer-box { margin-top: 10px; padding: 10px 15px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px; font-size: 13px; color: #374151; }
            .answer-row { margin-bottom: 4px; }
            .answer-row strong { color: #1e40af; }
            .page-footer { margin-top: auto; padding-top: 10px; border-top: 1px solid #d1d5db; display: flex; justify-content: space-between; font-size: 12px; color: #9ca3af; }
          </style>
        </head>
        <body>
          ${questionPages
            .map(
              (pageQuestions, pageIndex) => `
            <div class="page">
              <div class="page-content">
                ${
                  pageIndex === 0
                    ? `
                  <div class="header">
                    <h1>Bộ Đề Luyện Tập TOEIC Part 5</h1>
                    <p>${currentSet.title} | 50 Câu Hỏi | Chủ đề: ${filterType === "All" ? "Tổng hợp" : filterType}</p>
                  </div>
                `
                    : `<div style="height: 20px;"></div>`
                }
                ${pageQuestions
                  .map((q, i) => {
                    const absoluteIndex =
                      pageIndex * QUESTIONS_PER_PAGE + i + 1;
                    return `
                    <div class="question-block">
                      <div class="question-text">Câu ${absoluteIndex}: ${q.question}</div>
                      <div class="options-grid">
                        ${q.options
                          .map(
                            (opt, optIndex) => `
                          <div class="option-item">
                            <span class="label">${["A", "B", "C", "D"][optIndex]}.</span> 
                            <span>${opt}</span>
                          </div>
                        `,
                          )
                          .join("")}
                      </div>
                      <div class="answer-box">
                        <div class="answer-row"><strong>ĐÁP ÁN: ${q.correct}</strong> <span style="color:#6b7280;">(${q.type})</span></div>
                        <div class="answer-row"><strong>Dịch:</strong> ${q.translation}</div>
                        <div class="answer-row"><strong>Giải thích:</strong> ${q.explanation}</div>
                      </div>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
              <div class="page-footer">
                <span>MLPA TOEIC - ${currentSet.title}</span>
                <span>Trang ${pageIndex + 1} / ${questionPages.length}</span>
              </div>
            </div>
          `,
            )
            .join("")}
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "height=800,width=1000");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
    } else {
      alert(
        "Vui lòng cho phép mở cửa sổ bật lên (Pop-up) để sử dụng tính năng in.",
      );
    }
  };

  const isCurrentAnswered = selectedAnswers[currentQuestion?.id];

  if (!currentSet) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <h1 className="text-xl font-bold">TOEIC Part 5 Mastery</h1>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" /> In PDF (Bộ hiện tại)
            </button>
          </div>

          {/* DYNAMIC SET SELECTOR - Đã sửa ở đây */}
          <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
            {Object.entries(ALL_SETS).map(([key, set]) => {
              const id = Number(key); // Chuyển key từ string sang number để so sánh
              return (
                <button
                  key={id}
                  onClick={() => switchSet(id)}
                  className={`flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap
                  ${
                    currentSetId === id
                      ? "bg-gray-50 text-blue-800 border-b-4 border-blue-500 shadow-inner"
                      : "bg-blue-900/50 text-blue-100 hover:bg-blue-700"
                  }`}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  {/* Sử dụng trực tiếp title từ data thay vì hardcode */}
                  {set.title}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <div className="bg-white border-l-4 border-blue-500 p-4 mb-6 shadow-sm rounded-r-lg flex justify-between items-center">
          <div>
            <h2 className="font-bold text-gray-800">{currentSet.title}</h2>
            <p className="text-sm text-gray-500">
              Bạn đang làm {currentIndex + 1} / {filteredQuestions.length} câu
              hỏi
            </p>
          </div>
          <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
            Mã bộ đề: SET-{currentSetId.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Controls / Filter */}
        {!showResults && (
          <div className="flex flex-wrap gap-4 mb-6 justify-between items-center bg-white p-4 rounded-lg shadow-sm controls-bar">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">
                Lọc dạng câu hỏi:
              </span>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentIndex(0);
                }}
                className="bg-gray-100 border-none rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                {questionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowResults(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm"
            >
              Nộp bài & Xem điểm
            </button>
          </div>
        )}

        {/* Quiz Interface */}
        <div>
          {!showResults && currentQuestion ? (
            <div className="grid gap-6">
              {/* Question Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase tracking-wide">
                      {currentQuestion.type}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ID: {currentQuestion.id}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-medium mb-8 leading-relaxed text-gray-900">
                    {currentQuestion.question
                      .split("_______")
                      .map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="inline-block min-w-[80px] border-b-2 border-blue-300 mx-1 text-center font-bold text-blue-600">
                              {isCurrentAnswered && isStudyMode ? (
                                selectedAnswers[currentQuestion.id] ===
                                currentQuestion.correct ? (
                                  <span className="text-green-600">
                                    {
                                      currentQuestion.options[
                                        ["A", "B", "C", "D"].indexOf(
                                          currentQuestion.correct,
                                        )
                                      ]
                                    }
                                  </span>
                                ) : (
                                  <span className="text-red-500">
                                    {
                                      currentQuestion.options[
                                        ["A", "B", "C", "D"].indexOf(
                                          selectedAnswers[currentQuestion.id],
                                        )
                                      ]
                                    }
                                  </span>
                                )
                              ) : (
                                "_______"
                              )}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, idx) => {
                      const label = ["A", "B", "C", "D"][idx];
                      const isSelected =
                        selectedAnswers[currentQuestion.id] === label;
                      const isCorrect = currentQuestion.correct === label;

                      let btnClass =
                        "border-gray-200 hover:bg-gray-50 hover:border-blue-300";
                      let icon = null;

                      if (isStudyMode && isCurrentAnswered) {
                        if (isCorrect) {
                          btnClass =
                            "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500";
                          icon = (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          );
                        } else if (isSelected && !isCorrect) {
                          btnClass =
                            "bg-red-50 border-red-500 text-red-800 ring-1 ring-red-500";
                          icon = <XCircle className="w-5 h-5 text-red-600" />;
                        } else {
                          btnClass = "border-gray-100 opacity-50";
                        }
                      } else if (isSelected) {
                        btnClass =
                          "bg-blue-50 border-blue-500 text-blue-800 ring-1 ring-blue-500";
                      }

                      return (
                        <button
                          key={label}
                          onClick={() => handleOptionSelect(label)}
                          className={`relative flex items-center p-4 border-2 rounded-lg transition-all duration-200 text-left ${btnClass}`}
                        >
                          <span
                            className={`w-8 h-8 flex items-center justify-center rounded-full border mr-3 text-sm font-bold bg-white
                            ${
                              isStudyMode && isCurrentAnswered && isCorrect
                                ? "border-green-500 text-green-600"
                                : isSelected
                                  ? "border-blue-500 text-blue-600"
                                  : "border-gray-300 text-gray-500"
                            }`}
                          >
                            {label}
                          </span>
                          <span className="font-medium flex-grow">
                            {option}
                          </span>
                          {icon}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isStudyMode && isCurrentAnswered && (
                  <div className="bg-blue-50 border-t border-blue-100 p-6 animate-fade-in">
                    <div className="flex gap-3 mb-3">
                      <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <h3 className="font-bold text-blue-900">
                        Giải thích chi tiết
                      </h3>
                    </div>
                    <div className="text-gray-700 space-y-3 pl-9">
                      <p>
                        <span className="font-semibold text-gray-900">
                          Đáp án đúng:
                        </span>{" "}
                        {currentQuestion.correct}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-900">
                          Dịch nghĩa:
                        </span>{" "}
                        {currentQuestion.translation}
                      </p>
                      <p className="bg-white p-3 rounded border border-blue-100 text-sm leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-2 nav-buttons">
                <button
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors
                    ${currentIndex === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-blue-700 hover:bg-blue-50 border border-gray-200 shadow-sm"}`}
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Trước
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm
                    ${currentIndex === filteredQuestions.length - 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                >
                  Sau <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>

              {/* Pagination */}
              <div className="mt-8 pagination-grid">
                <p className="text-sm font-semibold text-gray-500 mb-3">
                  Danh sách câu hỏi:
                </p>
                <div className="flex flex-wrap gap-2">
                  {filteredQuestions.map((q, idx) => {
                    const isDone = selectedAnswers[q.id];
                    const isCorrect = isDone === q.correct;
                    let colorClass =
                      "bg-white border-gray-300 text-gray-600 hover:border-blue-400";
                    if (currentIndex === idx) {
                      colorClass =
                        "ring-2 ring-blue-500 border-blue-500 bg-blue-50 text-blue-700";
                    } else if (isDone) {
                      colorClass = isCorrect
                        ? "bg-green-100 border-green-300 text-green-700"
                        : "bg-red-100 border-red-300 text-red-700";
                    }
                    return (
                      <button
                        key={q.id}
                        onClick={() => jumpToQuestion(idx)}
                        className={`w-10 h-10 rounded border text-sm font-medium transition-all ${colorClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : !currentQuestion ? (
            <div className="p-10 text-center">
              Không tìm thấy câu hỏi phù hợp với bộ lọc.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Kết quả bài làm
              </h2>
              <h3 className="text-xl font-medium text-blue-600 mb-6">
                {currentSet.title}
              </h3>
              <div className="flex justify-center gap-8 mb-10 mt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-1">
                    {calculateScore()}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">
                    Điểm số
                  </div>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800 mb-1">
                    {questionsData.length}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">
                    Tổng câu
                  </div>
                </div>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Xem lại bài
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Làm lại từ đầu
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
