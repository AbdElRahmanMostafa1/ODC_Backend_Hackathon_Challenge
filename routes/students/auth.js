const router = require("express").Router();
const Student = require("../../models/Student");
const { successFunction, rejectFun } = require(`../../utils/successResponce`);

router.post("/register", async (req, res) => {
  try {
    const student = new Student(req.body);
    const token = await student.generateAuthToken();
    res
      .status(201)
      .send({ student, token, ...successFunction(`Student Registered`) });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const student = await Student.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await student.generateAuthToken();
    res.status(200).send({ student, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

// mohammed Elsherief
