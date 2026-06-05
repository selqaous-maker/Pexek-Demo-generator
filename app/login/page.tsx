"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Identifiants incorrects");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pexek-navy flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="fixed top-[-150px] left-[-150px] w-[400px] h-[400px] glow-orb glow-orb-cyan" />
      <div className="fixed bottom-[-150px] right-[-150px] w-[400px] h-[400px] glow-orb glow-orb-gold" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="34"
                height="34"
                rx="8"
                stroke="#00D4FF"
                strokeWidth="2"
                fill="#0A1628"
              />
              <path
                d="M10 26V10h6.5c2.5 0 4.5 1.5 4.5 4.5s-2 4.5-4.5 4.5H14l6 7h-4.5l-5.5-7V26H10z"
                fill="#00D4FF"
              />
              <circle cx="24" cy="12" r="2" fill="#F5C842" />
            </svg>
            <span className="font-syne font-bold text-2xl text-white">
              PEXEK
            </span>
          </div>
          <h1 className="font-syne text-xl text-gray-300">
            Tableau de bord
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-dm">
            Connectez-vous pour gérer vos démos SARA
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-pexek-card border border-gray-800 rounded-2xl p-8 space-y-6"
        >
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-lg text-red-400 text-sm font-dm">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300 font-dm">
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2.5 bg-pexek-navy border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pexek-cyan focus:ring-1 focus:ring-pexek-cyan/30 transition-colors font-dm"
              placeholder="salah"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300 font-dm">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-pexek-navy border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pexek-cyan focus:ring-1 focus:ring-pexek-cyan/30 transition-colors font-dm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-pexek-cyan text-pexek-navy rounded-lg font-semibold text-base hover:bg-pexek-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}