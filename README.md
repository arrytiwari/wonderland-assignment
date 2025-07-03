# MakerDAO Workable Alert Lambda

This AWS Lambda function monitors MakerDAO jobs and sends a Discord alert if any job hasn't been worked for the past 10 consecutive blocks.

## Features

* Runs every 5 minutes (configurable via AWS EventBridge)
* Checks all jobs in the MakerDAO Sequencer contract
* Alerts via Discord webhook if a job is unworked for 10 blocks
* Modular codebase designed for easy maintenance and extension
* Efficient implementation optimized for the current MakerDAO **Sequencer** and **IJob** interfaces:

  * No redundant or excessive RPC calls
  * Only essential contract interactions are performed to minimize network load and latency

---

## Setup

### 1. AWS Lambda

* Deploy the code as a Lambda function (Node.js 18.x runtime)
* Set environment variables:

  * `ETH_RPC_URL`: Your Ethereum node RPC URL (Infura, Alchemy, etc.)
  * `DISCORD_WEBHOOK_URL`: Your Discord webhook URL
* Set up a CloudWatch EventBridge rule to trigger the Lambda every 5 minutes
* *(Recommended)* Use AWS Secrets Manager or Parameter Store for secrets

### 2. Discord Webhook

* Go to your Discord server → Channel settings → Integrations → Webhooks → New Webhook
* Copy the webhook URL and set it as `DISCORD_WEBHOOK_URL`

### 3. Environment Variables

* `ETH_RPC_URL`: Ethereum RPC endpoint
* `DISCORD_WEBHOOK_URL`: Discord webhook endpoint

---

## Running Locally

1. **Set up your `.env` file** in the project root:

   ```env
   ETH_RPC_URL=your-ethereum-rpc-url
   DISCORD_WEBHOOK_URL=your-discord-webhook-url
   ```
2. **Install dependencies:**

   ```sh
   npm install
   ```
3. **Run the function locally:**

   * Uncomment the following lines in your code to enable local testing:

   ```js
   // For local testing with `npm start`
   // if (require.main === module) {
   //   handler();
   // }
   ```

   * Then run:

   ```sh
   npm start
   ```

   * Output and logs will appear in your terminal.
   * Alerts will be sent to your Discord if any jobs are workable.

---

## Running on AWS Lambda

1. **Build your project:**

   ```sh
   npm run build
   ```
2. **Create a deployment package:**

   ```sh
   zip -r lambda.zip dist node_modules package.json
   ```
3. **Upload to AWS Lambda:**

   * Go to your Lambda function in the AWS Console.
   * Upload the `lambda.zip` file.
   * Set the handler to `dist/index.handler`.
4. **Set environment variables in Lambda:**

   * In the Lambda console, go to **Configuration → Environment variables**.
   * Add:

     * `ETH_RPC_URL`
     * `DISCORD_WEBHOOK_URL`
5. **Set up a schedule (EventBridge) to run every 5 minutes.**
6. **Monitor logs in AWS CloudWatch.**
7. *(Optional)* Use the **Test** button in the AWS Console to manually invoke the Lambda.

---

## Testing

```sh
npm test
```

* Jest will run all unit tests in the `test/` directory.
* Tests cover:

  * Discord alerting
  * Sequencer contract interaction
  * Handler alert logic
* Includes a mock job in `handler.test.ts` for testing alerts.

---

## Project Structure

* `src/` – Lambda handler and modules
* `test/` – Unit tests
* Codebase is fully modular and designed for future adaptability.
* The implementation focuses on efficiency, with no unnecessary or repetitive Ethereum RPC calls, ensuring optimal performance on the current MakerDAO **Sequencer** and **IJob** interfaces.

---

## References

* [Sequencer Contract](https://etherscan.io/address/0x238b4E35dAed6100C6162fAE4510261f88996EC9#code)
* [IJob Interface](https://github.com/makerdao/dss-cron/blob/master/src/interfaces/IJob.sol)

