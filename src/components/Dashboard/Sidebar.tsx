"use client";

import {
  Home,
  Send,
  Calendar,
  Users,
  BookOpen,
  Music,
  HandHeart,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";

type SubNavItem = {
  name: string;
  link: string;
};

type NavItem = {
  name: string;
  icon: React.ElementType;
  link?: string;
  subNav?: SubNavItem[];
};

const navItems: NavItem[] = [
  { name: "Overview", icon: Home, link: "/admin/dashboard" },
  { name: "Members", icon: Users, link: "/admin/members" },
  { name: "Attendance", icon: Users, link: "/admin/attendance" },
  { name: "Events", icon: Calendar, link: "/events" },
  { name: "Transactions", icon: HandHeart, link: "/giving" },
  { name: "Ministry", icon: Music, link: "/ministry" },
  {
    name: "Resources",
    icon: BookOpen,
    subNav: [
      { name: "Sermons", link: "/resources/sermons" },
      { name: "Documents", link: "/resources/documents" },
    ],
  },
  { name: "Communications", icon: Send, link: "/communications" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubNav, setOpenSubNav] = useState<string | null>(null);

  const active = useMemo(() => {
    let activeItem = "";
    navItems.forEach((item) => {
      if (item.link && pathname.startsWith(item.link)) {
        activeItem = item.name;
      }
      if (item.subNav) {
        item.subNav.forEach((sub) => {
          if (pathname.startsWith(sub.link)) {
            activeItem = sub.name;
          }
        });
      }
    });
    return activeItem;
  }, [pathname]);

  return (
    <aside
      className="hidden md:flex md:flex-col w-64"
      style={{
        position: "fixed",
        top: "64px",
        bottom: 0,
        left: 0,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        boxShadow: "2px 0 12px rgba(0,0,172,0.05)",
      }}
    >
      <div style={{ height: 3, backgroundColor: "#f1e600" }} />

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActiveParent =
            openSubNav === item.name ||
            (item.subNav &&
              item.subNav.some((sub) => pathname.startsWith(sub.link)));
          const isActive = active === item.name;

          return (
            <div key={item.name}>
              {item.subNav ? (
                <button
                  onClick={() =>
                    setOpenSubNav(openSubNav === item.name ? null : item.name)
                  }
                  className="flex w-full items-center justify-between p-3 rounded-xl text-left transition-all duration-200"
                  style={{
                    backgroundColor: isActiveParent ? "#0000ac" : "transparent",
                    color: isActiveParent ? "#ffffff" : "#1f2937",
                    borderLeft: isActiveParent
                      ? "3px solid #f1e600"
                      : "3px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isActiveParent ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link href={item.link!}>
                  <button
                    className="flex w-full items-center gap-3 p-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? "#0000ac" : "transparent",
                      color: isActive ? "#ffffff" : "#1f2937",
                      borderLeft: isActive
                        ? "3px solid #f1e600"
                        : "3px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#f5f5f5";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#0000ac";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#1f2937";
                      }
                    }}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="text-sm">{item.name}</span>
                  </button>
                </Link>
              )}

              {item.subNav && isActiveParent && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subNav.map((sub) => {
                    const isSubActive = active === sub.name;
                    return (
                      <Link key={sub.name} href={sub.link}>
                        <button
                          className="flex w-full items-center px-3 py-2 rounded-lg text-sm transition-all duration-200"
                          style={{
                            backgroundColor: isSubActive
                              ? "#f1e600"
                              : "transparent",
                            color: isSubActive ? "#0000ac" : "#6b7280",
                            fontWeight: isSubActive ? 600 : 400,
                          }}
                        >
                          {sub.name}
                        </button>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
