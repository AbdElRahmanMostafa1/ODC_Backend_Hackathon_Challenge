const mongoose = require("mongoose");
const Course = require("./Course");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("remove", async function () {
  await Course.deleteMany({ categoryId: this._id });
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
