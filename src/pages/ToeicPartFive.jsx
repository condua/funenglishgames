import React, { useState, useEffect } from "react";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Brain,
  ChevronRight,
  RefreshCw,
  Trophy,
  Menu,
  ArrowLeft,
  Lightbulb,
  Settings,
  Key,
  Languages,
  Book,
} from "lucide-react";

// --- DATA STRUCTURE & CONFIGURATION ---

const TOPICS = [
  {
    id: "group1",
    title: "Ngữ pháp trọng tâm",
    icon: "⚡",
    subtopics: [
      {
        id: "tenses",
        name: "1. Các thì của động từ (Tenses)",
        prompt: "các thì trong tiếng Anh (Hiện tại, Quá khứ, Tương lai)",
      },
      {
        id: "forms",
        name: "2. Dạng của động từ (V-ing/to V/V-ed)",
        prompt: "dạng của động từ (Gerunds, Infinitives, Participles)",
      },
      {
        id: "agreement",
        name: "3. Sự hòa hợp Chủ ngữ – Động từ",
        prompt: "Subject-Verb Agreement",
      },
      {
        id: "passive",
        name: "4. Câu bị động (Passive Voice)",
        prompt: "câu bị động (Passive Voice)",
      },
      {
        id: "pronouns",
        name: "5. Đại từ (Pronouns)",
        prompt: "các loại đại từ (Nhân xưng, sở hữu, phản thân)",
      },
    ],
  },
  {
    id: "group2",
    title: "Từ loại (Parts of Speech)",
    icon: "🏗️",
    subtopics: [
      {
        id: "nouns",
        name: "6. Danh từ (Nouns)",
        prompt:
          "vị trí và chức năng của Danh từ, danh từ đếm được/không đếm được",
      },
      {
        id: "verbs",
        name: "7. Động từ (Verbs)",
        prompt: "động từ thường, động từ nối, nội/ngoại động từ",
      },
      {
        id: "adjectives",
        name: "8. Tính từ (Adjectives)",
        prompt: "vị trí và chức năng của Tính từ",
      },
      {
        id: "adverbs",
        name: "9. Trạng từ (Adverbs)",
        prompt: "vị trí và chức năng của Trạng từ",
      },
    ],
  },
  {
    id: "group3",
    title: "Cấu trúc thường gặp",
    icon: "🔗",
    subtopics: [
      {
        id: "prepositions",
        name: "10. Giới từ (Prepositions)",
        prompt: "giới từ (in, on, at, by, with, for...)",
      },
      {
        id: "conjunctions",
        name: "11. Liên từ & Từ nối",
        prompt: "liên từ và từ nối (Conjunctions & Connectors)",
      },
      {
        id: "relative",
        name: "12. Mệnh đề quan hệ",
        prompt: "mệnh đề quan hệ (Relative Clauses)",
      },
      {
        id: "comparisons",
        name: "13. Cấu trúc so sánh",
        prompt: "các cấp so sánh (Comparison)",
      },
    ],
  },
  {
    id: "group4",
    title: "Từ vựng TOEIC",
    icon: "📘",
    subtopics: [
      {
        id: "vocab_topic",
        name: "14. Từ vựng theo chủ đề",
        prompt: "từ vựng TOEIC các chủ đề: Office, Marketing, Travel, Finance",
      },
      {
        id: "collocations",
        name: "15. Collocations & Cụm từ",
        prompt: "Collocations và cụm động từ cố định (Phrasal Verbs)",
      },
    ],
  },
];

