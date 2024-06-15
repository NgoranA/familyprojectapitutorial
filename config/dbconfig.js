import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "aristide",
  host: "localhost",
  database: "familytree",
  password: "password1234",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Connected to the database on port 5432"))
  .catch((err) => console.error(err));

export default pool;
