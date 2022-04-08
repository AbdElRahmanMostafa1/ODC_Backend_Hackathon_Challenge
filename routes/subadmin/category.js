const router = require("express").Router();
const Category = require("../../models/Category");
const { successFunction, rejectFun } = require("../../utils/successResponce");

router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send({ category, ...successFunction(`Category Created`) });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun() });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .send({ error, ...rejectFun("category not found") });
    }
    res
      .status(200)
      .send({ category, ...successFunction(`Category get successfully!`) });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun(`Error, Can't Get data`) });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ ...rejectFun("Cat not found") });
    }
    await category.updateOne({ $set: req.body });
    res.status(200).send({ category, ...successFunction(`category Updated`) });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun(`Error`) });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ ...rejectFun("Cat not found") });
    }
    res.status(200).send({ ...successFunction(`Deleted Succesfully`) });
  } catch (error) {
    res.status(400).send({ error, ...rejectFun(`Error`) });
  }
});

module.exports = router;
