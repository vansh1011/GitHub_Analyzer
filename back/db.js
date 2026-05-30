import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT2,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: true
  }
})

db.getConnection((err, connection) => {
  if (err) {
    console.log("DB connection failed", err.message);
  } else {
    console.log("Connected to DB");
    connection.release(); 
  }
})

export default db;