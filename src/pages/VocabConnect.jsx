import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Trophy,
  RotateCcw,
  Play,
  CheckCircle2,
  HelpCircle,
  Shuffle,
  ChevronRight,
  Award,
  Flame,
  Settings,
  X,
  ArrowLeft,
  Star,
  Info,
  Check,
  AlertCircle,
} from "lucide-react";

const VOCAB_DATA = {
  technology: [
    {
      id: "tech1",
      word: "computer",
      syllables: ["com", "pu", "ter"],
      meaning: "máy tính",
      clue: "Thiết bị điện tử dùng để xử lý dữ liệu và chạy phần mềm.",
    },
    {
      id: "tech2",
      word: "internet",
      syllables: ["in", "ter", "net"],
      meaning: "mạng toàn cầu",
      clue: "Hệ thống thông tin toàn cầu kết nối hàng triệu máy tính.",
    },
    {
      id: "tech3",
      word: "security",
      syllables: ["se", "cu", "ri", "ty"],
      meaning: "bảo mật",
      clue: "Sự an toàn, phòng chống việc truy cập trái phép.",
    },
    {
      id: "tech4",
      word: "program",
      syllables: ["pro", "gram"],
      meaning: "chương trình",
      clue: "Một tập hợp các dòng lệnh để máy tính thực thi.",
    },
    {
      id: "tech5",
      word: "developer",
      syllables: ["de", "vel", "op", "er"],
      meaning: "lập trình viên",
      clue: "Người viết ra mã nguồn để tạo nên phần mềm ứng dụng.",
    },
    {
      id: "tech6",
      word: "database",
      syllables: ["da", "ta", "base"],
      meaning: "cơ sở dữ liệu",
      clue: "Hệ thống lưu trữ thông tin có tổ chức trên máy tính.",
    },
    {
      id: "tech7",
      word: "network",
      syllables: ["net", "work"],
      meaning: "mạng lưới",
      clue: "Sự kết nối giữa nhiều máy tính hoặc thiết bị lại với nhau.",
    },
  ],
  nature: [
    {
      id: "nat1",
      word: "environment",
      syllables: ["en", "vi", "ron", "ment"],
      meaning: "môi trường",
      clue: "Thế giới tự nhiên xung quanh bao gồm không khí, đất, nước.",
    },
    {
      id: "nat2",
      word: "recycle",
      syllables: ["re", "cy", "cle"],
      meaning: "tái chế",
      clue: "Xử lý rác thải để tạo thành nguyên liệu mới hữu ích.",
    },
    {
      id: "nat3",
      word: "pollution",
      syllables: ["pol", "lu", "tion"],
      meaning: "ô nhiễm",
      clue: "Sự xuất hiện của các chất độc hại làm bẩn môi trường.",
    },
    {
      id: "nat4",
      word: "climate",
      syllables: ["cli", "mate"],
      meaning: "khí hậu",
      clue: "Tình trạng thời tiết trung bình ở một khu vực trong nhiều năm.",
    },
    {
      id: "nat5",
      word: "biodiverse",
      syllables: ["bi", "o", "di", "verse"],
      meaning: "đa dạng sinh học",
      clue: "Sự phong phú về các loài sinh vật trong một hệ sinh thái.",
    },
    {
      id: "nat6",
      word: "volcano",
      syllables: ["vol", "ca", "no"],
      meaning: "núi lửa",
      clue: "Ngọn núi có thể phun trào dung nham nóng từ lòng đất.",
    },
    {
      id: "nat7",
      word: "atmosphere",
      syllables: ["at", "mos", "phere"],
      meaning: "bầu khí quyển",
      clue: "Lớp chất khí bao quanh một hành tinh như Trái Đất.",
    },
  ],
  emotions: [
    {
      id: "emo1",
      word: "happiness",
      syllables: ["hap", "pi", "ness"],
      meaning: "hạnh phúc",
      clue: "Cảm giác cực kỳ vui vẻ, mãn nguyện và tràn đầy năng lượng.",
    },
    {
      id: "emo2",
      word: "frustrated",
      syllables: ["frus", "tra", "ted"],
      meaning: "bực bội",
      clue: "Cảm giác bất lực và khó chịu khi không đạt được mục đích.",
    },
    {
      id: "emo3",
      word: "excited",
      syllables: ["ex", "ci", "ted"],
      meaning: "hào hứng",
      clue: "Cảm xúc mong chờ tràn ngập niềm vui về một điều sắp xảy ra.",
    },
    {
      id: "emo4",
      word: "anxious",
      syllables: ["anx", "ious"],
      meaning: "lo âu",
      clue: "Trạng thái bất an, lo lắng về những điều không chắc chắn.",
    },
    {
      id: "emo5",
      word: "confused",
      syllables: ["con", "fused"],
      meaning: "bối rối",
      clue: "Không thể hiểu rõ hoặc suy nghĩ mạch lạc về điều gì đó.",
    },
    {
      id: "emo6",
      word: "gorgeous",
      syllables: ["gor", "geous"],
      meaning: "lộng lẫy",
      clue: "Vẻ đẹp lôi cuốn, lộng lẫy làm say đắm lòng người.",
    },
    {
      id: "emo7",
      word: "optimistic",
      syllables: ["op", "ti", "mis", "tic"],
      meaning: "lạc quan",
      clue: "Luôn nhìn nhận mọi việc theo hướng tích cực, tươi sáng.",
    },
  ],
  lifestyle: [
    {
      id: "life1",
      word: "education",
      syllables: ["ed", "u", "ca", "tion"],
      meaning: "giáo dục",
      clue: "Quá trình học tập và tích lũy tri thức tại trường lớp.",
    },
    {
      id: "life2",
      word: "nutrition",
      syllables: ["nu", "tri", "tion"],
      meaning: "dinh dưỡng",
      clue: "Các dưỡng chất cần thiết cho cơ thể phát triển khỏe mạnh.",
    },
    {
      id: "life3",
      word: "community",
      syllables: ["com", "mu", "ni", "ty"],
      meaning: "cộng đồng",
      clue: "Nhóm người sống chung trong một khu vực hoặc có điểm chung.",
    },
    {
      id: "life4",
      word: "adventure",
      syllables: ["ad", "ven", "ture"],
      meaning: "cuộc phiêu lưu",
      clue: "Một chuyến đi thú vị, đôi khi mạo hiểm vào nơi chưa biết.",
    },
    {
      id: "life5",
      word: "discipline",
      syllables: ["dis", "ci", "pline"],
      meaning: "kỷ luật",
      clue: "Khả năng tự rèn luyện hành vi theo quy tắc đặt ra.",
    },
    {
      id: "life6",
      word: "exercise",
      syllables: ["ex", "er", "cise"],
      meaning: "tập thể dục",
      clue: "Hoạt động thể chất giúp duy trì sức khỏe dẻo dai.",
    },
    {
      id: "life7",
      word: "relationship",
      syllables: ["re", "la", "tion", "ship"],
      meaning: "mối quan hệ",
      clue: "Sự gắn kết, tương tác tình cảm giữa hai hoặc nhiều người.",
    },
  ],
};

