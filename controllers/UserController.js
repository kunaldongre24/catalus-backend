import db from "../db";
const bcrypt = require("bcrypt");

const UserController = {
  getAllUsers(req, res) {
    const sql = `SELECT id,name,email,batch_name,standard,board FROM user`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },

  getUserFromUserId(req, res) {
    const sql = `SELECT id,name,email,batch_name,standard,board FROM user WHERE id ='${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },
  searchUser(req, res) {
    const { q } = req.params;
    const sql = `SELECT id,name,batch_name FROM user WHERE (name LIKE '%${q}%' OR id LIKE '${q}%');`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
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
      return res.send(result);
    });
  },
};

export default UserController;
