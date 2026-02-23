"use client";

import React, { useState } from "react";
import {
  Users, UserPlus, Search, MoreVertical, Edit2,
  Trash2, Phone, Mail, MapPin, Calendar, UserCheck,
  Check, Camera,
} from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { StatCard } from "@/components/Dashboard/Dashboardcomponents";
import { DataTable, Column } from "@/components/Datatable/datatable";
import { Modal, ModalCancelButton, ModalPrimaryButton } from "@/components/Modal/modal ";
import { Drawer, DrawerHeader, DrawerRow, DrawerPrimaryButton } from "@/components/Drawer/drawer";

/* ── Types ── */
type Role =
  | "Pastor" | "Elder" | "Deacon" | "Choir" | "Usher"
  | "Youth Leader" | "Media" | "Welfare" | "Prayer Team"
  | "Cell Leader" | "Sunday School" | "Member";

type MemberStatus = "active" | "inactive" | "new";
type Gender      = "Male" | "Female";
type MemberType  = "New Convert" | "Transfer" | "Born Here";

interface Member {
  id: string; name: string; email: string; phone: string;
  gender: Gender; dob: string; address: string; joinDate: string;
  roles: Role[]; status: MemberStatus; memberType: MemberType;
}

/* ── Constants ── */
const ALL_ROLES: Role[] = [
  "Pastor","Elder","Deacon","Choir","Usher",
  "Youth Leader","Media","Welfare","Prayer Team",
  "Cell Leader","Sunday School","Member",
];

const ROLE_COLORS: Record<Role, string> = {
  Pastor: "var(--color-primary)", Elder: "var(--color-purple)",
  Deacon: "var(--color-teal)", Choir: "var(--color-rose)",
  Usher: "var(--color-amber)", "Youth Leader": "var(--color-green)",
  Media: "var(--color-primary-light)", Welfare: "var(--color-teal)",
  "Prayer Team": "var(--color-purple)", "Cell Leader": "var(--color-amber)",
  "Sunday School": "var(--color-rose)", Member: "var(--color-gray-500)",
};

const STATUS_STYLE: Record<MemberStatus, { bg: string; text: string; label: string }> = {
  active:   { bg: "color-mix(in srgb, var(--color-green) 10%, transparent)",   text: "var(--color-green)",   label: "Active"   },
  inactive: { bg: "color-mix(in srgb, var(--color-rose) 10%, transparent)",    text: "var(--color-rose)",    label: "Inactive" },
  new:      { bg: "color-mix(in srgb, var(--color-primary) 10%, transparent)", text: "var(--color-primary)", label: "New"      },
};

