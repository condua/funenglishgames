// src/components/LanguageSwitcher.js
import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage("en")}
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${
          language === "en" ? activeClass : inactiveClass
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage("vi")}
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${
          language === "vi" ? activeClass : inactiveClass
        }`}
      >
        Tiếng Việt
      </button>
    </div>
  );
};

export default LanguageSwitcher;
