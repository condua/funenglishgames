import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Flag,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  Send,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";

// --- DỮ LIỆU BÀI THI ---
const testData = {
  title: "ĐỀ THI MINH HỌA - ĐÁNH GIÁ ĐẦU VÀO ĐẠI HỌC 2025",
  subject: "Tiếng Anh",
  duration: 60,
  parts: [
    {
      part: 1,
      title:
        "Read the notices/messages/advertisements and decide if the statements that follow each question are TRUE or FALSE.",
      questions: [
        {
          id: "q1",
          text: "SCHOOL ENTRANCE AHEAD\nDEAD SLOW",
          image:
            "https://images.unsplash.com/photo-1544665422-7773539860f3?auto=format&fit=crop&q=80&w=600",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Parents must stay away from the gate.",
              answer: "F",
            },
            { id: 2, text: "The sign is meant for drivers.", answer: "T" },
            {
              id: 3,
              text: "There is a school gate near the sign.",
              answer: "T",
            },
            { id: 4, text: "Schoolchildren have to walk slowly.", answer: "F" },
          ],
        },
        {
          id: "q2",
          text: "GRAY & SONS\nBUILDERS\nSince 1983\nFree estimates",
          image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600",
          type: "true-false",
          statements: [
            { id: 1, text: "Gray and Sons builds houses.", answer: "T" },
            {
              id: 2,
              text: "Gray and Sons estimates the size of your house for free.",
              answer: "T",
            },
            {
              id: 3,
              text: "Gray and Sons gives builders houses for free.",
              answer: "F",
            },
            {
              id: 4,
              text: "Gray and Sons has been in the business since 1983.",
              answer: "T",
            },
          ],
        },
        {
          id: "q3",
          text: "PACKERS & MOVERS\n24 hours, seven days a week\nMOBILE: 378 88806235",
          type: "true-false",
          statements: [
            { id: 1, text: "Packers & Movers moves houses.", answer: "T" },
            {
              id: 2,
              text: "You can contact Packers & Movers on mobile.",
              answer: "T",
            },
            {
              id: 3,
              text: "Packers & Movers doesn't work at the weekend.",
              answer: "F",
            },
            {
              id: 4,
              text: "Packers & Movers works only 24 hours a week.",
              answer: "F",
            },
          ],
        },
        {
          id: "q4",
          text: "YEAR-END PARTY\nOur year-end party will take place at the auditorium instead of the stadium as planned before. The party will also be delayed half an hour, starting at 7.30 p.m. on Dec 25th. Formal clothes are required!",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "The party will take place on the last day of the year.",
              answer: "F",
            },
            {
              id: 2,
              text: "The party will no longer be held in the stadium.",
              answer: "T",
            },
            {
              id: 3,
              text: "There is a change in the time of the party.",
              answer: "T",
            },
            {
              id: 4,
              text: "People can wear casual clothes to the party.",
              answer: "F",
            },
          ],
        },
        {
          id: "q5",
          text: "The Thinking Skills Assessment (TSA) is divided into two parts: a 90-minute, multiple choice TSA and a 30-minute writing task. The TSA will be a paper-based test from next month.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Candidates can take the computer-based TSA from next month.",
              answer: "F",
            },
            { id: 2, text: "The TSA consists of two sessions.", answer: "T" },
            {
              id: 3,
              text: "There is no multiple choice TSA this year.",
              answer: "F",
            },
            {
              id: 4,
              text: "The TSA writing task lasts 30 minutes.",
              answer: "T",
            },
          ],
        },
        {
          id: "q6",
          text: "Single room available in our four-bedroom house in Fairfax. Two-minute walk from city centre. Move in from 1 Dec. Shared kitchen and living room with three female housemates, no parking, £600 a month. No pets. Contact 0678 123456 for viewing",
          type: "true-false",
          statements: [
            { id: 1, text: "This house is near the city centre.", answer: "T" },
            { id: 2, text: "You can keep your car here.", answer: "F" },
            {
              id: 3,
              text: "You can come to see the house first.",
              answer: "T",
            },
            { id: 4, text: "Pets can live in the house.", answer: "F" },
          ],
        },
        {
          id: "q7",
          text: "From: Joy\nTo: Linh\nHi Linh. I'll be in town on business this Friday, so how about meeting for dinner then, instead of Tuesday as usual?\nJoy",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Joy wants Linh to meet her on Tuesday this week.",
              answer: "F",
            },
            { id: 2, text: "The message is meant for Linh.", answer: "T" },
            {
              id: 3,
              text: "Joy and Linh often meet for dinner on Friday.",
              answer: "F",
            },
            {
              id: 4,
              text: "Joy is with Linh on a business trip to town.",
              answer: "F",
            },
          ],
        },
      ],
    },
    {
      part: 2,
      title: "Read the passage and answer questions 8-15.",
      passage:
        "Fifty-two-year-old American Henry Evans is one of the world's first teletourists. From the comfort of his bed in Palo Alto, California, he has travelled to places as far away as Bora Bora in the South Pacific... (Content abbreviated for UI demo, assume full text exists)",
      questions: [
        {
          id: "q8",
          text: "Decide if the statements are TRUE or FALSE based on paragraph 1.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Henry suffers from severe and lasting post-stroke disability.",
              answer: "T",
            },
            {
              id: 2,
              text: "Henry has been disabled since he was born.",
              answer: "F",
            },
            {
              id: 3,
              text: "Henry has only visited domestic destinations virtually so far.",
              answer: "F",
            },
            {
              id: 4,
              text: "It is impossible for Henry to travel physically to faraway places.",
              answer: "T",
            },
          ],
        },
        {
          id: "q9",
          text: "Decide if the statements are TRUE or FALSE based on paragraph 2.",
          type: "true-false",
          statements: [
            {
              id: 1,
              text: "Henry can visit museums with the help of a telepresence robot.",
              answer: "T",
            },
            {
              id: 2,
              text: "Robots like the Beam are being used widely in museums across the world.",
              answer: "F",
            },
            {
              id: 3,
              text: "Henry use sign language to communicate directly with museum guides.",
              answer: "F",
            },
            {
              id: 4,
              text: "The Beam is attached permanently to museums' walls.",
              answer: "F",
            },
          ],
        },
        {
          id: "q10",
          text: 'In paragraph 3, the phrase "made up" is closest in meaning to',
          type: "multiple-choice",
          options: ["met", "formed", "avoided", "caused"],
          answer: "formed",
        },
        {
          id: "q11",
          text: 'In paragraph 3, the word "it" refers to',
          type: "multiple-choice",
          options: ["Polly", "a person's shoulder", "a frame", "a parrot"],
          answer: "Polly",
        },
        {
          id: "q12",
          text: "How does Polly differ from Beam according to paragraph 3?",
          type: "multiple-choice",
          options: [
            "Polly is made up of completely different components from the Beam.",
            "Polly is considerably smaller in size than the Beam.",
            "Polly can't be controlled by head movements while the Beam can.",
            "Polly doesn't facilitate interaction between Henry and his friends whereas the Beam does.",
          ],
          answer: "Polly is considerably smaller in size than the Beam.",
        },
        {
          id: "q13",
          text: 'In which space (marked [B] in the passage) will the following sentence fit? "He controls them using his head, and he\'s even flown one around his garden wearing a virtual reality headset."',
          type: "multiple-choice",
          options: ["[A].", "[B].", "[C].", "[D]."],
          answer: "[B].",
        },
        {
          id: "q14",
          text: "Which of the following can be inferred about Henry from the last paragraph of the passage?",
          type: "multiple-choice",
          options: [
            "He has already been approved to use a robot on the International Space Station.",
            "He has little hope of achieving his goal of exploring space remotely.",
            "He has shifted his focus from using drones to controlling robots in space.",
            "He is determined to keep exploring new possibilities despite his disability.",
          ],
          answer:
            "He is determined to keep exploring new possibilities despite his disability.",
        },
        {
          id: "q15",
          text: "Which sentence best summarizes the main idea of the passage?",
          type: "multiple-choice",
          options: [
            "Henry Evans, at 52, uses advanced technology to help other disabled individuals experience the world in ways they couldn't before.",
            "Henry Evans, a disabled American, has explored space using innovative technologies like telepresence robots and drones.",
            "Henry Evans, a 52-year-old American, explores the world using telepresence robots and drones, aiming to one day travel to space.",
            "Henry Evans, an American inventor, designs telepresence robots and drones to enable disabled individuals to travel virtually.",
          ],
          answer:
            "Henry Evans, a 52-year-old American, explores the world using telepresence robots and drones, aiming to one day travel to space.",
        },
      ],
    },
    {
      part: 3,
      title: "Matching",
      questions: [
        {
          id: "q16",
          type: "matching",
          text: "Match each number (1-4) with a suitable letter (A-F) to make an appropriate exchange.",
          items: [
            "Thanks a lot for helping me out this time!",
            "Excuse me, where's the library?",
            "Good bye!",
            "What time is it?",
          ],
          options: {
            A: "My pleasure.",
            B: "It's near here, just round the corner.",
            C: "See you.",
            D: "I'm glad you like it.",
            E: "It's nine o'clock.",
            F: "It's on May 5th.",
          },
          answers: { 0: "A", 1: "B", 2: "C", 3: "E" },
        },
        {
          id: "q17",
          type: "matching",
          text: "Match each sentence beginning (1-4) with its most suitable ending (A-F).",
          items: [
            "Many children's insecurities",
            "One consequence of family instability",
            "Deforestation in the Amazon rain forest",
            "A diet deficient in vitamin C",
          ],
          options: {
            A: "come as a result of problematic parental behaviours.",
            B: "stem mostly from human activities.",
            C: "is a reduction in the overall well-being of the children involved.",
            D: "is caused by bullying behaviours at school.",
            E: "is having its impacts on the water cycle as well as plant and animal life in the region.",
            F: "can lead to unwanted exhaustion and spontaneous bleeding.",
          },
          answers: { 0: "A", 1: "C", 2: "E", 3: "F" },
        },
        {
          id: "q18",
          type: "matching",
          text: "Match each sentence beginning (1-4) with its most suitable ending (A-F).",
          items: [
            "Should the government promote a healthy lifestyle,",
            "Were John to behave properly,",
            "Had David seen Mary off at the airport yesterday,",
            "Had it not been for the appearance of the famous singer,",
          ],
          options: {
            A: "he wouldn't be often blamed by his peers.",
            B: "many people will adopt better eating habits.",
            C: "the concert wouldn't have been so appealing.",
            D: "she would have been happy.",
            E: "there would be no one in the hall.",
            F: "she will be delighted.",
          },
          answers: { 0: "B", 1: "A", 2: "D", 3: "C" },
        },
        {
          id: "q19",
          type: "matching",
          text: "Match each sentence beginning (1-4) with its most suitable ending (A-F).",
          items: [
            "Mr. Brian is considering early retirement,",
            "Our next-door neighbour is a famous author,",
            "The artist had an impressive performance,",
            "David failed to answer the last question in the English speaking contest,",
          ],
          options: {
            A: "in which case his only son will take over the family business.",
            B: "most of whose books have been adapted for theatre.",
            C: "which satisfied her audience.",
            D: "for whom the students show great respect.",
            E: "most of which have been translated into three languages.",
            F: "which shocked everyone in the hall.",
          },
          answers: { 0: "A", 1: "B", 2: "C", 3: "F" },
        },
        {
          id: "q20",
          type: "matching",
          text: "Match each sentence beginning (1-4) with its most suitable ending (A-F).",
          items: [
            "She handled the situation",
            "Adam performed the experiment",
            "It was this beautiful scenery",
            "It is my parents' encouragement",
          ],
          options: {
            A: "as she always will.",
            B: "that attracted visitors to the place.",
            C: "like a true leader would.",
            D: "that helps me overcome many challenges.",
            E: "which motivates me a lot.",
            F: "the way he was instructed.",
          },
          answers: { 0: "C", 1: "F", 2: "B", 3: "D" },
        },
      ],
    },
    // --- [CẬP NHẬT] PART 4: CẤU TRÚC MỚI ---
    {
      part: 4,
      title: "Read the text and fill in ONE word which best fits each gap.",
      type: "fill-in-the-blank", // Type nằm ở ngoài
      text: "We know sleep is an activity we can't do without, yet we let our hectic lifestyle wear us down until we can't (21) ___ from bed in the morning. We know the longer we go without sleep, the more likely we are to have (22) ___ accident, and when that happens, this will be the unhappiest moment we've been through in our life. It's safe to say that too many people have come up against this problem. But there's no need for us to make ourselves tired over a lack of sleep. Now it seems as if people are bouncing back from this terrible (23) ___ torture by taking mid-day naps. Some may think it makes them look lazy to the boss, but these days aren't as old-fashioned (24) ___ we might expect, and such ideas as napping at work are catching (25) ___. It's been proven by researchers that a mid-day nap increases productivity, and more employees are changing their tune about the practice.", // Text nằm ở ngoài
      questions: [
        { id: "q21", answer: "get" },
        { id: "q22", answer: "an" },
        { id: "q23", answer: "mental" },
        { id: "q24", answer: "as" },
        { id: "q25", answer: "on" },
      ],
    },
  ],
};

