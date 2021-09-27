import UserController from "../controllers/UserController";
const auth = require("../middleware/Auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, UserController.getAllUsers);

router.get("/id/:id", UserController.getUserFromUserId);

router.get("/search/:q", UserController.searchUser);

router.put("/:userId", auth, UserController.updateUser);

module.exports = router;
