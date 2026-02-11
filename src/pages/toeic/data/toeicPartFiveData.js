// src/data/toeicData.js

// --- 1. DATA GENERATION HELPERS ---
// Hàm tạo câu hỏi giả lập để lấp đầy 50 câu cho bộ đề
import set1 from "./set1";
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

// DATA: SET 2 (Focus: Contracts & Meetings)
const set2 = [
  {
    id: 1,
    question:
      "The contract must be signed _______ the end of the business day.",
    options: ["by", "at", "on", "in"],
    correct: "A",
    type: "Prepositions",
    explanation: "'By' + mốc thời gian mang nghĩa 'trước hoặc muộn nhất là'.",
    translation: "Hợp đồng phải được ký trước cuối ngày làm việc.",
  },
  {
    id: 2,
    question:
      "All participants in the seminar are required to _______ at the registration desk.",
    options: ["sign in", "sign out", "sign up", "sign off"],
    correct: "A",
    type: "Phrasal Verbs",
    explanation: "'Sign in' nghĩa là ký tên điểm danh/đăng nhập khi đến nơi.",
    translation:
      "Tất cả người tham gia hội thảo được yêu cầu ký tên tại bàn đăng ký.",
  },
  {
    id: 3,
    question: "We need to reach a _______ regarding the budget distribution.",
    options: ["consensus", "consent", "consequence", "conservation"],
    correct: "A",
    type: "Vocabulary",
    explanation:
      "'Reach a consensus' là cụm cố định nghĩa là đạt được sự đồng thuận.",
    translation:
      "Chúng ta cần đạt được sự đồng thuận về việc phân bổ ngân sách.",
  },
  {
    id: 4,
    question: "_______ the CEO nor the CFO was available for comments.",
    options: ["Either", "Neither", "Both", "Not"],
    correct: "B",
    type: "Conjunctions",
    explanation: "Cấu trúc 'Neither... nor...' (Cả... đều không...).",
    translation: "Cả CEO lẫn CFO đều không có mặt để bình luận.",
  },
  {
    id: 5,
    question: "The merger will be beneficial _______ both companies involved.",
    options: ["at", "to", "with", "from"],
    correct: "B",
    type: "Prepositions",
    explanation: "Tính từ 'beneficial' đi với giới từ 'to'.",
    translation: "Vụ sáp nhập sẽ có lợi cho cả hai công ty liên quan.",
  },
  ...generateFillerQuestions(6, 45, "Contracts & Meetings"),
];

// --- 3. MAIN DATA AGGREGATOR ---
// Gộp các bộ đề vào object để export
const ALL_SETS = {
  1: { title: "Đề 1: Tổng hợp (General)", data: set1 },
  2: { title: "Đề 2: Hợp đồng & Hội họp", data: set2 },
};

export default ALL_SETS;
