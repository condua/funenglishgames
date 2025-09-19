import React from "react";

const Sidebar = ({ topics, activeTopic, onTopicClick, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-100 dark:bg-gray-800 w-64 p-4 transform transition-transform duration-300 ease-in-out z-30
                   ${isOpen ? "translate-x-0" : "-translate-x-full"}
                   md:relative md:translate-x-0 md:flex-shrink-0`}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Chủ đề DSA
        </h2>
        <nav>
          <ul>
            {topics.map((topic) => (
              <li key={topic.id} className="mb-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onTopicClick(topic.id);
                    setIsOpen(false); // Close sidebar on mobile after click
                  }}
                  className={`block p-2 rounded-lg transition-colors
                                ${
                                  activeTopic === topic.id
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                >
                  {topic.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
