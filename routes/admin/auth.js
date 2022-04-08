const router = require("express").Router();
const Admin = require("../../models/Admin");
const { successFunction, rejectFun } = require("../../utils/successResponce");

// temporary for Development
router.post("/register", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    const token = await admin.generateAuthToken();
    res.status(201).send({ admin, token, ...successFunction("Admin Added") });
  } catch (error) {
    res.status(400).send(rejectFun(error));
  }
});

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();
    res.status(200).send({ admin, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

// mohammed Elsherief
