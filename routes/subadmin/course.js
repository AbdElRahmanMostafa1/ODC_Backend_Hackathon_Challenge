const router = require("express").Router();
const Course = require("../../models/Course");
const { successFunction, rejectFun } = require("../../utils/successResponce");

router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).send({ course, ...successFunction("New Course is set") });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("categoryId");
    res.status(200).send({ course, ...successFunction("get course") });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send(rejectFun("Course Not FOund"));
    }
    await course.updateOne({ $set: req.body });
    res.status(200).send({ course, ...successFunction("course updated") });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ error, ...rejectFun("Course Not FOund") });
    }
    res.status(200).send(`course Deleted`);
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

module.exports = router;
