import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { sendDataFront } from "../utils/sendDataFront";

dotenv.config();

async function deployContract() {
    try {
        const LeaseContract = await ethers.getContractFactory("LeaseContract");
        const leaseContract = await LeaseContract.deploy();
        await leaseContract.waitForDeployment();
        console.log("Lease Contract deployed to:", leaseContract.target);
        return leaseContract;
    } catch (error) {
        console.error("Error deploying contract:", error);
        throw error;
    }
}

async function main() {
    try {
        const leaseContract = await deployContract();
        // Send data to frontend with the lease contract deployed
        sendDataFront(leaseContract.target as string);
        console.log("Contract deployment completed successfully.");
    } catch (error) {
        console.error("Unhandled error:", error);
        process.exitCode = 1;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
