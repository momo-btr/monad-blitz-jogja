"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BriefcaseIcon, ChartBarIcon, HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBagIcon },
    { name: "Portfolio", href: "/portfolio", icon: BriefcaseIcon },
    { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  ];

  return (
    <div className="flex h-screen bg-white text-black font-sans">
      {/* Vertical Navigation */}
      <aside className="w-64 bg-white border-r border-base-300 flex flex-col justify-between p-4 z-10 shadow-sm">
        <div>
          <Link href="/" className="block mb-8 px-2">
            <h1 className="text-2xl font-bold text-primary tracking-tight">Terraforma</h1>
          </Link>
          <nav className="space-y-1.5">
            {navItems.map(item => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary text-black shadow-sm"
                      : "hover:bg-base-200 text-black/70 hover:text-black"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${active ? "text-black" : "text-black/50"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-base-300 mt-auto">
          <Link
            href="/list-property"
            className="btn w-full btn-outline border-primary text-primary hover:bg-primary hover:text-black hover:border-primary transition-colors"
          >
            List New Property
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-base-200/40">
        {/* Header */}
        <header className="h-20 bg-white border-b border-base-300 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <ConnectButton showBalance={false} />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
};
