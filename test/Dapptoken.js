const assert = require("assert");











const DappToken = artifacts.require("DappToken");
var tokenInstance;

contract(DappToken,function(accounts){








    it('sets token with correct values',function(){
        return DappToken.deployed().then(function(instance){
           tokenInstance=instance;
           return tokenInstance.name()
        }).then(function(name){
            assert.equal(name,'Dapp Token' ,'name is correct')
            return tokenInstance.symbol()
        }).then(function(symbol){
            assert.equal(symbol,'Dapp','symbol is correct')
            return tokenInstance.standard()
        }).then(function(standard){
            assert.equal(standard,'Dappv1.0','has correct standard')
        })
    })






    it('allocates Intitial supply',function(){
        return DappToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.totalSupply()
         }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),100000,'supply number is correct')
            return tokenInstance.balanceOf(accounts[0])
         }).then(function(balance){
            assert.equal(balance.toNumber(),100000,'initial Balance')
         })
    })



it('transfer token ownership',function(){
    return DappToken.deployed().then(function(instance){
        tokenInstance=instance;
        return tokenInstance.transfer.call(accounts[1],99999999999999)
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0,'error message must contain revert')

        return tokenInstance.transfer.call(accounts[1],25000,{from:accounts[0]})
    }).then(function(success){
        assert.equal(success,true,'boolean value is true')
        return tokenInstance.transfer(accounts[1],25000,{from:accounts[0]})

        
    }).then(function(reciept){
        assert.equal(reciept.logs.length,1,'triggers one event');
        assert.equal(reciept.logs[0].event,'Transfer','should be the Trasnfer event');
        assert.equal(reciept.logs[0].args._from,accounts[0],'logs the account the tokens transfer from');
        assert.equal(reciept.logs[0].args._to,accounts[1],'logs the account tokens tranferred to');
        assert.equal(reciept.logs[0].args._value,25000,'transfer amount')
        return tokenInstance.balanceOf(accounts[1])
    }).then(function(balance1){
        assert.equal(balance1,25000,'reciever balance is right')
        return tokenInstance.balanceOf(accounts[0])
    }).then(function(balance2){
        assert.equal(balance2,75000,'sender balance is right')
    })
})











})


