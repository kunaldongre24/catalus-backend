import db from "../db";

const SchoolController = {
  getAllSchools(req, res) {
    const sql = `SELECT * FROM school`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  createNewSchool(req, res) {
    const { name, description, privacy } = req.body;
    req.body.ownerId = req.cookies.c_id;
    const schoolInfo = req.body;
    if (!name || !privacy) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      const checkSchool = `SELECT * FROM school WHERE ownerId=? AND name=?`;
      db.query(checkSchool, [req.cookies.c_id, name], async (err, result) => {
        if (result.length > 0) {
          return res.send({
            err: "You already created a school with this name",
          });
        } else {
          const sql = `INSERT INTO school SET ?`;
          db.query(sql, schoolInfo, (err, result) => {
            if (err) throw err;
            res.send({ message: "success" });
          });
        }
      });
    }
  },
  getSchoolByUserId(req, res) {
    const sql = `SELECT * FROM school WHERE ownerId ='${req.params.userId}' ORDER BY school.last_updated DESC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  getSchoolBySchoolId(req, res) {
    const sql = `SELECT * FROM school WHERE id ='${req.params.schoolId}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  async updateSchool(req, res) {
    const user = req.body;
    const sql = `UPDATE school SET ? WHERE id = '${req.params.schoolId}'`;
    db.query(sql, user, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};

export default SchoolController;
