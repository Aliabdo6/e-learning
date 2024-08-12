"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdvancedMarkdownEditor from "../../components/AdvancedMarkdownEditor";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] = useState("");
  const [skillLevel, setSkillLevel] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          skillLevel,
        }),
      });

      if (res.ok) {
        const course = await res.json();
        router.push(`/courses/${course._id}`);
      } else {
        const errorData = await res.json();
        setError(
          errorData.error ||
            "An error occurred while creating the course"
        );
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">
        Create New Course
      </h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            {error}
          </span>
        </div>
      )}

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
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <AdvancedMarkdownEditor
          value={description}
          onChange={setDescription}
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="skillLevel"
          className="block text-sm font-medium text-gray-700"
        >
          Skill Level
        </label>
        <select
          id="skillLevel"
          value={skillLevel}
          onChange={(e) =>
            setSkillLevel(e.target.value)
          }
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">
            Select a skill level
          </option>
          <option value="Beginner">
            Beginner
          </option>
          <option value="Intermediate">
            Intermediate
          </option>
          <option value="Advanced">
            Advanced
          </option>
        </select>
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
          : "Create Course"}
      </button>
    </form>
  );
}
