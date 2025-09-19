import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Content = ({ topic }) => {
  if (!topic) {
    return (
      <div className="flex-grow p-8 text-center text-gray-500 dark:text-gray-400">
        <h1 className="text-2xl">Chào mừng đến với trang Ôn tập DSA!</h1>
        <p className="mt-2">
          Vui lòng chọn một chủ đề từ thanh bên để bắt đầu.
        </p>
      </div>
    );
  }

  const { title, content } = topic;
  const { description, complexity, codeExample } = content;

  return (
    <main className="flex-grow p-6 md:p-8 overflow-y-auto">
      <article className="prose prose-blue dark:prose-invert max-w-none">
        <h1>{title}</h1>
        <p>{description}</p>

        <h2>Độ phức tạp thuật toán (Big O)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Hành động</th>
                <th className="px-4 py-2 text-left">Độ phức tạp</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 font-mono">Truy cập (Access)</td>
                <td className="px-4 py-2 font-mono">{complexity.access}</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 font-mono">Tìm kiếm (Search)</td>
                <td className="px-4 py-2 font-mono">{complexity.search}</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 font-mono">Chèn (Insertion)</td>
                <td className="px-4 py-2 font-mono">{complexity.insertion}</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 font-mono">Xóa (Deletion)</td>
                <td className="px-4 py-2 font-mono">{complexity.deletion}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Ví dụ Code</h2>
        <div className="rounded-lg overflow-hidden">
          <SyntaxHighlighter language={codeExample.language} style={atomDark}>
            {codeExample.code}
          </SyntaxHighlighter>
        </div>
      </article>
    </main>
  );
};

export default Content;
