require("dotenv").config();
const mysql = require("mysql");
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;
const db = mysql.createConnection({
  host: "remotemysql.com",
  user: "Xsb7TaLd7r",
  password: "VqBgTVeQwh",
  database: "Xsb7TaLd7r",
});
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db);

  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

export default db;
