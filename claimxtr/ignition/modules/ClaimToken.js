const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ClaimTokenModule", (m) => {
  const xtrAddrees = "0x086D459A513f10abec41B5839aF688f68EFE0abb";
  const claimXtr = m.contract("ClaimToken", [xtrAddrees]);
  return { claimXtr };
});
