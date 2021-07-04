import FileController from "../controllers/FileController";
import AuthRedirect from "../middleware/AuthRedirect";
import { v4 as uuidv4 } from "uuid";
const express = require("express");
const router = express.Router();
const multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/media/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const mt = file.mimetype;
  if (
    mt === "image/jpeg" ||
    mt === "image/jpg" ||
    mt === "image/png" ||
    mt === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/singleFile", upload.single("image"), FileController.uploadFile);

module.exports = router;
