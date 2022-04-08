const express = require("express");
const morgan = require("morgan");
const { student, admin, subAdmin } = require("./middleware/auth");

// Config
require("dotenv").config();
require("./db/db");

// Constants
const app = express();
const PORT = process.env.PORT;
const route = process.env.ROUTE_API;

// Routes
// Login Route
const loginRoute = require("./routes/login");

// Admin Routes
const authAdminRoute = require("./routes/admin/auth");
const adminRoute = require("./routes/admin/admin");
const enrolledUsersRoute = require("./routes/admin/allEnrolledUsers");

// SUBAdmin Routes
const categorySubAdminRoute = require("./routes/subadmin/category");
const courseSubAdminRoute = require("./routes/subadmin/course");
const subAdminRoute = require("./routes/admin/subAdmin");
const studentSubAdminRoute = require("./routes/subadmin/students");
const examSubAdminRoute = require("./routes/subadmin/exam");
const questionSubAdminRoute = require("./routes/subadmin/questions");

// Student Routes
const authRoute = require("./routes/students/auth");
const allCoursesRoute = require("./routes/students/courses");
const enrollRoute = require("./routes/students/enroll");
const studentRoute = require("./routes/students/student");
const Student = require("./models/Student");

// Middlewares
app.use(express.json());
app.use(morgan("short"));

// Login Route
app.use(`${route}/login`, loginRoute);

// Student Routes
app.use(`${route}`, authRoute);
app.use(`${route}/student`, student, studentRoute);
app.use(`${route}/courses`, student, allCoursesRoute);
app.use(`${route}/enroll`, student, enrollRoute);

// Sub Admin Routes
app.use(`${route}/subadmin/category`, subAdmin, categorySubAdminRoute);
app.use(`${route}/subadmin/course`, subAdmin, courseSubAdminRoute);
app.use(`${route}/subadmin/students`, subAdmin, studentSubAdminRoute);
app.use(`${route}/subadmin/exam`, subAdmin, examSubAdminRoute);
app.use(`${route}/subadmin/question`, subAdmin, questionSubAdminRoute);

// Admin Routes
app.use(`${route}/admin`, authAdminRoute);
app.use(`${route}/admin`, admin, adminRoute);
app.use(`${route}/admin/subadmin`, admin, subAdminRoute);
app.use(`${route}/admin/enrolledstudents`, admin, enrolledUsersRoute);

// Run Server
app.listen(PORT, () =>
  console.log(`Your Server is running on localhost:${PORT}`)
);

// ng Rock
// NPM passport local
// express jwt
