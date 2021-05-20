import UserController from "../controllers/UserController";
import Auth from "../middleware/Auth";
const express = require("express");
const router = express.Router();

router.get("/", Auth, UserController.getAllUsers);

router.get("/:username", UserController.getUser);

router.put("/:userId", UserController.updateUser);

module.exports = router;
