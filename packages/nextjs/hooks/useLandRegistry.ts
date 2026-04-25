import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export type LandEvent = {
  tokenId: bigint;
  owner: `0x${string}`;
  nib: string;
  blockNumber: bigint;
  transactionHash: `0x${string}`;
};

/**
 * Returns all minted land certificates by reading LandMinted events.
 * Sorted newest-first.
 */
export const useLandRegistry = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "TerraformaLand",
    eventName: "LandMinted",
    fromBlock: 0n,
    watch: true,
    blockData: true,
    transactionData: true,
  });

  const lands: LandEvent[] = (events ?? []).map(event => {
    const { blockData, transactionData } = event as unknown as {
      blockData?: { number: bigint } | null;
      transactionData?: { hash?: `0x${string}` } | null;
    };
    return {
      tokenId: event.args.tokenId as bigint,
      owner: event.args.owner as `0x${string}`,
      nib: event.args.nib as string,
      blockNumber: blockData?.number ?? 0n,
      transactionHash: (transactionData?.hash ?? "0x") as `0x${string}`,
    };
  });

  return {
    lands,
    isLoading,
    error,
    total: lands.length,
  };
};
