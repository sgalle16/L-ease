import contractData from "../artifacts/contracts/LeaseContract.sol/LeaseContract.json";
import fs from "fs";
import path from "path";

function sendDataFront(contractAddress: string): void {
    try {
        console.log("Sending data to frontend...");

        const contractName = contractData.contractName;
        const abi = contractData.abi;
        const bytecode = contractData.bytecode;
        const dataContract = {
            [contractName]: contractAddress,
        };

        const constantsDir = path.resolve(
            __dirname,
            "../../frontend/constants"
        );

        // Check if the directory exists, if not create it
        if (!fs.existsSync(constantsDir)) {
            fs.mkdirSync(constantsDir, { recursive: true });
        }

        // Write the data contract in file json format
        fs.writeFileSync(
            path.join(constantsDir, "abi.json"),
            JSON.stringify({ [contractName]: abi }, null, 4)
        );
        fs.writeFileSync(
            path.join(constantsDir, "bytecode.json"),
            JSON.stringify({ [contractName]: bytecode }, null, 4)
        );
        fs.writeFileSync(
            path.join(constantsDir, "contractAddress.json"),
            JSON.stringify(dataContract, null, 4)
        );

        console.log("Contract data saved to frontend!");
    } catch (error) {
        console.error("Error saving contract data:", error);
        throw error;
    }
}

export { sendDataFront };
