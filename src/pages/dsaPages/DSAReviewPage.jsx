// src/pages/DSAReviewPage.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopicContent from "./TopicContent";
import Quiz from "./Quiz";
import { dsaData } from "./dsaData";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Import

function DSAReviewPage() {
  const [selectedTopic, setSelectedTopic] = useState(dsaData[0]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen md:flex">
      {/* Nút Hamburger cho mobile */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">DSA Review</h1>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {/* SVG Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <Sidebar
        topics={dsaData}
        onSelectTopic={handleSelectTopic}
        selectedTopic={selectedTopic}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* 👇 Bọc nội dung chính trong AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.main
          // 👇 Thêm key để AnimatePresence nhận biết sự thay đổi
          key={selectedTopic.id}
          className="flex-1 p-4 md:p-10"
          // 👇 Định nghĩa các trạng thái animation
          initial={{ opacity: 0, y: 20 }} // Trạng thái ban đầu: trong suốt, dịch xuống 20px
          animate={{ opacity: 1, y: 0 }} // Trạng thái khi xuất hiện: rõ nét, về vị trí 0
          exit={{ opacity: 0, y: -20 }} // Trạng thái khi biến mất: trong suốt, dịch lên 20px
          transition={{ duration: 0.3 }} // Thời gian chuyển động
        >
          <section className="bg-white rounded-lg shadow-md mb-8">
            <TopicContent topic={selectedTopic} />
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-700">
              Bài tập trắc nghiệm
            </h2>
            <Quiz questions={selectedTopic.quiz} />
          </section>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default DSAReviewPage;
