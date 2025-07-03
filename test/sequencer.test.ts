import { Sequencer } from '../src/sequencer';
import { ethers } from 'ethers';

describe('Sequencer', () => {
  let provider: ethers.JsonRpcProvider;
  let sequencer: Sequencer;

  beforeEach(() => {
    provider = new ethers.JsonRpcProvider();
    sequencer = new Sequencer(provider);
  });

  it('should instantiate', () => {
    expect(sequencer).toBeDefined();
  });
}); 