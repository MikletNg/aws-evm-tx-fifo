import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import path = require("path");
import * as lambda from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import * as secretsManager from "aws-cdk-lib/aws-secretsmanager";

export class AwsEvmTxFifoStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const privateKeySecret = new secretsManager.Secret(this, "PrivateKeySecret");

		const mintBadgeFifoQueue = new sqs.Queue(this, "MintBadgeFifoQueue", {
			visibilityTimeout: cdk.Duration.seconds(300),
			fifo: true,
			contentBasedDeduplication: true,
		});

		const mintBadgeHandler = new nodejs.NodejsFunction(this, "MintBadgeHandler", {
			entry: path.join(process.cwd(), "src/handler/mint-badge.ts"),
			handler: "mintBadge",
			runtime: lambda.Runtime.NODEJS_18_X,
			timeout: cdk.Duration.seconds(300),
			memorySize: 128,
			awsSdkConnectionReuse: true,
			environment: {
				PRIVATE_KEY_SECRET_NAME: privateKeySecret.secretName,
				RPC_ENDPOINT: "https://rpc.ankr.com/eth_goerli",
				CONTRACT_ADDRESS: "0x64b66b63e3aC82D4f4551F2DF3f8432Ee67171bB",
			},
		});
		privateKeySecret.grantRead(mintBadgeHandler);

		mintBadgeHandler.addEventSource(new SqsEventSource(mintBadgeFifoQueue));
	}
}
