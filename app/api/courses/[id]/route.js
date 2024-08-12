// app/api/courses/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Course from "../../../../models/Course";
import Lesson from "../../../../models/Lesson";
import { auth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const course = await Course.findById(
      params.id
    ).populate("lessons");
    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  const data = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const course = await Course.findOneAndUpdate(
      { _id: params.id, author: userId },
      data,
      { new: true }
    );
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
