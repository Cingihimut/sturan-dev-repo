// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ICrowdfunding.sol";

contract SturanNetworkNfts is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {

    uint256 public allowListPrice = 0.001 ether;

    ICrowdfunding public crowdfundingContract;

    mapping(uint256 => bool) public campaignEnded;
    mapping(uint256 => mapping(address => bool)) public hasMinted;

    constructor(address initialOwner, address _crowdfundingContract)
        ERC1155("https://lime-big-coral-533.mypinata.cloud/ipfs/QmPBnXiEbzWjFrhpojHHpUn2jSVxqvtjWnNVB9M74cCqiK/")
        Ownable(initialOwner)
    {
        crowdfundingContract = ICrowdfunding(_crowdfundingContract);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function endCampaign(uint256 campaignId) public onlyOwner {
        require(!campaignEnded[campaignId], "Campaign already ended");
        (, , , , , , , bool isOpen, , ) = crowdfundingContract.getCampaignDetails(campaignId);
        require(isOpen == false, "Campaign is still open");

        campaignEnded[campaignId] = true;
    }

    function mint(uint256 id, uint256 amount) public onlyOwner payable {
        require(id <= 3, "Invalid NFT ID");
        require(msg.value == allowListPrice * amount);
        _mint(msg.sender, id, amount, "");
    }

    function allowListMint(uint256 campaignId) public payable {
        (bool isContributor, ) = crowdfundingContract.getContributorStatus(msg.sender);
        require(isContributor, "Only contributors can be added to the allow list");
        require(!hasMinted[campaignId][msg.sender], "You have already claimed for this campaign");

        hasMinted[campaignId][msg.sender] = false;
    }

    function claimNFT(uint256 campaignId, uint256 id) public payable {
        require(campaignEnded[campaignId], "Campaign not ended yet");
        require(!hasMinted[campaignId][msg.sender], "You have already claimed for this campaign");

        (bool isContributor, ) = crowdfundingContract.getContributorStatus(msg.sender);
        require(isContributor, "Only contributors can claim NFT");
        require(id == campaignId, "NFT ID must match campaign ID");

        hasMinted[campaignId][msg.sender] = true;
        _mint(msg.sender, id, 1, "");
    }

    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }

    function uri(uint256 _id) public view virtual override returns (string memory) {
        require(exists(_id), "URI nonexistent token");
        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id), ".jpeg"));
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
