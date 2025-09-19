import React, { useState, useEffect } from "react";
import Sidebar from "../../components/dsa/Sidebar";
import Content from "../../pages/dsaPages/Content";
import { dsaData } from "./dsaDataNew";

const ReviewPage = () => {
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mặc định chọn chủ đề đầu tiên khi tải trang
  useEffect(() => {
    if (dsaData.length > 0) {
      setActiveTopicId(dsaData[0].id);
    }
  }, []);

  const selectedTopic = dsaData.find((topic) => topic.id === activeTopicId);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar
        topics={dsaData}
        activeTopic={activeTopicId}
        onTopicClick={setActiveTopicId}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header for mobile */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">
            {selectedTopic ? selectedTopic.title : "DSA Review"}
          </h1>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        <Content topic={selectedTopic} />
      </div>
    </div>
  );
};

export default ReviewPage;
