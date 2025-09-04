// src/components/Sidebar.js
import React from "react";

const Sidebar = ({
  topics,
  onSelectTopic,
  selectedTopic,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {/* Lớp phủ mờ phía sau sidebar khi mở trên mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Nội dung Sidebar */}
      <div
        className={`
          bg-gray-800 text-white w-4/5 max-w-sm p-5 
          fixed top-0 left-0 h-full z-40 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:w-1/4 md:translate-x-0 md:h-auto
        `}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Chủ đề DSA</h2>
          {/* Nút đóng sidebar chỉ hiển thị trên mobile */}
          <button onClick={() => setIsOpen(false)} className="md:hidden">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul>
          {topics.map((topic) => (
            <li key={topic.id} className="mb-2">
              <button
                onClick={() => onSelectTopic(topic)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedTopic.id === topic.id
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                {topic.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
