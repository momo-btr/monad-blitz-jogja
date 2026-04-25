import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export type LandPlot = {
  id: bigint;
  geoJSONHash: string;
  locationProvince: string;
  locationCity: string;
  areaSqm: bigint;
  NIB_NomorIdentitasBidang: string;
  isVerified: boolean;
  priceWei: bigint;
};

export type IpfsMetadata = {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<{ trait_type: string; value: string | number }>;
  geojson?: unknown;
};

/**
 * Reads on-chain land plot details and optionally fetches IPFS metadata.
 * No mock fallback — returns undefined when data is genuinely absent.
 */
export const useGetLandMetadata = (tokenId: bigint) => {
  const [ipfsMetadata, setIpfsMetadata] = useState<IpfsMetadata | null>(null);
  const [geoJson, setGeoJson] = useState<unknown>(null);
  const [isFetchingIpfs, setIsFetchingIpfs] = useState(false);

  const { data: landPlot, isLoading: isLoadingPlot } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "getLandPlotDetails",
    args: [tokenId],
    query: { enabled: tokenId > 0n },
  });

  const { data: ownerAddress } = useScaffoldReadContract({
    contractName: "TerraformaLand",
    functionName: "ownerOf",
    args: [tokenId],
    query: { enabled: tokenId > 0n },
  });

  useEffect(() => {
    const hash = landPlot?.geoJSONHash;
    if (!hash?.startsWith("ipfs://")) return;

    setIsFetchingIpfs(true);
    const url = hash.replace("ipfs://", "https://ipfs.io/ipfs/");

    fetch(url)
      .then(r => r.json())
      .then((data: IpfsMetadata) => {
        setIpfsMetadata(data);
        if (data.geojson) {
          setGeoJson(typeof data.geojson === "string" ? JSON.parse(data.geojson) : data.geojson);
        }
      })
      .catch(err => console.warn("[useGetLandMetadata] IPFS fetch failed:", err))
      .finally(() => setIsFetchingIpfs(false));
  }, [landPlot?.geoJSONHash]);

  return {
    landPlot: landPlot as LandPlot | undefined,
    ownerAddress: ownerAddress as `0x${string}` | undefined,
    ipfsMetadata,
    geoJson,
    isLoading: isLoadingPlot || isFetchingIpfs,
  };
};
