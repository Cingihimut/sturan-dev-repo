const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("DeltaVenturesFundModule", (m) => {
  const xtrAddress = "0x086D459A513f10abec41B5839aF688f68EFE0abb";
  const DeltaVenturesFund = m.contract("DeltaVenturesFund", [xtrAddress]);
  return { DeltaVenturesFund };
});