const playAudioSynth = (type, enabled) => {
  if (!enabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    switch (type) {
      case "tap":
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      case "success":
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.5, now + 0.24); // C6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        break;
      case "error":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(130, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      case "victory":
        const notes = [
          523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5,
          1318.51,
        ];
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.07);
          noteGain.gain.setValueAtTime(0.08, now + idx * 0.07);
          noteGain.gain.exponentialRampToValueAtTime(
            0.005,
            now + idx * 0.07 + 0.2,
          );
          noteOsc.start(now + idx * 0.07);
          noteOsc.stop(now + idx * 0.07 + 0.25);
        });
        break;
      case "pop":
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      default:
        break;
    }
  } catch (error) {
    console.warn("Sound generation failed:", error);
  }
};

const speakWord = (word, rate = 0.95) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }
};

const ConfettiEffect = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#f43f5e",
      "#ec4899",
      "#8b5cf6",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#f97316",
    ];
    const particles = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

        if (p.y > canvas.height) {
          particles[idx] = {
            ...p,
            x: Math.random() * canvas.width,
            y: -20,
            tilt: Math.random() * 10 - 5,
          };
        }

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};

export default function VocabConnect() {
  const [screen, setScreen] = useState("menu"); // 'menu' | 'playing' | 'leaderboard'
  const [gameMode, setGameMode] = useState("syllable"); // 'syllable' | 'match' | 'wheel'
  const [category, setCategory] = useState("technology"); // 'technology' | 'nature' | 'emotions' | 'lifestyle'

  // Scoring & Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalLearnt, setTotalLearnt] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedWords, setCompletedWords] = useState([]);
  const [showVictory, setShowVictory] = useState(false);

  // Custom states for each game mode
  const [syllableState, setSyllableState] = useState({
    wordIndex: 0,
    selectedSyllables: [],
    shuffledPool: [],
    success: false,
    error: false,
  });

  const [matchState, setMatchState] = useState({
    englishItems: [],
    vietnameseItems: [],
    selectedEnglish: null,
    selectedVietnamese: null,
    matchedIds: new Set(),
    errorId: null,
  });

  const [wheelState, setWheelState] = useState({
    wordIndex: 0,
    letters: [],
    selectedIndices: [],
    success: false,
    error: false,
    shuffledLetters: [],
  });

  // Load Highscores from LocalStorage on mount
  useEffect(() => {
    const savedScore = localStorage.getItem("vocab_score");
    const savedLearnt = localStorage.getItem("vocab_learnt");
    const savedStreak = localStorage.getItem("vocab_best_streak");
    if (savedScore) setScore(parseInt(savedScore));
    if (savedLearnt) setTotalLearnt(parseInt(savedLearnt));
    if (savedStreak) setBestStreak(parseInt(savedStreak));
  }, []);

  // Update stats
  const updateStats = (scoreEarned, wordsCount = 1) => {
    setScore((prev) => {
      const next = prev + scoreEarned;
      localStorage.setItem("vocab_score", next);
      return next;
    });
    setTotalLearnt((prev) => {
      const next = prev + wordsCount;
      localStorage.setItem("vocab_learnt", next);
      return next;
    });
  };

  const initSyllableGame = useCallback((cat, index = 0) => {
    const list = VOCAB_DATA[cat];
    if (!list || list.length === 0) return;

    const wordObj = list[index % list.length];

    // Scramble actual syllables of the target word + add some random syllables as distractors
    const actualSyllables = [...wordObj.syllables];
    const otherWords = list.filter((w) => w.word !== wordObj.word);
    const distractors = [];

    // Add 2-3 distractors from same category
    if (otherWords.length > 0) {
      for (let i = 0; i < 2; i++) {
        const randWord =
          otherWords[Math.floor(Math.random() * otherWords.length)];
        const randSyllable =
          randWord.syllables[
            Math.floor(Math.random() * randWord.syllables.length)
          ];
        distractors.push(randSyllable);
      }
    }

    const combined = [...actualSyllables, ...distractors]
      .map((text, idx) => ({ id: `${text}-${idx}`, text }))
      .sort(() => Math.random() - 0.5);

    setSyllableState({
      wordIndex: index % list.length,
      selectedSyllables: [],
      shuffledPool: combined,
      success: false,
      error: false,
    });
    speakWord(wordObj.word);
  }, []);

  const initMatchGame = useCallback((cat) => {
    const list = VOCAB_DATA[cat];
    if (!list || list.length === 0) return;

    // Pick 5 words randomly or sequentially
    const selected = [...list].sort(() => Math.random() - 0.5).slice(0, 5);

    const englishItems = selected
      .map((item) => ({ id: item.id, word: item.word }))
      .sort(() => Math.random() - 0.5);
    const vietnameseItems = selected
      .map((item) => ({ id: item.id, meaning: item.meaning }))
      .sort(() => Math.random() - 0.5);

    setMatchState({
      englishItems,
      vietnameseItems,
      selectedEnglish: null,
      selectedVietnamese: null,
      matchedIds: new Set(),
      errorId: null,
    });
  }, []);

  const initWheelGame = useCallback((cat, index = 0) => {
    const list = VOCAB_DATA[cat];
    if (!list || list.length === 0) return;

    const wordObj = list[index % list.length];
    const letters = wordObj.word.toUpperCase().split("");

    // Create mapping of original indices with shuffled positions
    const shuffledLetters = letters
      .map((char, index) => ({ char, originalIndex: index }))
      .sort(() => Math.random() - 0.5);

    setWheelState({
      wordIndex: index % list.length,
      letters,
      selectedIndices: [],
      success: false,
      error: false,
      shuffledLetters,
    });
    speakWord(wordObj.word);
  }, []);

  // Launch Game
  const startGame = (mode, cat) => {
    setGameMode(mode);
    setCategory(cat);
    setScreen("playing");
    setShowVictory(false);
    setCompletedWords([]);

    if (mode === "syllable") {
      initSyllableGame(cat, 0);
    } else if (mode === "match") {
      initMatchGame(cat);
    } else if (mode === "wheel") {
      initWheelGame(cat, 0);
    }
  };

  const handleSelectSyllable = (item) => {
    if (syllableState.success || syllableState.error) return;
    playAudioSynth("tap", soundEnabled);

    // If already selected, remove it (and any syllables chosen after it)
    const existsIdx = syllableState.selectedSyllables.findIndex(
      (s) => s.id === item.id,
    );
    if (existsIdx !== -1) {
      setSyllableState((prev) => ({
        ...prev,
        selectedSyllables: prev.selectedSyllables.slice(0, existsIdx),
      }));
      return;
    }

    const currentWords = VOCAB_DATA[category];
    const currentWordObj = currentWords[syllableState.wordIndex];
    const nextSelected = [...syllableState.selectedSyllables, item];

    setSyllableState((prev) => ({
      ...prev,
      selectedSyllables: nextSelected,
    }));

    // Check progress
    const combinedGuess = nextSelected
      .map((s) => s.text)
      .join("")
      .toLowerCase();

    if (combinedGuess === currentWordObj.word.toLowerCase()) {
      // SUCCESS
      playAudioSynth("success", soundEnabled);
      speakWord(currentWordObj.word);
      setSyllableState((prev) => ({ ...prev, success: true }));
      setStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) {
          setBestStreak(next);
          localStorage.setItem("vocab_best_streak", next);
        }
        return next;
      });

      // Track as completed in this round
      setCompletedWords((prev) => [...prev, currentWordObj]);
      updateStats(15, 1);

      // Advance after a brief delay
      setTimeout(() => {
        const nextIdx = syllableState.wordIndex + 1;
        if (nextIdx >= currentWords.length) {
          playAudioSynth("victory", soundEnabled);
          setShowVictory(true);
        } else {
          initSyllableGame(category, nextIdx);
        }
      }, 1600);
    } else if (combinedGuess.length >= currentWordObj.word.length) {
      // WRONG GUESS (Reached or exceeded length of target word)
      playAudioSynth("error", soundEnabled);
      setSyllableState((prev) => ({ ...prev, error: true }));
      setStreak(0);

      // Shake animation reset
      setTimeout(() => {
        setSyllableState((prev) => ({
          ...prev,
          selectedSyllables: [],
          error: false,
        }));
      }, 1000);
    }
  };

  const handleMatchSelect = (id, type) => {
    if (matchState.errorId) return; // Wait for error state clearance
    playAudioSynth("tap", soundEnabled);

    let nextEng = matchState.selectedEnglish;
    let nextVie = matchState.selectedVietnamese;

    if (type === "english") {
      nextEng = matchState.selectedEnglish === id ? null : id;
    } else {
      nextVie = matchState.selectedVietnamese === id ? null : id;
    }

    setMatchState((prev) => ({
      ...prev,
      selectedEnglish: nextEng,
      selectedVietnamese: nextVie,
    }));

    if (nextEng && nextVie) {
      if (nextEng === nextVie) {
        // MATCH DETECTED
        const matchedObj = VOCAB_DATA[category].find(
          (item) => item.id === nextEng,
        );
        if (matchedObj) {
          speakWord(matchedObj.word);
          setCompletedWords((prev) => [...prev, matchedObj]);
        }
        playAudioSynth("success", soundEnabled);

        const nextMatched = new Set(matchState.matchedIds);
        nextMatched.add(nextEng);

        setMatchState((prev) => ({
          ...prev,
          matchedIds: nextMatched,
          selectedEnglish: null,
          selectedVietnamese: null,
        }));

        setStreak((prev) => {
          const next = prev + 1;
          if (next > bestStreak) {
            setBestStreak(next);
            localStorage.setItem("vocab_best_streak", next);
          }
          return next;
        });
        updateStats(10, 1);

        // Check level completion
        if (nextMatched.size === matchState.englishItems.length) {
          setTimeout(() => {
            playAudioSynth("victory", soundEnabled);
            setShowVictory(true);
          }, 1000);
        }
      } else {
        // MISMATCH
        playAudioSynth("error", soundEnabled);
        setStreak(0);
        setMatchState((prev) => ({
          ...prev,
          errorId: { eng: nextEng, vie: nextVie },
        }));

        setTimeout(() => {
          setMatchState((prev) => ({
            ...prev,
            selectedEnglish: null,
            selectedVietnamese: null,
            errorId: null,
          }));
        }, 1000);
      }
    }
  };

  const handleWheelLetterSelect = (item, index) => {
    if (wheelState.success || wheelState.error) return;
    playAudioSynth("pop", soundEnabled);

    // If letter is already tapped in current construction path
    const alreadySelectedIdx = wheelState.selectedIndices.indexOf(index);
    if (alreadySelectedIdx !== -1) {
      // Undo back to this tap position
      setWheelState((prev) => ({
        ...prev,
        selectedIndices: prev.selectedIndices.slice(0, alreadySelectedIdx),
      }));
      return;
    }

    const currentWords = VOCAB_DATA[category];
    const targetWordObj = currentWords[wheelState.wordIndex];
    const targetWord = targetWordObj.word.toUpperCase();

    const nextSelected = [...wheelState.selectedIndices, index];
    const currentGuess = nextSelected
      .map((idx) => wheelState.shuffledLetters[idx].char)
      .join("");

    setWheelState((prev) => ({
      ...prev,
      selectedIndices: nextSelected,
    }));

    // If constructed guess size equals the target word
    if (currentGuess.length === targetWord.length) {
      if (currentGuess === targetWord) {
        // CORRECT MATCH
        playAudioSynth("success", soundEnabled);
        speakWord(targetWordObj.word);
        setWheelState((prev) => ({ ...prev, success: true }));
        setCompletedWords((prev) => [...prev, targetWordObj]);
        setStreak((prev) => {
          const next = prev + 1;
          if (next > bestStreak) {
            setBestStreak(next);
            localStorage.setItem("vocab_best_streak", next);
          }
          return next;
        });
        updateStats(20, 1);

        setTimeout(() => {
          const nextIdx = wheelState.wordIndex + 1;
          if (nextIdx >= currentWords.length) {
            playAudioSynth("victory", soundEnabled);
            setShowVictory(true);
          } else {
            initWheelGame(category, nextIdx);
          }
        }, 1600);
      } else {
        // INCORRECT
        playAudioSynth("error", soundEnabled);
        setStreak(0);
        setWheelState((prev) => ({ ...prev, error: true }));

        setTimeout(() => {
          setWheelState((prev) => ({
            ...prev,
            selectedIndices: [],
            error: false,
          }));
        }, 1200);
      }
    }
  };

  const handleShuffleWheel = () => {
    playAudioSynth("tap", soundEnabled);
    setWheelState((prev) => ({
      ...prev,
      shuffledLetters: [...prev.shuffledLetters].sort(
        () => Math.random() - 0.5,
      ),
      selectedIndices: [],
    }));
  };

  // Helper values for rendering active elements
  const currentSyllableWord = useMemo(() => {
    return VOCAB_DATA[category]?.[syllableState.wordIndex];
  }, [category, syllableState.wordIndex]);

  const currentWheelWord = useMemo(() => {
    return VOCAB_DATA[category]?.[wheelState.wordIndex];
  }, [category, wheelState.wordIndex]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-violet-500 selection:text-white overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[20%] -left-32 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] -right-32 w-96 h-96 bg-teal-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setScreen("menu")}
              className="cursor-pointer p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-all flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setScreen("menu")}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <BookOpen className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent hidden sm:inline-block">
                VocabConnect
              </span>
            </div>
          </div>

          {/* Player Stats HUD */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden xs:inline-block">
                Điểm:
              </span>
              <span className="font-bold tabular-nums text-sm">{score}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Flame className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden xs:inline-block">
                Chuỗi:
              </span>
              <span className="font-bold tabular-nums text-sm">{streak}</span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5 text-rose-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Confetti Container */}
      <ConfettiEffect active={showVictory} />

      {/* Main Container */}
      <main className="flex-1 flex flex-col max-w-6xl w-full mx-auto p-4 relative z-10">
        {/* ================= SCREEN 1: MAIN MENU ================= */}
        {screen === "menu" && (
          <div className="flex-1 flex flex-col justify-center py-6">
            {/* Hero Banner Section */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium mb-4 animate-bounce">
                <Sparkles className="w-3.5 h-3.5" /> Chinh phục Anh ngữ dễ dàng
                & thú vị
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Học Từ Vựng Bằng Game Nối Từ
              </h1>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                Tăng phản xạ từ vựng, rèn cấu trúc âm tiết và ghi nhớ sâu qua
                các mini-game đa giác quan, hỗ trợ âm thanh cùng phát âm bản
                ngữ.
              </p>
            </div>

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full mb-12">
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Từ Đã Học
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-2">
                  {totalLearnt}{" "}
                  <span className="text-xs text-slate-400 font-normal">từ</span>
                </span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Tổng Điểm Tích Lũy
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">
                  {score}{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    pts
                  </span>
                </span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl flex flex-col justify-between col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Kỷ Lục Chuỗi
                </span>
                <div className="flex items-center gap-1.5 mt-2">
                  <Flame className="w-6 h-6 text-rose-500" />
                  <span className="text-2xl sm:text-3xl font-extrabold text-rose-400">
                    {bestStreak}{" "}
                    <span className="text-xs text-slate-400 font-normal">
                      chuỗi
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Topic Select & Game Modes */}
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-500 rounded-full" />
                Chọn Chủ Đề Học Tập
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    id: "technology",
                    label: "Công Nghệ",
                    desc: "Computer, Internet, Database...",
                    icon: "💻",
                    color:
                      "from-blue-600/20 to-indigo-600/20 border-blue-500/30 text-blue-400",
                  },
                  {
                    id: "nature",
                    label: "Môi Trường",
                    desc: "Climate, Pollution, Atmosphere...",
                    icon: "🌱",
                    color:
                      "from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-400",
                  },
                  {
                    id: "emotions",
                    label: "Cảm Xúc",
                    desc: "Happiness, Excited, Anxious...",
                    icon: "🎭",
                    color:
                      "from-rose-600/20 to-pink-600/20 border-rose-500/30 text-rose-400",
                  },
                  {
                    id: "lifestyle",
                    label: "Lối Sống",
                    desc: "Education, Nutrition, Adventure...",
                    icon: "🚲",
                    color:
                      "from-amber-600/20 to-orange-600/20 border-amber-500/30 text-amber-400",
                  },
                ].map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      playAudioSynth("tap", soundEnabled);
                      setCategory(topic.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      category === topic.id
                        ? `bg-gradient-to-tr ${topic.color} ring-2 ring-indigo-500/50 scale-[1.02]`
                        : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {topic.icon}
                    </div>
                    <h3 className="font-bold text-white text-base mb-1">
                      {topic.label}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {topic.desc}
                    </p>
                    {category === topic.id && (
                      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Modes Selection Card */}
            <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-500 rounded-full" />
                Chọn Chế Độ Chơi & Bắt Đầu
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* MODE 1: SYLLABLE LINK */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 hover:border-indigo-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all group hover:bg-slate-900/60">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Syllable Link
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Kết nối các mảnh âm tiết bay tự do thành từ có nghĩa dựa
                      theo gợi ý. Giúp ghi nhớ mặt chữ cực lâu.
                    </p>
                  </div>
                  <button
                    onClick={() => startGame("syllable", category)}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-indigo-600/30"
                  >
                    Chơi Ngay <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* MODE 2: MATCH MAKER */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 hover:border-emerald-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all group hover:bg-slate-900/60">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Match Maker
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Nối từ vựng Anh - Việt chính xác trong thời gian ngắn
                      nhất. Rèn phản xạ dịch nghĩa nhanh nhạy.
                    </p>
                  </div>
                  <button
                    onClick={() => startGame("match", category)}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-600/30"
                  >
                    Chơi Ngay <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* MODE 3: WORD WHEEL */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 hover:border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all group hover:bg-slate-900/60">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400 group-hover:scale-110 transition-transform">
                      <Shuffle className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Word Wheel
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Xoay tròn các chữ cái ngẫu nhiên và nối chúng để tạo từ
                      vựng hoàn chỉnh theo định nghĩa mở rộng.
                    </p>
                  </div>
                  <button
                    onClick={() => startGame("wheel", category)}
                    className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-amber-600/30"
                  >
                    Chơi Ngay <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCREEN 2: IN-GAME SCREENS ================= */}
        {screen === "playing" && (
          <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto py-4">
            {/* Game Mode Sub-Header Info */}
            <div className="flex items-center justify-between mb-6 bg-slate-900/40 border border-slate-800/80 px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-md bg-indigo-600 text-indigo-100">
                  {gameMode === "syllable"
                    ? "Syllable Link"
                    : gameMode === "match"
                      ? "Match Maker"
                      : "Word Wheel"}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-sm text-slate-300 font-medium capitalize flex items-center gap-1.5">
                  Chủ đề:{" "}
                  {category === "technology"
                    ? "Công nghệ 💻"
                    : category === "nature"
                      ? "Môi trường 🌱"
                      : category === "emotions"
                        ? "Cảm xúc 🎭"
                        : "Lối sống 🚲"}
                </span>
              </div>
              <div className="text-sm text-slate-400">
                {gameMode !== "match" && (
                  <span>
                    Tiến trình:{" "}
                    <strong className="text-white">
                      {(gameMode === "syllable"
                        ? syllableState.wordIndex
                        : wheelState.wordIndex) + 1}
                    </strong>{" "}
                    / {VOCAB_DATA[category]?.length}
                  </span>
                )}
                {gameMode === "match" && (
                  <span>
                    Đã ghép:{" "}
                    <strong className="text-white">
                      {matchState.matchedIds.size}
                    </strong>{" "}
                    / {matchState.englishItems.length}
                  </span>
                )}
              </div>
            </div>

            {/* ================= GAMEPLAY AREA ================= */}
            <div className="flex-1 flex flex-col justify-center">
              {/* MODE 1: SYLLABLE LINK PLAYING */}
              {gameMode === "syllable" && currentSyllableWord && (
                <div className="space-y-8 max-w-2xl mx-auto w-full">
                  {/* Definition & Clue Card */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-center shadow-xl relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => {
                          playAudioSynth("tap", soundEnabled);
                          speakWord(currentSyllableWord.word);
                        }}
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="Nghe phát âm từ này"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block mb-2">
                      Định nghĩa nghĩa Việt
                    </span>
                    <h3 className="text-2xl font-black text-white leading-normal mb-3">
                      {currentSyllableWord.meaning}
                    </h3>
                    <p className="text-sm text-slate-400 max-w-lg mx-auto flex items-center justify-center gap-1.5">
                      <Info className="w-4 h-4 text-indigo-500 shrink-0" />
                      {currentSyllableWord.clue}
                    </p>
                  </div>

                  {/* Guessing Showcase slots */}
                  <div className="space-y-3">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block text-center">
                      Mảnh từ ghép được
                    </span>
                    <div
                      className={`min-h-[70px] flex flex-wrap justify-center items-center gap-3 p-4 rounded-2xl bg-slate-950 border-2 border-dashed transition-all ${
                        syllableState.success
                          ? "border-emerald-500/50 bg-emerald-950/10"
                          : syllableState.error
                            ? "border-rose-500/50 bg-rose-950/10 animate-shake"
                            : "border-slate-800"
                      }`}
                    >
                      {syllableState.selectedSyllables.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">
                          Chọn các âm tiết bên dưới để tạo từ đúng...
                        </p>
                      ) : (
                        syllableState.selectedSyllables.map((item, index) => (
                          <button
                            key={`selected-${item.id}`}
                            onClick={() => handleSelectSyllable(item)}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-extrabold text-lg shadow-md hover:from-indigo-600 hover:to-violet-700 transition-all flex items-center gap-2 group transform active:scale-95"
                          >
                            {item.text}
                            <X className="w-4 h-4 text-indigo-200 group-hover:text-white" />
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Shuffled pool selection */}
                  <div className="space-y-4">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block text-center">
                      Bấm âm tiết để nối
                    </span>
                    <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                      {syllableState.shuffledPool.map((item) => {
                        const isSelected = syllableState.selectedSyllables.some(
                          (s) => s.id === item.id,
                        );
                        return (
                          <button
                            key={`pool-${item.id}`}
                            disabled={isSelected}
                            onClick={() => handleSelectSyllable(item)}
                            className={`px-6 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${
                              isSelected
                                ? "bg-slate-900 border border-slate-800 text-slate-700 cursor-not-allowed opacity-30"
                                : "bg-slate-900 hover:bg-slate-800 border-2 border-slate-800 text-slate-200 hover:border-indigo-500 hover:text-white shadow-lg hover:shadow-indigo-500/10"
                            }`}
                          >
                            {item.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Skip and Clear utility buttons */}
                  <div className="flex justify-center items-center gap-3 pt-4">
                    <button
                      onClick={() => {
                        playAudioSynth("tap", soundEnabled);
                        setSyllableState((prev) => ({
                          ...prev,
                          selectedSyllables: [],
                        }));
                      }}
                      className="py-2.5 px-5 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 text-sm font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                    <button
                      onClick={() => {
                        playAudioSynth("tap", soundEnabled);
                        const list = VOCAB_DATA[category];
                        const nextIdx =
                          (syllableState.wordIndex + 1) % list.length;
                        initSyllableGame(category, nextIdx);
                      }}
                      className="py-2.5 px-5 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 text-sm font-semibold transition-colors flex items-center gap-1.5"
                    >
                      Bỏ Qua <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 2: MATCH MAKER PLAYING */}
              {gameMode === "match" && (
                <div className="space-y-6 max-w-3xl mx-auto w-full">
                  <div className="text-center mb-4">
                    <p className="text-sm text-slate-400">
                      Chọn 1 từ tiếng Anh bên trái, sau đó chọn nghĩa tiếng Việt
                      phù hợp bên phải để ghép nối.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* English words column */}
                    <div className="space-y-3">
                      <h4 className="text-xs text-indigo-400 font-extrabold uppercase tracking-widest text-center md:text-left mb-2">
                        Từ Tiếng Anh
                      </h4>
                      {matchState.englishItems.map((item) => {
                        const isMatched = matchState.matchedIds.has(item.id);
                        const isSelected =
                          matchState.selectedEnglish === item.id;
                        const isErr = matchState.errorId?.eng === item.id;

                        return (
                          <button
                            key={`match-eng-${item.id}`}
                            disabled={isMatched}
                            onClick={() =>
                              handleMatchSelect(item.id, "english")
                            }
                            className={`w-full p-4 rounded-2xl font-bold text-left border-2 transition-all flex items-center justify-between group ${
                              isMatched
                                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-500 cursor-not-allowed"
                                : isErr
                                  ? "bg-rose-950/20 border-rose-500/50 text-rose-500 animate-shake"
                                  : isSelected
                                    ? "bg-indigo-600/20 border-indigo-500 text-white ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/10"
                                    : "bg-slate-900 hover:bg-slate-800/80 border-slate-800/80 text-slate-200 hover:border-slate-700"
                            }`}
                          >
                            <span className="truncate">{item.word}</span>
                            <div className="flex items-center gap-1.5">
                              {isMatched ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakWord(item.word);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Vietnamese meanings column */}
                    <div className="space-y-3">
                      <h4 className="text-xs text-teal-400 font-extrabold uppercase tracking-widest text-center md:text-left mb-2">
                        Nghĩa Tiếng Việt
                      </h4>
                      {matchState.vietnameseItems.map((item) => {
                        const isMatched = matchState.matchedIds.has(item.id);
                        const isSelected =
                          matchState.selectedVietnamese === item.id;
                        const isErr = matchState.errorId?.vie === item.id;

                        return (
                          <button
                            key={`match-vie-${item.id}`}
                            disabled={isMatched}
                            onClick={() =>
                              handleMatchSelect(item.id, "vietnamese")
                            }
                            className={`w-full p-4 rounded-2xl font-bold text-left border-2 transition-all flex items-center justify-between ${
                              isMatched
                                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-500 cursor-not-allowed"
                                : isErr
                                  ? "bg-rose-950/20 border-rose-500/50 text-rose-500 animate-shake"
                                  : isSelected
                                    ? "bg-teal-600/20 border-teal-500 text-white ring-2 ring-teal-500/40 shadow-lg shadow-teal-500/10"
                                    : "bg-slate-900 hover:bg-slate-800/80 border-slate-800/80 text-slate-200 hover:border-slate-700"
                            }`}
                          >
                            <span className="truncate">{item.meaning}</span>
                            {isMatched && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reset/Reshuffle Match Game */}
                  <div className="flex justify-center pt-6">
                    <button
                      onClick={() => {
                        playAudioSynth("tap", soundEnabled);
                        initMatchGame(category);
                      }}
                      className="py-2.5 px-6 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 text-sm font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" /> Làm mới danh sách
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 3: WORD WHEEL PLAYING */}
              {gameMode === "wheel" && currentWheelWord && (
                <div className="space-y-8 max-w-2xl mx-auto w-full">
                  {/* Definition box */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-center shadow-xl relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => {
                          playAudioSynth("tap", soundEnabled);
                          speakWord(currentWheelWord.word);
                        }}
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-amber-400 hover:text-amber-300 transition-colors"
                        title="Nghe phát âm từ này"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-2">
                      Khái niệm tiếng Việt
                    </span>
                    <h3 className="text-2xl font-black text-white leading-normal mb-3">
                      {currentWheelWord.meaning}
                    </h3>
                    <p className="text-sm text-slate-400 max-w-lg mx-auto flex items-center justify-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-500 shrink-0" />
                      {currentWheelWord.clue}
                    </p>
                  </div>

                  {/* Answer placeholders slots */}
                  <div className="flex justify-center gap-2">
                    {currentWheelWord.word.split("").map((char, index) => {
                      const selectedChar =
                        wheelState.selectedIndices[index] !== undefined
                          ? wheelState.shuffledLetters[
                              wheelState.selectedIndices[index]
                            ].char
                          : null;

                      return (
                        <div
                          key={`slot-${index}`}
                          className={`w-12 h-14 rounded-xl border-2 font-black text-2xl flex items-center justify-center uppercase transition-all ${
                            wheelState.success
                              ? "bg-emerald-950/20 border-emerald-500 text-emerald-400"
                              : wheelState.error
                                ? "bg-rose-950/20 border-rose-500 text-rose-400 animate-shake"
                                : selectedChar
                                  ? "bg-slate-800 border-indigo-500 text-white"
                                  : "bg-slate-950 border-slate-800 text-transparent"
                          }`}
                        >
                          {selectedChar || ""}
                        </div>
                      );
                    })}
                  </div>

                  {/* Circular Interactive Word Wheel utilizing SVG */}
                  <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
                    {/* Connecting lines between selected letters on the wheel */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      {wheelState.selectedIndices.map((idx, index) => {
                        if (index === 0) return null;
                        const prevIdx = wheelState.selectedIndices[index - 1];

                        // Calculate positions based on index
                        const len = wheelState.shuffledLetters.length;
                        const anglePrev =
                          (prevIdx * 2 * Math.PI) / len - Math.PI / 2;
                        const angleCurr =
                          (idx * 2 * Math.PI) / len - Math.PI / 2;

                        const cx = 144,
                          cy = 144,
                          r = 100;
                        const x1 = cx + r * Math.cos(anglePrev);
                        const y1 = cy + r * Math.sin(anglePrev);
                        const x2 = cx + r * Math.cos(angleCurr);
                        const y2 = cy + r * Math.sin(angleCurr);

                        return (
                          <line
                            key={`line-${index}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#6366f1"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="animate-pulse"
                          />
                        );
                      })}
                    </svg>

                    {/* Wheel Center Button (Reset / Shuffle inside) */}
                    <div className="absolute w-20 h-20 bg-slate-950 border-2 border-slate-800 rounded-full flex items-center justify-center shadow-inner z-20">
                      <button
                        onClick={handleShuffleWheel}
                        className="p-3 rounded-full hover:bg-slate-900 text-indigo-400 hover:text-white transition-colors"
                        title="Xáo trộn vị trí"
                      >
                        <Shuffle className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Surrounding Alphabet Nodes */}
                    {wheelState.shuffledLetters.map((item, index) => {
                      const len = wheelState.shuffledLetters.length;
                      const angle = (index * 2 * Math.PI) / len - Math.PI / 2; // Offset by -90deg to start top
                      const cx = 144,
                        cy = 144,
                        r = 100;

                      const x = cx + r * Math.cos(angle);
                      const y = cy + r * Math.sin(angle);

                      const order = wheelState.selectedIndices.indexOf(index);
                      const isSelected = order !== -1;

                      return (
                        <button
                          key={`wheel-char-${index}`}
                          style={{
                            left: `${x - 24}px`,
                            top: `${y - 24}px`,
                          }}
                          onClick={() => handleWheelLetterSelect(item, index)}
                          className={`absolute w-12 h-12 rounded-full font-black text-xl flex items-center justify-center transition-all shadow-md z-20 ${
                            isSelected
                              ? "bg-gradient-to-tr from-indigo-500 to-violet-600 border-2 border-indigo-400 text-white scale-110"
                              : "bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white"
                          }`}
                        >
                          {item.char}
                          {isSelected && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-900 text-[10px] border border-indigo-400 font-bold flex items-center justify-center">
                              {order + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Reset/Cancel Word Building */}
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        playAudioSynth("tap", soundEnabled);
                        setWheelState((prev) => ({
                          ...prev,
                          selectedIndices: [],
                        }));
                      }}
                      className="py-2 px-4 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      Xóa Từ Đã Chọn
                    </button>
                    <button
                      onClick={() => {
                        playAudioSynth("tap", soundEnabled);
                        const list = VOCAB_DATA[category];
                        const nextIdx =
                          (wheelState.wordIndex + 1) % list.length;
                        initWheelGame(category, nextIdx);
                      }}
                      className="py-2 px-4 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      Bỏ Qua
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: VICTORY SCREEN ================= */}
      {showVictory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800/80 p-8 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-2xl">
            {/* Visual shine inside modal */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-indigo-500/10 rounded-full filter blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full filter blur-xl pointer-events-none" />

            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-6">
              <Award className="w-10 h-10 text-slate-950" />
            </div>

            <h3 className="text-3xl font-black text-white mb-2">Tuyệt Vời!</h3>
            <p className="text-slate-400 text-sm mb-6">
              Bạn đã hoàn thành xuất sắc thử thách từ vựng cấp độ này!
            </p>

            {/* Score Showcase */}
            <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-950 p-4 rounded-2xl">
              <div>
                <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider">
                  Điểm Thưởng
                </span>
                <span className="text-2xl font-black text-amber-400 mt-1">
                  +
                  {gameMode === "syllable"
                    ? completedWords.length * 15
                    : gameMode === "match"
                      ? 50
                      : completedWords.length * 20}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider">
                  Từ Hoàn Thành
                </span>
                <span className="text-2xl font-black text-indigo-400 mt-1">
                  {completedWords.length} từ
                </span>
              </div>
            </div>

            {/* Vocabulary Review List */}
            <div className="space-y-3 mb-8 text-left max-h-48 overflow-y-auto pr-1">
              <h4 className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                Xem lại từ vựng:
              </h4>
              {completedWords.map((item, idx) => (
                <div
                  key={`review-${idx}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
                >
                  <div>
                    <span className="font-bold text-slate-200 capitalize text-sm">
                      {item.word}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {item.meaning}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      playAudioSynth("tap", soundEnabled);
                      speakWord(item.word);
                    }}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800/80"
                  >
                    <Volume2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  playAudioSynth("tap", soundEnabled);
                  setScreen("menu");
                  setShowVictory(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-extrabold text-sm transition-all shadow-md"
              >
                Trở Về Trang Chủ
              </button>
              <button
                onClick={() => {
                  playAudioSynth("tap", soundEnabled);
                  startGame(gameMode, category);
                }}
                className="w-full py-3 px-4 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white font-bold text-sm transition-all"
              >
                Chơi Lại Vòng Này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styled Head Injection for Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
