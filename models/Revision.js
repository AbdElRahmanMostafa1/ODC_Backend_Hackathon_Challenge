const mongoose = require("mongoose");

const revisionSchema = mongoose.Schema({
  studentDegree: {
    type: Number,
  },
  totalRightDegree: {
    type: Number,
  },
  totalWrongDegree: {
    type: Number,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

const Revision = mongoose.model("Revision", revisionSchema);

module.exports = Revision;
