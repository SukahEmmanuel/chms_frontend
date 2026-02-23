// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   Users,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Download,
//   Filter,
//   Check,
//   X,
//   TrendingUp,
//   UserCheck,
//   UserX,
//   BarChart2,
//   BookOpen,
//   Music,
//   AlertCircle,
//   RefreshCw,
//   PlusCircle,
// } from "lucide-react";
// import DashboardLayout from "@/components/Dashboard/DashboardLayout";
// import {
//   Card,
//   SectionTitle,
//   StatCard,
// } from "@/components/Dashboard/Dashboardcomponents";

// /* ── Types ── */
// type AttendanceStatus = "present" | "absent" | "late" | "excused";
// type ServiceType =
//   | "Sunday 1st"
//   | "Sunday 2nd"
//   | "Wednesday"
//   | "Friday Youth"
//   | "Prayer Night";

// interface AttendanceRecord {
//   memberId: string;
//   status: AttendanceStatus;
//   note?: string;
// }

// interface ServiceSession {
//   id: string;
//   date: string; // YYYY-MM-DD
//   service: ServiceType;
//   records: AttendanceRecord[];
//   locked: boolean;
// }

// interface Member {
//   id: string;
//   name: string;
//   gender: "Male" | "Female";
//   roles: string[];
//   group: "Adult" | "Youth" | "Children";
// }

// /* ── Constants ── */
// const SERVICE_TYPES: ServiceType[] = [
//   "Sunday 1st",
//   "Sunday 2nd",
//   "Wednesday",
//   "Friday Youth",
//   "Prayer Night",
// ];

// const STATUS_CONFIG: Record<
//   AttendanceStatus,
//   { label: string; color: string; icon: React.ElementType }
// > = {
//   present: { label: "Present", color: "var(--color-green)", icon: CheckCircle },
//   absent: { label: "Absent", color: "var(--color-rose)", icon: XCircle },
//   late: { label: "Late", color: "var(--color-amber)", icon: Clock },
//   excused: {
//     label: "Excused",
//     color: "var(--color-purple)",
//     icon: AlertCircle,
//   },
// };

// /* ── Seed Members ── */
// const MEMBERS: Member[] = [
//   {
//     id: "M001",
//     name: "Rev. Samuel Asante",
//     gender: "Male",
//     roles: ["Pastor"],
//     group: "Adult",
//   },
//   {
//     id: "M002",
//     name: "Elder Grace Mensah",
//     gender: "Female",
//     roles: ["Elder"],
//     group: "Adult",
//   },
//   {
//     id: "M003",
//     name: "Deacon Paul Owusu",
//     gender: "Male",
//     roles: ["Deacon"],
//     group: "Adult",
//   },
//   {
//     id: "M004",
//     name: "Abena Frimpong",
//     gender: "Female",
//     roles: ["Choir"],
//     group: "Adult",
//   },
//   {
//     id: "M005",
//     name: "Kwame Boateng",
//     gender: "Male",
//     roles: ["Usher"],
//     group: "Adult",
//   },
//   {
//     id: "M006",
//     name: "Ama Darko",
//     gender: "Female",
//     roles: ["Youth Leader"],
//     group: "Youth",
//   },
//   {
//     id: "M007",
//     name: "Kofi Mensah",
//     gender: "Male",
//     roles: ["Member"],
//     group: "Youth",
//   },
//   {
//     id: "M008",
//     name: "Akosua Thompson",
//     gender: "Female",
//     roles: ["Welfare"],
//     group: "Adult",
//   },
//   {
//     id: "M009",
//     name: "Yaw Asiedu",
//     gender: "Male",
//     roles: ["Choir"],
//     group: "Adult",
//   },
//   {
//     id: "M010",
//     name: "Efua Boakye",
//     gender: "Female",
//     roles: ["Member"],
//     group: "Youth",
//   },
//   {
//     id: "M011",
//     name: "Nana Agyei",
//     gender: "Male",
//     roles: ["Usher"],
//     group: "Adult",
//   },
//   {
//     id: "M012",
//     name: "Adwoa Sarpong",
//     gender: "Female",
//     roles: ["Sunday School"],
//     group: "Adult",
//   },
// ];

