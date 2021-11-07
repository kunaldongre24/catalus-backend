const UserController = require("../controllers/UserController");
const auth = require("../middleware/Auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, UserController.getAllUsers);

router.get("/id/:id", UserController.getUserFromUserId);

router.get("/search", UserController.searchUser);

router.get("/batchmate", UserController.getBatchMates);

router.put("/:userId", auth, UserController.updateUser);

module.exports = router;
