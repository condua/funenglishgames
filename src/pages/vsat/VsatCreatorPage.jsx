import React, { useState, useRef, useEffect } from "react";

// Cấu trúc dữ liệu ban đầu cho một đề thi mới
const initialDataTemplate = {
  title: "ĐỀ THI MINH HỌA - ĐÁNH GIÁ ĐẦU VÀO ĐẠI HỌC 2025",
  subject: "Tiếng Anh",
  duration: 60,
  parts: [
    {
      part: 1,
      title:
        "Read the notices/messages/advertisements and decide if the statements that follow each question are TRUE or FALSE.",
      questions: [],
    },
    {
      part: 2,
      title: "Read the passage and answer questions 8-15.",
      passage: "",
      questions: [],
    },
    {
      part: 3,
      title: "Matching",
      questions: [],
    },
    {
      part: 4,
      title: "Read the text and fill in ONE word which best fits each gap.",
      questions: [],
    },
  ],
};

// Cấu trúc mặc định cho từng loại câu hỏi mới
const questionTemplates = {
  "true-false": {
    id: "",
    type: "true-false",
    text: "",
    statements: [{ id: 1, text: "", answer: "T" }],
  },
  "multiple-choice": {
    id: "",
    type: "multiple-choice",
    text: "",
    options: ["", "", "", ""],
    answer: "",
  },
  matching: {
    id: "",
    type: "matching",
    text: "Match each sentence beginning...",
    items: ["", ""],
    options: { A: "", B: "" },
    answers: { 0: "A", 1: "B" },
  },
  "fill-in-the-blank": {
    id: "",
    type: "fill-in-the-blank",
    text: "",
    answers: { 21: "" },
  },
};

