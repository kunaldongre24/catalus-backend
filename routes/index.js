import authRoute from "./Auth";
import userRoute from "./User";
import activityRoute from "./Activity";
import schoolRoute from "./School";
import courseRoute from "./Course";
import subjectRoute from "./Subject";
import subjectCourse from "./SubjectCourseMap";
const express = require("express");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/school", schoolRoute);
router.use("/activity", activityRoute);
router.use("/course", courseRoute);
router.use("/subject", subjectRoute);
router.use("/subjectCourseMap", subjectCourse);

module.exports = router;
