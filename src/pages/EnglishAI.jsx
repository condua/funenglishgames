import React, { useState, useEffect, useRef } from "react";
import {
  Headphones,
  PenTool,
  MessageSquare,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Settings,
  Sparkles,
  ChevronLeft,
  List,
  Bot,
  Zap,
  Send,
  Trash2,
  Copy,
  X,
  Search,
  ThumbsUp,
  Menu,
  MoreHorizontal,
} from "lucide-react";

// --- STYLES & ANIMATIONS ---
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
  
  /* Custom Scrollbar */
  .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  
  /* Hide Scrollbar but keep functionality for Horizontal Nav */
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

// --- CONFIGURATION & API ---
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY; // Đảm bảo bạn đã cấu hình file .env
const SITE_URL = "https://your-site.com"; // Thay thế bằng URL thực tế của bạn nếu có
const SITE_NAME = "LinguaAI";

const MODEL = "tngtech/deepseek-r1t2-chimera:free"; // Hoặc model khác tùy chọn

// Helper to clean JSON response
const cleanAndParseJSON = (text) => {
  try {
    let cleaned = text.replace(/```json\n?|```/g, "").trim();
    // Tìm JSON object/array đầu tiên và cuối cùng
    const firstBrace = cleaned.indexOf("{");
    const firstBracket = cleaned.indexOf("[");
    const lastBrace = cleaned.lastIndexOf("}");
    const lastBracket = cleaned.lastIndexOf("]");

    let start = -1;
    let end = -1;

    // Xác định xem nó là Object {} hay Array []
    if (
      firstBrace !== -1 &&
      (firstBracket === -1 || firstBrace < firstBracket)
    ) {
      start = firstBrace;
      end = lastBrace;
    } else if (firstBracket !== -1) {
      start = firstBracket;
      end = lastBracket;
    }

    if (start !== -1 && end !== -1) {
      cleaned = cleaned.substring(start, end + 1);
    }
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
};

const generateContent = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            ...(systemInstruction
              ? [{ role: "system", content: systemInstruction }]
              : []),
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    if (!response.ok) throw new Error("Kết nối API thất bại");
    const data = await response.json();

    // Deepseek đôi khi trả về text lẫn lộn, hàm clean rất quan trọng
    const content = data.choices[0]?.message?.content || "";
    return cleanAndParseJSON(content);
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};

const generateTextContent = async (prompt, systemInstruction = "") => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            ...(systemInstruction
              ? [{ role: "system", content: systemInstruction }]
              : []),
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    if (!response.ok) throw new Error("Kết nối API thất bại");
    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI Text Error:", error);
    throw error;
  }
};

