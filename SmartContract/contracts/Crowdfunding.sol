// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./InvestorContract.sol";

contract Crowdfunding is Ownable {
    using SafeERC20 for IERC20;

    IERC20 private token;
    Campaign[] public campaigns;
    mapping(uint256 => address) public investorContracts;

    struct Campaign {
        uint256 id;
        string name;
        uint256 goal;
        uint256 maxContribution;
        uint256 maxContributor;
        uint256 duration;
        uint256 startTime;
        uint256 endTime;
        bool isOpen;
        address[] contributors;
        mapping(address => uint256) contributions;
    }

    event CampaignCreated(uint256 indexed campaignId, string name, uint256 goal, uint256 duration);
    event ContributionMade(uint256 indexed campaignId, address indexed contributor, uint256 amount);
    event CampaignClosed(uint256 indexed campaignId, string name, uint256 totalRaised);

    constructor(address _tokenAddress, address initialOwner) Ownable(initialOwner) {
        token = IERC20(_tokenAddress);
        transferOwnership(msg.sender);
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
        newCampaign.maxContributor = maxContributor;
        newCampaign.duration = duration;
        newCampaign.startTime = block.timestamp;
        newCampaign.endTime = block.timestamp + duration;
        newCampaign.isOpen = true;
        emit CampaignCreated(campaignId, name, goal, duration);
    }

    function contribute(uint256 campaignId, uint256 amount) external {
        Campaign storage campaign = campaigns[campaignId];
        require(
            campaign.isOpen && block.timestamp < campaign.endTime,
            "Campaign is not available"
        );
        require(
            campaign.contributions[msg.sender] + amount <=
                campaign.maxContribution,
            "Exceeds max contribution"
        );
        require(
            campaign.contributors.length < campaign.maxContributor ||
            campaign.contributions[msg.sender] > 0,
            "Max contributors reached"
        );

        if (campaign.contributions[msg.sender] == 0) {
            campaign.contributors.push(msg.sender);
        }

        campaign.contributions[msg.sender] += amount;
        token.safeTransferFrom(msg.sender, address(this), amount);

        // Create Investor Contract for this contribution
        InvestorContract investorContract = new InvestorContract(
            msg.sender,
            amount,
            campaignId,
            address(token)
        );
        investorContracts[campaignId] = address(investorContract);

        emit ContributionMade(campaignId, msg.sender, amount);
    }

    function closeCampaign(uint256 campaignId) external onlyOwner {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.isOpen, "Campaign is already closed");

        campaign.isOpen = false;
        uint256 totalRaised = token.balanceOf(address(this));

        // Distribute dividends to the Investor Contract holders
        if (totalRaised >= campaign.goal) {
            address investorContractAddress = investorContracts[campaignId];
            InvestorContract investorContract = InvestorContract(investorContractAddress);
            investorContract.distributeDividends(totalRaised);
        } else {
            // Refund contributions if the goal was not met
            for (uint256 i = 0; i < campaign.contributors.length; i++) {
                address contributor = campaign.contributors[i];
                uint256 contribution = campaign.contributions[contributor];
                token.safeTransfer(contributor, contribution);
            }
        }

        emit CampaignClosed(campaignId, campaign.name, totalRaised);
    }

    function getInvestorContract(uint256 campaignId) external view returns (address) {
        return investorContracts[campaignId];
    }
}
