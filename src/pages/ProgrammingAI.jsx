import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Code,
  Cpu,
  Layout,
  Play,
  CheckCircle,
  Menu,
  X,
  Award,
  Zap,
  Terminal,
  User,
  Moon,
  Sun,
  ArrowRight,
  Brain,
  Languages,
  Eye,
  Plus,
  Sparkles,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

// --- DATA: COURSES ---
const COURSES = [
  {
    id: 1,
    title: "Nhập môn JavaScript",
    level: "Cơ bản",
    language: "javascript",
    icon: "JS",
    color: "bg-yellow-500",
    description: "Làm quen với ngôn ngữ lập trình web phổ biến nhất thế giới.",
    totalLessons: 3,
    lessons: [
      {
        id: "js101",
        title: "Biến và Kiểu dữ liệu",
        content:
          "Trong JavaScript, chúng ta sử dụng `let`, `const`, và `var` để khai báo biến. `const` dùng cho hằng số.",
        initialCode:
          "// Khai báo biến 'name' với giá trị tên bạn\n\nconsole.log(name);",
        solution: "const name = 'Dev Vietnam';\nconsole.log(name);",
        type: "practice",
      },
      {
        id: "js102",
        title: "Câu điều kiện",
        content: "Câu lệnh `if` kiểm tra điều kiện đúng/sai.",
        initialCode: "let age = 15;\n// Kiểm tra nếu age >= 18 in ra 'Đủ tuổi'",
        solution: "if (age >= 18) console.log('Đủ tuổi');",
        type: "practice",
      },
      {
        id: "js103",
        title: "Vòng lặp",
        content: "Vòng lặp `for` lặp lại khối lệnh nhiều lần.",
        initialCode:
          "// In các số từ 0 đến 4\nfor(let i=0; i<5; i++) console.log(i);",
        solution: "for(let i=0; i<5; i++) console.log(i);",
        type: "practice",
      },
    ],
  },
  {
    id: 2,
    title: "ReactJS Căn bản",
    level: "Trung bình",
    language: "javascript",
    icon: "⚛️",
    color: "bg-blue-500",
    description:
      "Xây dựng giao diện người dùng hiện đại với thư viện React của Facebook.",
    totalLessons: 2,
    lessons: [
      {
        id: "react101",
        title: "Component là gì?",
        content:
          "Component là các khối xây dựng độc lập và có thể tái sử dụng.",
        initialCode: "function Welcome() {\n  return <h1>Xin chào!</h1>;\n}",
        type: "theory",
      },
      {
        id: "react102",
        title: "useState Hook",
        content: "useState cho phép thêm state vào function component.",
        initialCode: "const [count, setCount] = useState(0);",
        type: "practice",
      },
    ],
  },
  {
    id: 3,
    title: "Python cho AI",
    level: "Nâng cao",
    language: "python",
    icon: "🐍",
    color: "bg-green-600",
    description: "Học Python cơ bản để chuẩn bị cho AI.",
    totalLessons: 3,
    lessons: [
      {
        id: "py101",
        title: "Hello World",
        content: "Dùng `print()` để xuất dữ liệu.",
        initialCode: "print('Hello World')",
        type: "practice",
      },
      {
        id: "py102",
        title: "Biến Python",
        content: "Python không cần khai báo kiểu dữ liệu.",
        initialCode: "x = 10\nprint(x)",
        type: "practice",
      },
    ],
  },
];

// --- DATA: AI CHALLENGES ---
const INITIAL_CHALLENGES = [
  {
    id: "ez_sum",
    difficulty: "Easy",
    title: "Tổng hai số",
    description: "Viết hàm tính tổng hai số a và b.",
    input: "a=5, b=10",
    output: "15",
    initialCode: "let a = 5; let b = 10;\n// Tính tổng và in ra",
    solution: "console.log(a + b);",
  },
  {
    id: "med_rev",
    difficulty: "Medium",
    title: "Đảo ngược chuỗi",
    description: "Đảo ngược chuỗi s đã cho.",
    input: "s='hello'",
    output: "olleh",
    initialCode: "let s = 'hello';\n// Đảo ngược chuỗi s",
    solution: "console.log(s.split('').reverse().join(''));",
  },
];

