const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

const student = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded._id);
    if (!student || !token) throw new Error();
    req.student = student;
    res.token = token;
    next();
  } catch (error) {
    res.status(401).send("Please Auth as student");
  }
};

const admin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded._id);
    if (!admin || !token) throw new Error();

    if (!admin.isSubAdmin) {
      req.admin = admin;
      res.token = token;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).send("Please Auth as ADMIN");
  }
};

const subAdmin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const subAdmin = await Admin.findById(decoded._id);
    if (!subAdmin || !token) throw new Error();

    if (subAdmin.isSubAdmin) {
      req.subAdmin = admin;
      res.token = token;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).send("Please Auth as SubAdmin");
  }
};

module.exports = { student, admin, subAdmin };
