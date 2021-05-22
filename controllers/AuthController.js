import db from "../db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const AuthController = {
  signup(req, res) {
    const user = req.body;
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      const checkUser = `SELECT * FROM user WHERE email=? OR username=?`;
      db.query(checkUser, [email, username], async (err, result) => {
        try {
          if (err) return res.sendStatus(400);
          if (result[0] && result[0].email === email) {
            return res.send({
              err: "An account already exists with this email",
            });
          } else if (result[0] && result[0].username === username) {
            return res.send({
              err: "An account already exists with this username",
            });
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
            const sql = `INSERT INTO user SET ?`;
            db.query(sql, user, (err, result) => {
              if (err) throw err;
              req.session.user = username;
              res.send(result);
            });
          }
        } catch {
          return res.sendStatus(500).send();
        }
      });
    }
  },

  login(req, res) {
    const { user, password } = req.body;
    //checking if input field is not empty
    if (!user || !password) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      const sql = `SELECT * FROM user WHERE email=? OR username=?`;
      db.query(sql, [user, user], (err, result) => {
        if (err) return res.send({ err: err });
        //checking if username exists
        if (!result[0]) {
          return res.send({ err: "Username or password is incorrect" });
        } else {
          //comparing the password
          if (!bcrypt.compare(password, result[0].password)) {
            return res.send({ err: "Username or password is incorrect" });
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
            req.session.user = username;
            res.send({ login: "success" });
          }
        }
      });
    }
  },
  logout(req, res) {
    try {
      req.session.destroy();
      res.clearCookie("user");
      res.send("logged out successfully!");
    } catch (err) {
      res.send(err);
    }
  },
};

export default AuthController;
