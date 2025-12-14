import React, { useEffect, useRef, useState } from "react";
import { Loader2, Heart, Unlock, Sparkles } from "lucide-react";

const MagicLoveCameraCanvas = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [streamActive, setStreamActive] = useState(false);
  const [handState, setHandState] = useState("none"); // 'none' | 'closed' | 'open'
  const [error, setError] = useState("");

  // --- CẤU HÌNH ---
  const NEON_COLORS = ["#00FFFF", "#FF00FF", "#FFFFFF", "#FFFF00", "#00FF00"];
  const [text_Message, setText_Message] = useState("I Love You");
  const MP_VERSION = "0.4.1646424915";

  // --- HỆ THỐNG HẠT CLASSIC ---
  class Particle {
    constructor(targetX, targetY, w, h) {
      this.targetX = targetX;
      this.targetY = targetY;
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = (Math.random() - 0.5) * 3;
      this.size = Math.random() * 2 + 1;
      this.color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
      this.friction = 0.95;
      this.ease = 0.12;
    }

    update(assembled, w, h) {
      if (assembled) {
        // Chế độ ghép chữ: Bay về đích
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.x += dx * this.ease;
        this.y += dy * this.ease;
      } else {
        // Chế độ tự do: Bay lượn
        this.x += this.vx;
        this.y += this.vy;

        // Nảy khi chạm cạnh màn hình
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- HÀM VẼ SAO NỀN ---
  const drawBackgroundStars = (ctx, w, h) => {
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const size = Math.random() * 1.5;
      const opacity = Math.random() * 0.6 + 0.1;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // --- HÀM TẢI SCRIPT ---
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.crossOrigin = "anonymous";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.body.appendChild(script);
    });
  };

  // --- KHỞI TẠO MEDIAPIPE ---
  useEffect(() => {
    const init = async () => {
      try {
        await loadScript(
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${MP_VERSION}/hands.js`
        );
        setIsModelLoading(false);
        startCamera();
      } catch (err) {
        console.error(err);
        setError("Lỗi tải thư viện AI.");
      }
    };
    init();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setStreamActive(true);
        };
      }
    } catch (err) {
      console.error(err);
      setError("Cần quyền Camera để hoạt động.");
    }
  };

  // --- LOGIC CANVAS & AI LOOP ---
  useEffect(() => {
    if (!streamActive || isModelLoading || !window.Hands) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. BIẾN CỤC BỘ
    const particles = [];
    const bgStarsCanvas = document.createElement("canvas");
    let animationId;
    let handsInstance = null;

    // 2. HÀM KHỞI TẠO HẠT TỪ TEXT
    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Font chữ linh động theo màn hình
      const fontSize = Math.min(w, h) * 0.22;

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCanvas.width = w;
      tempCanvas.height = h;

      tempCtx.fillStyle = "white";
      tempCtx.font = `900 ${fontSize}px sans-serif`;
      tempCtx.textAlign = "center";
      tempCtx.textBaseline = "middle";
      tempCtx.fillText(text_Message, w / 2, h / 2);

      // Thêm trái tim nhỏ ở dưới
      tempCtx.font = `${fontSize * 0.5}px sans-serif`;
      tempCtx.fillText("❤️", w / 2, h / 2 + fontSize * 0.85);

      const textData = tempCtx.getImageData(0, 0, w, h);

      // Reset mảng hạt
      particles.length = 0;

      // Quét pixel để tạo hạt (Gap càng nhỏ hạt càng dày)
      const gap = 12;
      for (let y = 0; y < textData.height; y += gap) {
        for (let x = 0; x < textData.width; x += gap) {
          // Lấy điểm ảnh có độ trong suốt > 128
          if (textData.data[y * 4 * textData.width + x * 4 + 3] > 128) {
            particles.push(new Particle(x, y, w, h));
          }
        }
      }

      // Cache background stars (vẽ 1 lần dùng mãi)
      bgStarsCanvas.width = w;
      bgStarsCanvas.height = h;
      const bgCtx = bgStarsCanvas.getContext("2d");
      if (bgCtx) drawBackgroundStars(bgCtx, w, h);
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // 3. SETUP MEDIA PIPE HANDS
    handsInstance = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${MP_VERSION}/${file}`,
    });

    handsInstance.setOptions({
      maxNumHands: 1,
      modelComplexity: 0, // 0 cho nhanh, 1 cho chính xác
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    const state = { assembled: false };

    handsInstance.onResults((results) => {
      let assembled = false;
      if (results.multiHandLandmarks?.length > 0) {
        const lm = results.multiHandLandmarks[0];

        // Tính khoảng cách đầu ngón tay về gốc ngón tay để xem đang mở hay nắm
        const dist = (i1, i2) =>
          Math.hypot(lm[i1].x - lm[i2].x, lm[i1].y - lm[i2].y);

        let open = 0;
        if (dist(8, 0) > dist(5, 0)) open++; // Ngón trỏ
        if (dist(12, 0) > dist(9, 0)) open++; // Ngón giữa
        if (dist(16, 0) > dist(13, 0)) open++; // Ngón áp út
        if (dist(20, 0) > dist(17, 0)) open++; // Ngón út

        // Nếu xòe >= 3 ngón tay -> Kích hoạt hiệu ứng
        assembled = open >= 3;
        setHandState(assembled ? "open" : "closed");
      } else {
        setHandState("none");
      }
      state.assembled = assembled;
    });

    // 4. RENDER LOOP
    let aiBusy = false;

    const render = () => {
      // Gửi frame video sang AI xử lý (giới hạn tốc độ nếu cần)
      if (!aiBusy && video.readyState >= 2) {
        aiBusy = true;
        handsInstance
          .send({ image: video })
          .then(() => {
            aiBusy = false;
          })
          .catch(() => {
            aiBusy = false;
          });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Vẽ nền sao
      ctx.drawImage(bgStarsCanvas, 0, 0);

      // Hiệu ứng Glow
      if (state.assembled) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#FF00FF"; // Hồng tím rực rỡ
        ctx.globalCompositeOperation = "screen";
      } else {
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00FFFF"; // Xanh cyan huyền ảo
        ctx.globalCompositeOperation = "lighter";
      }

      // Cập nhật và vẽ hạt
      particles.forEach((p) => {
        p.update(state.assembled, canvas.width, canvas.height);
        p.draw(ctx);
      });

      // Reset style vẽ
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";

      animationId = requestAnimationFrame(render);
    };

    render();

    // 5. CLEANUP
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (handsInstance) {
        handsInstance.close();
      }
      // Dừng camera khi unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [streamActive, isModelLoading]);

  // --- UI RENDER HELPERS ---
  const renderStatusIcon = () => {
    if (handState === "open")
      return <Heart className="w-4 h-4 fill-current animate-bounce" />;
    if (handState === "closed") return <Unlock className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (handState === "open") return "Phát hiện xòe tay!";
    if (handState === "closed") return "Đang khóa";
    return "Chờ tay bạn...";
  };

  const getStatusColorClass = () => {
    if (handState === "open")
      return "bg-pink-500/30 border-pink-400 text-pink-200";
    if (handState === "closed")
      return "bg-blue-500/20 border-blue-400 text-blue-200";
    return "bg-gray-800/50 border-gray-600 text-gray-400";
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden font-sans bg-black">
      <input
        type="text"
        value={text_Message}
        onChange={(e) => setText_Message(e.target.value)}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 p-2 rounded-md bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Nhập tin nhắn của bạn..."
      />
      {/* 1. LỚP NỀN GALAXY */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-950 to-black z-0"></div>

      {/* 2. CANVAS HIỆU ỨNG (FULLSCREEN) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full block"
      />

      {/* 3. WIDGET CAMERA & TRẠNG THÁI */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Status Bubble */}
        <div
          className={`px-4 py-2 rounded-full border backdrop-blur-md shadow-lg flex items-center gap-2 transition-all duration-300 ${getStatusColorClass()}`}
        >
          {renderStatusIcon()}
          <span className="text-xs font-bold uppercase tracking-wider">
            {getStatusText()}
          </span>
        </div>

        {/* Khung Camera */}
        <div
          className={`relative w-48 md:w-64 aspect-[4/3] bg-black rounded-2xl overflow-hidden border-2 shadow-2xl transition-all duration-300 
          ${
            handState === "open"
              ? "border-pink-500 shadow-pink-500/50 scale-105"
              : "border-slate-700 hover:border-blue-400"
          }
        `}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover transform -scale-x-100"
            playsInline
            muted
          />

          {(isModelLoading || !streamActive) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 text-blue-400">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <span className="text-xs text-center px-4">
                Đang tải AI Model...
              </span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/90 text-red-200 p-4 text-center text-xs">
              {error}
            </div>
          )}
        </div>

        <p className="text-[10px] text-white/40 pr-2">
          Đưa tay lên trước cam & xòe ngón tay
        </p>
      </div>
    </div>
  );
};

export default MagicLoveCameraCanvas;
