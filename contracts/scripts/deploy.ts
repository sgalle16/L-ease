import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { sendDataFront } from "../utils/sendDataFront";

dotenv.config();

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const LeaseContract = await ethers.getContractFactory("LeaseContract");

    const tenant =
        process.env.TEST_ADDR_TENANT ||
        "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const rentAmount = ethers.parseEther("1");
    const securityDeposit = ethers.parseEther("1");
    const leaseStart = Math.floor(Date.now() / 1000);
    const leaseEnd = leaseStart + 30 * 24 * 60 * 60;
    const propertyAddress = "123 Main St";

    const leaseContract = await LeaseContract.deploy(
        tenant,
        rentAmount,
        securityDeposit,
        leaseStart,
        leaseEnd,
        propertyAddress
    );

    await leaseContract.waitForDeployment();

    console.log("Lease Contract deployed to:", leaseContract.target);

    // Send data to frontend with the lease contract deployed
    sendDataFront(leaseContract.target as string);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
