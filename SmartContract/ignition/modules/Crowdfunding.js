const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("CrowdfundingModule", (m) => {
  const usdcsAddress = "0xbC65E83Fa8D5A482B637f80cc4edc294ad8B5c75";
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const crowdfunding = m.contract("Crowdfunding", [usdcsAddress, initialOwner]);
  return { crowdfunding };
});