// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title Lease Contract Property
 * @dev Implements a rental agreement and leasing operations with blockchain
 */

contract LeaseContract {
    // State variables to store addresses of lessor and tenant
    address payable public lessor;
    address public tenant;

    // Lease agreement details
    string public propertyAddress;
    uint256 public rentAmount;
    uint256 public securityDeposit;
    uint256 public leaseStartTimeStamp;
    uint256 public leaseEndTimeStamp;

    // Contract states
    enum ContractState {
        Created,
        Signed,
        Active,
        Terminated
    }
    ContractState public state;

    // Events
    // Event to be emitted when the lease is activated
    event LeaseActivated(address indexed tenant);
    // Event to be emitted when the lease is signed
    event LeaseSigned(
        address indexed tenant,
        uint256 leaseStartTimeStamp,
        uint256 leaseEndTimeStamp
    );
    // Event to be emitted when the lease is terminated
    event LeaseTerminated(address indexed tenant);
    // Event to be emitted when rent is paid
    event RentPaid(address indexed tenant, uint256 amount);

    // Modifier to ensure that only the tenant can call certain functions
    modifier onlyTenant() {
        require(
            msg.sender == tenant,
            "Only the tenant can perform this action"
        );
        _;
    }
    // Modifier to check if the caller is the lessor
    modifier isLessor() {
        require(msg.sender == lessor, "Caller is not the lessor");
        _;
    }

    // Modifier to check if the contract is in the expected state
    modifier inState(ContractState _state) {
        require(state == _state, "Invalid contract state");
        _;
    }

    // Sstruct to manage rent payments
    struct Payment {
        uint256 amount;
        uint256 timestamp;
    }

    // Array to store all the rent payments
    Payment[] public payments;

    /**
     * @dev Constructor for the LeaseContract. Sets the initial lessor, tenant,
     * and terms of the lease.
     */
    constructor(
        address _tenant,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _leaseStart,
        uint256 _leaseEnd,
        string memory _propertyAddress
    ) {
        lessor = payable(msg.sender); // The lessor is the contract deployer
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        leaseStartTimeStamp = _leaseStart;
        leaseEndTimeStamp = _leaseEnd;
        propertyAddress = _propertyAddress;
        state = ContractState.Created;
    }

    /**
     * @dev Contract Functions
     */

    // Tenant signs and activates the lease agreement
    function signAndActivateLease()
        public
        onlyTenant
        inState(ContractState.Created)
    {
        state = ContractState.Active;
        emit LeaseSigned(tenant, leaseStartTimeStamp, leaseEndTimeStamp);
        emit LeaseActivated(tenant);
    }

    // Tenant pays rent and stores the payment details
    function payRent()
        external
        payable
        onlyTenant
        inState(ContractState.Active)
    {
        require(msg.value == rentAmount, "Incorrect rent amount");
        // Transfer the rent to the lessor
        payments.push(
            Payment({ amount: msg.value, timestamp: block.timestamp })
        );
        (bool success, ) = lessor.call{ value: msg.value }("");
        require(success, "Payment failed");
        emit RentPaid(tenant, msg.value);
    }

    // Terminate the lease
    function terminateLease() external inState(ContractState.Active) isLessor {
        state = ContractState.Terminated;
        emit LeaseTerminated(lessor);

        // Optionally handle the security deposit return logic here
    }

    // Utility function to check if the lease term has ended
    function isLeaseExpired() public view returns (bool) {
        return block.timestamp > leaseEndTimeStamp;
    }

    // Add more functions as needed...
}
