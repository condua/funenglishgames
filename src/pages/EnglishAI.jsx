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
} from "lucide-react";

// --- STYLES & ANIMATIONS ---
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .animate-slide-in { animation: slideIn 0.4s ease-out forwards; }
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #c7c7c7; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a0a0a0; }
`;
// --- CONFIGURATION & API ---
// --- CONFIGURATION & API ---
// --- CONFIGURATION & API ---
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = "";
const SITE_NAME = "";

const MODEL = "tngtech/deepseek-r1t2-chimera:free";
// Helper to clean JSON response
const cleanAndParseJSON = (text) => {
  try {
    let cleaned = text.replace(/```json\n?|```/g, "").trim();
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
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

    // --- SỬA DÒNG NÀY ---
    // Cũ (Sai với OpenRouter): return cleanAndParseJSON(data.candidates[0].content.parts[0].text);
    // Mới (Đúng):
    return cleanAndParseJSON(data.choices[0].message.content);
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
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Text Error:", error);
    throw error;
  }
};

// --- SHARED COMPONENTS ---

// --- COMPONENTS ---

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-[90vw]">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-in ${
          toast.type === "error" ? "bg-red-500" : "bg-green-600"
        }`}
      >
        {toast.type === "error" ? (
          <AlertCircle size={18} />
        ) : (
          <CheckCircle size={18} />
        )}
        <span className="text-sm font-medium">{toast.message}</span>
        <button
          onClick={() => removeToast(toast.id)}
          className="ml-2 opacity-80 hover:opacity-100"
        >
          <X size={14} />
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
  <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-y-3 justify-between items-center">
      <div
        className="flex items-center space-x-2 font-bold text-xl cursor-pointer hover:opacity-90"
        onClick={() => setView("home")}
      >
        <div className="bg-white/20 p-1.5 rounded-lg">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <span className="hidden sm:inline">
          Lingua<span className="text-yellow-300">AI</span>
        </span>
      </div>
      <div className="flex space-x-2 text-xs sm:text-sm font-medium overflow-x-auto pb-1 sm:pb-0 scrollbar-hide w-full sm:w-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <NavButton
          view="listening"
          current={currentView}
          setView={setView}
          icon={<Headphones size={16} />}
          label="Nghe"
        />
        <NavButton
          view="writing"
          current={currentView}
          setView={setView}
          icon={<PenTool size={16} />}
          label="Viết"
        />
        <NavButton
          view="speaking"
          current={currentView}
          setView={setView}
          icon={<MessageSquare size={16} />}
          label="Hội Thoại"
        />
        <NavButton
          view="vocabulary"
          current={currentView}
          setView={setView}
          icon={<List size={16} />}
          label="Từ Vựng"
        />
        <NavButton
          view="checker"
          current={currentView}
          setView={setView}
          icon={<Search size={16} />}
          label="Check Câu"
        />
      </div>
    </div>
  </nav>
);

