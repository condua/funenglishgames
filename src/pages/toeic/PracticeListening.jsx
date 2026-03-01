import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Play,
  Volume2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Settings,
  Languages,
  BookOpen,
  Headphones,
  RefreshCcw,
} from "lucide-react";

// Dữ liệu mẫu (Tích hợp dữ liệu được cá nhân hóa của người dùng)
const TOPICS = [
  {
    id: "family_habits",
    name: "Gia đình & Thói quen",
    icon: <BookOpen className="w-5 h-5" />,
    data: [
      {
        question: "How often do you eat dinner with your family?",
        questionTrans: "Bạn có thường xuyên ăn tối cùng gia đình không?",
        answer: "We usually have dinner together every evening.",
        answerTrans: "Chúng tôi thường ăn tối cùng nhau vào mỗi buổi tối.",
      },
      {
        question: "What are the most important family values to you?",
        questionTrans:
          "Những giá trị gia đình nào là quan trọng nhất đối với bạn?",
        answer: "Honesty and respect are the most important values.",
        answerTrans:
          "Sự trung thực và tôn trọng là những giá trị quan trọng nhất.",
      },
      {
        question: "Who does the housework in your family?",
        questionTrans: "Ai là người làm việc nhà trong gia đình bạn?",
        answer: "We share the chores equally among family members.",
        answerTrans:
          "Chúng tôi chia sẻ công việc nhà đều cho các thành viên trong gia đình.",
      },
    ],
  },
  {
    id: "animals",
    name: "Động vật (Animals)",
    icon: <Headphones className="w-5 h-5" />,
    data: [
      {
        question: "What is the largest land animal?",
        questionTrans: "Loài động vật trên cạn nào lớn nhất?",
        answer: "The elephant is the largest land animal.",
        answerTrans: "Voi là loài động vật trên cạn lớn nhất.",
      },
      {
        question: "Can you describe a tiger?",
        questionTrans: "Bạn có thể miêu tả một con hổ được không?",
        answer: "A tiger is a large carnivorous feline with stripes.",
        answerTrans: "Hổ là loài động vật họ mèo ăn thịt lớn có vằn.",
      },
      {
        question: "Where do penguins live?",
        questionTrans: "Chim cánh cụt sống ở đâu?",
        answer: "They mostly live in the Southern Hemisphere, like Antarctica.",
        answerTrans: "Chúng chủ yếu sống ở Nam Bán Cầu, như Nam Cực.",
      },
    ],
  },
  {
    id: "daily_life",
    name: "Giao tiếp hàng ngày",
    icon: <Languages className="w-5 h-5" />,
    data: [
      {
        question: "Excuse me, where is the nearest train station?",
        questionTrans: "Xin lỗi, nhà ga xe lửa gần nhất ở đâu?",
        answer: "Go straight ahead and turn left at the next corner.",
        answerTrans: "Đi thẳng về phía trước và rẽ trái ở góc đường tiếp theo.",
      },
      {
        question: "How much does this coffee cost?",
        questionTrans: "Cốc cà phê này giá bao nhiêu?",
        answer: "It is four dollars and fifty cents.",
        answerTrans: "Nó có giá 4 đô la và 50 xu.",
      },
    ],
  },
];

