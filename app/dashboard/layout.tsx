"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        setAuthenticated(true);
      })
      .catch(() => {
        router.push("/login");
      })
      .finally(() => setChecking(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-pexek-navy flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pexek-cyan/30 border-t-pexek-cyan rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

  const navItems = [
    {
      href: "/dashboard",
      label: "Générateur de Démo",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      href: "/dashboard/clients",
      label: "Clients CRM",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      href: "/dashboard/stats",
      label: "Statistiques",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-pexek-navy flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-pexek-card border-r border-gray-800/50">
        <div className="p-4 border-b border-gray-800/50">
          <Link href="/dashboard" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
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
            <span className="font-syne font-bold text-lg text-white">
              PEXEK
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-dm transition-all ${
                pathname === item.href
                  ? "bg-pexek-cyan/10 text-pexek-cyan border border-pexek-cyan/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-900/10 transition-all w-full font-dm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-pexek-card/90 backdrop-blur-md border-b border-gray-800/50 p-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <svg
            width="28"
            height="28"
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
          <span className="font-syne font-bold text-white">PEXEK</span>
        </Link>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "text-pexek-cyan bg-pexek-cyan/10"
                  : "text-gray-400"
              }`}
            >
              {item.icon}
            </Link>
          ))}
          <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-0 pt-16 md:pt-0 overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}