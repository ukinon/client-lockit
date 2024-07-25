"use client";

import Link from "next/link";
import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import { TbUserFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", Icon: MdHomeFilled, label: "Home" },
    { href: "/location", Icon: RiMapPin2Fill, label: "Lokasi" },
    { href: "/profile", Icon: TbUserFilled, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[390px] z-50">
      <div className="flex items-center justify-between h-16 px-6 rounded-xl bg-orange-500 shadow-lg">
        {navItems.map(({ href, Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center p-2 transition-colors duration-200 ${
              pathname === href
                ? "text-white"
                : "text-orange-200 hover:text-white"
            }`}
          >
            <Icon className="text-2xl" aria-hidden="true" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
