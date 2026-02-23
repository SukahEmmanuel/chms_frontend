import React from "react";
import { X } from "lucide-react";

/* ── Modal ── */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const SIZES: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "lg",
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className={`w-full ${SIZES[size]} rounded-2xl overflow-hidden max-h-[90vh] flex flex-col`}
        style={{
          backgroundColor: "var(--color-white)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-start justify-between shrink-0"
          style={{ borderBottom: "1px solid var(--color-gray-200)" }}
        >
          <div>
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--color-gray-900)" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4"
            style={{ backgroundColor: "var(--color-gray-100)" }}
          >
            <X className="w-4 h-4" style={{ color: "var(--color-gray-500)" }} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div
            className="px-6 py-4 flex items-center justify-end gap-3 shrink-0"
            style={{ borderTop: "1px solid var(--color-gray-200)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Footer button helpers ── */
export function ModalCancelButton({
  onClick,
  label = "Cancel",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-medium"
      style={{
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-gray-800)",
      }}
    >
      {label}
    </button>
  );
}

export function ModalPrimaryButton({
  onClick,
  label,
  icon: Icon,
  disabled = false,
  variant = "primary",
}: {
  onClick: () => void;
  label: string;
  icon?: React.ElementType;
  disabled?: boolean;
  variant?: "primary" | "danger";
}) {
  const bg =
    variant === "danger" ? "var(--color-rose)" : "var(--color-primary)";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-2 rounded-xl text-sm font-medium text-white flex items-center gap-2"
      style={{
        backgroundColor: bg,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}
