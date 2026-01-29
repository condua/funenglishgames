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
  ImageIcon,
  ChevronDown, // Thêm icon mũi tên cho dropdown
} from "lucide-react";

// --- COMPONENT HIỂN THỊ CÔNG THỨC TOÁN ---
const MathRenderer = ({ content, className = "", block = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !content) return;

    // Chuyển đổi format để MathJax hiểu
    const processedContent = content
      .replace(/\$\$([^$]+)\$\$/g, "\\[$1\\]")
      .replace(/\$([^$]+)\$/g, "\\($1\\)");

    el.innerHTML = processedContent;

    const typeset = () => {
      if (
        window.MathJax &&
        typeof window.MathJax.typesetPromise === "function"
      ) {
        el.removeAttribute("data-mathjax-typeset");
        window.MathJax.typesetPromise([el]).catch((err) => {
          if (!err.message.includes("promise")) console.warn(err);
        });
      }
    };

    if (window.MathJax && window.MathJax.typesetPromise) {
      typeset();
    } else {
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

// --- COMPONENT DROPDOWN TÙY CHỈNH (Hỗ trợ MathJax) ---
const CustomDropdown = ({
  options,
  value,
  onChange,
  disabled,
  darkMode,
  placeholder = "Choose...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optFullString) => {
    if (disabled) return;
    // Tách lấy ký tự A, B, C... (ví dụ "A. y' = ..." -> "A")
    const optValue = optFullString.split(".")[0];
    onChange(optValue);
    setIsOpen(false);
  };

  // Tìm text đầy đủ của lựa chọn hiện tại để hiển thị
  const selectedOptionText = options.find((opt) => opt.startsWith(value + "."));

  // Styles
  const baseBorder = darkMode ? "border-slate-600" : "border-gray-300";
  const bgClass = darkMode ? "bg-slate-700" : "bg-gray-50";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const hoverClass = darkMode ? "hover:bg-slate-600" : "hover:bg-gray-100";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Nút kích hoạt Dropdown */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full p-2.5 text-sm rounded-lg border ${baseBorder} ${bgClass} ${textClass} flex justify-between items-center focus:ring-2 focus:ring-purple-500 focus:outline-none text-left min-h-[42px] transition-colors`}
      >
        <div className="flex-1 mr-2 truncate">
          {selectedOptionText ? (
            // Hiển thị MathJax cho giá trị đã chọn
            <MathRenderer content={selectedOptionText} />
          ) : (
            <span className="opacity-50">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`opacity-50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Danh sách xổ xuống */}
      {isOpen && (
        <div
          className={`absolute z-50 w-full mt-1 rounded-lg shadow-xl max-h-80 overflow-y-auto border animate-in fade-in zoom-in-95 duration-100 ${darkMode ? "bg-slate-800 border-slate-600" : "bg-white border-gray-200"}`}
        >
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(opt)}
              className={`p-3 text-sm cursor-pointer border-b last:border-b-0 transition-colors flex items-center ${darkMode ? "border-slate-700 hover:bg-slate-700 text-gray-200" : "border-gray-50 hover:bg-indigo-50 text-gray-800"}`}
            >
              {/* Hiển thị MathJax cho từng option trong list */}
              <MathRenderer content={opt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- DỮ LIỆU BÀI THI TOÁN (CẤU TRÚC MỚI) ---
const testData = {
  title: "ĐỀ THI MINH HỌA - ĐÁNH GIÁ ĐẦU VÀO ĐẠI HỌC (VSAT) 2025",
  subject: "Toán học",
  duration: 90,
  parts: [
    // PART 1: ĐÚNG / SAI (Câu 1 - 9)
    {
      part: 1,
      title: "PHẦN I. TRẮC NGHIỆM ĐÚNG SAI",
      description:
        "Từ câu hỏi 01 đến 09, thí sinh ghi dấu X vào cột Đúng hoặc Sai tương ứng với nội dung ghi ở cột bên trái.",
      type: "true-false",
      questions: [
        {
          id: "q1",
          text: "Cho hàm số $y = f(x) = x^3 - 3x^2 + 2$.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Graph_of_cubic_polynomial.svg/300px-Graph_of_cubic_polynomial.svg.png",
          statements: [
            {
              id: "1",
              text: "Hàm số đồng biến trên khoảng $(0; 2)$.",
              answer: "F",
            },
            { id: "2", text: "Hàm số đạt cực đại tại $x = 0$.", answer: "T" },
            {
              id: "3",
              text: "Giá trị cực tiểu của hàm số bằng $-2$.",
              answer: "T",
            },
            {
              id: "4",
              text: "Đồ thị hàm số cắt trục hoành tại 3 điểm phân biệt.",
              answer: "T",
            },
          ],
        },
        {
          id: "q2",
          text: "Trong không gian $Oxyz$, cho mặt cầu $(S): x^2 + y^2 + z^2 - 2x + 4y - 6z - 11 = 0$.",
          statements: [
            { id: "1", text: "Tâm của mặt cầu là $I(1; -2; 3)$.", answer: "T" },
            { id: "2", text: "Bán kính của mặt cầu là $R = 5$.", answer: "T" },
            {
              id: "3",
              text: "Điểm $M(1; 1; 1)$ nằm bên trong mặt cầu $(S)$.",
              answer: "T",
            },
            {
              id: "4",
              text: "Mặt phẳng $(P): 2x + 2y - z + 5 = 0$ tiếp xúc với mặt cầu.",
              answer: "F",
            },
          ],
        },
        {
          id: "q3",
          text: "Xét các số thực dương $a, b$ thỏa mãn $\\log_2 a = \\log_8 (ab)$.",
          statements: [
            {
              id: "1",
              text: "Phương trình tương đương $\\log_2 a = \\frac{1}{3} \\log_2 (ab)$.",
              answer: "T",
            },
            { id: "2", text: "Ta có mối liên hệ $a^2 = b$.", answer: "T" },
            { id: "3", text: "Nếu $b=4$ thì $a=2$.", answer: "T" },
            {
              id: "4",
              text: "Biểu thức $P = \\log_a b$ luôn có giá trị bằng 3.",
              answer: "F",
            },
          ],
        },
        {
          id: "q4",
          text: "Cho hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{3}$.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Square_pyramid.png/240px-Square_pyramid.png",
          statements: [
            {
              id: "1",
              text: "Thể tích khối chóp là $\\frac{a^3\\sqrt{3}}{3}$.",
              answer: "T",
            },
            {
              id: "2",
              text: "Góc giữa $SC$ và mặt phẳng đáy là $60^\\circ$.",
              answer: "F",
            },
            {
              id: "3",
              text: "Khoảng cách từ $A$ đến mặt phẳng $(SBD)$ bằng $\\frac{a\\sqrt{3}}{2}$.",
              answer: "F",
            },
            { id: "4", text: "Tam giác $SBD$ là tam giác đều.", answer: "F" },
          ],
        },
        {
          id: "q5",
          text: "Cho tích phân $I = \\int_1^e \\frac{\\ln x}{x} dx$.",
          statements: [
            {
              id: "1",
              text: "Đặt $t = \\ln x$, khi đó $dt = \\frac{1}{x}dx$.",
              answer: "T",
            },
            {
              id: "2",
              text: "Đổi cận: $x=1 \\Rightarrow t=0; x=e \\Rightarrow t=1$.",
              answer: "T",
            },
            {
              id: "3",
              text: "Tích phân trở thành $I = \\int_0^1 t dt$.",
              answer: "T",
            },
            { id: "4", text: "Giá trị của tích phân $I = 2$.", answer: "F" },
          ],
        },
      ],
    },
    // PART 2: TRẮC NGHIỆM 4 LỰA CHỌN (Câu 10 - 15)
    {
      part: 2,
      title: "PHẦN II. TRẮC NGHIỆM NHIỀU LỰA CHỌN",
      description:
        "Từ câu hỏi 10 đến 15, thí sinh chọn phương án đúng trong 4 phương án A, B, C, D đã cho.",
      type: "multiple-choice",
      questions: [
        {
          id: "q10",
          text: "Tìm tập nghiệm $S$ của bất phương trình $3^{x^2 - 13} < 27$.",
          options: [
            "$(-4; 4)$",
            "$(4; +\\infty)$",
            "$(-\\infty; -4)$",
            "$(-4; 4) \\setminus \\{0\\}$",
          ],
          answer: "$(-4; 4)$",
        },
        {
          id: "q11",
          text: "Thể tích khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi đồ thị hàm số $y = \\sqrt{x}$, trục hoành và đường thẳng $x=4$ quanh trục hoành là:",
          options: ["$8\\pi$", "$4\\pi$", "$16\\pi$", "$2\\pi$"],
          answer: "$8\\pi$",
        },
        {
          id: "q12",
          text: "Trong không gian $Oxyz$, vectơ nào dưới đây là một vectơ pháp tuyến của mặt phẳng $(P): 2x - 3y + z - 5 = 0$?",
          options: [
            "$\\vec{n} = (2; -3; 1)$",
            "$\\vec{n} = (2; 3; 1)$",
            "$\\vec{n} = (2; -3; -5)$",
            "$\\vec{n} = (-2; 3; -1)$",
          ],
          answer: "$\\vec{n} = (2; -3; 1)$",
        },
        {
          id: "q13",
          text: "Có bao nhiêu số phức $z$ thỏa mãn $|z| = \sqrt{2}$ và $z^2$ là số thuần ảo?",
          options: ["4", "3", "2", "1"],
          answer: "4",
        },
        {
          id: "q14",
          text: "Cho cấp số cộng $(u_n)$ có $u_1 = -2$ và công sai $d = 3$. Tìm số hạng $u_{10}$.",
          options: [
            "$u_{10} = 25$",
            "$u_{10} = 28$",
            "$u_{10} = -29$",
            "$u_{10} = 27$",
          ],
          answer: "$u_{10} = 25$",
        },
        {
          id: "q15",
          text: "Một hộp có 5 viên bi đỏ và 4 viên bi xanh. Lấy ngẫu nhiên 2 viên bi. Tính xác suất để lấy được 2 viên bi cùng màu.",
          options: [
            "$\\frac{4}{9}$",
            "$\\frac{5}{18}$",
            "$\\frac{1}{6}$",
            "$\\frac{5}{9}$",
          ],
          answer: "$\\frac{4}{9}$",
        },
      ],
    },
    // PART 3: GHÉP NỐI (Câu 16 - 20)
    {
      part: 3,
      title: "PHẦN III. TRẮC NGHIỆM GHÉP NỐI",
      description:
        "Từ câu hỏi 16 đến 20, thí sinh ghép mỗi nội dung ở cột bên trái với một nội dung ở cột bên phải thành nội dung đúng.",
      type: "matching",
      questions: [
        {
          id: "q16",
          text: "Ghép các hàm số ở cột trái với công thức đạo hàm tương ứng ở cột phải.",
          items: [
            "$y = \\sin x$",
            "$y = \\cos x$",
            "$y = \\ln x$",
            "$y = e^x$",
          ],
          options: [
            "A. $y' = -\\sin x$",
            "B. $y' = \\cos x$",
            "C. $y' = \\frac{1}{x}$",
            "D. $y' = e^x$",
            "E. $y' = \\frac{1}{x^2}$",
            "F. $y' = -\\frac{1}{x}$",
          ],
          answer: { 0: "B", 1: "A", 2: "C", 3: "D" },
        },
        {
          id: "q17",
          text: "Ghép các khối đa diện đều ở cột trái với số mặt tương ứng ở cột phải.",
          items: [
            "Khối tứ diện đều",
            "Khối lập phương",
            "Khối bát diện đều",
            "Khối mười hai mặt đều",
          ],
          options: [
            "A. 6 mặt",
            "B. 4 mặt",
            "C. 8 mặt",
            "D. 12 mặt",
            "E. 20 mặt",
            "F. 10 mặt",
          ],
          answer: { 0: "B", 1: "A", 2: "C", 3: "D" },
        },
        {
          id: "q18",
          text: "Trong không gian $Oxyz$, ghép các phương trình mặt cầu/mặt phẳng với đặc điểm tâm/vectơ pháp tuyến tương ứng.",
          items: [
            "$(S): (x-1)^2 + y^2 + (z+2)^2 = 9$",
            "$(P): x - 2y + 2z - 1 = 0$",
            "$(S): x^2 + y^2 + z^2 - 2x = 0$",
            "$(Q): 2x + z - 3 = 0$",
          ],
          options: [
            "A. $\\vec{n} = (1; -2; 2)$",
            "B. Tâm $I(1; 0; -2)$",
            "C. Tâm $I(1; 0; 0)$",
            "D. $\\vec{n} = (2; 0; 1)$",
            "E. Tâm $I(0; 0; 0)$",
            "F. $\\vec{n} = (2; 1; -3)$",
          ],
          answer: { 0: "B", 1: "A", 2: "C", 3: "D" },
        },
        {
          id: "q19",
          text: "Ghép các công thức Logarit ở cột trái (với $0 < a \\ne 1, x, y > 0$) với kết quả đúng ở cột phải.",
          items: [
            "$\\log_a (xy)$",
            "$\\log_a (x^n)$",
            "$\\log_a \\frac{x}{y}$",
            "$\\log_{a^n} x$",
          ],
          options: [
            "A. $\\log_a x - \\log_a y$",
            "B. $\\log_a x + \\log_a y$",
            "C. $n \\log_a x$",
            "D. $\\frac{1}{n} \\log_a x$",
            "E. $\\log_a x \\cdot \\log_a y$",
            "F. $x \\log_a n$",
          ],
          answer: { 0: "B", 1: "C", 2: "A", 3: "D" },
        },
        {
          id: "q20",
          text: "Ghép các đồ thị hàm số (mô tả) với dạng hàm số tương ứng.",
          items: [
            "Đồ thị hình chữ W (hoặc M)",
            "Đồ thị hình chữ N (hoặc N ngược)",
            "Đồ thị là đường cong Hyperbol (có tiệm cận)",
            "Đồ thị là đường Parabol",
          ],
          options: [
            "A. Hàm bậc ba $y=ax^3+bx^2+cx+d$",
            "B. Hàm trùng phương $y=ax^4+bx^2+c$",
            "C. Hàm phân thức $y=\\frac{ax+b}{cx+d}$",
            "D. Hàm bậc hai $y=ax^2+bx+c$",
            "E. Hàm số mũ $y=a^x$",
            "F. Hàm lượng giác",
          ],
          answer: { 0: "B", 1: "A", 2: "C", 3: "D" },
        },
      ],
    },
    // PART 4: TRẢ LỜI NGẮN (Câu 21 - 25)
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
          mathText: "|w| = \\sqrt{13}",
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
          text: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{1}{3}x^3 - x^2 + mx + 1$ đồng biến trên $\\mathbb{R}$?",
          mathText: "y' \\ge 0 \\forall x",
          answer: "10",
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

  // Load MathJax
  useEffect(() => {
    if (!document.getElementById("mathjax-script")) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
      script.async = true;
      script.id = "mathjax-script";
      document.head.appendChild(script);

      window.MathJax = {
        tex: {
          inlineMath: [
            ["$", "$"],
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

  // Tính tổng điểm giả định
  useEffect(() => {
    let total = 0;
    testData.parts.forEach((part) => {
      part.questions.forEach(() => {
        total += 1; // Giả định mỗi câu 1 điểm cho đơn giản
      });
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
    // Logic chấm điểm đơn giản
    testData.parts.forEach((part) => {
      part.questions.forEach((q) => {
        // Logic chấm điểm chi tiết sẽ phức tạp hơn, ở đây demo tăng điểm nếu có tương tác
        if (answers[q.id]) currentScore += 1;
      });
    });
    setScore(currentScore);
    setSubmitted(true);
    clearInterval(timerRef.current);
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
    return `${darkMode ? "bg-slate-700 text-gray-600 dark:text-gray-300" : "bg-gray-200 text-gray-600"}`;
  };

  return (
    <div
      className={`min-h-screen pb-20 transition-colors duration-300 font-sans ${darkMode ? "bg-slate-900 text-slate-100" : "bg-indigo-50 text-slate-800"}`}
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
              <h1 className="font-bold text-lg leading-tight">
                VSAT MATH 2025
              </h1>
              <span className="text-xs opacity-70">Toán Học • 90 Phút</span>
            </div>
          </div>
          <div
            className={`flex items-center px-4 py-2 rounded-full font-mono font-bold text-xl tracking-wider shadow-inner ${timeLeft < 300 ? "bg-red-100 text-red-600 animate-pulse border border-red-200" : darkMode ? "bg-slate-950 text-emerald-400 border border-slate-700" : "bg-slate-100 text-indigo-600 border border-slate-200"}`}
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
              <div
                className={`font-bold text-emerald-500 px-3 py-1 rounded-full border border-emerald-200 ${darkMode ? "bg-emerald-900/30" : "bg-emerald-100"}`}
              >
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
        <main className="space-y-10 w-full mx-auto max-w-5xl">
          {testData.parts.map((part, partIndex) => {
            // Style riêng cho từng phần để dễ phân biệt
            let colorClass = "";
            let descColor = "";

            switch (part.type) {
              case "true-false":
                colorClass = darkMode
                  ? "bg-orange-900/30 border-orange-500 text-orange-200"
                  : "bg-orange-100/50 border-orange-500 text-orange-800";
                descColor = darkMode ? "text-orange-300" : "text-orange-700";
                break;
              case "matching":
                colorClass = darkMode
                  ? "bg-purple-900/30 border-purple-500 text-purple-200"
                  : "bg-purple-100/50 border-purple-500 text-purple-800";
                descColor = darkMode ? "text-purple-300" : "text-purple-700";
                break;
              case "short-answer":
                colorClass = darkMode
                  ? "bg-cyan-900/30 border-cyan-500 text-cyan-200"
                  : "bg-cyan-100/50 border-cyan-500 text-cyan-800";
                descColor = darkMode ? "text-cyan-300" : "text-cyan-700";
                break;
              default: // multiple-choice
                colorClass = darkMode
                  ? "bg-indigo-900/30 border-indigo-500 text-indigo-200"
                  : "bg-indigo-100/50 border-indigo-500 text-indigo-800";
                descColor = darkMode ? "text-indigo-300" : "text-indigo-700";
            }

            return (
              <div key={partIndex} className="space-y-6">
                {/* Part Header */}
                <div
                  className={`${colorClass} p-5 rounded-xl border-l-4 shadow-sm`}
                >
                  <h3 className="font-bold text-xl uppercase tracking-wide">
                    {part.title}
                  </h3>
                  <p className={`${descColor} text-base mt-2 font-medium`}>
                    {part.description}
                  </p>
                </div>

                {/* Questions Loop */}
                {part.questions.map((q) => {
                  const uVal = answers[q.id]?.[0] || "";
                  const displayNum = q.id.replace("q", "");
                  const image = q.image ? (
                    <div className="my-4 flex justify-center">
                      <img
                        src={q.image}
                        alt={`Hình câu ${displayNum}`}
                        className={`max-h-64 object-contain rounded-lg border shadow-sm ${darkMode ? "border-slate-600" : "border-gray-200"}`}
                      />
                    </div>
                  ) : null;

                  return (
                    <div
                      key={q.id}
                      id={q.id}
                      className={`rounded-xl shadow-sm border overflow-visible transition-shadow hover:shadow-md ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"} scroll-mt-28`}
                    >
                      {/* Question Header */}
                      <div
                        className={`flex justify-between items-center p-4 border-b rounded-t-xl ${darkMode ? "border-slate-700 bg-slate-800/50" : "border-gray-100 bg-gray-50/50"}`}
                      >
                        <h4
                          className={`font-bold text-lg ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                        >
                          Câu {displayNum}
                        </h4>
                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={
                            flagged[q.id]
                              ? "text-red-500 transform rotate-12 transition-transform"
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
                      <div className="p-5">
                        <div
                          className={`text-base leading-relaxed font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}
                        >
                          <MathRenderer content={q.text} />
                        </div>
                        {image}
                        {q.mathText && (
                          <div
                            className={`my-4 p-4 rounded-lg text-center overflow-x-auto ${darkMode ? "bg-slate-900/50" : "bg-gray-50"}`}
                          >
                            <MathRenderer
                              content={`$$${q.mathText}$$`}
                              block={true}
                            />
                          </div>
                        )}
                      </div>

                      {/* Interaction Area (Footer) */}
                      <div
                        className={`p-5 border-t rounded-b-xl ${darkMode ? "bg-slate-900/30 border-slate-700" : "bg-gray-50 border-gray-100"}`}
                      >
                        {/* 1. TRẮC NGHIỆM ĐÚNG SAI (PART 1) */}
                        {part.type === "true-false" && (
                          <div
                            className={`overflow-hidden rounded-lg border ${darkMode ? "border-slate-600 bg-slate-800" : "border-gray-200 bg-white"}`}
                          >
                            <table className="w-full text-sm">
                              <thead
                                className={`uppercase text-xs font-bold ${darkMode ? "bg-slate-700 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                              >
                                <tr>
                                  <th className="p-3 text-left w-full">
                                    Nội dung
                                  </th>
                                  <th
                                    className={`p-3 w-20 text-center border-l ${darkMode ? "border-slate-600" : "border-gray-200"}`}
                                  >
                                    Đúng
                                  </th>
                                  <th
                                    className={`p-3 w-20 text-center border-l ${darkMode ? "border-slate-600" : "border-gray-200"}`}
                                  >
                                    Sai
                                  </th>
                                </tr>
                              </thead>
                              <tbody
                                className={`divide-y ${darkMode ? "divide-slate-600" : "divide-gray-200"}`}
                              >
                                {q.statements.map((st) => {
                                  const uAns = answers[q.id]?.[st.id];
                                  const isCorrect = uAns === st.answer;
                                  const rowClass = submitted
                                    ? isCorrect
                                      ? darkMode
                                        ? "bg-emerald-900/20"
                                        : "bg-emerald-50"
                                      : darkMode
                                        ? "bg-rose-900/20"
                                        : "bg-rose-50"
                                    : darkMode
                                      ? "hover:bg-slate-700/50"
                                      : "hover:bg-gray-50";

                                  return (
                                    <tr key={st.id} className={rowClass}>
                                      <td className="p-3 align-middle">
                                        <span
                                          className={`font-bold mr-2 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                                        >
                                          {st.id})
                                        </span>
                                        <MathRenderer content={st.text} />
                                      </td>
                                      <td
                                        className={`p-3 text-center align-middle border-l ${darkMode ? "border-slate-600" : "border-gray-200"}`}
                                      >
                                        <input
                                          type="radio"
                                          checked={uAns === "T"}
                                          onChange={() =>
                                            handleAnswerChange(q.id, st.id, "T")
                                          }
                                          disabled={submitted}
                                          className="w-5 h-5 accent-indigo-600 cursor-pointer"
                                        />
                                      </td>
                                      <td
                                        className={`p-3 text-center align-middle border-l ${darkMode ? "border-slate-600" : "border-gray-200"}`}
                                      >
                                        <input
                                          type="radio"
                                          checked={uAns === "F"}
                                          onChange={() =>
                                            handleAnswerChange(q.id, st.id, "F")
                                          }
                                          disabled={submitted}
                                          className="w-5 h-5 accent-indigo-600 cursor-pointer"
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* 2. TRẮC NGHIỆM 4 LỰA CHỌN (PART 2) */}
                        {part.type === "multiple-choice" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {q.options.map((opt, idx) => {
                              const isSelected = answers[q.id]?.[0] === opt;
                              const isCorrect = q.answer === opt;
                              let bgClass = darkMode
                                ? "bg-slate-800 border-slate-600 hover:border-indigo-400"
                                : "bg-white border-gray-200 hover:border-indigo-400 hover:shadow-sm";

                              if (submitted) {
                                if (isCorrect)
                                  bgClass = darkMode
                                    ? "bg-emerald-900/20 border-emerald-500 text-emerald-300"
                                    : "bg-emerald-50 border-emerald-500 text-emerald-700";
                                else if (isSelected)
                                  bgClass = darkMode
                                    ? "bg-rose-900/20 border-rose-500 text-rose-300"
                                    : "bg-rose-50 border-rose-500 text-rose-700";
                                else bgClass = "opacity-50 grayscale";
                              } else if (isSelected) {
                                bgClass = darkMode
                                  ? "bg-indigo-900/30 border-indigo-500 ring-1 ring-indigo-500 text-indigo-100"
                                  : "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500 text-indigo-900";
                              }

                              return (
                                <button
                                  key={idx}
                                  disabled={submitted}
                                  onClick={() =>
                                    handleAnswerChange(q.id, 0, opt)
                                  }
                                  className={`p-4 text-left rounded-lg border transition-all flex items-center gap-4 ${bgClass} cursor-pointer`}
                                >
                                  <div
                                    className={`w-8 h-8 rounded-full border-2 flex flex-shrink-0 items-center justify-center text-sm font-bold ${isSelected || (submitted && isCorrect) ? "border-current" : "border-gray-300 text-gray-400"}`}
                                  >
                                    {String.fromCharCode(65 + idx)}
                                  </div>
                                  <div className="flex-1 text-base">
                                    <MathRenderer content={opt} />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 3. TRẮC NGHIỆM GHÉP NỐI (PART 3) - NEW UI WITH CUSTOM DROPDOWN */}
                        {part.type === "matching" && (
                          <div className="space-y-3">
                            {q.items.map((item, idx) => {
                              const currentVal = answers[q.id]?.[idx] || "";
                              // Logic hiển thị đúng sai sau khi nộp
                              const correctVal = q.answer[idx]; // e.g., "A", "B"
                              let borderClass = darkMode
                                ? "border-slate-600"
                                : "border-gray-300";
                              if (submitted) {
                                borderClass =
                                  currentVal === correctVal
                                    ? darkMode
                                      ? "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-900/10"
                                      : "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50"
                                    : darkMode
                                      ? "border-rose-500 ring-1 ring-rose-500 bg-rose-900/10"
                                      : "border-rose-500 ring-1 ring-rose-500 bg-rose-50";
                              }

                              return (
                                <div
                                  key={idx}
                                  className={`flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg border shadow-sm ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}
                                >
                                  {/* Left Content */}
                                  <div className="flex-1 flex gap-3">
                                    <span
                                      className={`font-bold ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                                    >
                                      {idx + 1}.
                                    </span>
                                    <div
                                      className={`${darkMode ? "text-gray-200" : "text-gray-800"}`}
                                    >
                                      <MathRenderer content={item} />
                                    </div>
                                  </div>

                                  {/* Right Dropdown (CustomDropdown) */}
                                  <div className="sm:w-1/3">
                                    <CustomDropdown
                                      options={q.options}
                                      value={currentVal}
                                      onChange={(val) =>
                                        handleAnswerChange(q.id, idx, val)
                                      }
                                      disabled={submitted}
                                      darkMode={darkMode}
                                    />
                                    {submitted && currentVal !== correctVal && (
                                      <div className="text-xs text-rose-500 mt-1 font-bold">
                                        Đáp án đúng: {correctVal}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {/* Hiển thị list Options đầy đủ phía dưới để tham chiếu (backup) */}
                            <div
                              className={`mt-4 p-4 rounded-lg border ${darkMode ? "bg-purple-900/20 border-purple-800" : "bg-purple-50 border-purple-100"}`}
                            >
                              <p
                                className={`text-sm font-bold mb-2 ${darkMode ? "text-purple-300" : "text-purple-800"}`}
                              >
                                Các lựa chọn:
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                {q.options.map((opt, i) => (
                                  <div key={i} className="flex gap-2">
                                    <MathRenderer content={opt} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. TRẢ LỜI NGẮN (PART 4) */}
                        {part.type === "short-answer" && (
                          <div className="flex flex-col sm:flex-row shadow-sm rounded-md overflow-hidden">
                            <div
                              className={`px-5 py-3 border-b sm:border-b-0 sm:border-r flex items-center justify-center sm:justify-start min-w-[100px] ${darkMode ? "bg-slate-700 border-slate-500" : "bg-gray-100 border-gray-300"}`}
                            >
                              <span
                                className={`font-bold text-sm uppercase ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              >
                                Trả lời
                              </span>
                            </div>
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                disabled={submitted}
                                value={uVal}
                                onChange={(e) =>
                                  handleAnswerChange(q.id, 0, e.target.value)
                                }
                                placeholder="Nhập kết quả (ví dụ: 1.5)"
                                className={`w-full h-full p-3 border-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-all font-mono text-lg ${darkMode ? "bg-slate-800 placeholder-slate-600" : "bg-white placeholder-gray-400"}`}
                              />
                              {submitted && (
                                <div
                                  className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2 ${darkMode ? "bg-slate-800" : "bg-white"}`}
                                >
                                  <span className="text-xs font-bold text-gray-500">
                                    Đáp án:
                                  </span>
                                  <span
                                    className={`font-mono font-bold ${uVal.trim() === q.answer ? "text-emerald-500" : "text-rose-500"}`}
                                  >
                                    {q.answer}
                                  </span>
                                </div>
                              )}
                            </div>
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
          <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar scroll-smooth">
            {testData.parts
              .flatMap((p) => p.questions)
              .map((q) => (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  className={`flex-shrink-0 w-9 h-9 rounded-lg text-xs font-bold border transition-all shadow-sm ${getNavBubbleClass(q)}`}
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
