const authRoute = require("./Auth");
const userRoute = require("./User");
const staffRoute = require("./Staff");
const fileRoute = require("./File");
const batchRoute = require("./Batch");
const express = require("express");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/upload", fileRoute);
router.use("/user", userRoute);
router.use("/staff", staffRoute);
router.use("/batch", batchRoute);
router.use("/subject", batchRoute);

module.exports = router;
