# TerraForma

TerraForma is an innovative Web3 platform that facilitates the digital process of buying, selling, and transferring land title ownership.

By implementing blockchain technology and decentralized data storage, TerraForma provides a modern solution to minimize the risks of unclear land ownership, land disputes, and document forgery that frequently occur in conventional recording systems.

Built on the **Monad** network, TerraForma offers significantly faster and more scalable transaction speeds compared to other blockchains like Ethereum. Monad's high-performance EVM ensures that every real estate transaction and ownership record can be executed instantly with extremely low gas fees.

## Key Features

- **Land Title Marketplace:** A decentralized peer-to-peer marketplace platform for buying and selling land assets using smart contracts.
- **Transfer of Ownership:** A secure, lightning-fast (powered by Monad), and automated ownership transfer process recorded directly on the blockchain without the need for third-party intermediaries.
- **Ownership History Transparency:** The entire track record of transactions and ownership transfers can be publicly tracked and verified, eliminating any ambiguity regarding land status.
- **Decentralized Storage:** Ensures that legal documents and proof of land ownership are stored securely, minimizing the risk of loss, manipulation, or physical damage.

## Core Technologies

- **Monad Blockchain:** A High-Performance Layer 1 EVM network for super-fast smart contract execution, ideal for real estate transactions that require quick finality.
- **Smart Contracts:** Automatically and *trustlessly* manages transaction logic, escrow, and ownership mutations.
- **Decentralized Data Storage:** Stores metadata and digital copies of land documents in a decentralized manner to ensure they remain *immutable*.
- **Web3 Frontend:** A modern user interface that facilitates seamless user interaction through *crypto wallet* integration.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- [Yarn v2+](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)

## Quickstart & Deployment

To get started with TerraForma locally, follow the steps below:

1. Clone the repository and install dependencies:

```bash
yarn install
```

2. Run a local network in the first terminal:

```bash
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```bash
yarn deploy
```

This command deploys the smart contracts to the local network. The contracts are located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy scripts located in `packages/hardhat/deploy` to deploy the contract to the network. 

4. On a third terminal, start your NextJS app:

```bash
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contracts using the `Debug Contracts` page. You can tweak the app configuration in `packages/nextjs/scaffold.config.ts`.

# SmartContract Address Stored in Monad TestNet
Address: 0x11E0272Ed8f7A882c766f36d48543102dE99ec09

- Run smart contract tests with `yarn hardhat:test`
- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`
- Edit your deployment scripts in `packages/hardhat/deploy`

Smart Contract Source Code:
```Solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title TerraformaLand
 * @dev Core MVP for Terraforma Indonesian Land Registry.
 * Target Chain: Monad Testnet (Chain ID: 10143).
 * Benefit: Monad parallel execution → instant land title verification & high throughput.
 */
contract TerraformaLand is ERC721 {
    uint256 private _nextTokenId;
    string public greeting = "Decentralized Land Registry";

    struct LandPlot {
        uint256 id;
        string geoJSONHash; // IPFS URI metadata
        string locationProvince;
        string locationCity;
        uint256 areaSqm;
        string NIB_NomorIdentitasBidang;
        bool isVerified;
        uint256 priceWei; // Asking price in wei (1 MON = 1e18)
    }

    mapping(address => bool) public admins;
    mapping(uint256 => LandPlot) public landPlots;

    event LandMinted(uint256 indexed tokenId, address indexed owner, string nib);
    event VerificationUpdated(uint256 indexed tokenId, bool isVerified);
    event PriceUpdated(uint256 indexed tokenId, uint256 priceWei);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not admin");
        _;
    }

    constructor() ERC721("TerraformaLand", "TLND") {
        admins[msg.sender] = true;
    }

    /**
     * @dev Mint new land certificate with an asking price.
     * priceWei is in wei (frontend converts MON → wei with parseEther).
     * Monad async execution → UI will see tx in 3 blocks (~3s).
     */
    function mintLandCertificate(
        address owner,
        string memory geoJSONHash,
        string memory locationProvince,
        string memory locationCity,
        uint256 areaSqm,
        string memory nib,
        uint256 priceWei
    ) public onlyAdmin returns (uint256) {
        uint256 tokenId = ++_nextTokenId;

        landPlots[tokenId] = LandPlot({
            id: tokenId,
            geoJSONHash: geoJSONHash,
            locationProvince: locationProvince,
            locationCity: locationCity,
            areaSqm: areaSqm,
            NIB_NomorIdentitasBidang: nib,
            isVerified: false,
            priceWei: priceWei
        });

        _safeMint(owner, tokenId);

        emit LandMinted(tokenId, owner, nib);
        return tokenId;
    }

    function updateVerificationStatus(uint256 id, bool verified) public onlyAdmin {
        require(_ownerOf(id) != address(0), "Land not exist");
        landPlots[id].isVerified = verified;
        emit VerificationUpdated(id, verified);
    }

    /**
     * @dev Update the asking price for a land parcel. Admin only.
     */
    function updatePrice(uint256 id, uint256 priceWei) public onlyAdmin {
        require(_ownerOf(id) != address(0), "Land not exist");
        landPlots[id].priceWei = priceWei;
        emit PriceUpdated(id, priceWei);
    }

    function getLandPlotDetails(uint256 id) public view returns (LandPlot memory) {
        require(_ownerOf(id) != address(0), "Land not exist");
        return landPlots[id];
    }
}
```
