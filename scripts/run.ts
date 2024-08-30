import { hashMessage, ContractFactory, Wallet, JsonRpcProvider, Contract } from "ethers";
const metadata = require("../artifacts/contracts/ecc.sol/EccContract.json");
import "dotenv/config";
async function main() {
    // const url = "https://ethereum-sepolia.rpc.subquery.network/public";
    const url = "https://mevm.devnet.imola.movementnetwork.xyz";
    const provider = new JsonRpcProvider(url);
    const signer = new Wallet(process.env.PRIVATE_KEY!!, provider);
    console.log("Signer address:", signer.address);
    const factory = new ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract: any = await factory.deploy();
    await contract.waitForDeployment();
    console.log("Contract address:", contract.target);
    // const contract = new Contract("0x6ca79644c3282015a1341afa8153aed950b71621", metadata.abi, signer);
    const message = "Hello World";
    const hashMsg = hashMessage(message);
    console.log("Hashed message:", hashMsg);
    const signature = await signer.signMessage(message);
    console.log("signature message:", signature);
    const recoverAddress = await contract.recover(hashMsg, signature);
    console.log("recover address:", recoverAddress);
    if (recoverAddress !== signer.address) {
        throw new Error("Invalid signature");
    }
    let counter = await contract.counter();
    console.log("before Counter:", counter);
    let tx = await contract.increment(hashMsg, signature);
    await tx.wait();
    counter = await contract.counter();
    console.log("after Counter:", counter);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
