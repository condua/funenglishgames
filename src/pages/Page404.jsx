import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { School, ArrowLeft, BookOpen, BookX, Sparkles } from "lucide-react";

// --- COMPONENT BACKGROUND 3D (CHỦ ĐỀ GIÁO DỤC) ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let frameId;
    const currentMount = mountRef.current;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Đổi sương mù sang màu tối học thuật (slate-900)
    scene.fog = new THREE.FogExp2(0x0f172a, 0.015);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Thêm Ánh sáng cho các vật thể có chất liệu Standard
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffaa00, 2, 100); // Ánh sáng vàng ấm
    pointLight.position.set(10, 20, 20);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x0055ff, 2, 100); // Ánh sáng xanh
    blueLight.position.set(-20, -10, 20);
    scene.add(blueLight);

    // 3. Tạo hệ thống hạt (Bụi thư viện / Tinh hoa tri thức)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    // Texture hạt tròn
    const circleTexture = new THREE.TextureLoader().load(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAaElEQVQoU2NkYGD4z8DAwMgwYcIEJgYGBmYGNACig/AMWICRkREuD5EEY4B0YQnCGGAaMBxAdhBMA1xxyH6EacBqI7IGvA5G1gDThFMB04QzEaYJp4OQJqwOYDVh7QWsiWA1YTMBawIAbqE/w5c1jZAAAAAASUVORK5CYII=",
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.6,
      color: 0xfbbf24, // Màu vàng amber-400 (bụi phấn/ánh sáng tri thức)
      transparent: true,
      opacity: 0.6,
      map: circleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // 4. Thêm các vật thể 3D lơ lửng (Floating Educational Objects)
    const objects = [];

    // 4.1. Tạo mô hình Cuốn sách (Book)
    const bookGroup = new THREE.Group();
    // Bìa sách (Màu xanh navy)
    const coverGeo = new THREE.BoxGeometry(5.2, 7.2, 1);
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.5,
      metalness: 0.2,
    });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    // Trang sách (Màu trắng ngà)
    const pagesGeo = new THREE.BoxGeometry(4.8, 6.8, 1.05);
    const pagesMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
    });
    const pages = new THREE.Mesh(pagesGeo, pagesMat);

    bookGroup.add(cover);
    bookGroup.add(pages);
    bookGroup.position.set(-22, 12, -15);
    bookGroup.rotation.set(0.5, 0.8, 0);
    scene.add(bookGroup);
    objects.push(bookGroup);

    // 4.2. Tạo mô hình Nguyên tử (Khoa học/Vật lý)
    const atomGroup = new THREE.Group();
    // Hạt nhân (Màu vàng cam rực sáng)
    const nucleusGeo = new THREE.SphereGeometry(1, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    atomGroup.add(nucleus);

    // Các quỹ đạo electron (Màu ngọc bích mờ)
    const orbitMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const orbitRings = [];
    for (let i = 0; i < 3; i++) {
      const orbitGeo = new THREE.TorusGeometry(4, 0.15, 16, 100);
      const orbit = new THREE.Mesh(orbitGeo, orbitMat);
      // Xoay ngẫu nhiên các quỹ đạo
      orbit.rotation.x = (Math.PI / 3) * i;
      orbit.rotation.y = (Math.PI / 4) * i;
      atomGroup.add(orbit);
      orbitRings.push({ mesh: orbit, speed: (i + 1) * 0.01 });
    }

    atomGroup.position.set(28, -10, -20);
    scene.add(atomGroup);
    objects.push(atomGroup);

    // 5. Tương tác chuột (Parallax effect)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    window.addEventListener("mousemove", onDocumentMouseMove);

    // 6. Vòng lặp Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Xoay hệ thống hạt (bụi)
      particlesMesh.rotation.y = elapsedTime * 0.01;
      particlesMesh.rotation.x = elapsedTime * 0.005;

      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        positions[i3 + 1] += Math.sin(elapsedTime + x) * 0.003; // Sóng nhẹ
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Xoay Cuốn sách
      bookGroup.rotation.x += 0.002;
      bookGroup.rotation.y += 0.005;
      bookGroup.position.y = 12 + Math.sin(elapsedTime) * 2; // Nổi lên xuống

      // Xoay Nguyên tử
      atomGroup.rotation.y -= 0.003;
      atomGroup.position.y = -10 + Math.cos(elapsedTime) * 1.5; // Nổi lên xuống

      // Xoay các electron bên trong nguyên tử
      orbitRings.forEach((ring) => {
        ring.mesh.rotation.x += ring.speed;
        ring.mesh.rotation.y += ring.speed * 0.5;
      });

      // Hiệu ứng Parallax cho Camera
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Xử lý khi thay đổi kích thước cửa sổ
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 8. Dọn dẹp bộ nhớ khi unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onDocumentMouseMove);
      cancelAnimationFrame(frameId);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      coverGeo.dispose();
      coverMat.dispose();
      pagesGeo.dispose();
      pagesMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      orbitMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
  );
};

