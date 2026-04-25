import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { parseAbi } from "viem";

// Minimal ERC721 ABI for reading tokenURI
const minimalERC721Abi = parseAbi([
  "function tokenURI(uint256 tokenId) view returns (string)",
]);

export const useGetLandMetadata = (tokenId: bigint) => {
  const [metadata, setMetadata] = useState<any>(null);
  const [geoJson, setGeoJson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Read URI from Monad Testnet Contract
  const { data: tokenURI } = useReadContract({
    address: "0x0000000000000000000000000000000000000000", // TODO: Replace with actual contract address
    abi: minimalERC721Abi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        if (tokenURI) {
          // Resolve IPFS URL
          const res = await fetch(tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/"));
          const data = await res.json();
          setMetadata(data);

          if (data.attributes?.geoJson) {
            setGeoJson(
              typeof data.attributes.geoJson === "string"
                ? JSON.parse(data.attributes.geoJson)
                : data.attributes.geoJson
            );
          }
        } else {
          // MOCK DATA: Fallback for MVP when contract is not yet deployed or URI is empty
          const mockGeoJson = {
            type: "Feature",
            properties: { name: "Sumatra Palm Estate" },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [104.7566, -3.105],
                  [104.7600, -3.105],
                  [104.7600, -3.102],
                  [104.7566, -3.102],
                  [104.7566, -3.105],
                ],
              ],
            },
          };

          setMetadata({
            name: "Sumatra Palm Estate",
            description: "Prime agricultural land in Sumatra, Indonesia.",
            image: "https://placehold.co/600x400/2A9D8F/FFFFFF?text=Land+Image",
            attributes: {
              acreage: "120",
              landUse: "Agricultural",
              soilQuality: "High",
              carbonOffset: "500t",
              buildingPermit: "Yes",
            }
          });
          setGeoJson(mockGeoJson);
        }
      } catch (e) {
        console.error("Failed to parse metadata", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [tokenURI]);

  return { metadata, geoJson, isLoading };
};