// /* ── Generate seed sessions ── */
// function makeSession(
//   id: string,
//   date: string,
//   service: ServiceType,
//   locked = true,
// ): ServiceSession {
//   const statuses: AttendanceStatus[] = [
//     "present",
//     "present",
//     "present",
//     "present",
//     "late",
//     "absent",
//     "present",
//     "excused",
//     "present",
//     "present",
//     "absent",
//     "present",
//   ];
//   return {
//     id,
//     date,
//     service,
//     locked,
//     records: MEMBERS.map((m, i) => ({
//       memberId: m.id,
//       status: statuses[i % statuses.length],
//     })),
//   };
// }

// const SEED_SESSIONS: ServiceSession[] = [
//   makeSession("S001", "2025-10-20", "Sunday 1st", true),
//   makeSession("S002", "2025-10-20", "Sunday 2nd", true),
//   makeSession("S003", "2025-10-23", "Wednesday", true),
//   makeSession("S004", "2025-10-27", "Sunday 1st", false),
// ];

// /* ── Avatar ── */
// function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
//   const initials = name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
//   const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
//   const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
//   return (
//     <div
//       className={`${sz} rounded-full flex items-center justify-center font-semibold text-white shrink-0`}
//       style={{ background: `hsl(${hue}, 55%, 42%)` }}
//     >
//       {initials}
//     </div>
//   );
// }

// /* ── Status Toggle Button ── */
// function StatusToggle({
//   status,
//   onChange,
//   disabled,
// }: {
//   status: AttendanceStatus;
//   onChange: (s: AttendanceStatus) => void;
//   disabled: boolean;
// }) {
//   const cycle: AttendanceStatus[] = ["present", "late", "excused", "absent"];
//   const cfg = STATUS_CONFIG[status];
//   const Icon = cfg.icon;
//   return (
//     <button
//       disabled={disabled}
//       onClick={() => {
//         const i = cycle.indexOf(status);
//         onChange(cycle[(i + 1) % cycle.length]);
//       }}
//       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
//       style={{
//         backgroundColor: `color-mix(in srgb, ${cfg.color} 12%, transparent)`,
//         color: cfg.color,
//         border: `1px solid color-mix(in srgb, ${cfg.color} 25%, transparent)`,
//         opacity: disabled ? 0.6 : 1,
//         cursor: disabled ? "not-allowed" : "pointer",
//       }}
//     >
//       <Icon className="w-3.5 h-3.5" />
//       {cfg.label}
//     </button>
//   );
// }

// /* ── New Session Modal ── */
// function NewSessionModal({
//   onClose,
//   onCreate,
// }: {
//   onClose: () => void;
//   onCreate: (date: string, service: ServiceType) => void;
// }) {
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [service, setService] = useState<ServiceType>("Sunday 1st");
//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//     >
//       <div
//         className="w-full max-w-md rounded-2xl overflow-hidden"
//         style={{
//           backgroundColor: "var(--color-white)",
//           boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
//         }}
//       >
//         <div
//           className="px-6 py-4 flex items-center justify-between"
//           style={{ borderBottom: "1px solid var(--color-gray-200)" }}
//         >
//           <div>
//             <h2
//               className="text-base font-semibold"
//               style={{ color: "var(--color-gray-900)" }}
//             >
//               New Attendance Session
//             </h2>
//             <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
//               Create a session to mark attendance
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full flex items-center justify-center"
//             style={{ backgroundColor: "var(--color-gray-100)" }}
//           >
//             <X className="w-4 h-4" style={{ color: "var(--color-gray-500)" }} />
//           </button>
//         </div>
//         <div className="p-6 space-y-4">
//           <div>
//             <label
//               className="block text-xs font-medium mb-1.5"
//               style={{ color: "var(--color-gray-800)" }}
//             >
//               Date
//             </label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full text-sm px-3 py-2 rounded-xl outline-none"
//               style={{
//                 border: "1px solid var(--color-gray-200)",
//                 color: "var(--color-gray-800)",
//                 backgroundColor: "var(--color-white)",
//               }}
//             />
//           </div>
//           <div>
//             <label
//               className="block text-xs font-medium mb-1.5"
//               style={{ color: "var(--color-gray-800)" }}
//             >
//               Service
//             </label>
//             <select
//               value={service}
//               onChange={(e) => setService(e.target.value as ServiceType)}
//               className="w-full text-sm px-3 py-2 rounded-xl outline-none"
//               style={{
//                 border: "1px solid var(--color-gray-200)",
//                 color: "var(--color-gray-800)",
//                 backgroundColor: "var(--color-white)",
//               }}
//             >
//               {SERVICE_TYPES.map((s) => (
//                 <option key={s}>{s}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="px-6 pb-6 flex gap-3 justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-xl text-sm font-medium"
//             style={{
//               backgroundColor: "var(--color-gray-100)",
//               color: "var(--color-gray-800)",
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onCreate(date, service);
//               onClose();
//             }}
//             className="px-5 py-2 rounded-xl text-sm font-medium text-white flex items-center gap-2"
//             style={{ backgroundColor: "var(--color-primary)" }}
//           >
//             <Check className="w-4 h-4" /> Create Session
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── Main Page ── */
// export default function AttendancePage() {
//   const [sessions, setSessions] = useState<ServiceSession[]>(SEED_SESSIONS);
//   const [activeSessionId, setActiveSessionId] = useState<string>(
//     SEED_SESSIONS[SEED_SESSIONS.length - 1].id,
//   );
//   const [search, setSearch] = useState("");
//   const [groupFilter, setGroupFilter] = useState<
//     "all" | "Adult" | "Youth" | "Children"
//   >("all");
//   const [showNewModal, setShowNewModal] = useState(false);

