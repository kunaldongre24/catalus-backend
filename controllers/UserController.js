import db from "../db";
const bcrypt = require("bcrypt");

const UserController = {
  getAllUsers(req, res) {
    const sql = `SELECT id,name,email,batch_name,standard,board,profile_img_url FROM user`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },

  getUserFromUserId(req, res) {
    const sql = `SELECT id,name,email,batch_name,standard,board,profile_img_url FROM user WHERE id ='${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },
  getBatchMates(req, res) {
    const { batch_name, standard, id } = req.query;
    const sql = `SELECT id,name,batch_name,profile_img_url FROM user WHERE (batch_name=${batch_name} OR standard=${standard})AND id!=${id} order by case 
    when batch_name=${batch_name} then 1 
    when standard=${standard} then 2 
    else 3 
end;`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },
  searchUser(req, res) {
    const q = req.query.s;
    const sql = `SELECT id,name,batch_name,profile_img_url FROM user WHERE (name LIKE '%${q}%' OR id LIKE '${q}%' OR email '${q}%' OR username LIKE '${q}%' ) order by case 
    when name LIKE '${q}%' then 1 
    when name LIKE '%${q}' then 2
    else 3
end;`;
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
