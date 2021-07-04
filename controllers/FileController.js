import db from "../db";
import { v4 as uuidv4 } from "uuid";
var path = require("path");

const FileController = {
  uploadImage(req, res) {
    if (req.files === null) {
      return res.json({ err: "No file uploaded" });
    }
    const file = req.files.file;
    const fileExtension = path.extname(file.name);
    console.log(`${uuidv4()}.${fileExtension}`);
    file.mv(
      `${__dirname}/public/uploads/${uuidv4()}.${fileExtension}`,
      (err) => {
        if (err) console.error(err);
        return res.sendStatus(500);
      }
    );
    res.json({
      fileName: file.name,
      filePath: `uploads/${uuidv4()}.${fileExtension}`,
    });
  },
};
export default FileController;
