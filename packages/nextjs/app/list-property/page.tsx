"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function ListPropertyPage() {
  const { address } = useAccount();

  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [nib, setNib] = useState("");
  const [province, setProvince] = useState("DKI Jakarta");
  const [city, setCity] = useState("Jakarta Pusat");
  const [kecamatan, setKecamatan] = useState("Menteng");
  const [landUse, setLandUse] = useState("Residential (R-1)");
  const [description, setDescription] = useState("");
  const [areaSqm, setAreaSqm] = useState("");
  const [priceMon, setPriceMon] = useState("");
  const [geojsonInput, setGeojsonInput] = useState(
    "[[[106.81, -6.18], [106.82, -6.18], [106.82, -6.19], [106.81, -6.19], [106.81, -6.18]]]",
  );

  const [isUploading, setIsUploading] = useState(false);

  const { writeContractAsync, isPending } = useScaffoldWriteContract({
    contractName: "TerraformaLand",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      notification.error("Please connect your wallet first");
      return;
    }
    if (!file) {
      notification.error("Please select a land certificate image");
      return;
    }

    try {
      setIsUploading(true);
      const notificationId = notification.loading("Uploading image to IPFS via Pinata...");

      // Step A: Upload Image
      const formData = new FormData();
      formData.append("file", file);

      const imgRes = await fetch("/api/pinata", {
        method: "POST",
        body: formData,
      });

      if (!imgRes.ok) throw new Error("Image upload failed");
      const { ipfsUrl: imageIpfsUrl } = await imgRes.json();

      notification.remove(notificationId);
      const metaNotificationId = notification.loading("Uploading metadata to IPFS...");

      // Parse GeoJSON
      let coordinates;
      try {
        coordinates = JSON.parse(geojsonInput);
      } catch {
        throw new Error("Invalid GeoJSON coordinates format");
      }

      // Step B: Construct Metadata
      const metadata = {
        name: `NIB ${nib}`,
        description,
        image: imageIpfsUrl,
        attributes: [
          { trait_type: "Province", value: province },
          { trait_type: "City", value: city },
          { trait_type: "Kecamatan", value: kecamatan },
          { trait_type: "NIB", value: nib },
          { trait_type: "Land Use", value: landUse },
          { trait_type: "Price", value: `${priceMon} MON` },
        ],
        geojson: {
          type: "Polygon",
          coordinates: coordinates,
        },
      };

      // Step C: Upload Metadata JSON
      const metaRes = await fetch("/api/pinata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metadata),
      });

      if (!metaRes.ok) throw new Error("Metadata upload failed");
      const { ipfsUrl: metadataIpfsUrl } = await metaRes.json();

      notification.remove(metaNotificationId);
      notification.success("Metadata uploaded to IPFS successfully!");

      // Step D: Mint Contract
      // Signature: mintLandCertificate(address owner, string geoJSONHash, string locationProvince, string locationCity, uint256 areaSqm, string nib, uint256 priceWei)
      await writeContractAsync({
        functionName: "mintLandCertificate",
        args: [address, metadataIpfsUrl, province, city, BigInt(areaSqm || "0"), nib, parseEther(priceMon || "0")],
      });

      notification.success("Property listed successfully!");

      // Reset form
      setFile(null);
      setNib("");
      setDescription("");
      setAreaSqm("");
      setPriceMon("");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to list property";
      console.error("Listing error:", error);
      notification.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pb-12 animate-fade-in">
      <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
        <div className="p-8 bg-primary/10 border-b border-base-300">
          <h1 className="text-3xl font-bold text-base-content">List New Property</h1>
          <p className="text-base-content/70 mt-2">Mint a land certificate as an immutable NFT on Monad Testnet.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NIB */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">NIB (Nomor Induk Bidang)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 12.03.04.05.00678"
                className="input input-bordered w-full"
                value={nib}
                onChange={e => setNib(e.target.value)}
                required
              />
            </div>

            {/* Area */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Area (sqm)</span>
              </label>
              <input
                type="number"
                placeholder="e.g. 1500"
                className="input input-bordered w-full"
                value={areaSqm}
                onChange={e => setAreaSqm(e.target.value)}
                required
              />
            </div>

            {/* Asking Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Asking Price (MON)</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <input
                  type="number"
                  placeholder="e.g. 450"
                  className="grow"
                  min="0"
                  step="0.000001"
                  value={priceMon}
                  onChange={e => setPriceMon(e.target.value)}
                  required
                />
                <span className="text-base-content/50 font-semibold text-sm">MON</span>
              </label>
            </div>

            {/* Province */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Province</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={province}
                onChange={e => setProvince(e.target.value)}
                required
              />
            </div>

            {/* City */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">City</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
            </div>

            {/* Kecamatan */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Kecamatan</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={kecamatan}
                onChange={e => setKecamatan(e.target.value)}
                required
              />
            </div>

            {/* Land Use */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Land Use</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={landUse}
                onChange={e => setLandUse(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Detailed description of the property..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* GeoJSON Coordinates */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">GeoJSON Coordinates (Polygon)</span>
            </label>
            <textarea
              className="textarea textarea-bordered font-mono text-xs h-24 w-full"
              value={geojsonInput}
              onChange={e => setGeojsonInput(e.target.value)}
              required
            ></textarea>
            <label className="label">
              <span className="label-text-alt text-base-content/50">Format: [[[lng, lat], [lng, lat], ...]]</span>
            </label>
          </div>

          {/* Image Upload */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Certificate / Property Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full"
              onChange={e => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="divider"></div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full text-lg" disabled={isUploading || isPending}>
            {isUploading ? (
              <>
                <span className="loading loading-spinner"></span>
                Uploading to IPFS...
              </>
            ) : isPending ? (
              <>
                <span className="loading loading-spinner"></span>
                Minting Transaction...
              </>
            ) : (
              "Mint Land Certificate"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
