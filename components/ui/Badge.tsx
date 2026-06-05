"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "default";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    success:
      "bg-green-900/30 text-green-400 border-green-800/50",
    warning:
      "bg-yellow-900/30 text-yellow-400 border-yellow-800/50",
    error: "bg-red-900/30 text-red-400 border-red-800/50",
    info: "bg-cyan-900/30 text-pexek-cyan border-cyan-800/50",
    default:
      "bg-gray-800/50 text-gray-300 border-gray-700/50",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}