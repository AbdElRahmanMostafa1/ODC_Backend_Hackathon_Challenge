const router = require("express").Router();
const Student = require("../../models/Student");
const { successFunction, rejectFun } = require("../../utils/successResponce");

router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find({});
    res.status(200).send({ allStudents, ...successFunction("All Students") });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res
      .status(200)
      .send({ student, ...successFunction("get single student ") });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
