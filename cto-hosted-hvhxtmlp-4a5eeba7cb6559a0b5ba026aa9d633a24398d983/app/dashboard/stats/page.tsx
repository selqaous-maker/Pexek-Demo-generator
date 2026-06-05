"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

interface Stats {
  totalDemos: number;
  byStatus: Record<string, number>;
  byCity: Record<string, number>;
  byLang: Record<string, number>;
  topClients: { client_name: string; count: number }[];
  recentDemos: number;
  conversionRate: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-pexek-cyan/30 border-t-pexek-cyan rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <p className="text-gray-400 font-dm text-center py-8">
          Aucune donnée disponible
        </p>
      </Card>
    );
  }

  const statusLabels: Record<string, string> = {
    demo_sent: "Démo envoyée",
    contacted: "Contacté",
    interested: "Intéressé",
    converted: "Converti",
    lost: "Perdu",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-syne font-bold text-white">
          Statistiques
        </h1>
        <p className="text-gray-400 font-dm mt-1">
          Vue d&apos;ensemble de vos performances SARA
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-gray-500 text-sm font-dm mb-1">
            Total des démos
          </p>
          <p className="text-3xl font-syne font-bold text-pexek-cyan">
            {stats.totalDemos}
          </p>
          <p className="text-xs text-gray-600 mt-1 font-dm">
            Depuis le début
          </p>
        </Card>

        <Card>
          <p className="text-gray-500 text-sm font-dm mb-1">
            Dernières 24h
          </p>
          <p className="text-3xl font-syne font-bold text-pexek-gold">
            {stats.recentDemos}
          </p>
          <p className="text-xs text-gray-600 mt-1 font-dm">
            Nouvelles démos
          </p>
        </Card>

        <Card>
          <p className="text-gray-500 text-sm font-dm mb-1">
            Taux de conversion
          </p>
          <p className="text-3xl font-syne font-bold text-green-400">
            {stats.conversionRate}%
          </p>
          <p className="text-xs text-gray-600 mt-1 font-dm">
            Intéressé + Converti
          </p>
        </Card>

        <Card>
          <p className="text-gray-500 text-sm font-dm mb-1">
            Villes couvertes
          </p>
          <p className="text-3xl font-syne font-bold text-white">
            {Object.keys(stats.byCity).length}
          </p>
          <p className="text-xs text-gray-600 mt-1 font-dm">
            À travers le Maroc
          </p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <h3 className="text-lg font-syne font-semibold text-white mb-4">
            Répartition par statut
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byStatus).map(([status, count]) => {
              const total = stats.totalDemos || 1;
              const percentage = Math.round((count / total) * 100);
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 font-dm">
                      {statusLabels[status] || status}
                    </span>
                    <span className="text-gray-400 font-dm">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-pexek-navy rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        status === "converted"
                          ? "bg-green-500"
                          : status === "interested"
                          ? "bg-pexek-cyan"
                          : status === "lost"
                          ? "bg-red-500"
                          : "bg-gray-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* City Distribution */}
        <Card>
          <h3 className="text-lg font-syne font-semibold text-white mb-4">
            Répartition par ville
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byCity)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([city, count]) => {
                const total = stats.totalDemos || 1;
                const percentage = Math.round((count / total) * 100);
                return (
                  <div key={city}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300 font-dm">{city}</span>
                      <span className="text-gray-400 font-dm">
                        {count}
                      </span>
                    </div>
                    <div className="w-full bg-pexek-navy rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-pexek-gold transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            {Object.keys(stats.byCity).length === 0 && (
              <p className="text-gray-500 text-sm font-dm">Aucune donnée</p>
            )}
          </div>
        </Card>

        {/* Language Distribution */}
        <Card>
          <h3 className="text-lg font-syne font-semibold text-white mb-4">
            Langues utilisées
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byLang).map(([lang, count]) => {
              const total = stats.totalDemos || 1;
              const percentage = Math.round((count / total) * 100);
              const langLabels: Record<string, string> = {
                fr: "Français",
                en: "English",
                "fr,ar": "Français + Arabe",
                ar: "العربية",
                darija: "الدارجة",
              };
              return (
                <div key={lang}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 font-dm">
                      {langLabels[lang] || lang}
                    </span>
                    <span className="text-gray-400 font-dm">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-pexek-navy rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-pexek-cyan transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Clients */}
        <Card>
          <h3 className="text-lg font-syne font-semibold text-white mb-4">
            Top Clients
          </h3>
          <div className="space-y-2">
            {stats.topClients.slice(0, 5).map((client, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-pexek-navy/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-syne font-bold text-pexek-cyan">
                    #{i + 1}
                  </span>
                  <span className="text-sm text-gray-300 font-dm">
                    {client.client_name}
                  </span>
                </div>
                <span className="text-sm text-gray-400 font-dm">
                  {client.count} démo{client.count > 1 ? "s" : ""}
                </span>
              </div>
            ))}
            {stats.topClients.length === 0 && (
              <p className="text-gray-500 text-sm font-dm">
                Aucun client enregistré
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}