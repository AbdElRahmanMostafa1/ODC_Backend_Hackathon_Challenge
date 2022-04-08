const mongoose = require("mongoose");
const Question = require("./Question");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    level: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("remove", async function (next) {
  await Question.deleteMany({ courseId: this._id });
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
