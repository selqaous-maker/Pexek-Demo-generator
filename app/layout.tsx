import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PEXEK — Automation IA pour entreprises marocaines",
  description:
    "PEXEK aide les entreprises marocaines à automatiser leur communication client avec SARA, l'assistante IA qui convertit les leads 24/7.",
  openGraph: {
    title: "PEXEK — Automation IA pour entreprises marocaines",
    description:
      "Découvrez SARA, l'assistante IA qui capture 87% de leads en plus pour votre entreprise au Maroc.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-pexek-navy text-gray-200 min-h-screen">
        <div id="toast-root" className="toast-container" />
        {children}
      </body>
    </html>
  );
}