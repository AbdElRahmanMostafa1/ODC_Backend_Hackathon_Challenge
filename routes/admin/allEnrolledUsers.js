const router = require("express").Router();
const Enroll = require("../../models/Enroll");
const Student = require("../../models/Student");
const sendEmail = require("./Email");
const cron = require("node-cron");
const { successFunction, rejectFun } = require("../../utils/successResponce");

router.get("/", async (req, res) => {
  try {
    const allEnrolledUsers = await Enroll.find({}).populate([
      "studentId",
      "courseId",
    ]);
    res
      .status(200)
      .send({ allEnrolledUsers, ...successFunction("All Enrolled in users") });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const enrolledUsers = await Enroll.find({}).populate([
      "studentId",
      "courseId",
    ]);
    const student = enrolledUsers.find(
      (enrolledStudent) => (enrolledStudent._id = req.params.id)
    );

    cron.schedule("*/10 * * * * *", async () => {
      await Student.findByIdAndUpdate(student.studentId._id, {
        $set: { examSecretCode: [], accessExamCode: 0 },
      });
    });

    if (student) {
      if (student.studentId.examSecretCode.length === 0) {
        const secret = Math.trunc(Math.random() * 10000);
        await sendEmail(student.studentId.email, `${secret}`);
        console.log(secret);
        await Student.findByIdAndUpdate(student.studentId._id, {
          $push: { examSecretCode: secret },
          $set: { accessExamCode: secret },
        });

        return res.status(200).send(successFunction("Mail Sent Successfully!"));
      } else {
        return res
          .status(400)
          .send(rejectFun(`Secret code has already been sent`));
      }
    } else {
      return res.status(400).send(rejectFun("No Student Found!"));
    }
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

module.exports = router;
