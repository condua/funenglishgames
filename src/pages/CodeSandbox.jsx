import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons for status messages (optional but recommended)
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CodeSandbox = () => {
  // State to manage user inputs
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [code, setCode] = useState(
    `// Viết code của bạn ở đây\nfunction solve(input) {\n  // your logic\n  return input;\n}`
  );

  // State to manage the execution status
  const [status, setStatus] = useState("idle"); // 'idle', 'checking', 'success', 'error'

  // Supported languages
  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const statusVariants = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const handleCheckCode = () => {
    setStatus("checking");

    // Simulate an API call or code execution process
    setTimeout(() => {
      // This is a mock validation. In a real app, you'd send the code
      // to a backend service to execute safely.
      if (code.includes("return") && input.length > 0) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 2000); // Simulate a 2-second delay
  };

  const getStatusComponent = () => {
    switch (status) {
      case "checking":
        return (
          <motion.div
            key="checking"
            variants={statusVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center text-yellow-400"
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang kiểm tra...
          </motion.div>
        );
      case "success":
        return (
          <motion.div
            key="success"
            variants={statusVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center text-green-400"
          >
            <CheckCircleIcon />
            Thực thi thành công!
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            key="error"
            variants={statusVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center text-red-400"
          >
            <XCircleIcon />
            Có lỗi xảy ra!
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold mb-2 text-cyan-400"
        >
          Code Sandbox
        </motion.h1>
        <motion.p variants={itemVariants} className="text-gray-400 mb-6">
          Chọn ngôn ngữ, cung cấp input/output và viết code để giải quyết vấn
          đề.
        </motion.p>

        {/* --- Language Selector --- */}
        <motion.div variants={itemVariants} className="mb-6">
          <label
            htmlFor="language"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Ngôn ngữ
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:w-1/4 p-2.5"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* --- Left Column: Input and Output --- */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="input"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                Input
              </label>
              <textarea
                id="input"
                rows="4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                placeholder="Nhập đầu vào cho bài toán..."
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="output"
                className="block mb-2 text-sm font-medium text-gray-400"
              >
                Expected Output
              </label>
              <textarea
                id="output"
                rows="4"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
                placeholder="Kết quả mong đợi..."
              ></textarea>
            </div>
          </motion.div>

          {/* --- Right Column: Code Editor --- */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="code-editor"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Code Editor
            </label>
            <textarea
              id="code-editor"
              rows="10"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-800 border border-gray-700 rounded-lg p-3 font-mono text-sm text-green-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              placeholder="Viết code của bạn ở đây..."
            ></textarea>
          </motion.div>
        </div>

        {/* --- Action Button and Status --- */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex items-center gap-4"
        >
          <motion.button
            onClick={handleCheckCode}
            disabled={status === "checking"}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status === "checking" ? "Đang chạy..." : "Kiểm tra"}
          </motion.button>

          <div className="h-6">
            <AnimatePresence mode="wait">
              {getStatusComponent()}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CodeSandbox;
