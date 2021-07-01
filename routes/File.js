import FileController from "../controllers/FileController";
import AuthRedirect from "../middleware/AuthRedirect";
const express = require("express");
const router = express.Router();

router.post("/image", AuthRedirect, FileController.uploadImage);

module.exports = router;
