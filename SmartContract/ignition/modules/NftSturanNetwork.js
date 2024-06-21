const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftSturanNetworkModule", (m) => {
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const campaignAddress = "0x8c8C318cB690F7cb113D5Cda7C4A6Cc11c081847";
  const nftSturanNetwork = m.contract("NftSturanNetwork", [initialOwner, campaignAddress]);
  return { nftSturanNetwork };
});