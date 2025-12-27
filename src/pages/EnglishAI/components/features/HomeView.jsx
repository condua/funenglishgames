// src/components/features/HomeView.jsx
import React from "react";
import {
  Headphones,
  PenTool,
  MessageSquare,
  List,
  Search,
  ArrowRight,
  Zap,
} from "lucide-react";

const FeatureCard = ({ onClick, icon, color, title, desc }) => (
  <div
    onClick={onClick}
    className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150`}
    ></div>
    <div
      className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm font-medium">{desc}</p>
    <div className="mt-4 flex items-center text-sm font-semibold text-gray-400 group-hover:text-indigo-600 transition-colors">
      Bắt đầu ngay <ArrowRight size={16} className="ml-1" />
    </div>
  </div>
);

export const HomeView = ({ setView }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in space-y-12">
    <div className="text-center max-w-2xl mx-auto space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
        <Zap size={14} className="fill-indigo-700" /> AI Powered 2025
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
        Học Tiếng Anh <br className="md:hidden" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
          Thông Minh Hơn
        </span>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Không chỉ là công cụ, đây là người bạn đồng hành giúp bạn cải thiện 4 kỹ
        năng Nghe, Nói, Đọc, Viết với sức mạnh của Gemini AI.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full max-w-7xl px-2">
      <FeatureCard
        onClick={() => setView("listening")}
        icon={<Headphones className="w-8 h-8 text-white" />}
        color="bg-blue-500"
        title="Luyện Nghe"
        desc="Chép chính tả & Audio"
      />
      <FeatureCard
        onClick={() => setView("writing")}
        icon={<PenTool className="w-8 h-8 text-white" />}
        color="bg-violet-500"
        title="Luyện Viết"
        desc="Sửa lỗi IELTS & Essay"
      />
      <FeatureCard
        onClick={() => setView("speaking")}
        icon={<MessageSquare className="w-8 h-8 text-white" />}
        color="bg-emerald-500"
        title="Hội Thoại"
        desc="Roleplay ngữ cảnh thực"
      />
      <FeatureCard
        onClick={() => setView("vocabulary")}
        icon={<List className="w-8 h-8 text-white" />}
        color="bg-amber-500"
        title="Từ Vựng"
        desc="Flashcards thông minh"
      />
      <FeatureCard
        onClick={() => setView("checker")}
        icon={<Search className="w-8 h-8 text-white" />}
        color="bg-pink-500"
        title="Check Câu"
        desc="Sửa ngữ pháp tức thì"
      />
    </div>
  </div>
);
