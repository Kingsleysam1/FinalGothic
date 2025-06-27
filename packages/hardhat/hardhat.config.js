require("dotenv").config();
const fs = require("fs");
const { utils } = require("ethers");
const { PRIVATE_KEY } = process.env;

// Plugin imports
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("@tenderly/hardhat-tenderly");

// Constants
const mainnetGwei = 115;
const defaultNetwork = "localhost";

// Helper to load mnemonic from file
function loadMnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch {
    return "";
  }
}

// Validate PRIVATE_KEY
if (!PRIVATE_KEY) {
  console.warn("⚠️  WARNING: PRIVATE_KEY not set in .env. Live network deploys may fail.");
}

// Export config
module.exports = {
  defaultNetwork,

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      chainId : 11155111,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
      gasPrice: mainnetGwei * 1e9,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    polygon: {
      url: "https://polygon-rpc.com",
      gasPrice: 1000000000,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      gasPrice: 1000000000,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    xdai: {
      url: "https://rpc.xdaichain.com",
      gasPrice: 1000000000,
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },

  tenderly: {
    username: process.env.TENDERLY_USERNAME || "",
    project: process.env.TENDERLY_PROJECT || "",
    privateVerification: false,
  },
};