//   const activeSession = sessions.find((s) => s.id === activeSessionId)!;

//   /* stats for active session */
//   const stats = useMemo(() => {
//     if (!activeSession)
//       return { present: 0, absent: 0, late: 0, excused: 0, total: 0, rate: 0 };
//     const r = activeSession.records;
//     const present = r.filter((x) => x.status === "present").length;
//     const absent = r.filter((x) => x.status === "absent").length;
//     const late = r.filter((x) => x.status === "late").length;
//     const excused = r.filter((x) => x.status === "excused").length;
//     const total = r.length;
//     return {
//       present,
//       absent,
//       late,
//       excused,
//       total,
//       rate: total ? Math.round(((present + late) / total) * 100) : 0,
//     };
//   }, [activeSession]);

//   /* overall trend across all sessions */
//   const trend = useMemo(
//     () =>
//       sessions.map((s) => {
//         const p = s.records.filter((r) => r.status === "present").length;
//         const l = s.records.filter((r) => r.status === "late").length;
//         return {
//           label: `${s.service.slice(0, 3)} ${s.date.slice(5)}`,
//           rate: s.records.length
//             ? Math.round(((p + l) / s.records.length) * 100)
//             : 0,
//         };
//       }),
//     [sessions],
//   );

//   const filteredMembers = MEMBERS.filter((m) => {
//     const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
//     const matchGroup = groupFilter === "all" || m.group === groupFilter;
//     return matchSearch && matchGroup;
//   });

//   const updateStatus = (memberId: string, status: AttendanceStatus) => {
//     setSessions((prev) =>
//       prev.map((s) =>
//         s.id !== activeSessionId
//           ? s
//           : {
//               ...s,
//               records: s.records.map((r) =>
//                 r.memberId === memberId ? { ...r, status } : r,
//               ),
//             },
//       ),
//     );
//   };

//   const markAll = (status: AttendanceStatus) => {
//     setSessions((prev) =>
//       prev.map((s) =>
//         s.id !== activeSessionId
//           ? s
//           : {
//               ...s,
//               records: s.records.map((r) => ({ ...r, status })),
//             },
//       ),
//     );
//   };

//   const lockSession = () => {
//     setSessions((prev) =>
//       prev.map((s) => (s.id === activeSessionId ? { ...s, locked: true } : s)),
//     );
//   };

//   const createSession = (date: string, service: ServiceType) => {
//     const id = `S${Date.now()}`;
//     const newSession: ServiceSession = {
//       id,
//       date,
//       service,
//       locked: false,
//       records: MEMBERS.map((m) => ({ memberId: m.id, status: "absent" })),
//     };
//     setSessions((prev) => [...prev, newSession]);
//     setActiveSessionId(id);
//   };

//   const getRecord = (memberId: string) =>
//     activeSession?.records.find((r) => r.memberId === memberId);

