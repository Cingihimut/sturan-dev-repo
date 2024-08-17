const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ClaimTokenModule", (m) => {
  const usdcsAddress = "0xbC65E83Fa8D5A482B637f80cc4edc294ad8B5c75";

  const claimXtr = m.contract("ClaimToken", [usdcsAddress]);
  return { claimXtr };
});