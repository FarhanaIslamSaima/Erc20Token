import Home from "./components/Home";
import { useEffect, useState,useContext } from 'react';
import { ethers } from 'ethers';
import DappToken from  '../src/token/build/contracts/DappToken.json'
import DappTokenSale from '../src/token/build/contracts/DappTokenSale.json'
import TruffleContract from 'truffle-contract'
import TokenProvider from "./context/TokenProvider";
import { TokenContext } from "./context/TokenProvider";


import Web3 from 'web3';
import Token from "./components/Token";
var web3 = new Web3();
var DappTokenInstance;
var DappTokenSaleInstance;






function App() {
  const {tokenNum}=useContext(TokenContext)
console.log("This is your tokens number",tokenNum)
  const init={
    price:'',
    tokenSold:'',
    account:'',
    balance:''

  }
  const [token,setToken]=useState(init)
  console.log(token.account)
 

useEffect(()=>{
  const loadData=async()=>{
    await loadWeb3()
    await loadBlockChainData()
  }
  loadData()


},[])

  // Properties

  async function loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log(account)
      token.account=accounts[0]
      
     
       window.ethereum.on('accountsChanged', function (accounts) {
          // Time to reload your interface with accounts[0]!
        
        
          console.log('hello')
    
         });
     
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

  }

  async function loadBlockChainData(){

  
 
    var DTsaleinstance;
    var DTinstance;


 DappTokenInstance=TruffleContract(DappToken)
DappTokenInstance.setProvider(window.web3.currentProvider)
DappTokenInstance.deployed().then(function(instance){
  DTinstance=instance;
  return DTinstance.balanceOf(token.account)


}).then(function(balance){
  console.log(balance.toNumber())
  token.balance=balance.toNumber()
})



DappTokenSaleInstance=TruffleContract(DappTokenSale)
DappTokenSaleInstance.setProvider(window.web3.currentProvider)
DappTokenSaleInstance.deployed().then(function(instance){
  DTsaleinstance=instance;
return DTsaleinstance.tokenPrice()

}).then(function(tokenPrice){



token.price=tokenPrice.toNumber()
return DTsaleinstance.tokenSold()



}).then(function(tokenSold){
  
  token.tokenSold=tokenSold.toNumber()

})
  




  
  }
  
  const buyToken=()=>{
    const numberofToken=tokenNum;
    DappTokenSaleInstance.deployed().then(function(instance){
      return instance.buyTokens(numberofToken,{
        from:token.account,
        value:numberofToken*token.price,
        gas:500000
      })
    }).then(function(result){
      console.log("tokens bought...")
    })

  }




  





  return (

<Home token={token} buyToken={buyToken}/>



   

   
  );
}

export default App;