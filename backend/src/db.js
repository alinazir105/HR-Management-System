import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS),
  port: Number(process.env.DB_PORT),
});

const testDBConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected successfully at:", result.rows[0].now);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

testDBConnection();

export default pool;
