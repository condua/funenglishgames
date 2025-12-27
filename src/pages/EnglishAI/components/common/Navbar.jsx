// src/components/common/Navbar.jsx
import React from "react";
import {
  Headphones,
  PenTool,
  MessageSquare,
  BookOpen,
  Search,
  Sparkles,
} from "lucide-react";

const NavButton = ({ view, current, setView, icon, label }) => {
  const isActive = current === view;
  return (
    <button
      onClick={() => setView(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        isActive
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
          : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export const Navbar = ({ currentView, setView }) => (
  <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView("home")}
        >
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Lingua<span className="text-indigo-600">AI</span>
          </span>
        </div>
        <div className="hidden md:block text-sm font-medium text-gray-500">
          Trợ lý học tiếng Anh toàn diện
        </div>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1 gap-2 md:gap-4 border-t md:border-t-0 border-gray-100 py-2 md:py-0 md:h-12 items-center">
        <NavButton
          view="listening"
          current={currentView}
          setView={setView}
          icon={<Headphones size={18} />}
          label="Nghe"
        />
        <NavButton
          view="writing"
          current={currentView}
          setView={setView}
          icon={<PenTool size={18} />}
          label="Viết"
        />
        <NavButton
          view="speaking"
          current={currentView}
          setView={setView}
          icon={<MessageSquare size={18} />}
          label="Hội Thoại"
        />
        <NavButton
          view="vocabulary"
          current={currentView}
          setView={setView}
          icon={<BookOpen size={18} />}
          label="Từ Vựng"
        />
        <NavButton
          view="checker"
          current={currentView}
          setView={setView}
          icon={<Search size={18} />}
          label="Check Câu"
        />
      </div>
    </div>
  </nav>
);
