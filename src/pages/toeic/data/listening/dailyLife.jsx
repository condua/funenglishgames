import { Languages } from "lucide-react";

export const dailyLife = {
  id: "daily_life",
  name: "Giao tiếp hàng ngày",
  icon: <Languages className="w-5 h-5" />,
  data: [
    {
      question: "Excuse me, where is the nearest train station?",
      questionTrans: "Xin lỗi, nhà ga xe lửa gần nhất ở đâu?",
      answer: "Go straight ahead and turn left at the next corner.",
      answerTrans: "Đi thẳng về phía trước và rẽ trái ở góc đường tiếp theo.",
    },
    {
      question: "How much does this coffee cost?",
      questionTrans: "Cốc cà phê này giá bao nhiêu?",
      answer: "It is four dollars and fifty cents.",
      answerTrans: "Nó có giá 4 đô la và 50 xu.",
    },
  ],
};
