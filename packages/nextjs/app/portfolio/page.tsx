"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { useAccount } from "wagmi";
import { CheckCircleIcon, ClockIcon, DocumentTextIcon, MapIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useLandRegistry } from "~~/hooks/useLandRegistry";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const CardSkeleton = () => (
  <div className="card bg-white shadow-sm border border-base-300 overflow-hidden animate-pulse">
    <div className="h-2 bg-base-300" />
    <div className="card-body p-5 gap-4">
      <div className="flex justify-between items-start">
        <div className="h-3 bg-base-200 rounded w-24" />
        <div className="h-5 bg-base-200 rounded-full w-16" />
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

// ─── PortfolioCard ─────────────────────────────────────────────────────────────
// Reads getLandPlotDetails + ownerOf individually — avoids hooks-in-loops.
// Calls onAreaLoaded once real area data arrives so the parent can compute totals.
type PortfolioCardProps = {
  tokenId: bigint;
  connectedAddress: `0x${string}`;
  onAreaLoaded: (tokenId: bigint, area: bigint) => void;
};

const PortfolioCard = ({ tokenId, connectedAddress, onAreaLoaded }: PortfolioCardProps) => {
  const { data: landPlot, isLoading } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "getLandPlotDetails",
    args: [tokenId],
  });

  // Verify current on-chain ownership — the mint event owner may differ if NFT was transferred
  const { data: currentOwner } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "ownerOf",
    args: [tokenId],
  });

  // Report area back to parent whenever it becomes available (idempotent by tokenId key)
  useEffect(() => {
    if (landPlot?.areaSqm !== undefined) {
      onAreaLoaded(tokenId, landPlot.areaSqm);
    }
  }, [tokenId, landPlot?.areaSqm, onAreaLoaded]);

  if (isLoading) return <CardSkeleton />;

  // Empty / non-existent token
  if (!landPlot || landPlot.id === 0n) return null;

  const isVerified = landPlot.isVerified;
  const isCurrentOwner = currentOwner !== undefined && currentOwner.toLowerCase() === connectedAddress.toLowerCase();

  return (
    <div className="card bg-white shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Status colour band */}
      <div className={`h-2 ${isVerified ? "bg-primary" : "bg-warning"}`} />

      <div className="card-body p-5 gap-3">
        {/* Header row */}
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

        {/* Location + Area */}
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
            <p className="text-base-content font-medium">
              {landPlot.areaSqm !== undefined ? `${landPlot.areaSqm.toLocaleString()} m²` : "—"}
            </p>
          </div>
          <div>
            <p className="text-base-content/50 font-semibold uppercase tracking-wider mb-0.5">Ownership</p>
            {currentOwner === undefined ? (
              <span className="loading loading-dots loading-xs text-base-content/30" />
            ) : isCurrentOwner ? (
              <p className="text-success font-medium">Current</p>
            ) : (
              <p className="text-error font-medium text-xs">Transferred</p>
            )}
          </div>
        </div>

        {/* Current owner address (shown when transferred) */}
        {currentOwner && !isCurrentOwner && (
          <div className="text-xs">
            <p className="text-base-content/50 font-semibold uppercase tracking-wider mb-0.5">Now Owned By</p>
            <Address address={currentOwner} />
          </div>
        )}

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

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const { lands, isLoading, total } = useLandRegistry();

  // Area map: tokenId.toString() → areaSqm (bigint)
  // Updated by each PortfolioCard via onAreaLoaded callback
  const [areaMap, setAreaMap] = useState<Record<string, bigint>>({});

  const handleAreaLoaded = useCallback((tokenId: bigint, area: bigint) => {
    setAreaMap(prev => {
      const key = tokenId.toString();
      // Skip state update if unchanged — prevents unnecessary re-renders
      if (prev[key] === area) return prev;
      return { ...prev, [key]: area };
    });
  }, []);

  // Lands that were originally minted to this address (from event data)
  const myLands = address ? lands.filter(land => land.owner.toLowerCase() === address.toLowerCase()) : [];

  // Total area summed from reported card data
  const totalArea = Object.values(areaMap).reduce((acc, v) => acc + v, 0n);

  // ── Not connected ────────────────────────────────────────────────────────────
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-base-content/60">
        <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center">
          <MapIcon className="w-10 h-10 text-base-content/30" />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-base-content mb-2">Connect Your Wallet</p>
          <p className="text-sm max-w-xs">
            Connect your wallet to view the land certificates registered to your address.
          </p>
        </div>
        <Link
          href="/marketplace"
          className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
        >
          Browse Registry
        </Link>
      </div>
    );
  }

  // ── Connected ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content mb-2">My Land Portfolio</h1>
        <p className="text-base-content/70">
          Land certificates originally minted to your address on Monad Testnet.&nbsp;
          {!isLoading && (
            <>
              <span className="font-semibold text-primary">{myLands.length}</span>
              &nbsp;parcel{myLands.length !== 1 ? "s" : ""} found.
            </>
          )}
        </p>
      </div>

      {/* ── Metrics ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-base-300">
          <p className="text-sm text-base-content/60 font-medium mb-1">My Parcels</p>
          {isLoading ? (
            <div className="h-8 bg-base-200 rounded w-10 animate-pulse mt-1" />
          ) : (
            <p className="text-3xl font-bold text-primary">{myLands.length}</p>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-base-300">
          <p className="text-sm text-base-content/60 font-medium mb-1">Total Area</p>
          {isLoading ? (
            <div className="h-8 bg-base-200 rounded w-24 animate-pulse mt-1" />
          ) : totalArea === 0n && myLands.length > 0 ? (
            <p className="text-lg font-semibold text-base-content/50 mt-1">Loading…</p>
          ) : (
            <p className="text-3xl font-bold text-base-content">
              {Number(totalArea).toLocaleString()}
              <span className="text-lg font-normal text-base-content/60 ml-1">m²</span>
            </p>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-base-300">
          <p className="text-sm text-base-content/60 font-medium mb-1">Total Registry</p>
          {isLoading ? (
            <div className="h-8 bg-base-200 rounded w-10 animate-pulse mt-1" />
          ) : (
            <p className="text-3xl font-bold text-base-content">{total}</p>
          )}
        </div>
      </div>

      {/* ── Land Grid ───────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : myLands.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-base-content/50 gap-4">
          <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center">
            <MapIcon className="w-8 h-8 text-base-content/30" />
          </div>
          <p className="text-xl font-semibold">No Land Parcels Found</p>
          <p className="text-sm text-center max-w-sm">
            No land certificates have been minted to your address. Contact a registry admin to register a parcel.
          </p>
          <Link
            href="/marketplace"
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
          >
            Browse Registry
          </Link>
        </div>
      ) : (
        // Each PortfolioCard calls its own hooks — no hooks in loops
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myLands.map(land => (
            <PortfolioCard
              key={land.tokenId.toString()}
              tokenId={land.tokenId}
              connectedAddress={address as `0x${string}`}
              onAreaLoaded={handleAreaLoaded}
            />
          ))}
        </div>
      )}

      {/* ── Mint History ─────────────────────────────────────────────────────── */}
      {!isLoading && myLands.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-base-300 overflow-hidden">
          <div className="p-6 border-b border-base-200 flex justify-between items-center">
            <h2 className="text-lg font-bold text-base-content flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-primary" />
              Mint History
            </h2>
            <span className="badge badge-ghost text-xs">
              {myLands.length} event{myLands.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead className="bg-base-200/50 text-base-content/70">
                <tr>
                  <th className="font-semibold uppercase tracking-wider text-xs py-3">Token ID</th>
                  <th className="font-semibold uppercase tracking-wider text-xs py-3">NIB</th>
                  <th className="font-semibold uppercase tracking-wider text-xs py-3">Block</th>
                  <th className="font-semibold uppercase tracking-wider text-xs py-3">Tx Hash</th>
                  <th className="py-3" />
                </tr>
              </thead>
              <tbody>
                {myLands.map(land => (
                  <tr
                    key={land.tokenId.toString()}
                    className="border-b border-base-200 last:border-0 hover:bg-base-200/30 transition-colors"
                  >
                    <td className="py-3">
                      <span className="font-mono font-bold text-primary">#{land.tokenId.toString()}</span>
                    </td>
                    <td className="py-3 text-base-content/80 font-mono text-xs">{land.nib || "—"}</td>
                    <td className="py-3 font-mono text-base-content/60 text-xs">{land.blockNumber.toString()}</td>
                    <td className="py-3">
                      <a
                        href={`https://testnet.monadexplorer.com/tx/${land.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline font-mono"
                      >
                        {land.transactionHash.slice(0, 10)}…
                      </a>
                    </td>
                    <td className="py-3">
                      <Link
                        href={`/property/${land.tokenId.toString()}`}
                        className="btn btn-xs btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
