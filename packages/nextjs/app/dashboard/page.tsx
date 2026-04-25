"use client";

import { ArrowDownTrayIcon, BuildingOffice2Icon, MapIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DynamicMap } from "~~/components/DynamicMap";

// Mock GeoJSON for the dashboard map
const mockGeoJson = {
  type: "Polygon",
  coordinates: [
    [
      [113.8, -0.7],
      [114.0, -0.7],
      [114.0, -0.9],
      [113.8, -0.9],
      [113.8, -0.7],
    ],
  ],
};

const transactions = [
  {
    name: "Emerald Valley A12",
    location: "California, USA",
    id: "0x42...88a",
    type: "Agricultural",
    value: "$125,000",
    icon: <MapIcon className="w-6 h-6 text-primary" />,
  },
  {
    name: "Pine Ridge Reserve",
    location: "Oregon, USA",
    id: "0x91...f2c",
    type: "Conservation",
    value: "$450,000",
    // Heroicons doesn't have a tree, using a generic shape/icon
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-8 7 8M5 19h14" />
      </svg>
    ),
  },
  {
    name: "Metropolis Hub X",
    location: "Austin, TX",
    id: "0x15...e5e",
    type: "Commercial",
    value: "$890,000",
    icon: <BuildingOffice2Icon className="w-6 h-6 text-primary" />,
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-1">Investment Overview</h1>
          <p className="text-base-content/60">Welcome back. Your portfolio grew by 4.2% this month.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline border-base-300 hover:bg-base-200 hover:text-base-content bg-surface font-normal">
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Reports
          </button>
          <button className="btn btn-primary font-normal text-primary-content">
            <PlusIcon className="w-4 h-4 mr-1" />
            Buy Land
          </button>
        </div>
      </div>

      {/* Top Grid: KPI & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Card */}
        <div className="bg-surface rounded-2xl p-8 border border-base-300 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-base-content/50 uppercase tracking-wider">
                Total Portfolio Value
              </span>
              <span className="bg-[#E6F4F1] text-primary px-3 py-1 rounded-full text-sm font-medium">+12.5%</span>
            </div>
            <h2 className="text-5xl font-bold text-base-content mb-4 tracking-tight">$2,485,900</h2>
            <p className="text-base-content/70 text-sm">
              42 On-Chain Parcels
              <br />
              Verified
            </p>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-6 border-t border-base-200">
            <div>
              <p className="text-xs text-base-content/50 uppercase font-semibold mb-1">Liquidity</p>
              <p className="text-lg font-medium text-primary">$142,000</p>
            </div>
            <div>
              <p className="text-xs text-base-content/50 uppercase font-semibold mb-1">Yield (APY)</p>
              <p className="text-lg font-medium text-primary">8.2%</p>
            </div>
          </div>
        </div>

        {/* Map Explorer */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-base-300 shadow-sm overflow-hidden relative h-[450px]">
          <div className="absolute top-4 left-4 z-[400] bg-surface/90 backdrop-blur px-4 py-2 rounded-full border border-base-300 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium text-base-content">Interactive Explorer: Central Valley</span>
          </div>
          {/* Controls Overlay */}
          <div className="absolute bottom-4 right-4 z-[400] flex gap-2">
            <button className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center hover:bg-base-200 transition-colors">
              <svg className="w-5 h-5 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </button>
            <button className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center hover:bg-base-200 transition-colors">
              <svg className="w-5 h-5 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </button>
          </div>
          {/* Real Leaflet Map component */}
          <div className="w-full h-full">
            <DynamicMap geojson={mockGeoJson} className="h-full" />
          </div>
        </div>
      </div>

      {/* Bottom Grid: Transactions & Allocations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-surface rounded-2xl border border-base-300 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-base-200 flex justify-between items-center">
            <h3 className="font-semibold text-base-content">Recent Land Transactions</h3>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead className="bg-base-200 text-base-content/60 font-medium">
                <tr>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">Asset</th>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">ID</th>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">Type</th>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">Value</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-base-200 last:border-0 hover:bg-base-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#E6F4F1] flex items-center justify-center">
                          {tx.icon}
                        </div>
                        <div>
                          <p className="font-medium text-base-content">{tx.name}</p>
                          <p className="text-xs text-base-content/50">{tx.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-base-content/70">{tx.id}</td>
                    <td className="py-4 text-base-content/70">{tx.type}</td>
                    <td className="py-4 font-medium text-base-content">{tx.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface rounded-2xl p-6 border border-base-300 shadow-sm flex-1">
            <h3 className="font-semibold text-base-content mb-6">Asset Allocation</h3>
            <div className="flex flex-col gap-5">
              {[
                { label: "Agricultural", value: "45%", width: "45%", color: "bg-primary" },
                { label: "Conservation", value: "30%", width: "30%", color: "bg-primary/40" },
                { label: "Commercial", value: "25%", width: "25%", color: "bg-secondary" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-base-content/80">{item.label}</span>
                    <span className="font-medium text-base-content">{item.value}</span>
                  </div>
                  <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E6F4F1] rounded-2xl p-6 border border-[#BDE3DB]">
            <p className="text-sm text-[#207a6f] leading-relaxed">
              Insight: Commercial land in Austin is trending upwards. Consider rebalancing your conservation parcels for
              higher liquidity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
