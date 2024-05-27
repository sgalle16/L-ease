// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Lease Contract Property
 * @dev Implements a rental agreement and leasing operations with blockchain
 */

contract LeaseContract {
    // Struct for Lease agreement
    struct Lease {
        address payable lessor;
        address tenant;
        string propertyAddress;
        uint256 rentAmount;
        uint256 securityDeposit;
        uint256 leaseStartTimeStamp;
        uint256 leaseEndTimeStamp;
        ContractState state;
        Payment[] payments;
    }

    // Contract states
    enum ContractState {
        Created,
        Signed,
        Active,
        Terminated
    }

    // Struct to manage rent payments
    struct Payment {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => Lease) public leases;
    uint256 public leaseCounter;

    // Events to be emitted when the lease counter is updated or changed
    event LeaseCreated(
        uint256 indexed leaseId,
        address indexed lessor,
        address indexed tenant
    );
    event LeaseActivated(uint256 indexed leaseId, address indexed tenant);
    event LeaseSigned(
        uint256 indexed leaseId,
        address indexed tenant,
        uint256 leaseStartTimeStamp,
        uint256 leaseEndTimeStamp
    );
    event LeaseTerminated(uint256 indexed leaseId, address indexed tenant);
    event RentPaid(
        uint256 indexed leaseId,
        address indexed tenant,
        uint256 amount
    );

    // Modifier to ensure that only the tenant can call certain functions
    modifier onlyTenant(uint256 _leaseId) {
        require(
            msg.sender == leases[_leaseId].tenant,
            "Only the tenant can perform this action"
        );
        _;
    }

    // Modifier to check if the caller is the lessor
    modifier isLessor(uint256 _leaseId) {
        require(
            msg.sender == leases[_leaseId].lessor,
            "Caller is not the lessor"
        );
        _;
    }

    // Modifier to check if the contract is in the expected state
    modifier inState(uint256 _leaseId, ContractState _state) {
        require(leases[_leaseId].state == _state, "Invalid contract state");
        _;
    }

    /**
     * @dev Contract Functions
     */

    // Create a new contract function
    function createLease(
        address _tenant,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _leaseStart,
        uint256 _leaseEnd,
        string memory _propertyAddress
    ) public {
        leaseCounter++;
        Lease storage newLease = leases[leaseCounter];
        newLease.lessor = payable(msg.sender);
        newLease.tenant = _tenant;
        newLease.propertyAddress = _propertyAddress;
        newLease.rentAmount = _rentAmount;
        newLease.securityDeposit = _securityDeposit;
        newLease.leaseStartTimeStamp = _leaseStart;
        newLease.leaseEndTimeStamp = _leaseEnd;
        newLease.state = ContractState.Created;
        emit LeaseCreated(leaseCounter, msg.sender, _tenant);
    }

    // Tenant signs and activates the lease agreement
    function signAndActivateLease(
        uint256 _leaseId
    ) public onlyTenant(_leaseId) {
        Lease storage lease = leases[_leaseId];
        lease.state = ContractState.Active;
        emit LeaseSigned(
            _leaseId,
            lease.tenant,
            lease.leaseStartTimeStamp,
            lease.leaseEndTimeStamp
        );
        emit LeaseActivated(_leaseId, lease.tenant);
    }

    // Tenant pays rent and stores the payment details
    function payRent(
        uint256 _leaseId
    )
        external
        payable
        onlyTenant(_leaseId)
        inState(_leaseId, ContractState.Active)
    {
        Lease storage lease = leases[_leaseId];
        require(msg.value == lease.rentAmount, "Incorrect rent amount");
        lease.payments.push(
            Payment({ amount: msg.value, timestamp: block.timestamp })
        );
        (bool success, ) = lease.lessor.call{ value: msg.value }("");
        require(success, "Payment failed");
        emit RentPaid(_leaseId, lease.tenant, msg.value);
    }

    // Terminate the lease
    function terminateLease(
        uint256 _leaseId
    ) public isLessor(_leaseId) inState(_leaseId, ContractState.Active) {
        Lease storage lease = leases[_leaseId];
        lease.state = ContractState.Terminated;
        emit LeaseTerminated(_leaseId, lease.tenant);
        // Optionally handle the security deposit return logic here ..
    }

    // Utility function to check if the lease term has ended
    function isLeaseExpired(uint256 _leaseId) public view returns (bool) {
        return block.timestamp > leases[_leaseId].leaseEndTimeStamp;
    }

    // Function to get lease details
    function getLeaseDetails(
        uint256 leaseId
    )
        public
        view
        returns (
            address lessor,
            address tenant,
            string memory propertyAddress,
            uint256 rentAmount,
            uint256 securityDeposit,
            uint256 leaseStartTimeStamp,
            uint256 leaseEndTimeStamp,
            ContractState state
        )
    {
        Lease storage lease = leases[leaseId];
        return (
            lease.lessor,
            lease.tenant,
            lease.propertyAddress,
            lease.rentAmount,
            lease.securityDeposit,
            lease.leaseStartTimeStamp,
            lease.leaseEndTimeStamp,
            lease.state
        );
    }

    // Add more functions as needed...
}
