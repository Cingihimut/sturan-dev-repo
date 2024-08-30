const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Xtr", function() {
  let Xtr;
  let xtr;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function() {
    Xtr = await ethers.getContractFactory("Xtr");
    [owner, addr1, addr2, ...addr3] = await ethers.getSigners()

    xtr = await Xtr.deploy(owner.address);
  });

  describe("Deployment", function(){
    it('Should set the right owner', async function(){
      expect(await xtr.owner()).to.equal(owner.address);
    });

    it('Should assign the total supply of tokens to the owner', async() => {
      const ownerBalance = await xtr.balanceOf(owner.address);
      expect(await xtr.totalSupply()).to.equal(ownerBalance);
    });
    
    it('Should pause and unpause the contract', async() => {
      await xtr.pause();
      expect(await xtr.paused()).to.equal(true);

      await xtr.unpause();
      expect(await xtr.paused()).to.equal(false)
    });

    describe('Burnable', () => {
      it('Should burn the token from owner', async() => {
        const initialBalance = await xtr.balanceOf(owner.address);
        await xtr.burn(10000);
        const finalBalance = await xtr.balanceOf(owner.address);
        expect(finalBalance).to.equal(initialBalance - BigInt(10000));
      });
    });

    describe('Tranfer ownership',() => {
      it('Should transfer ownership contract', async() => {
        await xtr.transferOwnership(addr1.address);
        expect(await xtr.owner()).to.equal(addr1.address);
      });
    });
  })
});