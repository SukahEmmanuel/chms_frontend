"use client";

import React, { useState } from "react";
import {
  Users,
  Calendar,
  Heart,
  BookOpen,
  Bell,
  ChevronRight,
  TrendingUp,
  DollarSign,
  MessageSquare,
  CheckCircle,
  Gift,
  Phone,
  Mail,
  PlusCircle,
  Megaphone,
  HandHeart,
  Activity,
  UserPlus,
  UserCheck,
  Shield,
  Send,
  Star,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import {
  Card,
  SectionTitle,
  StatCard,
} from "@/components/Dashboard/Dashboardcomponents";

const tooltipStyle = {
  backgroundColor: "var(--color-white)",
  border: "1px solid var(--color-gray-200)",
  borderRadius: 10,
  fontSize: 11,
};

/* ── Data ── */
const attendanceData = [
  { week: "Wk 1", adults: 312, youth: 98, children: 67 },
  { week: "Wk 2", adults: 289, youth: 112, children: 72 },
  { week: "Wk 3", adults: 340, youth: 105, children: 80 },
  { week: "Wk 4", adults: 365, youth: 134, children: 91 },
  { week: "Wk 5", adults: 328, youth: 119, children: 76 },
  { week: "Wk 6", adults: 402, youth: 145, children: 99 },
];

const financeData = [
  { month: "May", tithes: 42000, offerings: 18000, expenses: 28000 },
  { month: "Jun", tithes: 48000, offerings: 21000, expenses: 31000 },
  { month: "Jul", tithes: 38000, offerings: 16000, expenses: 29000 },
  { month: "Aug", tithes: 55000, offerings: 24000, expenses: 32000 },
  { month: "Sep", tithes: 51000, offerings: 22000, expenses: 30000 },
  { month: "Oct", tithes: 62000, offerings: 28000, expenses: 35000 },
];

const genderData = [
  { name: "Women", value: 524, color: "var(--color-rose)" },
  { name: "Men", value: 412, color: "var(--color-primary)" },
  { name: "Youth", value: 198, color: "var(--color-secondary-dark)" },
  { name: "Children", value: 113, color: "var(--color-teal)" },
];

const recentTransactions = [
  {
    id: "TXN-001",
    name: "John & Mary Doe",
    type: "Tithe",
    amount: 500,
    date: "Oct 24",
  },
  {
    id: "TXN-002",
    name: "Sarah Smith",
    type: "Offering",
    amount: 200,
    date: "Oct 24",
  },
  {
    id: "TXN-003",
    name: "Building Fund",
    type: "Donation",
    amount: 5000,
    date: "Oct 23",
  },
  {
    id: "TXN-004",
    name: "Mission Trip",
    type: "Donation",
    amount: 1200,
    date: "Oct 22",
  },
];


const upcomingEvents = [
  {
    name: "Sunday Service",
    date: "Oct 27",
    time: "9:00 AM",
    type: "service",
    registrations: 234,
  },
  {
    name: "Youth Conference",
    date: "Nov 1",
    time: "10:00 AM",
    type: "conference",
    registrations: 89,
  },
  {
    name: "Prayer Night",
    date: "Oct 29",
    time: "7:00 PM",
    type: "prayer",
    registrations: 67,
  },
  {
    name: "Choir Rehearsal",
    date: "Oct 28",
    time: "5:00 PM",
    type: "ministry",
    registrations: 42,
  },
];

const eventTypeColor: Record<string, string> = {
  service: "var(--color-primary)",
  conference: "var(--color-purple)",
  prayer: "var(--color-teal)",
  ministry: "var(--color-amber)",
};

export default function ChurchDashboard() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  return (
    <DashboardLayout>
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--color-gray-100)" }}
      >
        <div className="px-6 mt-8 max-w-7xl mx-auto pb-12 space-y-6">
          {/*Overview*/}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total Members"
              value="1,247"
              sub="+23 this month"
              icon={Users}
              accent={"var(--color-primary)"}
              showTrend
            />
            <StatCard
              label="Today's Attendance"
              value="402"
              sub="All services combined"
              icon={Activity}
              accent={"var(--color-teal)"}
              showTrend
            />
            <StatCard
              label="Upcoming Events"
              value="12"
              sub="Next 30 days"
              icon={Calendar}
              accent={"var(--color-amber)"}
            />
            <StatCard
              label="Active Ministries"
              value="8"
              sub="Across all departments"
              icon={Star}
              accent={"var(--color-purple)"}
            />
          </div>

          {/*Attendance Analytics*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Trend */}
            <Card className="lg:col-span-2 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--color-gray-900)" }}
                  >
                    Attendance Trend
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                    Weekly breakdown by group
                  </p>
                </div>
                <div className="flex gap-1">
                  {(["weekly", "monthly"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className="px-3 py-1 rounded-lg text-xs capitalize"
                      style={{
                        backgroundColor:
                          activeTab === t
                            ? "var(--color-primary)"
                            : "var(--color-gray-100)",
                        color:
                          activeTab === t
                            ? "var(--color-white)"
                            : "var(--color-gray-500)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="adultGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={"var(--color-primary)"}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={"var(--color-primary)"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="youthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={"var(--color-secondary-dark)"}
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor={"var(--color-secondary-dark)"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={"var(--color-gray-200)"}
                  />
                  <XAxis
                    dataKey="week"
                    stroke="#9ca3af"
                    fontSize={11}
                    tick={{}}
                  />
                  <YAxis stroke="#9ca3af" fontSize={11} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area
                    type="monotone"
                    dataKey="adults"
                    stroke={"var(--color-primary)"}
                    strokeWidth={2}
                    fill="url(#adultGrad)"
                    dot={false}
                    activeDot={{
                      fill: "var(--color-secondary)",
                      r: 4,
                      stroke: "var(--color-primary)",
                      strokeWidth: 2,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="youth"
                    stroke={"var(--color-secondary-dark)"}
                    strokeWidth={2}
                    fill="url(#youthGrad)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="children"
                    stroke={"var(--color-teal)"}
                    strokeWidth={2}
                    fill="none"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Congregation Breakdown */}
            <Card className="p-6">
              <SectionTitle
                title="Congregation Breakdown"
                sub="By age / gender"
              />
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {genderData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1.5">
                {genderData.map((g) => (
                  <div
                    key={g.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: g.color }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-gray-500)" }}
                      >
                        {g.name}
                      </span>
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--color-gray-800)" }}
                    >
                      {g.value}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="mt-3 grid grid-cols-2 gap-2 pt-3"
                style={{ borderTop: "1px solid var(--color-gray-200)" }}
              >
                <div
                  className="rounded-xl p-2.5 text-center"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-primary) 5%, transparent)`,
                    border: `1px solid color-mix(in srgb, var(--color-primary) 12%, transparent)`,
                  }}
                >
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    First-time
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    14
                  </p>
                </div>
                <div
                  className="rounded-xl p-2.5 text-center"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-rose) 5%, transparent)`,
                    border: `1px solid color-mix(in srgb, var(--color-rose) 12%, transparent)`,
                  }}
                >
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    Absent
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{ color: "var(--color-rose)" }}
                  >
                    38
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/*Finance Overview*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <SectionTitle
                title="Finance Overview"
                sub="Last 6 months"
                action="Full Report"
              />
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  {
                    label: "Total Tithes",
                    value: "Ghs62,000",
                    color: "var(--color-primary)",
                  },
                  {
                    label: "Offerings",
                    value: "Ghs28,000",
                    color: "var(--color-teal)",
                  },
                  {
                    label: "Expenses",
                    value: "Ghs35,000",
                    color: "var(--color-rose)",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${color} 5%, transparent)`,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
                      {label}
                    </p>
                    <p className="text-base font-bold" style={{ color }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={financeData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={"var(--color-gray-200)"}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    fontSize={11}
                    tick={{}}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(v: number) =>
                      `Ghs${(v / 1000).toFixed(0)}k`
                    }
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: string | number | undefined) =>
                      `Ghs${(v ?? 0).toLocaleString()}`
                    }
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar
                    dataKey="tithes"
                    fill={"var(--color-primary)"}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="offerings"
                    fill={"var(--color-teal)"}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="expenses"
                    fill={"var(--color-rose)"}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-5">
              <SectionTitle title="Recent Transactions" action="View All" />
              <div className="space-y-2.5 mb-4">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl"
                    style={{ backgroundColor: "var(--color-gray-100)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--color-primary) 8%, transparent)`,
                      }}
                    >
                      <DollarSign
                        className="w-4 h-4"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-medium truncate"
                        style={{ color: "var(--color-gray-800)" }}
                      >
                        {tx.name}
                      </p>
                      <p className="text-xs" style={{ color: "#9ca3af" }}>
                        {tx.type} · {tx.date}
                      </p>
                    </div>
                    <span
                      className="text-xs font-bold shrink-0"
                      style={{ color: "var(--color-green)" }}
                    >
                      Ghs{tx.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--color-primary) 5%, transparent)`,
                  border: `1px solid color-mix(in srgb, var(--color-primary) 12%, transparent)`,
                }}
              >
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Month Balance
                </p>
                <p
                  className="text-xl font-bold mt-0.5"
                  style={{ color: "var(--color-primary)" }}
                >
                  Ghs55,000
                </p>
                <p
                  className="text-xs mt-0.5 flex items-center gap-1"
                  style={{ color: "var(--color-green)" }}
                >
                  <TrendingUp className="w-3 h-3" /> +8.2% vs last month
                </p>
              </div>
            </Card>
          </div>

          {/*Events*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-3 p-5">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h2
                    className="text-base font-semibold"
                    style={{ color: "var(--color-gray-900)" }}
                  >
                    Events & Activities
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                    Upcoming in the next 30 days
                  </p>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <PlusCircle className="w-3 h-3" /> Add Event
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {upcomingEvents.map((ev) => {
                  const color =
                    eventTypeColor[ev.type] || "var(--color-primary)";
                  return (
                    <div
                      key={ev.name}
                      className="rounded-xl p-4 relative overflow-hidden"
                      style={{
                        border: `1px solid color-mix(in srgb, ${color} 14%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${color} 4%, transparent)`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
                        style={{ backgroundColor: color }}
                      />
                      <div className="ml-2">
                        <p
                          className="text-sm font-semibold mb-0.5"
                          style={{ color: "var(--color-gray-800)" }}
                        >
                          {ev.name}
                        </p>
                        <p
                          className="text-xs mb-2.5"
                          style={{ color: "#9ca3af" }}
                        >
                          {ev.date} · {ev.time}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full capitalize"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                              color,
                            }}
                          >
                            {ev.type}
                          </span>
                          <span
                            className="text-xs flex items-center gap-1"
                            style={{ color: "#9ca3af" }}
                          >
                            <Users className="w-3 h-3" />
                            {ev.registrations} registered
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className="mt-4 p-3 rounded-xl flex items-center gap-3"
                style={{
                  backgroundColor: "var(--color-gray-100)",
                  border: "1px solid var(--color-gray-200)",
                }}
              >
                <Calendar
                  className="w-4 h-4 shrink-0"
                  style={{ color: "var(--color-primary)" }}
                />
                <p
                  className="text-xs flex-1"
                  style={{ color: "var(--color-gray-500)" }}
                >
                  Next major event:{" "}
                  <span
                    style={{ color: "var(--color-primary)", fontWeight: 600 }}
                  >
                    Youth Conference — Nov 1, 2025
                  </span>
                </p>
                <button
                  className="text-xs px-3 py-1 rounded-lg shrink-0"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-primary) 7%, transparent)`,
                    color: "var(--color-primary)",
                  }}
                >
                  View Calendar
                </button>
              </div>
            </Card>
          </div>

          {/*Notifications*/}
        </div>
      </div>
    </DashboardLayout>
  );
}
