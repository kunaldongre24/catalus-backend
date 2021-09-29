import StaffController from "../controllers/StaffController";
const express = require("express");
const router = express.Router();

router.get("/", StaffController.getAllStaff);

router.get("/id/:id", StaffController.getStaffById);

module.exports = router;