// Fallback data for demo purposes (when no API key is provided)
const MOCK_DATA = [
  {
    question:
      "The marketing manager suggested ______ a survey to understand customer needs better.",
    options: ["conduct", "conducting", "conducted", "conductor"],
    correctOption: 1, // Index of 'conducting'
    explanation:
      "Sau động từ 'suggest' (đề nghị), nếu theo sau là một động từ khác thì động từ đó phải ở dạng V-ing. Cấu trúc: suggest + V-ing.",
    translation:
      "Giám đốc tiếp thị đề nghị thực hiện một cuộc khảo sát để hiểu rõ hơn nhu cầu của khách hàng.",
    vocabulary: [
      { word: "suggest", meaning: "đề nghị, gợi ý" },
      { word: "survey", meaning: "cuộc khảo sát" },
      { word: "conduct", meaning: "thực hiện, tiến hành" },
    ],
  },
  {
    question:
      "Mr. Tanaka ______ the report before the board meeting started yesterday.",
    options: ["has finished", "finish", "had finished", "finishing"],
    correctOption: 2,
    explanation:
      "Dùng thì Quá khứ hoàn thành (had + V3/ed) để diễn tả một hành động xảy ra trước một hành động khác trong quá khứ. Ở đây việc 'hoàn thành báo cáo' xảy ra trước 'cuộc họp bắt đầu' (quá khứ đơn).",
    translation:
      "Ông Tanaka đã hoàn thành báo cáo trước khi cuộc họp hội đồng bắt đầu vào ngày hôm qua.",
    vocabulary: [
      { word: "board meeting", meaning: "cuộc họp hội đồng quản trị" },
      { word: "finish", meaning: "hoàn thành" },
    ],
  },
  {
    question:
      "All employees are required to wear their identification badges ______ being in the office building.",
    options: ["during", "while", "for", "because"],
    correctOption: 1,
    explanation:
      "'While' là liên từ, có thể đi với V-ing (rút gọn mệnh đề) mang nghĩa 'trong khi đang...'. 'During' + Noun. 'For' + khoảng thời gian. 'Because' + mệnh đề.",
    translation:
      "Tất cả nhân viên được yêu cầu đeo thẻ nhận dạng trong khi ở trong tòa nhà văn phòng.",
    vocabulary: [
      { word: "require", meaning: "yêu cầu" },
      { word: "identification badge", meaning: "thẻ nhận dạng/thẻ tên" },
      { word: "during", meaning: "trong suốt (khoảng thời gian)" },
    ],
  },
  {
    question:
      "The new software is ______ than the previous version, allowing users to process data twice as fast.",
    options: ["efficient", "more efficient", "most efficient", "efficiency"],
    correctOption: 1,
    explanation:
      "Cấu trúc so sánh hơn với tính từ dài (efficient). Có từ 'than' là dấu hiệu nhận biết. Cấu trúc: more + adj dài + than.",
    translation:
      "Phần mềm mới hiệu quả hơn phiên bản trước, cho phép người dùng xử lý dữ liệu nhanh gấp đôi.",
    vocabulary: [
      { word: "efficient", meaning: "hiệu quả, năng suất cao" },
      { word: "previous version", meaning: "phiên bản trước" },
      { word: "process data", meaning: "xử lý dữ liệu" },
    ],
  },
  {
    question:
      "Ms. Green is responsible ______ organizing the annual charity event.",
    options: ["at", "with", "for", "to"],
    correctOption: 2,
    explanation:
      "Cụm cố định (Collocation): 'be responsible for' + V-ing/Noun (chịu trách nhiệm cho việc gì).",
    translation:
      "Cô Green chịu trách nhiệm tổ chức sự kiện từ thiện thường niên.",
    vocabulary: [
      { word: "be responsible for", meaning: "chịu trách nhiệm về" },
      { word: "annual", meaning: "hàng năm" },
      { word: "charity event", meaning: "sự kiện từ thiện" },
    ],
  },
];

