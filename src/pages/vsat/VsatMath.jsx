import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Flag,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  Send,
  Pin,
  Calculator,
} from "lucide-react";

// --- COMPONENT HIỂN THỊ CÔNG THỨC TOÁN (SỬA LỖI HIỂN THỊ) ---
// Tự động chuyển đổi $...$ sang \(...\) để đảm bảo MathJax luôn hiểu
const MathRenderer = ({ content, className = "", block = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !content) return;

    // 1. CHUYỂN ĐỔI FORMAT: $...$ -> \(...\)
    // Điều này giúp công thức hiển thị ngay cả khi MathJax dùng cấu hình mặc định
    const processedContent = content
      .replace(/\$\$([^$]+)\$\$/g, "\\[$1\\]") // Block math $$...$$ -> \[...\]
      .replace(/\$([^$]+)\$/g, "\\($1\\)"); // Inline math $...$ -> \(...\)

    el.innerHTML = processedContent;

    // 2. HÀM RENDER
    const typeset = () => {
      if (
        window.MathJax &&
        typeof window.MathJax.typesetPromise === "function"
      ) {
        // Xóa thuộc tính cũ để MathJax render lại từ đầu
        el.removeAttribute("data-mathjax-typeset");
        window.MathJax.typesetPromise([el]).catch((err) => {
          // Bỏ qua lỗi promise bị hủy khi component unmount
          if (!err.message.includes("promise")) console.warn(err);
        });
      }
    };

    // 3. THỰC THI
    if (window.MathJax && window.MathJax.typesetPromise) {
      typeset();
    } else {
      // Nếu thư viện chưa tải xong, thử lại sau mỗi 200ms
      const interval = setInterval(() => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          typeset();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [content]);

  const Tag = block ? "div" : "span";
  return (
    <Tag
      ref={containerRef}
      className={`math-content ${className} ${block ? "text-center my-3 block" : "inline-block"}`}
    />
  );
};

// --- DỮ LIỆU BÀI THI TOÁN (GIỮ NGUYÊN) ---
const testData = {
  title: "ĐỀ THI MINH HỌA - ĐÁNH GIÁ ĐẦU VÀO ĐẠI HỌC (VSAT)",
  subject: "Toán học",
  duration: 90,
  parts: [
    // PART 1: TRẮC NGHIỆM NHIỀU LỰA CHỌN
    {
      part: 1,
      title: "Trắc nghiệm nhiều lựa chọn (Câu 1 - Câu 10)",
      description: "Thí sinh chọn 01 đáp án đúng duy nhất cho mỗi câu hỏi.",
      questions: [
        {
          id: "q1",
          text: "Cho hàm số $y = f(x)$ có bảng biến thiên như sau. Hàm số đã cho đồng biến trên khoảng nào dưới đây?",
          type: "multiple-choice",
          options: [
            "$(-1; 0)$",
            "$(-\\infty; -1)$",
            "$(0; 1)$",
            "$(1; +\\infty)$",
          ],
          answer: "$(0; 1)$",
        },
        {
          id: "q2",
          text: "Tập nghiệm của bất phương trình $\\log_2(x - 1) < 3$ là:",
          type: "multiple-choice",
          options: [
            "$(1; 9)$",
            "$(-\\infty; 9)$",
            "$(1; 4)$",
            "$(-\\infty; 4)$",
          ],
          answer: "$(1; 9)$",
        },
        {
          id: "q3",
          text: "Cho cấp số cộng $(u_n)$ với $u_1 = 2$ và $u_2 = 6$. Công sai $d$ của cấp số cộng đã cho bằng:",
          type: "multiple-choice",
          options: ["$4$", "$-4$", "$3$", "$8$"],
          answer: "$4$",
        },
        {
          id: "q4",
          text: "Trong không gian $Oxyz$, cho mặt cầu $(S): (x-1)^2 + (y+2)^2 + z^2 = 9$. Tâm $I$ của $(S)$ có tọa độ là:",
          type: "multiple-choice",
          options: [
            "$(1; -2; 0)$",
            "$(-1; 2; 0)$",
            "$(1; 2; 0)$",
            "$(-1; -2; 0)$",
          ],
          answer: "$(1; -2; 0)$",
        },
        {
          id: "q5",
          text: "Cho hàm số $f(x) = x^3 - 3x^2$. Giá trị cực đại của hàm số là:",
          type: "multiple-choice",
          options: ["$0$", "$-4$", "$2$", "$4$"],
          answer: "$0$",
        },
        {
          id: "q6",
          text: "Nguyên hàm của hàm số $f(x) = e^{2x}$ là:",
          type: "multiple-choice",
          options: [
            "$\\frac{1}{2}e^{2x} + C$",
            "$2e^{2x} + C$",
            "$e^{2x} + C$",
            "$e^x + C$",
          ],
          answer: "$\\frac{1}{2}e^{2x} + C$",
        },
        {
          id: "q7",
          text: "Cho số phức $z = 3 - 4i$. Môđun của $z$ bằng:",
          type: "multiple-choice",
          options: ["$5$", "$25$", "$\\sqrt{7}$", "$1$"],
          answer: "$5$",
        },
        {
          id: "q8",
          text: "Thể tích của khối lập phương cạnh $2a$ bằng:",
          type: "multiple-choice",
          options: ["$8a^3$", "$4a^3$", "$2a^3$", "$a^3$"],
          answer: "$8a^3$",
        },
        {
          id: "q9",
          text: "Tập xác định của hàm số $y = (x - 2)^{-3}$ là:",
          type: "multiple-choice",
          options: [
            "$\\mathbb{R} \\setminus \\{2\\}$",
            "$(2; +\\infty)$",
            "$\\mathbb{R}$",
            "$\\mathbb{R} \\setminus \\{0\\}$",
          ],
          answer: "$\\mathbb{R} \\setminus \\{2\\}$",
        },
        {
          id: "q10",
          text: "Có bao nhiêu cách chọn 2 học sinh từ một nhóm gồm 10 học sinh?",
          type: "multiple-choice",
          options: ["$C_{10}^2 = 45$", "$A_{10}^2 = 90$", "$20$", "$100$"],
          answer: "$C_{10}^2 = 45$",
        },
      ],
    },
    // PART 2: ĐÚNG / SAI
    {
      part: 2,
      title: "Trắc nghiệm Đúng/Sai (Câu 11 - Câu 15)",
      description: "Trong mỗi ý a), b), c), d), thí sinh chọn đúng hoặc sai.",
      questions: [
        {
          id: "q11",
          text: "Cho hàm số $y = \\frac{x + 1}{x - 1}$ có đồ thị $(C)$.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Hàm số nghịch biến trên từng khoảng xác định.",
              answer: "T",
            },
            {
              id: 2,
              text: "Đồ thị hàm số có tiệm cận đứng $x = -1$.",
              answer: "F",
            },
            {
              id: 3,
              text: "Giao điểm của $(C)$ với trục tung là $M(0; -1)$.",
              answer: "T",
            },
            {
              id: 4,
              text: "Tiệm cận ngang của đồ thị là $y = 1$.",
              answer: "T",
            },
          ],
        },
        {
          id: "q12",
          text: "Trong không gian $Oxyz$, cho đường thẳng $d: \\frac{x-1}{2} = \\frac{y}{1} = \\frac{z+2}{-1}$.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Vectơ chỉ phương của $d$ là $\\vec{u} = (2; 1; -1)$.",
              answer: "T",
            },
            {
              id: 2,
              text: "Điểm $M(1; 0; -2)$ thuộc đường thẳng $d$.",
              answer: "T",
            },
            {
              id: 3,
              text: "Đường thẳng $d$ vuông góc với mặt phẳng $(P): 2x + y - z = 0$.",
              answer: "T",
            },
            {
              id: 4,
              text: "Đường thẳng $d$ đi qua gốc tọa độ $O$.",
              answer: "F",
            },
          ],
        },
        {
          id: "q13",
          text: "Cho số phức $z$ thỏa mãn $(1+i)z = 3 - i$.",
          type: "true-false",
          statements: [
            { id: 1, text: "Phần thực của $z$ bằng $1$.", answer: "T" },
            { id: 2, text: "Phần ảo của $z$ bằng $-2$.", answer: "T" },
            {
              id: 3,
              text: "Số phức liên hợp của $z$ là $\\bar{z} = 1 + 2i$.",
              answer: "T",
            },
            {
              id: 4,
              text: "Điểm biểu diễn của $z$ nằm ở góc phần tư thứ nhất.",
              answer: "F",
            },
          ],
        },
        {
          id: "q14",
          text: "Cho tích phân $I = \\int_0^1 x e^x dx$.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Sử dụng phương pháp tích phân từng phần để tính $I$.",
              answer: "T",
            },
            { id: 2, text: "Đặt $u = x, dv = e^x dx$.", answer: "T" },
            { id: 3, text: "Giá trị của $I$ bằng $1$.", answer: "T" },
            {
              id: 4,
              text: "Nếu đổi cận từ $0$ đến $2$ thì kết quả là $e^2$.",
              answer: "F",
            },
          ],
        },
        {
          id: "q15",
          text: "Một hộp chứa 3 bi xanh và 2 bi đỏ. Lấy ngẫu nhiên 2 bi.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Số phần tử không gian mẫu là $n(\\Omega) = 10$.",
              answer: "T",
            },
            {
              id: 2,
              text: "Xác suất lấy được 2 bi cùng màu là $0.4$.",
              answer: "T",
            },
            {
              id: 3,
              text: "Xác suất lấy được ít nhất 1 bi đỏ là $0.7$.",
              answer: "T",
            },
            {
              id: 4,
              text: "Xác suất lấy được 2 bi xanh lớn hơn xác suất lấy 2 bi đỏ.",
              answer: "T",
            },
          ],
        },
      ],
    },
    // PART 3: TRẮC NGHIỆM ĐÚNG SAI (NÂNG CAO)
    {
      part: 3,
      title: "Trắc nghiệm Đúng/Sai (Câu 16 - Câu 20)",
      description: "Phần nâng cao: Chọn đúng hoặc sai cho các mệnh đề.",
      questions: [
        {
          id: "q16",
          text: "Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ và $f'(x) = x(x-1)^2(x+2)$.",
          type: "true-false",
          statements: [
            { id: 1, text: "Hàm số có 3 điểm cực trị.", answer: "F" },
            { id: 2, text: "Hàm số đạt cực tiểu tại $x = 0$.", answer: "F" },
            { id: 3, text: "Hàm số đạt cực đại tại $x = 0$.", answer: "T" },
            {
              id: 4,
              text: "Hàm số nghịch biến trên khoảng $(0; 1)$.",
              answer: "F",
            },
          ],
        },
        {
          id: "q17",
          text: "Xét phương trình $4^x - 3 \\cdot 2^x + 2 = 0$.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Nếu đặt $t = 2^x$, ta được phương trình $t^2 - 3t + 2 = 0$.",
              answer: "T",
            },
            {
              id: 2,
              text: "Phương trình có 2 nghiệm dương phân biệt.",
              answer: "T",
            },
            {
              id: 3,
              text: "Tổng các nghiệm của phương trình bằng $3$.",
              answer: "F",
            },
            {
              id: 4,
              text: "Tích các nghiệm của phương trình bằng $1$.",
              answer: "F",
            },
          ],
        },
        {
          id: "q18",
          text: "Cho khối lăng trụ tam giác đều $ABC.A'B'C'$ có cạnh đáy bằng $a$ và cạnh bên bằng $2a$.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Thể tích khối lăng trụ là $\\frac{a^3\\sqrt{3}}{2}$.",
              answer: "T",
            },
            { id: 2, text: "Diện tích xung quanh là $6a^2$.", answer: "T" },
            {
              id: 3,
              text: "Góc giữa $A'B$ và đáy là $60^\\circ$.",
              answer: "F",
            },
            {
              id: 4,
              text: "Khoảng cách từ $A'$ đến mặt phẳng $(ABC)$ là $2a$.",
              answer: "T",
            },
          ],
        },
        {
          id: "q19",
          text: "Cho $\\log_2 5 = a$ và $\\log_3 5 = b$.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Ta có $\\log_5 6 = \\frac{a+b}{ab}$.",
              answer: "T",
            },
            { id: 2, text: "Giá trị $a > b$.", answer: "T" },
            {
              id: 3,
              text: "Ta có $\\log_6 5 = \\frac{ab}{a+b}$.",
              answer: "T",
            },
            {
              id: 4,
              text: "Biểu thức $\\frac{1}{a} + \\frac{1}{b} = \\log_5 6$.",
              answer: "T",
            },
          ],
        },
        {
          id: "q20",
          text: "Cho hình nón có bán kính đáy $r = 3$, đường sinh $l = 5$.",
          type: "true-false",
          statements: [
            { id: 1, text: "Chiều cao hình nón $h = 4$.", answer: "T" },
            { id: 2, text: "Diện tích xung quanh là $15\\pi$.", answer: "T" },
            { id: 3, text: "Thể tích khối nón là $12\\pi$.", answer: "T" },
            { id: 4, text: "Góc ở đỉnh là $60^\\circ$.", answer: "F" },
          ],
        },
      ],
    },
    // PART 4: TRẢ LỜI NGẮN
    {
      part: 4,
      title: "PHẦN IV. CÂU HỎI MỞ TRẢ LỜI NGẮN",
      description:
        "Từ Câu 21 đến Câu 25, thí sinh ghi đáp án tương ứng với câu hỏi.",
      type: "short-answer",
      questions: [
        {
          id: "q21",
          text: "Cho $\\int_0^1 f(x)dx = -3$ và $\\int_0^1 g(x)dx = 2$. Tính $I = \\int_0^1 [f(x) + 2g(x)]dx$.",
          mathText: "I = \\int_0^1 [f(x) + 2g(x)]dx",
          answer: "1",
        },
        {
          id: "q22",
          text: "Cho các số thực dương $a, b, c$ thỏa mãn $\\log_a b = 3$ và $\\log_c a = -\\frac{1}{2}$. Tính giá trị của biểu thức $P = \\log_{ac}(a^2bc)$.",
          mathText: "P = \\log_{ac}(a^2bc)",
          answer: "-3",
        },
        {
          id: "q23",
          text: "Cho số phức $z$ thỏa mãn $(1+i)\\bar{z} - 1 - 3i = 0$. Tính môđun của số phức $w = 1 - iz + z$.",
          mathText: "|w| = \\sqrt{13}", // Sử dụng hiển thị riêng cho đẹp
          answer: "sqrt(13)",
        },
        {
          id: "q24",
          text: "Trong không gian $Oxyz$, cho mặt phẳng $(P): 2x - y + 2z - 5 = 0$ và điểm $A(1; 2; -1)$. Tính khoảng cách từ $A$ đến $(P)$.",
          mathText: "d(A, (P)) = ?",
          answer: "2",
        },
        {
          id: "q25",
          text: "Có bao nhiêu giá trị nguyên của tham số $m$ để hàm số $y = x^3 - 3x^2 + mx + 1$ đồng biến trên khoảng $(0; +\\infty)$?",
          mathText: "y = x^3 - 3x^2 + mx + 1",
          answer: "3",
        },
      ],
    },
  ],
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function VsatMath() {
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testData.duration * 60);
  const [darkMode, setDarkMode] = useState(false);
  const timerRef = useRef(null);

  // --- MATHJAX LOADER ---
  useEffect(() => {
    // 1. LOAD SCRIPT
    if (!document.getElementById("mathjax-script")) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
      script.async = true;
      script.id = "mathjax-script";
      document.head.appendChild(script);

      // Cấu hình MathJax
      window.MathJax = {
        tex: {
          inlineMath: [
            ["$", "$"], // Hỗ trợ $...$
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
        },
        svg: { fontCache: "global" },
        startup: { typeset: false },
      };
    }
  }, []);

  useEffect(() => {
    let total = 0;
    testData.parts.forEach((part) => {
      if (part.type === "short-answer") {
        total += part.questions.length * 5;
      } else {
        part.questions.forEach((q) => {
          if (q.type === "true-false") total += 4;
          else if (q.type === "multiple-choice") total += 5;
        });
      }
    });
    setTotalPossibleScore(total);
  }, []);

  useEffect(() => {
    if (!submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [submitted]);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) handleSubmit();
  }, [timeLeft, submitted]);

  const handleAnswerChange = (qId, subId, value) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], [subId]: value },
    }));
  };

  const toggleFlag = (qId) => {
    if (submitted) return;
    setFlagged((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSubmit = () => {
    if (submitted) return;
    let currentScore = 0;

    testData.parts.forEach((part) => {
      if (part.type === "short-answer") {
        part.questions.forEach((q) => {
          const uAns = answers[q.id]?.[0];
          if (uAns && uAns.trim() === q.answer) {
            currentScore += 5;
          }
        });
      } else {
        part.questions.forEach((q) => {
          const uAns = answers[q.id] || {};
          if (q.type === "true-false") {
            let correctCount = 0;
            q.statements.forEach((s) => {
              if (uAns[s.id] === s.answer) correctCount++;
            });
            if (correctCount === 1) currentScore += 1;
            else if (correctCount === 2) currentScore += 2;
            else if (correctCount === 3) currentScore += 3;
            else if (correctCount === 4) currentScore += 4;
          } else if (q.type === "multiple-choice") {
            if (uAns[0] === q.answer) currentScore += 5;
          }
        });
      }
    });

    setScore(currentScore);
    setSubmitted(true);
    clearInterval(timerRef.current);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setFlagged({});
    setScore(0);
    setSubmitted(false);
    setTimeLeft(testData.duration * 60);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToQuestion = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const getNavBubbleClass = (q) => {
    const isFlagged = flagged[q.id];
    const hasAnswer = answers[q.id] && Object.keys(answers[q.id]).length > 0;
    if (submitted) return "bg-gray-300 text-gray-800";
    if (isFlagged)
      return "bg-yellow-400 text-yellow-900 ring-2 ring-yellow-200";
    if (hasAnswer) return "bg-blue-500 text-white";
    return "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300";
  };

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 font-sans ${darkMode ? "dark bg-slate-900 text-slate-100" : "bg-indigo-50 text-slate-800"}`}
    >
      {/* HEADER */}
      <header
        className={`sticky top-0 z-50 shadow-md backdrop-blur-md transition-colors duration-300 ${darkMode ? "bg-slate-800/90 border-b border-slate-700" : "bg-white/90 border-b border-indigo-100"}`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-lg ${darkMode ? "bg-indigo-600" : "bg-indigo-100"}`}
            >
              <Calculator
                size={24}
                className={darkMode ? "text-white" : "text-indigo-600"}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg leading-tight">VSAT MATH</h1>
              <span className="text-xs opacity-70">Toán Học • 90 Phút</span>
            </div>
          </div>

          <div
            className={`flex items-center px-4 py-2 rounded-full font-mono font-bold text-xl tracking-wider shadow-inner ${
              timeLeft < 300
                ? "bg-red-100 text-red-600 animate-pulse border border-red-200"
                : darkMode
                  ? "bg-slate-950 text-emerald-400 border border-slate-700"
                  : "bg-slate-100 text-indigo-600 border border-slate-200"
            }`}
          >
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg transform active:scale-95 transition-all font-bold text-sm"
              >
                <Send size={16} /> Nộp bài
              </button>
            ) : (
              <div className="font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-200">
                {score}/{totalPossibleScore}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${darkMode ? "bg-slate-700 text-yellow-300" : "bg-indigo-100 text-indigo-600"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 sm:p-6 pb-32">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            {testData.title}
          </h2>
          <p className="opacity-70 mt-2 text-sm sm:text-base">
            Môn thi: {testData.subject}
          </p>
        </div>

        {/* QUESTIONS LIST */}
        <main className="space-y-8 w-full mx-auto max-w-4xl">
          {testData.parts.map((part, partIndex) => {
            const isShortAnswer = part.type === "short-answer";
            const colorClass = isShortAnswer
              ? "bg-cyan-100/50 dark:bg-cyan-900/30 border-cyan-500 text-cyan-800 dark:text-cyan-200"
              : "bg-indigo-100/50 dark:bg-indigo-900/30 border-indigo-500 text-indigo-800 dark:text-indigo-200";
            const descColor = isShortAnswer
              ? "text-cyan-700 dark:text-cyan-300"
              : "text-indigo-700 dark:text-indigo-300";

            return (
              <div key={partIndex} className="space-y-6">
                {/* Part Header */}
                <div className={`${colorClass} p-4 rounded-lg border-l-4`}>
                  <h3 className="font-bold text-lg uppercase">{part.title}</h3>
                  <p className={`${descColor} text-sm mt-1`}>
                    {part.description}
                  </p>
                </div>

                {/* Questions Loop */}
                {part.questions.map((q) => {
                  const uVal = answers[q.id]?.[0] || "";
                  const displayNum = q.id.replace("q", "");

                  return (
                    <div
                      key={q.id}
                      id={q.id}
                      className={`bg-white dark:bg-slate-800 rounded-lg shadow-sm border ${darkMode ? "border-slate-700" : "border-gray-200"} scroll-mt-24 overflow-hidden`}
                    >
                      {/* Question Header */}
                      <div className="flex justify-between items-start p-4 pb-2">
                        <h4 className="font-bold text-lg">Câu {displayNum}</h4>
                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={
                            flagged[q.id]
                              ? "text-red-500 transform rotate-45"
                              : "text-gray-400 hover:text-gray-600"
                          }
                        >
                          <Pin
                            size={20}
                            fill={flagged[q.id] ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      {/* Question Body */}
                      <div className="px-4 py-2 text-base leading-relaxed">
                        <MathRenderer content={q.text} className="mb-2 block" />
                        {q.mathText && (
                          <div className="my-3 font-serif text-lg text-center bg-gray-50 dark:bg-slate-900/50 p-3 rounded">
                            <MathRenderer
                              content={`$$${q.mathText}$$`}
                              block={true}
                            />
                          </div>
                        )}
                      </div>

                      {/* Interaction Area (Footer) */}
                      <div className="mt-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-4">
                        {/* --- LOGIC TRẢ LỜI NGẮN (PART 4) --- */}
                        {part.type === "short-answer" && (
                          <div className="flex flex-col sm:flex-row">
                            <div className="px-4 py-2 bg-gray-200/50 dark:bg-slate-700/50 rounded-l flex items-center justify-center sm:justify-start min-w-[80px] border border-r-0 border-gray-300 dark:border-slate-600">
                              <span className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
                                Trả lời:
                              </span>
                            </div>
                            <div className="flex-1">
                              <input
                                type="text"
                                disabled={submitted}
                                value={uVal}
                                onChange={(e) =>
                                  handleAnswerChange(q.id, 0, e.target.value)
                                }
                                placeholder="Nhập đáp án..."
                                className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-r px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600"
                              />
                            </div>
                          </div>
                        )}

                        {/* --- LOGIC TRẮC NGHIỆM (PART 1) --- */}
                        {q.type === "multiple-choice" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt, idx) => {
                              const isSelected = answers[q.id]?.[0] === opt;
                              const isCorrect = q.answer === opt;
                              let bgClass =
                                "bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 hover:border-indigo-400 hover:shadow-sm";

                              if (submitted) {
                                if (isCorrect)
                                  bgClass =
                                    "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300";
                                else if (isSelected)
                                  bgClass =
                                    "bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300";
                                else bgClass = "opacity-50 grayscale";
                              } else if (isSelected) {
                                bgClass =
                                  "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200";
                              }

                              return (
                                <button
                                  key={idx}
                                  disabled={submitted}
                                  onClick={() =>
                                    handleAnswerChange(q.id, 0, opt)
                                  }
                                  className={`p-3 text-left rounded-lg border transition-all flex items-center gap-3 ${bgClass}`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded-full border flex flex-shrink-0 items-center justify-center text-xs font-bold ${isSelected || (submitted && isCorrect) ? "border-current" : "border-gray-400 text-gray-500"}`}
                                  >
                                    {String.fromCharCode(65 + idx)}
                                  </div>
                                  <div className="flex-1">
                                    <MathRenderer content={opt} />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* --- LOGIC ĐÚNG/SAI (PART 2 & 3) --- */}
                        {q.type === "true-false" && (
                          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                                <tr>
                                  <th className="p-3 text-left font-semibold">
                                    Mệnh đề
                                  </th>
                                  <th className="p-3 w-16 text-center font-semibold">
                                    Đúng
                                  </th>
                                  <th className="p-3 w-16 text-center font-semibold">
                                    Sai
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {q.statements.map((st) => {
                                  const uAns = answers[q.id]?.[st.id];
                                  const isCorrect = uAns === st.answer;
                                  const rowClass = submitted
                                    ? isCorrect
                                      ? "bg-emerald-50/50 dark:bg-emerald-900/10"
                                      : "bg-rose-50/50 dark:bg-rose-900/10"
                                    : "hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors";

                                  return (
                                    <tr key={st.id} className={rowClass}>
                                      <td className="p-3 align-middle">
                                        <MathRenderer content={st.text} />
                                      </td>
                                      <td className="p-3 text-center align-middle">
                                        <div className="flex justify-center">
                                          <input
                                            type="radio"
                                            checked={uAns === "T"}
                                            onChange={() =>
                                              handleAnswerChange(
                                                q.id,
                                                st.id,
                                                "T",
                                              )
                                            }
                                            disabled={submitted}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
                                          />
                                        </div>
                                      </td>
                                      <td className="p-3 text-center align-middle">
                                        <div className="flex justify-center">
                                          <input
                                            type="radio"
                                            checked={uAns === "F"}
                                            onChange={() =>
                                              handleAnswerChange(
                                                q.id,
                                                st.id,
                                                "F",
                                              )
                                            }
                                            disabled={submitted}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Feedback Text when submitted */}
                        {submitted && part.type === "short-answer" && (
                          <div className="mt-2 text-sm">
                            <span className="font-bold">Đáp án: </span>
                            <span className="text-emerald-600 font-mono">
                              {q.answer}
                            </span>
                            {uVal.trim() === q.answer ? (
                              <span className="ml-2 text-emerald-500 font-bold">
                                ✓ Chính xác
                              </span>
                            ) : (
                              <span className="ml-2 text-rose-500 font-bold">
                                ✗ Sai
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </main>
      </div>

      {/* FOOTER NAV */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-indigo-100"}`}
      >
        <div className="container mx-auto">
          <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar">
            {testData.parts
              .flatMap((p) => p.questions)
              .map((q) => (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  className={`flex-shrink-0 w-8 h-8 rounded text-xs font-bold border transition-all ${getNavBubbleClass(q)}`}
                >
                  {q.id.replace("q", "")}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
