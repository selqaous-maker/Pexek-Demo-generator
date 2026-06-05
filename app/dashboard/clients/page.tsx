"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

interface Demo {
  id: number;
  client_name: string;
  business: string | null;
  city: string | null;
  agent_id: string;
  trial_days: number;
  lang: string;
  platform: string;
  whatsapp: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusLabels: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" | "default" }> = {
  demo_sent: { label: "Démo envoyée", variant: "info" },
  contacted: { label: "Contacté", variant: "warning" },
  interested: { label: "Intéressé", variant: "success" },
  converted: { label: "Converti", variant: "success" },
  lost: { label: "Perdu", variant: "error" },
};

export default function ClientsPage() {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchDemos();
  }, []);

  const fetchDemos = async () => {
    try {
      const res = await fetch("/api/demos");
      const data = await res.json();
      if (data.demos) setDemos(data.demos);
    } catch {
      console.error("Failed to fetch demos");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/demos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchDemos();
        setSelectedDemo(null);
        const toast = document.createElement("div");
        toast.className = "toast toast-success";
        toast.textContent = "Statut mis à jour !";
        document.getElementById("toast-root")?.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      }
    } catch {
      console.error("Failed to update status");
    }
  };

  const deleteDemo = async (id: number) => {
    if (!confirm("Supprimer cette démo ?")) return;
    try {
      const res = await fetch(`/api/demos/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchDemos();
        setSelectedDemo(null);
        const toast = document.createElement("div");
        toast.className = "toast toast-success";
        toast.textContent = "Démo supprimée !";
        document.getElementById("toast-root")?.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      }
    } catch {
      console.error("Failed to delete demo");
    }
  };

  const filteredDemos = statusFilter === "all"
    ? demos
    : demos.filter((d) => d.status === statusFilter);

  const getLangLabel = (lang: string) => {
    const labels: Record<string, string> = {
      fr: "FR",
      en: "EN",
      "fr,ar": "FR/AR",
      ar: "AR",
      darija: "Darija",
    };
    return labels[lang] || lang;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-pexek-cyan/30 border-t-pexek-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-syne font-bold text-white">
            Clients CRM
          </h1>
          <p className="text-gray-400 font-dm mt-1">
            {demos.length} démo{demos.length > 1 ? "s" : ""} générée
           {demos.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "demo_sent", "contacted", "interested", "converted", "lost"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === s
                  ? "bg-pexek-cyan/10 text-pexek-cyan border border-pexek-cyan/20"
                  : "bg-pexek-card text-gray-400 border border-gray-800 hover:border-gray-700"
              }`}
            >
              {s === "all"
                ? "Tous"
                : statusLabels[s]?.label || s}
            </button>
          ))}
        </div>
      </div>

      {filteredDemos.length === 0 ? (
        <Card>
          <div className="text-center py-12 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-4 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="font-dm">Aucune démo trouvée</p>
            <p className="text-sm font-dm mt-1">
              Générez votre première démo depuis le tableau de bord
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredDemos.map((demo) => (
            <Card key={demo.id} hover>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-syne font-semibold truncate">
                      {demo.client_name}
                    </h3>
                    <Badge variant={statusLabels[demo.status]?.variant || "default"}>
                      {statusLabels[demo.status]?.label || demo.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 font-dm">
                    {demo.business && <span>{demo.business}</span>}
                    {demo.city && <span>📍 {demo.city}</span>}
                    <span>🆔 {demo.agent_id}</span>
                    <span>🌐 {getLangLabel(demo.lang)}</span>
                    {demo.trial_days > 0 ? (
                      <span>⏱ {demo.trial_days}j</span>
                    ) : (
                      <span>♾ Illimité</span>
                    )}
                  </div>
                  {demo.notes && (
                    <p className="text-xs text-gray-500 mt-1 font-dm line-clamp-2">
                      {demo.notes}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-1 font-dm">
                    {new Date(demo.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDemo(demo)}
                  className="px-3 py-1.5 text-xs font-semibold text-pexek-cyan hover:bg-pexek-cyan/10 rounded-lg transition-colors shrink-0"
                >
                  Détails
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        open={!!selectedDemo}
        onClose={() => setSelectedDemo(null)}
        title={"Détails - " + (selectedDemo?.client_name || "")}
      >
        {selectedDemo && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 font-dm">Client</p>
                <p className="text-white font-dm">{selectedDemo.client_name}</p>
              </div>
              <div>
                <p className="text-gray-500 font-dm">Entreprise</p>
                <p className="text-white font-dm">{selectedDemo.business || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500 font-dm">Ville</p>
                <p className="text-white font-dm">{selectedDemo.city || "-"}</p>
              </div>
              <div>
                <p className="text-gray-500 font-dm">Agent ID</p>
                <p className="text-white font-mono text-xs">{selectedDemo.agent_id}</p>
              </div>
              <div>
                <p className="text-gray-500 font-dm">Essai</p>
                <p className="text-white font-dm">
                  {selectedDemo.trial_days > 0
                    ? `${selectedDemo.trial_days} jours`
                    : "Illimité"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-dm">Langue</p>
                <p className="text-white font-dm">{getLangLabel(selectedDemo.lang)}</p>
              </div>
              {selectedDemo.whatsapp && (
                <div>
                  <p className="text-gray-500 font-dm">WhatsApp</p>
                  <p className="text-white font-dm">{selectedDemo.whatsapp}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 font-dm">Statut</p>
                <Badge
                  variant={
                    statusLabels[selectedDemo.status]?.variant || "default"
                  }
                >
                  {statusLabels[selectedDemo.status]?.label ||
                    selectedDemo.status}
                </Badge>
              </div>
            </div>

            {selectedDemo.notes && (
              <div>
                <p className="text-gray-500 text-sm font-dm">Notes</p>
                <p className="text-white text-sm font-dm bg-pexek-navy p-3 rounded-lg mt-1">
                  {selectedDemo.notes}
                </p>
              </div>
            )}

            <div>
              <p className="text-gray-500 text-sm font-dm mb-2">Changer le statut</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusLabels).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => updateStatus(selectedDemo.id, key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedDemo.status === key
                        ? "bg-pexek-cyan/10 text-pexek-cyan border border-pexek-cyan/20"
                        : "bg-pexek-navy text-gray-400 border border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteDemo(selectedDemo.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}