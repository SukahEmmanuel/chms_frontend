"use client";

import { useState, PropsWithChildren } from "react";
import {
  Home,
  Calendar,
  Users,
  HandHeart,
  Music,
  BookOpen,
  Send,
  ChevronDown,
} from "lucide-react";
import Header from "../Dashboard/Header";
import Sidebar from "../Dashboard/Sidebar";

const navItems = [
  { name: "Overview", icon: Home },
  { name: "Members", icon: Users },
  { name: "Events", icon: Calendar },
  { name: "Giving", icon: HandHeart },
  { name: "Ministry", icon: Music },
  {
    name: "Resources",
    icon: BookOpen,
    subNav: [{ name: "Sermons" }, { name: "Documents" }],
  },
  { name: "Communications", icon: Send },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSubNav, setOpenSubNav] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen flex flex-col text-gray-800"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Header dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />

      {/* Mobile Nav */}
      {dropdownOpen && (
        <div
          className="fixed w-full bg-white shadow-xl md:hidden"
          style={{
            top: "64px",
            zIndex: 9999,
            borderTop: "3px solid #f1e600",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <nav className="flex flex-col p-3 gap-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => {
                    if (item.subNav) {
                      setOpenSubNav(
                        openSubNav === item.name ? null : item.name,
                      );
                    } else {
                      setDropdownOpen(false);
                      setOpenSubNav(null);
                    }
                  }}
                  className="flex w-full items-center justify-between p-3 rounded-xl transition-colors"
                  style={{ color: "#1f2937" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className="h-4 w-4"
                      style={{ color: "#0000ac" }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.subNav && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openSubNav === item.name ? "rotate-180" : ""
                      }`}
                      style={{ color: "#0000ac" }}
                    />
                  )}
                </button>

                {item.subNav && openSubNav === item.name && (
                  <div className="ml-8 mt-1 mb-1 space-y-1">
                    {item.subNav.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => {
                          setDropdownOpen(false);
                          setOpenSubNav(null);
                        }}
                        className="flex w-full items-center px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{ color: "#6b7280" }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "#f1e600";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#0000ac";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#6b7280";
                        }}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-64 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
