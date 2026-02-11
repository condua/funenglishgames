// src/data/toeicData.js

// --- 1. DATA GENERATION HELPERS ---
// Hàm tạo câu hỏi giả lập để lấp đầy 50 câu cho bộ đề
import set1 from "./set1";
import set2 from "./set2";
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
};

export default ALL_SETS;