// --- UI COMPONENTS ---

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-[90vw] w-full sm:w-auto pointer-events-none">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-slide-in border transition-all ${
          toast.type === "error"
            ? "bg-red-50/90 border-red-200 text-red-800"
            : "bg-emerald-50/90 border-emerald-200 text-emerald-800"
        }`}
      >
        {toast.type === "error" ? (
          <AlertCircle size={20} className="shrink-0" />
        ) : (
          <CheckCircle size={20} className="shrink-0" />
        )}
        <span className="text-sm font-semibold">{toast.message}</span>
        <button
          onClick={() => removeToast(toast.id)}
          className="ml-auto p-1 hover:bg-black/5 rounded-full"
        >
          <X size={16} />
        </button>
      </div>
    ))}
  </div>
);

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000
    );
  };
  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));
  return { toasts, addToast, removeToast };
};

const Navbar = ({ currentView, setView }) => (
  <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView("home")}
        >
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Lingua<span className="text-indigo-600">AI</span>
          </span>
        </div>

        {/* Desktop Title (Hidden on mobile) */}
        <div className="hidden md:block text-sm font-medium text-gray-500">
          Trợ lý học tiếng Anh toàn diện
        </div>
      </div>

      {/* Scrollable Navigation Menu */}
      <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 gap-2 md:gap-4 border-t md:border-t-0 border-gray-100 py-2 md:py-0 md:h-12 items-center">
        <NavButton
          view="listening"
          current={currentView}
          setView={setView}
          icon={<Headphones size={18} />}
          label="Nghe"
        />
        <NavButton
          view="writing"
          current={currentView}
          setView={setView}
          icon={<PenTool size={18} />}
          label="Viết"
        />
        <NavButton
          view="speaking"
          current={currentView}
          setView={setView}
          icon={<MessageSquare size={18} />}
          label="Hội Thoại"
        />
        <NavButton
          view="vocabulary"
          current={currentView}
          setView={setView}
          icon={<BookOpen size={18} />}
          label="Từ Vựng"
        />
        <NavButton
          view="checker"
          current={currentView}
          setView={setView}
          icon={<Search size={18} />}
          label="Check Câu"
        />
      </div>
    </div>
  </nav>
);

const NavButton = ({ view, current, setView, icon, label }) => {
  const isActive = current === view;
  return (
    <button
      onClick={() => setView(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        isActive
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
          : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// --- FEATURE VIEWS ---

const HomeView = ({ setView }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in space-y-12">
    <div className="text-center max-w-2xl mx-auto space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
        <Zap size={14} className="fill-indigo-700" /> AI Powered 2025
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
        Học Tiếng Anh <br className="md:hidden" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
          Thông Minh Hơn
        </span>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Không chỉ là công cụ, đây là người bạn đồng hành giúp bạn cải thiện 4 kỹ
        năng Nghe, Nói, Đọc, Viết với sức mạnh của Gemini AI.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full max-w-7xl px-2">
      <FeatureCard
        onClick={() => setView("listening")}
        icon={<Headphones className="w-8 h-8 text-white" />}
        color="bg-blue-500"
        title="Luyện Nghe"
        desc="Chép chính tả & Audio"
      />
      <FeatureCard
        onClick={() => setView("writing")}
        icon={<PenTool className="w-8 h-8 text-white" />}
        color="bg-violet-500"
        title="Luyện Viết"
        desc="Sửa lỗi IELTS & Essay"
      />
      <FeatureCard
        onClick={() => setView("speaking")}
        icon={<MessageSquare className="w-8 h-8 text-white" />}
        color="bg-emerald-500"
        title="Hội Thoại"
        desc="Roleplay ngữ cảnh thực"
      />
      <FeatureCard
        onClick={() => setView("vocabulary")}
        icon={<List className="w-8 h-8 text-white" />}
        color="bg-amber-500"
        title="Từ Vựng"
        desc="Flashcards thông minh"
      />
      <FeatureCard
        onClick={() => setView("checker")}
        icon={<Search className="w-8 h-8 text-white" />}
        color="bg-pink-500"
        title="Check Câu"
        desc="Sửa ngữ pháp tức thì"
      />
    </div>
  </div>
);

const FeatureCard = ({ onClick, icon, color, title, desc }) => (
  <div
    onClick={onClick}
    className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150`}
    ></div>
    <div
      className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm font-medium">{desc}</p>
    <div className="mt-4 flex items-center text-sm font-semibold text-gray-400 group-hover:text-indigo-600 transition-colors">
      Bắt đầu ngay <ArrowRight size={16} className="ml-1" />
    </div>
  </div>
);

