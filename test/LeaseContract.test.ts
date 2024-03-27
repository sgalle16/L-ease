import { ethers } from "hardhat"
import { expect } from "chai"

describe("LeaseContract", function () {
    it("Should deploy the contract", async function () {
        const ContractFactory = await ethers.getContractFactory("LeaseContract")
        const contract = await ContractFactory.deploy()

        console.log(contract)

        expect(contract.address).to.exist
    })

    // Add more tests here...
})