// Hàm hỗ trợ format thời gian
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const VsatTestPage = () => {
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testData.duration * 60);
  const [darkMode, setDarkMode] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let total = 0;
    testData.parts.forEach((part) => {
      // Logic tính điểm cho cấu trúc Part 4 mới
      if (part.type === "fill-in-the-blank") {
        total += part.questions.length * 6; // 6 điểm mỗi câu
      } else {
        // Logic cũ cho các part khác
        part.questions.forEach((q) => {
          if (q.type === "true-false") total += 6;
          else if (q.type === "fill-in-the-blank")
            total += Object.keys(q.answers).length * 6;
          else if (q.type === "matching") total += q.items.length * 1.5;
          else if (q.type === "multiple-choice") total += 6;
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
      if (part.type === "fill-in-the-blank") {
        // Logic chấm điểm cho Part 4 mới (các câu hỏi độc lập)
        part.questions.forEach((q) => {
          // Lưu ý: với input đơn, mình dùng subId = 0 (giống trắc nghiệm) cho thống nhất
          const uAns = answers[q.id]?.[0];
          if (uAns?.toLowerCase().trim() === q.answer.toLowerCase()) {
            currentScore += 6;
          }
        });
      } else {
        // Logic cũ
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
            else if (correctCount === 4) currentScore += 6;
          } else if (q.type === "multiple-choice") {
            if (uAns[0] === q.answer) currentScore += 6;
          } else if (q.type === "matching") {
            Object.keys(q.answers).forEach((k) => {
              if (uAns[k] === q.answers[k]) currentScore += 1.5;
            });
          } else if (q.type === "fill-in-the-blank") {
            Object.keys(q.answers).forEach((k) => {
              if (uAns[k]?.toLowerCase().trim() === q.answers[k])
                currentScore += 6;
            });
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

    if (submitted) {
      return "bg-gray-300 text-gray-800";
    }

    if (isFlagged)
      return "bg-yellow-400 text-yellow-900 border-yellow-500 ring-2 ring-yellow-200 hover:bg-yellow-500";
    if (hasAnswer)
      return "bg-blue-500 text-white border-blue-600 hover:bg-blue-600";

    return "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600 dark:hover:text-white border-transparent hover:border-gray-300 dark:hover:border-slate-500";
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? "dark bg-slate-900 text-slate-100" : "bg-indigo-50 text-slate-800"}`}
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
              <Clock
                size={24}
                className={darkMode ? "text-white" : "text-indigo-600"}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg leading-tight">VSAT 2025</h1>
              <span className="text-xs opacity-70">English Test</span>
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
            {!submitted && (
              <button
                onClick={handleSubmit}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-full shadow-lg transform active:scale-95 transition-all font-bold text-sm"
              >
                <Send size={16} /> Nộp bài
              </button>
            )}
            {submitted && (
              <div className="font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                {score.toFixed(1)}/{totalPossibleScore}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${darkMode ? "bg-slate-700 text-yellow-300 hover:bg-slate-600" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 sm:p-6 pb-32">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {testData.title}
          </h2>
          <p className="opacity-70 mt-2 text-sm sm:text-base">
            {testData.subject} • 60 Minutes
          </p>
        </div>

        {/* QUESTIONS LIST */}
        <main className="space-y-6 sm:space-y-10 w-full mx-auto">
          {testData.parts.map((part, partIndex) => {
            // --- LOGIC RENDER RIÊNG CHO PART 4 (CẤU TRÚC MỚI) ---
            if (part.type === "fill-in-the-blank") {
              return (
                <section
                  key={partIndex}
                  className={`rounded-2xl shadow-xl overflow-hidden border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-white"}`}
                >
                  <div
                    className={`px-6 py-4 border-b ${darkMode ? "bg-slate-700/50 border-slate-700" : "bg-indigo-50/50 border-indigo-50"}`}
                  >
                    <h3 className="font-bold text-lg sm:text-xl">
                      Part {part.part}
                    </h3>
                    <p className="opacity-80 text-sm mt-1">{part.title}</p>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Render đoạn văn (TEXT) nằm ngoài question */}
                    <div
                      className={`p-5 rounded-xl text-lg leading-relaxed font-serif ${darkMode ? "bg-slate-900 border border-slate-700" : "bg-white border border-gray-200 shadow-sm"}`}
                    >
                      {part.text.split("___").map((txt, i, arr) => {
                        // Tính số thứ tự chỗ trống bắt đầu từ q21
                        // Giả định là id các câu hỏi theo thứ tự q21, q22...
                        // Hoặc dùng index + 21 nếu dữ liệu đảm bảo
                        // An toàn nhất là lấy id từ question tương ứng nếu có
                        // const currentQ = part.questions[i];
                        // const displayNum = currentQ
                        //   ? currentQ.id.replace("q", "")
                        //   : "";

                        if (i < arr.length - 1) {
                          return (
                            <span key={i}>
                              {txt}{" "}
                              <b className="mx-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-sm align-middle">
                                _______
                              </b>{" "}
                            </span>
                          );
                        }
                        return <span key={i}>{txt}</span>;
                      })}
                    </div>

                    {/* Render danh sách câu hỏi (QUESTIONS) */}
                    <div className="grid gap-4">
                      {part.questions.map((q) => {
                        const displayNum = q.id.replace("q", "");
                        const uVal = answers[q.id]?.[0]; // Dùng index 0 cho value
                        const isCorrect =
                          uVal?.toLowerCase().trim() === q.answer.toLowerCase();

                        return (
                          <div
                            key={q.id}
                            id={q.id}
                            className="scroll-mt-24 flex flex-col sm:flex-row items-stretch shadow-sm"
                          >
                            {/* Label Part */}
                            <div
                              className={`w-full sm:w-40 p-3 font-bold flex items-center justify-between sm:justify-start rounded-t-lg sm:rounded-tr-none sm:rounded-l-lg border-2 border-b-0 sm:border-b-2 sm:border-r-0 ${darkMode ? "bg-slate-700 border-slate-600 text-slate-200" : "bg-gray-100 border-gray-300 text-gray-600"}`}
                            >
                              <span className="">Question {displayNum}:</span>
                              {/* Cờ đánh dấu cho từng câu nhỏ */}
                              <button
                                onClick={() => toggleFlag(q.id)}
                                className={`ml-2 p-1 rounded-full transition-colors ${flagged[q.id] ? "text-yellow-500" : "text-gray-400 hover:text-gray-600"}`}
                              >
                                <Flag
                                  size={16}
                                  fill={flagged[q.id] ? "currentColor" : "none"}
                                />
                              </button>
                            </div>

                            {/* Input Part */}
                            <div className="flex-1 w-full relative">
                              <input
                                type="text"
                                disabled={submitted}
                                value={uVal || ""}
                                onChange={(e) =>
                                  handleAnswerChange(q.id, 0, e.target.value)
                                }
                                placeholder="Type answer here..."
                                className={`w-full h-full p-3 border-2 rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg focus:outline-none transition-all font-medium
                                      ${
                                        submitted
                                          ? isCorrect
                                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                                            : "border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                                          : "border-gray-300 focus:border-indigo-500 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                                      }
                                  `}
                              />
                              {submitted && !isCorrect && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 font-bold text-sm bg-white/80 dark:bg-black/50 px-2 py-0.5 rounded">
                                  {q.answer}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            }

            // --- LOGIC CŨ CHO CÁC PART KHÁC (1, 2, 3) ---
            return (
              <section
                key={partIndex}
                className={`rounded-2xl shadow-xl overflow-hidden border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-white"}`}
              >
                <div
                  className={`px-6 py-4 border-b ${darkMode ? "bg-slate-700/50 border-slate-700" : "bg-indigo-50/50 border-indigo-50"}`}
                >
                  <h3 className="font-bold text-lg sm:text-xl">
                    Part {part.part}
                  </h3>
                  <p className="opacity-80 text-sm mt-1">{part.title}</p>
                </div>

                {part.passage && (
                  <div
                    className={`mx-6 mt-6 p-4 rounded-xl text-sm sm:text-base leading-relaxed border-l-4 ${darkMode ? "bg-slate-900 border-indigo-500 text-slate-300" : "bg-slate-50 border-indigo-400 text-slate-600"}`}
                  >
                    {part.passage}
                  </div>
                )}

                <div className="p-6 space-y-10">
                  {part.questions.map((q) => (
                    <div key={q.id} id={q.id} className="scroll-mt-24">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex-shrink-0 w-auto h-auto px-2 py-1 flex items-center justify-center rounded-lg font-bold text-sm ${darkMode ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}
                          >
                            {q.id.replace("q", "")}
                          </span>
                          <div>
                            <p className="font-medium text-lg leading-snug whitespace-pre-wrap">
                              {q.text}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFlag(q.id)}
                          className={`p-2 rounded-full transition-colors ${flagged[q.id] ? "bg-yellow-100 text-yellow-600" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"}`}
                          title="Đánh dấu xem lại"
                        >
                          <Flag
                            size={20}
                            fill={flagged[q.id] ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      {q.image && (
                        <div className="mb-6 ml-11">
                          <div className="relative group rounded-xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 inline-block max-w-full">
                            <img
                              src={q.image}
                              alt="Question illustration"
                              className="max-h-64 object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded backdrop-blur-sm">
                              <ImageIcon size={14} />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="ml-0 sm:ml-11">
                        {/* 1. TRUE / FALSE */}
                        {q.type === "true-false" && (
                          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
                            <table className="w-full text-sm sm:text-base">
                              <thead
                                className={
                                  darkMode ? "bg-slate-700" : "bg-gray-50"
                                }
                              >
                                <tr>
                                  <th className="p-3 text-left">Statement</th>
                                  <th className="p-3 w-16 text-center">True</th>
                                  <th className="p-3 w-16 text-center">
                                    False
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                                {q.statements.map((stmt) => {
                                  const uAns = answers[q.id]?.[stmt.id];
                                  const isCorrect = uAns === stmt.answer;
                                  const rowClass = submitted
                                    ? isCorrect
                                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                                      : "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300"
                                    : "";
                                  return (
                                    <tr key={stmt.id} className={rowClass}>
                                      <td className="p-3">
                                        {stmt.text}{" "}
                                        {submitted && !isCorrect && (
                                          <span className="text-rose-500 font-bold ml-1">
                                            ({stmt.answer})
                                          </span>
                                        )}
                                      </td>
                                      <td className="p-3 text-center">
                                        <input
                                          type="radio"
                                          disabled={submitted}
                                          checked={uAns === "T"}
                                          onChange={() =>
                                            handleAnswerChange(
                                              q.id,
                                              stmt.id,
                                              "T",
                                            )
                                          }
                                          className="w-5 h-5 accent-indigo-600"
                                        />
                                      </td>
                                      <td className="p-3 text-center">
                                        <input
                                          type="radio"
                                          disabled={submitted}
                                          checked={uAns === "F"}
                                          onChange={() =>
                                            handleAnswerChange(
                                              q.id,
                                              stmt.id,
                                              "F",
                                            )
                                          }
                                          className="w-5 h-5 accent-indigo-600"
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* 2. MULTIPLE CHOICE */}
                        {q.type === "multiple-choice" && (
                          <div className="grid gap-3">
                            {q.options.map((opt, idx) => {
                              const isSelected = answers[q.id]?.[0] === opt;
                              const isCorrect = q.answer === opt;
                              let btnClass = `w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group `;

                              if (submitted) {
                                if (isCorrect)
                                  btnClass +=
                                    "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300";
                                else if (isSelected)
                                  btnClass +=
                                    "border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300";
                                else
                                  btnClass +=
                                    "border-gray-200 dark:border-slate-700 opacity-50";
                              } else {
                                if (isSelected)
                                  btnClass +=
                                    "border-indigo-500 dark:bg-indigo-600 dark:text-white dark:border-indigo-500 ring-1 ring-indigo-500 shadow-md";
                                else
                                  btnClass +=
                                    "border-gray-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:bg-slate-700 dark:hover:border-slate-500 dark:hover:text-indigo-100";
                              }

                              return (
                                <button
                                  key={idx}
                                  disabled={submitted}
                                  onClick={() =>
                                    handleAnswerChange(q.id, 0, opt)
                                  }
                                  className={btnClass}
                                >
                                  <span>{opt}</span>
                                  {submitted && isCorrect && (
                                    <CheckCircle
                                      size={20}
                                      className="text-emerald-500"
                                    />
                                  )}
                                  {submitted && isSelected && !isCorrect && (
                                    <XCircle
                                      size={20}
                                      className="text-rose-500"
                                    />
                                  )}
                                  {!submitted && (
                                    <div
                                      className={`w-5 h-5 rounded-full border-2 ${isSelected ? "border-indigo-600 bg-indigo-600 dark:border-white dark:bg-white" : "border-gray-300 dark:border-slate-400 group-hover:border-indigo-400"}`}
                                    ></div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 3. MATCHING */}
                        {q.type === "matching" && (
                          <div className="space-y-3">
                            {q.items.map((item, idx) => {
                              const currentQuestionAnswers =
                                answers[q.id] || {};
                              const selectedByOthers = Object.values(
                                currentQuestionAnswers,
                              ).filter(
                                (val) => val !== currentQuestionAnswers[idx],
                              );
                              const isCorrect =
                                q.answers[idx] === currentQuestionAnswers[idx];

                              return (
                                <div
                                  key={idx}
                                  className={`p-4 rounded-xl border transition-colors ${submitted ? (isCorrect ? "border-emerald-300 bg-emerald-50/50 dark:bg-emerald-900/10" : "border-rose-300 bg-rose-50/50 dark:bg-rose-900/10") : "border-gray-200 dark:border-slate-700"}`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <span className="font-medium text-sm sm:text-base flex-1">
                                      {idx + 1}. {item}
                                    </span>
                                    <div className="w-full sm:w-1/2 flex items-center gap-2">
                                      <select
                                        disabled={submitted}
                                        value={
                                          currentQuestionAnswers[idx] || ""
                                        }
                                        onChange={(e) =>
                                          handleAnswerChange(
                                            q.id,
                                            idx,
                                            e.target.value,
                                          )
                                        }
                                        className={`p-2 rounded-lg border-2 w-full font-semibold bg-transparent dark:bg-slate-800 dark:text-white ${submitted ? "border-transparent" : "border-gray-300 focus:border-indigo-500"}`}
                                      >
                                        <option
                                          value=""
                                          className="dark:bg-slate-800 text-gray-800 dark:text-white"
                                        >
                                          Choose...
                                        </option>
                                        {Object.entries(q.options).map(
                                          ([k, v]) => (
                                            <option
                                              key={k}
                                              value={k}
                                              disabled={selectedByOthers.includes(
                                                k,
                                              )}
                                              className="dark:bg-slate-800 text-gray-800 dark:text-white"
                                            >
                                              {k}. {v}
                                            </option>
                                          ),
                                        )}
                                      </select>
                                      {submitted && !isCorrect && (
                                        <span className="text-rose-600 font-bold text-sm">
                                          ({q.answers[idx]})
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {currentQuestionAnswers[idx] && (
                                    <div className="mt-2 text-xs opacity-75 pl-4 border-l-2 border-indigo-200">
                                      Selected:{" "}
                                      {q.options[currentQuestionAnswers[idx]]}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {/* Note: Fill-in-blank cũ đã bị bỏ vì chuyển sang cấu trúc mới ở trên */}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-indigo-100"}`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between p-2 px-4 border-b border-gray-100 dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider opacity-60">
              Question Palette
            </span>
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="sm:hidden bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold"
              >
                Nộp bài
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="bg-gray-600 text-white px-4 py-1 rounded-full text-xs font-bold"
              >
                Làm lại
              </button>
            )}
          </div>

          <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar scroll-smooth">
            {testData.parts
              .flatMap((p) => p.questions)
              .map((q) => (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id)}
                  className={`flex-shrink-0 w-10 h-10 rounded-full font-bold text-sm border flex items-center justify-center transition-all shadow-sm active:scale-90 ${getNavBubbleClass(q)}`}
                >
                  {q.id.replace("q", "")}
                  {flagged[q.id] && !submitted && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                  )}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="h-25"></div>
    </div>
  );
};

export default VsatTestPage;
