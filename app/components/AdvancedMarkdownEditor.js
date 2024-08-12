// app/components/AdvancedMarkdownEditor.js
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);

export default function AdvancedMarkdownEditor({
  value,
  onChange,
}) {
  const [editorState, setEditorState] =
    useState(value);

  const handleChange = (value) => {
    setEditorState(value);
    onChange(value);
  };

  return (
    <SimpleMDE
      value={editorState}
      onChange={handleChange}
      options={{
        spellChecker: false,
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
          "image",
          "|",
          "preview",
          "side-by-side",
          "fullscreen",
          "|",
          "guide",
        ],
      }}
    />
  );
}
