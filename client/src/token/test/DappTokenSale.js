









const DappTokenSale = artifacts.require("DappTokenSale");
const DappToken=artifacts.require("DappToken");


contract (DappTokenSale,function(accounts){
    var tokenSaleInstance;
    var tokenSale;
    var admin=accounts[0]
    var tokenPrice=1000000000000000;
    var numberOfToken=10;
    var tokenAvailable=75000;
    var buyer=accounts[1];
  it('initialized contract with correct values',function(){
    return DappTokenSale.deployed().then(function(instance){
        tokenSaleInstance=instance;
        return tokenSaleInstance.address
    }).then(function(address){
        assert.notEqual(address, 0x0,'has contract address')
        return tokenSaleInstance.tokenContract()
    }).then(function(address){
        assert.notEqual(address,0x0,'has token address')
        return tokenSaleInstance.tokenPrice()
    }).then(function(price){
        assert.equal(price,tokenPrice,'token price is correct')
    })
  })


  it('facilities of token buying',function(){
    return DappToken.deployed().then(function(instance){
        tokenInstance=instance;
        return DappTokenSale.deployed().then(function(instance){
            tokenSaleInstance=instance;
            return tokenInstance.transfer(buyer,tokenAvailable,{from:admin})
        }).then(function(){
      
        return tokenSaleInstance.buyTokens(numberOfToken,{from:buyer,value:numberOfToken*tokenPrice})
        
       
    }).then(function(reciept){
      
        assert.equal(reciept.logs.length,1,'triggers one event');
        assert.equal(reciept.logs[0].event,'Sell','should be the Trasnfer event');
        assert.equal(reciept.logs[0].args._buyer,buyer,'logs the account the tokens transfer from');
        assert.equal(reciept.logs[0].args._amount,numberOfToken,'logs the account tokens tranferred to');
   
  
        return tokenSaleInstance.tokenSold()

    }).then(function(amount){
        assert.equal(amount,numberOfToken,'increaments the number of token')

      return tokenInstance.balanceOf(buyer).then(function(balance){
        assert.equal(balance.toNumber(),numberOfToken,'balance is correct')
        return tokenInstance.balanceOf(tokenSaleInstance.address)})
      })  
       
        .then(function(balance){
            assert.equal(balance.toNumber(),tokenAvailable-numberOfToken,'number of token is correct')
            return tokenSaleInstance.buyTokens(numberOfToken,{from:buyer,value:1})
     
     
        
    
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0,'token price is high than amount')
        return tokenSaleInstance.buyTokens(80000,{from:buyer,value:numberOfToken*tokenPrice})
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0,'token price is high than amount')
  })

})
})




it('ends a sale',function(){
    return DappToken.deployed().then(function(instance){
        tokenInstance=instance
        return DappTokenSale.deployed().then(function(instance){
            tokenSaleInstance=instance
            return tokenSaleInstance.endSale({from:buyer})
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,'must be admin to end sale')
            return tokenSaleInstance.endSale({from:admin})
        }).then(function(reciept){
            return tokenInstance.balanceOf(admin)

        }).then(function(balance){
            assert.equal(balance.toNumber(),25000,'returns all remaining token')

            
        })

    })
})






})
