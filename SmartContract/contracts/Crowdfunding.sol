// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Crowdfunding is Ownable {
    struct Campaign {
        uint256 id;
        string name;
        uint256 goal; //goals campaign
        uint256 maxContribution; //maximum user can contribute using xtr
        uint256 maxContrubutor; //maximum address can contribute
        uint256 duration;
        uint256 startTime;
        uint256 endTime;
        bool isOpen;
        address[] contributors;
        mapping(address => uint) contributions;
    }

    IERC20 private token;
    Campaign[] public campaigns;
    mapping(address => uint256) public contributors;

    event CampaignCreated(
        uint256 indexed id,
        string name,
        uint256 goal,
        uint256 duration
    );
    event ContributionMade(
        uint256 indexed campaignId,
        address contributor,
        uint256 amount
    );
    event CampaignClosed(
        uint256 indexed campaignId,
        string name,
        uint256 amountRaised
    );
    event ContributionRefunded(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256 amount
    );

    constructor(
        address _tokenAddress,
        address initialOwner
    ) payable Ownable(initialOwner) {
        token = IERC20(_tokenAddress);
    }

    function addCampaign(
        string memory name,
        uint256 goal,
        uint256 maxContribution,
        uint256 maxContributor,
        uint256 duration
    ) external onlyOwner {
        uint256 campaignId = campaigns.length;
        campaigns.push();
        Campaign storage newCampaign = campaigns[campaignId];
        newCampaign.id = campaignId;
        newCampaign.name = name;
        newCampaign.goal = goal;
        newCampaign.maxContribution = maxContribution;
        newCampaign.maxContrubutor = maxContributor;
        newCampaign.duration = duration;
        newCampaign.startTime = block.timestamp;
        newCampaign.endTime = block.timestamp + duration;
        newCampaign.isOpen = true;
        emit CampaignCreated(campaignId, name, goal, duration);
    }

    function contribute(uint256 campaignId, uint256 amount) external {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.isOpen, "Campaign is not open");
        require(block.timestamp < campaign.endTime, "Campaign is closed");

        require(
            campaign.contributions[msg.sender] + amount <=
                campaign.maxContribution,
            "Exceeds maximum contribution per contributor"
        );
        require(
            campaign.contributors.length < campaign.maxContrubutor,
            "Exceeds maximum contributors"
        );

        token.transferFrom(msg.sender, address(this), amount);
        campaign.contributions[msg.sender] += amount;

        if (campaign.contributions[msg.sender] == amount) { // new contributor
            campaign.contributors.push(msg.sender);
            contributors[msg.sender] = campaignId + 1;
        }

        emit ContributionMade(campaignId, msg.sender, amount);
    }

    function closeCampaign(uint256 campaignId) external onlyOwner {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.isOpen, "Campaign is already closed");

        campaign.isOpen = false;
        emit CampaignClosed(campaignId, campaign.name, address(this).balance);
    }

    function refund(uint256 campaignId) external {
        Campaign storage campaign = campaigns[campaignId];
        require(!campaign.isOpen, "Campaign is still open");
        require(
            block.timestamp >= campaign.endTime,
            "Campaign is not ended yet"
        );

        uint256 amount = campaign.contributions[msg.sender];
        require(amount > 0, "No contribution to refund");

        campaign.contributions[msg.sender] = 0;
        token.transfer(msg.sender, amount);

        emit ContributionRefunded(campaignId, msg.sender, amount);
    }

    function getCampaignDetails(
        uint256 campaignId
    )
        external
        view
        returns (
            string memory name,
            uint256 goal,
            uint256 maxContribution,
            uint256 maxContributor,
            uint256 duration,
            uint256 startTime,
            uint256 endTime,
            bool isOpen
        )
    {
        Campaign storage campaign = campaigns[campaignId];
        return (
            campaign.name,
            campaign.goal,
            campaign.maxContribution,
            campaign.maxContrubutor,
            campaign.duration,
            campaign.startTime,
            campaign.endTime,
            campaign.isOpen
        );
    }

    function getContributorStatus(
        address contributor
    ) external view returns (bool) {
        return contributors[contributor] != 0;
    }

    function withdrawToken(address to, uint256 amount) external onlyOwner {
        token.transfer(to, amount);
    }

    function getContributors(
        uint256 campaignId
    ) external view returns (address[] memory) {
        return campaigns[campaignId].contributors;
    }
}
