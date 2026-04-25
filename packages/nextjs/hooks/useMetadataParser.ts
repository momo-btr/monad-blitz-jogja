import { useMemo } from "react";

export type MetadataAttribute = {
  trait_type: string;
  value: string | number | boolean;
};

/**
 * Parses a standard NFT metadata attributes array into a flat key-value object.
 * Converts trait_type like "Land Use" into "land_use".
 *
 * @param attributes Array of metadata attributes from IPFS/Pinata
 * @returns Flattened object of traits
 */
export const useMetadataParser = (attributes?: MetadataAttribute[]) => {
  return useMemo(() => {
    if (!attributes || !Array.isArray(attributes)) {
      return {};
    }

    return attributes.reduce((acc: Record<string, any>, attr) => {
      if (attr && attr.trait_type && attr.value !== undefined) {
        // Sanitize the key: lowercase and replace spaces/hyphens with underscores
        const key = attr.trait_type
          .toLowerCase()
          .trim()
          .replace(/[\s-]+/g, "_");

        acc[key] = attr.value;
      }
      return acc;
    }, {});
  }, [attributes]);
};