// === COMPONENT CON: Trình chỉnh sửa cho MỘT CÂU HỎI ===
const QuestionEditor = ({ question, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(
    JSON.parse(JSON.stringify(question))
  );

  const handleFieldChange = (field, value) => {
    setEditedQuestion((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(editedQuestion);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion(JSON.parse(JSON.stringify(question)));
    setIsEditing(false);
  };

  // --- Render các trường input dựa trên loại câu hỏi ---
  const renderEditForm = () => {
    return (
      <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-b-lg">
        <div className="grid grid-cols-4 gap-4 items-center">
          <label className="font-semibold text-gray-700 col-span-1">
            ID Câu hỏi:
          </label>
          <input
            value={editedQuestion.id}
            onChange={(e) => handleFieldChange("id", e.target.value)}
            className="col-span-3 p-2 border rounded"
            placeholder="vd: q1, q2..."
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <label className="font-semibold text-gray-700 col-span-1">
            Nội dung:
          </label>
          <textarea
            value={editedQuestion.text}
            onChange={(e) => handleFieldChange("text", e.target.value)}
            className="col-span-3 p-2 border rounded h-24"
            placeholder="Nội dung câu hỏi hoặc đoạn văn..."
          />
        </div>

        {/* --- Các trường đặc thù --- */}
        {editedQuestion.type === "true-false" && (
          <div className="space-y-3">
            <label className="font-semibold text-gray-700 block mb-2">
              Các mệnh đề (Statements):
            </label>
            {editedQuestion.statements.map((stmt, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-white rounded border"
              >
                <input
                  value={stmt.text}
                  onChange={(e) => {
                    const newStmts = [...editedQuestion.statements];
                    newStmts[idx].text = e.target.value;
                    handleFieldChange("statements", newStmts);
                  }}
                  className="flex-grow p-1 border rounded"
                  placeholder={`Mệnh đề ${idx + 1}`}
                />
                <select
                  value={stmt.answer}
                  onChange={(e) => {
                    const newStmts = [...editedQuestion.statements];
                    newStmts[idx].answer = e.target.value;
                    handleFieldChange("statements", newStmts);
                  }}
                  className="p-1 border rounded"
                >
                  <option value="T">True</option>
                  <option value="F">False</option>
                </select>
                <button
                  onClick={() =>
                    handleFieldChange(
                      "statements",
                      editedQuestion.statements.filter((_, i) => i !== idx)
                    )
                  }
                  className="text-red-500 text-xl font-bold hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                handleFieldChange("statements", [
                  ...editedQuestion.statements,
                  {
                    id: editedQuestion.statements.length + 1,
                    text: "",
                    answer: "T",
                  },
                ])
              }
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              + Thêm mệnh đề
            </button>
          </div>
        )}

        {editedQuestion.type === "multiple-choice" && (
          <div className="space-y-2">
            <label className="font-semibold text-gray-700">
              Các lựa chọn (Options):
            </label>
            {editedQuestion.options.map((opt, idx) => (
              <input
                key={idx}
                value={opt}
                onChange={(e) => {
                  const newOpts = [...editedQuestion.options];
                  newOpts[idx] = e.target.value;
                  handleFieldChange("options", newOpts);
                }}
                className="w-full p-2 border rounded"
                placeholder={`Lựa chọn ${idx + 1}`}
              />
            ))}
            <label className="font-semibold text-gray-700">Đáp án đúng:</label>
            <input
              value={editedQuestion.answer}
              onChange={(e) => handleFieldChange("answer", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nhập chính xác nội dung đáp án đúng"
            />
          </div>
        )}

        {editedQuestion.type === "matching" && (
          <div className="space-y-3">
            <label className="font-semibold text-gray-700">
              Các vế cần nối (Items):
            </label>
            {editedQuestion.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => {
                    const newItems = [...editedQuestion.items];
                    newItems[idx] = e.target.value;
                    handleFieldChange("items", newItems);
                  }}
                  className="flex-grow p-2 border rounded"
                  placeholder={`Item ${idx + 1}`}
                />
                <button
                  onClick={() =>
                    handleFieldChange(
                      "items",
                      editedQuestion.items.filter((_, i) => i !== idx)
                    )
                  }
                  className="text-red-500 text-xl font-bold hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                handleFieldChange("items", [...editedQuestion.items, ""])
              }
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              + Thêm Item
            </button>

            <label className="font-semibold text-gray-700 pt-2 block">
              Đáp án (Answers):
            </label>
            {editedQuestion.items.map((_, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-medium">Item {idx + 1} nối với:</span>
                <select
                  value={editedQuestion.answers[idx]}
                  onChange={(e) => {
                    const newAnswers = {
                      ...editedQuestion.answers,
                      [idx]: e.target.value,
                    };
                    handleFieldChange("answers", newAnswers);
                  }}
                  className="p-2 border rounded"
                >
                  {Object.keys(editedQuestion.options).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {editedQuestion.type === "fill-in-the-blank" && (
          <div className="space-y-3">
            <label className="font-semibold text-gray-700">
              Các đáp án (Answers):
            </label>
            {Object.entries(editedQuestion.answers).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <input
                  value={key}
                  disabled
                  className="w-24 p-2 border rounded bg-gray-100 text-center"
                />
                <input
                  value={value}
                  onChange={(e) => {
                    const newAnswers = {
                      ...editedQuestion.answers,
                      [key]: e.target.value,
                    };
                    handleFieldChange("answers", newAnswers);
                  }}
                  className="flex-grow p-2 border rounded"
                  placeholder={`Đáp án cho vị trí (${key})`}
                />
                <button
                  onClick={() => {
                    const newAnswers = { ...editedQuestion.answers };
                    delete newAnswers[key];
                    handleFieldChange("answers", newAnswers);
                  }}
                  className="text-red-500 text-xl font-bold hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newKey = prompt(
                  "Nhập số thứ tự cho vị trí trống mới (vd: 22):"
                );
                if (newKey && !editedQuestion.answers.hasOwnProperty(newKey)) {
                  const newAnswers = {
                    ...editedQuestion.answers,
                    [newKey]: "",
                  };
                  handleFieldChange("answers", newAnswers);
                } else if (newKey) {
                  alert(
                    `Vị trí (${newKey}) đã tồn tại! Vui lòng chọn số khác.`
                  );
                }
              }}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              + Thêm đáp án
            </button>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {!isEditing ? (
        <div className="p-4">
          <div className="flex justify-between items-start">
            <p className="font-bold text-gray-800">ID: {question.id}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Sửa
              </button>
              <button
                onClick={onDelete}
                className="text-sm text-red-600 hover:underline"
              >
                Xóa
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">
            {question.text}
          </p>
        </div>
      ) : (
        renderEditForm()
      )}
    </div>
  );
};

// === COMPONENT CON: Giao diện xem trước ===
const TestPreview = ({ data }) => {
  return (
    <div className="space-y-8">
      {data.parts.map((part, pIdx) => (
        <section key={pIdx} className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Part {part.part}: <span className="font-normal">{part.title}</span>
          </h2>
          {part.passage && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 whitespace-pre-wrap text-gray-700 leading-relaxed">
              {part.passage}
            </div>
          )}
          <div className="space-y-8">
            {part.questions.map((q) => (
              <div key={q.id} className="border-t pt-6">
                <p className="font-semibold text-gray-800 mb-4 text-lg">
                  Question {String(q.id).replace("q", "")}: {q.text}
                </p>
                {q.type === "true-false" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statement
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            True
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            False
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(q.statements || []).map((stmt) => (
                          <tr key={stmt.id}>
                            <td className="px-6 py-4">
                              {stmt.id}. {stmt.text}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input
                                type="radio"
                                name={`${q.id}-${stmt.id}`}
                                disabled
                                className="form-radio h-5 w-5"
                              />
                            </td>
                            <td className="px-6 py-4 text-center">
                              <input
                                type="radio"
                                name={`${q.id}-${stmt.id}`}
                                disabled
                                className="form-radio h-5 w-5"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {q.type === "multiple-choice" && (
                  <div className="space-y-3">
                    {(q.options || []).map((opt, i) => (
                      <label
                        key={i}
                        className="flex items-center p-3 border rounded-lg bg-gray-50 cursor-not-allowed"
                      >
                        <input
                          type="radio"
                          name={q.id}
                          disabled
                          className="form-radio h-5 w-5"
                        />
                        <span className="ml-3 text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
                {q.type === "matching" && (
                  <div className="space-y-4">
                    {(q.items || []).map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                      >
                        <p className="text-gray-800">
                          {index + 1}. {item}
                        </p>
                        <select
                          className="block w-full p-2 border rounded-md shadow-sm bg-gray-50"
                          disabled
                        >
                          <option>Chọn đáp án...</option>
                          {Object.entries(q.options || {}).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {key}. {value}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
                {q.type === "fill-in-the-blank" && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {(q.text || "").split(/(\(\d+\))/g).map((part, idx) => {
                        const match = part.match(/\((\d+)\)/);
                        if (match) {
                          const blankNumber = match[1];
                          return (
                            <React.Fragment key={idx}>
                              ({blankNumber})
                              <input
                                type="text"
                                className="inline-block w-24 mx-1 px-2 py-1 border rounded-md shadow-sm text-center bg-gray-200"
                                disabled
                              />
                            </React.Fragment>
                          );
                        }
                        return part;
                      })}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

// === COMPONENT CHÍNH ===
const VsatCreatorPage = () => {
  const [testData, setTestData] = useState(initialDataTemplate);
  const [viewMode, setViewMode] = useState("edit"); // 'edit' or 'preview'
  const fileInputRef = useRef(null);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [jsonPasteContent, setJsonPasteContent] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("vsat-creator-autosave");
    if (savedData) {
      if (
        window.confirm(
          "Tìm thấy dữ liệu đã lưu trước đó. Bạn có muốn tải lại không?"
        )
      ) {
        try {
          setTestData(JSON.parse(savedData));
        } catch (e) {
          console.error("Failed to parse saved data from localStorage", e);
          alert("Không thể tải dữ liệu đã lưu do bị lỗi.");
          localStorage.removeItem("vsat-creator-autosave");
        }
      }
    }
  }, []);

  const handleUpdateQuestion = (partIndex, questionIndex, updatedQuestion) => {
    const newTestData = JSON.parse(JSON.stringify(testData));
    newTestData.parts[partIndex].questions[questionIndex] = updatedQuestion;
    setTestData(newTestData);
  };

  const handleDeleteQuestion = (partIndex, questionIndex) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
      const newTestData = JSON.parse(JSON.stringify(testData));
      newTestData.parts[partIndex].questions.splice(questionIndex, 1);
      setTestData(newTestData);
    }
  };

  const handleAddQuestion = (partIndex, questionType) => {
    const newTestData = JSON.parse(JSON.stringify(testData));
    const newQuestion = JSON.parse(
      JSON.stringify(questionTemplates[questionType])
    );
    newQuestion.id = `q${
      newTestData.parts.flatMap((p) => p.questions).length + 1
    }`;
    newTestData.parts[partIndex].questions.push(newQuestion);
    setTestData(newTestData);
  };

  const handleDownloadJson = () => {
    const jsonString = JSON.stringify(testData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vsat-test-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveToBrowser = () => {
    try {
      localStorage.setItem("vsat-creator-autosave", JSON.stringify(testData));
      alert("Đã lưu đề thi vào bộ nhớ đệm của trình duyệt!");
    } catch (error) {
      alert("Lỗi khi lưu dữ liệu. Có thể bộ nhớ đã đầy.");
      console.error("Failed to save to localStorage", error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data && Array.isArray(data.parts) && data.title) {
          setTestData(data);
          alert("Tải file JSON và nạp dữ liệu thành công!");
        } else {
          throw new Error("Cấu trúc file JSON không hợp lệ.");
        }
      } catch (error) {
        alert(`Lỗi khi đọc file: ${error.message}`);
      }
    };
    reader.readAsText(file);
    event.target.value = null;
  };

  const handlePasteJson = () => {
    try {
      const data = JSON.parse(jsonPasteContent);
      if (data && Array.isArray(data.parts) && data.title) {
        setTestData(data);
        alert("Dán và nạp dữ liệu JSON thành công!");
        setIsPasteModalOpen(false);
        setJsonPasteContent("");
      } else {
        throw new Error("Cấu trúc file JSON không hợp lệ.");
      }
    } catch (error) {
      alert(`Lỗi khi đọc JSON: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="application/json"
      />

      {isPasteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Dán nội dung JSON</h2>
            <textarea
              className="w-full h-64 p-2 border rounded font-mono text-sm"
              value={jsonPasteContent}
              onChange={(e) => setJsonPasteContent(e.target.value)}
              placeholder="Dán nội dung file .json của bạn vào đây..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsPasteModalOpen(false)}
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handlePasteJson}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Nạp dữ liệu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Trang Soạn Thảo Đề Thi VSAT
            </h1>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() =>
                  setViewMode(viewMode === "edit" ? "preview" : "edit")
                }
                className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                {viewMode === "edit" ? "Xem trước" : "Quay lại Soạn thảo"}
              </button>
              <button
                onClick={() => setIsPasteModalOpen(true)}
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Dán JSON
              </button>
              <button
                onClick={handleUploadClick}
                className="bg-purple-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Tải Lên JSON
              </button>
              <button
                onClick={handleSaveToBrowser}
                className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Lưu vào Trình duyệt
              </button>
              <button
                onClick={handleDownloadJson}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Tải File JSON
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-8">
          {viewMode === "edit" ? (
            <>
              {testData.parts.map((part, partIndex) => (
                <div
                  key={part.part}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
                    Part {part.part}: {part.title}
                  </h2>

                  {part.part === 2 && (
                    <div className="mb-4">
                      <label className="font-semibold text-gray-700 mb-2 block">
                        Đoạn văn Part 2:
                      </label>
                      <textarea
                        value={part.passage}
                        onChange={(e) => {
                          const newTestData = JSON.parse(
                            JSON.stringify(testData)
                          );
                          newTestData.parts[partIndex].passage = e.target.value;
                          setTestData(newTestData);
                        }}
                        className="w-full p-2 border rounded h-32"
                        placeholder="Nhập đoạn văn cho Part 2..."
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    {part.questions.map((q, qIndex) => (
                      <QuestionEditor
                        key={`${partIndex}-${qIndex}`}
                        question={q}
                        onUpdate={(updatedQ) =>
                          handleUpdateQuestion(partIndex, qIndex, updatedQ)
                        }
                        onDelete={() => handleDeleteQuestion(partIndex, qIndex)}
                      />
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-4 flex items-center gap-4">
                    <h3 className="font-semibold text-gray-700">
                      Thêm câu hỏi mới:
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          handleAddQuestion(partIndex, "true-false")
                        }
                        className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full hover:bg-blue-200"
                      >
                        True/False
                      </button>
                      <button
                        onClick={() =>
                          handleAddQuestion(partIndex, "multiple-choice")
                        }
                        className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full hover:bg-blue-200"
                      >
                        Multiple Choice
                      </button>
                      <button
                        onClick={() => handleAddQuestion(partIndex, "matching")}
                        className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full hover:bg-blue-200"
                      >
                        Matching
                      </button>
                      <button
                        onClick={() =>
                          handleAddQuestion(partIndex, "fill-in-the-blank")
                        }
                        className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full hover:bg-blue-200"
                      >
                        Fill in blank
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <TestPreview data={testData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default VsatCreatorPage;
