require("dotenv").config();
const mysql = require("mysql");
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;
const db = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6440988",
  password: "iS1K7zk5ju",
  database: "sql6440988",
});
const connection = db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected to the database...");
  }
});
export default db;
