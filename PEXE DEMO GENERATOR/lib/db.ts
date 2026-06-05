import { createClient } from "@libsql/client";

type SQLValue = string | number | boolean | null | bigint;

const getClient = () => {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL env var is required");
  }

  return createClient({
    url,
    authToken,
  });
};

export async function initDB() {
  const db = getClient();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS demos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      business TEXT,
      city TEXT,
      agent_id TEXT NOT NULL,
      trial_days INTEGER DEFAULT 7,
      lang TEXT DEFAULT 'fr',
      platform TEXT DEFAULT 'convocore',
      whatsapp TEXT,
      status TEXT DEFAULT 'demo_sent',
      notes TEXT,
      created_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `);

  return db;
}

export async function query(sql: string, params?: Record<string, unknown>) {
  const db = getClient();
  return db.execute({
    sql,
    args: params ? (Object.values(params) as SQLValue[]) : [],
  });
}

export async function queryOne(sql: string, params?: Record<string, unknown>) {
  const db = getClient();
  const result = await db.execute({
    sql,
    args: params ? (Object.values(params) as SQLValue[]) : [],
  });
  return result.rows[0] || null;
}

export default getClient;