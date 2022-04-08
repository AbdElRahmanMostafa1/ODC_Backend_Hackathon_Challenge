const router = require("express").Router();
const Admin = require("../../models/Admin");
const { successFunction, rejectFun } = require("../../utils/successResponce");

// Get Admin Info
router.get("/", async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    res.status(201).send({ admin, ...successFunction("Data obtainer") });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun(`Error ocurred`) });
  }
});

// Admin Edit Self account
router.patch("/", async (req, res) => {
  try {
    const allowedUpdates = ["name", "email", "image", "password"];
    const updates = Object.keys(req.body);
    const isAllowedUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isAllowedUpdate)
      return res.status(400).send({ msg: "Not allowed update", reject });
    updates.forEach((update) => (req.admin[update] = req.body[update]));
    await req.admin.save();
    res
      .status(200)
      .send({ admin: req.admin, ...successFunction(`Admin info updated`) });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

module.exports = router;
