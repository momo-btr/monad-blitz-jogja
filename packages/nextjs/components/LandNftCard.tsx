"use client";

import Link from "next/link";
import { Address } from "@scaffold-ui/components";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type Props = {
  tokenId: bigint;
  showOwner?: boolean;
};

export const LandNftCard = ({ tokenId, showOwner = true }: Props) => {
  const { data: landPlot, isLoading } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "getLandPlotDetails",
    args: [tokenId],
  });

  const { data: owner } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "ownerOf",
    args: [tokenId],
  });

  if (isLoading) {
    return (
      <div className="card bg-white shadow-sm border border-base-300 h-72 animate-pulse">
        <div className="card-body items-center justify-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </div>
    );
  }

  if (!landPlot || landPlot.id === 0n) return null;

  const isVerified = landPlot.isVerified;

  return (
    <div className="card bg-white shadow-sm border border-base-300 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header color band */}
      <div className={`h-2 ${isVerified ? "bg-primary" : "bg-warning"}`} />

      <div className="card-body p-5 gap-3">
        {/* Token ID + Verification badge */}
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs text-base-content/50 font-semibold">Token #{tokenId.toString()}</span>
          {isVerified ? (
            <span className="badge badge-success bg-success/10 text-success border-none gap-1 text-xs">
              <CheckCircleIcon className="w-3 h-3" /> Verified
            </span>
          ) : (
            <span className="badge bg-warning/10 text-warning border-none gap-1 text-xs">
              <ClockIcon className="w-3 h-3" /> Pending
            </span>
          )}
        </div>

        {/* NIB */}
        <div>
          <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">NIB</p>
          <p className="font-bold text-base-content text-sm break-all">{landPlot.NIB_NomorIdentitasBidang || "—"}</p>
        </div>

        {/* Location */}
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
            <p className="text-base-content">{landPlot.areaSqm.toString()} m²</p>
          </div>
          <div>
            <p className="text-base-content/50 font-semibold uppercase tracking-wider mb-0.5">IPFS</p>
            <p className="text-base-content truncate">
              {landPlot.geoJSONHash ? (
                <a
                  href={landPlot.geoJSONHash.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {landPlot.geoJSONHash.slice(0, 16)}…
                </a>
              ) : (
                "—"
              )}
            </p>
          </div>
        </div>

        {showOwner && owner && (
          <div>
            <p className="text-xs text-base-content/50 font-semibold uppercase tracking-wider mb-1">Owner</p>
            <Address address={owner} />
          </div>
        )}

        {/* Action */}
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
