import db from "../db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const AuthController = {
  signup(req, res) {
    const user = req.body;
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res
        .sendStatus(400)
        .send({ message: "Input field cannot be empty" });
    } else {
      const checkUser = `SELECT * FROM user WHERE email=? OR username=?`;
      db.query(checkUser, [email, username], async (err, result) => {
        if (err) return res.sendStatus(400);

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
            res.sendStatus(500).send();
          }
        }
      });
    }
  },

  login(req, res) {
    const { username, email, password } = req.body;
    //checking if input field is not empty
    if (!(username || email) || !password) {
      res.sendStatus(400).send({ message: "Input field cannot be empty" });
    } else {
      const sql = "SELECT * FROM user WHERE email=? OR username=?";
      db.query(sql, [email, username], (err, result) => {
        if (err) return res.sendStatus(400);
        //chcking if username exists
        if (!result[0]) {
          res.send({ message: "Username or password is incorrect" });
        } else {
          //comparing the password
          if (!bcrypt.compare(password, result[0].password)) {
            res.send({ message: "Username or password is incorrect" });
          } else {
            const { id, username } = result[0];
            //assigning the token
            const token = jwt.sign(
              { id, username },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
              }
            );

            //sending jwt to header
            res.header("accessToken", token).send(token);
          }
        }
      });
    }
  },
};

export default AuthController;
