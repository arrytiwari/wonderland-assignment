import 'dotenv/config';
import { ethers } from 'ethers';
import { getConfig } from './env';
import { Sequencer } from './sequencer';
import { Job } from './job';
import { sendDiscordAlert } from './discord';

export const handler = async () => {
  console.log('Lambda started');
  // --- TEST ONLY: Force a Discord alert to verify webhook integration ---
  // const { discordWebhookUrl } = getConfig();
  // await sendDiscordAlert(discordWebhookUrl, '✅ Test alert from Lambda! (You can remove this after testing)');
  // --- END TEST ---

  try {
    const { ethRpcUrl, discordWebhookUrl } = getConfig();
    const provider = new ethers.JsonRpcProvider(ethRpcUrl);
    const sequencer = new Sequencer(provider);
    const numJobs = await sequencer.numJobs();
    console.log('Number of jobs:', numJobs);
    const network = await sequencer.getMaster();
    console.log('Current network (bytes32):', network);
    const workableJobs: string[] = [];

    for (let i = 0; i < numJobs; i++) {
      const jobAddress = await sequencer.jobAt(i);
      console.log(`Checking job ${i}: ${jobAddress}`);
      const job = new Job(jobAddress, provider);
      try {
        const [canWork, args] = await job.workable(network);
        console.log(`  workable: ${canWork}, args: ${args}`);
        if (canWork) {
          workableJobs.push(jobAddress);
        }
      } catch (err) {
        console.error(`Error checking job at ${jobAddress}:`, err);
      }
    }

    console.log('Workable jobs:', workableJobs);
    if (workableJobs.length > 0) {
      const msg = `⚠️ MakerDAO: The following jobs are workable for network ${network} (should be worked!):\n${workableJobs.join('\n')}`;
      await sendDiscordAlert(discordWebhookUrl, msg);
      console.log('Discord alert sent.');
    } else {
      console.log('No workable jobs found.');
    }

    console.log('Lambda finished');
    return { statusCode: 200, body: 'OK' };
  } catch (err: any) {
    console.error('Error in Lambda handler:', err);
    return { statusCode: 500, body: err.message || 'Internal error' };
  }
};

// For local testing with `npm start`
if (require.main === module) {
  handler();
} 