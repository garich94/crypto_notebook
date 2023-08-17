import hre, { ethers } from "hardhat";
async function main() {
  // const [deployer] = await ethers.getSigners();

  // console.log("Deploying contracts with the account:", deployer.address);

  // const ContractFactory = await ethers.getContractFactory("ContactFactory");
  // const contactFactory = await ContractFactory.deploy();

  // await contactFactory.waitForDeployment();

  // console.log("ContactFactory deployed to:", contactFactory.target);

  const addr = "0xC83C0f5C16e274E257F5F0bB1A2e4EA743D466f5";
  await hre.run("verify:verify", {
    address: addr,
  });
}

main()
  .then(() => console.log("running"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
