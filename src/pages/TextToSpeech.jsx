import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  Settings2,
  Mic,
  Trash2,
  Languages,
  Download,
  Filter,
  User,
  AlertCircle,
  FileAudio,
  Info,
} from "lucide-react";

export default function TextToSpeech() {
  const [text, setText] = useState(
    "Xin chào! Tôi có thể đọc giọng Tiếng Việt và Tiếng Anh. Hãy thử chọn các bộ lọc bên dưới nhé."
  );
  const [allVoices, setAllVoices] = useState([]);
  const [filteredVoices, setFilteredVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Settings
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  // Filters
  const [langFilter, setLangFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

  // Playback State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const synth = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  // Helper: Đoán giới tính qua tên
  const detectGender = (name) => {
    if (!name) return "unknown";
    const lowerName = name.toLowerCase();
    if (
      lowerName.includes("female") ||
      lowerName.includes("woman") ||
      lowerName.includes("girl") ||
      lowerName.includes("zira") ||
      lowerName.includes("samantha") ||
      lowerName.includes("linh") ||
      lowerName.includes("mai")
    )
      return "female";
    if (
      lowerName.includes("male") ||
      lowerName.includes("man") ||
      lowerName.includes("boy") ||
      lowerName.includes("david") ||
      lowerName.includes("mark") ||
      lowerName.includes("an")
    )
      return "male";
    return "unknown";
  };

  // 1. Load Voices
  useEffect(() => {
    if (!synth.current) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = synth.current.getVoices();
      if (!voices || voices.length === 0) return;

      const enhancedVoices = Array.from(voices).map((v) => ({
        name: v.name,
        lang: v.lang,
        voiceURI: v.voiceURI,
        gender: detectGender(v.name),
        rawVoice: v,
      }));

      // Sort
      enhancedVoices.sort((a, b) => {
        const langA = (a.lang || "").toLowerCase();
        const langB = (b.lang || "").toLowerCase();
        if (langA.includes("vi") && !langB.includes("vi")) return -1;
        if (langB.includes("vi") && !langA.includes("vi")) return 1;
        return 0;
      });

      setAllVoices(enhancedVoices);
      setFilteredVoices(enhancedVoices);

      const vnVoice = enhancedVoices.find((v) =>
        (v.lang || "").toLowerCase().includes("vi")
      );
      if (vnVoice) {
        setSelectedVoice(vnVoice);
      } else if (enhancedVoices.length > 0) {
        setSelectedVoice(enhancedVoices[0]);
      }
    };

    loadVoices();
    if (synth.current.onvoiceschanged !== undefined) {
      synth.current.onvoiceschanged = loadVoices;
    }

    return () => synth.current.cancel();
  }, []);

  // 2. Handle Filtering
  useEffect(() => {
    let result = allVoices;
    if (langFilter === "vi")
      result = result.filter((v) =>
        (v.lang || "").toLowerCase().includes("vi")
      );
    else if (langFilter === "en")
      result = result.filter((v) =>
        (v.lang || "").toLowerCase().includes("en")
      );

    if (genderFilter !== "all")
      result = result.filter(
        (v) => v.gender === genderFilter || v.gender === "unknown"
      );

    setFilteredVoices(result);
    if (result.length > 0) {
      const isCurrentInList =
        selectedVoice && result.find((v) => v.name === selectedVoice.name);
      if (!isCurrentInList) setSelectedVoice(result[0]);
    } else {
      setSelectedVoice(null);
    }
  }, [langFilter, genderFilter, allVoices]);

  // --- CORE TTS FUNCTIONS ---

  const createUtterance = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) utterance.voice = selectedVoice.rawVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    return utterance;
  };

  const handlePlay = () => {
    if (isPaused) {
      synth.current.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }
    if (synth.current.speaking) synth.current.cancel();
    if (!text.trim() || !selectedVoice) return;

    const utterance = createUtterance();

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (isRecording) stopRecording(); // Stop recording if it was recording
    };

    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setIsSpeaking(false);
      setIsPaused(false);
      if (isRecording) stopRecording();
    };

    utteranceRef.current = utterance;
    synth.current.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
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
    if (isRecording) stopRecording();
  };

  // --- RECORDING & DOWNLOAD LOGIC ---

  const handleDownload = async () => {
    if (!text.trim()) return;

    // Check support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      alert(
        "Lỗi: Trình duyệt hoặc thiết bị của bạn không hỗ trợ ghi âm Tab (getDisplayMedia). Tính năng này thường không hoạt động trên điện thoại hoặc trong môi trường ẩn danh/sandbox."
      );
      return;
    }

    // 1. Cảnh báo/Hướng dẫn người dùng
    const confirm = window.confirm(
      "HƯỚNG DẪN QUAN TRỌNG:\n\n" +
        "1. Một cửa sổ sẽ hiện ra, hãy chọn tab 'Chrome Tab' (hoặc Tab trình duyệt hiện tại).\n" +
        "2. Chọn đúng tab đang mở ứng dụng này.\n" +
        "3. Tích vào ô 'Also share tab audio' (Chia sẻ âm thanh của tab) ở góc dưới.\n" +
        "4. Nhấn 'Share' để bắt đầu."
    );

    if (!confirm) return;

    try {
      // 2. Yêu cầu luồng âm thanh hệ thống
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
        preferCurrentTab: true,
        selfBrowserSurface: "include", // Gợi ý trình duyệt cho phép ghi tab hiện tại
      });

      // Kiểm tra xem người dùng có cấp quyền audio không
      const audioTrack = stream.getAudioTracks()[0];
      if (!audioTrack) {
        alert(
          "LỖI: Bạn chưa chia sẻ âm thanh!\n\nVui lòng thử lại và nhớ tích vào ô 'Also share tab audio' (Chia sẻ âm thanh tab) trong cửa sổ chọn tab."
        );
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      // 3. Thiết lập MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Tạo file Blob và tải xuống
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const url = URL.createObjectURL(audioBlob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `vocalize_record_${new Date().getTime()}.webm`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          alert("Không thu được dữ liệu âm thanh nào. Vui lòng thử lại.");
        }

        // Dọn dẹp stream
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
      };

      // 4. Bắt đầu quy trình
      setIsRecording(true);
      mediaRecorder.start();

      // Chờ 1 chút để recorder ổn định rồi mới đọc
      setTimeout(() => {
        handlePlay();
      }, 500);
    } catch (err) {
      console.error("Error capturing audio:", err);
      if (err.name === "NotAllowedError") {
        alert("Bạn đã từ chối quyền hoặc hủy thao tác chọn Tab.");
      } else if (err.name === "InvalidStateError") {
        alert(
          "Lỗi trạng thái: Có thể môi trường này chặn tính năng ghi màn hình."
        );
      } else {
        alert(
          "Lỗi không xác định: " +
            err.message +
            "\n\nLưu ý: Tính năng này có thể không hoạt động trong môi trường Code Sandbox."
        );
      }
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleReset = () => {
    setRate(1);
    setPitch(1);
    setVolume(1);
    setLangFilter("all");
    setGenderFilter("all");
    handleStop();
    if (allVoices.length > 0) {
      const vnVoice = allVoices.find((v) =>
        (v.lang || "").toLowerCase().includes("vi")
      );
      setSelectedVoice(vnVoice || allVoices[0]);
    }
  };

  if (!supported)
    return (
      <div className="p-10 text-center text-red-500">
        Trình duyệt không hỗ trợ TTS.
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-indigo-200 shadow-md">
              <Mic size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-800">Vocalize Pro</h1>
          </div>
          <div className="hidden sm:flex gap-3">
            <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-500">
              Browser Native TTS
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Input */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px] lg:h-[650px] transition-all hover:shadow-md">
              <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Languages size={14} /> Văn bản đầu vào
                </span>
                <button
                  onClick={() => setText("")}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                  title="Xóa hết"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                className="flex-1 w-full p-6 text-lg text-slate-700 placeholder-slate-300 resize-none outline-none leading-relaxed"
                placeholder="Nhập nội dung cần đọc..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                spellCheck="false"
              />
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
                <span>{text.split(" ").length} từ</span>
                <span>{text.length} ký tự</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Control Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6 relative overflow-hidden">
              {/* Overlay khi đang ghi âm */}
              {isRecording && (
                <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center animate-pulse">
                    <Mic size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      Đang ghi âm & Tải xuống...
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Vui lòng không đóng tab. File sẽ tự tải xuống khi đọc
                      xong.
                    </p>
                  </div>
                  <button
                    onClick={handleStop}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                  >
                    Dừng & Lưu ngay
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 text-indigo-900 font-semibold border-b border-slate-100 pb-4">
                <Settings2 size={20} className="text-indigo-600" />
                <h2>Tùy chỉnh Giọng đọc</h2>
              </div>

              {/* Filters */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <Filter size={12} /> Bộ lọc
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                      Ngôn ngữ
                    </label>
                    <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                      {[
                        { id: "all", label: "Tất cả" },
                        { id: "vi", label: "VN" },
                        { id: "en", label: "EN" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setLangFilter(opt.id)}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                            langFilter === opt.id
                              ? "bg-indigo-100 text-indigo-700 shadow-sm"
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1.5 block">
                      Giọng
                    </label>
                    <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                      {[
                        { id: "all", label: "Tất cả" },
                        { id: "male", label: "Nam" },
                        { id: "female", label: "Nữ" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setGenderFilter(opt.id)}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                            genderFilter === opt.id
                              ? "bg-purple-100 text-purple-700 shadow-sm"
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selector */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User size={16} className="text-slate-400" />
                  Chọn Người đọc ({filteredVoices.length})
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-3 pr-10 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white shadow-sm"
                    value={selectedVoice ? selectedVoice.name : ""}
                    onChange={(e) => {
                      const voice = filteredVoices.find(
                        (v) => v.name === e.target.value
                      );
                      handleStop();
                      if (voice) setSelectedVoice(voice);
                    }}
                  >
                    {filteredVoices.map((voice, idx) => (
                      <option key={`${voice.name}-${idx}`} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
                {filteredVoices.length === 0 && (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100">
                    Không tìm thấy giọng đọc phù hợp với bộ lọc.
                  </div>
                )}
              </div>

              {/* Sliders */}
              <div className="space-y-5 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">
                      Tốc độ (Speed)
                    </label>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {rate}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-slate-700">
                      Độ cao (Pitch)
                    </label>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {pitch}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2 text-xs text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-1 transition-colors"
              >
                <RotateCcw size={12} /> Thiết lập lại mặc định
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={isSpeaking && !isPaused ? handlePause : handlePlay}
                disabled={!selectedVoice || isRecording}
                className={`col-span-2 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold text-white transition-all active:scale-95 ${
                  isSpeaking && !isPaused
                    ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200"
                    : !selectedVoice
                    ? "bg-slate-300 cursor-not-allowed shadow-none"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                }`}
              >
                {isSpeaking && !isPaused ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
                {isSpeaking && !isPaused ? "Tạm dừng" : "Đọc ngay"}
              </button>

              <button
                onClick={handleStop}
                disabled={!isSpeaking && !isPaused && !isRecording}
                className={`col-span-1 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all ${
                  !isSpeaking && !isPaused && !isRecording
                    ? "text-slate-300"
                    : "text-slate-600"
                }`}
                title="Dừng hẳn"
              >
                <Square size={20} fill="currentColor" />
              </button>

              {/* REAL DOWNLOAD BUTTON */}
              <button
                onClick={handleDownload}
                disabled={!selectedVoice || isRecording}
                className={`col-span-1 border border-slate-200 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                  !selectedVoice || isRecording
                    ? "text-slate-300 bg-slate-50 cursor-not-allowed"
                    : "text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 shadow-sm"
                }`}
                title="Ghi âm & Tải xuống"
              >
                {isRecording ? (
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FileAudio size={20} />
                )}
              </button>
            </div>

            {/* Guide */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-800 font-semibold text-xs">
                <Info size={14} /> Tại sao không tải được?
              </div>
              <div className="text-[11px] text-blue-700 leading-tight space-y-1">
                <p>
                  1. <strong>Trên điện thoại:</strong> Tính năng này KHÔNG hoạt
                  động (iOS/Android chặn ghi âm tab).
                </p>
                <p>
                  2. <strong>Trong khung Preview:</strong> Một số môi trường
                  chặn quyền ghi màn hình vì lý do bảo mật.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
