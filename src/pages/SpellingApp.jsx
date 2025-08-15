import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================
// Utils: Speech (vi-VN)
// ==========================
const speak = (text) => {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "vi-VN";
    u.rate = 0.9; // chậm cho trẻ nhỏ
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) {
    console.warn("Speech not supported:", e);
  }
};

// ==========================
// DỮ LIỆU CƠ BẢN (có thể mở rộng)
// ==========================
const BASE_VOWELS = [
  "a",
  "ă",
  "â",
  "e",
  "ê",
  "i",
  "o",
  "ô",
  "ơ",
  "u",
  "ư",
  "y",
];
const INITIALS = [
  "b",
  "c",
  "ch",
  "d",
  "đ",
  "g",
  "gh",
  "gi",
  "h",
  "k",
  "kh",
  "l",
  "m",
  "n",
  "ng",
  "ngh",
  "nh",
  "p",
  "ph",
  "q",
  "qu",
  "r",
  "s",
  "t",
  "th",
  "tr",
  "v",
  "x",
];

// FIX 1: Bổ sung các âm cuối i, o, u để tạo vần kép và sắp xếp lại cho dễ nhìn.
const FINALS = [
  "c",
  "ch",
  "m",
  "n",
  "ng",
  "nh",
  "p",
  "t",
  "i",
  "o",
  "u",
  "y",
  "",
];

// Các dấu thanh tiếng Việt
const TONES = [
  { key: "ngang", mark: "", name: "Ngang" },
  { key: "sac", mark: "´", name: "Sắc" },
  { key: "huyen", mark: "`", name: "Huyền" },
  { key: "hoi", mark: "˘", name: "Hỏi" },
  { key: "nga", mark: "~", name: "Ngã" },
  { key: "nang", mark: ".", name: "Nặng" },
];

// Bảng thay thế dấu cho nguyên âm
const ACCENTS = {
  a: { sac: "á", huyen: "à", hoi: "ả", nga: "ã", nang: "ạ" },
  ă: { sac: "ắ", huyen: "ằ", hoi: "ẳ", nga: "ẵ", nang: "ặ" },
  â: { sac: "ấ", huyen: "ầ", hoi: "ẩ", nga: "ẫ", nang: "ậ" },
  e: { sac: "é", huyen: "è", hoi: "ẻ", nga: "ẽ", nang: "ẹ" },
  ê: { sac: "ế", huyen: "ề", hoi: "ể", nga: "ễ", nang: "ệ" },
  i: { sac: "í", huyen: "ì", hoi: "ỉ", nga: "ĩ", nang: "ị" },
  o: { sac: "ó", huyen: "ò", hoi: "ỏ", nga: "õ", nang: "ọ" },
  ô: { sac: "ố", huyen: "ồ", hoi: "ổ", nga: "ỗ", nang: "ộ" },
  ơ: { sac: "ớ", huyen: "ờ", hoi: "ở", nga: "ỡ", nang: "ợ" },
  u: { sac: "ú", huyen: "ù", hoi: "ủ", nga: "ũ", nang: "ụ" },
  ư: { sac: "ứ", huyen: "ừ", hoi: "ử", nga: "ữ", nang: "ự" },
  y: { sac: "ý", huyen: "ỳ", hoi: "ỷ", nga: "ỹ", nang: "ỵ" },
};

