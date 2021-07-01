import authRoute from "./Auth";
import userRoute from "./User";
import activityRoute from "./Activity";
import courseRoute from "./Course";
import subjectRoute from "./Subject";
import fileRoute from "./File";
import categoryRoute from "./Category";
import subjectCourse from "./SubjectCourseMap";
const express = require("express");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/upload", fileRoute);
router.use("/user", userRoute);
router.use("/activity", activityRoute);
router.use("/course", courseRoute);
router.use("/subject", subjectRoute);
router.use("/category", categoryRoute);
router.use("/subjectCourseMap", subjectCourse);

module.exports = router;
