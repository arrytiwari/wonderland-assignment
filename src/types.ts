export interface JobStatus {
  address: string;
  lastWorkedBlock: number;
  isUnworked: boolean;
}

export interface Config {
  ethRpcUrl: string;
  discordWebhookUrl: string;
} 