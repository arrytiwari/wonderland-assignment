import { Config } from './types';

export function getConfig(): Config {
  const ethRpcUrl = process.env.ETH_RPC_URL;
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!ethRpcUrl) throw new Error('ETH_RPC_URL is not set');
  if (!discordWebhookUrl) throw new Error('DISCORD_WEBHOOK_URL is not set');
  return { ethRpcUrl, discordWebhookUrl };
} 