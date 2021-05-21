require("dotenv").config();
const mysql = require("mysql");
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;
const db = mysql.createConnection({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
});
const connection = db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected to the database...");
  }
});
export default db;
