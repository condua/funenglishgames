// src/pages/Home.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const GAMES = [
  {
    key: "vocabulary",
    title: "Vocabulary Game",
    path: "/vocabulary-game",
    emoji: "🧠",
    skills: ["Vocabulary"],
    blurb: "Ôn từ vựng qua minigame nhanh và vui.",
  },
  {
    key: "scramble",
    title: "Sentence Scramble",
    path: "/game2",
    emoji: "🧩",
    skills: ["Grammar", "Sentence"],
    blurb: "Xếp lại trật tự câu chính xác.",
  },
  {
    key: "listening",
    title: "Listening Game",
    path: "/listening-game",
    emoji: "🎧",
    skills: ["Listening"],
    blurb: "Nghe – hiểu – chọn đáp án đúng.",
  },
  {
    key: "typing",
    title: "Typing Game",
    path: "/typing-game",
    emoji: "⌨️",
    skills: ["Spelling", "Typing"],
    blurb: "Đua tốc độ gõ và chính tả.",
  },
  {
    key: "grammar",
    title: "Grammar Game",
    path: "/grammar-game",
    emoji: "📘",
    skills: ["Grammar"],
    blurb: "Luyện ngữ pháp qua câu hỏi tương tác.",
  },
  {
    key: "culture-crosswalk",
    title: "Culture Crosswalk",
    path: "/culture-crosswalk-game",
    emoji: "🌍",
    skills: ["Sentece"],
    blurb: "Học giao tiếp tiếng Anh qua tình huống thực tế.",
  },
  {
    key: "matching",
    title: "Matching Game",
    path: "/matching-game",
    emoji: "🃏",
    skills: ["Vocabulary", "Memory"],
    blurb: "Ghép cặp từ và nghĩa, rèn trí nhớ.",
  },
  {
    key: "wordfall",
    title: "Wordfall",
    path: "/wordfall-game",
    emoji: "🌧️",
    skills: ["Spelling", "Reflex"],
    blurb: "Bắt chữ rơi – luyện phản xạ ngôn ngữ.",
  },
  {
    key: "galaxy",
    title: "Galaxy Grammar",
    path: "/galaxy-grammar-game",
    emoji: "🪐",
    skills: ["Grammar", "Sentence"],
    blurb: "Chinh phục ngữ pháp giữa dải ngân hà.",
  },
  {
    key: "detective",
    title: "Detective Game",
    path: "/detective-game",
    emoji: "🕵️",
    skills: ["Reading", "Logic"],
    blurb: "Suy luận từ manh mối ngôn ngữ.",
  },
  {
    key: "sprint",
    title: "English Word Sprint",
    path: "/english-word-sprint",
    emoji: "🏃",
    skills: ["Vocabulary", "Listening"],
    blurb: "60 giây bứt tốc vốn từ.",
  },
  {
    key: "millionaire",
    title: "Millionaire Game",
    path: "/millionaire-game",
    emoji: "💰",
    skills: ["Mixed"],
    blurb: "Ai là Triệu Phú – phiên bản học tiếng Anh.",
  },
  {
    key: "architect",
    title: "Sentence Architect",
    path: "/sentence-architect-game",
    emoji: "🏗️",
    skills: ["Grammar", "Sentence"],
    blurb: "Kéo – thả block để xây câu đúng chuẩn.",
  },
];

const SKILL_TAGS = [
  "All",
  "Vocabulary",
  "Grammar",
  "Sentence",
  "Listening",
  "Spelling",
  "Typing",
  "Reading",
  "Memory",
  "Reflex",
  "Logic",
  "Mixed",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GAMES.filter((g) => {
      const okSkill = skill === "All" || g.skills.includes(skill);
      const okQuery =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.blurb.toLowerCase().includes(q) ||
        g.skills.join(" ").toLowerCase().includes(q);
      return okSkill && okQuery;
    });
  }, [query, skill]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header / Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/20 via-indigo-600/10 to-slate-950 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            English Learning <span className="text-cyan-400">Games Hub</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-3 text-slate-300 max-w-2xl"
          >
            Chọn một trò chơi để luyện từ vựng, ngữ pháp, nghe – nói – đọc –
            viết. Mọi thứ đều tương tác và siêu vui!
          </motion.p>

          {/* Search + Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm game theo tên, kỹ năng…"
                className="w-full rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="rounded-xl bg-slate-800/60 border border-slate-700 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {SKILL_TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Cards Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filtered.map((g) => (
              <motion.div
                key={g.key}
                variants={item}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-5"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-4xl">{g.emoji}</div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {g.skills.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-3 text-xl font-bold">{g.title}</h3>
                  <p className="mt-1 text-slate-400 text-sm">{g.blurb}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={g.path}
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 text-slate-900 font-semibold px-4 py-2 transition-transform active:scale-95"
                    >
                      Play
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </Link>

                    <motion.div
                      aria-hidden
                      initial={{ rotate: -2, scale: 1 }}
                      whileHover={{ rotate: 0, scale: 1.03 }}
                      className="text-xs text-slate-500"
                    >
                      {g.path}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-slate-400">
            Không tìm thấy game phù hợp. Thử từ khóa khác hoặc đổi bộ lọc.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} MLPA English Games.</span>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-slate-300">
              Home
            </Link>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
            >
              React
            </a>
            <a
              href="https://www.framer.com/motion/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300"
            >
              Framer Motion
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
