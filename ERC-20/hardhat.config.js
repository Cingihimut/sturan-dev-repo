require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const infura_api_key = process.env.INFURA_API_KEY;
const private_key = process.env.PRIVATE_KEY;
const mnemonic = process.env.MNEMONIC;
const etherscan_api_key = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infura_api_key}`,
      accounts: [private_key],
    },
    etherscan: {
      url: `https://api.etherscan.io/api?apikey=${etherscan_api_key}`
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  ignition: {
    initialowner: "0xe1654213b35D4Da60A37d52f9236848693a4911a"
  },
};