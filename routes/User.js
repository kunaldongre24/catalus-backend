import UserController from "../controllers/UserController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/", AuthRedirect, UserController.getAllUsers);

router.get("/:username", UserController.getUser);

router.put("/:userId", UserController.updateUser);

module.exports = router;
