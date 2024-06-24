const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftSturanNetworkModule", (m) => {
  const initialOwner = "0x0caDDE63e1A3F92d6E754eFb74288810DABFC150";
  const campaignAddress = "0x6fe9Eac96fdFCE9Bb73A2fB4D9b8744ce7018EAE";
  const nftSturanNetwork = m.contract("NftSturanNetwork", [initialOwner, campaignAddress]);
  return { nftSturanNetwork };
});