const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("XtrModule", (m) => {
    const initialOwner = m.getParameter("initialOwner", "0x0caDDE63e1A3F92d6E754eFb74288810DABFC150");

    const xtr = m.contract("Xtr", [initialOwner]);

    return { xtr };
})