import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('BaseChing', () => {
  it('emits a DivinationCast event with 6-bit lines', async () => {
    const [seeker] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory('BaseChing');
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    const qHash = ethers.keccak256(ethers.toUtf8Bytes('Will the rains come?'));
    const tx = await contract.cast(qHash);
    const receipt = await tx.wait();

    const log = receipt!.logs.find((l) => {
      try {
        return contract.interface.parseLog(l as any)?.name === 'DivinationCast';
      } catch {
        return false;
      }
    });
    expect(log, 'DivinationCast event was emitted').to.not.be.undefined;

    const parsed = contract.interface.parseLog(log as any);
    expect(parsed!.args.seeker).to.equal(seeker.address);
    expect(parsed!.args.questionHash).to.equal(qHash);
    expect(Number(parsed!.args.lines)).to.be.within(0, 63);
    expect(parsed!.args.castId).to.equal(1n);
  });

  it('increments per-seeker cast count', async () => {
    const [seeker] = await ethers.getSigners();
    const contract = await (await ethers.getContractFactory('BaseChing')).deploy();
    await contract.waitForDeployment();

    await contract.cast(ethers.ZeroHash);
    await contract.cast(ethers.ZeroHash);
    expect(await contract.castsBy(seeker.address)).to.equal(2n);
    expect(await contract.totalCasts()).to.equal(2n);
  });
});
