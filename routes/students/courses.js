const router = require("express").Router();
const Course = require("../../models/Course");
const { successFunction, rejectFun } = require(`../../utils/successResponce`);

router.get("/", async (req, res) => {
  try {
    const allCourses = await Course.find({}).populate("categoryId");
    const msg = allCourses.length === 0 ? "No courses Yet" : `All Courses`;
    res.status(200).send({ allCourses, ...successFunction(msg) });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

module.exports = router;
