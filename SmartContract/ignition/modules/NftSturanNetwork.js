const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NftSturanNetworkModule", (m) => {
  const initialOwner = "0xe1654213b35D4Da60A37d52f9236848693a4911a";
  const campaignAddress = "0x492b1E061bBaD5236fDA26d6f7075Bf83A180e51";
  const nftSturanNetwork = m.contract("NftSturanNetwork", [initialOwner, campaignAddress]);
  return { nftSturanNetwork };
});