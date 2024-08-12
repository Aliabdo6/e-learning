import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  enrolledCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      progress: { type: Number, default: 0 },
      completedLessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
      ],
    },
  ],
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);

// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   enrolledCourses: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//     },
//   ],
// });

// export default mongoose.models.User ||
//   mongoose.model("User", UserSchema);
