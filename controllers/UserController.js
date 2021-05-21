import db from "../db";
const bcrypt = require("bcrypt");

const UserController = {
  getAllUsers(req, res) {
    const sql = `SELECT * FROM user`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
      console.log(res.locals);
    });
  },

  getUser(req, res) {
    const sql = `SELECT * FROM user WHERE username ='${req.params.username}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },

  async updateUser(req, res) {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const user = req.body;
    const sql = `UPDATE user SET ? WHERE id = '${req.params.userId}'`;
    db.query(sql, user, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};

export default UserController;
