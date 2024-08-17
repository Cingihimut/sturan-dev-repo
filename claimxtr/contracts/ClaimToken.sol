// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ClaimToken is ReentrancyGuard {
    IERC20 public usdcsToken;
    address public owner;
    uint256 public constant MAX_CLAIM_AMOUNT = 200 * 10 ** 18;
    mapping(address => bool) public hasClaimed;
    address[] public claimers;
    uint256 public claimFee = 0.00009 ether;

    event Claim(address indexed claimers, uint256 amount, uint256 fee);

    constructor(address _usdcsTokenAddress) payable {
        usdcsToken = IERC20(_usdcsTokenAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner address can perform this function");
        _;
    }

    function claimXTR() external payable nonReentrant {
        require(!hasClaimed[msg.sender], "You have already claimed XTR Token");
        require(usdcsToken.balanceOf(address(this)) >= MAX_CLAIM_AMOUNT, "Insufficient XTR tokens available for claim");
        require(msg.value >= claimFee, "Insufficient fee provided");

        hasClaimed[msg.sender] = true;
        claimers.push(msg.sender);
        usdcsToken.transfer(msg.sender, MAX_CLAIM_AMOUNT);
        emit Claim(msg.sender, MAX_CLAIM_AMOUNT, claimFee);

        payable(owner).transfer(claimFee);
    }

    function transferXTRContract(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Transfer must be greater than 0");
        require(usdcsToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
    }

    function updateClaimFee(uint256 _newFee) external onlyOwner {
        claimFee = _newFee;
    }

    receive() external payable {}

    fallback() external payable {}
}