import SchoolController from "../controllers/SchoolController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/", AuthRedirect, SchoolController.getAllSchools);

router.post("/", AuthRedirect, SchoolController.createNewSchool);

router.get("/:userId", SchoolController.getSchoolByUserId);

router.get("/id/:id", SchoolController.getSchoolBySchoolId);

router.put("/:schoolId", AuthRedirect, SchoolController.updateSchool);

module.exports = router;
