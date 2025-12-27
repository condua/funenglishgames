// src/components/features/ConversationPractice.jsx
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Bot, Send } from "lucide-react";
import { generateTextContent } from "../../api/aiService";

export const ConversationPractice = ({ addToast }) => {
  const [scenario, setScenario] = useState("Job Interview");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const start = async () => {
    setMessages([]);
    setLoading(true);
    try {
      const text = await generateTextContent(
        `Roleplay Scenario: ${scenario}. Initiate the conversation as the other person. Start with a greeting and a relevant opening question. Keep it short and natural.`,
        "You are a helpful English roleplay partner."
      );
      setMessages([{ role: "ai", text }]);
    } catch (e) {
      addToast("Lỗi khởi tạo hội thoại.", "error");
    }
    setLoading(false);
  };

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const hist = [...messages, userMsg]
        .map((m) => `${m.role === "user" ? "User" : "Partner"}: ${m.text}`)
        .join("\n");
      const text = await generateTextContent(
        `History:\n${hist}\nUser just said: "${input}".\nRespond naturally in the role of ${scenario}. Keep response concise (under 40 words).`,
        "You are a helpful English roleplay partner."
      );
      setMessages((prev) => [...prev, { role: "ai", text }]);
    } catch (e) {
      addToast("Lỗi kết nối.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] flex flex-col animate-fade-in bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
      <div className="p-4 bg-white border-b flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Bot size={24} />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-bold uppercase">
              Tình huống
            </div>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="font-bold text-gray-800 outline-none bg-transparent cursor-pointer hover:text-emerald-600 transition"
            >
              <option value="Job Interview">Phỏng vấn xin việc</option>
              <option value="Coffee Shop">Gọi đồ tại cafe</option>
              <option value="Hotel Check-in">Check-in Khách sạn</option>
              <option value="First Date">Buổi hẹn hò đầu</option>
              <option value="Immigration">Hải quan sân bay</option>
            </select>
          </div>
        </div>
        <button
          onClick={start}
          className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200"
        >
          Làm mới
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2 opacity-60">
            <MessageSquare size={48} />
            <p>Chọn tình huống và nhấn "Làm mới" để bắt đầu</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2 shrink-0 mt-2">
                <Bot size={16} />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3.5 rounded-2xl text-sm md:text-base shadow-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2 mt-1">
              <Bot size={16} />
            </div>
            <div className="bg-white border p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-white border-t shrink-0">
        <div className="flex gap-2 items-end bg-gray-50 border border-gray-200 p-2 rounded-3xl focus-within:ring-2 focus-within:ring-emerald-500 focus-within:bg-white transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Nhập tin nhắn..."
            className="flex-1 bg-transparent px-4 py-2.5 outline-none resize-none max-h-32 custom-scrollbar text-sm md:text-base"
            rows={1}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading || !input}
            className="bg-emerald-600 text-white p-2.5 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition shadow-md"
          >
            <Send size={18} className={input ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};
