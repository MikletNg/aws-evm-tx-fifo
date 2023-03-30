# AWS EVM-based Blockchain Batch Transaction Handler

[Click me for more information about this repository](https://dev.to/aws-builders/how-to-send-large-batch-transaction-to-evm-based-blockchain-network-using-aws-serverless-service-2akn)

## Setup

1. Install dependencies

   ```bash
   npm install # Install CDK dependencies
   cd contracts && npm install # Install hardhat dependencies
   ```

2. Deploy Smart Contract

   ```bash
   cd contracts
   cp .env.example .env # Copy environment variables example to the real one
   vim .env # Edit the environment variables
   npx cdk deploy # Deploy the contract to Goerli and remember to copy the address
   ```

3. Update the smart contract address in the CDK file
4. Deploy the CDK stack

   ```bash
    npx cdk deploy
   ```

5. Update the private key in secrets manager
6. Test the large batch minting process

   ```bash
    npx ts-node src/put-message.ts
   ```
