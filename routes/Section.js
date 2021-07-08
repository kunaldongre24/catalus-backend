import SectionController from "../controllers/SectionController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/:courseId", AuthRedirect, SectionController.getSectionByCourseId);

router.post("/", AuthRedirect, SectionController.createNewSection);

router.put("/:sectionId", AuthRedirect, SectionController.updateSection);

router.delete("/:sectionId", AuthRedirect, SectionController.deleteSection);

module.exports = router;