// FIX 2: Sửa lại hoàn toàn logic đặt dấu thanh cho đúng quy tắc tiếng Việt.
// FIX 2: Sửa lại hoàn toàn logic đặt dấu thanh cho đúng quy tắc tiếng Việt.
const applyTone = (syllable, toneKey) => {
  if (!toneKey || toneKey === "ngang") return syllable;

  const chars = [...syllable];
  const vowelsInSyllable = chars
    .map((char, index) => ({ char, index }))
    .filter((c) => BASE_VOWELS.includes(c.char));

  if (vowelsInSyllable.length === 0) return syllable;

  let targetIndex = -1;
  const syllableStr = syllable.toString();

  // Quy tắc 1: Ưu tiên các nguyên âm có sẵn dấu phụ (ă, â, ê, ô, ơ, ư)
  const priorityVowels = ["ă", "â", "ê", "ô", "ơ", "ư"];
  for (const v of priorityVowels) {
    const found = vowelsInSyllable.find((vc) => vc.char === v);
    if (found) {
      targetIndex = found.index;
      break;
    }
  }

  // ⭐ FIX 2.1: Bổ sung quy tắc cho các vần có nguyên âm đôi mà dấu đặt ở con chữ thứ hai
  if (targetIndex === -1) {
    const secondVowelPatterns = [
      "ia",
      "yê",
      "ua",
      "ưa",
      "oe",
      "oy",
      "uê",
      "uy",
    ];
    if (
      secondVowelPatterns.some((p) => syllableStr.includes(p)) &&
      vowelsInSyllable.length > 1
    ) {
      targetIndex = vowelsInSyllable[1].index; // Đặt vào nguyên âm thứ hai
    }
  }

  // Quy tắc 3: Các trường hợp còn lại, đặt vào nguyên âm đứng đầu
  if (targetIndex === -1) {
    targetIndex = vowelsInSyllable[0]?.index;
  }

  // Áp dụng dấu vào ký tự đã xác định
  if (targetIndex !== -1 && targetIndex !== undefined) {
    const charToReplace = chars[targetIndex];
    const replacement = ACCENTS[charToReplace]?.[toneKey];
    if (replacement) {
      chars[targetIndex] = replacement;
      return chars.join("");
    }
  }

  return syllable; // Trả về mặc định nếu không thay đổi được
};
const INITIAL_WORDS = [
  "ba",
  "mẹ",
  "bé",
  "bò",
  "cá",
  "cò",
  "cờ",
  "cô",
  "cụ",
  "nhà",
  "ngô",
  "bút",
  "búp",
  "mèo",
  "mía",
  "mũ",
  "mũi",
  "nơ",
  "nón",
  "nặng",
  "túi",
  "vở",
  "vịt",
  "xà",
  "xa",
  "xôi",
  "lan",
  "sơn",
  "biển",
  "trời",
];

// ==========================
// UI PHỤ TRỢ
// ==========================
const Section = ({ title, children }) => (
  <div className="bg-white/80 backdrop-blur rounded-2xl shadow p-4 md:p-6 border border-slate-200">
    <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
      {title}
    </h2>
    {children}
  </div>
);

const Chip = ({ selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-2xl border text-sm md:text-base transition shadow-sm hover:shadow 
      ${
        selected
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
      }`}
  >
    {children}
  </button>
);

const BigButton = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full md:w-auto px-5 py-3 rounded-2xl font-semibold border transition shadow 
      ${
        disabled
          ? "bg-slate-100 text-slate-400 border-slate-200"
          : "bg-emerald-600 text-white border-emerald-700 hover:brightness-110"
      }`}
  >
    {children}
  </button>
);

