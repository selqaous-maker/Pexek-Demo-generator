"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`bg-pexek-card border border-gray-800 rounded-xl p-6 ${
        hover ? "hover:border-pexek-cyan/30 transition-colors" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}