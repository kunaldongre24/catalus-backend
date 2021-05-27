import db from "../db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
              console.log(result);
              req.session.user = result.insertId;
              res.send({ message: "success" });
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
      return res.send({ login: false, err: "Input field cannot be empty" });
    } else {
      const sql = `SELECT * FROM user WHERE email=? OR username=?`;
      db.query(sql, [user, user], (err, result) => {
        if (err) return res.send({ err: err });
        //checking if username exists
        if (!result[0]) {
          return res.send({
            login: false,
            err: "Username or password is incorrect",
          });
        } else {
          //comparing the password
          bcrypt.compare(password, result[0].password, function (err, value) {
            if (err) {
              throw err;
            }
            if (value) {
              const { id } = result[0];

              req.session.user = id;
              res.send({ login: true, user: result[0] });
            } else {
              return res.send({
                login: false,
                err: "Username or password is incorrect",
              });
            }
          });
        }
      });
    }
  },

  // TODO make a different function validating files nad
  usernameValidate(req, res) {
    if (req.body.username) {
      const { username } = req.body;
      const usernameRegexp =
        /^(?=[a-zA-Z0-9._]{0,39}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      if (usernameRegexp.test(username)) {
        const sql = `SELECT * FROM user WHERE username=?`;
        db.query(sql, [username], (err, result) => {
          if (err) return res.send({ err: err });
          if (result.length > 0) {
            return res.send({
              username,
              valid: false,
              message: "username is not available",
            });
          } else {
            res.send({
              username,
              valid: true,
              message: "username is available",
            });
          }
        });
      } else if (username.length > 39 || username.length < 2) {
        return res.send({
          username,
          valid: false,
          message:
            "Username should contain min of 2 characters max of 39 characters",
        });
      } else {
        return res.send({
          username,
          valid: false,
          message:
            "Username may only contain alphanumeric characters,single underscore or period, and cannot begin or end with a underscore or period.",
        });
      }
    } else {
      res.send({
        username: "1",
        valid: false,
        message: "username cannot be left empty",
      });
    }
  },
  emailValidate(req, res) {
    if (req.body.email) {
      const { email } = req.body;
      const emailRegexp =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegexp.test(email)) {
        const sql = `SELECT * FROM user WHERE email=?`;
        db.query(sql, [email], (err, result) => {
          if (err) return res.send({ err: err });
          if (result.length > 0) {
            return res.send({
              email,
              valid: false,
              message: "email is invalid or already not available",
            });
          } else {
            res.send({ email, valid: true, message: "email is available" });
          }
        });
      } else {
        return res.send({
          email,
          valid: false,
          message: "email is invalid or already taken",
        });
      }
    } else {
      return res.send({
        email: "1",
        valid: false,
        message: "email cannot be left empty",
      });
    }
  },
  logout(req, res) {
    try {
      req.session.destroy();
      res.clearCookie("user");
      res.send({ message: "logged out successfully!" });
    } catch (err) {
      res.send(err);
    }
  },
  checkLogin(req, res) {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  },
};

export default AuthController;
