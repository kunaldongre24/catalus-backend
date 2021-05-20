require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
import createError from "http-errors";
import indexRouter from "./routes/index";
import compression from "compression";
import logger from "morgan";
import db from "./db";
import bodyParser from "body-parser";
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/", indexRouter);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
