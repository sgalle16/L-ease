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
    const propertyAddress = "123 Main St";

    beforeEach(async () => {
        // Get the list of accounts to work with
        accounts = await ethers.getSigners();
        lessor = accounts[0];
        tenant = accounts[1];

        // Deploy the contract
        const LeaseContract = await ethers.getContractFactory("LeaseContract");
        leaseContract = await LeaseContract.deploy();
        await leaseContract.waitForDeployment();

        // Create a lease for testing
        await leaseContract.createLease(
            tenant.address,
            rentAmount,
            securityDeposit,
            leaseStart,
            leaseEnd,
            propertyAddress
        );

        expect(await leaseContract.leaseCounter()).to.equal(1);
    });

    describe("Deployment", function () {
        it("Should set the right lessor and tenant", async function () {
            const leaseDetails = await leaseContract.getLeaseDetails(1);
            expect(leaseDetails.lessor).to.equal(lessor.address);
            expect(leaseDetails.tenant).to.equal(tenant.address);
        });

        // More tests related to initial deployment values...
    });

    describe("Lease agreement", function () {
        it("Should allow the tenant to sign and activate the lease", async function () {
            await leaseContract.connect(tenant).signAndActivateLease(1);
            const leaseDetails = await leaseContract.getLeaseDetails(1);
            expect(leaseDetails.state).to.equal(2); // 2 corresponds to Active
        });

        it("Should fail if someone other than the tenant tries to sign the lease", async function () {
            await expect(
                leaseContract.connect(accounts[2]).signAndActivateLease(1)
            ).to.be.revertedWith("Only the tenant can perform this action");
        });

        // More tests for lease activation...
    });

    describe("Creating Lease", function () {
        it("Should create a new lease with correct details", async function () {
            const lease = await leaseContract.getLeaseDetails(1);
            expect(lease.lessor).to.equal(lessor.address);
            expect(lease.tenant).to.equal(tenant.address);
            expect(lease.rentAmount).to.equal(rentAmount);
            expect(lease.securityDeposit).to.equal(securityDeposit);
            expect(lease.leaseStartTimeStamp).to.equal(leaseStart);
            expect(lease.leaseEndTimeStamp).to.equal(leaseEnd);
            expect(lease.state).to.equal(0); // ContractState.Created
        });

        it("Should emit LeaseCreated event", async function () {
            await expect(
                leaseContract.createLease(
                    tenant.address,
                    rentAmount,
                    securityDeposit,
                    leaseStart,
                    leaseEnd,
                    "456 Another St"
                )
            )
                .to.emit(leaseContract, "LeaseCreated")
                .withArgs(2, lessor.address, tenant.address);
        });
    });

    describe("Signing and Activating Lease", function () {
        it("Should allow the tenant to sign and activate the lease", async function () {
            await leaseContract.createLease(
                tenant.address,
                rentAmount,
                securityDeposit,
                leaseStart,
                leaseEnd,
                propertyAddress
            );
            await leaseContract.connect(tenant).signAndActivateLease(1);
            const lease = await leaseContract.getLeaseDetails(1);
            expect(lease.state).to.equal(2); // ContractState.Active (Active state)
        });

        it("Should emit LeaseSigned and LeaseActivated events", async function () {
            await leaseContract.connect(tenant).signAndActivateLease(1);
            await expect(leaseContract.connect(tenant).signAndActivateLease(1))
                .to.emit(leaseContract, "LeaseSigned")
                .withArgs(1, tenant.address, leaseStart, leaseEnd);
            // Ensure the lease is signed before checking activation
            await expect(leaseContract.connect(tenant).signAndActivateLease(1))
                .to.emit(leaseContract, "LeaseActivated")
                .withArgs(1, tenant.address);
        });

        it("Should fail if someone other than the tenant tries to sign the lease", async function () {
            await expect(
                leaseContract.connect(accounts[2]).signAndActivateLease(0)
            ).to.be.revertedWith("Only the tenant can perform this action");
        });

        it("Should emit LeaseActivated event", async function () {
            await expect(leaseContract.connect(tenant).signAndActivateLease(1))
                .to.emit(leaseContract, "LeaseActivated")
                .withArgs(1, tenant.address);
        });

        it("Should revert if trying to sign a non-created lease", async function () {
            await expect(
                leaseContract.connect(tenant).signAndActivateLease(2)
            ).to.be.revertedWith("Only the tenant can perform this action");
        });
    });

    describe("Payments", function () {
        beforeEach(async function () {
            // The tenant signs the lease before making payments
            await leaseContract.connect(tenant).signAndActivateLease(1);
        });

        it("Should allow the tenant to pay rent", async function () {
            const tx = await leaseContract
                .connect(tenant)
                .payRent(1, { value: rentAmount });
            await expect(() => tx).to.changeEtherBalance(lessor, rentAmount);
            await expect(tx)
                .to.emit(leaseContract, "RentPaid")
                .withArgs(1, tenant.address, rentAmount);
        });

        it("Should emit RentPaid event on rent payment", async function () {
            await expect(
                leaseContract.connect(tenant).payRent(1, { value: rentAmount })
            )
                .to.emit(leaseContract, "RentPaid")
                .withArgs(1, tenant.address, rentAmount);
        });

        it("Should not allow non-tenant to pay rent", async function () {
            await expect(
                leaseContract
                    .connect(accounts[2])
                    .payRent(1, { value: rentAmount })
            ).to.be.revertedWith("Only the tenant can perform this action");
        });

        // More tests for rent payment cases...
    });

    describe("Termination", function () {
        beforeEach(async function () {
            // Lease must be active before it can be terminated
            await leaseContract.connect(tenant).signAndActivateLease(1);
        });

        it("Should allow the lessor to terminate the lease", async function () {
            await leaseContract.connect(lessor).terminateLease(1);
            const lease = await leaseContract.leases(1);
            expect(lease.state).to.equal(3); // ContractState.Terminated (3 corresponds to Terminated)
        });

        it("Should emit LeaseTerminated event on lease termination", async function () {
            await expect(leaseContract.connect(lessor).terminateLease(1))
                .to.emit(leaseContract, "LeaseTerminated")
                .withArgs(1, tenant.address);
        });

        it("Should revert if trying to terminate a non-active lease", async function () {
            await leaseContract.connect(lessor).terminateLease(1); // First termination
            await expect(
                leaseContract.connect(lessor).terminateLease(1)
            ).to.be.revertedWith("Invalid contract state");
        });
    });

    describe("Utility Functions", function () {
        it("Should correctly identify if the lease is expired", async function () {
            expect(await leaseContract.isLeaseExpired(1)).to.be.false;

            // Fast-forward time to after the lease end time
            await ethers.provider.send("evm_increaseTime", [30 * 24 * 60 * 60]);
            await ethers.provider.send("evm_mine", []);
            expect(await leaseContract.isLeaseExpired(1)).to.be.true;
        });

        it("Should return correct lease details", async function () {
            const lease = await leaseContract.getLeaseDetails(1);
            expect(lease.lessor).to.equal(lessor.address);
            expect(lease.tenant).to.equal(tenant.address);
            expect(lease.propertyAddress).to.equal("123 Main St");
            expect(lease.rentAmount).to.equal(rentAmount);
            expect(lease.securityDeposit).to.equal(securityDeposit);
            expect(lease.leaseStartTimeStamp).to.equal(leaseStart);
            expect(lease.leaseEndTimeStamp).to.equal(leaseEnd);
            expect(lease.state).to.equal(0); // ContractState.Created
        });

        // More tests for lease termination...
    });

    // Additional tests to cover other functions and scenarios...
});
