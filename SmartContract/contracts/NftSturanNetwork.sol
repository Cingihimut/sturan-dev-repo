// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Crowdfunding.sol";

contract NftSturanNetwork is ERC1155, Ownable {
    uint256 public constant SILVERTIER = 1;
    uint256 public constant GOLDTIER = 2;

    address private crowdfundingContract;

    constructor(address initialOwner, address _crowdfundingAddress) ERC1155("https://lime-big-coral-533.mypinata.cloud/ipfs/{id}.json") Ownable(initialOwner){
        crowdfundingContract = _crowdfundingAddress;
        _mint(msg.sender, SILVERTIER, 200, "");
        _mint(msg.sender, GOLDTIER, 1000, "");
    }

    function canMint(address account) public view returns (bool) {
        Crowdfunding crowdfunding = Crowdfunding(crowdfundingContract);
        (bool isContributor, ) = crowdfunding.getContributorStatus(account);
        return isContributor;
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        require(canMint(account), "User cannot mint without funding first");
        _mint(account, id, amount, data);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}
