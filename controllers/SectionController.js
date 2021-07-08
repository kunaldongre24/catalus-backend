import db from "../db";

const SectionController = {
  getSectionByCourseId(req, res) {
    const sql = `SELECT * FROM section WHERE course_id='${req.params.courseId}' ORDER BY section_index ASC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },
  createNewSection(req, res) {
    const { name, course_id, section_index } = req.body;
    const sectionInfo = req.body;
    if (!name || !course_id || !section_index) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      if (section_index === 1) {
        const updateIndex = `UPDATE section SET section_index = section_index+1 WHERE course_id=?`;
        db.query(updateIndex, [course_id]);
      }
      const sql = `INSERT INTO section SET ?`;
      db.query(sql, sectionInfo, (err, result) => {
        if (err) throw err;
        if (result) {
          const sql = `UPDATE course SET section_count = section_count+1 WHERE id=?`;
          db.query(sql, [course_id]);
          return res.send({ success: true });
        }
      });
    }
  },
  updateSection(req, res) {
    const { sectionId } = req.params;
    const { name, course_id, section_index } = req.body;
    const sectionInfo = req.body;
    if (!name || !course_id || !section_index) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      const sql = `UPDATE section SET ? WHERE id='${sectionId}'`;
      db.query(sql, [sectionInfo], (err, result) => {
        if (err) throw err;
        if (result) {
          return res.send({ success: true });
        }
      });
    }
  },
  deleteSection(req, res) {
    const { sectionId } = req.params;
    const sql = `SELECT section_index, course_id FROM section WHERE id=${sectionId}`;
    db.query(sql, (err, sectionResult) => {
      const sql = `DELETE FROM section WHERE id=${sectionId}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        if (result) {
          const updateIndex = `UPDATE section SET section_index = section_index-1 WHERE section_index>${sectionResult[0].section_index} and course_id=${sectionResult[0].course_id}`;
          db.query(updateIndex);
          return res.send({ success: true });
        }
      });
    });
  },
};

export default SectionController;
