import AuthController from "../controllers/AuthController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.get("/logout", AuthRedirect, AuthController.logout);

module.exports = router;
