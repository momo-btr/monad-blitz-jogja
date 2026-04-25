"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowsRightLeftIcon,
  CheckBadgeIcon,
  DocumentArrowDownIcon,
  GlobeAltIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { DynamicMap } from "~~/components/DynamicMap";
import { useGetLandMetadata } from "~~/hooks/useGetLandMetadata";

export default function PropertyDetails() {
  const params = useParams();
  const id = params?.id ? String(params.id) : "1";

  const { metadata, geoJson, isLoading } = useGetLandMetadata(BigInt(id));

  // Mock data for elements not provided by the current metadata hook
  const provenanceHistory = [
    {
      date: "Oct 24, 2023",
      action: "Yield Distribution",
      from: "Terraforma Escrow",
      to: "0x8f...3b1a",
      tx: "0xab12...def4",
    },
    { date: "Sep 15, 2023", action: "Verification", from: "Oracle Network", to: "Smart Contract", tx: "0xbc34...bcd1" },
    {
      date: "Sep 02, 2023",
      action: "Token Minting",
      from: "NullAddress",
      to: "Terraforma Deployer",
      tx: "0xcd56...efa2",
    },
  ];

  const onChainAssets = [
    { name: "Topographical Survey", type: "PDF", size: "4.2 MB" },
    { name: "Zoning Certificate", type: "PDF", size: "1.1 MB" },
    { name: "Deed of Trust (Tokenized)", type: "IPFS", size: "128 KB" },
  ];

  const techSpecs = [
    { label: "Acreage", value: metadata?.attributes?.acreage || "120 Acres" },
    { label: "Terrain", value: "Flat / Gently Sloping" },
    { label: "Zoning", value: metadata?.attributes?.landUse || "Agricultural" },
    { label: "Water Access", value: "Direct River / Aquifer" },
    { label: "Grid Connection", value: "Off-Grid Capable (Solar)" },
    { label: "Token Standard", value: "ERC-721 (Monad)" },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Breadcrumbs */}
      <div className="text-sm breadcrumbs text-base-content/60">
        <ul>
          <li>
            <Link href="/marketplace">Marketplace</Link>
          </li>
          <li>
            <Link href="/marketplace?region=Sumatra">Sumatra Region</Link>
          </li>
          <li className="font-semibold text-base-content">{metadata?.name || "Property Details"}</li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Main Content (70%) */}
        <div className="lg:w-2/3 space-y-8">
          {/* Header & Hero Image */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-base-content flex items-center gap-2 mb-2">
                  {metadata?.name || "Sumatra Palm Estate"}
                  <CheckBadgeIcon className="w-8 h-8 text-primary" />
                </h1>
                <p className="text-base-content/70 flex items-center gap-1.5 text-lg">
                  <MapPinIcon className="w-5 h-5 text-base-content/50" />
                  South Sumatra, Indonesia
                </p>
              </div>
              <div className="badge badge-success bg-primary/10 text-primary border-none px-4 py-3 text-sm font-bold shadow-sm">
                ID: #{id}
              </div>
            </div>

            <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-sm border border-base-300 relative group">
              <img
                src={metadata?.image || "https://placehold.co/1200x800/2A9D8F/FFFFFF?text=Land+Image"}
                alt="Property View"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <button className="btn btn-sm btn-ghost text-white border-white/30 backdrop-blur-sm">
                  View Full Gallery (8)
                </button>
              </div>
            </div>
          </div>

          {/* Technical Description */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-base-300">
            <h2 className="text-xl font-bold text-base-content mb-4">Property Overview</h2>
            <p className="text-base-content/80 leading-relaxed">
              {metadata?.description ||
                "Prime agricultural land situated in the heart of South Sumatra. This parcel boasts highly fertile soil historically yielding above-average palm and rubber outputs. The estate comes fully verified on-chain, carrying a certified carbon offset rating, making it an ideal asset for eco-conscious institutional investors seeking steady yield."}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-base-300">
            <h2 className="text-xl font-bold text-base-content mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {techSpecs.map((spec, idx) => (
                <div key={idx} className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                  <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="font-medium text-base-content">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-white rounded-2xl shadow-sm border border-base-300 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-base-200 flex justify-between items-center bg-white/50 backdrop-blur">
              <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                <GlobeAltIcon className="w-6 h-6 text-primary" />
                Geospatial Boundaries
              </h2>
            </div>
            <div className="p-0 border-t border-base-200">
              {/* Force height strictly to fit the design */}
              <div className="h-[450px] w-full">
                <DynamicMap geojson={geoJson} />
              </div>
            </div>
            <div className="p-4 bg-base-200/30 border-t border-base-200 text-sm text-base-content/60 flex justify-between">
              <span>Coordinate System: WGS 84</span>
              <span>Polygon Vertices: {geoJson?.geometry?.coordinates?.[0]?.length || 0}</span>
            </div>
          </div>

          {/* Provenance History */}
          <div className="bg-white rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            <div className="p-6 border-b border-base-200">
              <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                <ArrowsRightLeftIcon className="w-6 h-6 text-primary" />
                Provenance History
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200/50 text-base-content/70">
                  <tr>
                    <th>Date</th>
                    <th>Action</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Tx Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {provenanceHistory.map((log, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-base-200/30 transition-colors border-b border-base-200 last:border-0"
                    >
                      <td className="text-sm text-base-content/70">{log.date}</td>
                      <td className="font-medium text-base-content">{log.action}</td>
                      <td className="text-sm text-base-content/70">{log.from}</td>
                      <td className="text-sm text-base-content/70">{log.to}</td>
                      <td>
                        <Link
                          href={`https://explorer.monad-testnet.io/tx/${log.tx}`}
                          target="_blank"
                          className="text-xs text-primary hover:underline font-mono bg-primary/5 px-2 py-1 rounded"
                        >
                          {log.tx}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar (30%) */}
        <div className="lg:w-1/3 space-y-6">
          {/* Transaction Card (Sticky) */}
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-300">
              <div className="flex justify-between items-center mb-6">
                <span className="text-base-content/60 font-medium">Asking Price</span>
                <span className="badge badge-success bg-success/10 text-success border-none font-bold">Available</span>
              </div>

              <div className="mb-6">
                <h3 className="text-4xl font-extrabold text-base-content flex items-baseline gap-2">
                  450 <span className="text-lg font-medium text-base-content/50">MONAD</span>
                </h3>
                <p className="text-sm text-base-content/50 mt-1">~ $12,450.00 USD equivalent</p>
              </div>

              <div className="space-y-3">
                <button className="btn btn-primary w-full text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 transition-shadow">
                  Acquire Asset
                </button>
                <button className="btn btn-outline border-base-300 text-base-content hover:bg-base-200 hover:border-base-300 w-full">
                  Place Bid
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-base-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-base-content/60">Estimated Yield</span>
                  <span className="font-semibold text-success">9.2% APY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/60">Platform Fee</span>
                  <span className="font-semibold text-base-content">1.5%</span>
                </div>
              </div>
            </div>

            {/* Institutional Protection */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
              <ShieldCheckIcon className="w-32 h-32 absolute -top-4 -right-4 text-white/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheckIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold text-white">Institutional Protection</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  This asset is legally wrapped in an SPV compliant with Indonesian agrarian law. Smart contracts are
                  secured via Safe multi-sig and audited by top-tier firms.
                </p>
                <Link href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                  View Legal Structure <ArrowsRightLeftIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* On-Chain Assets / Documents */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-300">
              <h3 className="text-lg font-bold text-base-content mb-4">On-Chain Assets</h3>
              <div className="space-y-3">
                {onChainAssets.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-base-200/50 rounded-xl hover:bg-base-200 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-primary group-hover:text-primary-content group-hover:bg-primary transition-colors">
                        <DocumentArrowDownIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-base-content">{doc.name}</p>
                        <p className="text-xs text-base-content/50">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
