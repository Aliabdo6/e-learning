import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Course from "../../../models/Course";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page =
    parseInt(searchParams.get("page")) || 1;
  const pageSize =
    parseInt(searchParams.get("pageSize")) || 9;
  const search = searchParams.get("search") || "";
  const category =
    searchParams.get("category") || "";
  const skillLevel =
    searchParams.get("skillLevel") || "";

  const query = {};
  if (search) query.$text = { $search: search };
  if (category) query.category = category;
  if (skillLevel) query.skillLevel = skillLevel;

  const skip = (page - 1) * pageSize;
  const totalCourses =
    await Course.countDocuments(query);
  const totalPages = Math.ceil(
    totalCourses / pageSize
  );

  const courses = await Course.find(query)
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 });

  return NextResponse.json({
    courses,
    currentPage: page,
    totalPages,
  });
}

// app/api/courses/route.js

export async function POST(req) {
  await dbConnect();
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const data = await req.json();

    // Ensure all required fields are present
    if (
      !data.title ||
      !data.description ||
      !data.category ||
      !data.skillLevel
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const course = await Course.create({
      ...data,
      author: userId,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error(
      "Error creating course:",
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
