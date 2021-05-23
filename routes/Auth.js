import AuthController from "../controllers/AuthController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.post("/signup", AuthController.signup);

router.post("/login", AuthController.login);

router.get("/logout", AuthRedirect, AuthController.logout);

router.post("/validateusername", AuthController.usernameValidate);

router.post("/validateemail", AuthController.emailValidate);

module.exports = router;
