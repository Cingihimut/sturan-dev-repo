const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftSturanNetworkModule", (m) => {
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const campaignAddress = "0x3851db51a7566A574800B38700d7600C27EfEF97";
  const nftSturanNetwork = m.contract("NftSturanNetwork", [initialOwner, campaignAddress]);
  return { nftSturanNetwork };
});