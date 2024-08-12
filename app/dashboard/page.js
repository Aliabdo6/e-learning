// app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import CourseCard from "../components/CourseCard";

export default function Dashboard() {
  const { user } = useUser();
  const [enrolledCourses, setEnrolledCourses] =
    useState([]);

  useEffect(() => {
    async function fetchEnrolledCourses() {
      if (user) {
        const res = await fetch(
          `/api/users/${user.id}/courses`
        );
        const data = await res.json();
        setEnrolledCourses(data);
      }
    }
    fetchEnrolledCourses();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        My Dashboard
      </h1>
      <h2 className="text-2xl font-bold mb-2">
        Enrolled Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enrolledCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
}
