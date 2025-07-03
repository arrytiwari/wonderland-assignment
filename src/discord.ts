import axios from 'axios';

export async function sendDiscordAlert(webhookUrl: string, message: string) {
  await axios.post(webhookUrl, { content: message });
} 