"use client";

import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { useAccount } from "wagmi";
import { ArrowDownTrayIcon, ChartBarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DynamicMap } from "~~/components/DynamicMap";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useLandRegistry } from "~~/hooks/useLandRegistry";

// Static GeoJSON centred on Indonesia — used as the map explorer widget default.
// lng 118, lat -2.5 (geographic centre of the archipelago).
const mapGeoJson = {
  type: "Polygon",
  coordinates: [
    [
      [113.0, -5.0],
      [123.0, -5.0],
      [123.0, -0.0],
      [113.0, -0.0],
      [113.0, -5.0],
    ],
  ],
};

export default function Dashboard() {
  const { address } = useAccount();
  const { lands, isLoading, total } = useLandRegistry();

  // Check whether the connected wallet is a registry admin
  const { data: isAdmin } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "admins",
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  // Count parcels owned by the connected wallet (based on mint events)
  const myLands = address ? lands.filter(l => l.owner.toLowerCase() === address.toLowerCase()) : [];

  // Show only the 5 most-recent mints in the table
  const recentMints = lands.slice(0, 5);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black mb-1">Investment Overview</h1>
          <p className="text-black/60">
            {address
              ? `${isAdmin ? "🔑 Admin · " : ""}Viewing Monad Testnet land registry.`
              : "Connect your wallet to interact with the registry."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Reports — placeholder action */}
          <button className="btn btn-outline border-base-300 hover:bg-base-200 hover:text-black bg-surface font-normal">
            <ChartBarIcon className="w-4 h-4 mr-1" />
            Reports
          </button>

          {/* Buy Land — always visible, links to the mint / list-property page */}
          <Link href="/list-property" className="btn btn-primary font-normal text-black">
            <PlusIcon className="w-4 h-4 mr-1" />
            Buy Land
          </Link>
        </div>
      </div>

      {/* ── KPI + Map ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI card */}
        <div className="bg-base-100 rounded-2xl p-8 border border-base-300 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-black/50 uppercase tracking-wider">
                Total Portfolio Value
              </span>
            </div>

            {isLoading ? (
              <div className="h-14 flex items-center">
                <span className="loading loading-dots loading-md text-black" />
              </div>
            ) : (
              <h2 className="text-5xl font-bold text-black mb-4 tracking-tight">{total}</h2>
            )}

            <p className="text-black/70 text-sm">
              On-chain land certificates
              <br />
              on Monad Testnet
            </p>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-6 border-t border-base-200">
            <div>
              <p className="text-xs text-black/50 uppercase font-semibold mb-1">My Parcels</p>
              {isLoading ? (
                <div className="h-5 bg-base-200 rounded w-6 animate-pulse" />
              ) : (
                <p className="text-lg font-medium text-primary">{myLands.length}</p>
              )}
            </div>
            <div>
              <p className="text-xs text-black/50 uppercase font-semibold mb-1">Network</p>
              <p className="text-lg font-medium text-primary">Monad Testnet</p>
            </div>
          </div>
        </div>

        {/* Map explorer */}
        <div className="lg:col-span-2 bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden relative h-[450px]">
          <div className="absolute top-4 left-4 z-[400] bg-base-100/90 backdrop-blur px-4 py-2 rounded-full border border-base-300 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-black">Map Explorer · Indonesia</span>
          </div>
          <div className="w-full h-full">
            <DynamicMap geojson={mapGeoJson} className="h-full" />
          </div>
        </div>
      </div>

      {/* ── Recent Land Registrations ─────────────────────────────────────────── */}
      <div className="lg:col-span-2 bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-base-200 flex justify-between items-center">
          <h3 className="font-semibold text-black">Recent Land Registrations</h3>
          <Link href="/marketplace" className="text-sm text-primary font-medium hover:underline">
            View All
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <span className="loading loading-spinner text-primary" />
          </div>
        ) : recentMints.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-black/50 text-sm">
            No land certificates minted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead className="bg-base-200 text-black/60 font-medium">
                <tr>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">Token ID</th>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">NIB</th>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">Owner</th>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">Block</th>
                  <th className="py-4 font-normal uppercase tracking-wider text-xs">Tx</th>
                </tr>
              </thead>
              <tbody>
                {recentMints.map(land => (
                  <tr
                    key={land.tokenId.toString()}
                    className="border-b border-base-200 last:border-0 hover:bg-base-50 transition-colors"
                  >
                    <td className="py-4">
                      <Link
                        href={`/property/${land.tokenId.toString()}`}
                        className="font-mono font-bold text-black hover:underline"
                      >
                        #{land.tokenId.toString()}
                      </Link>
                    </td>

                    <td className="py-4 font-mono text-xs text-black/80">{land.nib || "—"}</td>

                    <td className="py-4">
                      <Address address={land.owner} />
                    </td>

                    <td className="py-4 font-mono text-black/60 text-xs">{land.blockNumber.toString()}</td>

                    <td className="py-4">
                      <a
                        href={`https://testnet.monadexplorer.com/tx/${land.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline font-mono"
                      >
                        {land.transactionHash.slice(0, 10)}…
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Export strip (admin only) ─────────────────────────────────────────── */}
      {isAdmin && (
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-black">Admin Tools</p>
            <p className="text-sm text-black/60 mt-0.5">Export registry data or mint new certificates.</p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline border-base-300 hover:bg-base-200 bg-base-100 font-normal btn-sm">
              <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
              Export CSV
            </button>
            <Link href="/list-property" className="btn btn-primary btn-sm font-normal text-primary-content">
              <PlusIcon className="w-4 h-4 mr-1" />
              Mint Certificate
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
