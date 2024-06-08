// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Crowdfunding {
    string public name = "Aloa Games";
    uint256 public goal = 25000 * 10 ** 18;
    uint256 public constant MAX_CONTRIBUTION = 300 * 10 ** 18;

    IERC20 private token;

    uint256 public totalFunds;
    bool public isGoalReached;
    bool public isClosed;
    mapping(address => uint256) public contributions;
    address[] private contributorsList;

    event Funded(address indexed user, uint256 amount);
    event Refunded(address indexed user, uint256 amount);
    event GoalReached();
    event CrowdfundingClosed();

    constructor(address _tokenAddress) payable {
        token = IERC20(_tokenAddress);
    }

    modifier onlyWhileOpen() {
        require(!isClosed, "Crowdfunding is closed");
        _;
    }

    function fund(uint256 amount) external onlyWhileOpen {
        require(amount > 0, "Amount must be greater than 0");
        require(
            token.balanceOf(msg.sender) >= amount,
            "Insufficient token balance"
        );
        require(
            amount <= MAX_CONTRIBUTION,
            "Contributor exceeds the maximum limit"
        );

        if (contributions[msg.sender] == 0) {
            contributorsList.push(msg.sender);
        }

        contributions[msg.sender] += amount;
        totalFunds += amount;

        token.transferFrom(msg.sender, address(this), amount);
        emit Funded(msg.sender, amount);

        if (totalFunds >= goal && !isGoalReached) {
            isGoalReached = true;
            emit GoalReached();
        }
    }

    function closeCrowdfunding() external onlyWhileOpen {
        isClosed = true;
        emit CrowdfundingClosed();
    }

    function refund() external onlyWhileOpen {
        require(!isGoalReached, "Goal has been reached");

        uint256 contribution = contributions[msg.sender];
        require(
            contribution > 0,
            "You have not contributed to this crowdfunding"
        );

        contributions[msg.sender] = 0;
        totalFunds -= contribution;

        token.transfer(msg.sender, contribution);
        emit Refunded(msg.sender, contribution);
    }

    function getDetails()
        external
        view
        returns (string memory, uint256, uint256, bool, bool)
    {
        return (name, goal, totalFunds, isGoalReached, isClosed);
    }

    function getContributors()
        external
        view
        returns (address[] memory, uint256[] memory)
    {
        address[] memory contributorsAddresses = new address[](
            contributorsList.length
        );
        uint256[] memory contributionsAmounts = new uint256[](
            contributorsList.length
        );

        uint256 index = 0;
        for (uint256 i = 0; i < contributorsList.length; i++) {
            address contributor = contributorsList[i];
            uint256 contribution = contributions[contributor];
            if (contribution > 0) {
                contributorsAddresses[index] = contributor;
                contributionsAmounts[index] = contribution;
                index++;
            }
        }

        return (contributorsAddresses, contributionsAmounts);
    }
}
