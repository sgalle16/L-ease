# RentEvo: Decentralized Property Leasing Platform

## Overview

RentEvo pioneers the property leasing industry by leveraging the Ethereum blockchain to offer transparent, secure, and efficient leasing agreements. This decentralized platform simplifies the leasing process for lessors and tenants, ensuring smooth and trustworthy transactions.

## Technology Stack & Tools

- **Frontend**: [Next.js](https://nextjs.org/) - Robust framework for building user-friendly web applications.
- **Smart Contracts**: [Solidity](https://soliditylang.org/) - High-level language for implementing smart contracts on the Ethereum blockchain.
- **Blockchain Interaction**: [Ethers.js](https://docs.ethers.io/v5/) - Comprehensive library for interacting with the Ethereum blockchain.
- **Development Environment**: [Hardhat](https://hardhat.org/) - Ethereum development environment for professionals, written in TypeScript.

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- Alchemy API key for Sepolia network interaction
- Private key from a funded wallet for contracts deployment
- Etherscan API key for contract verification

### Installation and Setup

Clone the repository and install dependencies:

```shell
git clone https://github.com/sgalle16/L-ease.git
cd L-ease
npm install
# or if you prefer yarn
yarn install
```

Set up your environment variables based on `.env.example.`

### Usage

Compile the contracts and run local tests:
```shell
npx hardhat compile
npx hardhat test
```

Start a local development node:
```shell
npx hardhat node
```
Deploy contracts to the desired network:
```shell
# Local
npx hardhat run scripts/deploy.ts --network localhost
# Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

### Project Structure
- `contracts/`: Smart contracts managing property leases.
- `scripts/`:  Scripts for deployment and other interactions.
- `test/`: Automated tests for the smart contracts.
- `frontend/`: Next.js powered frontend for user interaction.
- `hardhat.config.ts`: Configuration for Hardhat setup.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Information
For inquiries, contact the project architect, [Santiago Gallego](mailto:sgalle16@eafit.edu.co)

For more information, visit our [GitHub repository](https://github.com/sgalle16/L-ease).
