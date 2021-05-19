import db from "../db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const AuthController = {
  signup(req, res) {
    const user = req.body;
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).send({ message: "Input field cannot be empty" });
    } else {
      const checkUser = `SELECT * FROM user WHERE email=? OR username=?`;
      db.query(checkUser, [email, username], async (err, result) => {
        if (err) console.log(err);

        if (result[0].email === email) {
          return res.send({
            message: "An account already exists with this email",
          });
        } else if (result[0].username === username) {
          return res.send({
            message: "An account already exists with this username",
          });
        } else {
          try {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
            const sql = `INSERT INTO user SET ?`;
            db.query(sql, user, (err, result) => {
              if (err) throw err;
              res.send(result);
            });
          } catch {
            res.status(500).send();
          }
        }
      });
    }
  },

  login(req, res) {
    const { username, email, password } = req.body;
    if (!(username || email) || !password) {
      res.status(400).send({ message: "Input field cannot be empty" });
    } else {
      const sql = "SELECT * FROM user WHERE email=? OR username=?";
      db.query(sql, [email, username], (err, result) => {
        if (err) console.log(err);
        if (!result[0]) {
          res.send({ message: "Username or password is incorrect" });
        } else {
          if (!bcrypt.compare(password, result[0].password)) {
            res.send({ message: "Username or password is incorrect" });
          } else {
            const { id, username } = result[0];
            console.log(process.env.JWT_SECRET);
            const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
            });
            console.log(`the token is : ${token}`);
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookieOptions);
            res.status(200).send("logged in");
          }
        }
      });
    }
  },
};

export default AuthController;
