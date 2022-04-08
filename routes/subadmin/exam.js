const router = require("express").Router();
const Exam = require("../../models/Exam");
const { successFunction, rejectFun } = require("../../utils/successResponce");

router.post("/", async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res
      .status(201)
      .send({ ...successFunction(`Exam Created successfully`), exam });
  } catch (error) {
    res
      .status(400)
      .send({ error, ...rejectFun(`Error Occurred in post a new exam`) });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (exam) {
      res.status(200).send({ ...successFunction(`Get Exam success`), exam });
    } else {
      res.status(404).send(rejectFun(`Not Found`));
    }
  } catch (error) {
    res.status(201).send({ error, ...rejectFun(`Error Occurred`) });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (exam) {
      await exam.update(req.body);
      res.status(201).send(exam);
    } else {
      res.status(404).send(rejectFun(`Not Found`));
    }
  } catch (error) {
    res.status(201).send({ error, ...rejectFun(`Error Occurred`) });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (exam) {
      await exam.delete();
      res.status(200).send(successFunction("Exam Deleted"));
    } else {
      res.status(404).send(rejectFun(`Not Found`));
    }
  } catch (error) {
    res.status(201).send({ error, ...rejectFun(`Not Found`) });
  }
});

module.exports = router;
