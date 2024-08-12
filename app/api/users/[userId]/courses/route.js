import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import { auth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = auth();

  if (!userId || userId !== params.userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const user = await User.findOne({
      clerkId: userId,
    }).populate("enrolledCourses.course");
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      user.enrolledCourses
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
