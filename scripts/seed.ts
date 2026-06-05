import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";

async function seed() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error("TURSO_DATABASE_URL env var is required");
    process.exit(1);
  }

  const db = createClient({ url, authToken });

  // Create tables
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

  // Create admin user
  const username = process.env.ADMIN_USERNAME || "salah";
  const password = process.env.ADMIN_PASSWORD || "PEXEK2025!";
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    await db.execute({
      sql: "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      args: [username, passwordHash],
    });
    console.log(`✅ Admin user '${username}' created successfully`);
  } catch (error: any) {
    if (error.message?.includes("UNIQUE")) {
      console.log(`ℹ️  Admin user '${username}' already exists`);
    } else {
      console.error("❌ Failed to create admin user:", error);
    }
  }

  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed();