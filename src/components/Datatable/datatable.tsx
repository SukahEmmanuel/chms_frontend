import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/Dashboard/Dashboardcomponents";

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
  pageSize?: number;
  emptyIcon?: React.ElementType;
  emptyTitle?: string;
  emptySubtitle?: string;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  onRowClick?: (row: T) => void;
}

function Pagination({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    )
      pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div
      className="px-5 py-3 flex items-center justify-between"
      style={{
        borderTop: "1px solid var(--color-gray-200)",
        backgroundColor: "var(--color-gray-100)",
      }}
    >
      <p className="text-xs" style={{ color: "#9ca3af" }}>
        Showing{" "}
        <strong style={{ color: "var(--color-gray-800)" }}>
          {from}–{to}
        </strong>{" "}
        of <strong style={{ color: "var(--color-gray-800)" }}>{total}</strong>{" "}
        results
      </p>
      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{
            backgroundColor: page === 1 ? "transparent" : "var(--color-white)",
            border: `1px solid ${page === 1 ? "transparent" : "var(--color-gray-200)"}`,
            color: page === 1 ? "#9ca3af" : "var(--color-gray-800)",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="w-7 text-center text-xs"
              style={{ color: "#9ca3af" }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className="w-7 h-7 rounded-lg text-xs font-medium transition-colors"
              style={{
                backgroundColor:
                  p === page ? "var(--color-primary)" : "var(--color-white)",
                color: p === page ? "white" : "var(--color-gray-800)",
                border: `1px solid ${p === page ? "var(--color-primary)" : "var(--color-gray-200)"}`,
              }}
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{
            backgroundColor:
              page === totalPages ? "transparent" : "var(--color-white)",
            border: `1px solid ${page === totalPages ? "transparent" : "var(--color-gray-200)"}`,
            color: page === totalPages ? "#9ca3af" : "var(--color-gray-800)",
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  pageSize = 8,
  emptyIcon: EmptyIcon,
  emptyTitle = "No results found",
  emptySubtitle = "Try adjusting your search or filters",
  toolbar,
  footer,
  onRowClick,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);

  React.useEffect(() => setPage(1), [data.length]);

  const paginated = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="overflow-hidden">
      {/* Toolbar slot */}
      {toolbar && (
        <div
          className="p-5"
          style={{ borderBottom: "1px solid var(--color-gray-200)" }}
        >
          {toolbar}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              style={{
                backgroundColor: "var(--color-gray-100)",
                borderBottom: "1px solid var(--color-gray-200)",
              }}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-5 py-3 text-xs font-semibold uppercase"
                  style={{
                    color: "#9ca3af",
                    letterSpacing: "0.07em",
                    width: col.width,
                  }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-16"
                  style={{ color: "#9ca3af" }}
                >
                  {EmptyIcon && (
                    <EmptyIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  )}
                  <p className="text-sm">{emptyTitle}</p>
                  <p className="text-xs mt-1">{emptySubtitle}</p>
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={rowKey(row)}
                  onClick={() => onRowClick?.(row)}
                  style={{
                    borderBottom:
                      idx < paginated.length - 1
                        ? "1px solid var(--color-gray-200)"
                        : "none",
                    cursor: onRowClick ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    if (onRowClick)
                      e.currentTarget.style.backgroundColor =
                        "color-mix(in srgb, var(--color-primary) 3%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3.5">
                      {col.render(row, idx)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {footer && footer}

      <Pagination
        page={page}
        total={data.length}
        pageSize={pageSize}
        onChange={setPage}
      />
    </Card>
  );
}
