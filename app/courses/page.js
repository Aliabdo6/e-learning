//courses\page.js

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";
import SearchAndFilter from "../components/SearchAndFilter";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] =
    useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [skillLevel, setSkillLevel] =
    useState("");
  const pageSize = 9;

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/courses?page=${currentPage}&pageSize=${pageSize}&search=${search}&category=${category}&skillLevel=${skillLevel}`
        );
        const data = await res.json();
        setCourses(data.courses || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error
        );
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [currentPage, search, category, skillLevel]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Available Courses
      </h1>
      <Link
        href="/courses/create"
        className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
      >
        Create New Course
      </Link>
      <SearchAndFilter
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSkillLevelChange={setSkillLevel}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
