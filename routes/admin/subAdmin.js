const router = require("express").Router();
const Admin = require("../../models/Admin");
const { successFunction, rejectFun } = require("../../utils/successResponce");

// Post New SubAdmin as default if subAdmin key is not defined
router.post("/", async (req, res) => {
  try {
    const subAdmin = await new Admin({ ...req.body, isSubAdmin: true });
    await subAdmin.save();
    res.status(201).send({ subAdmin, ...successFunction("SubAdmin Created") });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All SubAdmins
router.get("/", async (req, res) => {
  try {
    const allSubAdmins = await Admin.find({ isSubAdmin: true });
    res.status(200).send({ allSubAdmins, ...successFunction(`All Admin`) });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

// Get Single SubAdmin
router.get("/:id", async (req, res) => {
  try {
    const subAdmin = await Admin.findById(req.params.id);
    if (!subAdmin) {
      return res.status(404).send(rejectFun(`SubAdmin not found`));
    }
    if (subAdmin.isSubAdmin) {
      return res
        .status(200)
        .send({ subAdmin, ...successFunction(`Sub Admin`) });
    } else {
      res.status(404).send({ ...rejectFun("Not a SubAdmin") });
    }
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

// Admin Edit SubAdmin
router.patch("/:id", async (req, res) => {
  try {
    const subAdmin = await Admin.findById(req.params.id);
    if (subAdmin.isSubAdmin) {
      const allowedUpdates = ["isSubAdmin"];
      const updates = Object.keys(req.body);
      const isAllowedUpdate = updates.every((update) =>
        allowedUpdates.includes(update)
      );
      if (!isAllowedUpdate) return res.status(400).send("Not allowed update");
      updates.forEach((update) => (subAdmin[update] = req.body[update]));
      await subAdmin.save();
      return res
        .status(200)
        .send({ subAdmin, ...successFunction("Sub Admin Updated") });
    }
  } catch (error) {
    res.status(400).send({ error, ...rejectFun(`Can't update`) });
  }
});

// Delete SubAdmin
router.delete("/:id", async (req, res) => {
  const subAdmin = await Admin.findById(req.params.id);
  if (!subAdmin) return res.status(404).send(rejectFun(`No subAdmin Found`));
  try {
    if (subAdmin.isSubAdmin) {
      await Admin.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .send(successFunction(`subAdmin Deleted Successfully`));
    } else {
      return res.status(400).send(rejectFun(`Not Sub subAdmin`));
    }
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

module.exports = router;
