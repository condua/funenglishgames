import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Square,
  RefreshCcw,
  Volume2,
  Languages,
  Trash2,
  Copy,
  Rabbit,
  Turtle,
  User,
  Users,
  Mic,
  Filter,
  AlertCircle,
  HelpCircle,
  X,
  FileQuestion,
  CheckCircle2,
  XCircle,
  BrainCircuit,
  Sparkles,
  WifiOff,
  BookOpen,
  Loader2,
} from "lucide-react";

export default function ToeicPartSix() {
  // --- State Management ---
  const defaultText = `Woman: Good morning, Mr. Lee. Thanks for meeting with me today.
Man: Good morning, Ms. Carter. No problem at all. How can I help you?

Woman: I wanted to discuss the progress of the marketing project. Have you had a chance to review the latest report?
Man: Yes, I looked over it yesterday. Overall, the results are positive, but I think we need to improve our online advertising strategy.

Woman: I agree. The sales figures increased, but not as much as we expected.
Man: Exactly. We may need to allocate more budget to social media campaigns....`;

  const [text, setText] = useState(defaultText);

  // Voices
  const [allVoicesList, setAllVoicesList] = useState([]);
  const [allVoicesLoaded, setAllVoicesLoaded] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Voices Selection
  const [selectedMaleVoice, setSelectedMaleVoice] = useState("");
  const [selectedFemaleVoice, setSelectedFemaleVoice] = useState("");

  // Audio Controls
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Highlight & Scroll
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);
  const [parsedSegments, setParsedSegments] = useState([]);
  const segmentRefs = useRef([]);

  // --- TOEIC QUIZ STATE ---
  const [quizMode, setQuizMode] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  // --- NEW: TOEIC TOPIC GENERATOR STATE ---------------
  const [selectedTopic, setSelectedTopic] = useState("Business");

  const synth = useRef(window.speechSynthesis);
  const utterancesRef = useRef([]);

  // ------------------------------------- GEMINI API CONFIGURATION ------------------------------------------
  // const apiKey = ""; // API Key được cung cấp bởi môi trường thực thi-------------------------

  // --- AUTO SCROLL ----------------------------
  useEffect(() => {
    if (quizMode) return;
    if (
      currentSegmentIndex !== -1 &&
      segmentRefs.current[currentSegmentIndex]
    ) {
      segmentRefs.current[currentSegmentIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSegmentIndex, quizMode]);

  // --- VOICE LOGIC ---
  const femaleKeywords = [
    "female",
    "zira",
    "samantha",
    "susan",
    "hazel",
    "heera",
    "linda",
    "catherine",
    "sarah",
    "trinh",
    "ngoc",
    "mai",
    "aria",
  ];
  const maleKeywords = [
    "male",
    "david",
    "mark",
    "james",
    "daniel",
    "shaun",
    "paul",
    "richard",
    "minh",
    "an",
    "nam",
    "brion",
    "brian",
  ];

  const isExplicitlyFemale = (name) =>
    femaleKeywords.some((k) => name.toLowerCase().includes(k));
  const isExplicitlyMale = (name) =>
    maleKeywords.some((k) => name.toLowerCase().includes(k));

  const loadVoices = () => {
    let allVoices = synth.current.getVoices();
    if (allVoices.length === 0) {
      setTimeout(loadVoices, 100);
      return;
    }
    setAllVoicesLoaded(true);
    allVoices.sort((a, b) => {
      const aEn = a.lang.toLowerCase().includes("en");
      const bEn = b.lang.toLowerCase().includes("en");
      if (aEn && !bEn) return -1;
      if (!aEn && bEn) return 1;
      return a.name.localeCompare(b.name);
    });
    setAllVoicesList(allVoices);

    if (!selectedMaleVoice && allVoices.length > 0) {
      const preferredMale = allVoices.find(
        (v) =>
          (v.name.toLowerCase().includes("brion") ||
            v.name.toLowerCase().includes("brian") ||
            v.name.toLowerCase().includes("david")) &&
          v.lang.includes("en"),
      );
      const bestMatch =
        preferredMale ||
        allVoices.find(
          (v) => isExplicitlyMale(v.name) && v.lang.includes("en"),
        ) ||
        allVoices.find((v) => v.lang.includes("en")) ||
        allVoices[0];
      setSelectedMaleVoice(bestMatch.name);
    }

    if (!selectedFemaleVoice && allVoices.length > 0) {
      const preferredFemale = allVoices.find(
        (v) => v.name.toLowerCase().includes("aria") && v.lang.includes("en"),
      );
      const bestMatch =
        preferredFemale ||
        allVoices.find(
          (v) =>
            (isExplicitlyFemale(v.name) || v.name.includes("Google US")) &&
            v.lang.includes("en"),
        ) ||
        allVoices.find((v) => v.lang.includes("en")) ||
        allVoices[0];
      setSelectedFemaleVoice(bestMatch.name);
    }
  };

  useEffect(() => {
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    generateQuestionsFallback(defaultText);
    return () => {
      if (synth.current) synth.current.cancel();
    };
  }, []);

  // --- FALLBACK LOGIC ---
  const generateQuestionsFallback = (inputText) => {
    setUsingFallback(true);
    const textLower = inputText.toLowerCase();
    const newQuestions = [];
    let context = "general";
    if (/(flight|airport|ticket)/i.test(inputText)) context = "travel";

    let q1 = {
      id: Date.now() + 1,
      question: "What is the conversation mainly about?",
      options: [
        "A business plan",
        "A travel issue",
        "A shopping list",
        "A medical appointment",
      ],
      correct: 0,
    };
    if (context === "travel") {
      q1.options = [
        "A flight delay",
        "Booking a ticket",
        "Lost luggage",
        "Hotel reservation",
      ];
      q1.correct = 0;
    }
    newQuestions.push(q1);

    let q2 = {
      id: Date.now() + 2,
      question: "When will the event happen?",
      options: ["Tomorrow morning", "Next week", "At 3 p.m.", "In an hour"],
      correct: 2,
    };
    const timeMatch = inputText.match(
      /(\d{1,2}(?::\d{2})?\s*(?:a\.m\.|p\.m\.|am|pm|o'clock))/i,
    );
    if (timeMatch) {
      q2.options[2] = `At ${timeMatch[0]}`;
      q2.correct = 2;
    }
    newQuestions.push(q2);

    let q3 = {
      id: Date.now() + 3,
      question: "What will the man likely do next?",
      options: [
        "Make a call",
        "Send an email",
        "Visit the client",
        "Prepare a presentation",
      ],
      correct: 3,
    };
    newQuestions.push(q3);

    setQuestions(newQuestions);
    setUserAnswers({});
    setShowResults(false);
    setIsGenerating(false);
  };

  // --- AI GENERATOR: FULL LESSON (SCRIPT + QUESTIONS) ---
  // ================================
  // AI GENERATOR: FULL LESSON
  // ================================
  const generateFullLessonWithAI = async () => {
    setIsGenerating(true);
    setUsingFallback(false);

    try {
      const prompt = `
You are a TOEIC test expert.

Generate a short TOEIC Part 3 conversation about the topic: "${selectedTopic}".

Requirements:
1. Return ONLY valid JSON.
2. Format:
{
  "script": "Man: ...\\nWoman: ...",
  "questions": [
    {
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correct": 0
    }
  ]
}
3. Script length: 8-12 lines.
4. Generate exactly 3 questions.
5. Each question must contain exactly 4 meaningful options.
6. "correct" must be index number from 0-3.
`;

      const response = await fetch(
        "https://e-temple-backend.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: prompt,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      if (!data.reply) {
        throw new Error("No AI response");
      }

      // Parse JSON AI trả về
      const parsedData = JSON.parse(data.reply);

      // Set script
      setText(parsedData.script || "");

      // Format questions
      const formattedQuestions = (parsedData.questions || []).map((q, idx) => ({
        id: Date.now() + idx,
        question: q.question,
        options: q.options,
        correct: q.correct,
      }));

      setQuestions(formattedQuestions);
      setUserAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error("AI Error:", error);

      alert("AI Generation failed. Using fallback.");

      generateQuestionsFallback(defaultText);
    } finally {
      setIsGenerating(false);
    }
  };

  // --- AI GENERATOR: QUESTIONS ONLY ---
  const generateQuestionsWithGemini = async (inputText) => {
    setIsGenerating(true);
    setUsingFallback(false);

    try {
      const prompt = `
Analyze the following TOEIC Part 3 conversation.

Generate exactly 3 multiple-choice questions.

Return ONLY valid JSON array.

Format:
[
  {
    "question": "Question text?",
    "options": ["A", "B", "C", "D"],
    "correct": 0
  }
]

Rules:
1. Exactly 3 questions.
2. Each question must contain 4 meaningful options.
3. "correct" must be index number from 0-3.

Conversation:
${inputText}
`;

      const response = await fetch(
        "https://e-temple-backend.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: prompt,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      if (!data.reply) {
        throw new Error("No AI response");
      }

      // Parse JSON
      const parsedQuestions = JSON.parse(data.reply);

      // Format
      const formattedQuestions = parsedQuestions.map((q, idx) => ({
        id: Date.now() + idx,
        question: q.question,
        options: q.options,
        correct: q.correct,
      }));

      setQuestions(formattedQuestions.slice(0, 3));

      setUserAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error("AI Error:", error);

      generateQuestionsFallback(inputText);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (qId, optionIdx) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleCheckResults = () => setShowResults(true);

  // --- PARSING & SPEECH ---
  const parseTextToSegments = (inputText) => {
    const lines = inputText.split("\n");
    const segments = [];
    lines.forEach((line) => {
      if (!line.trim()) return;
      let speaker = "neutral";
      let content = line;
      const lowerLine = line.toLowerCase().trim();
      if (lowerLine.startsWith("man:") || lowerLine.startsWith("nam:")) {
        speaker = "man";
        content = line.replace(/^(Man|Nam):/i, "").trim();
      } else if (
        lowerLine.startsWith("woman:") ||
        lowerLine.startsWith("nữ:")
      ) {
        speaker = "woman";
        content = line.replace(/^(Woman|Nữ)\s*:/i, "").trim();
      }
      if (content) segments.push({ speaker, content });
    });
    return segments;
  };

  const handleSpeak = () => {
    if (synth.current.speaking && isPaused) {
      synth.current.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }
    synth.current.cancel();
    utterancesRef.current = [];
    if (text.trim() === "") return;

    const segments = parseTextToSegments(text);
    setParsedSegments(segments);

    setTimeout(() => {
      segments.forEach((seg, index) => {
        const utterance = new SpeechSynthesisUtterance(seg.content);
        let targetVoiceName =
          seg.speaker === "man" ? selectedMaleVoice : selectedFemaleVoice;
        if (!targetVoiceName) targetVoiceName = selectedFemaleVoice;

        const currentVoices = synth.current.getVoices();
        let voice = currentVoices.find((v) => v.name === targetVoiceName);
        if (!voice)
          voice =
            currentVoices.find((v) => v.lang.includes("en")) ||
            currentVoices[0];

        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        }
        utterance.rate = rate;
        utterance.pitch = pitch;

        utterance.onstart = () => {
          setCurrentSegmentIndex(index);
          setIsSpeaking(true);
          setIsPaused(false);
        };
        utterance.onend = () => {
          if (index === segments.length - 1) {
            setIsSpeaking(false);
            setIsPaused(false);
            setCurrentSegmentIndex(-1);
          }
        };
        utterance.onerror = () => {
          if (index === segments.length - 1) setIsSpeaking(false);
        };

        utterancesRef.current.push(utterance);
        synth.current.speak(utterance);
      });
    }, 10);
  };

  const handlePause = () => {
    if (synth.current.speaking) {
      synth.current.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };
  const handleStop = () => {
    synth.current.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentSegmentIndex(-1);
  };
  const handleReset = () => {
    setRate(1);
    setPitch(1);
    handleStop();
  };

  // --- RENDER HELPERS ---
  const renderVoiceSelect = (label, value, setValue, icon) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-wider">
        {icon} {label}
      </label>
      <div className="relative">
        <select
          value={value || ""}
          onChange={(e) => setValue(e.target.value)}
          disabled={
            !allVoicesLoaded || allVoicesList.length === 0 || isGenerating
          }
          className="w-full p-3 pl-10 pr-8 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none hover:border-indigo-300 transition-colors cursor-pointer text-gray-700 font-medium disabled:bg-gray-100 disabled:text-gray-400"
        >
          {allVoicesList.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {isExplicitlyMale(voice.name)
                ? "👨 "
                : isExplicitlyFemale(voice.name)
                  ? "👩 "
                  : "👤 "}
              {voice.name.replace(/Microsoft|Google/g, "").trim()} ({voice.lang}
              )
            </option>
          ))}
        </select>
        <div className="absolute left-3 top-3.5 pointer-events-none text-gray-400">
          {label.includes("NAM") ? (
            <User className="w-4 h-4 text-blue-500" />
          ) : (
            <User className="w-4 h-4 text-pink-500" />
          )}
        </div>
      </div>
    </div>
  );

  const renderConversation = () => {
    const isBlur = quizMode && !showResults;
    const segments =
      parsedSegments.length > 0 ? parsedSegments : parseTextToSegments(text);

    return (
      <div
        className={`w-full h-64 overflow-y-auto p-4 bg-white border border-gray-200 rounded-xl space-y-4 custom-scrollbar scroll-smooth transition-all ${isBlur ? "filter blur-sm select-none" : ""}`}
      >
        {segments.map((seg, idx) => {
          const isActive = idx === currentSegmentIndex;
          const isMan = seg.speaker === "man";
          const isWoman = seg.speaker === "woman";

          let highlightClass = "text-gray-600";
          if (isActive) {
            if (isMan)
              highlightClass =
                "bg-blue-100 text-blue-900 border-l-4 border-blue-500 pl-2";
            else if (isWoman)
              highlightClass =
                "bg-pink-100 text-pink-900 border-l-4 border-pink-500 pl-2";
            else highlightClass = "bg-yellow-100 text-gray-900";
          }

          return (
            <div
              key={idx}
              ref={(el) => (segmentRefs.current[idx] = el)}
              className={`flex flex-col transition-all duration-300 ${isActive ? "opacity-100" : "opacity-80"}`}
            >
              <div className="mb-1">
                <span
                  className={`text-sm font-bold mr-2 ${isMan ? "text-blue-700" : isWoman ? "text-pink-600" : "text-gray-600"}`}
                >
                  {seg.speaker === "man"
                    ? "Man:"
                    : seg.speaker === "woman"
                      ? "Woman:"
                      : ""}
                </span>
                <span
                  className={`text-lg leading-relaxed rounded-md py-1 transition-colors ${highlightClass}`}
                >
                  {seg.content}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderQuiz = () => (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-6 animate-in fade-in slide-in-from-bottom-4 shadow-sm">
      <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
        <h3 className="font-bold text-indigo-800 flex items-center gap-2">
          <FileQuestion className="w-5 h-5" />
          TOEIC Part 3 Practice
          {usingFallback && (
            <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
              <WifiOff className="w-3 h-3" /> Offline
            </span>
          )}
          {!usingFallback && (
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI
            </span>
          )}
        </h3>
        <button
          onClick={() => generateQuestionsWithGemini(text)}
          disabled={isGenerating}
          className="text-xs bg-white text-indigo-600 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 flex items-center gap-1 transition-all disabled:opacity-50 disabled:cursor-wait"
        >
          {isGenerating ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <BrainCircuit className="w-3 h-3" />
          )}
          {isGenerating ? "Creating..." : "New Questions"}
        </button>
      </div>
      <div className="p-6 space-y-6">
        {questions.map((q, qIdx) => (
          <div key={q.id} className="space-y-3">
            <p className="font-semibold text-gray-800 text-sm">
              <span className="mr-2 text-indigo-600 font-bold">
                {qIdx + 1}.
              </span>
              {q.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
              {q.options.map((opt, oIdx) => {
                const isSelected = userAnswers[q.id] === oIdx;
                const isCorrect = q.correct === oIdx;
                let btnClass = "border-gray-200 hover:bg-gray-50 text-gray-600";
                if (showResults) {
                  if (isCorrect)
                    btnClass =
                      "bg-green-50 border-green-500 text-green-700 font-bold";
                  else if (isSelected)
                    btnClass = "bg-red-50 border-red-300 text-red-700";
                  else btnClass = "opacity-50 border-gray-100";
                } else if (isSelected)
                  btnClass =
                    "bg-indigo-50 border-indigo-500 text-indigo-700 font-medium";
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(q.id, oIdx)}
                    disabled={showResults}
                    className={`text-left px-4 py-2 rounded-lg border text-sm transition-all ${btnClass}`}
                  >
                    <span className="mr-2 font-bold opacity-60">
                      {String.fromCharCode(65 + oIdx)}.
                    </span>{" "}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
        {!showResults ? (
          <button
            onClick={handleCheckResults}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 text-sm shadow-sm"
          >
            Nộp bài
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-bold text-gray-700 text-sm">
              Kết quả:{" "}
              {
                Object.keys(userAnswers).filter(
                  (k) =>
                    userAnswers[k] ===
                    questions.find((q) => q.id === parseInt(k)).correct,
                ).length
              }
              /{questions.length}
            </span>
            <button
              onClick={() => {
                setShowResults(false);
                setUserAnswers({});
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 text-sm"
            >
              Làm lại
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const toeicTopics = [
    "General Business",
    "Travel",
    "Dining",
    "Entertainment",
    "Health",
    "Housing",
    "Offices",
    "Personnel",
    "Purchasing",
    "Finance",
    "Technical",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans flex items-center justify-center">
      {/* GUIDE MODAL */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                Hướng dẫn soạn thảo
              </h3>
              <button
                onClick={() => setShowGuide(false)}
                className="hover:bg-white/20 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-gray-700 text-sm space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-xs">
                <span className="text-blue-600 font-bold">Man:</span> Hello, how
                are you?
                <br />
                <span className="text-pink-600 font-bold">Woman:</span> I am
                fine, thank you.
              </div>
              <p>
                1. Sử dụng đúng định dạng <b>Man:</b> và <b>Woman:</b> ở đầu
                dòng để hệ thống nhận diện giọng đọc.
              </p>
              <p>2. Chọn giọng Nam và Nữ ở bảng điều khiển bên trái.</p>
              <p>
                3. Sử dụng tính năng <b>Tạo bài tập AI</b> để tạo nhanh đoạn hội
                thoại và câu hỏi.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Dialogue Reader Pro
              </h1>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${allVoicesLoaded ? "bg-green-400" : "bg-yellow-400"}`}
                ></span>
                <p className="text-blue-100 text-xs font-medium">
                  {allVoicesLoaded ? "Hệ thống sẵn sàng" : "Đang tải..."}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-xs opacity-90">
              <span className="font-semibold">Full Access Mode</span>
              <label className="flex items-center gap-1 cursor-pointer hover:opacity-100 transition-opacity">
                <input
                  type="checkbox"
                  checked={quizMode}
                  onChange={(e) => setQuizMode(e.target.checked)}
                  className="accent-white"
                />
                <span className="text-[10px]">TOEIC Mode</span>
              </label>
            </div>
            <button
              onClick={() => setShowGuide(true)}
              className="opacity-80 hover:opacity-100"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-gray-50/50">
          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            {/* VOICES */}
            <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-6">
                Chọn Giọng Đọc
              </h3>
              <div className="space-y-5">
                {renderVoiceSelect(
                  "GIỌNG NAM (VAI MAN)",
                  selectedMaleVoice,
                  setSelectedMaleVoice,
                )}
                {renderVoiceSelect(
                  "GIỌNG NỮ (VAI WOMAN)",
                  selectedFemaleVoice,
                  setSelectedFemaleVoice,
                )}
              </div>
              <div className="mt-6 bg-blue-50 p-3 rounded-xl border border-blue-100 flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-blue-600 leading-relaxed font-medium">
                  Mẹo: Hệ thống tự động nhận diện Man/Woman để tô màu và đổi
                  giọng.
                </p>
              </div>
            </div>

            {/* AUDIO CONTROLS */}
            <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <h3 className="text-sm font-bold text-gray-800 mb-6">
                Điều chỉnh âm thanh
              </h3>
              <div className="space-y-8 px-2">
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Rabbit className="w-3 h-3" /> Tốc độ
                    </label>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      {rate}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-3">
                    <label className="text-xs font-bold text-gray-500">
                      Cao độ
                    </label>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      {pitch}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI GENERATOR TOOLBAR */}
          <div className="mb-4 bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-bold text-gray-700">
                Tạo bài tập chủ đề:
              </span>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={isGenerating}
                className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
              >
                {toeicTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={generateFullLessonWithAI}
              disabled={isGenerating}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-wait"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <BrainCircuit className="w-4 h-4" />
              )}
              {isGenerating ? "Đang tạo..." : "Tạo bài với AI"}
            </button>
          </div>

          {/* -------TEXT AREA HEADER -------------------------*/}
          <div className="flex justify-between items-end mb-3">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Languages className="w-4 h-4 text-gray-500" />
              Kịch bản hội thoại
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setText("")}
                disabled={isGenerating}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(text)}
                disabled={isGenerating}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
          </div>

          {/* TEXT CONTENT */}
          {!quizMode && !isSpeaking && !isPaused ? (
            <textarea
              className="w-full h-64 p-5 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono text-sm leading-relaxed resize-none text-gray-700 shadow-sm disabled:bg-gray-50 disabled:text-gray-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isGenerating}
              placeholder="Nhập hội thoại ở đây (Man: ... Woman: ...)"
            />
          ) : (
            renderConversation()
          )}

          {/* BOTTOM CONTROLS */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {!isSpeaking || isPaused ? (
              <button
                onClick={handleSpeak}
                disabled={isGenerating}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-200 transform active:scale-95 transition-all flex items-center gap-2 font-bold text-sm min-w-[180px] justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4 fill-current" />{" "}
                {isPaused ? "TIẾP TỤC" : "BẮT ĐẦU HỘI THOẠI"}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg shadow-amber-200 transform active:scale-95 transition-all flex items-center gap-2 font-bold text-sm min-w-[180px] justify-center"
              >
                <Pause className="w-4 h-4 fill-current" /> TẠM DỪNG
              </button>
            )}
            <button
              onClick={handleStop}
              disabled={isGenerating}
              className="p-3 bg-white border border-gray-200 text-gray-400 rounded-full hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm disabled:opacity-50"
              title="Dừng lại"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleReset}
              disabled={isGenerating}
              className="p-3 bg-white border border-gray-200 text-gray-400 rounded-full hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50 transition-all shadow-sm disabled:opacity-50"
              title="Reset cài đặt"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>

          {/* AI QUIZ SECTION */}
          {quizMode && renderQuiz()}
        </div>
      </div>
    </div>
  );
}
