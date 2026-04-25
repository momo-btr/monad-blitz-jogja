import { useEffect, useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const useGetLandMetadata = (tokenId: bigint) => {
  const [metadata, setMetadata] = useState<any>(null);
  const [geoJson, setGeoJson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Read URI from Monad Testnet Contract
  const { data: tokenURI } = useScaffoldReadContract({
    contractName: "TerraformaLand",
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

          if (data.geojson) {
            setGeoJson(typeof data.geojson === "string" ? JSON.parse(data.geojson) : data.geojson);
          } else if (data.attributes?.geoJson) {
            // Fallback for old mock format
            setGeoJson(
              typeof data.attributes.geoJson === "string"
                ? JSON.parse(data.attributes.geoJson)
                : data.attributes.geoJson,
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
                  [104.76, -3.105],
                  [104.76, -3.102],
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
            },
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
