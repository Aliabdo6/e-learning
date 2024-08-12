import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Lesson from "../../../../models/Lesson";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
