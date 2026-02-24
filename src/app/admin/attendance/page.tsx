"use client";

import React, { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { StatCard } from "@/components/Dashboard/Dashboardcomponents";
import { DataTable, Column } from "@/components/Datatable/datatable";
import {
  Modal,
  ModalCancelButton,
  ModalPrimaryButton,
} from "@/components/Modal/modal ";

/* ───────────────────────── Types ───────────────────────── */

type AttendanceStatus = "present" | "absent" | "first-time" | "late";

interface AttendanceRecord {
  id: string;
  name: string;
  service: string;
  date: string;
  status: AttendanceStatus;
  checkInTime?: string;
}
type StatusStyle = {
  label: string;
  className: string;
  icon: LucideIcon;
};
const styles: Record<AttendanceStatus, StatusStyle> = {
  present: {
    label: "Present",
    className: "text-green-600",
    icon: CheckCircle2,
  },
  absent: {
    label: "Absent",
    className: "text-red-600",
    icon: XCircle,
  },
  "first-time": {
    label: "First-Time",
    className: "text-primary",
    icon: UserPlus,
  },
  late: {
    label: "Late",
    className: "text-amber-600",
    icon: Clock,
  },
};

/* ───────────────────────── Seed Data ───────────────────────── */

const SERVICES = [
  "Sunday Service",
  "Midweek Service",
  "Youth Service",
  "Prayer Night",
];

const SEED: AttendanceRecord[] = [
  {
    id: "A001",
    name: "Rev. Samuel Asante",
    service: "Sunday Service",
    date: "2025-10-27",
    status: "present",
    checkInTime: "08:54 AM",
  },
  {
    id: "A002",
    name: "Abena Frimpong",
    service: "Sunday Service",
    date: "2025-10-27",
    status: "late",
    checkInTime: "09:22 AM",
  },
  {
    id: "A003",
    name: "Kofi Mensah",
    service: "Sunday Service",
    date: "2025-10-27",
    status: "first-time",
  },
  {
    id: "A004",
    name: "Kwabena Darko",
    service: "Sunday Service",
    date: "2025-10-27",
    status: "absent",
  },
];

/* ───────────────────────── Status Badge ───────────────────────── */

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<
    AttendanceStatus,
    { bg: string; text: string; icon: LucideIcon; label: string }
  > = {
    present: {
      bg: "color-mix(in srgb, var(--color-green) 10%, transparent)",
      text: "var(--color-green)",
      icon: CheckCircle2,
      label: "Present",
    },
    absent: {
      bg: "color-mix(in srgb, var(--color-rose) 10%, transparent)",
      text: "var(--color-rose)",
      icon: XCircle,
      label: "Absent",
    },
    "first-time": {
      bg: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
      text: "var(--color-primary)",
      icon: UserPlus,
      label: "First-Time",
    },
    late: {
      bg: "color-mix(in srgb, var(--color-amber) 10%, transparent)",
      text: "var(--color-amber)",
      icon: Clock,
      label: "Late",
    },
  };

  const s = styles[status];
  const Icon = s.icon;

  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <Icon className="w-3 h-3" />
      {s.label}
    </span>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>(SEED);
  const [serviceFilter, setServiceFilter] = useState<string>("Sunday Service");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | "all">(
    "all",
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [manualName, setManualName] = useState("");

  /* ───────────────────────── Derived Data ───────────────────────── */

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const serviceMatch = r.service === serviceFilter;
      const searchMatch = r.name.toLowerCase().includes(search.toLowerCase());
      const statusMatch = statusFilter === "all" || r.status === statusFilter;

      return serviceMatch && searchMatch && statusMatch;
    });
  }, [records, serviceFilter, search, statusFilter]);

  const stats = {
    total: filtered.length,
    present: filtered.filter((r) => r.status === "present").length,
    firstTime: filtered.filter((r) => r.status === "first-time").length,
    absent: filtered.filter((r) => r.status === "absent").length,
  };

  /* ───────────────────────── Actions ───────────────────────── */

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              checkInTime:
                status === "present" || status === "late"
                  ? new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : undefined,
            }
          : r,
      ),
    );
  };

  const addManualCheckIn = () => {
    if (!manualName.trim()) return;

    setRecords((prev) => [
      ...prev,
      {
        id: `A${Date.now()}`,
        name: manualName,
        service: serviceFilter,
        date: new Date().toISOString().split("T")[0],
        status: "first-time",
      },
    ]);

    setManualName("");
    setModalOpen(false);
  };

  /* ───────────────────────── Table Columns ───────────────────────── */

  const columns: Column<AttendanceRecord>[] = [
    {
      key: "name",
      header: "Member",
      render: (r) => (
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-gray-900)" }}
          >
            {r.name}
          </p>
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            {r.date}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "time",
      header: "Check-in",
      render: (r) => (
        <p className="text-xs" style={{ color: "#9ca3af" }}>
          {r.checkInTime || "-"}
        </p>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateStatus(r.id, "present")}
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-green) 10%, transparent)",
              color: "var(--color-green)",
            }}
          >
            Present
          </button>
          <button
            onClick={() => updateStatus(r.id, "absent")}
            className="text-xs px-2 py-1 rounded-lg"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-rose) 10%, transparent)",
              color: "var(--color-rose)",
            }}
          >
            Absent
          </button>
        </div>
      ),
    },
  ];

  /* ───────────────────────── UI ───────────────────────── */

  const toolbar = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex-1">
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--color-gray-900)" }}
        >
          Attendance
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
          {filtered.length} record
          {filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <select
        value={serviceFilter}
        onChange={(e) => setServiceFilter(e.target.value)}
        className="text-xs px-3 py-2 rounded-xl outline-none"
        style={{
          backgroundColor: "var(--color-gray-100)",
          border: "1px solid var(--color-gray-200)",
        }}
      >
        {SERVICES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl w-full sm:w-56"
        style={{
          backgroundColor: "var(--color-gray-100)",
          border: "1px solid var(--color-gray-200)",
        }}
      >
        <Search className="w-4 h-4 shrink-0" style={{ color: "#9ca3af" }} />
        <input
          className="flex-1 text-xs bg-transparent outline-none"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <UserPlus className="w-4 h-4" />
        Manual Check-in
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-gray-100)" }}
      >
        <div className="px-6 mt-8 max-w-7xl mx-auto pb-12 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total"
              value={stats.total}
              sub={serviceFilter}
              icon={Users}
              accent="var(--color-primary)"
            />
            <StatCard
              label="Present"
              value={stats.present}
              sub="Checked in"
              icon={UserCheck}
              accent="var(--color-green)"
            />
            <StatCard
              label="First-Time"
              value={stats.firstTime}
              sub="New visitors"
              icon={UserPlus}
              accent="var(--color-teal)"
            />
            <StatCard
              label="Absent"
              value={stats.absent}
              sub="Not present"
              icon={UserX}
              accent="var(--color-rose)"
            />
          </div>

          <DataTable
            data={filtered}
            columns={columns}
            rowKey={(r) => r.id}
            pageSize={8}
            emptyIcon={Calendar}
            emptyTitle="No attendance records"
            emptySubtitle="No data for this service"
            toolbar={toolbar}
          />
        </div>
      </div>

      {/* Manual Check-in Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Manual Check-in"
        subtitle="Register a first-time guest or walk-in"
        footer={
          <>
            <ModalCancelButton onClick={() => setModalOpen(false)} />
            <ModalPrimaryButton
              onClick={addManualCheckIn}
              label="Check In"
              icon={CheckCircle2}
              disabled={!manualName.trim()}
            />
          </>
        }
      >
        <div>
          <label className="block text-xs mb-1.5">Guest / Member Name</label>
          <input
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-xl outline-none"
            style={{
              border: "1px solid var(--color-gray-200)",
              backgroundColor: "var(--color-white)",
            }}
            placeholder="Enter full name"
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}