// Hàm chuẩn hóa chuỗi để so sánh (xóa dấu câu, khoảng trắng thừa, đưa về chữ thường)
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState(TOPICS[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  const [showScript, setShowScript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const [voices, setVoices] = useState([]);
  const [selectedQuestionVoice, setSelectedQuestionVoice] = useState(null);
  const [selectedAnswerVoice, setSelectedAnswerVoice] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeTopic = useMemo(
    () => TOPICS.find((t) => t.id === activeTopicId),
    [activeTopicId],
  );
  const currentQA = activeTopic.data[currentIndex];

  const questionRef = useRef(null);
  const answerRef = useRef(null);

  // Load Voices for TTS
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      // Ưu tiên các giọng tiếng Anh
      const englishVoices = availableVoices.filter((v) =>
        v.lang.includes("en"),
      );
      const voicesToUse =
        englishVoices.length > 0 ? englishVoices : availableVoices;
      setVoices(voicesToUse);

      if (voicesToUse.length > 0) {
        if (!selectedQuestionVoice) {
          // Mặc định chọn giọng Google US English hoặc giọng đầu tiên cho câu hỏi
          const defaultVoiceQ =
            voicesToUse.find(
              (v) => v.name.includes("Google") || v.lang === "en-US",
            ) || voicesToUse[0];
          setSelectedQuestionVoice(defaultVoiceQ.name);
        }
        if (!selectedAnswerVoice) {
          // Cố gắng chọn một giọng khác (vd: giọng UK) cho câu trả lời để tạo sự đối thoại
          const defaultVoiceA =
            voicesToUse.find(
              (v) => v.name.includes("UK") || v.lang === "en-GB",
            ) || voicesToUse[voicesToUse.length > 1 ? 1 : 0];
          setSelectedAnswerVoice(defaultVoiceA.name);
        }
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Đổi bài tập (reset state)
  useEffect(() => {
    setQuestionInput("");
    setAnswerInput("");
    setShowScript(false);
    setShowTranslation(false);
  }, [currentIndex, activeTopicId]);

  // TTS Play Function
  const speak = (text, type) => {
    if (!text || isPlaying) return;

    window.speechSynthesis.cancel(); // Dừng các âm thanh đang phát
    const utterance = new SpeechSynthesisUtterance(text);

    const voiceName =
      type === "question" ? selectedQuestionVoice : selectedAnswerVoice;
    if (voiceName) {
      const voice = voices.find((v) => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }

    // Điều chỉnh tốc độ chậm lại một chút để dễ nghe chính tả
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const playFullConversation = async () => {
    if (isPlaying) return;
    window.speechSynthesis.cancel();

    const qUtterance = new SpeechSynthesisUtterance(currentQA.question);
    const aUtterance = new SpeechSynthesisUtterance(currentQA.answer);

    if (selectedQuestionVoice) {
      const qVoice = voices.find((v) => v.name === selectedQuestionVoice);
      if (qVoice) qUtterance.voice = qVoice;
    }

    if (selectedAnswerVoice) {
      const aVoice = voices.find((v) => v.name === selectedAnswerVoice);
      if (aVoice) aUtterance.voice = aVoice;
    }

    qUtterance.rate = 0.85;
    aUtterance.rate = 0.85;

    qUtterance.onstart = () => setIsPlaying(true);
    aUtterance.onend = () => setIsPlaying(false);
    aUtterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(qUtterance);
    // Tạo khoảng nghỉ nhỏ giữa hỏi và đáp
    qUtterance.onend = () => {
      setTimeout(() => {
        window.speechSynthesis.speak(aUtterance);
      }, 800);
    };
  };

  const handleNext = () => {
    if (currentIndex < activeTopic.data.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Validation Checkers
  const isQuestionCorrect =
    normalizeText(questionInput) === normalizeText(currentQA.question);
  const isAnswerCorrect =
    normalizeText(answerInput) === normalizeText(currentQA.answer);
  const isAllCorrect = isQuestionCorrect && isAnswerCorrect;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Headphones className="w-7 h-7" />
            <h1 className="text-xl font-bold hidden md:block">EngListen Pro</h1>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Select cho Câu hỏi (Q) */}
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 shrink-0">
              <span className="text-xs font-bold text-blue-700">Q</span>
              <select
                className="bg-transparent text-sm outline-none text-slate-700 max-w-[90px] sm:max-w-[130px] cursor-pointer"
                value={selectedQuestionVoice || ""}
                onChange={(e) => setSelectedQuestionVoice(e.target.value)}
                title="Giọng đọc Câu hỏi"
              >
                {voices.length === 0 && <option>Đang tải...</option>}
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Select cho Câu trả lời (A) */}
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
              <span className="text-xs font-bold text-emerald-700">A</span>
              <select
                className="bg-transparent text-sm outline-none text-slate-700 max-w-[90px] sm:max-w-[130px] cursor-pointer"
                value={selectedAnswerVoice || ""}
                onChange={(e) => setSelectedAnswerVoice(e.target.value)}
                title="Giọng đọc Câu trả lời"
              >
                {voices.length === 0 && <option>Đang tải...</option>}
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar - Chủ đề */}
        <aside className="md:w-64 flex-shrink-0">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Chủ đề luyện tập
          </h2>
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0">
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setActiveTopicId(topic.id);
                  setCurrentIndex(0);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal text-left ${
                  activeTopicId === topic.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {topic.icon}
                <span className="font-medium">{topic.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Khu vực học chính */}
        <div className="flex-1 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header bài tập */}
            <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-indigo-300 text-sm font-medium block mb-1">
                  {activeTopic.name}
                </span>
                <h3 className="text-lg font-semibold">
                  Bài hội thoại {currentIndex + 1} / {activeTopic.data.length}
                </h3>
              </div>
              <button
                onClick={playFullConversation}
                disabled={isPlaying}
                className="bg-indigo-500 hover:bg-indigo-400 text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                title="Nghe toàn bộ"
              >
                <Play className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium pr-1 hidden sm:block">
                  Nghe toàn bộ
                </span>
              </button>
            </div>

            {/* Nội dung thực hành */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Box CÂU HỎI */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    Q
                  </span>
                  <button
                    onClick={() => speak(currentQA.question, "question")}
                    disabled={isPlaying}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe câu hỏi
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    ref={questionRef}
                    rows={2}
                    className={`w-full p-4 pl-4 pr-12 rounded-xl border-2 transition-all outline-none resize-none ${
                      questionInput.length > 0
                        ? isQuestionCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-amber-300 bg-amber-50"
                        : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    }`}
                    placeholder="Nghe và gõ lại câu hỏi vào đây..."
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                  />
                  {questionInput.length > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {isQuestionCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <RefreshCcw className="w-5 h-5 text-amber-500 animate-spin-slow" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Box CÂU TRẢ LỜI */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                    A
                  </span>
                  <button
                    onClick={() => speak(currentQA.answer, "answer")}
                    disabled={isPlaying}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe câu trả lời
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    ref={answerRef}
                    rows={2}
                    className={`w-full p-4 pl-4 pr-12 rounded-xl border-2 transition-all outline-none resize-none ${
                      answerInput.length > 0
                        ? isAnswerCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-amber-300 bg-amber-50"
                        : "border-slate-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    }`}
                    placeholder="Nghe và gõ lại câu trả lời vào đây..."
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                  />
                  {answerInput.length > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {isAnswerCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <RefreshCcw className="w-5 h-5 text-amber-500 animate-spin-slow" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Chúc mừng khi hoàn thành */}
              {isAllCorrect && (
                <div className="bg-green-100 text-green-800 p-4 rounded-xl flex items-center justify-center gap-2 font-medium animate-pulse">
                  <CheckCircle2 className="w-5 h-5" /> Chính xác! Bạn nghe rất
                  tốt.
                </div>
              )}

              {/* Tools: Bật tắt Script và Nghĩa */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowScript(!showScript)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showScript
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {showScript ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  {showScript ? "Ẩn Script" : "Hiện Script"}
                </button>

                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showTranslation
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  {showTranslation ? "Ẩn dịch nghĩa" : "Dịch nghĩa (Việt)"}
                </button>
              </div>

              {/* Script Viewer */}
              {(showScript || showTranslation) && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Câu hỏi
                    </span>
                    {showScript && (
                      <p className="text-slate-800 font-medium text-lg">
                        {currentQA.question}
                      </p>
                    )}
                    {showTranslation && (
                      <p className="text-slate-500 italic mt-1">
                        {currentQA.questionTrans}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Câu trả lời
                    </span>
                    {showScript && (
                      <p className="text-slate-800 font-medium text-lg">
                        {currentQA.answer}
                      </p>
                    )}
                    {showTranslation && (
                      <p className="text-slate-500 italic mt-1">
                        {currentQA.answerTrans}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Navigation */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Câu trước
              </button>
              <div className="text-sm font-medium text-slate-500">
                {currentIndex + 1} / {activeTopic.data.length}
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex === activeTopic.data.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                Câu tiếp <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