// ==========================
// APP CHÍNH
// ==========================
export default function SpellingApp() {
  const [tab, setTab] = useState("learn"); // learn | build | quiz

  // FIX 3: Chuyển SAMPLE_WORDS thành state để có thể thêm từ mới một cách an toàn.
  const [wordList, setWordList] = useState(INITIAL_WORDS);

  // Ghép tiếng
  const [initial, setInitial] = useState("");
  const [vowel, setVowel] = useState("a");
  const [finalC, setFinalC] = useState("");
  const [tone, setTone] = useState("ngang");

  const rawSyllable = useMemo(
    () => `${initial}${vowel}${finalC}`,
    [initial, vowel, finalC]
  );
  const finalSyllable = useMemo(
    () => applyTone(rawSyllable, tone),
    [rawSyllable, tone]
  );

  // Bài luyện tập ngẫu nhiên (sử dụng state wordList)
  const makeQuiz = (currentWordList) => {
    const correct =
      currentWordList[Math.floor(Math.random() * currentWordList.length)];
    const opts = new Set([correct]);
    while (opts.size < 4 && opts.size < currentWordList.length) {
      opts.add(
        currentWordList[Math.floor(Math.random() * currentWordList.length)]
      );
    }
    const options = Array.from(opts).sort(() => Math.random() - 0.5);
    return { prompt: `Nghe và chọn tiếng đúng`, correct, options };
  };

  // Quiz
  const [quiz, setQuiz] = useState(() => makeQuiz(wordList)); // Khởi tạo quiz với wordList ban đầu
  const [chosen, setChosen] = useState(null);
  const [result, setResult] = useState(null); // true/false/null

  useEffect(() => {
    speechSynthesis.getVoices();
  }, []);

  const playWord = (w) => speak(w);

  const checkQuiz = (opt) => {
    setChosen(opt);
    const ok = opt === quiz.correct;
    setResult(ok);
    speak(opt);
  };

  const nextQuiz = () => {
    setQuiz(makeQuiz(wordList));
    setChosen(null);
    setResult(null);
  };

  // FIX 3.1: Hàm xử lý lưu từ mới một cách an toàn
  const handleSaveWord = () => {
    if (finalSyllable && !wordList.includes(finalSyllable)) {
      // Tạo mảng mới thay vì sửa mảng cũ
      const newWordList = [...wordList, finalSyllable];
      setWordList(newWordList);
      speak("Đã lưu để luyện tập");
    } else if (wordList.includes(finalSyllable)) {
      speak("Từ này đã có");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 text-slate-800">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3 mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">
              Bé Học Đánh Vần
            </h1>
            <p className="text-slate-600">
              React + Tailwind • Có giọng đọc vi-VN (speechSynthesis)
            </p>
          </div>
          <nav className="flex gap-2">
            {[
              { id: "learn", label: "Học chữ cái" },
              { id: "build", label: "Ghép tiếng" },
              { id: "quiz", label: "Luyện tập" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-2 rounded-xl border transition text-sm md:text-base font-semibold ${
                  tab === t.id
                    ? "bg-indigo-600 text-white border-indigo-700 shadow"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Cột trái/giữa thay đổi theo tab */}
          <div className="lg:col-span-2 space-y-6">
            {tab === "learn" && (
              <Section title="Bước 1: Làm quen chữ cái & phát âm">
                <p className="text-slate-600 mb-4">
                  Nhấn vào từng thẻ để nghe cách đọc. (Giọng máy có thể hơi khác
                  nhau tuỳ trình duyệt)
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                  {BASE_VOWELS.map((ch) => (
                    <motion.button
                      key={ch}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speak(ch)}
                      className="h-14 rounded-2xl bg-white border border-slate-200 shadow hover:shadow-md flex items-center justify-center text-xl font-bold"
                    >
                      {ch}
                    </motion.button>
                  ))}
                </div>
                <p className="text-slate-600 mt-5 mb-2">Âm đầu thường gặp</p>
                <div className="flex flex-wrap gap-2">
                  {INITIALS.map((it) => (
                    <Chip key={it} onClick={() => speak(it)}>
                      {it}
                    </Chip>
                  ))}
                </div>
                <p className="text-slate-600 mt-5 mb-2">Âm cuối thường gặp</p>
                <div className="flex flex-wrap gap-2">
                  {FINALS.filter(Boolean).map((it) => (
                    <Chip key={it} onClick={() => speak(it)}>
                      {it}
                    </Chip>
                  ))}
                </div>
              </Section>
            )}

            {tab === "build" && (
              <Section title="Bước 2: Ghép tiếng & nghe đọc">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <p className="font-semibold">Âm đầu</p>
                    <div className="flex flex-wrap gap-2 max-h-60 overflow-auto pr-1">
                      {INITIALS.map((it) => (
                        <Chip
                          key={it}
                          selected={initial === it}
                          onClick={() => setInitial(it)}
                        >
                          {it || "(trống)"}
                        </Chip>
                      ))}
                      <Chip
                        selected={initial === ""}
                        onClick={() => setInitial("")}
                      >
                        Không có
                      </Chip>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold">Âm chính (nguyên âm)</p>
                    <div className="flex flex-wrap gap-2">
                      {BASE_VOWELS.map((v) => (
                        <Chip
                          key={v}
                          selected={vowel === v}
                          onClick={() => setVowel(v)}
                        >
                          {v}
                        </Chip>
                      ))}
                    </div>
                    <p className="font-semibold mt-3">Dấu thanh</p>
                    <div className="flex flex-wrap gap-2">
                      {TONES.map((t) => (
                        <Chip
                          key={t.key}
                          selected={tone === t.key}
                          onClick={() => setTone(t.key)}
                        >
                          {t.name}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold">Âm cuối</p>
                    <div className="flex flex-wrap gap-2">
                      {FINALS.map((f) => (
                        <Chip
                          key={f || "none"}
                          selected={finalC === f}
                          onClick={() => setFinalC(f)}
                        >
                          {f || "Không có"}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div className="md:col-span-2">
                    <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow">
                      <div>
                        <p className="text-slate-500 text-sm">Tiếng vừa ghép</p>
                        <div className="text-4xl md:text-6xl font-black tracking-wider select-text">
                          {finalSyllable || "_"}
                        </div>
                      </div>
                      <BigButton
                        onClick={() => playWord(finalSyllable)}
                        disabled={!finalSyllable}
                      >
                        Nghe đọc
                      </BigButton>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <BigButton
                      onClick={() => {
                        setInitial("");
                        setVowel("a");
                        setFinalC("");
                        setTone("ngang");
                      }}
                    >
                      Làm lại
                    </BigButton>
                    <button
                      onClick={handleSaveWord} // FIX 3.2: Sử dụng hàm mới
                      className="w-full md:w-auto px-5 py-3 rounded-2xl font-semibold border transition shadow bg-white border-slate-300 hover:bg-slate-50"
                    >
                      Lưu vào mục Luyện tập
                    </button>
                  </div>
                </div>
              </Section>
            )}

            {tab === "quiz" && (
              <Section title="Bước 3: Luyện tập nghe, chọn tiếng đúng">
                <div className="flex items-center gap-3 mb-4">
                  <BigButton onClick={() => speak(quiz.correct)}>
                    Nghe
                  </BigButton>
                  <button
                    onClick={nextQuiz}
                    className="px-4 py-2 rounded-xl border bg-white hover:bg-slate-50"
                  >
                    Đổi câu khác
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quiz.options.map((opt) => {
                    const state =
                      chosen === opt ? (result ? "correct" : "wrong") : null;
                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => checkQuiz(opt)}
                        className={`h-14 rounded-2xl border shadow flex items-center justify-center text-xl font-bold transition ${
                          state === "correct"
                            ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                            : state === "wrong"
                            ? "bg-rose-100 border-rose-300 text-rose-700"
                            : "bg-white border-slate-200 hover:shadow-md"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  {result !== null && (
                    <motion.div
                      key={String(result)}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`mt-4 px-4 py-3 rounded-xl inline-block ${
                        result
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {result
                        ? "Giỏi quá! Con chọn đúng rồi."
                        : "Ôi, chưa đúng. Mình nghe lại nhé!"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Section>
            )}
          </div>

          {/* Cột phải: Gợi ý & Mẹo */}
          <div className="space-y-6">
            <Section title="Gợi ý cho phụ huynh">
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  Hướng dẫn con nhấn vào thẻ để nghe đọc, lặp lại to và rõ.
                </li>
                <li>
                  Chuyển sang tab "Ghép tiếng" để tạo tiếng đơn giản: chọn âm
                  đầu → nguyên âm → dấu → âm cuối.
                </li>
                <li>
                  Nhấn "Lưu vào mục Luyện tập" để thêm tiếng con vừa ghép vào
                  phần luyện nghe.
                </li>
                <li>
                  Mỗi buổi 10–15 phút, xen kẽ học và chơi, khen ngợi kịp thời.
                </li>
              </ul>
            </Section>

            <Section title="Từ gợi ý (bấm để nghe)">
              <div className="flex flex-wrap gap-2">
                {/* FIX 3.3: Hiển thị từ gợi ý từ state wordList */}
                {wordList.slice(0, 24).map((w) => (
                  <Chip key={w} onClick={() => speak(w)}>
                    {w}
                  </Chip>
                ))}
              </div>
            </Section>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Bé Học Đánh Vần • Xây dựng bằng React +
            Tailwind + Framer Motion
          </p>
        </footer>
      </div>
    </div>
  );
}
