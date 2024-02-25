import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,  // pg username
  host: process.env.PG_HOST,  // pg host
  database: process.env.PG_DATABASE,  // pg db name
  password: process.env.PG_PASSWORD,  // pg password
  port: process.env.PG_PORT,  // pg port number
});

db.connect();

try {
  await db.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id BIGINT PRIMARY KEY,
        note_id TEXT NOT NULL, 
        title TEXT,
        content TEXT,
        date DATE
      );

      CREATE TABLE IF NOT EXISTS archives (
        id BIGINT PRIMARY KEY,
        note_id TEXT NOT NULL,
        title TEXT,
        content TEXT,
        date DATE
      );

      CREATE TABLE IF NOT EXISTS trash (
        id BIGINT PRIMARY KEY,
        note_id TEXT NOT NULL,
        title TEXT,
        content TEXT,
        date DATE
      );
    `);
} catch (err) {
  console.error("Error initializing database:", err);
}

export default db;
