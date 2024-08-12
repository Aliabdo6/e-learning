// components/LessonList.js
import Link from "next/link";

export default function LessonList({
  lessons,
  courseId,
}) {
  return (
    <ul className="space-y-2">
      {lessons.map((lesson) => (
        <li
          key={lesson._id}
          className="border rounded p-2"
        >
          <Link
            href={`/courses/${courseId}/lessons/${lesson._id}`}
          >
            <a className="text-blue-500 hover:underline">
              {lesson.title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
