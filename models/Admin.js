const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Provide Email correctly");
      },
    },
    image: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(value) {
        if (value.length < 6) throw new Error("Password is at least 6 chars");
      },
    },
    isSubAdmin: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

adminSchema.statics.findByCredentials = async function (email, password) {
  const message = "Email or Password is incorrect";
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error(message);
  const isPassMatch = await bcrypt.compare(password, admin.password);
  if (!isPassMatch) throw new Error(message);
  return admin;
};

adminSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

adminSchema.methods.toJSON = function () {
  const adminObject = this.toObject();

  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
