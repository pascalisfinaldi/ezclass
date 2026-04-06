import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, subtitle, children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_40px_-26px_rgba(16,24,40,0.45)] backdrop-blur ${className}`}
    >
      {(title || subtitle) && (
        <header className="mb-5">
          {title && <h2 className="text-xl font-semibold text-slate-900">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
