// app/components/CourseCard.js
"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function CourseCard({ course }) {
  const { isSignedIn, user } = useUser();
  const [isEnrolled, setIsEnrolled] =
    useState(false);
  const [progress, setProgress] = useState(0);

  async function handleEnroll() {
    if (!isSignedIn) {
      // Redirect to sign in page
      return;
    }

    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: course._id,
      }),
    });

    if (res.ok) {
      setIsEnrolled(true);
      // You might want to update the user's enrolled courses here
    }
  }

  return (
    <div className="border rounded-lg p-4 h-64 w-72 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold truncate">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600 h-20 overflow-hidden">
          {course.description}
        </p>
        <p className="text-sm">
          Category: {course.category}
        </p>
        <p className="text-sm">
          Skill Level: {course.skillLevel}
        </p>
      </div>
      <div className="mt-4">
        {isEnrolled && (
          <p>Progress: {progress}%</p>
        )}
        <Link
          href={`/courses/${course._id}`}
          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Course
        </Link>
        {!isEnrolled && (
          <button
            onClick={handleEnroll}
            className="mt-2 ml-2 inline-block bg-green-500 text-white px-4 py-2 rounded"
          >
            Enroll
          </button>
        )}
      </div>
    </div>
  );
}
