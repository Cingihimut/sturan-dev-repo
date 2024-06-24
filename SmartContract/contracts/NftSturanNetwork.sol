// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICrowdfunding.sol";

contract NftSturanNetwork is ERC1155, Ownable {
    ICrowdfunding private crowdfunding;

    mapping(uint256 => mapping(address => bool)) public hasClaimed;

    mapping(uint256 => string) private tokenURIs;

    constructor(
        address _crowdfundingAddress,
        address initialOwner
    ) payable Ownable(initialOwner) ERC1155("") {
        crowdfunding = ICrowdfunding(_crowdfundingAddress);
    }

    function claimNft(uint256 campaignId, uint256 amount) external {
        bool hasClaimedMemory = hasClaimed[campaignId][msg.sender];

        require(!hasClaimedMemory, "Already claimed");

        (bool hasContributed, ) = crowdfunding.getContributorStatus(msg.sender);
        require(hasContributed, "Address has not contributed");
        hasClaimedMemory = true;
        hasClaimed[campaignId][msg.sender] = hasClaimedMemory;

        _mint(msg.sender, campaignId, amount, "");
    }

    function mintToOwner(
        uint256 campaignId,
        uint256 amount,
        bytes memory data,
        string memory _uri
    ) external payable onlyOwner {
        _mint(msg.sender, campaignId, amount, data);
        _setTokenURI(campaignId, _uri);
    }

    function _setTokenURI(uint256 tokenId, string memory _uri) internal {
        tokenURIs[tokenId] = _uri;
        emit URI(_uri, tokenId);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        string memory tokenUri = tokenURIs[tokenId];
        return bytes(tokenUri).length > 0 ? tokenUri : super.uri(tokenId);
    }

    function setUri(string memory newuri) external payable onlyOwner {
        _setURI(newuri);
    }
}
