const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("CrowdfundingModule", (m) => {
  const xtrAddress = "0x6F256B3E7650eca65B96f73011beC41638F4253C";
  const initialOwner = "0x0caDDE63e1A3F92d6E754eFb74288810DABFC150";
  const crowdfunding = m.contract("Crowdfunding", [xtrAddress, initialOwner]);
  return { crowdfunding };
});