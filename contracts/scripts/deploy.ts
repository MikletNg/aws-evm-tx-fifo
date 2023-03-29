import { ethers, upgrades } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("AWSCommunityBuildersBadge");
  const contract = await upgrades.deployProxy(Factory, { kind: "uups" });
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
