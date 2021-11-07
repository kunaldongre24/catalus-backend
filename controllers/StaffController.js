const db = require("../db");

const StaffController = {
  getAllStaff(req, res) {
    const sql = `SELECT id,name,email,profile_img_url FROM staff WHERE 1`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },

  getStaffById(req, res) {
    const sql = `SELECT id,name,email,profile_img_url FROM staff WHERE id ='${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },
};

module.exports = StaffController;
