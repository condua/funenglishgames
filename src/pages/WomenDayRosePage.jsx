// src/pages/WomenDayRosePage.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Instances,
  Instance,
  Environment,
  Effects,
} from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
// const wishes = [
//   "Chúc em luôn xinh đẹp, rạng rỡ như đóa hồng trong nắng mai 🌸",
//   "Mong rằng mỗi ngày trôi qua của em đều tràn đầy niềm vui và nụ cười 💖",
//   "Chúc em luôn được yêu thương và nâng niu như báu vật quý giá nhất ❤️",
//   "Ngày 20/10 này, chúc em nhận được thật nhiều bất ngờ ngọt ngào 🍬",
//   "Chúc em luôn tỏa sáng, mạnh mẽ và duyên dáng như chính con người em ✨",
//   "Cảm ơn em vì đã luôn làm thế giới này trở nên đẹp hơn 🌷",
//   "Chúc em có một ngày đặc biệt với muôn vàn yêu thương và hạnh phúc 💝",
//   "Chúc cho mọi ước mơ của em đều trở thành hiện thực 🌠",
//   "Chúc em luôn là lý do khiến trái tim ai đó mỉm cười mỗi ngày 😊",
//   "Mong rằng em sẽ luôn được bao quanh bởi tình yêu và sự dịu dàng 💗",
//   "Chúc em mãi mãi xinh đẹp, dịu dàng và đáng yêu như hôm nay 🌹",
//   "Chúc em luôn tìm thấy ánh sáng và niềm tin trên con đường mình đi 🌞",
//   "Mong rằng mỗi khoảnh khắc của ngày hôm nay sẽ trở thành kỷ niệm đẹp trong tim em 💫",
//   "Chúc em luôn có người yêu thương, trân trọng và che chở suốt đời 💞",
//   "Chúc cho nụ cười của em hôm nay rực rỡ hơn cả ánh mặt trời ☀️",
//   "Em xứng đáng với những điều ngọt ngào và tuyệt vời nhất trên thế gian 💖",
//   "Chúc em sống trọn từng khoảnh khắc với niềm vui, đam mê và yêu thương ❤️",
//   "Chúc trái tim em luôn đầy ắp yêu thương và hạnh phúc 🌸",
//   "Mong rằng hôm nay và mọi ngày sau này, em đều được đối xử như một nàng công chúa 👑",
//   "Chúc em nhận được vô số lời yêu thương từ những người quan trọng nhất 💌",
//   "Chúc cho những điều tốt đẹp nhất sẽ luôn tìm đến em 🌈",
//   "Mong rằng mỗi sáng thức dậy, em đều có lý do để mỉm cười 😊",
//   "Chúc em có một cuộc sống ngọt ngào như những viên kẹo tình yêu 🍭",
//   "Chúc em luôn giữ được sự tự tin và niềm tin vào chính mình 💪",
//   "Cảm ơn em vì đã mang đến thế giới này ánh sáng và sự ấm áp 🌞",
//   "Chúc em mãi là niềm tự hào, là điểm tựa vững chắc của những người yêu thương em ❤️",
//   "Chúc cho mọi điều em mong ước đều thành hiện thực trong tình yêu và cuộc sống 💫",
//   "Chúc em luôn được yêu thương không chỉ hôm nay mà còn mãi mãi 💗",
//   "Chúc em luôn giữ được trái tim ngọt ngào và nụ cười rạng rỡ như hiện tại 💐",
//   "Chúc em có một hành trình tuyệt đẹp đầy hoa thơm và tình yêu nồng nàn 🌹",
//   "Mong rằng em sẽ luôn là bông hoa đẹp nhất trong khu vườn cuộc sống 🌷",
//   "Chúc cho tình yêu sẽ luôn bên cạnh em và sưởi ấm trái tim em 💞",
//   "Chúc em có một ngày 20/10 đáng nhớ với thật nhiều yêu thương và quà tặng 🎁",
//   "Mong rằng em sẽ luôn tìm thấy hạnh phúc trong những điều nhỏ bé 💖",
//   "Chúc em luôn được yêu thương như cách em xứng đáng 💝",
//   "Chúc em hôm nay và mãi mãi đều tràn ngập yêu thương như ánh nắng ban mai ☀️",
//   "Chúc cho mỗi bước chân em đi đều dẫn tới những điều tuyệt vời 🌟",
//   "Chúc em luôn biết rằng em là người đặc biệt và vô giá 💫",
//   "Mong rằng cuộc sống của em sẽ luôn tràn ngập hương hoa và nụ cười 🌸",
//   "Chúc em mãi là nguồn cảm hứng ngọt ngào cho tất cả mọi người ❤️",
//   "Chúc em luôn được yêu thương như đóa hồng đỏ trong tim ai đó 🌹",
// ];
const wishes = [
  "Chúc bạn luôn vui vẻ và rạng rỡ như đóa hồng trong nắng mai 🌸",
  "Mong rằng mỗi ngày trôi qua của bạn đều tràn đầy tiếng cười và niềm hạnh phúc 💖",
  "Chúc bạn luôn được yêu thương, quan tâm và trân trọng ❤️",
  "Ngày 20/10 này, chúc bạn nhận được thật nhiều điều bất ngờ ngọt ngào 🍬",
  "Chúc bạn luôn tỏa sáng, mạnh mẽ và tự tin trên hành trình của mình ✨",
  "Cảm ơn bạn vì đã luôn làm thế giới này trở nên tốt đẹp hơn 🌷",
  "Chúc bạn có một ngày đặc biệt với muôn vàn yêu thương và niềm vui 💝",
  "Chúc cho mọi ước mơ của bạn đều sớm trở thành hiện thực 🌠",
  "Chúc bạn luôn là lý do khiến những người xung quanh mỉm cười mỗi ngày 😊",
  "Mong rằng bạn sẽ luôn được bao quanh bởi sự yêu thương và năng lượng tích cực 💗",
  "Chúc bạn mãi mãi đáng yêu, tự tin và luôn sống đúng với chính mình 🌹",
  "Chúc bạn luôn tìm thấy ánh sáng và niềm tin trên con đường phía trước 🌞",
  "Mong rằng mỗi khoảnh khắc hôm nay sẽ trở thành kỷ niệm thật đẹp 💫",
  "Chúc bạn luôn có những người yêu thương, đồng hành và sẻ chia 💞",
  "Chúc cho nụ cười của bạn hôm nay rực rỡ hơn cả ánh mặt trời ☀️",
  "Bạn xứng đáng với tất cả những điều tuyệt vời nhất trên thế giới 💖",
  "Chúc bạn sống trọn từng khoảnh khắc với niềm vui, đam mê và yêu thương ❤️",
  "Chúc trái tim bạn luôn đầy ắp hạnh phúc và tình cảm 🌸",
  "Mong rằng hôm nay và mọi ngày sau này, bạn đều được đối xử thật tốt 👑",
  "Chúc bạn nhận được thật nhiều lời chúc ý nghĩa từ những người thân yêu 💌",
  "Chúc cho những điều tốt đẹp nhất sẽ luôn tìm đến với bạn 🌈",
  "Mong rằng mỗi sáng thức dậy, bạn đều có một lý do để mỉm cười 😊",
  "Chúc bạn có một cuộc sống ngọt ngào và đáng nhớ như những viên kẹo 🍭",
  "Chúc bạn luôn giữ được sự tự tin và tin tưởng vào chính mình 💪",
  "Cảm ơn bạn vì đã mang đến cuộc sống này ánh sáng và sự ấm áp 🌞",
  "Chúc bạn mãi là niềm tự hào và điểm tựa của những người xung quanh ❤️",
  "Chúc cho mọi điều bạn mong ước đều thành hiện thực trong cuộc sống 💫",
  "Chúc bạn luôn được yêu thương không chỉ hôm nay mà cả mai sau 💗",
  "Chúc bạn luôn giữ được trái tim ngọt ngào và nụ cười rạng rỡ 💐",
  "Chúc bạn có một hành trình tuyệt đẹp đầy hoa thơm và kỷ niệm đáng nhớ 🌹",
  "Mong rằng bạn sẽ luôn là bông hoa đẹp nhất trong khu vườn cuộc sống 🌷",
  "Chúc cho tình bạn và yêu thương sẽ luôn bên cạnh bạn 💞",
  "Chúc bạn có một ngày 20/10 thật đáng nhớ với thật nhiều niềm vui 🎁",
  "Mong rằng bạn sẽ luôn tìm thấy hạnh phúc trong những điều nhỏ bé 💖",
  "Chúc bạn luôn được yêu thương như chính cách bạn xứng đáng 💝",
  "Chúc bạn hôm nay và mãi mãi đều tràn ngập năng lượng tích cực ☀️",
  "Chúc cho mỗi bước chân bạn đi đều dẫn đến những điều tuyệt vời 🌟",
  "Chúc bạn luôn biết rằng bạn là người đặc biệt và vô giá 💫",
  "Mong rằng cuộc sống của bạn sẽ luôn tràn ngập nụ cười và yêu thương 🌸",
  "Chúc bạn mãi là nguồn cảm hứng tích cực cho mọi người xung quanh ❤️",
  "Chúc bạn luôn được trân trọng và yêu thương như một đóa hồng 🌹",
];

