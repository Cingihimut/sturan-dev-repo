const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("CrowdfundingModule", (m) => {
  const xtrAddress = "0x086D459A513f10abec41B5839aF688f68EFE0abb";
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const crowdfunding = m.contract("Crowdfunding", [xtrAddress, initialOwner]);
  return { crowdfunding };
});