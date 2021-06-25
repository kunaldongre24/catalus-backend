import db from "../db";

const ActivityController = {
  getActivitiesByUserId(req, res) {
    const userId = req.params.userId;
    const sql = `SELECT id,date,count(id) AS count ,activity_description,referenceType,referenceId FROM activity WHERE userId='${userId}' GROUP BY date`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};

export default ActivityController;
