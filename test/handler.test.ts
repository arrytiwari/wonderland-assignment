import * as discord from '../src/discord';
import * as sequencerModule from '../src/sequencer';
import * as jobModule from '../src/job';
import { handler } from '../src/index';

jest.spyOn(discord, 'sendDiscordAlert').mockResolvedValue(undefined);

describe('handler', () => {
  it('sends alert if any job is workable', async () => {
    // Mock Sequencer to return 1 job
    jest.spyOn(sequencerModule, 'Sequencer').mockImplementation(() => ({
      numJobs: async () => 1,
      jobAt: async (i: number) => '0xJobAddress',
      getMaster: async () => '0xNetwork'
    }) as any);

    // Mock Job to return workable = true
    jest.spyOn(jobModule, 'Job').mockImplementation(() => ({
      workable: async (network: string) => [true, '0xargs']
    }) as any);

    // Run the handler
    await handler();

    // Check that Discord alert was sent
    expect(discord.sendDiscordAlert).toHaveBeenCalled();
  });
}); 