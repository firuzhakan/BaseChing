import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  BASE_RPC_URL = 'https://mainnet.base.org',
  BASE_SEPOLIA_RPC_URL = 'https://sepolia.base.org',
  DEPLOYER_PRIVATE_KEY,
  BASESCAN_API_KEY = '',
} = process.env;

const accounts = DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: { enabled: true, runs: 1_000_000 },
      viaIR: true,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  networks: {
    base: {
      url: BASE_RPC_URL,
      chainId: 8453,
      accounts,
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      chainId: 84532,
      accounts,
    },
  },
  etherscan: {
    apiKey: {
      base: BASESCAN_API_KEY,
      baseSepolia: BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: 'base',
        chainId: 8453,
        urls: {
          apiURL: 'https://api.basescan.org/api',
          browserURL: 'https://basescan.org',
        },
      },
      {
        network: 'baseSepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org',
        },
      },
    ],
  },
};

export default config;
