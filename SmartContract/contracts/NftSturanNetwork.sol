// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./ICrowdfunding.sol";

contract NftSturanNetwork is ERC1155, Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    ICrowdfunding public crowdfundingContract;

    struct NFT {
        uint256 campaignId;
        string name;
        uint256 amount;
        bool exists;
    }

    mapping(uint256 => NFT) public nfts;
    mapping(uint256 => EnumerableSet.AddressSet) private campaignMinters;

    event NFTPosted(uint256 indexed nftId, uint256 indexed campaignId, string name, uint256 amount);

    constructor(address _crowdfundingContract, address initialOwner) Ownable(initialOwner) ERC1155("") {
        crowdfundingContract = ICrowdfunding(_crowdfundingContract);
    }

    function postNFT(uint256 nftId, uint256 campaignId, string memory name, uint256 amount) external onlyOwner {
        require(!nfts[nftId].exists, "NFT already exists");
        
        nfts[nftId] = NFT({
            campaignId: campaignId,
            name: name,
            amount: amount,
            exists: true
        });

        emit NFTPosted(nftId, campaignId, name, amount);
    }

    function mint(uint256 campaignId, uint256 nftId) external {
        require(nfts[nftId].exists, "NFT does not exist");
        require(nfts[nftId].campaignId == campaignId, "NFT not for this campaign");
        
        (bool isContributor, uint256 contributedAmount) = crowdfundingContract.getContributorStatus(msg.sender);
        require(isContributor, "Only contributors can mint");
        require(!campaignMinters[campaignId].contains(msg.sender), "Already minted NFT for this campaign");

        campaignMinters[campaignId].add(msg.sender);
        _mint(msg.sender, nftId, 1, "");
    }
}
