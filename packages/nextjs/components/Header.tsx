"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BellIcon, Cog8ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const pathname = usePathname();

  // Helper to get active breadcrumbs
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0) return null;

    return (
      <div className="flex items-center text-sm text-base-content/50 uppercase font-semibold tracking-wide">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-base-content">{paths[0]}</span>
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-20 w-full bg-base-100 shadow-sm border-b border-base-300 flex justify-between items-center px-6 py-4 min-h-[72px]">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-4 lg:hidden">
        <div className="dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => setIsDrawerOpen(prev => !prev)}
          >
            <Bars3Icon className="h-6 w-6" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
              onClick={() => setIsDrawerOpen(false)}
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/marketplace">Marketplace</Link>
              </li>
              <li>
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link href="/analytics">Analytics</Link>
              </li>
            </ul>
          )}
        </div>
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <span className="font-bold text-lg">
            Terra<span className="text-primary">Chain</span>
          </span>
        </Link>
      </div>

      {/* Desktop Breadcrumbs/Navigation (Left) */}
      <div className="hidden lg:flex flex-col">{getBreadcrumbs()}</div>

      {/* Right side (Search & User Actions) */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-64 lg:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5  placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search parcels, owners, or IDs"
          />
        </div>

        {/* Action Buttons */}
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