// --- DATA: AI GENERATION TEMPLATES ---
const AI_TEMPLATES = [
  {
    title: "Giai thừa của N",
    difficulty: "Medium",
    desc: "Tính giai thừa của số nguyên dương n.",
    input: "n = 5",
    output: "120",
    code: "let n = 5;\n// Tính n! và in ra kết quả",
    sol: "let n=5; let r=1; for(let i=1;i<=n;i++) r*=i; console.log(r);",
  },
  {
    title: "Đếm số chẵn",
    difficulty: "Easy",
    desc: "Đếm xem có bao nhiêu số chẵn trong mảng arr.",
    input: "arr = [1, 2, 3, 4, 5, 6]",
    output: "3",
    code: "let arr = [1, 2, 3, 4, 5, 6];\n// Đếm số chẵn",
    sol: "console.log(arr.filter(x => x % 2 === 0).length);",
  },
  {
    title: "Kiểm tra Palindrome",
    difficulty: "Hard",
    desc: "Kiểm tra xem chuỗi s có phải là chuỗi đối xứng không (đọc xuôi ngược giống nhau). In 'true' hoặc 'false'.",
    input: "s = 'radar'",
    output: "true",
    code: "let s = 'radar';\n// Kiểm tra đối xứng",
    sol: "let rev = s.split('').reverse().join(''); console.log(s === rev);",
  },
  {
    title: "Tìm Max trong mảng",
    difficulty: "Easy",
    desc: "Tìm giá trị lớn nhất trong mảng số nguyên.",
    input: "arr = [10, 50, 20, 5]",
    output: "50",
    code: "let arr = [10, 50, 20, 5];\n// In ra số lớn nhất",
    sol: "console.log(Math.max(...arr));",
  },
];

