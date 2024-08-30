import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
const config: HardhatUserConfig = {
    solidity: "0.8.24",
    networks: {
        sepolia: {
            url: "https://gateway.tenderly.co/public/sepolia",
            chainId: 11155111,
            accounts: [process.env.PRIVATE_KEY!],
        },
        move: {
            url: "https://mevm.devnet.imola.movementnetwork.xyz",
            chainId: 30732,
            accounts: [process.env.PRIVATE_KEY!],
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;
