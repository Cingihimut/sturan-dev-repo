const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("InvestorContract", (m) => {
  const initialOwner = "0x0caDDE63e1A3F92d6E754eFb74288810DABFC150";
  const campaignAddress = "0x080140434c2a4198F73bEA2829347521340e31cf";
  const investorContract = m.contract("InvestorContract", [initialOwner, campaignAddress]);
  return { investorContract };
});