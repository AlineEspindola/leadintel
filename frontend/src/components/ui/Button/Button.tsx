import { ButtonHTMLAttributes, ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center font-sans font-medium transition-all duration-150 rounded-sm outline-none focus:outline-2 focus:outline-primary-500 focus:outline-offset-2 cursor-pointer";

const INTENT = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-md",
  ghost: "bg-transparent text-primary-400 hover:bg-surface-overlay",
  danger: "bg-error-500 text-white hover:bg-error-600",
  outline:
    "border border-surface-border text-neutral-300 hover:bg-surface-overlay",
};

const SIZE = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: keyof typeof INTENT;
  size?: keyof typeof SIZE;
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  intent = "primary",
  size = "md",
  children,
  loading,
  disabled,
  className = "",
  ...rest
}: Props) {
  const isDisabled = disabled || loading;
  return (
    <button
      className={`${BASE} ${INTENT[intent]} ${SIZE[size]} ${isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""} ${className}`}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? <span className="mr-2 animate-spin">⟳</span> : null}
      {children}
    </button>
  );
}
