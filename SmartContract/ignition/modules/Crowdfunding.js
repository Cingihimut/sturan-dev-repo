const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("CrowdfundingModule", (m) => {
  const xtrAddress = "0x6F256B3E7650eca65B96f73011beC41638F4253C";
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const crowdfunding = m.contract("Crowdfunding", [xtrAddress, initialOwner]);
  return { crowdfunding };
});