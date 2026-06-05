"use client";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function Select({
  label,
  options,
  error,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-300 font-dm">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2.5 bg-pexek-card border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pexek-cyan focus:ring-1 focus:ring-pexek-cyan/30 transition-colors font-dm ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400 font-dm">{error}</p>}
    </div>
  );
}