import { SQS } from "@aws-sdk/client-sqs";
import _ = require("lodash");

const main = async () => {
	const client = new SQS({ region: "us-east-1" });
	for (const i of _.range(1, 10)) {
		await client.sendMessage({
			QueueUrl: "https://sqs.us-east-1.amazonaws.com/163703054402/AwsEvmTxFifoStack-MintBadgeFifoQueue7D96C43E-frH82ixMzOst.fifo",
			MessageGroupId: "mint-badge",
			MessageBody: JSON.stringify({ to: "0xCD58F85e6Ec23733143599Fe0f982fC1d3f6C12c", tokenId: `${i}` }),
		});
	}
};

main();