const NavButton = ({ view, current, setView, icon, label }) => (
  <button
    onClick={() => setView(view)}
    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full transition-all whitespace-nowrap shrink-0 ${
      current === view
        ? "bg-white text-indigo-700 shadow-md font-bold"
        : "hover:bg-white/10 text-indigo-100"
    }`}
  >
    {icon} <span>{label}</span>
  </button>
);

// --- FEATURES ---

const HomeView = ({ setView }) => (
  <div className="flex flex-col items-center justify-center py-12 space-y-12 animate-fade-in px-4">
    <div className="text-center space-y-4">
      <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
        ✨ Phiên bản Ổn định 2025
      </div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800">
        Học Tiếng Anh{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          Thông Minh
        </span>
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto">
        Cải thiện toàn diện 4 kỹ năng với sự hỗ trợ từ Gemini AI.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-7xl">
      <FeatureCard
        onClick={() => setView("listening")}
        icon={<Headphones className="text-white" />}
        bg="bg-blue-500"
        title="Luyện Nghe"
        desc="Chép chính tả"
      />
      <FeatureCard
        onClick={() => setView("writing")}
        icon={<PenTool className="text-white" />}
        bg="bg-purple-500"
        title="Luyện Viết"
        desc="Sửa bài luận"
      />
      <FeatureCard
        onClick={() => setView("speaking")}
        icon={<MessageSquare className="text-white" />}
        bg="bg-green-500"
        title="Hội Thoại"
        desc="Roleplay AI"
      />
      <FeatureCard
        onClick={() => setView("vocabulary")}
        icon={<List className="text-white" />}
        bg="bg-orange-500"
        title="Từ Vựng"
        desc="Flashcards"
      />
      <FeatureCard
        onClick={() => setView("checker")}
        icon={<Search className="text-white" />}
        bg="bg-pink-500"
        title="Check Câu"
        desc="Sửa ngữ pháp"
      />
    </div>
  </div>
);

const FeatureCard = ({ onClick, icon, bg, title, desc }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl cursor-pointer border border-gray-100 flex flex-col items-center text-center h-full transition-all hover:-translate-y-1"
  >
    <div
      className={`${bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md`}
    >
      {icon}
    </div>
    <h3 className="font-bold text-gray-800">{title}</h3>
    <p className="text-gray-500 text-xs">{desc}</p>
  </div>
);

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

  const generate = async () => {
    setLoading(true);
    setExercise(null);
    setResult(null);
    setUserInput("");
    try {
      if (synth.current.speaking) synth.current.cancel();
      const prompt = `Topic: ${topic}. Level: ${level}. Generate short paragraph (30-50 words). Output JSON: {"text": "English...", "translation": "Vietnamese...", "difficult_words": ["word"]}`;
      const data = await generateContent(prompt, "You are an English teacher.");
      if (data) {
        setExercise(data);
        addToast("Đã tạo bài tập!", "success");
      }
    } catch (e) {
      addToast("Lỗi tạo bài tập.", "error");
    }
    setLoading(false);
  };

  const toggleAudio = () => {
    if (!exercise) return;
    if (isPlaying) {
      synth.current.pause();
      setIsPlaying(false);
    } else {
      if (synth.current.paused && synth.current.speaking)
        synth.current.resume();
      else {
        const u = new SpeechSynthesisUtterance(exercise.text);
        u.rate = rate;
        u.lang = "en-US";
        u.onend = () => setIsPlaying(false);
        synth.current.speak(u);
      }
      setIsPlaying(true);
    }
  };

  const check = () => {
    const clean = (s) =>
      s
        .replace(/[^\w\s]/g, "")
        .toLowerCase()
        .split(/\s+/);
    const org = clean(exercise.text);
    const usr = clean(userInput);
    let c = 0;
    org.forEach((w, i) => {
      if (usr[i] === w) c++;
    });
    setResult({ acc: Math.round((c / org.length) * 100) });
    addToast("Đã chấm điểm!", "success");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Topic"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button
          onClick={generate}
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? "..." : "Tạo Bài"}
        </button>
      </div>
      {exercise && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
            <div className="flex gap-4 mb-4 items-center">
              <button
                onClick={toggleAudio}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                  isPlaying
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <div className="flex gap-1">
                {[0.7, 1, 1.2].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`text-xs px-2 py-1 rounded ${
                      rate === r ? "bg-blue-600 text-white" : "bg-gray-100"
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
              className="w-full h-32 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nghe và chép lại..."
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={check}
                className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 flex items-center gap-2 font-bold"
              >
                <CheckCircle size={18} /> Kiểm tra
              </button>
            </div>
          </div>
          {result && (
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Kết quả</span>
                <span
                  className={
                    result.acc >= 80 ? "text-green-600" : "text-orange-600"
                  }
                >
                  {result.acc}%
                </span>
              </div>
              <p className="bg-green-50 p-3 rounded-lg border-green-100 border text-gray-800">
                {exercise.text}
              </p>
              <p className="text-gray-500 italic">{exercise.translation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const WritingPractice = ({ addToast }) => {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const review = async () => {
    if (!essay.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const prompt = `Analyze IELTS writing. Output JSON: { "score": "Band", "corrected_version": "Text", "general_feedback": "VN", "mistakes": [{ "original": "", "correction": "", "explanation": "" }] }`;
      const data = await generateContent(`Essay: ${essay}`, prompt);
      if (data) {
        setFeedback(data);
        addToast("Đã chấm xong!", "success");
      }
    } catch (e) {
      addToast("Lỗi chấm bài.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh] animate-fade-in">
      <div className="flex flex-col bg-white p-1 rounded-2xl shadow-lg border overflow-hidden">
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          className="flex-1 w-full p-6 text-lg outline-none resize-none custom-scrollbar"
          placeholder="Viết bài luận tiếng Anh..."
        />
        <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
          <span className="text-xs font-semibold text-gray-500">
            {essay.split(/\s+/).filter((w) => w).length} words
          </span>
          <button
            onClick={review}
            disabled={loading || !essay}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 disabled:opacity-50 font-bold flex gap-2 items-center"
          >
            {loading ? (
              "..."
            ) : (
              <>
                <Sparkles size={18} /> Chấm Bài
              </>
            )}
          </button>
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar pr-2 space-y-4">
        {!feedback ? (
          <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed rounded-2xl bg-gray-50/50">
            Kết quả sẽ hiện ở đây
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">Kết quả</h3>
                <p className="text-xs opacity-75">Gemini AI</p>
              </div>
              <div className="text-4xl font-extrabold bg-white/20 px-4 py-2 rounded-xl">
                {feedback.score}
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border">
              <p className="text-gray-700">{feedback.general_feedback}</p>
            </div>
            {feedback.mistakes.map((m, i) => (
              <div
                key={i}
                className="bg-red-50 p-4 rounded-xl border-l-4 border-red-400 text-sm"
              >
                <div className="flex gap-2 mb-1">
                  <span className="line-through text-red-500">
                    {m.original}
                  </span>{" "}
                  <ArrowRight size={14} className="text-gray-400 mt-1" />{" "}
                  <span className="font-bold text-green-600">
                    {m.correction}
                  </span>
                </div>
                <p className="text-gray-500 italic">{m.explanation}</p>
              </div>
            ))}
            <div className="bg-white p-5 rounded-2xl shadow-sm border relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(feedback.corrected_version);
                  addToast("Copied!", "success");
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-purple-600"
              >
                <Copy size={18} />
              </button>
              <h4 className="font-bold mb-2">Bài sửa:</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {feedback.corrected_version}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ConversationPractice = ({ addToast }) => {
  const [scenario, setScenario] = useState("Job Interview");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const start = async () => {
    setMessages([]);
    setLoading(true);
    try {
      const text = await generateTextContent(
        `Roleplay: ${scenario}. Start with greeting & question.`,
        "Roleplay partner."
      );
      setMessages([{ role: "ai", text }]);
    } catch (e) {
      addToast("Lỗi bắt đầu.", "error");
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
        .map((m) => `${m.role}: ${m.text}`)
        .join("\n");
      const text = await generateTextContent(
        `History:\n${hist}\nRespond to user in ${scenario}. Short.`,
        "Roleplay partner."
      );
      setMessages((prev) => [...prev, { role: "ai", text }]);
    } catch (e) {
      addToast("Lỗi kết nối.", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col gap-4 animate-fade-in">
      <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-green-600" />
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="font-bold outline-none bg-transparent"
          >
            {["Job Interview", "Coffee", "Hotel", "Date"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={start}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700"
        >
          Bắt đầu
        </button>
      </div>
      <div className="flex-1 bg-white rounded-2xl shadow-lg border overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-gray-400 ml-4 animate-pulse">
              Typing...
            </div>
          )}
          <div ref={endRef} />
        </div>
        <div className="p-4 bg-white border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && send()}
            placeholder="Type..."
            className="flex-1 border rounded-xl px-4 outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !input}
            className="bg-green-600 text-white p-3 rounded-xl"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- FIXED VOCABULARY COMPONENT ---
const VocabularyBuilder = ({ addToast }) => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  // FIX: Lazy initialization to prevent localStorage race conditions and null crashes
  const [savedWords, setSavedWords] = useState(() => {
    try {
      const saved = localStorage.getItem("linguaAI_vocab");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Resetting vocab due to error", e);
      return [];
    }
  });

  // Only run when savedWords changes (skip on mount if no change)
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
      const prompt = `Topic: ${topic}. Generate 4 English words. Output JSON: [{ "word": "", "type": "n/v", "definition": "", "example": "" }]`;
      const newWords = await generateContent(prompt);
      if (Array.isArray(newWords)) {
        setSavedWords((prev) => [...newWords, ...prev].slice(0, 50));
        addToast(`Thêm ${newWords.length} từ mới!`, "success");
        setTopic("");
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      addToast("Lỗi tạo từ.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="bg-white p-8 rounded-3xl shadow-sm border text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mở rộng Vốn Từ
        </h2>
        <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic (e.g., Space)"
            className="flex-1 border p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={generate}
            disabled={loading || !topic}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "..." : "Tạo Thẻ"}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <BookOpen className="text-orange-500" /> Bộ sưu tập (
          {savedWords.length})
        </h3>
        {savedWords.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Xóa hết?")) setSavedWords([]);
            }}
            className="text-red-500 flex gap-1 text-sm items-center"
          >
            <Trash2 size={14} /> Xóa
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {savedWords.map((w, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-lg transition"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-xl">{w.word}</h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {w.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{w.definition}</p>
            <div className="bg-orange-50 p-3 rounded text-sm italic text-orange-800 border-l-2 border-orange-300">
              "{w.example}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- FIXED CHECKER COMPONENT ---
const SentenceChecker = ({ addToast }) => {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!sentence.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const prompt = `Check grammar: "${sentence}". Output JSON: {"is_correct": bool, "corrected": "", "explanation": "VN", "translation": "VN", "alternatives": [""]}`;
      const data = await generateContent(prompt, "Grammar expert.");
      if (data) {
        setResult(data);
        addToast("Đã kiểm tra!", "success");
      }
    } catch (e) {
      addToast("Lỗi kiểm tra.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Kiểm tra Ngữ pháp
        </h2>
        <div className="flex gap-3">
          <input
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && check()}
            placeholder="Ví dụ: She go home..."
            className="flex-1 border p-3 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={check}
            disabled={loading || !sentence}
            className="bg-pink-500 text-white px-6 rounded-xl font-bold hover:bg-pink-600 disabled:opacity-50 flex items-center justify-center gap-2 min-w-[120px]"
          >
            {loading ? (
              "..."
            ) : (
              <>
                <Search size={20} /> Check
              </>
            )}
          </button>
        </div>
      </div>
      {result && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100">
          <div
            className={`flex items-center gap-3 mb-4 p-4 rounded-xl ${
              result.is_correct
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {result.is_correct ? (
              <ThumbsUp size={24} />
            ) : (
              <AlertCircle size={24} />
            )}
            <span className="font-bold text-lg">
              {result.is_correct ? "Chính xác!" : "Cần sửa lại"}
            </span>
          </div>
          {!result.is_correct && (
            <div className="mb-4">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">
                Sửa lỗi:
              </div>
              <div className="text-xl font-bold text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                {result.corrected}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">
                Giải thích:
              </div>
              <p className="bg-gray-50 p-3 rounded-lg">{result.explanation}</p>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">
                Dịch nghĩa:
              </div>
              <p className="bg-gray-50 p-3 rounded-lg italic">
                {result.translation}
              </p>
            </div>
          </div>
          {result.alternatives?.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">
                Gợi ý khác:
              </div>
              <ul className="space-y-1">
                {result.alternatives.map((a, i) => (
                  <li
                    key={i}
                    className="text-gray-600 bg-pink-50/50 p-2 rounded flex gap-2 items-center"
                  >
                    <ArrowRight size={14} className="text-pink-400" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 pb-10">
      <style>{styles}</style>
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === "home" ? (
          <HomeView setView={setCurrentView} />
        ) : (
          <div className="animate-fade-in">
            <button
              onClick={() => setCurrentView("home")}
              className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border"
            >
              <ChevronLeft size={16} /> Quay lại
            </button>
            {currentView === "listening" && (
              <ListeningPractice addToast={addToast} />
            )}
            {currentView === "writing" && (
              <WritingPractice addToast={addToast} />
            )}
            {currentView === "speaking" && (
              <ConversationPractice addToast={addToast} />
            )}
            {currentView === "vocabulary" && (
              <VocabularyBuilder addToast={addToast} />
            )}
            {currentView === "checker" && (
              <SentenceChecker addToast={addToast} />
            )}
          </div>
        )}
      </main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default EnglishAI;
