require("dotenv").config();
const express = require("express");
const app = express();
import createError from "http-errors";
import indexRouter from "./routes/index";
import compression from "compression";
import logger from "morgan";
import session from "express-session";
import db from "./db";
var cors = require("cors");

const { PORT, SESSION_LIFETIME, SESSION_SECRET, NODE_ENV } = process.env;
const SESS_NAME = "user";
const IN_PROD = NODE_ENV !== "production";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
); // Use this after the variable declaration
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      maxAge: SESSION_LIFETIME * 60 * 60 * 1000,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);
app.use((req, res, next) => {
  const { user } = req.session;
  if (user) {
    const sql = "SELECT * FROM user WHERE username=?";
    db.query(sql, user, (err, result) => {
      if (err) return res.sendStatus(400);
      if (result[0].username === user) {
        res.locals = result[0];
      }
    });
  }
  next();
});
app.use((req, res, next) => {
  if (!req.session.user) {
    res.clearCookie(SESS_NAME);
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
