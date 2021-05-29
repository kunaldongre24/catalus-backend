import UserController from "../controllers/UserController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.get("/", AuthRedirect, UserController.getAllUsers);

router.get("/:username", UserController.getUserFromUsername);

router.get("/id/:id", UserController.getUserFromUserId);

router.put("/:userId", AuthRedirect, UserController.updateUser);

module.exports = router;