// --- COMPONENT GIAO DIỆN CHÍNH (UI) ---
export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen bg-slate-900 text-slate-100 overflow-hidden flex items-center justify-center font-sans selection:bg-amber-500/30">
      {/* CSS: Glitch nhẹ kiểu dữ liệu số hóa, đổi tông màu sang amber & emerald */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .glitch-edu {
          position: relative;
        }
        .glitch-edu::before, .glitch-edu::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-edu::before {
          left: 2px;
          text-shadow: -2px 0 #f59e0b; /* amber-500 */
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 6s infinite linear alternate-reverse;
        }
        .glitch-edu::after {
          left: -2px;
          text-shadow: -2px 0 #10b981; /* emerald-500 */
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 6s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(70px, 9999px, 71px, 0); }
          100% { clip: rect(32px, 9999px, 85px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          100% { clip: rect(15px, 9999px, 94px, 0); }
        }
        .glass-panel-edu {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(251, 191, 36, 0.15); /* amber border */
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
        }
      `,
        }}
      />

      {/* Layer 3D Background */}
      <ThreeBackground />

      {/* Ánh sáng Gradient mờ phía sau thẻ (Tông màu giáo dục ấm áp) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[45rem] h-[45rem] bg-amber-500/20 rounded-full blur-[130px] z-0 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[35rem] h-[35rem] bg-emerald-500/20 rounded-full blur-[100px] z-0 pointer-events-none translate-x-1/2 -translate-y-1/3"
      />

      {/* Khối Nội dung chính (Glassmorphism) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 glass-panel-edu rounded-3xl p-10 md:p-16 max-w-2xl w-11/12 mx-auto text-center flex flex-col items-center border-t border-l"
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex justify-center text-amber-400"
        >
          <BookX size={72} strokeWidth={1.5} />
        </motion.div>

        <h1
          className="text-8xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-yellow-400 to-orange-500 glitch-edu drop-shadow-lg"
          data-text="404"
        >
          404
        </h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl md:text-3xl font-semibold mb-6 text-amber-200 tracking-wide"
        >
          Trang Sách Bị Lạc Mất!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-slate-300 text-lg md:text-xl mb-10 max-w-md leading-relaxed"
        >
          Bài giảng bạn đang tìm kiếm có thể đã bị xóa, hoặc cuốn sách này chưa
          từng tồn tại trên kệ của thư viện chúng tôi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          {/* Nút Quay lại thư viện (Chính) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative overflow-hidden group bg-amber-500 text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            onClick={() =>
              window.history.back() || (window.location.href = "/")
            }
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <School size={20} className="relative z-10" />
            <span className="relative z-10">Về Sảnh Chính</span>

            {/* Hiệu ứng lấp lánh khi hover */}
            <motion.div
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                rotate: isHovered ? 0 : -45,
                scale: isHovered ? 1 : 0.5,
              }}
              className="relative z-10 ml-1 text-orange-700"
            >
              <Sparkles size={18} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Hiệu ứng noise nền làm tăng cảm giác vật lý/giấy mờ */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      ></div>
    </div>
  );
}
