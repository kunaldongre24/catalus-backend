require("dotenv").config();
const express = require("express");
const app = express();
import createError from "http-errors";
import indexRouter from "./routes/index";
import compression from "compression";
import logger from "morgan";
import cookieParser from "cookie-parser";
import db from "./db";
var cors = require("cors");

const { PORT } = process.env;

app.disable("etag");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
); // Use this after the variable declaration

app.use(cookieParser());
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const user = req.cookies.c_id;
  try {
    if (user) {
      const sql = "SELECT * FROM user WHERE id=?";
      db.query(sql, user, (err, result) => {
        if (err) return res.sendStatus(400);
        if (!result.length) {
          res.clearCookie("c_id");
        }
      });
    }
  } catch (err) {
    throw err;
  }
  next();
});

app.use("/api/v1/", indexRouter);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

const port = PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
