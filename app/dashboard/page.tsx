"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import WhatsAppShare from "@/components/demo/WhatsAppShare";

export default function DashboardPage() {
  const [form, setForm] = useState({
    client_name: "",
    business: "",
    city: "Casablanca",
    agent_id: "",
    trial_days: "7",
    lang: "fr",
    platform: "convocore",
    whatsapp: "",
    notes: "",
  });
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateUrl = () => {
    if (!form.client_name || !form.agent_id) {
      setError("Le nom du client et l'ID agent sont requis");
      return;
    }
    setError("");

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://pexek.com";
    const params = new URLSearchParams({
      id: form.agent_id,
      client: form.client_name,
      biz: form.business || form.client_name,
      city: form.city,
      trial: form.trial_days,
      lang: form.lang,
      plt: form.platform,
    });

    const url = `${baseUrl}/demo?${params.toString()}`;
    setGeneratedUrl(url);
    setSavedId(null);
  };

  const saveDemo = async () => {
    if (!generatedUrl) return;
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/demos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          trial_days: parseInt(form.trial_days),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'enregistrement");
        return;
      }

      setSavedId(data.id);
      const toast = document.createElement("div");
      toast.className = "toast toast-success";
      toast.textContent = "Démo enregistrée avec succès !";
      document.getElementById("toast-root")?.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setSaving(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl).then(() => {
      const toast = document.createElement("div");
      toast.className = "toast toast-success";
      toast.textContent = "URL copiée dans le presse-papier !";
      document.getElementById("toast-root")?.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });
  };

  const cityOptions = [
    { value: "Casablanca", label: "Casablanca" },
    { value: "Rabat", label: "Rabat" },
    { value: "Marrakech", label: "Marrakech" },
    { value: "Fès", label: "Fès" },
    { value: "Tanger", label: "Tanger" },
    { value: "Agadir", label: "Agadir" },
    { value: "Meknès", label: "Meknès" },
    { value: "Oujda", label: "Oujda" },
    { value: "Laâyoune", label: "Laâyoune" },
    { value: "Tétouan", label: "Tétouan" },
    { value: "Safi", label: "Safi" },
    { value: "El Jadida", label: "El Jadida" },
    { value: "Autre", label: "Autre ville" },
  ];

  const langOptions = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "fr,ar", label: "Français + Arabe" },
    { value: "ar", label: "العربية" },
    { value: "darija", label: "الدارجة" },
  ];

  const platformOptions = [
    { value: "convocore", label: "Convocore" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-syne font-bold text-white">
          Générateur de Démo SARA
        </h1>
        <p className="text-gray-400 font-dm mt-1">
          Créez un lien de démo personnalisé pour vos clients
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              generateUrl();
            }}
            className="space-y-4"
          >
            <Input
              label="Nom du client *"
              name="client_name"
              value={form.client_name}
              onChange={handleChange}
              placeholder="ex: Omar Tazi"
              required
            />
            <Input
              label="Nom de l'entreprise"
              name="business"
              value={form.business}
              onChange={handleChange}
              placeholder="ex: Groupe Tazi Immobilier"
            />
            <Select
              label="Ville"
              name="city"
              value={form.city}
              onChange={handleChange}
              options={cityOptions}
            />
            <Input
              label="ID Agent (Convocore) *"
              name="agent_id"
              value={form.agent_id}
              onChange={handleChange}
              placeholder="ex: ag_7x3k9m2p"
              required
            />
            <Select
              label="Jours d'essai"
              name="trial_days"
              value={form.trial_days}
              onChange={handleChange}
              options={[
                { value: "0", label: "Illimité (pas de compte à rebours)" },
                { value: "3", label: "3 jours" },
                { value: "7", label: "7 jours" },
                { value: "14", label: "14 jours" },
                { value: "30", label: "30 jours" },
              ]}
            />
            <Select
              label="Langue"
              name="lang"
              value={form.lang}
              onChange={handleChange}
              options={langOptions}
            />
            <Select
              label="Plateforme"
              name="platform"
              value={form.platform}
              onChange={handleChange}
              options={platformOptions}
            />
            <Input
              label="WhatsApp (optionnel)"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="ex: +212612345678"
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-300 font-dm">
                Notes internes
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-3 py-2.5 bg-pexek-navy border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pexek-cyan focus:ring-1 focus:ring-pexek-cyan/30 transition-colors font-dm text-sm min-h-[80px]"
                placeholder="Informations supplémentaires..."
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 font-dm">{error}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" size="lg">
                Générer le lien
              </Button>
            </div>
          </form>
        </Card>

        {/* Result */}
        <div className="space-y-4">
          {generatedUrl ? (
            <>
              <Card>
                <h3 className="text-lg font-syne font-semibold text-white mb-3">
                  Lien de démo généré
                </h3>
                <div className="bg-pexek-navy rounded-lg p-3 border border-gray-800 mb-4">
                  <p className="text-sm text-pexek-cyan break-all font-mono">
                    {generatedUrl}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={copyUrl} variant="secondary" size="sm">
                    Copier le lien
                  </Button>
                  <Button
                    onClick={saveDemo}
                    loading={saving}
                    variant="primary"
                    size="sm"
                  >
                    {savedId ? "✓ Enregistré" : "Enregistrer dans CRM"}
                  </Button>
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="sm">
                      Ouvrir →
                    </Button>
                  </a>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-syne font-semibold text-white mb-3">
                  Partager sur WhatsApp
                </h3>
                <WhatsAppShare
                  client={form.client_name}
                  business={form.business || form.client_name}
                  url={generatedUrl}
                />
              </Card>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <p className="font-dm">
                  Remplissez le formulaire et cliquez sur
                </p>
                <p className="font-dm text-pexek-cyan">
                  &ldquo;Générer le lien&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}