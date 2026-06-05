import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { initDB, queryOne } from "./db";

const SESSION_COOKIE = "pexek_session";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: number): Promise<string> {
  const db = await initDB();
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  await db.execute({
    sql: "INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
    args: [userId, token, expiresAt],
  });

  return token;
}

export async function validateSession(
  token: string
): Promise<{ id: number; username: string } | null> {
  try {
    const row = await queryOne(
      "SELECT s.user_id, u.id, u.username FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > datetime('now')",
      { token }
    );

    if (!row) return null;

    return {
      id: Number(row.id),
      username: String(row.username),
    };
  } catch {
    return null;
  }
}

export async function destroySession(token: string): Promise<void> {
  const db = await initDB();
  await db.execute({
    sql: "DELETE FROM sessions WHERE token = ?",
    args: [token],
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  return validateSession(token);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_MS / 1000,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export function isAuthenticated(): boolean {
  // This is used in middleware via the token check
  return true;
}