import db from "../db";

const CategoryController = {
  getAllCategories(req, res) {
    const sql = `SELECT * FROM category WHERE 1`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  getSubcategoriesByCategoryId(req, res) {
    const sql = `SELECT * FROM subcategory WHERE categoryId='${req.params.categoryId}' ORDER BY weight DESC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  getCategoryById(req, res) {
    const sql = `SELECT * FROM category WHERE id='${req.params.categoryId}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
  getSubcategoryById(req, res) {
    const sql = `SELECT * FROM subcategory WHERE id='${req.params.categoryId}' ORDER BY weight DESC`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  },
};

export default CategoryController;
