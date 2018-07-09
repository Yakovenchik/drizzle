const TutorialToken = artifacts.require("TutorialToken");

contract('TutorialToken test', async (accounts) => {
  describe("balance of", () => {
    it("should put 12000 TutorialToken in the first account", async () => {
       let token = await TutorialToken.deployed();
       let balance = await token.balanceOf(accounts[0]);
       assert.equal(balance.valueOf(), 12000);
    });
    it("should put 0 TutorialToken in the another accounts", async () => {
       let token = await TutorialToken.deployed();
       let balance1 = await token.balanceOf(accounts[1]);
       let balance2 = await token.balanceOf(accounts[2]);
       assert.equal(balance1, 0);
       assert.equal(balance2, 0);
    });
  });
  describe("transfer to another account", () => {
    it("should send tokens when enough on balance", async () => {
      let token = await TutorialToken.deployed();
      const amount = 2000;
      let account_one_starting_balance = await token.balanceOf(accounts[0]);
      let account_two_starting_balance = await token.balanceOf(accounts[1]);
      await token.transfer(accounts[1], amount, {from: accounts[0]});
      let account_one_ending_balance = await token.balanceOf(accounts[0]);
      let account_two_ending_balance = await token.balanceOf(accounts[1]);
      assert.equal(account_one_ending_balance.toNumber(), account_one_starting_balance.toNumber() - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance.toNumber(), account_two_starting_balance.toNumber() + amount, "Amount wasn't correctly sent to the receiver");
    });
    it("shouldn't send tokens when enough on balance", async () => {
      let token = await TutorialToken.deployed();
      const amount = 2000;
      try {
        await token.transfer(accounts[1], amount, {from: accounts[2]});
        assert.fail('Expected revert not received');
      } catch (error) {
       const revertFound = error.message.search('revert') >= 0;
       assert(revertFound, `Expected "revert", got ${error} instead`);
      }
    });
  });
});
