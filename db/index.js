const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
const connection = db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected to the database...");
});
export default db;
