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

- Run smart contract tests with `yarn hardhat:test`
- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`
- Edit your deployment scripts in `packages/hardhat/deploy`
