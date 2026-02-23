import React from "react";
import { X } from "lucide-react";

/* ── Drawer ── */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Content pinned to the top of the drawer — good for a profile header, image, or title block */
  header?: React.ReactNode;
  /** Scrollable main content */
  children: React.ReactNode;
  /** Content pinned to the bottom — good for action buttons */
  footer?: React.ReactNode;
  /** Which side the drawer slides in from. Defaults to "right" */
  side?: "left" | "right";
  /** Tailwind max-width class. Defaults to "max-w-sm" */
  width?: string;
}

export function Drawer({
  open,
  onClose,
  header,
  children,
  footer,
  side = "right",
  width = "max-w-sm",
}: DrawerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex"
      style={{
        justifyContent: side === "right" ? "flex-end" : "flex-start",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      onClick={onClose}
    >
      <div
        className={`w-full ${width} h-full flex flex-col`}
        style={{
          backgroundColor: "var(--color-white)",
          boxShadow:
            side === "right"
              ? "-8px 0 40px rgba(0,0,0,0.15)"
              : "8px 0 40px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — always visible */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Optional header block (e.g. gradient profile card) */}
        {header && <div className="shrink-0 relative">{header}</div>}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">{children}</div>

        {/* Sticky footer */}
        {footer && (
          <div
            className="shrink-0 px-5 pb-6 pt-4"
            style={{ borderTop: "1px solid var(--color-gray-200)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── DrawerHeader ── */
/* Pre-built gradient header for profile-style drawers.
   Drop it into the `header` prop of <Drawer>. */
export interface DrawerHeaderProps {
  /** Large display name */
  title: string;
  /** Smaller line beneath the title */
  subtitle?: string;
  /** Avatar or icon in the centre */
  avatar?: React.ReactNode;
  /** Extra badges/chips rendered below the subtitle */
  badges?: React.ReactNode;
}

export function DrawerHeader({
  title,
  subtitle,
  avatar,
  badges,
}: DrawerHeaderProps) {
  return (
    <div
      className="p-6 text-center"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
      }}
    >
      {avatar && <div className="flex justify-center mb-3">{avatar}</div>}
      <h3 className="text-white font-semibold text-base">{title}</h3>
      {subtitle && (
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
          {subtitle}
        </p>
      )}
      {badges && (
        <div className="flex justify-center gap-2 mt-3 flex-wrap">{badges}</div>
      )}
    </div>
  );
}

/* ── DrawerRow ── */
/* A labelled icon + text row — common inside drawer bodies. */
export interface DrawerRowProps {
  icon: React.ElementType;
  label: string;
  value?: string;
}

export function DrawerRow({ icon: Icon, label, value }: DrawerRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-primary) 8%, transparent)",
        }}
      >
        <Icon className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
      </div>
      <div>
        <p className="text-xs" style={{ color: "#9ca3af" }}>
          {label}
        </p>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-gray-800)" }}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

/* ── DrawerPrimaryButton ── */
export function DrawerPrimaryButton({
  onClick,
  label,
  icon: Icon,
}: {
  onClick: () => void;
  label: string;
  icon?: React.ElementType;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}
