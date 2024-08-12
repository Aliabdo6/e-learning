"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdvancedMarkdownEditor from "../../../../components/AdvancedMarkdownEditor";

export default function CreateLesson({ params }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { id: courseId } = params;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          courseId,
        }),
      });

      if (res.ok) {
        const lesson = await res.json();
        router.push(
          `/courses/${courseId}/lessons/${lesson._id}`
        );
      } else {
        const errorData = await res.json();
        setError(
          errorData.error ||
            "An error occurred while creating the lesson"
        );
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Create New Lesson
      </h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">
            {error}
          </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <AdvancedMarkdownEditor
            value={content}
            onChange={setContent}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isLoading
            ? "Creating..."
            : "Create Lesson"}
        </button>
      </form>
    </div>
  );
}

// // app/courses/[id]/lessons/create/page.js
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import MarkdownEditor from "../../../../components/MarkdownEditor";

// export default function CreateLesson({ params }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const router = useRouter();
//   const { id: courseId } = params;

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const res = await fetch("/api/lessons", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         content,
//         courseId,
//       }),
//     });
//     if (res.ok) {
//       router.push(`/courses/${courseId}`);
//     }
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">
//         Create New Lesson
//       </h1>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//       >
//         <div>
//           <label
//             htmlFor="title"
//             className="block mb-1"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) =>
//               setTitle(e.target.value)
//             }
//             className="w-full border rounded px-2 py-1"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="content"
//             className="block mb-1"
//           >
//             Content
//           </label>
//           <MarkdownEditor
//             value={content}
//             onChange={setContent}
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create Lesson
//         </button>
//       </form>
//     </div>
//   );
// }
