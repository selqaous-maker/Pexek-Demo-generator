import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent_id, client_name, business, city, trial_days, lang, platform } = body;

    // Track without requiring auth - just log the visit
    // Optionally increment a visit counter on the demo
    const db = await initDB();

    // Simple tracking - log to demos table if agent_id provided
    if (agent_id) {
      await db.execute({
        sql: `INSERT INTO demos (client_name, business, city, agent_id, trial_days, lang, platform, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, 'demo_sent')`,
        args: [
          client_name || "Visiteur",
          business || null,
          city || null,
          agent_id,
          trial_days || 7,
          lang || "fr",
          platform || "convocore",
        ],
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur de tracking" },
      { status: 500 }
    );
  }
}