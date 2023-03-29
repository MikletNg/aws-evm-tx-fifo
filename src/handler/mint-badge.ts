import { SQSHandler } from "aws-lambda";
import { ethers } from "ethers";
import { mint } from "..";

interface IBody {
	to: string;
	tokenId: string;
}
export const mintBadge: SQSHandler = async (event, context) => {
	for (const record of event.Records) {
		const body: IBody = JSON.parse(record.body);
		if (ethers.utils.isAddress(body.to)) {
			await mint(body.to, body.tokenId);
		}
	}
};
