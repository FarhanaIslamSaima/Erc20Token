
















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

it('approve tokens for delegated transfer',function(){
    return DappToken.deployed().then(function(instance){
        tokenInstance=instance;
        return tokenInstance.approve.call(accounts[1],100);
    }).then(function(success){
        assert.equal(success,true,'should return true')
        return tokenInstance.approve(accounts[1],100)
    }).then(function(reciept){
        assert.equal(reciept.logs.length,1,'triggers one event');
        assert.equal(reciept.logs[0].event,'Approval','should be the Trasnfer event');
        assert.equal(reciept.logs[0].args._owner,accounts[0],'logs the account the tokens transfer from');
        assert.equal(reciept.logs[0].args._spender,accounts[1],'logs the account tokens tranferred to');
        assert.equal(reciept.logs[0].args._value,100,'transfer amount')

        return tokenInstance.allowance(accounts[0],accounts[1])

    }).then(function(allowance){
        assert.equal(allowance,100,'stores the allowance for delegated transfer')
    })
})


it('handles delegated transfer',function(){
    return DappToken.deployed().then(function(instance){
        tokenInstance=instance;
        fromAccount=accounts[2];
        toAccount=accounts[3];
        spendingAccount=accounts[4];
        return tokenInstance.transfer(fromAccount,100,{from:accounts[0]})
    }).then(function(reciept){
        return tokenInstance.approve(spendingAccount,10,{from: fromAccount})
    }).then(function(reciept){
        return tokenInstance.transferFrom(fromAccount,toAccount,9999,{from:spendingAccount})
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0,'cannot transfer larger ammount than balance')
        return tokenInstance.transferFrom(fromAccount,toAccount,20,{from:spendingAccount})
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0,'can not transfer larger than approved amound')
        return tokenInstance.transferFrom.call(fromAccount,toAccount,10,{from:spendingAccount})
    }).then(function(success){
        assert.equal(success,true,'return must be true')
        return tokenInstance.transferFrom(fromAccount,toAccount,10,{from:spendingAccount})
    }).then(function(reciept){
        assert.equal(reciept.logs.length,1,'triggers one event');
        assert.equal(reciept.logs[0].event,'Transfer','should be the Trasnfer event');
        assert.equal(reciept.logs[0].args._from,fromAccount,'logs the account the tokens transfer from');
        assert.equal(reciept.logs[0].args._to,toAccount,'logs the account tokens tranferred to');
        assert.equal(reciept.logs[0].args._value,10,'transfer amount')
        return tokenInstance.balanceOf(fromAccount)

    }).then(function(balance){
        assert.equal(balance.toNumber(),90,'90 is correct')
        return tokenInstance.balanceOf(toAccount)
    }).then(function(balance){
        assert.equal(balance.toNumber(),10,'balance should be 10 token')
        return tokenInstance.allowance(fromAccount,spendingAccount)
    }).then(function(token){
        assert.equal(token.toNumber(),0,'token is 0')
    })
})











})


