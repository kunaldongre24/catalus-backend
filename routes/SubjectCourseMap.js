import SubjectCourseMapController from "../controllers/SubjectCourseMapController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/", AuthRedirect, SubjectCourseMapController.getAllMaps);

router.post("/", AuthRedirect, SubjectCourseMapController.createNewMap);

router.get("/school/:schoolId", SubjectCourseMapController.getMapsBySchoolId);

router.get("/course/:courseId", SubjectCourseMapController.getMapsByCourseId);

router.get("/:id", SubjectCourseMapController.getMapsById);

router.put("/:id", AuthRedirect, SubjectCourseMapController.updateMap);

module.exports = router;
