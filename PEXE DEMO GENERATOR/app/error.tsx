"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-pexek-navy flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-syne font-bold text-pexek-cyan mb-4">
          500
        </h1>
        <p className="text-xl text-gray-300 font-syne mb-2">
          Une erreur est survenue
        </p>
        <p className="text-gray-400 mb-8 font-dm">
          {error.message || "Quelque chose s'est mal passé. Veuillez réessayer."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-pexek-cyan text-pexek-navy rounded-lg font-semibold hover:bg-pexek-cyan/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}