//   return (
//     <DashboardLayout>
//       <div
//         className="min-h-screen"
//         style={{ backgroundColor: "var(--color-gray-100)" }}
//       >
//         <div className="px-6 mt-8 max-w-7xl mx-auto pb-12 space-y-6">
//           {/* ── Stats ── */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <StatCard
//               label="Present"
//               value={stats.present}
//               sub={`${stats.rate}% attendance rate`}
//               icon={UserCheck}
//               accent="var(--color-green)"
//               showTrend
//             />
//             <StatCard
//               label="Absent"
//               value={stats.absent}
//               sub="Need follow-up"
//               icon={UserX}
//               accent="var(--color-rose)"
//             />
//             <StatCard
//               label="Late"
//               value={stats.late}
//               sub="Arrived late"
//               icon={Clock}
//               accent="var(--color-amber)"
//             />
//             <StatCard
//               label="Excused"
//               value={stats.excused}
//               sub="Notified absence"
//               icon={AlertCircle}
//               accent="var(--color-purple)"
//             />
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* ── Session Selector ── */}
//             <Card className="p-5">
//               <div className="flex items-center justify-between mb-4">
//                 <SectionTitle
//                   title="Sessions"
//                   sub={`${sessions.length} total`}
//                 />
//                 <button
//                   onClick={() => setShowNewModal(true)}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white shrink-0"
//                   style={{ backgroundColor: "var(--color-primary)" }}
//                 >
//                   <PlusCircle className="w-3 h-3" /> New
//                 </button>
//               </div>
//               <div className="space-y-2">
//                 {[...sessions].reverse().map((s) => {
//                   const isActive = s.id === activeSessionId;
//                   const pCount = s.records.filter(
//                     (r) => r.status === "present",
//                   ).length;
//                   const rate = s.records.length
//                     ? Math.round((pCount / s.records.length) * 100)
//                     : 0;
//                   return (
//                     <button
//                       key={s.id}
//                       onClick={() => setActiveSessionId(s.id)}
//                       className="w-full text-left p-3 rounded-xl transition-all"
//                       style={{
//                         backgroundColor: isActive
//                           ? "color-mix(in srgb, var(--color-primary) 8%, transparent)"
//                           : "var(--color-gray-100)",
//                         border: `1px solid ${isActive ? "color-mix(in srgb, var(--color-primary) 25%, transparent)" : "var(--color-gray-200)"}`,
//                       }}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p
//                             className="text-sm font-semibold"
//                             style={{
//                               color: isActive
//                                 ? "var(--color-primary)"
//                                 : "var(--color-gray-800)",
//                             }}
//                           >
//                             {s.service}
//                           </p>
//                           <p
//                             className="text-xs mt-0.5"
//                             style={{ color: "#9ca3af" }}
//                           >
//                             {s.date}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p
//                             className="text-sm font-bold"
//                             style={{
//                               color: isActive
//                                 ? "var(--color-primary)"
//                                 : "var(--color-gray-800)",
//                             }}
//                           >
//                             {rate}%
//                           </p>
//                           <span
//                             className="text-xs px-1.5 py-0.5 rounded-full"
//                             style={{
//                               backgroundColor: s.locked
//                                 ? "color-mix(in srgb, var(--color-green) 10%, transparent)"
//                                 : "color-mix(in srgb, var(--color-amber) 10%, transparent)",
//                               color: s.locked
//                                 ? "var(--color-green)"
//                                 : "var(--color-amber)",
//                             }}
//                           >
//                             {s.locked ? "Locked" : "Open"}
//                           </span>
//                         </div>
//                       </div>
//                       {/* mini bar */}
//                       <div
//                         className="mt-2 h-1.5 rounded-full overflow-hidden"
//                         style={{ backgroundColor: "var(--color-gray-200)" }}
//                       >
//                         <div
//                           className="h-full rounded-full"
//                           style={{
//                             width: `${rate}%`,
//                             backgroundColor: isActive
//                               ? "var(--color-primary)"
//                               : "var(--color-green)",
//                           }}
//                         />
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </Card>

//             {/* ── Attendance Rate Summary ── */}
//             <Card className="lg:col-span-2 p-5">
//               <SectionTitle
//                 title="Session Overview"
//                 sub={`${activeSession?.service} · ${activeSession?.date}`}
//               />

