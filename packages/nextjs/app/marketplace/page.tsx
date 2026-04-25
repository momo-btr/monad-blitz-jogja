"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useLandRegistry } from "~~/hooks/useLandRegistry";

// ─── Skeleton card reused in both loading states ──────────────────────────────
const CardSkeleton = () => (
  <div className="card bg-white shadow-sm border border-base-300 overflow-hidden animate-pulse">
    <div className="h-2 bg-base-300" />
    <div className="card-body p-5 gap-4">
      <div className="flex justify-between items-start">
        <div className="h-3 bg-base-200 rounded w-24" />
        <div className="h-5 bg-base-200 rounded-full w-18" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2 bg-base-200 rounded w-10" />
        <div className="h-4 bg-base-200 rounded w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-2 bg-base-200 rounded w-14" />
            <div className="h-3 bg-base-200 rounded w-20" />
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-base-200">
        <div className="h-8 bg-base-200 rounded w-full" />
      </div>
    </div>
  </div>
);

// ─── Inner LandCard — one useScaffoldReadContract per token, avoids hooks-in-loops ──
const LandCard = ({ tokenId }: { tokenId: bigint }) => {
  const { data: landPlot, isLoading } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "getLandPlotDetails",
    args: [tokenId],
  });

  if (isLoading) return <CardSkeleton />;

  // id === 0n means the token doesn't exist or returned empty struct
  if (!landPlot || landPlot.id === 0n) return null;

  const isVerified = landPlot.isVerified;

  return (
    <div className="card bg-white shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Status colour band */}
      <div className={`h-2 ${isVerified ? "bg-primary" : "bg-warning"}`} />

      <div className="card-body p-5 gap-3">
        {/* Token ID + Verification badge */}
        <div className="flex justify-between items-start gap-2">
          <span className="font-mono text-xs text-base-content/50 font-semibold shrink-0">
            Token #{tokenId.toString()}
          </span>
          {isVerified ? (
            <span className="badge badge-success bg-success/10 text-success border-none gap-1 text-xs shrink-0">
              <CheckCircleIcon className="w-3 h-3" />
              Verified
            </span>
          ) : (
            <span className="badge bg-warning/10 text-warning border-none gap-1 text-xs shrink-0">
              <ClockIcon className="w-3 h-3" />
              Pending
            </span>
          )}
        </div>

        {/* NIB */}
        <div>
          <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">NIB</p>
          <p className="font-bold text-base-content text-sm break-all leading-snug">
            {landPlot.NIB_NomorIdentitasBidang || "—"}
          </p>
        </div>

        {/* Location + Area grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-base-content/50 font-semibold uppercase tracking-wider mb-0.5">Province</p>
            <p className="text-base-content">{landPlot.locationProvince || "—"}</p>
          </div>
          <div>
            <p className="text-base-content/50 font-semibold uppercase tracking-wider mb-0.5">City</p>
            <p className="text-base-content">{landPlot.locationCity || "—"}</p>
          </div>
          <div>
            <p className="text-base-content/50 font-semibold uppercase tracking-wider mb-0.5">Area</p>
            <p className="text-base-content">
              {landPlot.areaSqm !== undefined ? `${landPlot.areaSqm.toLocaleString()} m²` : "—"}
            </p>
          </div>
          <div>
            <p className="text-base-content/50 font-semibold uppercase tracking-wider mb-0.5">Status</p>
            <p className={isVerified ? "text-success font-medium" : "text-warning font-medium"}>
              {isVerified ? "Verified" : "Pending"}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-base-200">
          <Link
            href={`/property/${tokenId.toString()}`}
            className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content hover:border-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Marketplace() {
  const { lands, isLoading, total } = useLandRegistry();
  const [search, setSearch] = useState("");
  // Verified / Pending filter is a non-functional UI placeholder.
  // The contract has no server-side filtering; per-card verification status
  // would require individual getLandPlotDetails reads per token.
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all");

  // Client-side search against event data (tokenId, NIB, owner address)
  const filtered = lands.filter(land => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      land.nib.toLowerCase().includes(s) || land.owner.toLowerCase().includes(s) || land.tokenId.toString().includes(s)
    );
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">Land Registry</h1>
          <p className="text-base-content/70">
            On-chain land certificates on Monad Testnet.&nbsp;
            <span className="font-semibold text-primary">{isLoading ? "…" : total}</span>&nbsp;parcel
            {total !== 1 ? "s" : ""} registered.
          </p>
        </div>

        {/* Stat chip */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-base-300 min-w-[148px] shrink-0">
          <p className="text-sm text-base-content/60 font-medium mb-1">Total Parcels</p>
          {isLoading ? (
            <div className="h-7 bg-base-200 rounded w-12 animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-primary">{total}</p>
          )}
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-base-300">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by NIB, owner, or token ID…"
              className="input input-bordered bg-white text-base-content border-base-300 pl-9 w-full focus:outline-primary"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Verification filter — non-functional placeholder */}
          <div
            className="join"
            title="Verification filter requires per-card contract reads (non-functional placeholder)"
          >
            {(["all", "verified", "pending"] as const).map(f => (
              <button
                key={f}
                className={`join-item btn btn-sm capitalize ${
                  filter === f ? "btn-primary" : "btn-outline border-base-300 text-base-content hover:bg-base-200"
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {search && (
            <button className="btn btn-ghost btn-sm text-primary" onClick={() => setSearch("")}>
              Clear
            </button>
          )}

          <p className="text-xs text-base-content/40 ml-auto hidden lg:block">
            Verified / Pending tabs are UI placeholders — contract has no server-side filtering.
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      {isLoading ? (
        // Show skeleton grid while registry events are loading
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center h-64 text-base-content/50 gap-4">
          <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
            <MagnifyingGlassIcon className="w-8 h-8 text-base-content/30" />
          </div>
          <p className="text-xl font-semibold">{total === 0 ? "No Land Parcels Yet" : "No Results Found"}</p>
          <p className="text-sm text-center max-w-xs">
            {total === 0
              ? "No land certificates have been minted on this contract yet."
              : "No parcels match your search. Try a different NIB, address, or token ID."}
          </p>
          {search && (
            <button className="btn btn-outline border-primary text-primary btn-sm" onClick={() => setSearch("")}>
              Clear search
            </button>
          )}
        </div>
      ) : (
        // Land grid — each LandCard reads its own contract data
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(land => (
            <LandCard key={land.tokenId.toString()} tokenId={land.tokenId} />
          ))}
        </div>
      )}
    </div>
  );
}
