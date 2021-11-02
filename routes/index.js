import authRoute from "./Auth";
import userRoute from "./User";
import staffRoute from "./Staff";
import fileRoute from "./File";
import batchRoute from "./Batch";
const express = require("express");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/upload", fileRoute);
router.use("/user", userRoute);
router.use("/staff", staffRoute);
router.use("/batch", batchRoute);
router.use("/subject", batchRoute);

module.exports = router;
