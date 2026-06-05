import { NextResponse } from "next/server";
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

    // Total demos
    const totalResult = await db.execute(
      "SELECT COUNT(*) as count FROM demos"
    );
    const totalDemos = Number(totalResult.rows[0]?.count || 0);

    // By status
    const byStatusResult = await db.execute(
      "SELECT status, COUNT(*) as count FROM demos GROUP BY status"
    );
    const byStatus: Record<string, number> = {};
    for (const row of byStatusResult.rows) {
      byStatus[String(row.status)] = Number(row.count);
    }

    // By city
    const byCityResult = await db.execute(
      "SELECT city, COUNT(*) as count FROM demos WHERE city IS NOT NULL GROUP BY city"
    );
    const byCity: Record<string, number> = {};
    for (const row of byCityResult.rows) {
      byCity[String(row.city)] = Number(row.count);
    }

    // By lang
    const byLangResult = await db.execute(
      "SELECT lang, COUNT(*) as count FROM demos GROUP BY lang"
    );
    const byLang: Record<string, number> = {};
    for (const row of byLangResult.rows) {
      byLang[String(row.lang)] = Number(row.count);
    }

    // Recent demos (last 24h)
    const recentResult = await db.execute(
      "SELECT COUNT(*) as count FROM demos WHERE created_at >= datetime('now', '-1 day')"
    );
    const recentDemos = Number(recentResult.rows[0]?.count || 0);

    // Conversion rate
    const interestedCount = byStatus["interested"] || 0;
    const convertedCount = byStatus["converted"] || 0;
    const conversionCount = interestedCount + convertedCount;
    const conversionRate =
      totalDemos > 0 ? Math.round((conversionCount / totalDemos) * 100) : 0;

    // Top clients
    const topClientsResult = await db.execute(
      "SELECT client_name, COUNT(*) as count FROM demos GROUP BY client_name ORDER BY count DESC LIMIT 10"
    );
    const topClients = topClientsResult.rows.map((row) => ({
      client_name: String(row.client_name),
      count: Number(row.count),
    }));

    return NextResponse.json({
      totalDemos,
      byStatus,
      byCity,
      byLang,
      topClients,
      recentDemos,
      conversionRate,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des statistiques" },
      { status: 500 }
    );
  }
}