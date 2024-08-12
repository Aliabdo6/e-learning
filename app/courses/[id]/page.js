"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function CourseDetails({
  params,
}) {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [sidebarHidden, setSidebarHidden] =
    useState(false);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchCourseAndLessons();
  }, [id]);

  async function fetchCourseAndLessons() {
    try {
      const courseRes = await fetch(
        `/api/courses/${id}`
      );
      if (!courseRes.ok) {
        throw new Error("Failed to fetch course");
      }
      const courseData = await courseRes.json();
      setCourse(courseData);

      const lessonsRes = await fetch(
        `/api/lessons?courseId=${id}`
      );
      if (!lessonsRes.ok) {
        throw new Error(
          "Failed to fetch lessons"
        );
      }
      const lessonsData = await lessonsRes.json();
      setLessons(lessonsData);
    } catch (error) {
      console.error(
        "Error fetching course and lessons:",
        error
      );
      // You might want to set an error state here and display it to the user
    }
  }

  if (!course) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen">
      <button
        onClick={() =>
          setSidebarHidden(!sidebarHidden)
        }
        className="fixed top-4 left-4 z-10 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {sidebarHidden
          ? "Show Sidebar"
          : "Hide Sidebar"}
      </button>
      <div
        className={`w-64 bg-gray-100 p-4 h-screen overflow-y-auto transition-all ${
          sidebarHidden ? "-ml-64" : ""
        }`}
      >
        <h2 className="text-xl font-bold mb-4">
          Lessons
        </h2>
        <ul className="space-y-2">
          {lessons.map((lesson, index) => (
            <li key={lesson._id}>
              <Link
                href={`/courses/${id}/lessons/${lesson._id}`}
              >
                <span className="text-blue-500 hover:underline cursor-pointer">
                  {index + 1}. {lesson.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">
          {course.title}
        </h1>
        <div className="prose mb-8">
          <ReactMarkdown>
            {course.description}
          </ReactMarkdown>
        </div>
        <Link
          href={`/courses/${id}/lessons/create`}
        >
          <span className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
            Add New Lesson
          </span>
        </Link>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Course Content
          </h2>
          {lessons.length > 0 ? (
            <ul className="space-y-2">
              {lessons.map((lesson, index) => (
                <li key={lesson._id}>
                  <Link
                    href={`/courses/${id}/lessons/${lesson._id}`}
                  >
                    <span className="text-blue-500 hover:underline cursor-pointer">
                      Lesson {index + 1}:{" "}
                      {lesson.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No lessons available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import ReactMarkdown from "react-markdown";

// export default function CourseDetails({
//   params,
// }) {
//   const [course, setCourse] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const [sidebarHidden, setSidebarHidden] =
//     useState(false);
//   const router = useRouter();
//   const { id } = params;

//   useEffect(() => {
//     fetchCourseAndLessons();
//   }, [id]);

//   async function fetchCourseAndLessons() {
//     const courseRes = await fetch(
//       `/api/courses/${id}`
//     );
//     const courseData = await courseRes.json();
//     setCourse(courseData);

//     const lessonsRes = await fetch(
//       `/api/lessons?courseId=${id}`
//     );
//     const lessonsData = await lessonsRes.json();
//     setLessons(lessonsData);
//   }

//   if (!course) return <div>Loading...</div>;

//   return (
//     <div className="flex">
//       <button
//         onClick={() =>
//           setSidebarHidden(!sidebarHidden)
//         }
//         className="fixed top-4 left-4 z-10 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {sidebarHidden
//           ? "Show Sidebar"
//           : "Hide Sidebar"}
//       </button>
//       <div
//         className={`w-64 bg-gray-100 p-4 h-screen overflow-y-auto transition-all ${
//           sidebarHidden ? "-ml-64" : ""
//         }`}
//       >
//         <h2 className="text-xl font-bold mb-4">
//           Lessons
//         </h2>
//         <ul className="space-y-2">
//           {lessons.map((lesson, index) => (
//             <li key={lesson._id}>
//               <Link
//                 href={`/courses/${id}/lessons/${lesson._id}`}
//               >
//                 <a className="text-blue-500 hover:underline">
//                   {index + 1}. {lesson.title}
//                 </a>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex-1 p-4">
//         <h1 className="text-3xl font-bold mb-4">
//           {course.title}
//         </h1>
//         <div className="prose">
//           <ReactMarkdown>
//             {course.description}
//           </ReactMarkdown>
//         </div>
//       </div>
//     </div>
//   );
// }

// // app/courses/[id]/page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ReactMarkdown from "react-markdown";

// export default function CourseDetails({
//   params,
// }) {
//   const [course, setCourse] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const [newLessonTitle, setNewLessonTitle] =
//     useState("");
//   const [newLessonContent, setNewLessonContent] =
//     useState("");
//   const router = useRouter();
//   const { id } = params;

//   useEffect(() => {
//     fetchCourseAndLessons();
//   }, [id]);

//   async function fetchCourseAndLessons() {
//     const courseRes = await fetch(
//       `/api/courses/${id}`
//     );
//     const courseData = await courseRes.json();
//     setCourse(courseData);

//     const lessonsRes = await fetch(
//       `/api/lessons?courseId=${id}`
//     );
//     const lessonsData = await lessonsRes.json();
//     setLessons(lessonsData);
//   }

//   async function handleAddLesson(e) {
//     e.preventDefault();
//     const res = await fetch("/api/lessons", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: newLessonTitle,
//         content: newLessonContent,
//         courseId: id,
//       }),
//     });

//     if (res.ok) {
//       setNewLessonTitle("");
//       setNewLessonContent("");
//       fetchCourseAndLessons();
//     }
//   }

//   if (!course) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">
//         {course.title}
//       </h1>
//       <div className="prose">
//         <ReactMarkdown>
//           {course.description}
//         </ReactMarkdown>
//       </div>

//       <h2 className="text-2xl font-bold mt-8 mb-4">
//         Lessons
//       </h2>
//       <ul className="space-y-2">
//         {lessons.map((lesson) => (
//           <li
//             key={lesson._id}
//             className="border p-4 rounded"
//           >
//             <h3 className="text-xl font-semibold">
//               {lesson.title}
//             </h3>
//             <div className="prose mt-2">
//               <ReactMarkdown>
//                 {lesson.content}
//               </ReactMarkdown>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <h3 className="text-xl font-bold mt-8 mb-4">
//         Add New Lesson
//       </h3>
//       <form
//         onSubmit={handleAddLesson}
//         className="space-y-4"
//       >
//         <div>
//           <label
//             htmlFor="lessonTitle"
//             className="block mb-1"
//           >
//             Lesson Title
//           </label>
//           <input
//             type="text"
//             id="lessonTitle"
//             value={newLessonTitle}
//             onChange={(e) =>
//               setNewLessonTitle(e.target.value)
//             }
//             className="w-full border rounded px-2 py-1"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="lessonContent"
//             className="block mb-1"
//           >
//             Lesson Content
//           </label>
//           <textarea
//             id="lessonContent"
//             value={newLessonContent}
//             onChange={(e) =>
//               setNewLessonContent(e.target.value)
//             }
//             className="w-full h-32 border rounded px-2 py-1"
//             required
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add Lesson
//         </button>
//       </form>
//     </div>
//   );
// }
