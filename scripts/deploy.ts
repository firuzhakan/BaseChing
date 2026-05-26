import { ethers, network } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log(`\nDeploying BaseChing to network: ${network.name}`);
  console.log(`Deployer:  ${deployer.address}`);
  console.log(`Balance:   ${ethers.formatEther(balance)} ETH\n`);

  const Factory = await ethers.getContractFactory('BaseChing');
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`✓ BaseChing deployed at: ${address}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Add to .env.local:  NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log(`  2. (Optional) verify:  npx hardhat verify --network ${network.name} ${address}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
