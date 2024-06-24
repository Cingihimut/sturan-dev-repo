const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ClaimTokenModule", (m) => {
  const xtrAddress = "0x6F256B3E7650eca65B96f73011beC41638F4253C";

  const claimXtr = m.contract("ClaimToken", [xtrAddress]);
  return { claimXtr };
});