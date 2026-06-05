import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = await initDB();
    const result = await db.execute({
      sql: "SELECT * FROM demos WHERE id = ?",
      args: [id],
    });

    if (!result.rows[0]) {
      return NextResponse.json(
        { error: "Démo introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ demo: result.rows[0] });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors du chargement de la démo" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const allowedFields = [
      "client_name",
      "business",
      "city",
      "agent_id",
      "trial_days",
      "lang",
      "platform",
      "whatsapp",
      "status",
      "notes",
    ];

    // Build dynamic SET clause
    const updates: string[] = [];
    const args: (string | number | boolean | null | bigint)[] = [];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`);
        args.push(body[field]);
      }
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "Aucun champ à mettre à jour" },
        { status: 400 }
      );
    }

    updates.push("updated_at = datetime('now')");
    args.push(id);

    const db = await initDB();
    await db.execute({
      sql: `UPDATE demos SET ${updates.join(", ")} WHERE id = ?`,
      args,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession();
    if (!user) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const db = await initDB();
    await db.execute({
      sql: "DELETE FROM demos WHERE id = ?",
      args: [id],
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}