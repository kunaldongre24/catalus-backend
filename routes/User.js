import UserController from "../controllers/UserController";
const express = require("express");
const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:username", UserController.getUser);

router.put("/:userId", UserController.updateUser);

module.exports = router;
