// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICrowdfunding.sol";

contract NftSturanNetwork is ERC1155, Ownable {
    ICrowdfunding public crowdfundingContract;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => bool) public campaignNftMinted;
    mapping(uint256 => mapping(address => bool)) public hasClaimed;

    constructor(address initialOwner, address _crowdfundingContract) Ownable(initialOwner) ERC1155("") {
        crowdfundingContract = ICrowdfunding(_crowdfundingContract);
    }

    function mint(address account, uint256 id, uint256 amount, string memory _uri, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
        _setTokenURI(id, _uri);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, string[] memory uris, bytes memory data) public onlyOwner {
        require(ids.length == uris.length && ids.length == amounts.length, "NftSturanNetwork: IDs, amounts, and URIs length mismatch");
        _mintBatch(to, ids, amounts, data);
        for (uint256 i = 0; i < ids.length; i++) {
            _setTokenURI(ids[i], uris[i]);
        }
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal virtual {
        _tokenURIs[tokenId] = tokenURI;
    }

    function mintNftForCampaign(uint256 campaignId, string memory _uri, bytes memory data) public onlyOwner {
        require(!campaignNftMinted[campaignId], "NftSturanNetwork: NFT already minted for this campaign");

        (, , , , , , , bool isOpen, address[] memory contributors, ) = crowdfundingContract.getCampaignDetails(campaignId);
        require(!isOpen, "NftSturanNetwork: Campaign is still open");

        for (uint256 i = 0; i < contributors.length; i++) {
            _mint(contributors[i], campaignId, 1, data);
            hasClaimed[campaignId][contributors[i]] = true;
        }

        _setTokenURI(campaignId, _uri);
        campaignNftMinted[campaignId] = true;
    }

    function claimNft(uint256 campaignId) public {
        require(campaignNftMinted[campaignId], "NftSturanNetwork: NFT not minted for this campaign");
        require(!hasClaimed[campaignId][msg.sender], "NftSturanNetwork: NFT already claimed");

        (, , , , , , , bool isOpen, address[] memory contributors, ) = crowdfundingContract.getCampaignDetails(campaignId);
        require(!isOpen, "NftSturanNetwork: Campaign is still open");

        bool isContributor = false;
        for (uint256 i = 0; i < contributors.length; i++) {
            if (contributors[i] == msg.sender) {
                isContributor = true;
                break;
            }
        }
        require(isContributor, "NftSturanNetwork: Not a contributor to this campaign");

        _mint(msg.sender, campaignId, 1, "");
        hasClaimed[campaignId][msg.sender] = true;
    }
}
