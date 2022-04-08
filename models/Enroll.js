const mongoose = require("mongoose");

const enrollSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Enroll = mongoose.model("Enroll", enrollSchema);
module.exports = Enroll;