/* ── Seed data ── */
const SEED: Member[] = [
  { id:"M001", name:"Rev. Samuel Asante",  email:"s.asante@grace.org",  phone:"+233 24 000 0001", gender:"Male",   dob:"1970-03-15", address:"12 Church Ave, Accra",   joinDate:"2010-01-01", roles:["Pastor","Elder"],            status:"active",   memberType:"Transfer"    },
  { id:"M002", name:"Elder Grace Mensah",  email:"g.mensah@grace.org",  phone:"+233 24 000 0002", gender:"Female", dob:"1965-07-22", address:"34 Palm St, Accra",       joinDate:"2012-06-15", roles:["Elder","Choir"],             status:"active",   memberType:"Transfer"    },
  { id:"M003", name:"Deacon Paul Owusu",   email:"p.owusu@grace.org",   phone:"+233 24 000 0003", gender:"Male",   dob:"1980-11-05", address:"8 Kanda Lane, Accra",     joinDate:"2015-03-10", roles:["Deacon","Cell Leader"],      status:"active",   memberType:"Born Here"   },
  { id:"M004", name:"Abena Frimpong",      email:"a.frimpong@grace.org",phone:"+233 24 000 0004", gender:"Female", dob:"1992-04-18", address:"56 East Legon, Accra",    joinDate:"2019-08-22", roles:["Choir","Sunday School"],     status:"active",   memberType:"New Convert" },
  { id:"M005", name:"Kwame Boateng",       email:"k.boateng@grace.org", phone:"+233 24 000 0005", gender:"Male",   dob:"1988-09-30", address:"22 Tema Rd, Accra",       joinDate:"2017-02-14", roles:["Usher","Media"],             status:"active",   memberType:"Transfer"    },
  { id:"M006", name:"Ama Darko",           email:"a.darko@grace.org",   phone:"+233 24 000 0006", gender:"Female", dob:"1995-12-01", address:"77 Airport Hills, Accra", joinDate:"2021-01-09", roles:["Youth Leader","Prayer Team"],status:"active",   memberType:"New Convert" },
  { id:"M007", name:"Kofi Mensah",         email:"k.mensah@grace.org",  phone:"+233 24 000 0007", gender:"Male",   dob:"2001-05-25", address:"3 Labone Cres, Accra",    joinDate:"2022-05-15", roles:["Member"],                   status:"new",      memberType:"New Convert" },
  { id:"M008", name:"Akosua Thompson",     email:"a.thompson@grace.org",phone:"+233 24 000 0008", gender:"Female", dob:"1975-08-14", address:"19 Adenta Ave, Accra",    joinDate:"2013-11-01", roles:["Welfare","Cell Leader"],     status:"inactive", memberType:"Born Here"   },
  { id:"M009", name:"Yaw Asiedu",          email:"y.asiedu@grace.org",  phone:"+233 24 000 0009", gender:"Male",   dob:"1983-06-10", address:"5 Spintex Rd, Accra",     joinDate:"2016-09-01", roles:["Choir","Prayer Team"],       status:"active",   memberType:"Transfer"    },
  { id:"M010", name:"Efua Boakye",         email:"e.boakye@grace.org",  phone:"+233 24 000 0010", gender:"Female", dob:"1998-02-14", address:"11 Dzorwulu Rd, Accra",   joinDate:"2023-01-15", roles:["Youth Leader"],             status:"new",      memberType:"New Convert" },
  { id:"M011", name:"Nana Agyei",          email:"n.agyei@grace.org",   phone:"+233 24 000 0011", gender:"Male",   dob:"1977-11-03", address:"88 Haatso Ave, Accra",    joinDate:"2014-04-20", roles:["Usher","Cell Leader"],       status:"active",   memberType:"Born Here"   },
  { id:"M012", name:"Adwoa Sarpong",       email:"a.sarpong@grace.org", phone:"+233 24 000 0012", gender:"Female", dob:"1969-09-18", address:"24 Madina Rd, Accra",     joinDate:"2011-07-08", roles:["Sunday School","Welfare"],   status:"active",   memberType:"Transfer"    },
  { id:"M013", name:"Fiifi Korsah",        email:"f.korsah@grace.org",  phone:"+233 24 000 0013", gender:"Male",   dob:"1990-04-22", address:"66 Roman Ridge, Accra",   joinDate:"2018-03-11", roles:["Media"],                    status:"active",   memberType:"New Convert" },
  { id:"M014", name:"Maame Serwaa",        email:"m.serwaa@grace.org",  phone:"+233 24 000 0014", gender:"Female", dob:"2000-07-30", address:"9 Achimota St, Accra",    joinDate:"2022-11-01", roles:["Member"],                   status:"new",      memberType:"New Convert" },
  { id:"M015", name:"Kwabena Darko",       email:"k.darko@grace.org",   phone:"+233 24 000 0015", gender:"Male",   dob:"1955-12-05", address:"30 Airport Res, Accra",   joinDate:"2008-06-15", roles:["Elder","Deacon"],            status:"inactive", memberType:"Born Here"   },
];

/* ── Local UI helpers ── */
function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const sz = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-16 h-16 text-xl" }[size];
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-semibold text-white shrink-0`}
      style={{ background: `hsl(${hue}, 55%, 42%)` }}>
      {initials}
    </div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const color = ROLE_COLORS[role];
  return (
    <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`, color }}>
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: MemberStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span className="text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1"
      style={{ backgroundColor: s.bg, color: s.text }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.text }} />
      {s.label}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-gray-800)" }}>{label}</label>
      {children}
    </div>
  );
}

