import { ethers } from "hardhat"

async function main() {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)

    const ContractFactory = await ethers.getContractFactory("LeaseContract")
    const contract = await ContractFactory.deploy()

    console.log("Contract deployed to:", contract.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
