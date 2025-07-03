import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sendDiscordAlert } from '../src/discord';

describe('sendDiscordAlert', () => {
  it('should post to Discord webhook', async () => {
    const mock = new MockAdapter(axios);
    const url = 'https://discord.com/api/webhooks/test';
    mock.onPost(url).reply(204);
    await expect(sendDiscordAlert(url, 'test message')).resolves.toBeUndefined();
    mock.restore();
  });
}); 