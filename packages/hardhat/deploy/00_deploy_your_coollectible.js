// deploy/00_deploy_your_contract.js

const { ethers, run } = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // Deploy contract
  const deployResult = await deploy("YourCollectible", {
    from: deployer,
    log: true,
    // args: ["Hello", ethers.utils.parseEther("1.5")], // Add args if needed
  });

  console.log(`✅ Deployed YourCollectible to ${deployResult.address}`);

  // Get signer for the deployer
  const signer = await ethers.getSigner(deployer);

  // Get contract instance with signer
  const yourCollectible = await ethers.getContractAt(
    "YourCollectible",
    deployResult.address,
    signer
  );

  // Optional: Verify contract on Etherscan if not on local chain
  if (chainId !== "31337") {
    try {
      console.log("🔍 Verifying contract on Etherscan...");
      await sleep(3000); // Give time for propagation
      await run("verify:verify", {
        address: deployResult.address,
        contract: "contracts/YourCollectible.sol:YourCollectible",
        // constructorArguments: [], // Add if needed
      });
    } catch (err) {
      console.log("⚠️ Contract verification failed:", err.message);
    }
  }
};

module.exports.tags = ["YourCollectible"];
