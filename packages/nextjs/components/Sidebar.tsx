"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarSquareIcon,
  HomeIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Marketplace", href: "/marketplace", icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { label: "Portfolio", href: "/portfolio", icon: <BriefcaseIcon className="w-5 h-5" /> },
    { label: "Analytics", href: "/analytics", icon: <ChartBarSquareIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-base min-h-screen border-r border-base-300 flex flex-col justify-between p-4 sticky top-0 h-screen">
      <div>
        <div className="mb-8 pl-4 pt-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-base-content">
              Terra<span className="text-primary">Chain</span>
            </span>
          </Link>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-primary text-primary-content"
                  : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-surface p-4 rounded-xl border border-base-300 shadow-sm">
          <p className="text-xs text-base-content/50 font-semibold mb-2 uppercase">Quick Action</p>
          <button className="btn btn-primary btn-sm w-full font-normal">List New Property</button>
        </div>

        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-2 text-sm text-base-content/70 hover:text-base-content">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            Support
          </button>
          <button className="flex items-center gap-3 px-4 py-2 text-sm text-base-content/70 hover:text-base-content">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
