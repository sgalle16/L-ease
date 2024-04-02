import { ethers } from "hardhat";
import { expect } from "chai";
import { LeaseContract } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("LeaseContract", function () {
    let leaseContract: LeaseContract;
    let lessor: SignerWithAddress;
    let tenant: SignerWithAddress;
    let accounts: SignerWithAddress[];
    const rentAmount = ethers.parseEther("1"); // 1 ether
    const securityDeposit = ethers.parseEther("1"); // 1 ether
    const leaseStart = Math.floor(Date.now() / 1000); // current timestamp
    const leaseEnd = leaseStart + 30 * 24 * 60 * 60; // plus 30 days

    beforeEach(async () => {
        // Get the list of accounts to work with
        accounts = await ethers.getSigners();
        lessor = accounts[0];
        tenant = accounts[1];

        // Deploy the contract
        const LeaseContract = await ethers.getContractFactory("LeaseContract");
        leaseContract = await LeaseContract.deploy(
            tenant.address,
            rentAmount,
            securityDeposit,
            leaseStart,
            leaseEnd,
            "123 Main St"
        );
        await leaseContract.waitForDeployment();
        expect(await leaseContract.state()).to.equal(0);
    });

    describe("Deployment", function () {
        it("Should set the right lessor", async function () {
            expect(await leaseContract.lessor()).to.equal(lessor.address);
        });

        it("Should set the right tenant", async function () {
            expect(await leaseContract.tenant()).to.equal(tenant.address);
        });

        // More tests related to initial deployment values...
    });

    describe("Lease agreement", function () {
        it("Should allow the tenant to sign and activate the lease", async function () {
            await leaseContract.connect(tenant).signAndActivateLease();
            expect(await leaseContract.state()).to.equal(2); // 2 corresponds to Active
        });

        it("Should fail if someone other than the tenant tries to sign the lease", async function () {
            await expect(
                leaseContract.connect(accounts[2]).signAndActivateLease()
            ).to.be.revertedWith("Only the tenant can perform this action");
        });

        // More tests for lease activation...
    });

    describe("Payments", function () {
        beforeEach(async function () {
            // The tenant signs the lease before making payments
            await leaseContract.connect(tenant).signAndActivateLease();
        });

        it("Should allow the tenant to pay rent", async function () {
            const tx = await leaseContract
                .connect(tenant)
                .payRent({ value: rentAmount });
            await expect(() => tx).to.changeEtherBalance(lessor, rentAmount);
            await expect(tx)
                .to.emit(leaseContract, "RentPaid")
                .withArgs(tenant.address, rentAmount);
            const payment = await leaseContract.payments(0);
            expect(payment.amount).to.equal(rentAmount);
            expect(payment.timestamp).to.be.at.least(leaseStart);
        });

        it("Should not allow non-tenant to pay rent", async function () {
            await expect(
                leaseContract
                    .connect(accounts[2])
                    .payRent({ value: rentAmount })
            ).to.be.revertedWith("Only the tenant can perform this action");
        });

        // More tests for rent payment failure cases...
    });

    describe("Termination", function () {
        beforeEach(async function () {
            // Lease must be active before it can be terminated
            await leaseContract.connect(tenant).signAndActivateLease();
        });

        it("Should allow the lessor to terminate the lease", async function () {
            await leaseContract.connect(lessor).terminateLease();
            expect(await leaseContract.state()).to.equal(3); // 3 corresponds to Terminated
        });

        it("Should emit an event when the lease is terminated", async function () {
            await expect(leaseContract.connect(lessor).terminateLease())
                .to.emit(leaseContract, "LeaseTerminated")
                .withArgs(lessor.address);
        });

        // More tests for lease termination...
    });

    // Additional tests to cover other functions and scenarios...
});
