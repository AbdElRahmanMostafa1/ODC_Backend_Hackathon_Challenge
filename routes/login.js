const router = require("express").Router();
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const { successFunction, rejectFun } = require("../utils/successResponce");

router.post("/", async (req, res) => {
  try {
    const adminArray = await Admin.find({ isSubAdmin: false });
    for (let i = 0; i < adminArray.length; i++) {
      if (req.body.email == adminArray[i].email) {
        const getAdmin = await Admin.findByCredentials(
          req.body.email,
          req.body.password
        );
        const token = await getAdmin.generateAuthToken();
        return res.status(200).send({
          getAdmin,
          token,
          ...successFunction("Admin Login Successed"),
        });
      }
    }
    const subAdmin = await Admin.findByCredentials()
    const student = await Student.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await student.generateAuthToken();
    return res
      .status(200)
      .send({ student, token, ...successFunction("Student Login Successed") });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun("login Error") });
  }
});

module.exports = router;
