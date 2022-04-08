const router = require("express").Router();
const Enroll = require("../../models/Enroll");
const Question = require("../../models/Question");
const Student = require("../../models/Student");
const {
  randomNumber,
  randomArrayShuffle,
} = require("../../utils/randomNumber");
const { successFunction, rejectFun } = require("../../utils/successResponce");

router.post("/", async (req, res) => {
  try {
    if (req.student.coursesCount < 1) {
      const enroll = await Enroll({
        studentId: req.student._id,
        ...req.body,
      });
      await enroll.save();
      await Student.findByIdAndUpdate(req.student._id, {
        $push: { courses: req.body.courseId },
      });
      return res
        .status(201)
        .send({ enroll, ...successFunction(`Enrolled in successfully`) });
    } else {
      return res.status(400).send(`Only One Course is Available`);
    }
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

router.post("/getexam", async (req, res) => {
  try {
    if (req.student.accessExamCode) {
      if (req.student.accessExamCode == req.body.accessExamCode) {
        const questions = await Question.find({});
        const randQues = randomArrayShuffle(
          questions,
          randomNumber(req.student.accessExamCode) / 200
        ).slice(0, 10);

        return res
          .status(200)
          .send({ randQues, ...successFunction(`Questions to answer`) });
      } else {
        return res
          .status(400)
          .send(rejectFun(`Please Check the code then try again`));
      }
    } else {
      return res.status(400).send(rejectFun("Exam code has been expired"));
    }
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

module.exports = router;