// --- LISTENING COMPONENT ---
const ListeningPractice = ({ addToast }) => {
  const [topic, setTopic] = useState("Daily Routine");
  const [level, setLevel] = useState("Intermediate");
  const [exercise, setExercise] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(1);
  const synth = useRef(window.speechSynthesis);

  // Stop audio on unmount
  useEffect(() => {
    return () => synth.current.cancel();
  }, []);

  const generate = async () => {
    setLoading(true);
    setExercise(null);
    setResult(null);
    setUserInput("");
    try {
      if (synth.current.speaking) synth.current.cancel();
      const prompt = `Topic: ${topic}. Level: ${level}. Generate a short paragraph (30-50 words) for dictation practice. Output strict JSON: {"text": "English text here", "translation": "Vietnamese translation here", "difficult_words": ["word1", "word2"]}`;
      const data = await generateContent(prompt, "You are an English teacher.");
      if (data && data.text) {
        setExercise(data);
        addToast("Đã tạo bài tập thành công!", "success");
      } else {
        throw new Error("Dữ liệu không hợp lệ");
      }
    } catch (e) {
      addToast("Lỗi tạo bài tập. Thử lại nhé!", "error");
    }
    setLoading(false);
  };

  const toggleAudio = () => {
    if (!exercise) return;
    if (isPlaying) {
      synth.current.cancel(); // Cancel stops completely is safer than pause for short texts
      setIsPlaying(false);
    } else {
      const u = new SpeechSynthesisUtterance(exercise.text);
      u.rate = rate;
      u.lang = "en-US";
      u.onend = () => setIsPlaying(false);
      u.onerror = () => setIsPlaying(false);
      synth.current.speak(u);
      setIsPlaying(true);
    }
  };

  const check = () => {
    if (!exercise) return;
    const clean = (s) =>
      s
        .replace(/[^\w\s]/g, "")
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w);
    const org = clean(exercise.text);
    const usr = clean(userInput);

    let matches = 0;
    org.forEach((w, i) => {
      if (usr[i] === w) matches++;
    });

    const accuracy =
      org.length > 0 ? Math.round((matches / org.length) * 100) : 0;
    setResult({ acc: accuracy });
    addToast(`Độ chính xác: ${accuracy}%`, accuracy > 80 ? "success" : "error");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* Controls Card */}
      <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Chủ đề
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              placeholder="Ví dụ: Technology..."
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Trình độ
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full mt-1 border border-gray-200 bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            >
              <option>Beginner (A1-A2)</option>
              <option>Intermediate (B1-B2)</option>
              <option>Advanced (C1-C2)</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={generate}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles size={18} /> Tạo Bài Mới
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {exercise && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audio & Input Section */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border-l-8 border-blue-500 flex flex-col h-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-md ${
                    isPlaying
                      ? "bg-red-500 text-white rotate-180"
                      : "bg-blue-500 text-white hover:scale-110"
                  }`}
                >
                  {isPlaying ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} className="ml-1" />
                  )}
                </button>
                <div className="text-sm font-medium text-gray-500">
                  {isPlaying ? "Đang đọc..." : "Nhấn để nghe"}
                </div>
              </div>

              <div className="flex bg-gray-100 p-1 rounded-lg">
                {[0.7, 1, 1.2].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md transition ${
                      rate === r
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 w-full min-h-[150px] p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-700 text-lg leading-relaxed custom-scrollbar resize-none"
              placeholder="Nghe và chép lại những gì bạn nghe được..."
            />

            <button
              onClick={check}
              className="mt-4 w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 font-bold shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} /> Kiểm tra kết quả
            </button>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            {result ? (
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 animate-slide-in h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Kết quả chi tiết
                  </h3>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-bold ${
                      result.acc >= 80
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {result.acc}% Chính xác
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Văn bản gốc
                    </span>
                    <div className="mt-1 p-4 bg-indigo-50 rounded-2xl text-gray-800 border border-indigo-100 text-base leading-relaxed">
                      {exercise.text}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      Dịch nghĩa
                    </span>
                    <div className="mt-1 p-4 bg-gray-50 rounded-2xl text-gray-600 border border-gray-100 italic">
                      {exercise.translation}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 p-6 text-center">
                <Headphones size={48} className="mb-3 opacity-50" />
                <p>Kết quả so sánh sẽ hiển thị tại đây sau khi bạn nộp bài.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- WRITING COMPONENT ---
const WritingPractice = ({ addToast }) => {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const review = async () => {
    if (!essay.trim()) {
      addToast("Hãy viết gì đó trước nhé!", "error");
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const prompt = `Analyze this writing text. Output strictly JSON: { "score": "Estimated Band score (if IELTS) or Level", "corrected_version": "Full corrected text", "general_feedback": "Vietnamese feedback summary", "mistakes": [{ "original": "wrong phrase", "correction": "right phrase", "explanation": "Vietnamese explanation" }] }`;
      const data = await generateContent(
        `Text to check: """${essay}"""`,
        prompt
      );
      if (data) {
        setFeedback(data);
        addToast("Đã chấm xong bài viết!", "success");
      }
    } catch (e) {
      addToast("Lỗi khi chấm bài. Vui lòng thử lại.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-4 animate-fade-in pb-2">
      {/* Writing Area */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-500">
            <PenTool size={16} />
            <span className="text-sm font-medium">Writing Editor</span>
          </div>
          <div className="text-xs font-bold bg-white border px-2 py-1 rounded text-gray-500">
            {essay.split(/\s+/).filter((w) => w).length} Words
          </div>
        </div>
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          className="flex-1 w-full p-6 text-base lg:text-lg outline-none resize-none custom-scrollbar leading-relaxed"
          placeholder="Viết bài luận hoặc đoạn văn tiếng Anh của bạn vào đây..."
        />
        <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
          <button
            onClick={review}
            disabled={loading || !essay}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 disabled:opacity-50 font-bold flex gap-2 items-center shadow-lg shadow-violet-200 transition-all active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles size={18} /> Chấm Bài Ngay
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Area */}
      <div
        className={`flex-1 lg:max-w-[45%] bg-gray-50/50 rounded-3xl border border-gray-200 overflow-hidden flex flex-col ${
          !feedback ? "justify-center items-center" : ""
        }`}
      >
        {!feedback ? (
          <div className="text-center text-gray-400 p-8">
            <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-4">
              <Search size={32} className="text-violet-300" />
            </div>
            <p className="font-medium">
              Kết quả phân tích và sửa lỗi <br /> sẽ hiển thị tại đây.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg opacity-90">
                  Đánh giá tổng quan
                </h3>
                <p className="text-sm opacity-75">AI Corrector</p>
              </div>
              <div className="text-3xl font-black bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                {feedback.score}
              </div>
            </div>

            {/* General Feedback */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Nhận xét chung
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feedback.general_feedback}
              </p>
            </div>

            {/* Mistakes */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-800 ml-1">
                Chi tiết lỗi ({feedback.mistakes?.length || 0})
              </h4>
              {feedback.mistakes?.map((m, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl border-l-4 border-red-400 shadow-sm text-sm"
                >
                  <div className="flex flex-wrap gap-2 mb-2 items-center">
                    <span className="line-through text-red-500 bg-red-50 px-2 py-0.5 rounded decoration-red-500/50">
                      {m.original}
                    </span>
                    <ArrowRight size={14} className="text-gray-300" />
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {m.correction}
                    </span>
                  </div>
                  <p className="text-gray-500 italic text-xs border-t pt-2 mt-2">
                    {m.explanation}
                  </p>
                </div>
              ))}
            </div>

            {/* Corrected Version */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 relative group">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(feedback.corrected_version);
                  addToast("Đã copy bài sửa!", "success");
                }}
                className="absolute top-4 right-4 text-gray-300 hover:text-emerald-600 p-2 hover:bg-emerald-50 rounded-lg transition"
              >
                <Copy size={18} />
              </button>
              <h4 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <CheckCircle size={16} /> Phiên bản hoàn chỉnh
              </h4>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                {feedback.corrected_version}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- CONVERSATION COMPONENT ---
const ConversationPractice = ({ addToast }) => {
  const [scenario, setScenario] = useState("Job Interview");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const start = async () => {
    setMessages([]);
    setLoading(true);
    try {
      const text = await generateTextContent(
        `Roleplay Scenario: ${scenario}. Initiate the conversation as the other person. Start with a greeting and a relevant opening question. Keep it short and natural.`,
        "You are a helpful English roleplay partner."
      );
      setMessages([{ role: "ai", text }]);
    } catch (e) {
      addToast("Lỗi khởi tạo hội thoại.", "error");
    }
    setLoading(false);
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const hist = [...messages, userMsg]
        .map((m) => `${m.role === "user" ? "User" : "Partner"}: ${m.text}`)
        .join("\n");
      const text = await generateTextContent(
        `History:\n${hist}\nUser just said: "${input}".\nRespond naturally in the role of ${scenario}. Keep response concise (under 40 words).`,
        "You are a helpful English roleplay partner."
      );
      setMessages((prev) => [...prev, { role: "ai", text }]);
    } catch (e) {
      addToast("Lỗi kết nối.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-fade-in bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Bot size={24} />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-bold uppercase">
              Tình huống
            </div>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="font-bold text-gray-800 outline-none bg-transparent cursor-pointer hover:text-emerald-600 transition"
            >
              <option value="Job Interview">Phỏng vấn xin việc</option>
              <option value="Coffee Shop">Gọi đồ tại cafe</option>
              <option value="Hotel Check-in">Check-in Khách sạn</option>
              <option value="First Date">Buổi hẹn hò đầu</option>
              <option value="Immigration">Hải quan sân bay</option>
            </select>
          </div>
        </div>
        <button
          onClick={start}
          className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200"
        >
          Làm mới
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2 opacity-60">
            <MessageSquare size={48} />
            <p>Chọn tình huống và nhấn "Làm mới" để bắt đầu</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2 shrink-0 mt-2">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3.5 rounded-2xl text-sm md:text-base shadow-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2 mt-1">
              <Bot size={16} />
            </div>
            <div className="bg-white border p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t shrink-0">
        <div className="flex gap-2 items-end bg-gray-50 border border-gray-200 p-2 rounded-3xl focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Nhập tin nhắn..."
            className="flex-1 bg-transparent px-4 py-2.5 outline-none resize-none max-h-32 custom-scrollbar text-sm md:text-base"
            rows={1}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !input}
            className="bg-emerald-600 text-white p-2.5 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition shadow-md"
          >
            <Send size={18} className={input ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- VOCABULARY COMPONENT ---
const VocabularyBuilder = ({ addToast }) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  // Load from localStorage safely
  const [savedWords, setSavedWords] = useState(() => {
    try {
      const saved = localStorage.getItem("linguaAI_vocab");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("linguaAI_vocab", JSON.stringify(savedWords));
    } catch (e) {
      console.error("Save failed", e);
    }
  }, [savedWords]);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const prompt = `Topic: ${topic}. Generate 4 useful English words related to this topic. Output strict JSON array: [{ "word": "Word", "ipa": "/ipa/", "type": "n/v/adj", "definition": "Vietnamese meaning", "example": "English example sentence" }]`;
      const newWords = await generateContent(prompt);
      if (Array.isArray(newWords)) {
        setSavedWords((prev) => [...newWords, ...prev].slice(0, 100)); // Keep max 100 words
        addToast(`Đã thêm ${newWords.length} từ vựng mới!`, "success");
        setTopic("");
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      addToast("Lỗi khi tạo từ vựng.", "error");
    }
    setLoading(false);
  };

  const removeWord = (index) => {
    setSavedWords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      {/* Header Generator */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 md:p-10 rounded-3xl shadow-lg text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-black">
            Mở rộng Vốn Từ Vựng
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 bg-white/20 p-2 rounded-2xl backdrop-blur-md border border-white/30">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Nhập chủ đề (VD: Môi trường, Công nghệ...)"
              className="flex-1 bg-white text-gray-800 placeholder-gray-400 px-4 py-3 rounded-xl outline-none"
            />
            <button
              onClick={generate}
              disabled={loading || !topic}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black disabled:opacity-50 transition shadow-lg whitespace-nowrap"
            >
              {loading ? "Đang tạo..." : "Tạo Thẻ"}
            </button>
          </div>
        </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-end px-2 border-b border-gray-200 pb-2">
        <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
          <BookOpen className="text-amber-500" /> Bộ sưu tập của bạn
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
            {savedWords.length}
          </span>
        </h3>
        {savedWords.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Xóa toàn bộ từ vựng đã lưu?")) setSavedWords([]);
            }}
            className="text-red-500 text-xs font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Grid Cards */}
      {savedWords.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
            <List size={32} />
          </div>
          <p className="text-gray-500 font-medium">
            Chưa có từ vựng nào.
            <br />
            Nhập chủ đề phía trên để AI tạo giúp bạn!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {savedWords.map((w, i) => (
            <div
              key={i}
              className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 relative flex flex-col h-full"
            >
              <button
                onClick={() => removeWord(i)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition"
              >
                <X size={16} />
              </button>

              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-xl text-gray-900">{w.word}</h3>
                <span className="text-xs font-mono text-gray-400">
                  {w.type}
                </span>
              </div>

              <div className="text-sm text-amber-600 mb-3 font-medium">
                {w.ipa}
              </div>

              <p
                className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3"
                title={w.definition}
              >
                {w.definition}
              </p>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-500 italic relative">
                <span className="absolute -top-2 -left-1 text-2xl text-gray-300 leading-none">
                  “
                </span>
                {w.example}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- CHECKER COMPONENT ---
const SentenceChecker = ({ addToast }) => {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!sentence.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Analyze grammar for sentence: "${sentence}". Output strict JSON: {"is_correct": boolean, "corrected": "Correct version", "explanation": "Vietnamese explanation why", "translation": "Vietnamese translation", "alternatives": ["Alternative way 1", "Alternative way 2"]}`;
      const data = await generateContent(
        prompt,
        "You are an expert Grammar checker."
      );
      if (data) {
        setResult(data);
        addToast("Đã kiểm tra xong!", "success");
      }
    } catch (e) {
      addToast("Lỗi kiểm tra.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-pink-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50"></div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">
          Kiểm tra Ngữ pháp
        </h2>

        <div className="flex flex-col md:flex-row gap-3 relative z-10">
          <input
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && check()}
            placeholder="Nhập câu tiếng Anh cần kiểm tra..."
            className="flex-1 border-2 border-gray-100 bg-gray-50 p-4 rounded-xl outline-none focus:border-pink-500 focus:bg-white transition text-lg"
          />
          <button
            onClick={check}
            disabled={loading || !sentence}
            className="bg-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-600 disabled:opacity-50 transition shadow-lg shadow-pink-200 whitespace-nowrap flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search size={20} /> Check
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 animate-slide-in">
          {/* Status Banner */}
          <div
            className={`flex items-center gap-4 p-4 rounded-2xl mb-6 ${
              result.is_correct
                ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                : "bg-red-50 text-red-800 border border-red-100"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                result.is_correct ? "bg-emerald-200" : "bg-red-200"
              }`}
            >
              {result.is_correct ? (
                <ThumbsUp size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {result.is_correct
                  ? "Tuyệt vời! Câu chính xác."
                  : "Cần chỉnh sửa một chút."}
              </h3>
              {!result.is_correct && (
                <p className="text-sm opacity-90">
                  Chúng tôi tìm thấy lỗi ngữ pháp trong câu của bạn.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {!result.is_correct && (
              <div className="group">
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Câu đã sửa
                </div>
                <div className="text-xl md:text-2xl font-bold text-emerald-600 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 shadow-sm flex justify-between items-center">
                  {result.corrected}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result.corrected);
                      addToast("Copied!", "success");
                    }}
                    className="text-emerald-300 hover:text-emerald-600 transition"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Giải thích chi tiết
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed h-full">
                  {result.explanation}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Dịch nghĩa
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-indigo-900 italic h-full">
                  "{result.translation}"
                </div>
              </div>
            </div>

            {result.alternatives?.length > 0 && (
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                  Cách diễn đạt khác tự nhiên hơn
                </div>
                <ul className="space-y-2">
                  {result.alternatives.map((alt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm text-gray-600 hover:border-pink-200 transition"
                    >
                      <Sparkles
                        size={16}
                        className="text-pink-400 mt-1 shrink-0"
                      />
                      <span>{alt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP ---
const EnglishAI = () => {
  const [currentView, setCurrentView] = useState("home");
  const { toasts, addToast, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <style>{styles}</style>

      <Navbar currentView={currentView} setView={setCurrentView} />

      <main className="max-w-7xl mx-auto p-4 md:py-8">
        {currentView !== "home" && (
          <div className="mb-6 flex items-center justify-between animate-fade-in">
            <button
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-indigo-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
            >
              <ChevronLeft size={18} /> Quay lại
            </button>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest hidden md:inline-block">
              LinguaAI Workspace
            </span>
          </div>
        )}

        <div className="min-h-[60vh]">
          {currentView === "home" && <HomeView setView={setCurrentView} />}
          {currentView === "listening" && (
            <ListeningPractice addToast={addToast} />
          )}
          {currentView === "writing" && <WritingPractice addToast={addToast} />}
          {currentView === "speaking" && (
            <ConversationPractice addToast={addToast} />
          )}
          {currentView === "vocabulary" && (
            <VocabularyBuilder addToast={addToast} />
          )}
          {currentView === "checker" && <SentenceChecker addToast={addToast} />}
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-200 bg-white/50">
        <p>&copy; 2025 LinguaAI. Powered by DeepSeek & OpenRouter.</p>
      </footer>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default EnglishAI;
