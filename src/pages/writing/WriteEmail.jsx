import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Eye,
  EyeOff,
  Languages,
  Send,
  RefreshCw,
  Moon,
  Sun,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Award,
  Volume2,
  Sparkles,
  Loader2,
  Bot,
} from "lucide-react";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// --- DATASET: 5 MẪU EMAIL TĨNH -------------
const exercises = [
  {
    id: 1,
    task: "Write an email to your manager asking for a day off tomorrow due to a personal matter.",
    ipa: "/dɪə ˈmænɪdʒə,\n\naɪ æm ˈraɪtɪŋ tʊ rɪˈkwest ə deɪ ɒf tʊˈmɒrəʊ djuː tʊ ˈɜːdʒənt pɜːsnl ˈmætəz. aɪ hæv kəmˈpliːtɪd ɔːl maɪ ˈkʌrənt tɑːsks ænd ˈæləkeɪtɪd maɪ ˈpɛndɪŋ wɜːk tʊ maɪ tiːm. aɪ wɪl rɪˈtɜːn tʊ ði ˈɒfɪs ɒn ˈwɛnzdeɪ.\n\nθæŋk juː fɔː jɔːr ˌʌndəˈstændɪŋ.\n\nbɛst rɪˈɡɑːdz,/",
    transcript:
      "Dear Manager,\n\nI am writing to request a day off tomorrow due to urgent personal matters. I have completed all my current tasks and allocated my pending work to my team. I will return to the office on Wednesday.\n\nThank you for your understanding.\n\nBest regards,",
    vietnamese:
      "Kính gửi Quản lý,\n\nTôi viết email này để xin nghỉ một ngày vào ngày mai do có việc cá nhân đột xuất. Tôi đã hoàn thành tất cả các nhiệm vụ hiện tại và bàn giao công việc còn dang dở cho nhóm của mình. Tôi sẽ trở lại văn phòng vào thứ Tư.\n\nCảm ơn sự thông cảm của anh/chị.\n\nTrân trọng,",
  },
  {
    id: 2,
    task: "Write an email to a hotel complaining about the noisy room and poor service.",
    ipa: "/dɪə hɒˈspɪtæləti tiːm,\n\naɪ æm ˈraɪtɪŋ tʊ ɪkˈsprɛs maɪ dɪsˌsætɪsˈfækʃn wɪð maɪ rɪˈsɛnt steɪ æt jɔː həʊˈtɛl. maɪ ruːm wɒz ɪkˈstriːmli ˈnɔɪzi, mækɪŋ ɪt ɪmˈpɒsəbl tʊ sliːp. ˈfɜːðəˌmɔː, ðə ruːm ˈsɜːvɪs wɒz ˈvɛri sləʊ.\n\naɪ aɪ ɪkˈspɛkt ə fʊl rɪˈfʌnd fɔː ðɪs ɪnˌkənˈviːniəns.\n\nsɪnˈsɪəli,/",
    transcript:
      "Dear Hospitality Team,\n\nI am writing to express my dissatisfaction with my recent stay at your hotel. My room was extremely noisy, making it impossible to sleep. Furthermore, the room service was very slow.\n\nI expect a full refund for this inconvenience.\n\nSincerely,",
    vietnamese:
      "Kính gửi Đội ngũ Khách sạn,\n\nTôi viết email này để bày tỏ sự không hài lòng về kỳ nghỉ gần đây tại khách sạn của bạn. Phòng của tôi cực kỳ ồn ào, khiến tôi không thể ngủ được. Hơn nữa, dịch vụ phòng rất chậm chạp.\n\nTôi yêu cầu hoàn tiền đầy đủ cho sự bất tiện này.\n\nTrân trọng,",
  },
  {
    id: 3,
    task: "Write an email to your professor apologizing for late submission of your assignment.",
    ipa: "/dɪə prəˈfɛsə,\n\npliːz əkˈsɛpt maɪ sɪnˈsɪər əˈpɒlədʒiːz fɔː ðə leɪt səbˈmɪʃn ɒv maɪ ˈfaɪnl ɪˈseɪ. aɪ ɪkˈspɪəriənst ˈsɪəriəs tɛkˈnɪkl ˈɪʃuːz wɪð maɪ kəmˈpjuːtə lɑːst naɪt. aɪ hæv əˈtætʃt ðə dɒkjʊmənt tʊ ðɪs iːmeɪl.\n\naɪ hɒp juː kæn kənˈsɪdə maɪ sɪtʃʊˈeɪʃn.\n\njɔːz fɛɪθfʊli,/",
    transcript:
      "Dear Professor,\n\nPlease accept my sincere apologies for the late submission of my final essay. I experienced serious technical issues with my computer last night. I have attached the document to this email.\n\nI hope you can consider my situation.\n\nYours faithfully,",
    vietnamese:
      "Kính gửi Giáo sư,\n\nXin vui lòng chấp nhận lời xin lỗi chân thành của em về việc nộp bài luận cuối kỳ muộn. Em đã gặp sự cố kỹ thuật nghiêm trọng với máy tính vào đêm qua. Em đã đính kèm tài liệu vào email này.\n\nEm hy vọng thầy/cô có thể xem xét tình huống của em.\n\nTrân trọng,",
  },
  {
    id: 4,
    task: "Write a follow-up email after a job interview to thank the interviewer.",
    ipa: "/dɪə mɪstə ˈsmɪθ,\n\nθæŋk juː fɔː tækɪŋ ðə taɪm tʊ ˈɪntəvjuː miː jɛstədeɪ fɔː ðə mɑːkɪtɪŋ rəʊl. aɪ ˈvɛri mʌtʃ ɪnˈdʒɔɪd lɜːnɪŋ ˈmɔːr əˈbaʊt jɔː ˈkʌmpəni. maɪ skɪlz ɪn ˈdɪdʒɪtl mɑːkɪtɪŋ mæk miː aɪˈdɪəl fɔː ðɪs pəˈzɪʃn.\n\naɪ lʊk ˈfɔːwəd tʊ ˈhɪərɪŋ frɒm juː suːn.\n\nbɛst rɪˈɡɑːdz,/",
    transcript:
      "Dear Mr. Smith,\n\nThank you for taking the time to interview me yesterday for the marketing role. I very much enjoyed learning more about your company. My skills in digital marketing make me ideal for this position.\n\nI look forward to hearing from you soon.\n\nBest regards,",
    vietnamese:
      "Kính gửi ông Smith,\n\nCảm ơn ông đã dành thời gian phỏng vấn tôi vào ngày hôm qua cho vị trí tiếp thị. Tôi rất thích thú khi tìm hiểu thêm về công ty của ông. Các kỹ năng của tôi về tiếp thị kỹ thuật số khiến tôi trở nên lý tưởng cho vị trí này.\n\nTôi mong sớm nhận được phản hồi từ ông.\n\nTrân trọng,",
  },
  {
    id: 5,
    task: "Write an email to a client asking to reschedule an upcoming meeting.",
    ipa: "/dɪə ˈklaɪənt,\n\naɪ æm ˈraɪtɪŋ tʊ ɑːsk ɪf wiː kʊd riːˈʃɛdjuːl ɑː ˈmiːtɪŋ plænd fɔː ðɪs ˈfraɪdeɪ. ˈsʌmθɪŋ ˈɜːdʒənt hæz kʌm ʌp æt ði ˈɒfɪs. ˈwʊd nɛkst ˈmʌndeɪ æt tuː piːˈɛm wɜːk fɔː juː?\n\naɪ əˈpɒlədʒaɪz fɔː ˈɛni ɪnˌkənˈviːniəns kɔːzd.\n\nsɪnˈsɪəli,/",
    transcript:
      "Dear Client,\n\nI am writing to ask if we could reschedule our meeting planned for this Friday. Something urgent has come up at the office. Would next Monday at 2 PM work for you?\n\nI apologize for any inconvenience caused.\n\nSincerely,",
    vietnamese:
      "Kính gửi Khách hàng,\n\nTôi viết email này để hỏi xem chúng ta có thể dời lại cuộc họp dự kiến vào thứ Sáu tuần này không. Có một việc đột xuất vừa xảy ra ở văn phòng. Thứ Hai tuần tới lúc 2 giờ chiều có tiện cho bạn không?\n\nTôi xin lỗi vì bất kỳ sự bất tiện nào đã gây ra.\n\nTrân trọng,",
  },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Chuyển currentExercise thành state để có thể lưu bài tập do AI tạo ra
  const [currentExercise, setCurrentExercise] = useState(exercises[0]);

  const [showTranscript, setShowTranscript] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(false);

  const [userText, setUserText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [aiSampleEmail, setAiSampleEmail] = useState(null);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);

  // State mới cho việc AI tạo nguyên bài tập mới
  const [isGeneratingExercise, setIsGeneratingExercise] = useState(false);

  const wordCount = userText
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Chọn bài tập ngẫu nhiên từ thư viện cứng (Dataset)
  const handleNextExercise = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * exercises.length);
    } while (
      exercises[nextIndex].task === currentExercise.task &&
      exercises.length > 1
    );

    setCurrentExercise(exercises[nextIndex]);
    resetStates();
  };

  // Reset các thông số hiển thị khi chuyển bài
  const resetStates = () => {
    setShowTranscript(false);
    setShowVietnamese(false);
    setUserText("");
    setFeedback(null);
    setAiSampleEmail(null);
  };

  // TÍNH NĂNG MỚI: Dùng AI tạo đề bài email hoàn toàn mới
  const generateNewExerciseFromAI = async () => {
    setIsGeneratingExercise(true);
    resetStates();

    try {
      const prompt = `You are an expert English teacher. Create a completely new, random, and practical email writing task for a student (e.g., business, academic, customer service, or daily life).
      
Return a JSON with:
- task: The instruction for the student (in English).
- transcript: A high-quality sample email fulfilling this task.
- ipa: The exact phonetic transcription (IPA) of the transcript.
- vietnamese: A natural Vietnamese translation of the transcript.`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "new_email_exercise",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    task: { type: "string" },
                    transcript: { type: "string" },
                    ipa: { type: "string" },
                    vietnamese: { type: "string" },
                  },
                  required: ["task", "transcript", "ipa", "vietnamese"],
                  additionalProperties: false,
                },
              },
            },
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "API Error");
      }

      const text = result.choices[0].message.content;
      const newExerciseData = JSON.parse(text);

      // Cập nhật State thành bài tập mới
      setCurrentExercise({
        id: Date.now(), // Tạo ID ngẫu nhiên
        ...newExerciseData,
      });
    } catch (error) {
      console.error("AI Generation error:", error);
      alert("Đã có lỗi xảy ra khi gọi AI để tạo đề bài mới.");
    } finally {
      setIsGeneratingExercise(false);
    }
  };

  // Tích hợp API chấm điểm bằng OpenAI
  const evaluateWriting = async () => {
    if (wordCount < 10) {
      alert("Vui lòng viết dài hơn (ít nhất 10 từ) để AI có thể đánh giá!");
      return;
    }

    setIsEvaluating(true);
    setFeedback(null);

    try {
      const prompt = `
You are an expert English teacher evaluating a student's email.

Task: ${currentExercise.task}

Student's Email:
${userText}

Return a JSON with:
- score (out of 10, string like "8.5")
- grammar (feedback)
- vocabulary (feedback)
- taskAchievement (feedback)
- improvement (actionable tips)
`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "writing_evaluation",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    score: { type: "string" },
                    grammar: { type: "string" },
                    vocabulary: { type: "string" },
                    taskAchievement: { type: "string" },
                    improvement: { type: "string" },
                  },
                  required: [
                    "score",
                    "grammar",
                    "vocabulary",
                    "taskAchievement",
                    "improvement",
                  ],
                  additionalProperties: false,
                },
              },
            },
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "API Error");
      }

      const text = result.choices[0].message.content;
      const json = JSON.parse(text);
      setFeedback(json);
    } catch (error) {
      console.error("AI Evaluation error:", error);
      alert("Đã có lỗi xảy ra khi gọi AI để chấm điểm. Vui lòng thử lại sau.");
    } finally {
      setIsEvaluating(false);
    }
  };

  // Dùng AI sinh ra Email mẫu
  const generateSampleEmail = async () => {
    setIsGeneratingSample(true);
    setAiSampleEmail(null);

    try {
      const prompt = `Write a well-structured, professional English email based on this task:\n\n${currentExercise.task}\n\nOnly output the email content. No explanation.`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "API Error");
      }

      const text = result.choices[0].message.content;
      setAiSampleEmail(text);
    } catch (error) {
      console.error("AI Generation error:", error);
      alert("Đã có lỗi xảy ra khi gọi AI để tạo mẫu.");
    } finally {
      setIsGeneratingSample(false);
    }
  };

  // Đọc IPA
  const readText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt của bạn không hỗ trợ đọc văn bản.");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"}`}
    >
      <header
        className={`sticky top-0 z-10 px-6 py-4 shadow-sm flex justify-between items-center ${darkMode ? "bg-slate-800" : "bg-white"}`}
      >
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <BookOpen size={28} />
          <h1 className="text-xl font-bold tracking-tight">
            IPA Email Practice
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* CỘT TRÁI */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              className={`p-6 rounded-2xl shadow-sm border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <div className="flex items-center gap-2 mb-3 text-indigo-500 font-semibold">
                <Lightbulb size={20} />
                <h2>Task (Prompt)</h2>
              </div>
              <p className="text-lg font-medium leading-relaxed">
                "{currentExercise.task}"
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl shadow-sm border ${darkMode ? "bg-indigo-900/20 border-indigo-800" : "bg-indigo-50 border-indigo-100"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Volume2 size={20} />
                  Phonetic (IPA)
                </h2>
                <button
                  onClick={() => readText(currentExercise.transcript)}
                  className="text-xs px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                >
                  Listen
                </button>
              </div>
              <p className="font-mono text-lg whitespace-pre-wrap leading-relaxed tracking-wide text-slate-700 dark:text-slate-300">
                {currentExercise.ipa}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div
                className={`rounded-xl border overflow-hidden ${darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}
              >
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`w-full flex items-center justify-between p-4 font-medium transition ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-50"}`}
                >
                  <span className="flex items-center gap-2">
                    {showTranscript ? <EyeOff size={18} /> : <Eye size={18} />}
                    {showTranscript ? "Hide Transcript" : "Show Transcript"}
                  </span>
                </button>
                {showTranscript && (
                  <div
                    className={`p-4 pt-0 border-t ${darkMode ? "border-slate-700 text-slate-300" : "border-slate-100 text-slate-600"}`}
                  >
                    <p className="whitespace-pre-wrap italic mt-4">
                      {currentExercise.transcript}
                    </p>
                  </div>
                )}
              </div>

              <div
                className={`rounded-xl border overflow-hidden ${darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}
              >
                <button
                  onClick={() => setShowVietnamese(!showVietnamese)}
                  className={`w-full flex items-center justify-between p-4 font-medium transition ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-50"}`}
                >
                  <span className="flex items-center gap-2">
                    <Languages size={18} />
                    {showVietnamese
                      ? "Hide Vietnamese Meaning"
                      : "Show Vietnamese Meaning"}
                  </span>
                </button>
                {showVietnamese && (
                  <div
                    className={`p-4 pt-0 border-t ${darkMode ? "border-slate-700 text-slate-300" : "border-slate-100 text-slate-600"}`}
                  >
                    <p className="whitespace-pre-wrap mt-4">
                      {currentExercise.vietnamese}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div
              className={`flex flex-col rounded-2xl shadow-sm border overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
            >
              <div
                className={`p-4 border-b flex justify-between items-center ${darkMode ? "border-slate-700" : "border-slate-100"}`}
              >
                <h2 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  Your Email
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${wordCount > 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"}`}
                >
                  {wordCount} words
                </span>
              </div>

              <textarea
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Translate the IPA and write your full email here..."
                className={`w-full min-h-[350px] p-6 text-lg resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors ${
                  darkMode
                    ? "bg-slate-800 text-white placeholder-slate-500"
                    : "bg-white text-slate-900 placeholder-slate-400"
                }`}
              />

              <div
                className={`p-4 border-t flex flex-wrap justify-between items-center gap-4 ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"}`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setUserText("")}
                    className="text-sm font-medium text-slate-500 hover:text-red-500 transition"
                  >
                    Clear text
                  </button>
                  <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
                  <button
                    onClick={generateSampleEmail}
                    disabled={isGeneratingSample}
                    className={`flex items-center gap-1.5 text-sm font-medium transition ${isGeneratingSample ? "text-slate-400" : "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"}`}
                  >
                    {isGeneratingSample ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Sparkles size={16} />
                    )}
                    {isGeneratingSample ? "Generating..." : "AI Sample Email"}
                  </button>
                </div>
                <button
                  onClick={evaluateWriting}
                  disabled={isEvaluating || wordCount === 0}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white transition-all ${
                    isEvaluating || wordCount === 0
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Check my email
                    </>
                  )}
                </button>
              </div>
            </div>

            {aiSampleEmail && (
              <div
                className={`p-6 rounded-2xl shadow-sm border animate-in fade-in slide-in-from-top-4 duration-500 ${darkMode ? "bg-emerald-900/20 border-emerald-800" : "bg-emerald-50 border-emerald-100"}`}
              >
                <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Sparkles size={20} />
                  <h3>AI Generated Sample Email</h3>
                </div>
                <div
                  className={`p-5 rounded-xl font-medium whitespace-pre-wrap leading-relaxed ${darkMode ? "bg-slate-800 text-slate-200 border border-slate-700" : "bg-white text-slate-700 border border-slate-200"}`}
                >
                  {aiSampleEmail}
                </div>
              </div>
            )}

            {feedback && (
              <div
                className={`p-6 rounded-2xl shadow-lg border animate-in fade-in slide-in-from-bottom-4 duration-500 ${darkMode ? "bg-slate-800 border-indigo-500/30" : "bg-white border-indigo-100"}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-inner">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Feedback</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Analysis complete
                    </p>
                  </div>
                  <div className="ml-auto text-center">
                    <span className="block text-3xl font-black text-indigo-600 dark:text-indigo-400">
                      {feedback.score}
                    </span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      / 10
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-xl ${darkMode ? "bg-slate-700/50" : "bg-slate-50"}`}
                  >
                    <h4 className="font-semibold flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                      <CheckCircle2 size={16} /> Grammar
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feedback.grammar}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-xl ${darkMode ? "bg-slate-700/50" : "bg-slate-50"}`}
                  >
                    <h4 className="font-semibold flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
                      <BookOpen size={16} /> Vocabulary
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feedback.vocabulary}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-xl md:col-span-2 ${darkMode ? "bg-slate-700/50" : "bg-slate-50"}`}
                  >
                    <h4 className="font-semibold flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
                      <AlertCircle size={16} /> Suggestions & Task Achievement
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        Achievement:{" "}
                      </span>
                      {feedback.taskAchievement}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        Tip:{" "}
                      </span>
                      {feedback.improvement}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BUTTON ĐIỀU HƯỚNG BÀI TẬP */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleNextExercise}
                className={`flex-1 py-4 px-6 rounded-2xl border-2 border-dashed font-bold text-lg flex items-center justify-center gap-3 transition-colors ${
                  darkMode
                    ? "border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800"
                    : "border-slate-300 text-slate-500 hover:text-slate-800 hover:border-slate-400 hover:bg-slate-50"
                }`}
              >
                <RefreshCw size={20} />
                Thử bài mẫu khác
              </button>

              <button
                onClick={generateNewExerciseFromAI}
                disabled={isGeneratingExercise}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-sm ${
                  isGeneratingExercise
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-800/60"
                }`}
              >
                {isGeneratingExercise ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Bot size={20} />
                )}
                {isGeneratingExercise ? "Đang tạo..." : "AI tự động tạo đề mới"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
