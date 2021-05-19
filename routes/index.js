import authRoute from "./Auth";
import userRoute from "./User";
const express = require("express");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
