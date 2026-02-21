"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Search, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  dropdownOpen: boolean;
  setDropdownOpen: (value: boolean) => void;
}

export default function Header({ dropdownOpen, setDropdownOpen }: HeaderProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    router.push("/auth/login");
  };

  const handleProfile = () => {
    setProfileDropdownOpen(false);
    router.push("/settings/profile");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-2.5 px-6"
      style={{
        backgroundColor: "#0000ac",
        borderBottom: "3px solid #f1e600",
        boxShadow: "0 2px 16px rgba(0,0,172,0.18)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-white p-1 rounded-full">
          <Image
            src="/images/logo.png"
            alt="Church of Pentecost"
            width={40}
            height={40}
          />
        </div>
        <div>
          <span
            className="font-bold text-lg tracking-wide"
            style={{
              color: "#ffffff",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.05em",
            }}
          >
            Pentecost Church
          </span>
          <span
            className="ml-1 text-xs font-light tracking-widest uppercase"
            style={{ color: "#f1e600" }}
          >
            Portal
          </span>
        </div>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center rounded-xl px-4 py-2 w-80"
        style={{
          backgroundColor: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(241,230,0,0.3)",
        }}
      >
        <Search className="w-4 h-4 mr-2" style={{ color: "#f1e600" }} />
        <input
          type="text"
          placeholder="Search members, events, giving..."
          className="bg-transparent border-none outline-none text-sm w-full"
          style={{ color: "rgba(255,255,255,0.85)" }}
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: "#f1e600",
              boxShadow: profileDropdownOpen
                ? "0 0 0 3px rgba(241,230,0,0.4)"
                : "none",
            }}
          >
            <span className="text-sm font-bold" style={{ color: "#0000ac" }}>
              JK
            </span>
          </button>
          <span
            className="hidden md:block text-sm font-medium"
            style={{ color: "#ffffff" }}
          >
            Johnson Kwaku
          </span>

          {profileDropdownOpen && (
            <div
              className="absolute top-full right-0 mt-3 w-48 rounded-xl py-2"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 9999,
              }}
            >
              <button
                onClick={handleProfile}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-gray-50"
                style={{ color: "#1f2937" }}
              >
                <User className="w-4 h-4" style={{ color: "#0000ac" }} />
                Profile
              </button>
              <hr className="my-1 border-gray-100" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-red-50"
                style={{ color: "#dc2626" }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#f1e600" }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
