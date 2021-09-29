import db from "../db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  signup(req, res) {
    const user = req.body;
    const { name, email, password } = req.body;
    const userData = { email };
    if (!email || !name || !password) {
      return res.send({
        status: 0,
        err: "Input field cannot be empty",
      });
    } else {
      const checkUser = `SELECT * FROM user WHERE email=?`;
      db.query(checkUser, [email], async (err, result) => {
        try {
          if (err) return res.sendStatus(400);
          if (result[0] && result[0].email === email) {
            return res.send({
              status: 0,
              err: "An account already exists with this email",
            });
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
            const sql = `INSERT INTO user SET ?`;
            db.query(sql, user, (err, result) => {
              if (err) throw err;
              // Create token
              const token = jwt.sign(
                { user_id: result._id, email },
                "LKJLFkjdl;kfjdskfjlkjsdklfjdskj%@#$@#$@#4kjkjklejflkjl;jk23klkjlkfjkdlfjlkj"
              );

              // save user token
              userData.id = result.id;
              userData.token = token;
              userData.status = 1;

              res.send(userData);
            });
          }
        } catch {
          return res.sendStatus(500).send();
        }
      });
    }
  },

  login(req, res) {
    const { email, password } = req.body;
    //checking if input field is not empty
    if (!email || !password) {
      return res.send({
        status: 0,
        err: "Input field cannot be empty",
      });
    } else {
      const sql = `SELECT * FROM user WHERE email=?`;
      db.query(sql, email, (err, result) => {
        if (err) throw err;
        //checking if username exists
        if (!result[0]) {
          return res.send({
            status: 0,
            err: "Email or password is incorrect",
          });
        } else {
          //comparing the password
          bcrypt.compare(password, result[0].password, function (err, value) {
            if (err) {
              throw err;
            }
            if (value) {
              const { id, email, name, batch_name, standard, board } =
                result[0];
              // Create token
              const token = jwt.sign(
                { user_id: id, email },
                "LKJLFkjdl;kfjdskfjlkjsdklfjdskj%@#$@#$@#4kjkjklejflkjl;jk23klkjlkfjkdlfjlkj"
              );

              // save user token
              const userData = { id, email, name, batch_name, standard, board };
              // user
              res.send(userData);
            } else {
              return res.send({
                status: 0,
                err: "Email or password is incorrect",
              });
            }
          });
        }
      });
    }
  },

  logout(req, res) {
    try {
      res.clearCookie("c_id");
      res.send({ message: "logged out successfully!" });
    } catch (err) {
      res.send(err);
    }
  },
};

export default AuthController;
