import db from "../db";

const SubjectController = {
  getAllSubjects(req, res) {
    const sql = `SELECT * FROM subject`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  createNewSubject(req, res) {
    const { name } = req.body;
    const subjectInfo = req.body;
    if (!name || !schoolId) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      const checkSubject = `SELECT * FROM subject WHERE name=?`;
      db.query(checkSubject, [name], async (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          return;
        } else {
          const sql = `INSERT INTO subject SET ?`;
          db.query(sql, subjectInfo, (err, result) => {
            if (err) throw err;
            if (result) {
              // result.insertId TODO to be inserted in subject
            }
          });
        }
      });
    }
  },
  getSubjectByName(req, res) {},
  getSubjectById(req, res) {
    const sql = `SELECT * FROM subject WHERE id ='${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  async updateSubject(req, res) {},
};

export default SubjectController;
