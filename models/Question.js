const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    content: {
      type: String,
    },
    answer: {
      type: Boolean,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.methods.toJSON = function () {
  const questionObject = this.toObject();
  delete questionObject.answer;
  return questionObject;
};

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
