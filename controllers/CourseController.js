import db from "../db";
import { SubjectCourseMapController as SCMap } from "./SubjectCourseMapController";

const CourseController = {
  getAllCourses(req, res) {
    const sql = `SELECT * FROM course`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  createNewCourse(req, res) {
    const { name, description, schoolId, subjects } = req.body;
    const courseInfo = { name, description, schoolId };
    if (!name || !schoolId) {
      return res.send({ err: "Input field cannot be empty" });
    } else {
      const checkCourse = `SELECT * FROM course WHERE schoolId=? AND name=?`;
      db.query(checkCourse, [schoolId, name], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          return res.send({
            err: "You already created a course with this name",
          });
        } else {
          const sql = `INSERT INTO course SET ?`;
          db.query(sql, courseInfo, (err, courseResult) => {
            if (err) throw err;
            if (courseResult) {
              for (var i = 0; i < subjects.length; i++) {
                const subject = subjects[i];
                const checkSubject = `SELECT * FROM subject WHERE name=?`;
                db.query(checkSubject, subject, (err, subjectResult) => {
                  if (err) throw err;
                  var courseSubjectMap;
                  if (subjectResult.length > 0) {
                    courseSubjectMap = {
                      subjectId: subjectResult[0].id,
                      courseId: courseResult.insertId,
                    };
                    const checkMap = `SELECT * FROM courseSubjectMap WHERE subjectId=? AND courseId=?`;

                    db.query(
                      checkMap,
                      [subjectResult[0].id, courseResult.insertId],
                      (err, mapResult) => {
                        if (mapResult.length > 0) {
                          return;
                        } else {
                          const sql = `INSERT INTO courseSubjectMap SET ?`;
                          db.query(
                            sql,
                            courseSubjectMap,
                            (err, courseResult) => {
                              console.log("success");
                            }
                          );
                        }
                      }
                    );
                  } else {
                    const sql = `INSERT INTO subject SET name=?`;
                    db.query(sql, subject, (err, subjectResult) => {
                      if (err) throw err;
                      if (subjectResult) {
                        courseSubjectMap = {
                          subjectId: subjectResult.insertId,
                          courseId: courseResult.insertId,
                        };
                        const checkMap = `SELECT * FROM courseSubjectMap WHERE subjectId=? AND courseId=?`;

                        db.query(
                          checkMap,
                          [subjectResult.insertId, courseResult.insertId],
                          (err, mapResult) => {
                            if (mapResult.length > 0) {
                              return;
                            } else {
                              const sql = `INSERT INTO courseSubjectMap SET ?`;
                              db.query(
                                sql,
                                courseSubjectMap,
                                (err, courseResult) => {
                                  console.log("success");
                                }
                              );
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
  },
  getCoursesByUserId(req, res) {
    const sql = `SELECT * FROM course WHERE ownerId ='${req.params.userId}' ORDER BY course.last_updated DESC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  getCoursesBySchoolId(req, res) {
    const sql = `SELECT * FROM course WHERE schoolId ='${req.params.schoolId}' ORDER BY course.last_updated DESC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  getCourseByCourseId(req, res) {
    const sql = `SELECT * FROM course WHERE id ='${req.params.courseId}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  async updateCourse(req, res) {
    const course = req.body;
    const sql = `UPDATE course SET ? WHERE id = '${req.params.courseId}'`;
    db.query(sql, course, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};

export default CourseController;
