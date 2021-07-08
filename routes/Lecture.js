import LectureController from "../controllers/LectureController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get(
  "/:sectionId",
  AuthRedirect,
  LectureController.getLecturesBySectionId
);

router.post("/", AuthRedirect, LectureController.createNewLecture);

router.put("/:lectureId", AuthRedirect, LectureController.updateLecture);

router.delete("/:lectureId", AuthRedirect, LectureController.deleteLecture);

module.exports = router;
