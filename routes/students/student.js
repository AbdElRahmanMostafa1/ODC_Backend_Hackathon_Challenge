const router = require(`express`).Router();
const Student = require("../../models/Student");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(req.student);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/", async (req, res) => {
  const student = await Student.findById(req.student._id);
  try {
    const allowedUpdates = [
      "name",
      "email",
      "phone",
      "address",
      "password",
      "haveWork",
    ];
    const updates = Object.keys(req.body);
    const isAllowedUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isAllowedUpdate) return res.status(400).send(`Not Allowed Update`);
    updates.forEach((update) => (student[update] = req.body[update]));
    await student.save();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Acount
router.delete("/", async (req, res) => {
  try {
    await req.student.remove();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
