const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("CrowdfundingModule", (m) => {
  const xtrAddress = "0x5F9E185CF5Fadc4b5F9a600Bd40178cd545e3A63";
  const crowdfunding = m.contract("Crowdfunding", [xtrAddress]);
  return { crowdfunding };
});
