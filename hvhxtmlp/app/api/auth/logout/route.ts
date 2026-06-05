import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, clearSessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("pexek_session")?.value;

    if (token) {
      await destroySession(token);
    }

    await clearSessionCookie();

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la déconnexion" },
      { status: 500 }
    );
  }
}