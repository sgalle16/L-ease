# RentEvo: Decentralized Property Leasing Platform

<div id="top"></div>

## Overview

RentEvo pioneers the property leasing industry by leveraging the Ethereum blockchain to offer transparent, secure, and efficient leasing agreements. This decentralized platform simplifies the leasing process for lessors and tenants, ensuring smooth and trustworthy transactions.

## Technology Stack & Tools

- **Frontend**: [Next.js](https://nextjs.org/) - Robust framework for building user-friendly web applications.
- **Smart Contracts**: [Solidity](https://soliditylang.org/) - High-level language for implementing smart contracts on the Ethereum blockchain.
- **Blockchain Interaction**: [Ethers.js](https://docs.ethers.io/v5/) - Comprehensive library for interacting with the Ethereum blockchain.
- **Development Environment**: [Hardhat](https://hardhat.org/) - Ethereum development environment for professionals, written in TypeScript.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- **Ethereum dApp Development**: [Wagmi](https://wagmi.sh/) - A set of tools and hooks for building Ethereum dApps, facilitating interactions with the blockchain and smart contracts.
- **Wallet Management and Authentication**: [RainbowKit](https://www.rainbowkit.com/) - Provides a seamless wallet connection experience across different Ethereum-based applications.

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
yarn install
```

### Environment Configuration
Set up your environment variables based on .env.example
Create a `.env` file with the same contents of `.env.example` and replace the placeholders with your actual environment variables.

> Warning: DO NOT PUSH YOUR PRIVATE_KEY TO GITHUB

## Working with Workspaces
This project uses Yarn Workspaces to manage multiple packages such as `frontend` and `contracts`workspaces among others. Here is how you can interact with individual workspaces:

**General Commands:**
- To install dependencies across all workspaces:
```shell
yarn install
```
- To run a script in a specific workspace:
```shell
yarn workspace <workspace-name> <script>
```

### Usage
**Smart Contracts:**
To compile smart contracts
```shell
yarn workspace contracts compile
```
**Frontend:**
To start the frontend development server
```shell
yarn workspace frontend dev
```

Or Navigate to each workspace to perform specific tasks:

### Smart Contracts

- Navigate to the `contracts` workspace to compile and test smart contracts:

```shell
cd contracts
yarn install
yarn compile
yarn test
```

### Frontend
- Navigate to the `frontend` workspace to start the development server:
```shell
cd frontend
yarn install
yarn dev
```

## Project Structure
- `contracts/`:  Contains all smart contracts and deployment scripts. See the specific README in the contracts directory for detailed instructions on compiling and deploying contracts.
- `frontend/`: Contains the user interface built with Next.js. Navigate to the frontend directory and see its README for instructions on starting the development server and other tasks.

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request with your enhancements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Information & Credits
For inquiries, contact:
- Project Architect: [Santiago Gallego](mailto:sgalle16@eafit.edu.co)
- Lead UI/UX Developer: [Juan Miguel Castro](mailto:jmcastrom@eafit.edu.co)

<p align="right">(<a href="#top">back to top</a>)</p>
