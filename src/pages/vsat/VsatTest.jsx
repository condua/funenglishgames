import React, { useState, useEffect, useRef } from "react";

// Dữ liệu cho bài thi, được trích xuất từ file PDF của bạn
const testData = {
  title: "ĐỀ THI MINH HỌA - ĐÁNH GIÁ ĐẦU VÀO ĐẠI HỌC 2025",
  subject: "Tiếng Anh",
  duration: 60, // Phút
  parts: [
    {
      part: 1,
      title:
        "Read the notices/messages/advertisements and decide if the statements that follow each question are TRUE or FALSE.",
      questions: [
        {
          id: "q1",
          text: "SCHOOL ENTRANCE AHEAD\nDEAD SLOW",
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
        "Fifty-two-year-old American Henry Evans is one of the world's first teletourists. From the comfort of his bed in Palo Alto, California, he has travelled to places as far away as Bora Bora in the South Pacific. Under normal circumstances, this journey would be impossible for Henry because he is disabled. A serious stroke when he was 40 affected his brain and left him without speech and unable to use his arms or legs. But with the help of technology, Henry is able to deal with his difficulties and get out to see the world.\n\nWhen Henry wants to visit a museum, he uses a telepresence robot called the Beam, a big computer monitor with a webcam that is attached to a mobile base with two poles. Using head movements, he can drive the machine around the halls, talking to the guide and learning about the exhibits, just like any other visitor. Several of the world's museums already use these machines, and Henry hopes there will soon be more.\n\nTo see what is happening outside, Henry uses a device called Polly. Like the Beam, Polly is made up of a monitor and a webcam, the difference being that it is small enough to be portable. The gadget fits into a frame attached to a person's shoulder allowing it to be carried around like a parrot. By virtue of this new technology, Henry can accompany and converse with his friends and family when they have a day out in the country. He controls it by moving his head, so that it turns around and shows him everything his companions can see and hear.\n\nThanks to improvements in long-distance remote-control software, Henry can fly drones, which also enable him to explore from the air. [B] He controls them using his head, and he's even flown one around his garden wearing a virtual reality headset. When he wants to go further afield, he has found a website which has 5,000 drone videos from all over the world, which gives him access to all kinds of fascinating destinations.\n\nNo journey is too far for Henry, who is currently pursuing the possibility of travelling into space. He got the idea from an article he came across on the internet. He read that a research team was trying to get access for PC users to a robot on the International Space Station (ISS). Henry has already applied for permission to use this new technology, but he has not received approval yet. Judging by what he has already achieved, however, it is only a matter of time before he is allowed to go on a remote tour of the satellite.",
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
    {
      part: 4,
      title: "Read the text and fill in ONE word which best fits each gap.",
      questions: [
        {
          id: "q21-25",
          type: "fill-in-the-blank",
          text: "We know sleep is an activity we can't do without, yet we let our hectic lifestyle wear us down until we can't (21) ___ from bed in the morning. We know the longer we go without sleep, the more likely we are to have (22) ___ accident, and when that happens, this will be the unhappiest moment we've been through in our life. It's safe to say that too many people have come up against this problem. But there's no need for us to make ourselves tired over a lack of sleep. Now it seems as if people are bouncing back from this terrible (23) ___ torture by taking mid-day naps. Some may think it makes them look lazy to the boss, but these days aren't as old-fashioned (24) ___ we might expect, and such ideas as napping at work are catching (25) ___. It's been proven by researchers that a mid-day nap increases productivity, and more employees are changing their tune about the practice.",
          answers: {
            21: "get",
            22: "an",
            23: "mental",
            24: "as",
            25: "on",
          },
        },
      ],
    },
  ],
};

const VsatTestPage = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testData.duration * 60);
  const timerRef = useRef(null);

  useEffect(() => {
    let total = 0;
    testData.parts.forEach((part) => {
      part.questions.forEach((q) => {
        if (q.type === "true-false") {
          total += q.statements.length;
        } else if (q.type === "fill-in-the-blank") {
          total += Object.keys(q.answers).length;
        } else if (q.type === "matching") {
          total += q.items.length;
        } else {
          total += 1;
        }
      });
    });
    setTotalPossibleScore(total);
  }, []);

  useEffect(() => {
    if (!submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [submitted]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerChange = (questionId, statementId, value) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [statementId]: value,
      },
    }));
  };

  const handleSubmit = () => {
    if (submitted) return;

    let currentScore = 0;
    testData.parts.forEach((part) => {
      part.questions.forEach((q) => {
        const userAnswers = answers[q.id] || {};
        if (q.type === "true-false") {
          q.statements.forEach((stmt) => {
            if (userAnswers[stmt.id] === stmt.answer) {
              currentScore++;
            }
          });
        } else if (q.type === "multiple-choice") {
          if (userAnswers[0] === q.answer) {
            currentScore++;
          }
        } else if (q.type === "matching") {
          Object.keys(q.answers).forEach((key) => {
            if (userAnswers[key] === q.answers[key]) {
              currentScore++;
            }
          });
        } else if (q.type === "fill-in-the-blank") {
          Object.keys(q.answers).forEach((key) => {
            if (userAnswers[key]?.toLowerCase().trim() === q.answers[key]) {
              currentScore++;
            }
          });
        }
      });
    });
    setScore(currentScore);
    setSubmitted(true);
    clearInterval(timerRef.current);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setAnswers({});
    setScore(0);
    setSubmitted(false);
    setTimeLeft(testData.duration * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getResultClasses = (isCorrect) => {
    if (!submitted) return "";
    return isCorrect
      ? "bg-green-100 border-green-500"
      : "bg-red-100 border-red-500";
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            {testData.title}
          </h1>
          <p className="text-center text-gray-600 mt-2">{testData.subject}</p>
          <div className="sticky top-0 bg-white py-4 z-10 mt-4 border-t border-b border-gray-200">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <div className="text-lg font-semibold text-blue-600">
                Thời gian:{" "}
                <span className="font-bold text-2xl">
                  {formatTime(timeLeft)}
                </span>
              </div>
              {submitted && (
                <div className="text-lg font-semibold text-green-600">
                  Kết quả:{" "}
                  <span className="font-bold text-2xl">
                    {score} / {totalPossibleScore}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="space-y-8">
          {testData.parts.map((part, partIndex) => (
            <section
              key={partIndex}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-gray-700 border-b pb-3 mb-6">
                Part {part.part}:{" "}
                <span className="font-normal">{part.title}</span>
              </h2>
              {part.passage && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {part.passage}
                </div>
              )}
              <div className="space-y-8">
                {part.questions.map((q, qIndex) => (
                  <div key={q.id} className="border-t pt-6">
                    <p className="font-semibold text-gray-800 mb-4 text-lg">
                      Question {q.id.replace("q", "")}: {q.text}
                    </p>

                    {q.type === "true-false" && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statement
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                True
                              </th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                False
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {q.statements.map((stmt) => {
                              const userAnswer = answers[q.id]?.[stmt.id];
                              const isCorrect = userAnswer === stmt.answer;
                              return (
                                <tr
                                  key={stmt.id}
                                  className={`${
                                    submitted ? getResultClasses(isCorrect) : ""
                                  }`}
                                >
                                  <td className="px-6 py-4 whitespace-normal">
                                    {stmt.id}. {stmt.text}{" "}
                                    {submitted && !isCorrect && (
                                      <span className="font-bold text-green-600 ml-2">
                                        (Đáp án: {stmt.answer})
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <input
                                      type="radio"
                                      name={`${q.id}-${stmt.id}`}
                                      checked={userAnswer === "T"}
                                      onChange={() =>
                                        handleAnswerChange(q.id, stmt.id, "T")
                                      }
                                      className="form-radio h-5 w-5 text-blue-600"
                                      disabled={submitted}
                                    />
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <input
                                      type="radio"
                                      name={`${q.id}-${stmt.id}`}
                                      checked={userAnswer === "F"}
                                      onChange={() =>
                                        handleAnswerChange(q.id, stmt.id, "F")
                                      }
                                      className="form-radio h-5 w-5 text-blue-600"
                                      disabled={submitted}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {q.type === "multiple-choice" && (
                      <div className="space-y-3">
                        {q.options.map((option, index) => {
                          const userAnswer = answers[q.id]?.[0];
                          const isCorrect = q.answer === option;
                          const isSelected = userAnswer === option;
                          let classes = "border-gray-300";
                          if (submitted) {
                            if (isCorrect)
                              classes = "bg-green-100 border-green-500";
                            else if (isSelected && !isCorrect)
                              classes = "bg-red-100 border-red-500";
                          }
                          return (
                            <label
                              key={index}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${classes}`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={option}
                                checked={isSelected}
                                onChange={(e) =>
                                  handleAnswerChange(q.id, 0, e.target.value)
                                }
                                className="form-radio h-5 w-5 text-blue-600"
                                disabled={submitted}
                              />
                              <span className="ml-3 text-gray-700">
                                {option}
                              </span>
                            </label>
                          );
                        })}
                        {submitted && answers[q.id]?.[0] !== q.answer && (
                          <div className="mt-2 p-2 bg-green-50 text-green-800 rounded-md">
                            Đáp án đúng: {q.answer}
                          </div>
                        )}
                      </div>
                    )}

                    {q.type === "matching" && (
                      <div className="space-y-4">
                        {q.items.map((item, index) => {
                          const userAnswer = answers[q.id]?.[index];
                          const isCorrect = q.answers[index] === userAnswer;

                          const currentQuestionAnswers = answers[q.id] || {};
                          const selectedByOthers = Object.values(
                            currentQuestionAnswers
                          ).filter((val) => val !== userAnswer);

                          let classes =
                            "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
                          if (submitted) {
                            classes = isCorrect
                              ? "bg-green-100 border-green-500"
                              : "bg-red-100 border-red-500";
                          }

                          return (
                            <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                            >
                              <p className="text-gray-800">
                                {index + 1}. {item}
                              </p>
                              <div className="flex items-center space-x-2">
                                <select
                                  value={userAnswer || ""}
                                  onChange={(e) =>
                                    handleAnswerChange(
                                      q.id,
                                      index,
                                      e.target.value
                                    )
                                  }
                                  className={`block w-full p-2 border rounded-md shadow-sm ${classes}`}
                                  disabled={submitted}
                                >
                                  <option value="">Chọn đáp án...</option>
                                  {Object.entries(q.options).map(
                                    ([key, value]) => {
                                      const isDisabled =
                                        selectedByOthers.includes(key);
                                      return (
                                        <option
                                          key={key}
                                          value={key}
                                          disabled={isDisabled}
                                        >
                                          {key}. {value}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                                {submitted && !isCorrect && (
                                  <span className="text-sm font-semibold text-green-700">
                                    Đáp án: {q.answers[index]}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {q.type === "fill-in-the-blank" && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {q.text.split("___").map((part, index, arr) => {
                            const blankNumber = 21 + index;
                            const userAnswer = answers[q.id]?.[blankNumber];
                            const isCorrect =
                              userAnswer?.toLowerCase().trim() ===
                              q.answers[blankNumber];
                            let classes =
                              "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
                            if (submitted) {
                              classes = isCorrect
                                ? "bg-green-100 border-green-500"
                                : "bg-red-100 border-red-500";
                            }

                            if (index < arr.length - 1) {
                              return (
                                <React.Fragment key={index}>
                                  {part}
                                  <input
                                    type="text"
                                    className={`inline-block w-24 mx-1 px-2 py-1 border rounded-md shadow-sm text-center ${classes}`}
                                    value={userAnswer || ""}
                                    onChange={(e) =>
                                      handleAnswerChange(
                                        q.id,
                                        blankNumber,
                                        e.target.value
                                      )
                                    }
                                    disabled={submitted}
                                  />
                                  {submitted && !isCorrect && (
                                    <span className="text-sm text-green-700 font-bold">
                                      ({q.answers[blankNumber]})
                                    </span>
                                  )}
                                </React.Fragment>
                              );
                            }
                            return part;
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        <footer className="mt-8 text-center">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-md"
            >
              Nộp bài
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-gray-700 transition-colors text-lg shadow-md"
            >
              Làm lại
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default VsatTestPage;
