import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const Lesson =
  mongoose.models.Lesson ||
  mongoose.model("Lesson", LessonSchema);
export default Lesson;
