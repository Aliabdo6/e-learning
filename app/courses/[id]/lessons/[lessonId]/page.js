"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function LessonPage({ params }) {
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const router = useRouter();
  const { id: courseId, lessonId } = params;

  useEffect(() => {
    async function fetchLessonAndCourse() {
      const lessonRes = await fetch(
        `/api/lessons/${lessonId}`
      );
      const lessonData = await lessonRes.json();
      setLesson(lessonData);

      const lessonsRes = await fetch(
        `/api/lessons?courseId=${courseId}`
      );
      const lessonsData = await lessonsRes.json();
      setLessons(lessonsData);
    }
    fetchLessonAndCourse();
  }, [lessonId, courseId]);

  if (!lesson) return <div>Loading...</div>;

  const currentIndex = lessons.findIndex(
    (l) => l._id === lessonId
  );
  const prevLesson = lessons[currentIndex - 1];
  const nextLesson = lessons[currentIndex + 1];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {lesson.title}
      </h1>
      <div className="prose mb-8">
        <ReactMarkdown>
          {lesson.content}
        </ReactMarkdown>
      </div>
      <div className="flex justify-between">
        {prevLesson && (
          <Link
            href={`/courses/${courseId}/lessons/${prevLesson._id}`}
          >
            <p className="bg-blue-500 text-white px-4 py-2 rounded">
              Previous Lesson
            </p>
          </Link>
        )}
        {nextLesson && (
          <Link
            href={`/courses/${courseId}/lessons/${nextLesson._id}`}
          >
            <p className="bg-blue-500 text-white px-4 py-2 rounded">
              Next Lesson
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ReactMarkdown from "react-markdown";

// export default function LessonPage({ params }) {
//   const [lesson, setLesson] = useState(null);
//   const router = useRouter();
//   const { id: courseId, lessonId } = params;

//   useEffect(() => {
//     async function fetchLesson() {
//       const res = await fetch(
//         `/api/lessons/${lessonId}`
//       );
//       const data = await res.json();
//       setLesson(data);
//     }
//     fetchLesson();
//   }, [lessonId]);

//   if (!lesson) return <div>Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">
//         {lesson.title}
//       </h1>
//       <div className="prose">
//         <ReactMarkdown>
//           {lesson.content}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// }