//               {/* Rate ring + breakdown */}
//               <div className="flex items-center gap-6 mb-6">
//                 {/* Big rate circle */}
//                 <div className="relative w-28 h-28 shrink-0">
//                   <svg
//                     viewBox="0 0 100 100"
//                     className="w-full h-full -rotate-90"
//                   >
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="40"
//                       fill="none"
//                       stroke="var(--color-gray-200)"
//                       strokeWidth="10"
//                     />
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="40"
//                       fill="none"
//                       stroke="var(--color-primary)"
//                       strokeWidth="10"
//                       strokeDasharray={`${stats.rate * 2.51} 251`}
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center">
//                     <span
//                       className="text-2xl font-bold"
//                       style={{ color: "var(--color-primary)" }}
//                     >
//                       {stats.rate}%
//                     </span>
//                     <span className="text-xs" style={{ color: "#9ca3af" }}>
//                       rate
//                     </span>
//                   </div>
//                 </div>

//                 {/* Breakdown */}
//                 <div className="flex-1 grid grid-cols-2 gap-3">
//                   {(
//                     [
//                       "present",
//                       "absent",
//                       "late",
//                       "excused",
//                     ] as AttendanceStatus[]
//                   ).map((s) => {
//                     const cfg = STATUS_CONFIG[s];
//                     const count =
//                       activeSession?.records.filter((r) => r.status === s)
//                         .length ?? 0;
//                     const pct = stats.total
//                       ? Math.round((count / stats.total) * 100)
//                       : 0;
//                     return (
//                       <div
//                         key={s}
//                         className="rounded-xl p-3"
//                         style={{
//                           backgroundColor: `color-mix(in srgb, ${cfg.color} 6%, transparent)`,
//                           border: `1px solid color-mix(in srgb, ${cfg.color} 15%, transparent)`,
//                         }}
//                       >
//                         <p
//                           className="text-xl font-bold"
//                           style={{ color: cfg.color }}
//                         >
//                           {count}
//                         </p>
//                         <p className="text-xs" style={{ color: "#9ca3af" }}>
//                           {cfg.label}
//                         </p>
//                         <div
//                           className="mt-1.5 h-1 rounded-full"
//                           style={{
//                             backgroundColor: `color-mix(in srgb, ${cfg.color} 20%, transparent)`,
//                           }}
//                         >
//                           <div
//                             className="h-full rounded-full"
//                             style={{
//                               width: `${pct}%`,
//                               backgroundColor: cfg.color,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Trend bars */}
//               <div>
//                 <p
//                   className="text-xs font-semibold mb-3"
//                   style={{
//                     color: "#9ca3af",
//                     letterSpacing: "0.08em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Attendance Rate — Recent Sessions
//                 </p>
//                 <div className="flex items-end gap-2 h-20">
//                   {trend.map((t, i) => (
//                     <div
//                       key={i}
//                       className="flex-1 flex flex-col items-center gap-1"
//                     >
//                       <span
//                         className="text-xs font-bold"
//                         style={{ color: "var(--color-gray-800)" }}
//                       >
//                         {t.rate}%
//                       </span>
//                       <div
//                         className="w-full rounded-t-lg"
//                         style={{
//                           height: `${(t.rate / 100) * 56}px`,
//                           backgroundColor:
//                             sessions[i]?.id === activeSessionId
//                               ? "var(--color-primary)"
//                               : "color-mix(in srgb, var(--color-primary) 30%, transparent)",
//                         }}
//                       />
//                       <span
//                         className="text-xs text-center"
//                         style={{ color: "#9ca3af", fontSize: 10 }}
//                       >
//                         {t.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>
//           </div>

//           {/* ── Mark Attendance Table ── */}
//           <Card className="overflow-hidden">
//             {/* Toolbar */}
//             <div
//               className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
//               style={{ borderBottom: "1px solid var(--color-gray-200)" }}
//             >
//               <div className="flex-1">
//                 <div className="flex items-center gap-2">
//                   <h2
//                     className="text-base font-semibold"
//                     style={{ color: "var(--color-gray-900)" }}
//                   >
//                     Mark Attendance
//                   </h2>
//                   <span
//                     className="text-xs px-2 py-0.5 rounded-full font-medium"
//                     style={{
//                       backgroundColor: activeSession?.locked
//                         ? "color-mix(in srgb, var(--color-green) 10%, transparent)"
//                         : "color-mix(in srgb, var(--color-amber) 10%, transparent)",
//                       color: activeSession?.locked
//                         ? "var(--color-green)"
//                         : "var(--color-amber)",
//                     }}
//                   >
//                     {activeSession?.locked ? "🔒 Locked" : "✏️ Editable"}
//                   </span>
//                 </div>
//                 <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
//                   {activeSession?.service} · {activeSession?.date} ·{" "}
//                   {filteredMembers.length} members
//                 </p>
//               </div>

