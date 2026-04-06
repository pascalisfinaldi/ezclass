import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-emerald-600 text-white shadow-[0_14px_24px_-14px_rgba(5,150,105,0.9)] hover:bg-emerald-500 disabled:bg-emerald-300",
  secondary:
    "bg-slate-900 text-slate-50 hover:bg-slate-700 disabled:bg-slate-400",
  ghost:
    "bg-transparent text-slate-800 ring-1 ring-slate-300 hover:bg-slate-100 disabled:text-slate-400",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`h-11 rounded-xl px-4 text-sm font-semibold transition-all disabled:cursor-not-allowed ${variantClass[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
