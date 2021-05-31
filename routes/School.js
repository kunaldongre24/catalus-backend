import SchoolController from "../controllers/SchoolController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/", AuthRedirect, SchoolController.getAllSchools);

router.get("/:username", SchoolController.getSchoolByUsername);

router.get("/id/:id", SchoolController.getSchoolBySchoolId);

router.put("/:userId", AuthRedirect, SchoolController.updateSchool);

module.exports = router;
