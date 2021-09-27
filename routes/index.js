import authRoute from "./Auth";
import userRoute from "./User";
import fileRoute from "./File";
const express = require("express");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/upload", fileRoute);
router.use("/user", userRoute);

module.exports = router;
