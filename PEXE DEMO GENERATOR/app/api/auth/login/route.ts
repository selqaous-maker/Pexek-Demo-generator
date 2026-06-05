import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { verifyPassword, createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Identifiant et mot de passe requis" },
        { status: 400 }
      );
    }

    const adminUsername = process.env.ADMIN_USERNAME || "salah";
    const adminPassword = process.env.ADMIN_PASSWORD || "PEXEK2025!";

    if (username !== adminUsername) {
      return NextResponse.json(
        { error: "Identifiants incorrects" },
        { status: 401 }
      );
    }

    const db = await initDB();

    // Find user
    const result = await db.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });

    let user = result.rows[0];

    if (!user) {
      // Create admin user on first login
      const bcrypt = await import("bcryptjs");
      const passwordHash = await bcrypt.hash(adminPassword, 12);

      const insertResult = await db.execute({
        sql: "INSERT INTO users (username, password_hash) VALUES (?, ?)",
        args: [username, passwordHash],
      });

      user = {
        id: Number(insertResult.lastInsertRowid),
        username,
        password_hash: passwordHash,
      } as any;
    } else {
      // Verify password
      const valid = await verifyPassword(password, String(user.password_hash));
      if (!valid) {
        return NextResponse.json(
          { error: "Identifiants incorrects" },
          { status: 401 }
        );
      }
    }

    // Create session
    const token = await createSession(Number(user.id));
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}