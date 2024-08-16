// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract InvestorContract {
    using SafeERC20 for IERC20;

    address public owner;
    uint256 public contribution;
    uint256 public campaignId;
    IERC20 private token;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event DividendsDistributed(uint256 totalAmount, uint256 dividend);
    event TokensDeposited(address indexed from, uint256 amount);
    event TokensWithdrawn(address indexed to, uint256 amount);

    constructor(address _owner, uint256 _contribution, uint256 _campaignId, address _tokenAddress) {
        owner = _owner;
        contribution = _contribution;
        campaignId = _campaignId;
        token = IERC20(_tokenAddress);
    }

    function distributeDividends(uint256 totalRaised) external {
        // Distribute dividends logic based on contribution
        uint256 dividend = (totalRaised * contribution) / totalRaised;
        token.safeTransfer(owner, dividend);
        emit DividendsDistributed(totalRaised, dividend);
    }

    // Transfer ownership of the contract to a new owner
    function transferOwnership(address newOwner) external {
        require(msg.sender == owner, "Only the owner can transfer ownership");
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // Deposit tokens to the contract
    function depositTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit TokensDeposited(msg.sender, amount);
    }

    // Owner can withdraw all tokens from the contract
    function withdrawTokens() external {
        require(msg.sender == owner, "Only the owner can withdraw tokens");
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        token.safeTransfer(owner, balance);
        emit TokensWithdrawn(owner, balance);
    }
}
