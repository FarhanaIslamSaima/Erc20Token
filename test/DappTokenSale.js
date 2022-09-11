





const DappTokenSale = artifacts.require("DappTokenSale");


contract (DappTokenSale,function(accounts){
    var tokenSaleInstance;
    var tokenPrice=1000000000000000;
    var numberOfToken=10;
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
    return DappTokenSale.deployed().then(function(instance){
        tokenSaleInstance=instance;
        return tokenSaleInstance.buyTokens(numberOfToken,{from:buyer,value:numberOfToken*tokenPrice})
    }).then(function(reciept){
      
        assert.equal(reciept.logs.length,1,'triggers one event');
        assert.equal(reciept.logs[0].event,'Sell','should be the Trasnfer event');
        assert.equal(reciept.logs[0].args._buyer,buyer,'logs the account the tokens transfer from');
        assert.equal(reciept.logs[0].args._amount,numberOfToken,'logs the account tokens tranferred to');
   
  
        return tokenSaleInstance.tokenSold()

    }).then(function(amount){
        assert.equal(amount,numberOfToken,'increaments the number of token')
        return tokenSaleInstance.buyTokens(numberOfToken,{from:buyer,value:1})
    }).then(assert.fail).catch(function(error){
        assert(error.message.indexOf('revert')>=0,'token price is high than amount')
    })
  })
})