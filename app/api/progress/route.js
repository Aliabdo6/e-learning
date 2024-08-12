// app/api/progress/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { auth } from "@clerk/nextjs";

export async function POST(req) {
  await dbConnect();
  const { userId } = auth();
  const { courseId, lessonId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const user = await User.findOneAndUpdate(
      {
        clerkId: userId,
        "enrolledCourses.course": courseId,
      },
      {
        $addToSet: {
          "enrolledCourses.$.completedLessons":
            lessonId,
        },
        $inc: { "enrolledCourses.$.progress": 1 },
      },
      { new: true }
    );

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
