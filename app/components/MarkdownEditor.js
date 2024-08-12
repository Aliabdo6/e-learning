// components/MarkdownEditor.js
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor({
  value,
  onChange,
}) {
  const [isPreview, setIsPreview] =
    useState(false);

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>
      {isPreview ? (
        <div className="border rounded p-2">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full h-64 border rounded p-2"
        />
      )}
    </div>
  );
}
