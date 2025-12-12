import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,     // ✅ MUST print postgres
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool
  .connect()
  .then(() => console.log("✅ PostgreSQL Connected as", process.env.DB_USER))
  .catch(err => console.error("❌ DB Error:", err.message));

export default pool;
