"use client";

import React from "react";
import Link from "next/link";
import { Compass, User, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/trips/create", label: "Plan a Trip" },
  ];

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Compass size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">Traveloop</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-700 transition-colors">
            <Bell size={20} />
          </button>
          <Link href="/profile" className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors">
            <User size={18} className="text-slate-600" />
          </Link>
        </div>
      </div>
    </header>
  );
}
