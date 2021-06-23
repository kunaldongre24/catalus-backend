import CourseController from "../controllers/CourseController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/", AuthRedirect, CourseController.getAllCourses);

router.post("/", AuthRedirect, CourseController.createNewCourse);

router.get("/user/:userId", CourseController.getCoursesByUserId);

router.get("/school/:schoolId", CourseController.getCoursesBySchoolId);

router.get("/courseCount/:schoolId", CourseController.courseCount);

router.get("/:courseId", CourseController.getCourseByCourseId);

router.put("/:courseId", AuthRedirect, CourseController.updateCourse);

module.exports = router;
