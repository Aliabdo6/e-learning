import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    skillLevel: { type: String, required: true },
    author: { type: String, required: true },
    featured: { type: Boolean, default: false },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);

// import mongoose from "mongoose";

// const CourseSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     category: { type: String, required: true },
//     skillLevel: { type: String, required: true },
//     author: { type: String, required: true },
//     featured: { type: Boolean, default: false },
//     lessons: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Lesson",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Course ||
//   mongoose.model("Course", CourseSchema);
