import { ethers } from 'ethers';

const IJOB_ABI = [
  'function workable(bytes32 network) view returns (bool, bytes)'
];

export class Job {
  private contract: ethers.Contract;

  constructor(address: string, provider: ethers.Provider) {
    this.contract = new ethers.Contract(address, IJOB_ABI, provider);
  }

  async workable(network: string): Promise<[boolean, string]> {
    return await this.contract.workable(network);
  }
} 