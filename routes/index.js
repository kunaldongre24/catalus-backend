import authRoute from "./Auth";
import userRoute from "./User";
import schoolRoute from "./School";
const express = require("express");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/school", schoolRoute);

module.exports = router;
