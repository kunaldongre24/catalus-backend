import db from "../db";

const SubjectCourseMapController = {
  getAllMaps(req, res) {},
  createNewMap(req, res) {},
  getMapsBySchoolId(req, res) {},
  getMapsByCourseId(req, res) {
    const sql = `SELECT * FROM courseSubjectMap WHERE courseId ='${req.params.courseId}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  getMapsById(req, res) {},
  async updateMap(req, res) {},
};

export default SubjectCourseMapController;
