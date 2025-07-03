import { ethers } from 'ethers';

const SEQUENCER_ADDRESS = '0x238b4E35dAed6100C6162fAE4510261f88996EC9';
const SEQUENCER_ABI = [
  'function numJobs() view returns (uint256)',
  'function jobAt(uint256) view returns (address)',
  'function getMaster() view returns (bytes32)'
];

export class Sequencer {
  private contract: ethers.Contract;

  constructor(provider: ethers.Provider) {
    this.contract = new ethers.Contract(SEQUENCER_ADDRESS, SEQUENCER_ABI, provider);
  }

  async numJobs(): Promise<number> {
    return Number(await this.contract.numJobs());
  }

  async jobAt(index: number): Promise<string> {
    return await this.contract.jobAt(index);
  }

  async getMaster(): Promise<string> {
    return await this.contract.getMaster();
  }
} 