//               {/* Search */}
//               <div
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl w-full sm:w-52"
//                 style={{
//                   backgroundColor: "var(--color-gray-100)",
//                   border: "1px solid var(--color-gray-200)",
//                 }}
//               >
//                 <Search
//                   className="w-4 h-4 shrink-0"
//                   style={{ color: "#9ca3af" }}
//                 />
//                 <input
//                   className="flex-1 text-xs bg-transparent outline-none"
//                   style={{ color: "var(--color-gray-800)" }}
//                   placeholder="Search members..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* Group filter */}
//               <select
//                 className="text-xs px-3 py-2 rounded-xl outline-none"
//                 style={{
//                   backgroundColor: "var(--color-gray-100)",
//                   border: "1px solid var(--color-gray-200)",
//                   color: "var(--color-gray-800)",
//                 }}
//                 value={groupFilter}
//                 onChange={(e) =>
//                   setGroupFilter(e.target.value as typeof groupFilter)
//                 }
//               >
//                 <option value="all">All Groups</option>
//                 <option value="Adult">Adults</option>
//                 <option value="Youth">Youth</option>
//                 <option value="Children">Children</option>
//               </select>

//               {/* Quick mark all */}
//               {!activeSession?.locked && (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => markAll("present")}
//                     className="text-xs px-3 py-2 rounded-xl font-medium flex items-center gap-1"
//                     style={{
//                       backgroundColor:
//                         "color-mix(in srgb, var(--color-green) 10%, transparent)",
//                       color: "var(--color-green)",
//                     }}
//                   >
//                     <Check className="w-3 h-3" /> All Present
//                   </button>
//                   <button
//                     onClick={() => markAll("absent")}
//                     className="text-xs px-3 py-2 rounded-xl font-medium flex items-center gap-1"
//                     style={{
//                       backgroundColor:
//                         "color-mix(in srgb, var(--color-rose) 10%, transparent)",
//                       color: "var(--color-rose)",
//                     }}
//                   >
//                     <X className="w-3 h-3" /> All Absent
//                   </button>
//                 </div>
//               )}

