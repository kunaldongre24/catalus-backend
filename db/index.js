const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "learnsten",
});
const connection = db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected to the database...");
});
export default db;
