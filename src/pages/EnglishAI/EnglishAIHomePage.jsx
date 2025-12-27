// src/App.jsx
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

// Components
import { Navbar } from "./components/common/Navbar";
import { ToastContainer } from "./components/common/Toast";
import { HomeView } from "./components/features/HomeView";
import { ListeningPractice } from "./components/features/ListeningPractice";
import { WritingPractice } from "./components/features/WritingPractice";
import { ConversationPractice } from "./components/features/ConversationPractice";
import { VocabularyBuilder } from "./components/features/VocabularyBuilder";
import { SentenceChecker } from "./components/features/SentenceChecker";

// Hooks
import { useToast } from "./hooks/useToast";

// Styles
import "../../index.css";

const EnglishAIHomePage = () => {
  const [currentView, setCurrentView] = useState("home");
  const { toasts, addToast, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar currentView={currentView} setView={setCurrentView} />

      <main className="max-w-7xl mx-auto p-4 md:py-8">
        {currentView !== "home" && (
          <div className="mb-6 flex items-center justify-between animate-fade-in">
            <button
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-indigo-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md"
            >
              <ChevronLeft size={18} /> Quay lại
            </button>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest hidden md:inline-block">
              LinguaAI Workspace
            </span>
          </div>
        )}

        <div className="min-h-[60vh]">
          {currentView === "home" && <HomeView setView={setCurrentView} />}
          {currentView === "listening" && (
            <ListeningPractice addToast={addToast} />
          )}
          {currentView === "writing" && <WritingPractice addToast={addToast} />}
          {currentView === "speaking" && (
            <ConversationPractice addToast={addToast} />
          )}
          {currentView === "vocabulary" && (
            <VocabularyBuilder addToast={addToast} />
          )}
          {currentView === "checker" && <SentenceChecker addToast={addToast} />}
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-200 bg-white/50">
        <p>&copy; 2025 LinguaAI. Powered by Phan Hoang Phuc.</p>
      </footer>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default EnglishAIHomePage;
