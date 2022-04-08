const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Enroll = require("./Enroll");

const studentSchema = mongoose.Schema(
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
    phone: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, ["ar-EG"])) {
          throw new Error("Add Phone number correctly");
        }
      },
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(value) {
        if (value.length < 6) throw new Error("Password is at least 6 chars");
      },
    },
    haveWork: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["no Course Selected", "pending", "accepted", "rejected"],
      default: "no Course Selected",
    },
    accessExamCode: {
      type: Number,
      default: 0,
    },
    examSecretCode: [
      {
        type: Number,
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],
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

// Limit enrolled courses to 1
studentSchema.virtual("coursesCount").get(function () {
  return this.courses.length;
});

// Hashing Pass
studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Login
studentSchema.statics.findByCredentials = async function (email, password) {
  const message = "Email or Password is incorrect";
  const student = await Student.findOne({ email });
  if (!student) throw new Error(message);
  const isPassMatch = await bcrypt.compare(password, student.password);
  if (!isPassMatch) throw new Error(message);
  return student;
};

// Generate Token
studentSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

// Delete Enrolled in course on deleting account
studentSchema.pre("remove", async function (next) {
  await Enroll.deleteMany({ studentId: this._id });
  next();
});

// delete sensitive info
studentSchema.methods.toJSON = function () {
  const studentObject = this.toObject();

  delete studentObject.password;
  delete studentObject.tokens;
  delete studentObject.examSecretCode;
  delete studentObject.accessExamCode;

  return studentObject;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
