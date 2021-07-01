import db from "../db";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
var path = require("path");

const FileController = {
  uploadImage(req, res) {
    if (req.body.file) {
      var buff = Buffer.from(
        req.body.file.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/, ""),
        "base64"
      );
      console.log(buff);
      fs.writeFile(`${__dirname}/out.jpg`, buff, function (err) {
        return console.log("done");
      });
    }
  },
};
export default FileController;