// --- UTILS: EXECUTION ENGINE ---
const executeCode = (code, language) => {
  if (language === "javascript") {
    try {
      const logs = [];
      const mockConsole = {
        log: (...args) => logs.push(args.join(" ")),
        error: (...args) => logs.push(`Err: ${args.join(" ")}`),
        warn: (...args) => logs.push(`Warn: ${args.join(" ")}`),
      };
      new Function("console", code)(mockConsole);
      return logs.length ? logs : ["Chạy xong (Không output)"];
    } catch (e) {
      return [`Lỗi: ${e.message}`];
    }
  }

  if (language === "python") {
    // Simple Python Mock Interpreter
    const logs = [];
    const lines = code.split("\n");
    try {
      for (let line of lines) {
        line = line.trim();
        if (line.startsWith("print(") && line.endsWith(")")) {
          let content = line.slice(6, -1).replace(/['"]/g, "");
          logs.push(content);
        } else if (
          line.includes("=") &&
          !line.startsWith("if") &&
          !line.startsWith("for")
        ) {
          // Variable assignment mock
        } else if (line.startsWith("for ") && line.includes("range(")) {
          const match = line.match(/range\((\d+)\)/);
          if (match) {
            const n = parseInt(match[1]);
            for (let i = 0; i < n; i++) logs.push(i);
          }
        }
      }
      return logs.length > 0 ? logs : ["Code Python chạy xong (Mock Mode)."];
    } catch (e) {
      return [`Lỗi Python: ${e.message}`];
    }
  }
  return [];
};

// --- COMPONENTS ---

const Sidebar = ({
  activeView,
  setActiveView,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: <Layout size={20} /> },
    { id: "courses", label: "Khóa học", icon: <BookOpen size={20} /> },
    { id: "ai-practice", label: "Thử thách AI", icon: <Brain size={20} /> },
    { id: "playground", label: "Playground", icon: <Terminal size={20} /> },
    { id: "ai-chat", label: "Trợ lý AI", icon: <MessageSquare size={20} /> },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-slate-900 text-white transition-transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static flex flex-col`}
      >
        <div className="p-6 text-xl font-bold text-blue-400 flex items-center gap-2">
          <Cpu /> CodeMaster AI
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((i) => (
            <button
              key={i.id}
              onClick={() => {
                setActiveView(i.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeView === i.id
                  ? "bg-blue-600"
                  : "hover:bg-slate-800 text-slate-400"
              }`}
            >
              {i.icon} <span>{i.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 bg-slate-950 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold">
              DV
            </div>
            <div>
              <p className="text-sm font-semibold">Dev Vietnam</p>
              <p className="text-xs text-slate-400">Pro Member</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// 1. DASHBOARD
const Dashboard = ({ setActiveView }) => (
  <div className="p-6 max-w-7xl mx-auto space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Xin chào, Dev!</h1>
        <p className="text-slate-500">Sẵn sàng code chưa?</p>
      </div>
      <div className="flex gap-3 bg-white dark:bg-slate-800 p-2 rounded-lg border dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 px-2">
          <Zap className="text-yellow-500" size={16} />
          <span className="font-bold text-sm dark:text-white">3 Ngày</span>
        </div>
        <div className="w-px bg-slate-200"></div>
        <div className="flex items-center gap-2 px-2">
          <Award className="text-blue-500" size={16} />
          <span className="font-bold text-sm dark:text-white">450 XP</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-bold text-xl mb-1">Python cho AI</h3>
        <div className="text-indigo-200 text-sm mb-4">Tiếp tục bài 2</div>
        <div className="w-full bg-black/20 h-1.5 rounded-full mb-4">
          <div className="bg-white w-1/3 h-1.5 rounded-full"></div>
        </div>
        <button
          onClick={() => setActiveView("courses")}
          className="w-full py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-bold flex items-center justify-center gap-2"
        >
          Tiếp tục <ArrowRight size={14} />
        </button>
      </div>
      <div
        onClick={() => setActiveView("ai-practice")}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl border dark:border-slate-700 hover:border-purple-500 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mb-3">
          <Brain size={20} />
        </div>
        <h3 className="font-bold dark:text-white">Luyện tập AI</h3>
        <p className="text-xs text-slate-500 mt-1">Thử thách tạo tự động</p>
      </div>
      <div
        onClick={() => setActiveView("playground")}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl border dark:border-slate-700 hover:border-blue-500 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-3">
          <Terminal size={20} />
        </div>
        <h3 className="font-bold dark:text-white">Playground</h3>
        <p className="text-xs text-slate-500 mt-1">Code tự do JS/Python</p>
      </div>
    </div>
  </div>
);

// 2. LEARNING SPACE (RESTORED)
const LearningSpace = ({ courseId, onExit }) => {
  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  const currentLesson = course.lessons[currentLessonIndex];

  useEffect(() => {
    if (currentLesson) {
      setCode(currentLesson.initialCode);
      setOutput([]);
      setAiFeedback(null);
    }
  }, [currentLessonIndex, currentLesson]);

  const runCode = () => {
    setOutput([]);
    const result = executeCode(code, course.language);
    setOutput(result);
  };

  const analyzeCodeWithAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let feedback = "";
      const lowerCode = code.toLowerCase();
      if (output.length > 0 && output[0].toString().includes("Lỗi")) {
        feedback = "❌ Có lỗi trong code. Kiểm tra cú pháp nhé.";
      } else {
        feedback = "✅ Code chạy tốt! Cấu trúc rõ ràng.";
      }
      setAiFeedback(feedback);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      <div className="h-16 border-b dark:border-slate-800 flex items-center justify-between px-4 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <X size={20} className="text-slate-500" />
          </button>
          <div>
            <h2 className="font-bold dark:text-white">{course.title}</h2>
            <p className="text-xs text-slate-500">
              Bài {currentLessonIndex + 1}: {currentLesson.title}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            disabled={currentLessonIndex === 0}
            onClick={() => setCurrentLessonIndex((p) => p - 1)}
            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm disabled:opacity-50"
          >
            Trước
          </button>
          <button
            disabled={currentLessonIndex === course.lessons.length - 1}
            onClick={() => setCurrentLessonIndex((p) => p + 1)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/3 p-6 border-r dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-4">{currentLesson.title}</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                {currentLesson.content}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col bg-[#1e1e1e]">
          <div className="flex justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <Code size={14} /> main.
              {course.language === "python" ? "py" : "js"}
            </div>
            <div className="flex gap-2">
              <button
                onClick={analyzeCodeWithAI}
                className="px-3 py-1 bg-purple-600 text-white text-xs rounded flex gap-1 items-center"
              >
                {isAnalyzing ? (
                  <Sparkles size={12} className="animate-spin" />
                ) : (
                  <Brain size={12} />
                )}{" "}
                AI Check
              </button>
              <button
                onClick={runCode}
                className="px-3 py-1 bg-green-600 text-white text-xs rounded flex gap-1 items-center"
              >
                <Play size={12} /> Run
              </button>
            </div>
          </div>
          <div className="flex-1 relative font-mono text-sm">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-[#1e1e1e] text-slate-300 p-4 resize-none outline-none"
              spellCheck="false"
            />
            {aiFeedback && (
              <div className="absolute bottom-4 left-4 right-4 bg-slate-800 p-3 rounded shadow-xl text-slate-200 text-sm flex justify-between">
                <span>{aiFeedback}</span>
                <button onClick={() => setAiFeedback(null)}>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
          <div className="h-1/3 bg-[#0d0d0d] border-t border-[#333] p-4 font-mono text-sm overflow-y-auto">
            <div className="text-xs text-slate-500 mb-2">OUTPUT</div>
            {output.map((l, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-green-500 mr-2">➜</span>
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. COURSE LIST (RESTORED)
const CourseList = ({ startCourse }) => (
  <div className="p-6 max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold dark:text-white mb-6">
      Thư viện khóa học
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COURSES.map((course) => (
        <div
          key={course.id}
          className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border dark:border-slate-700 hover:shadow-lg transition group"
        >
          <div
            className={`h-32 ${course.color} p-6 flex flex-col justify-between`}
          >
            <div className="flex justify-between">
              <div className="text-3xl">{course.icon}</div>
              <span className="bg-black/20 text-white text-[10px] px-2 py-1 rounded uppercase">
                {course.language}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{course.title}</h3>
          </div>
          <div className="p-6">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
            <button
              onClick={() => startCourse(course.id)}
              className="w-full py-2 rounded-lg border-2 border-slate-100 dark:border-slate-600 hover:border-blue-500 hover:text-blue-500 dark:text-slate-200 font-bold transition"
            >
              Vào học ngay
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 4. PLAYGROUND (RESTORED)
const Playground = () => {
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState(
    "// Viết code JS tại đây\nconsole.log('Hello World');"
  );
  const [output, setOutput] = useState([]);

  const handleRun = () => {
    setOutput(executeCode(code, lang));
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-slate-300">
      <div className="h-14 bg-[#252526] border-b border-[#333] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-white flex gap-2">
            <Terminal size={18} /> Playground
          </h2>
          <div className="flex bg-[#333] p-1 rounded">
            {["javascript", "python"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setCode(
                    l === "python"
                      ? "print('Hello Python')"
                      : "console.log('Hello JS')"
                  );
                  setOutput([]);
                }}
                className={`px-3 py-1 rounded text-xs capitalize ${
                  lang === l ? "bg-blue-600 text-white" : "text-slate-400"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleRun}
          className="bg-green-600 text-white px-4 py-1.5 rounded text-sm font-bold flex gap-2"
        >
          <Play size={16} /> Run
        </button>
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 bg-[#1e1e1e] text-slate-300 p-6 resize-none outline-none font-mono"
          spellCheck="false"
        />
        <div className="w-full md:w-1/3 bg-[#0d0d0d] border-l border-[#333] flex flex-col">
          <div className="px-4 py-2 bg-[#333] text-xs font-bold text-slate-400">
            OUTPUT
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto">
            {output.map((l, i) => (
              <div key={i} className="mb-1 border-b border-white/5 pb-1">
                <span className="text-slate-200">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. AI CHAT (RESTORED)
const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Chào bạn! Mình có thể giúp gì về code JS hoặc Python hôm nay?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((p) => [...p, { id: Date.now(), sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Mình đã nhận được câu hỏi. Đây là tính năng giả lập, hãy thử Playground nhé!",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl mx-auto my-4 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 overflow-hidden">
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b dark:border-slate-700 font-bold dark:text-white flex gap-2">
        <Cpu /> Trợ lý AI
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-100 dark:bg-[#0f172a]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                m.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white dark:bg-slate-700 dark:text-white rounded-tl-none shadow"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-700 flex gap-2">
        <input
          className="flex-1 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl outline-none dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-xl"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

// 6. AI PRACTICE VIEW & CHALLENGE INTERFACE (NEW)
const ChallengeInterface = ({ challenge, onExit }) => {
  const [code, setCode] = useState(challenge.initialCode);
  const [output, setOutput] = useState([]);
  const [status, setStatus] = useState(null);

  const runCheck = () => {
    const logs = executeCode(code, "javascript");
    setOutput(logs);
    const lastLog = logs.length ? logs[logs.length - 1].toString() : "";
    setStatus(lastLog == challenge.output ? "success" : "error");
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      <div className="h-16 border-b dark:border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={onExit}>
            <X className="text-slate-500" />
          </button>
          <div>
            <h2 className="font-bold dark:text-white">{challenge.title}</h2>
            <span
              className={`text-[10px] px-2 py-0.5 rounded text-white ${
                challenge.difficulty === "Easy"
                  ? "bg-green-500"
                  : challenge.difficulty === "Medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {challenge.difficulty}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCode(challenge.solution)}
            className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-sm flex gap-2 items-center dark:text-slate-300"
          >
            <Eye size={14} /> Giải
          </button>
          <button
            onClick={runCheck}
            className="px-4 py-1.5 rounded bg-blue-600 text-white font-bold text-sm flex gap-2 items-center"
          >
            <Play size={14} /> Chạy
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/3 p-6 border-r dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          <h3 className="font-bold mb-4 dark:text-white">Đề bài:</h3>
          <p className="mb-4 text-slate-700 dark:text-slate-300">
            {challenge.description}
          </p>
          <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded p-4 text-sm mb-4">
            <div className="mb-2">
              <span className="text-slate-400 text-xs">INPUT:</span>{" "}
              <code className="block bg-slate-100 dark:bg-black p-1 rounded mt-1 dark:text-slate-200">
                {challenge.input}
              </code>
            </div>
            <div>
              <span className="text-slate-400 text-xs">OUTPUT KỲ VỌNG:</span>{" "}
              <code className="block bg-green-50 dark:bg-green-900/20 text-green-600 p-1 rounded mt-1 font-bold">
                {challenge.output}
              </code>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 flex flex-col bg-[#1e1e1e]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-[#1e1e1e] text-slate-300 p-4 resize-none outline-none font-mono"
            spellCheck="false"
          />
          {status === "success" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <h3 className="text-xl font-bold dark:text-white">
                  Chính xác!
                </h3>
                <div className="mt-4 flex gap-2 justify-center">
                  <button
                    onClick={() => setStatus(null)}
                    className="px-4 py-2 bg-slate-200 rounded"
                  >
                    Xem lại
                  </button>
                  <button
                    onClick={onExit}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Xong
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="h-40 bg-[#0d0d0d] border-t border-[#333] p-4 font-mono text-sm overflow-y-auto">
            <div className="text-xs text-slate-500 mb-2">CONSOLE</div>
            {output.map((l, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-green-500 mr-2">➜</span>
                {l}
              </div>
            ))}
            {status === "error" && (
              <div className="text-red-400 mt-2 text-xs border-t border-red-900 pt-2">
                Kết quả không khớp output kỳ vọng.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AIPracticeView = ({ challenges, onSelect, onGenerate }) => {
  const [filter, setFilter] = useState("All");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenClick = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    onGenerate();
    setIsGenerating(false);
  };

  const list =
    filter === "All"
      ? challenges
      : challenges.filter((c) => c.difficulty === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
            <Brain className="text-purple-500" /> Thử thách AI
          </h2>
          <p className="text-slate-500 text-sm">
            Kho bài tập vô hạn được tạo bởi AI.
          </p>
        </div>
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded border dark:border-slate-700">
          {["All", "Easy", "Medium", "Hard"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-sm rounded ${
                filter === f
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-white"
                  : "text-slate-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={!isGenerating ? handleGenClick : undefined}
          className={`border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isGenerating
              ? "bg-slate-50 dark:bg-slate-900 cursor-wait"
              : "hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-500"
          }`}
        >
          {isGenerating ? (
            <div className="flex flex-col items-center animate-pulse">
              <Sparkles className="w-8 h-8 text-purple-500 mb-2 animate-spin" />
              <span className="text-sm font-bold text-purple-500">
                AI đang suy nghĩ...
              </span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-3 flex items-center justify-center">
                <Plus size={24} className="text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-600 dark:text-slate-300">
                Tạo bài tập mới
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Sử dụng AI để sinh thử thách
              </p>
            </>
          )}
        </div>
        {list.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="bg-white dark:bg-slate-800 p-5 rounded-xl border dark:border-slate-700 hover:shadow-lg cursor-pointer transition group"
          >
            <div className="flex justify-between mb-4">
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                  c.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : c.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {c.difficulty}
              </span>
              <Code
                size={16}
                className="text-slate-300 group-hover:text-purple-500"
              />
            </div>
            <h3 className="font-bold mb-1 dark:text-white line-clamp-1">
              {c.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
              {c.description}
            </p>
            <div className="text-[10px] text-slate-400 flex gap-3">
              <span className="flex gap-1 items-center">
                <Zap size={10} /> +XP
              </span>
              <span className="flex gap-1 items-center">
                <Languages size={10} /> JS
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function CodeMasterAI() {
  const [activeView, setActiveView] = useState("dashboard");
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeChallengeId, setActiveChallengeId] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleGenerateChallenge = () => {
    const randomTemplate =
      AI_TEMPLATES[Math.floor(Math.random() * AI_TEMPLATES.length)];
    const newChallenge = {
      ...randomTemplate,
      id: `ai_gen_${Date.now()}`,
      description: randomTemplate.desc,
      initialCode: randomTemplate.code,
      solution: randomTemplate.sol,
    };
    setChallenges((prev) => [newChallenge, ...prev]);
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard setActiveView={setActiveView} />;
      case "ai-practice":
        return (
          <AIPracticeView
            challenges={challenges}
            onSelect={(id) => {
              setActiveChallengeId(id);
              setActiveView("challenge");
            }}
            onGenerate={handleGenerateChallenge}
          />
        );
      case "challenge":
        return activeChallengeId ? (
          <ChallengeInterface
            challenge={challenges.find((i) => i.id === activeChallengeId)}
            onExit={() => setActiveView("ai-practice")}
          />
        ) : (
          <div>Error</div>
        );
      case "courses":
        return (
          <CourseList
            startCourse={(id) => {
              setActiveCourseId(id);
              setActiveView("learning");
            }}
          />
        );
      case "learning":
        return activeCourseId ? (
          <LearningSpace
            courseId={activeCourseId}
            onExit={() => setActiveView("courses")}
          />
        ) : (
          <div>Error</div>
        );
      case "playground":
        return <Playground />;
      case "ai-chat":
        return <AIChat />;
      default:
        return (
          <div className="p-10 text-center text-slate-500">
            Đang phát triển...
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-slate-50 dark:bg-[#0b1120] text-slate-900 transition-colors">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {activeView !== "challenge" &&
            activeView !== "learning" &&
            activeView !== "playground" && (
              <div className="h-16 border-b dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsMobileOpen(true)}
                    className="lg:hidden"
                  >
                    <Menu className="text-slate-500" />
                  </button>
                  <h2 className="font-bold text-lg capitalize dark:text-white">
                    {activeView === "ai-practice"
                      ? "Thử thách AI"
                      : activeView === "ai-chat"
                      ? "Trợ lý AI"
                      : activeView}
                  </h2>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            )}
          <div className="flex-1 overflow-y-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