function RoseCurveTube() {
  // Rose curve r = a * sin(kθ), dựng ống (TubeGeometry) để có dải hoa hồng 3D
  const meshRef = useRef();
  const geom = useMemo(() => {
    class RoseCurve extends THREE.Curve {
      constructor(a = 1.2, k = 4) {
        super();
        this.a = a;
        this.k = k;
      }
      getPoint(t) {
        const theta = t * Math.PI * 8; // vòng đủ cánh
        const r = this.a * Math.sin(this.k * theta);
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        const z = 0.15 * Math.sin(theta * 2);
        return new THREE.Vector3(x, y, z);
      }
    }
    const path = new RoseCurve(1.2, 4);
    return new THREE.TubeGeometry(path, 800, 0.06, 16, false);
  }, []);

  useFrame((_, dt) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += dt * 0.1;
    // nhịp thở nhẹ
    const s = 1 + Math.sin(performance.now() / 1200) * 0.02;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef} geometry={geom}>
      <meshPhysicalMaterial
        color={"#B00020"}
        roughness={0.35}
        metalness={0.05}
        clearcoat={0.3}
        clearcoatRoughness={0.5}
      />
    </mesh>
  );
}

function PetalsField({ count = 300 }) {
  const refs = useRef([]);
  const positions = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        x: (Math.random() - 0.5) * 6,
        y: Math.random() * 6,
        z: (Math.random() - 0.5) * 6,
        r: Math.random() * Math.PI,
        s: 0.08 + Math.random() * 0.12,
        d: 0.6 + Math.random() * 0.8, // tốc độ rơi
        spin: (Math.random() - 0.5) * 1.2,
      })),
    [count]
  );

  useFrame((_, dt) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const p = positions[i];
      p.y -= p.d * dt;
      if (p.y < -2.5) {
        p.y = 3 + Math.random() * 2;
        p.x = (Math.random() - 0.5) * 6;
        p.z = (Math.random() - 0.5) * 6;
      }
      m.position.set(p.x, p.y, p.z);
      m.rotation.y += p.spin * dt;
      m.rotation.x += p.spin * 0.3 * dt;
      m.scale.setScalar(p.s);
    });
  });

  return (
    <Instances limit={count}>
      <planeGeometry args={[0.6, 0.9]} />
      <meshStandardMaterial color={"#C1121F"} />
      {positions.map((_, i) => (
        <Instance key={i} ref={(el) => (refs.current[i] = el)} />
      ))}
    </Instances>
  );
}

function RoseScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-4, -2, -4]} intensity={0.3} />
      <RoseCurveTube />
      <PetalsField count={280} />
      <Environment preset="sunset" />
      {/* Bloom nhẹ qua drei/Effects (nếu không muốn postprocessing, có thể bỏ) */}
      <Effects disableGamma>
        {/* Mặc định Vite + drei đã có EffectComposer; để đơn giản có thể bỏ nếu lỗi phiên bản */}
      </Effects>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI * 0.8}
      />
    </>
  );
}
//main function
// gg
//hello
export default function WomenDayRosePage() {
  const [randomWish, setRandomWish] = useState(null);

  const handleGenerateWish = () => {
    const wish = wishes[Math.floor(Math.random() * wishes.length)];
    setRandomWish(wish);
  };
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-100 via-pink-100 to-white dark:from-[#0f0b10] dark:via-[#150e1b] dark:to-black">
      <header className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <motion.h1
          initial={{ opacity: 0, y: -12, blur: 8 }}
          animate={{ opacity: 1, y: 0, blur: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center font-bold text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600 drop-shadow"
        >
          Chúc mừng Ngày Phụ Nữ Việt Nam 20/10
        </motion.h1>
        <p className="text-center mt-2 text-sm md:text-base text-rose-700/80 dark:text-rose-200/80">
          Happy Vietnamese Women’s Day — you are loved and appreciated 🌹
        </p>
      </header>

      <main className="relative h-[100dvh]">
        <Canvas
          gl={{ antialias: true }}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6], fov: 45 }}
        >
          <RoseScene />
        </Canvas>

        {/* Badge nổi + nút hành động */}
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 z-20">
          {/* <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="px-5 py-3 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-white/10 shadow-xl"
          >
            <span className="font-medium text-rose-700 dark:text-rose-200">
              “To every Vietnamese woman — strength, grace, and endless
              blossoms.”
            </span>
          </motion.div> */}
          {randomWish && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 px-6 py-3 bg-white/80 dark:bg-white/10 rounded-xl shadow-lg max-w-lg text-center text-rose-700 dark:text-rose-200"
            >
              💌 {randomWish}
            </motion.div>
          )}

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition shadow-lg"
              onClick={handleGenerateWish}
            >
              Nhận lời chúc ngọt ngào
            </button>
            {/* <button
              className="px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-rose-700 dark:bg-white/10 dark:text-rose-200 dark:hover:bg-white/20 transition border border-white/50 shadow-lg"
              onClick={() => alert("Nhạc nền: bật/tắt (demo) 🎵")}
            >
              Nhạc nền
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
