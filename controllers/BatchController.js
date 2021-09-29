import db from "../db";

const BatchController = {
  getAllBatch(req, res) {
    const sql = `SELECT id,name,motive FROM batch WHERE 1`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },

  getBatchById(req, res) {
    const sql = `SELECT id,name,motive FROM batch WHERE id ='${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.send(result);
    });
  },
};

export default BatchController;
