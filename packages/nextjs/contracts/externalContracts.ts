import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * TerraformaLand on Monad Testnet (Chain ID: 10143)
 *
 * IMPORTANT: Replace the address below with the actual deployed contract address.
 * Deploy with: yarn deploy --network monadTestnet
 * The deployer wallet becomes the initial admin (admins[deployer] = true).
 *
 * Pinata environment variables required:
 *   PINATA_JWT=<your-pinata-jwt>
 *   NEXT_PUBLIC_PINATA_GATEWAY=<your-pinata-gateway-domain>
 */
const externalContracts = {
  10143: {
    TerraformaLand: {
      address: "0x0000000000000000000000000000000000000000",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "address", name: "owner", type: "address" },
          ],
          name: "ERC721IncorrectOwner",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "ERC721InsufficientApproval",
          type: "error",
        },
        {
          inputs: [{ internalType: "address", name: "approver", type: "address" }],
          name: "ERC721InvalidApprover",
          type: "error",
        },
        {
          inputs: [{ internalType: "address", name: "operator", type: "address" }],
          name: "ERC721InvalidOperator",
          type: "error",
        },
        {
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "ERC721InvalidOwner",
          type: "error",
        },
        {
          inputs: [{ internalType: "address", name: "receiver", type: "address" }],
          name: "ERC721InvalidReceiver",
          type: "error",
        },
        {
          inputs: [{ internalType: "address", name: "sender", type: "address" }],
          name: "ERC721InvalidSender",
          type: "error",
        },
        {
          inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
          name: "ERC721NonexistentToken",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "approved", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: true, internalType: "address", name: "operator", type: "address" },
            { indexed: false, internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "ApprovalForAll",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: false, internalType: "string", name: "nib", type: "string" },
          ],
          name: "LandMinted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
            { indexed: false, internalType: "bool", name: "isVerified", type: "bool" },
          ],
          name: "VerificationUpdated",
          type: "event",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "admins",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
          name: "getApproved",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
          name: "getLandPlotDetails",
          outputs: [
            {
              components: [
                { internalType: "uint256", name: "id", type: "uint256" },
                { internalType: "string", name: "geoJSONHash", type: "string" },
                { internalType: "string", name: "locationProvince", type: "string" },
                { internalType: "string", name: "locationCity", type: "string" },
                { internalType: "uint256", name: "areaSqm", type: "uint256" },
                { internalType: "string", name: "NIB_NomorIdentitasBidang", type: "string" },
                { internalType: "bool", name: "isVerified", type: "bool" },
              ],
              internalType: "struct TerraformaLand.LandPlot",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "greeting",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "operator", type: "address" },
          ],
          name: "isApprovedForAll",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "landPlots",
          outputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "string", name: "geoJSONHash", type: "string" },
            { internalType: "string", name: "locationProvince", type: "string" },
            { internalType: "string", name: "locationCity", type: "string" },
            { internalType: "uint256", name: "areaSqm", type: "uint256" },
            { internalType: "string", name: "NIB_NomorIdentitasBidang", type: "string" },
            { internalType: "bool", name: "isVerified", type: "bool" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "string", name: "geoJSONHash", type: "string" },
            { internalType: "string", name: "locationProvince", type: "string" },
            { internalType: "string", name: "locationCity", type: "string" },
            { internalType: "uint256", name: "areaSqm", type: "uint256" },
            { internalType: "string", name: "nib", type: "string" },
          ],
          name: "mintLandCertificate",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
          name: "ownerOf",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "setApprovalForAll",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
          name: "supportsInterface",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
          name: "tokenURI",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "bool", name: "verified", type: "bool" },
          ],
          name: "updateVerificationStatus",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        approve: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        balanceOf: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        getApproved: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        isApprovedForAll: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        name: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        ownerOf: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        safeTransferFrom: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        setApprovalForAll: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        supportsInterface: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        symbol: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        tokenURI: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
        transferFrom: "@openzeppelin/contracts/token/ERC721/ERC721.sol",
      },
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
