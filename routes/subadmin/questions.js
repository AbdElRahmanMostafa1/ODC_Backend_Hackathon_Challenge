const router = require("express").Router();
const Question = require("../../models/Question");

router.post("/", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
