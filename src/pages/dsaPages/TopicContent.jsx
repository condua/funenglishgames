// src/components/TopicContent.js
import React from "react";

const TopicContent = ({ topic }) => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{topic.title}</h1>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: topic.theory }}
      />
    </div>
  );
};

export default TopicContent;
