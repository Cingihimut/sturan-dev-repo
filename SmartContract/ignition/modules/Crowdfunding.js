const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("CrowdfundingModule", (m) => {
  const usdcsAddress = "0x57c58d1869e9c354683C2477759402ba7Cb99043";
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const crowdfunding = m.contract("Crowdfunding", [usdcsAddress, initialOwner]);
  return { crowdfunding };
});