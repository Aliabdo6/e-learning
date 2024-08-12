// app/api/lessons/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Lesson from "../../../models/Lesson";
import { auth } from "@clerk/nextjs/server";
import Course from "../../../models/Course";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const lessonId = searchParams.get("id");

  if (lessonId) {
    const lesson = await Lesson.findById(
      lessonId
    );
    return NextResponse.json(lesson);
  }

  const lessons = await Lesson.find({
    course: courseId,
  });
  return NextResponse.json(lessons);
}

// export async function GET(req) {
//   await dbConnect();
//   const { searchParams } = new URL(req.url);
//   const courseId = searchParams.get("courseId");

//   const lessons = await Lesson.find({
//     course: courseId,
//   });
//   return NextResponse.json(lessons);
// }

// export async function POST(req) {
//   await dbConnect();
//   const { userId } = auth();
//   const data = await req.json();

//   if (!userId) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     const lesson = await Lesson.create(data);
//     return NextResponse.json(lesson);
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }

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

    if (
      !data.title ||
      !data.content ||
      !data.courseId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const course = await Course.findById(
      data.courseId
    );
    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    if (course.author !== userId) {
      return NextResponse.json(
        {
          error:
            "Unauthorized to add lessons to this course",
        },
        { status: 403 }
      );
    }

    const lesson = await Lesson.create({
      title: data.title,
      content: data.content,
      course: data.courseId,
    });

    course.lessons.push(lesson._id);
    await course.save();

    return NextResponse.json(lesson);
  } catch (error) {
    console.error(
      "Error creating lesson:",
      error
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
