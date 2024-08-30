const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("XTRSmodule", (m) => {
    const initialOwner = m.getParameter("initialOwner", "0xe1654213b35D4Da60A37d52f9236848693a4911a");

    const xtrs = m.contract("Xtrs", [initialOwner]);

    return { xtrs };
})