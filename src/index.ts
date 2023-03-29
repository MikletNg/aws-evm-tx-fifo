import { ContractTransaction, ethers } from "ethers";
import { AWSCommunityBuildersBadge__factory } from "../contracts/typechain-types/factories/contracts/AwsCommunityBuildersBadge.sol/AWSCommunityBuildersBadge__factory";
import { SecretsManager } from "@aws-sdk/client-secrets-manager";

const getPrivateKey = async (): Promise<string> => {
	const client = new SecretsManager({ region: process.env.AWS_REGION });
	const response = await client.getSecretValue({ SecretId: process.env.PRIVATE_KEY_SECRET_NAME });
	if (!response.SecretString) throw new Error("Private key is not set");
	return response.SecretString;
};

export const mint = async (to: string, tokenId: string): Promise<ContractTransaction> => {
	if (!process.env.CONTRACT_ADDRESS) throw new Error("Contract address is not defined");
	if (!process.env.RPC_ENDPOINT) throw new Error("RPC endpoint is not defined");
	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT);
	const signer = new ethers.Wallet(await getPrivateKey(), provider);
	const contract = AWSCommunityBuildersBadge__factory.connect(process.env.CONTRACT_ADDRESS, signer);
	const tx = await contract.safeMint(to, tokenId);
	await tx.wait();
	return tx;
};
