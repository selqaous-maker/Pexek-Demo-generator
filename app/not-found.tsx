import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pexek-navy flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-syne font-bold text-pexek-gold mb-4">
          404
        </h1>
        <p className="text-xl text-gray-300 font-syne mb-2">
          Page introuvable
        </p>
        <p className="text-gray-400 mb-8 font-dm">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-pexek-cyan text-pexek-navy rounded-lg font-semibold hover:bg-pexek-cyan/90 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}