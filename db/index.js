require("dotenv").config();
const mysql = require("mysql");
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;
const db = mysql.createConnection({
  host: "remotemysql.com",
  user: "Xsb7TaLd7r",
  password: "LAmDLAuJ8r",
  database: "Xsb7TaLd7r",
});
const connection = db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected to the database...");
  }
});
export default db;
