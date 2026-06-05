import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const db = await initDB();
    const result = await db.execute(
      "SELECT * FROM demos ORDER BY created_at DESC"
    );

    return NextResponse.json({ demos: result.rows });
  } catch (error) {
    console.error("Failed to fetch demos:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des démos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      client_name,
      business,
      city,
      agent_id,
      trial_days,
      lang,
      platform,
      whatsapp,
      notes,
    } = body;

    if (!client_name || !agent_id) {
      return NextResponse.json(
        { error: "Nom du client et ID agent requis" },
        { status: 400 }
      );
    }

    const db = await initDB();
    const result = await db.execute({
      sql: `INSERT INTO demos (client_name, business, city, agent_id, trial_days, lang, platform, whatsapp, notes, created_by, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'demo_sent')`,
      args: [
        client_name,
        business || null,
        city || null,
        agent_id,
        trial_days || 7,
        lang || "fr",
        platform || "convocore",
        whatsapp || null,
        notes || null,
        user.id,
      ],
    });

    return NextResponse.json(
      { success: true, id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create demo:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la démo" },
      { status: 500 }
    );
  }
}