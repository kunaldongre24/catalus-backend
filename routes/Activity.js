import ActivityController from "../controllers/ActivityController";
const express = require("express");
const router = express.Router();

router.get("/:userId", ActivityController.getActivitiesByUserId);
module.exports = router;
