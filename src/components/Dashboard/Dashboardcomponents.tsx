import React from "react";
import { ChevronRight, TrendingUp } from "lucide-react";

/* ── SectionTitle ── */
interface SectionTitleProps {
  title: string;
  sub?: string;
  action?: string;
  onAction?: () => void;
}

export function SectionTitle({
  title,
  sub,
  action,
  onAction,
}: SectionTitleProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--color-gray-900)" }}
        >
          {title}
        </h2>
        {sub && (
          <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
            {sub}
          </p>
        )}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-primary) 6%, transparent)",
            color: "var(--color-primary)",
          }}
        >
          {action} <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

/* ── Card ── */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", style = {} }: CardProps) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        backgroundColor: "var(--color-white)",
        border: "1px solid var(--color-gray-200)",
        boxShadow: "0 2px 12px rgba(0,0,172,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── StatCard ── */
interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  accent: string;
  showTrend?: boolean;
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  showTrend = false,
}: StatCardProps) {
  return (
    <Card>
      <div className="p-5 relative overflow-hidden">
        {/* Decorative background circle */}
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5"
          style={{
            backgroundColor: accent,
            transform: "translate(20px, -20px)",
          }}
        />
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ backgroundColor: accent }}
        />
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 mt-1"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
        {/* Label */}
        <p
          className="text-xs uppercase mb-1"
          style={{ color: "#9ca3af", letterSpacing: "0.1em" }}
        >
          {label}
        </p>
        {/* Value */}
        <p
          className="text-2xl font-semibold mb-1"
          style={{ color: "var(--color-gray-900)" }}
        >
          {value}
        </p>
        {/* Sub / trend */}
        <p
          className="text-xs flex items-center gap-1"
          style={{ color: showTrend ? "var(--color-green)" : "#9ca3af" }}
        >
          {showTrend && <TrendingUp className="w-3 h-3" />}
          {sub}
        </p>
      </div>
    </Card>
  );
}
