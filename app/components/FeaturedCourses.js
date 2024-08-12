"use client";

import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

export default function FeaturedCourses() {
  const [featuredCourses, setFeaturedCourses] =
    useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedCourses() {
      setLoading(true);
      try {
        const res = await fetch(
          "/api/courses?featured=true&limit=3"
        );
        const data = await res.json();
        setFeaturedCourses(data.courses || []);
      } catch (error) {
        console.error(
          "Error fetching featured courses:",
          error
        );
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedCourses();
  }, []);

  if (loading)
    return <div>Loading featured courses...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {featuredCourses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
        />
      ))}
    </div>
  );
}