const inputCss: React.CSSProperties = {
  border: "1px solid var(--color-gray-200)",
  color: "var(--color-gray-800)",
  backgroundColor: "var(--color-white)",
};

function ActionsMenu({ open, onToggle, onEdit, onDelete }: {
  open: boolean; onToggle: () => void; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={onToggle} className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: open ? "var(--color-gray-100)" : "transparent" }}>
        <MoreVertical className="w-4 h-4" style={{ color: "#9ca3af" }} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 w-36 rounded-xl z-10 overflow-hidden"
          style={{ backgroundColor: "var(--color-white)", border: "1px solid var(--color-gray-200)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
          <button onClick={onEdit} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-left"
            style={{ color: "var(--color-gray-800)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-gray-100)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={onDelete} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-left"
            style={{ color: "var(--color-rose)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-rose) 8%, transparent)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      )}
    </div>
  );
}

const blankForm = (): Omit<Member, "id"> => ({
  name: "", email: "", phone: "", gender: "Male", dob: "",
  address: "", joinDate: new Date().toISOString().split("T")[0],
  roles: ["Member"], status: "new", memberType: "New Convert",
});

/* ══ Main Page ══ */
export default function MembersPage() {
  const [members, setMembers]           = useState<Member[]>(SEED);
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState<MemberStatus | "all">("all");
  const [roleFilter, setRoleFilter]     = useState<Role | "all">("all");
  const [openMenu, setOpenMenu]         = useState<string | null>(null);

  const [modalOpen, setModalOpen]   = useState(false);
  const [editTarget, setEditTarget] = useState<Member | undefined>();
  const [form, setForm]             = useState<Omit<Member, "id">>(blankForm());

  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [drawerTarget, setDrawerTarget] = useState<Member | undefined>();

  const openAdd = () => { setEditTarget(undefined); setForm(blankForm()); setModalOpen(true); };

  const openEdit = (m: Member) => {
    setEditTarget(m);
    setForm({ name:m.name, email:m.email, phone:m.phone, gender:m.gender, dob:m.dob,
      address:m.address, joinDate:m.joinDate, roles:m.roles, status:m.status, memberType:m.memberType });
    setModalOpen(true);
    setDrawerOpen(false);
    setOpenMenu(null);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim() || form.roles.length === 0) return;
    const saved: Member = { ...form, id: editTarget?.id ?? `M${Date.now()}` };
    setMembers((p) => p.find((x) => x.id === saved.id) ? p.map((x) => x.id === saved.id ? saved : x) : [...p, saved]);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => { setMembers((p) => p.filter((m) => m.id !== id)); setOpenMenu(null); };
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((p) => ({ ...p, [k]: v }));
  const toggleRole = (role: Role) =>
    set("roles", form.roles.includes(role) ? form.roles.filter((r) => r !== role) : [...form.roles, role]);

  const canSave = form.name.trim().length > 0 && form.email.trim().length > 0 && form.roles.length > 0;

  const filtered = members.filter((m) => {
    const ms = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const ss = statusFilter === "all" || m.status === statusFilter;
    const rs = roleFilter   === "all" || m.roles.includes(roleFilter as Role);
    return ms && ss && rs;
  });

  const counts = {
    total:    members.length,
    active:   members.filter((m) => m.status === "active").length,
    new:      members.filter((m) => m.status === "new").length,
    inactive: members.filter((m) => m.status === "inactive").length,
  };

  const columns: Column<Member>[] = [
    {
      key: "member", header: "Member",
      render: (m) => (
        <div className="flex items-center gap-3">
          <Avatar name={m.name} size="sm" />
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--color-gray-900)" }}>{m.name}</p>
            <p className="text-xs" style={{ color: "#9ca3af" }}>{m.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "contact", header: "Contact",
      render: (m) => (
        <div>
          <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-gray-800)" }}>
            <Mail className="w-3 h-3" style={{ color: "#9ca3af" }} />{m.email}
          </p>
          <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--color-gray-500)" }}>
            <Phone className="w-3 h-3" style={{ color: "#9ca3af" }} />{m.phone}
          </p>
        </div>
      ),
    },
    {
      key: "roles", header: "Roles",
      render: (m) => (
        <div className="flex flex-wrap gap-1">
          {m.roles.slice(0, 2).map((r) => <RoleBadge key={r} role={r} />)}
          {m.roles.length > 2 && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-gray-100)", color: "#9ca3af" }}>
              +{m.roles.length - 2}
            </span>
          )}
        </div>
      ),
    },
    { key:"type",   header:"Type",   render:(m) => <p className="text-xs" style={{ color:"var(--color-gray-500)" }}>{m.memberType}</p> },
    { key:"joined", header:"Joined", render:(m) => <p className="text-xs" style={{ color:"var(--color-gray-500)" }}>{m.joinDate}</p>   },
    { key:"status", header:"Status", render:(m) => <StatusBadge status={m.status} /> },
    {
      key:"actions", header:"", width:"48px",
      render:(m) => (
        <ActionsMenu open={openMenu === m.id}
          onToggle={() => setOpenMenu(openMenu === m.id ? null : m.id)}
          onEdit={() => openEdit(m)} onDelete={() => handleDelete(m.id)} />
      ),
    },
  ];

  const toolbar = (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex-1">
        <h2 className="text-base font-semibold" style={{ color: "var(--color-gray-900)" }}>Church Members</h2>
        <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{filtered.length} member{filtered.length !== 1 ? "s" : ""} found</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl w-full sm:w-56"
        style={{ backgroundColor: "var(--color-gray-100)", border: "1px solid var(--color-gray-200)" }}>
        <Search className="w-4 h-4 shrink-0" style={{ color: "#9ca3af" }} />
        <input className="flex-1 text-xs bg-transparent outline-none" style={{ color: "var(--color-gray-800)" }}
          placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <select className="text-xs px-3 py-2 rounded-xl outline-none"
        style={{ backgroundColor: "var(--color-gray-100)", border: "1px solid var(--color-gray-200)", color: "var(--color-gray-800)" }}
        value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as MemberStatus | "all")}>
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="new">New</option>
        <option value="inactive">Inactive</option>
      </select>
      <select className="text-xs px-3 py-2 rounded-xl outline-none"
        style={{ backgroundColor: "var(--color-gray-100)", border: "1px solid var(--color-gray-200)", color: "var(--color-gray-800)" }}
        value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as Role | "all")}>
        <option value="all">All Roles</option>
        {ALL_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
      <button onClick={openAdd}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white shrink-0"
        style={{ backgroundColor: "var(--color-primary)" }}>
        <UserPlus className="w-4 h-4" /> Add Member
      </button>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ backgroundColor: "var(--color-gray-100)" }}>
        <div className="px-6 mt-8 max-w-7xl mx-auto pb-12 space-y-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Members"  value={counts.total}    sub="All registered"    icon={Users}     accent="var(--color-primary)" />
            <StatCard label="Active"         value={counts.active}   sub="Currently serving" icon={UserCheck} accent="var(--color-green)"   showTrend />
            <StatCard label="New Members"    value={counts.new}      sub="This quarter"      icon={UserPlus}  accent="var(--color-teal)"    showTrend />
            <StatCard label="Inactive"       value={counts.inactive} sub="Need follow-up"    icon={Users}     accent="var(--color-rose)"    />
          </div>

          <DataTable<Member>
            data={filtered} columns={columns} rowKey={(m) => m.id} pageSize={8}
            emptyIcon={Users} emptyTitle="No members found" emptySubtitle="Try adjusting your search or filters"
            toolbar={toolbar}
            onRowClick={(m) => { if (openMenu) { setOpenMenu(null); return; } setDrawerTarget(m); setDrawerOpen(true); }}
          />
        </div>
      </div>

      {/* ── Generic Modal with member form as children ── */}
      <Modal
        open={modalOpen} onClose={() => setModalOpen(false)}
        title={editTarget ? "Edit Member" : "Add New Member"}
        subtitle={editTarget ? "Update member information and roles" : "Fill in details to register a new member"}
        size="2xl"
        footer={
          <>
            <ModalCancelButton onClick={() => setModalOpen(false)} />
            <ModalPrimaryButton onClick={handleSave} label={editTarget ? "Save Changes" : "Add Member"} icon={Check} disabled={!canSave} />
          </>
        }
      >
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-gray-100)", border: "2px dashed var(--color-gray-200)" }}>
              {form.name ? <Avatar name={form.name} size="lg" /> : <Camera className="w-6 h-6" style={{ color: "#9ca3af" }} />}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--color-gray-800)" }}>Profile Photo</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Auto-generated from name initials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name *">
              <input className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                placeholder="e.g. Kwame Asante" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label="Gender">
              <select className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                value={form.gender} onChange={(e) => set("gender", e.target.value as Gender)}>
                <option>Male</option><option>Female</option>
              </select>
            </Field>
            <Field label="Email Address *">
              <input type="email" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                placeholder="email@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Phone Number">
              <input className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                placeholder="+233 24 000 0000" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Date of Birth">
              <input type="date" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                value={form.dob} onChange={(e) => set("dob", e.target.value)} />
            </Field>
            <Field label="Join Date">
              <input type="date" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                value={form.joinDate} onChange={(e) => set("joinDate", e.target.value)} />
            </Field>
            <Field label="Member Type">
              <select className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                value={form.memberType} onChange={(e) => set("memberType", e.target.value as MemberType)}>
                <option>New Convert</option><option>Transfer</option><option>Born Here</option>
              </select>
            </Field>
            <Field label="Status">
              <select className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
                value={form.status} onChange={(e) => set("status", e.target.value as MemberStatus)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="new">New</option>
              </select>
            </Field>
          </div>

          <Field label="Home Address">
            <input className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputCss}
              placeholder="Street, City" value={form.address} onChange={(e) => set("address", e.target.value)} />
          </Field>

          <div>
            <p className="text-xs font-semibold uppercase mb-2" style={{ color: "#9ca3af", letterSpacing: "0.08em" }}>
              Assign Church Roles
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_ROLES.map((role) => {
                const selected = form.roles.includes(role);
                const color = ROLE_COLORS[role];
                return (
                  <button key={role} type="button" onClick={() => toggleRole(role)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: selected ? `color-mix(in srgb, ${color} 12%, transparent)` : "var(--color-white)",
                      borderColor: selected ? color : "var(--color-gray-200)",
                      color: selected ? color : "var(--color-gray-500)",
                      fontWeight: selected ? 600 : 400,
                    }}>
                    {selected && <Check className="w-3 h-3" />}
                    {role}
                  </button>
                );
              })}
            </div>
            {form.roles.length === 0 && (
              <p className="text-xs mt-1" style={{ color: "var(--color-rose)" }}>Select at least one role</p>
            )}
          </div>
        </div>
      </Modal>

      {/* ── Generic Drawer with member detail as children ── */}
      {drawerTarget && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          header={
            <DrawerHeader
              title={drawerTarget.name}
              subtitle={`${drawerTarget.memberType} · ${drawerTarget.gender}`}
              avatar={<Avatar name={drawerTarget.name} size="lg" />}
              badges={
                <>
                  {drawerTarget.roles.map((r) => (
                    <span key={r} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}>
                      {r}
                    </span>
                  ))}
                </>
              }
            />
          }
          footer={<DrawerPrimaryButton onClick={() => openEdit(drawerTarget)} label="Edit Member" icon={Edit2} />}
        >
          <StatusBadge status={drawerTarget.status} />
          <DrawerRow icon={Mail}     label="Email"         value={drawerTarget.email}    />
          <DrawerRow icon={Phone}    label="Phone"         value={drawerTarget.phone}    />
          <DrawerRow icon={MapPin}   label="Address"       value={drawerTarget.address}  />
          <DrawerRow icon={Calendar} label="Date of Birth" value={drawerTarget.dob}      />
          <DrawerRow icon={UserPlus} label="Joined"        value={drawerTarget.joinDate} />
          <div>
            <p className="text-xs mb-2" style={{ color: "#9ca3af" }}>Assigned Roles</p>
            <div className="flex flex-wrap gap-1.5">
              {drawerTarget.roles.map((r) => <RoleBadge key={r} role={r} />)}
            </div>
          </div>
        </Drawer>
      )}
    </DashboardLayout>
  );
}