export default function ToeicPartFive() {
  // --- STATE ---
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [view, setView] = useState("home"); // 'home', 'quiz', 'result'
  const [selectedTopic, setSelectedTopic] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { 0: 1, 1: 0 } -> qIndex: optionIndex
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  // --- ACTIONS ---

  const handleStartQuiz = async (topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setError("");
    setQuestions([]);
    setUserAnswers({});
    setScore(0);
    setCurrentQIndex(0);
    setShowExplanation(false);
    setView("quiz");

    if (!apiKey) {
      // Simulate loading delay for mock data
      setTimeout(() => {
        // Sử dụng toàn bộ dữ liệu mẫu hiện có (trong thực tế sẽ ít hơn 30 nếu không có API)
        setQuestions(MOCK_DATA.sort(() => 0.5 - Math.random()));
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const generatedQuestions = await generateQuestionsWithChatGPT(
        topic.prompt
      );
      setQuestions(generatedQuestions);
    } catch (err) {
      console.error(err);
      setError("Không thể tạo câu hỏi từ AI. Đang chuyển sang dữ liệu mẫu.");
      setQuestions(MOCK_DATA);
    } finally {
      setLoading(false);
    }
  };

  const generateQuestionsWithChatGPT = async (topicPrompt) => {
    const prompt = `
Bạn là một giáo viên TOEIC chuyên nghiệp. 
Hãy tạo 10 câu hỏi trắc nghiệm Part 5 (Incomplete Sentences) về chủ đề: "${topicPrompt}".
Độ khó: Trung bình - Khó (sát đề thi thật).

YÊU CẦU OUTPUT FORMAT JSON (KHÔNG CÓ MARKDOWN BLOCK):
[
  {
    "question": "Câu hỏi tiếng Anh...",
    "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    "correctOption": 0,
    "explanation": "Giải thích ngữ pháp ngắn gọn súc tích bằng tiếng Việt.",
    "translation": "Dịch nghĩa đầy đủ của câu hỏi sang tiếng Việt.",
    "vocabulary": [
      { "word": "từ tiếng anh", "ipa": "phiên âm ipa", "meaning": "nghĩa tiếng việt" }
    ]
  }
]
Chỉ trả về JSON thuần túy, không có lời dẫn. Tạo đúng 10 câu hỏi chất lượng.
`;

    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-5-nano",
          input: prompt,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const cleanJson = data.output_text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanJson);
    } catch (e) {
      throw e;
    }
  };

  const handleAnswer = (optionIndex) => {
    if (userAnswers[currentQIndex] !== undefined) return; // Prevent changing answer

    const isCorrect = optionIndex === questions[currentQIndex].correctOption;
    setUserAnswers((prev) => ({ ...prev, [currentQIndex]: optionIndex }));
    if (isCorrect) setScore((prev) => prev + 1);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      setView("result");
    }
  };

  // --- VIEWS ---

  const renderHome = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 rounded-2xl text-white shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="w-8 h-8" />
          TOEIC Master AI
        </h1>
        <p className="mt-2 text-blue-100 text-sm">
          Hệ thống ôn luyện Part 5 chuyên sâu với AI. Chọn chủ đề bên dưới để
          bắt đầu.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors"
          >
            <Settings size={14} />
            {apiKey ? "Đã nhập API Key" : "Cài đặt API Key (Để tạo đề mới)"}
          </button>
        </div>
      </div>

      {TOPICS.map((group) => (
        <div key={group.id} className="space-y-3">
          <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2 px-1">
            <span>{group.icon}</span> {group.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {group.subtopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleStartQuiz(topic)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all text-left flex justify-between items-center group"
              >
                <div>
                  <h3 className="font-medium text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                    {topic.name}
                  </h3>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                  <ChevronRight
                    size={16}
                    className="text-slate-400 group-hover:text-blue-500"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderQuiz = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-500 animate-pulse text-center">
            {apiKey
              ? "AI đang soạn đề thi mới cho bạn..."
              : "Đang tải dữ liệu mẫu..."}
          </p>
        </div>
      );
    }

    if (error && questions.length === 0) {
      return (
        <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl">
          <p>{error}</p>
          <button
            onClick={() => setView("home")}
            className="mt-4 text-blue-600 underline"
          >
            Quay lại
          </button>
        </div>
      );
    }

    const currentQ = questions[currentQIndex];
    const isAnswered = userAnswers[currentQIndex] !== undefined;
    const selectedOpt = userAnswers[currentQIndex];

    return (
      <div className="max-w-2xl mx-auto pb-20">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setView("home")}
            className="text-slate-400 hover:text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-sm font-medium text-slate-500">
            Câu hỏi {currentQIndex + 1}/{questions.length}
          </div>
          <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {selectedTopic?.name.split(".")[0]}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <p className="text-lg font-medium text-slate-800 leading-relaxed">
            {currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, idx) => {
            let stateClass = "border-slate-200 hover:bg-slate-50";
            let icon = null;

            if (isAnswered) {
              if (idx === currentQ.correctOption) {
                stateClass =
                  "border-green-500 bg-green-50 text-green-700 font-medium";
                icon = <CheckCircle size={18} className="text-green-500" />;
              } else if (idx === selectedOpt) {
                stateClass = "border-red-300 bg-red-50 text-red-700";
                icon = <XCircle size={18} className="text-red-500" />;
              } else {
                stateClass = "border-slate-100 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${stateClass}`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                      isAnswered && idx === currentQ.correctOption
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </span>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Explanation Section (Đã nâng cấp) */}
        {showExplanation && (
          <div className="bg-white rounded-xl border border-blue-100 overflow-hidden shadow-sm mb-20 animate-in fade-in slide-in-from-bottom-2">
            {/* 1. Translation */}
            <div className="bg-blue-50/50 p-4 border-b border-blue-100">
              <h4 className="flex items-center gap-2 font-bold text-blue-800 mb-2 text-sm uppercase tracking-wide">
                <Languages size={16} /> Dịch Nghĩa
              </h4>
              <p className="text-slate-700 italic">"{currentQ.translation}"</p>
            </div>

            {/* 2. Vocabulary */}
            {currentQ.vocabulary && currentQ.vocabulary.length > 0 && (
              <div className="p-4 border-b border-slate-100">
                <h4 className="flex items-center gap-2 font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">
                  <Book size={16} /> Từ Vựng Quan Trọng
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQ.vocabulary.map((vocab, vIdx) => (
                    <div key={vIdx} className="text-sm">
                      <span className="font-semibold text-blue-600">
                        {vocab.word}{" "}
                        {vocab.ipa && (
                          <span className=" text-slate-400">{vocab.ipa}</span>
                        )}
                      </span>
                      <span className="text-slate-400 mx-1">:</span>
                      <span className="text-slate-600">{vocab.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Grammar Explanation */}
            <div className="p-4 bg-orange-50/30">
              <h4 className="flex items-center gap-2 font-bold text-orange-700 mb-2 text-sm uppercase tracking-wide">
                <Lightbulb size={16} /> Giải Thích Ngữ Pháp
              </h4>
              <p className="text-slate-700 text-sm leading-6">
                {currentQ.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Action */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex justify-center z-10">
          <div className="w-full max-w-2xl flex justify-between items-center">
            <div className="text-sm text-slate-500">
              Đúng: <span className="text-green-600 font-bold">{score}</span>
            </div>
            {isAnswered && (
              <button
                onClick={nextQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-200 transition-all"
              >
                {currentQIndex < questions.length - 1
                  ? "Câu tiếp theo"
                  : "Xem kết quả"}
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Cần cố gắng thêm!";
    if (percentage >= 80) message = "Xuất sắc! 🎉";
    else if (percentage >= 50) message = "Tạm ổn, hãy ôn thêm!";

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-yellow-50 p-6 rounded-full mb-6 relative">
          <Trophy size={64} className="text-yellow-500" />
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">
            {percentage}%
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-2">{message}</h2>
        <p className="text-slate-500 mb-8">
          Bạn đã trả lời đúng{" "}
          <span className="text-blue-600 font-bold">
            {score}/{questions.length}
          </span>{" "}
          câu hỏi về chủ đề "{selectedTopic?.name}".
        </p>

        <div className="grid gap-3 w-full max-w-xs">
          <button
            onClick={() => handleStartQuiz(selectedTopic)}
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            <RefreshCw size={18} /> Làm lại đề mới
          </button>
          <button
            onClick={() => setView("home")}
            className="w-full bg-white text-slate-600 border border-slate-200 p-3 rounded-xl font-medium hover:bg-slate-50 transition-all"
          >
            Chọn chủ đề khác
          </button>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" /> Cài đặt AI
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              API Key (Tùy chọn)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Dán API key của bạn vào đây..."
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <p className="text-xs text-slate-500 mt-2">
              Nếu không nhập key, hệ thống sẽ sử dụng{" "}
              <strong>dữ liệu mẫu</strong> giới hạn. Nhập key để tạo câu hỏi mới
              vô hạn.
            </p>
            <div className="mt-2 text-xs bg-slate-50 p-2 rounded text-slate-500">
              Lấy key miễn phí tại:{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                className="text-blue-600 underline"
              >
                Google AI Studio
              </a>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Lưu & Đóng
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-3xl mx-auto min-h-screen bg-white shadow-2xl shadow-slate-200 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="h-full overflow-y-auto p-4 md:p-6 custom-scrollbar">
          {view === "home" && renderHome()}
          {view === "quiz" && renderQuiz()}
          {view === "result" && renderResult()}
        </div>

        {/* Modal */}
        {showSettings && renderSettings()}
      </div>
    </div>
  );
}