//               {/* Lock / Unlock */}
//               {!activeSession?.locked ? (
//                 <button
//                   onClick={lockSession}
//                   className="text-xs px-4 py-2 rounded-xl font-medium text-white flex items-center gap-1.5 shrink-0"
//                   style={{ backgroundColor: "var(--color-primary)" }}
//                 >
//                   <CheckCircle className="w-3.5 h-3.5" /> Submit & Lock
//                 </button>
//               ) : (
//                 <button
//                   onClick={() =>
//                     setSessions((prev) =>
//                       prev.map((s) =>
//                         s.id === activeSessionId ? { ...s, locked: false } : s,
//                       ),
//                     )
//                   }
//                   className="text-xs px-4 py-2 rounded-xl font-medium flex items-center gap-1.5 shrink-0"
//                   style={{
//                     backgroundColor: "var(--color-gray-100)",
//                     color: "var(--color-gray-800)",
//                     border: "1px solid var(--color-gray-200)",
//                   }}
//                 >
//                   <RefreshCw className="w-3.5 h-3.5" /> Unlock
//                 </button>
//               )}
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr
//                     style={{
//                       backgroundColor: "var(--color-gray-100)",
//                       borderBottom: "1px solid var(--color-gray-200)",
//                     }}
//                   >
//                     {["#", "Member", "Group", "Role", "Status", ""].map((h) => (
//                       <th
//                         key={h}
//                         className="text-left px-5 py-3 text-xs font-semibold uppercase"
//                         style={{ color: "#9ca3af", letterSpacing: "0.07em" }}
//                       >
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredMembers.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={6}
//                         className="text-center py-16"
//                         style={{ color: "#9ca3af" }}
//                       >
//                         <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
//                         <p className="text-sm">No members found</p>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredMembers.map((m, idx) => {
//                       const record = getRecord(m.id);
//                       const status = record?.status ?? "absent";
//                       const cfg = STATUS_CONFIG[status];
//                       return (
//                         <tr
//                           key={m.id}
//                           style={{
//                             borderBottom:
//                               idx < filteredMembers.length - 1
//                                 ? "1px solid var(--color-gray-200)"
//                                 : "none",
//                           }}
//                         >
//                           {/* # */}
//                           <td className="px-5 py-3.5">
//                             <span
//                               className="text-xs"
//                               style={{ color: "#9ca3af" }}
//                             >
//                               {idx + 1}
//                             </span>
//                           </td>
//                           {/* Member */}
//                           <td className="px-5 py-3.5">
//                             <div className="flex items-center gap-3">
//                               <Avatar name={m.name} />
//                               <div>
//                                 <p
//                                   className="text-sm font-medium"
//                                   style={{ color: "var(--color-gray-900)" }}
//                                 >
//                                   {m.name}
//                                 </p>
//                                 <p
//                                   className="text-xs"
//                                   style={{ color: "#9ca3af" }}
//                                 >
//                                   {m.id}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>
//                           {/* Group */}
//                           <td className="px-5 py-3.5">
//                             <span
//                               className="text-xs px-2 py-0.5 rounded-full"
//                               style={{
//                                 backgroundColor:
//                                   m.group === "Adult"
//                                     ? "color-mix(in srgb, var(--color-primary) 8%, transparent)"
//                                     : m.group === "Youth"
//                                       ? "color-mix(in srgb, var(--color-teal) 8%, transparent)"
//                                       : "color-mix(in srgb, var(--color-amber) 8%, transparent)",
//                                 color:
//                                   m.group === "Adult"
//                                     ? "var(--color-primary)"
//                                     : m.group === "Youth"
//                                       ? "var(--color-teal)"
//                                       : "var(--color-amber)",
//                               }}
//                             >
//                               {m.group}
//                             </span>
//                           </td>
//                           {/* Role */}
//                           <td className="px-5 py-3.5">
//                             <p
//                               className="text-xs"
//                               style={{ color: "var(--color-gray-500)" }}
//                             >
//                               {m.roles[0]}
//                             </p>
//                           </td>
//                           {/* Status toggle */}
//                           <td className="px-5 py-3.5">
//                             <StatusToggle
//                               status={status}
//                               onChange={(s) => updateStatus(m.id, s)}
//                               disabled={activeSession?.locked ?? false}
//                             />
//                           </td>
//                           {/* Visual indicator bar */}
//                           <td className="px-5 py-3.5 w-4">
//                             <div
//                               className="w-1 h-8 rounded-full"
//                               style={{ backgroundColor: cfg.color }}
//                             />
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Footer summary */}
//             <div
//               className="px-5 py-3 flex items-center gap-6"
//               style={{
//                 borderTop: "1px solid var(--color-gray-200)",
//                 backgroundColor: "var(--color-gray-100)",
//               }}
//             >
//               {(
//                 ["present", "late", "excused", "absent"] as AttendanceStatus[]
//               ).map((s) => {
//                 const cfg = STATUS_CONFIG[s];
//                 const count =
//                   activeSession?.records.filter((r) => r.status === s).length ??
//                   0;
//                 return (
//                   <div key={s} className="flex items-center gap-1.5">
//                     <div
//                       className="w-2 h-2 rounded-full"
//                       style={{ backgroundColor: cfg.color }}
//                     />
//                     <span className="text-xs" style={{ color: "#9ca3af" }}>
//                       {cfg.label}:{" "}
//                       <strong style={{ color: "var(--color-gray-800)" }}>
//                         {count}
//                       </strong>
//                     </span>
//                   </div>
//                 );
//               })}
//               <div className="ml-auto">
//                 <span
//                   className="text-xs font-medium"
//                   style={{ color: "var(--color-gray-500)" }}
//                 >
//                   Total:{" "}
//                   <strong style={{ color: "var(--color-gray-900)" }}>
//                     {stats.total}
//                   </strong>
//                 </span>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {showNewModal && (
//         <NewSessionModal
//           onClose={() => setShowNewModal(false)}
//           onCreate={createSession}
//         />
//       )}
//     </DashboardLayout>
//   );
// }
