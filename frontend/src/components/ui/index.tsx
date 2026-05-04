import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  suffix?: ReactNode;
}

export function Input({
  label,
  error,
  hint,
  suffix,
  className = "",
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          className={`w-full bg-surface-raised border border-surface-border rounded text-neutral-100 text-sm px-3 py-2.5 pr-10 outline-none transition-all duration-150 placeholder:text-neutral-500
            focus:border-primary-500 focus:shadow-glow-primary
            ${error ? "border-error-500" : ""}
            ${className}`}
          {...rest}
        />
        {suffix && (
          <span className="absolute right-3 text-neutral-400">{suffix}</span>
        )}
      </div>
      {error && <p className="text-xs text-error-500">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

// ─── Badge ──────────────────────────────────────────────────────────────────
const BADGE_VARIANTS = {
  default: "bg-surface-overlay text-neutral-300 border border-surface-border",
  success: "bg-success-100 text-success-600 border border-success-400",
  warning: "bg-warning-100 text-warning-600 border border-warning-400",
  error: "bg-error-100 text-error-600 border border-error-400",
  primary: "bg-primary-100 text-primary-600 border border-primary-200",
  hot: "bg-score-hot-bg text-score-hot border border-score-hot",
  warm: "bg-score-warm-bg text-score-warm border border-score-warm",
  cold: "bg-score-cold-bg text-score-cold border border-score-cold",
};

interface BadgeProps {
  children: ReactNode;
  variant?: keyof typeof BADGE_VARIANTS;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide rounded-xs px-2 py-0.5 ${BADGE_VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ─── Card ───────────────────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "raised";
}

export function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div
      className={`${variant === "raised" ? "bg-surface-raised" : "bg-surface-ghost"} border border-surface-border rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Skeleton ───────────────────────────────────────────────────────────────
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton h-4 ${className}`} />;
}

export function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col items-center gap-4">
        <Skeleton className="w-24 h-24 rounded-full" />
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-32 h-3" />
      </div>
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col gap-4">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3" />
        <Skeleton className="w-3/4 h-3" />
      </div>
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col gap-4">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-full h-12 rounded-md" />
        <Skeleton className="w-full h-12 rounded-md" />
      </div>
    </div>
  );
}
