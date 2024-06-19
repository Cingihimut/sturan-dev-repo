const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftSturanNetworkModule", (m) => {
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const campaignAddress = "0xe09Fc0959BC9bB314F36612907D9645773B80369";
  const nftSturanNetwork = m.contract("NftSturanNetwork", [initialOwner, campaignAddress]);
  return { nftSturanNetwork };
});
