import db from "../db";

const LectureController = {
  getLecturesBySectionId(req, res) {
    const sql = `SELECT * FROM lecture WHERE section_id='${req.params.sectionId}' ORDER BY lecture_index ASC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },
  createNewLecture(req, res) {
    const { name, section_id, lecture_index } = req.body;
    const lectureInfo = req.body;
    if (!name || !section_id || !lecture_index) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      if (lecture_index === 1) {
        const updateIndex = `UPDATE lecture SET lecture_index = lecture_index+1 WHERE section_id=?`;
        db.query(updateIndex, [section_id]);
      }
      const sql = `INSERT INTO lecture SET ?`;
      db.query(sql, lectureInfo, (err, result) => {
        if (err) throw err;
        if (result) {
          const sql = `UPDATE section SET lecture_count = lecture_count+1 WHERE id=?`;
          db.query(sql, [section_id]);
          return res.send({ success: true });
        }
      });
    }
  },
  updateLecture(req, res) {
    const { lectureId } = req.params;
    const { name, section_id } = req.body;
    const lectureInfo = req.body;
    if (!name || !section_id) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      const sql = `UPDATE lecture SET ? WHERE id=${lectureId}`;
      db.query(sql, lectureInfo, (err, result) => {
        if (err) throw err;
        if (result) {
          return res.send({ success: true });
        }
      });
    }
  },
  deleteLecture(req, res) {
    const { lectureId } = req.params;
    const sql = `SELECT lecture_index, section_id FROM lecture WHERE id=${lectureId}`;
    db.query(sql, (err, lectureResult) => {
      const sql = `DELETE FROM lecture WHERE id=${lectureId}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        if (result) {
          const updateIndex = `UPDATE lecture SET lecture_index = lecture_index-1 WHERE lecture_index>${lectureResult[0].lecture_index} and section_id=${lectureResult[0].section_id}`;
          db.query(updateIndex);
          return res.send({ success: true });
        }
      });
    });
  },
};

export default LectureController;
