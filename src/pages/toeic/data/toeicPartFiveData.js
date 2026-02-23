// src/data/toeicData.js

// --- 1. DATA GENERATION HELPERS ---
// Hàm tạo câu hỏi giả lập để lấp đầy 50 câu cho bộ đề
import set1 from "./set1";
import set2 from "./set2";
import set3 from "./set3";
import set4 from "./set4";
import set5 from "./set5";
import set6 from "./set6";
export const generateFillerQuestions = (startId, count, topic) => {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    question: `This is a sample question #${startId + i} regarding ${topic} to demonstrate the pagination feature.`,
    options: ["option A", "option B", "option C", "option D"],
    correct: "A",
    type: "Placeholder",
    explanation: `Đây là câu hỏi giả lập để đảm bảo đủ 50 câu cho bộ đề ${topic}.`,
    translation: `Câu hỏi mẫu số ${startId + i} về chủ đề ${topic}.`,
  }));
};

// --- 3. MAIN DATA AGGREGATOR ---
// Gộp các bộ đề vào object để export
const ALL_SETS = {
  1: { title: "Đề 1: Tổng hợp (General)", data: set1 },
  2: { title: "Đề 2: Hợp đồng & Hội họp", data: set2 },
  3: { title: "Đề 3: Traveling & Du lịch", data: set3 },
  4: { title: "Đề 4: Văn phòng & Công việc", data: set4 },
  5: { title: "Đề 5: Shopping & Bán hàng", data: set5 },
  6: { title: "Đề 6: Tài chính & Ngân hàng", data: set6 },
};

export default ALL_SETS;
