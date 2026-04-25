"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Address } from "@scaffold-ui/components";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import {
  ArrowsRightLeftIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MapPinIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { DynamicMap } from "~~/components/DynamicMap";
import { useScaffoldEventHistory, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useGetLandMetadata } from "~~/hooks/useGetLandMetadata";
import { notification } from "~~/utils/scaffold-eth";

export default function PropertyDetails() {
  const params = useParams();
  const id = params?.id ? String(params.id) : "1";
  const tokenId = BigInt(id);

  const { address: connectedAddress } = useAccount();

  // Core land data + IPFS metadata
  const { landPlot, ipfsMetadata, geoJson, isLoading } = useGetLandMetadata(tokenId);

  // NFT owner
  const { data: nftOwner } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "ownerOf",
    args: [tokenId],
    query: { enabled: tokenId > 0n },
  });

  // Admin status for connected wallet
  const { data: isAdmin } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "admins",
    args: [connectedAddress],
    query: { enabled: !!connectedAddress },
  });

  // LandMinted events for this token (provenance / mint history)
  const { data: mintEvents } = useScaffoldEventHistory({
    contractName: "TerraformaLand",
    eventName: "LandMinted",
    fromBlock: 0n,
    watch: false,
    blockData: true,
    filters: { tokenId },
  });

  // Write: admin verification toggle
  const { writeContractAsync: writeVerification, isPending: isVerificationPending } = useScaffoldWriteContract({
    contractName: "TerraformaLand",
  });

  // Write: owner safeTransferFrom
  const { writeContractAsync: writeTransfer, isPending: isTransferPending } = useScaffoldWriteContract({
    contractName: "TerraformaLand",
  });

  // Transfer form local state
  const [transferTo, setTransferTo] = useState("");
  const [showTransferForm, setShowTransferForm] = useState(false);

  const isOwner = !!connectedAddress && !!nftOwner && connectedAddress.toLowerCase() === nftOwner.toLowerCase();

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleVerificationToggle = async () => {
    if (!landPlot) return;
    try {
      await writeVerification({
        functionName: "updateVerificationStatus",
        args: [tokenId, !landPlot.isVerified],
      });
      notification.success(landPlot.isVerified ? "Verification revoked." : "Land certificate marked as verified!");
    } catch (err: unknown) {
      notification.error(err instanceof Error ? err.message : "Verification update failed");
    }
  };

  const handleTransfer = async () => {
    if (!isAddress(transferTo)) {
      notification.error("Invalid recipient address");
      return;
    }
    if (!connectedAddress) return;
    try {
      // safeTransferFrom has two ABI overloads (3-arg and 4-arg); TypeScript
      // intersects their arg types into `never`. Cast the whole config to any
      // to escape this — runtime behaviour is correct.
      await writeTransfer({
        functionName: "safeTransferFrom",
        args: [connectedAddress as `0x${string}`, transferTo as `0x${string}`, tokenId],
      } as any);
      notification.success("Asset transferred successfully!");
      setTransferTo("");
      setShowTransferForm(false);
    } catch (err: unknown) {
      notification.error(err instanceof Error ? err.message : "Transfer failed");
    }
  };

  // ── Loading / Error states ─────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!landPlot || landPlot.id === 0n) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center gap-4 text-base-content/60">
        <p className="text-xl font-semibold">Land Parcel Not Found</p>
        <p className="text-sm">Token #{id} does not exist in the registry.</p>
        <Link href="/marketplace" className="btn btn-outline border-primary text-primary">
          Back to Registry
        </Link>
      </div>
    );
  }

  // ── Derived display values ─────────────────────────────────────────────────

  const pageTitle = landPlot.NIB_NomorIdentitasBidang
    ? `NIB ${landPlot.NIB_NomorIdentitasBidang}`
    : (ipfsMetadata?.name ?? `Token #${id}`);

  const imageUrl = ipfsMetadata?.image?.startsWith("ipfs://")
    ? ipfsMetadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
    : (ipfsMetadata?.image ?? null);

  const ipfsGatewayUrl = (hash: string) =>
    hash.startsWith("ipfs://") ? hash.replace("ipfs://", "https://ipfs.io/ipfs/") : hash;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs text-black/60">
        <ul>
          <li>
            <Link href="/marketplace">Registry</Link>
          </li>
          <li className="font-semibold text-black">{landPlot.NIB_NomorIdentitasBidang || `Token #${id}`}</li>
        </ul>
      </div>

      {/* Two-column layout: 70% left / 30% right */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
        <div className="lg:w-2/3 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-black flex items-center gap-2 mb-2">
                  {pageTitle}
                  {landPlot.isVerified && <CheckBadgeIcon className="w-8 h-8 text-primary flex-shrink-0" />}
                </h1>
                <p className="text-black/70 flex items-center gap-1.5 text-lg">
                  <MapPinIcon className="w-5 h-5 text-black/50 flex-shrink-0" />
                  {[landPlot.locationCity, landPlot.locationProvince].filter(Boolean).join(", ") || "Location not set"}
                </p>
              </div>
              {/* Token ID badge */}
              <div className="badge bg-primary/10 text-primary border-none px-4 py-3 text-sm font-bold shadow-sm flex-shrink-0">
                Token #{id}
              </div>
            </div>

            {/* Certificate image or placeholder */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-sm border border-base-300 bg-base-200 flex items-center justify-center">
              {imageUrl ? (
                <img src={imageUrl} alt={`Land certificate ${id}`} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-base-content/30">
                  <GlobeAltIcon className="w-16 h-16" />
                  <span className="text-sm">No image uploaded</span>
                </div>
              )}
            </div>
          </div>

          {/* Land Certificate Details grid */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-base-300">
            <h2 className="text-xl font-bold text-black mb-6">Land Certificate Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {(
                [
                  { label: "Token ID", value: `#${landPlot.id.toString()}` },
                  { label: "NIB", value: landPlot.NIB_NomorIdentitasBidang || "—" },
                  { label: "Province", value: landPlot.locationProvince || "—" },
                  { label: "City", value: landPlot.locationCity || "—" },
                  {
                    label: "Area",
                    value: landPlot.areaSqm ? `${landPlot.areaSqm.toString()} m²` : "—",
                  },
                  {
                    label: "Status",
                    value: landPlot.isVerified ? "✓ Verified" : "⏳ Pending Verification",
                    className: landPlot.isVerified ? "text-success" : "text-warning",
                  },
                ] as Array<{ label: string; value: string; className?: string }>
              ).map((spec, idx) => (
                <div key={idx} className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                  <p className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className={`font-medium text-black ${spec.className ?? ""}`}>{spec.value}</p>
                </div>
              ))}
            </div>

            {/* IPFS NFT attributes (if any) */}
            {ipfsMetadata?.attributes && ipfsMetadata.attributes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-3">
                  NFT Attributes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ipfsMetadata.attributes.map((attr, i) => (
                    <div key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {attr.trait_type}: {String(attr.value)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IPFS / geoJSON hash reference */}
            {landPlot.geoJSONHash && (
              <div className="mt-6 pt-4 border-t border-base-200">
                <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                  Metadata / IPFS Reference
                </p>
                <a
                  href={ipfsGatewayUrl(landPlot.geoJSONHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm font-mono break-all"
                >
                  {landPlot.geoJSONHash}
                </a>
              </div>
            )}
          </div>

          {/* Leaflet / GeoJSON Map */}
          {geoJson ? (
            <div className="bg-white rounded-2xl shadow-sm border border-base-300 overflow-hidden">
              <div className="p-6 border-b border-base-200 flex items-center gap-2">
                <GlobeAltIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-base-content">Geospatial Boundaries</h2>
              </div>
              <div className="h-[400px] w-full">
                <DynamicMap geojson={geoJson as { type: string; coordinates: number[][][] } | null} />
              </div>
              <div className="p-4 bg-base-200/30 border-t border-base-200 text-sm text-base-content/60">
                Coordinate System: WGS 84
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-base-300 text-center text-black/40">
              <GlobeAltIcon className="w-10 h-10 mx-auto mb-2" />
              <p>No geospatial data available. Upload metadata to IPFS with GeoJSON to enable the map view.</p>
            </div>
          )}

          {/* Provenance — on-chain LandMinted events only */}
          <div className="bg-white rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            <div className="p-6 border-b border-base-200">
              <h2 className="text-xl font-bold text-black flex items-center gap-2">
                <ArrowsRightLeftIcon className="w-6 h-6 text-primary" />
                Mint History
              </h2>
            </div>

            {!mintEvents || mintEvents.length === 0 ? (
              <div className="p-8 text-center text-black/40 text-sm">No mint events found for this token.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="bg-base-200/50 text-black/70 text-xs uppercase">
                    <tr>
                      <th>Block</th>
                      <th>Event</th>
                      <th>Owner</th>
                      <th>NIB</th>
                      <th>Tx Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mintEvents.map((ev, idx) => (
                      <tr key={idx} className="border-b border-base-200 last:border-0 hover:bg-base-200/30">
                        <td className="font-mono text-sm text-base-content/70">
                          {(ev as { blockData?: { number?: bigint } | null }).blockData?.number?.toString() ?? "—"}
                        </td>
                        <td className="font-medium">Land Minted</td>
                        <td>
                          {ev.args.owner ? (
                            <Address address={ev.args.owner as `0x${string}`} />
                          ) : (
                            <span className="text-base-content/40 text-sm">—</span>
                          )}
                        </td>
                        <td className="text-sm text-base-content/70">{(ev.args.nib as string) ?? "—"}</td>
                        <td>
                          <a
                            href={`https://testnet.monadexplorer.com/tx/${ev.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline font-mono"
                          >
                            {String(ev.transactionHash ?? "—").slice(0, 10)}…
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ─────────────────────────────────────────────────── */}
        <div className="lg:w-1/3 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* NFT Info + Acquire Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-300">
              {/* Verification status badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-black/60 font-medium">Certificate Status</span>
                {landPlot.isVerified ? (
                  <span className="badge bg-success/10 text-success border-none font-bold gap-1 px-3 py-2">
                    <CheckCircleIcon className="w-4 h-4" /> Verified
                  </span>
                ) : (
                  <span className="badge bg-warning/10 text-warning border-none font-bold gap-1 px-3 py-2">
                    <XCircleIcon className="w-4 h-4" /> Unverified
                  </span>
                )}
              </div>

              {/* Token ID */}
              <div className="mb-4 pb-4 border-b border-base-200">
                <p className="text-xs text-black/50 font-semibold uppercase mb-1">Token</p>
                <p className="font-mono text-primary font-bold text-lg">#{tokenId.toString()}</p>
              </div>

              {/* Current owner */}
              <div className="mb-4 pb-4 border-b border-base-200">
                <p className="text-xs text-base-content/50 font-semibold uppercase mb-2">Current Owner</p>
                {nftOwner ? (
                  <Address address={nftOwner} />
                ) : (
                  <span className="text-base-content/40 text-sm">Loading…</span>
                )}
              </div>

              {/* IPFS description */}
              {ipfsMetadata?.description && (
                <div className="mb-4 pb-4 border-b border-base-200">
                  <p className="text-xs text-base-content/50 font-semibold uppercase mb-2">Description</p>
                  <p className="text-sm text-base-content/80 leading-relaxed">{ipfsMetadata.description}</p>
                </div>
              )}

              {/* ── Acquire / Transfer section ── */}
              <div className="space-y-3">
                {/* Case 1: wallet not connected */}
                {!connectedAddress ? (
                  <button
                    className="btn btn-outline border-base-300 w-full text-black/50 cursor-not-allowed"
                    disabled
                  >
                    Connect Wallet to Acquire
                  </button>
                ) : isOwner ? (
                  /* Case 2: connected wallet is the owner → Transfer */
                  <>
                    <p className="text-xs text-success font-semibold uppercase tracking-wider">
                      ✓ You own this certificate
                    </p>
                    {!showTransferForm ? (
                      <button className="btn btn-primary w-full" onClick={() => setShowTransferForm(true)}>
                        Transfer Asset
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Recipient address (0x…)"
                          className="input input-bordered w-full text-sm"
                          value={transferTo}
                          onChange={e => setTransferTo(e.target.value)}
                        />
                        <button
                          className="btn btn-primary w-full"
                          onClick={handleTransfer}
                          disabled={isTransferPending || !transferTo}
                        >
                          {isTransferPending ? (
                            <>
                              <span className="loading loading-spinner loading-sm" />
                              Transferring…
                            </>
                          ) : (
                            "Confirm Transfer"
                          )}
                        </button>
                        <button
                          className="btn btn-ghost btn-sm w-full text-base-content/60"
                          onClick={() => {
                            setShowTransferForm(false);
                            setTransferTo("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                ) : isAdmin ? (
                  /* Case 3: connected wallet is admin → link to mint */
                  <>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                      🔑 Admin — Mint new certificate
                    </p>
                    <Link href="/list-property" className="btn btn-primary w-full">
                      Mint Land Certificate
                    </Link>
                  </>
                ) : (
                  /* Case 4: connected but neither owner nor admin */
                  <>
                    <p className="text-xs text-base-content/50 font-medium leading-relaxed">
                      Contact the land registrar to acquire this parcel.
                    </p>
                    <div
                      className="tooltip tooltip-top w-full"
                      data-tip="Contact the land registrar to acquire this parcel"
                    >
                      <button
                        className="btn btn-outline border-base-300 w-full text-base-content/40 cursor-not-allowed"
                        disabled
                      >
                        Acquire Asset
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Admin: Verification Control panel (admin only) */}
            {isAdmin && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
                <ShieldCheckIcon className="w-32 h-32 absolute -top-4 -right-4 text-white/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheckIcon className="w-6 h-6 text-primary" />
                    <h3 className="text-lg font-bold text-white">Admin: Verification Control</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Current status:{" "}
                    <span className={landPlot.isVerified ? "text-success font-semibold" : "text-warning font-semibold"}>
                      {landPlot.isVerified ? "Verified ✓" : "Unverified"}
                    </span>
                  </p>
                  <button
                    className={`btn w-full ${landPlot.isVerified ? "btn-error" : "btn-success"}`}
                    onClick={handleVerificationToggle}
                    disabled={isVerificationPending}
                  >
                    {isVerificationPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm" /> Processing…
                      </>
                    ) : landPlot.isVerified ? (
                      "Revoke Verification"
                    ) : (
                      "Mark as Verified"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* On-Chain Reference */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-300">
              <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-primary" />
                On-Chain Reference
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-black/50 font-semibold uppercase mb-1">Contract Standard</p>
                  <p className="text-base-content font-medium">ERC-721 (Monad Testnet)</p>
                </div>
                <div>
                  <p className="text-xs text-black/50 font-semibold uppercase mb-1">Token ID</p>
                  <p className="font-mono text-primary font-bold">#{tokenId.toString()}</p>
                </div>
                {landPlot.geoJSONHash && (
                  <div>
                    <p className="text-xs text-base-content/50 font-semibold uppercase mb-1">Metadata URI</p>
                    <a
                      href={ipfsGatewayUrl(landPlot.geoJSONHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs font-mono break-all"
                    >
                      {landPlot.geoJSONHash.length > 32
                        ? `${landPlot.geoJSONHash.slice(0, 32)}…`
                        : landPlot.geoJSONHash}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Institutional Protection */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
              <ShieldCheckIcon className="w-28 h-28 absolute -bottom-4 -right-4 text-white/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheckIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-base font-bold text-white">Institutional Protection</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  This land certificate is anchored on-chain as an immutable ERC-721 token. Ownership provenance and
                  transfer history are permanently verifiable on the Monad blockchain. All legal rights remain subject
                  to applicable national property law and the authority of the certifying land registry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
