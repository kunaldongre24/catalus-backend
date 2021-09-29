import BatchController from "../controllers/BatchController";
const auth = require("../middleware/Auth");
const express = require("express");
const router = express.Router();

router.get("/", BatchController.getAllBatch);

router.get("/id/:id", BatchController.getBatchById);

module.exports = router;
