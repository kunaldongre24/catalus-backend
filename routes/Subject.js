import SubjectController from "../controllers/SubjectController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/", AuthRedirect, SubjectController.getAllSubjects);

router.post("/", AuthRedirect, SubjectController.createNewSubject);

router.get("/name/:name", SubjectController.getSubjectByName);

router.get("/:id", SubjectController.getSubjectById);

router.get("/suggestions/:subject", SubjectController.getSuggestions);

router.put("/:id", AuthRedirect, SubjectController.updateSubject);

module.exports = router;
