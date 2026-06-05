"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-300 font-dm">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2.5 bg-pexek-card border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pexek-cyan focus:ring-1 focus:ring-pexek-cyan/30 transition-colors font-dm ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 font-dm">{error}</p>
      )}
    </div>
  );
}