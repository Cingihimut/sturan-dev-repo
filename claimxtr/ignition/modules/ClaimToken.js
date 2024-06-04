const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ClaimTokenModule", (m) => {
  const xtrAddrees = "0x5F9E185CF5Fadc4b5F9a600Bd40178cd545e3A63";
  const claimXtr = m.contract("ClaimToken", [xtrAddrees]);
  return { claimXtr };
});
