import Home from "./components/Home";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DappToken from  '../src/token/build/contracts/DappToken.json'
import DappTokenSale from '../src/token/build/contracts/DappTokenSale.json'
import TruffleContract from 'truffle-contract'


import Web3 from 'web3';
var web3 = new Web3();
console.log(DappToken)





function App() {
  
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
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

  }

  async function loadBlockChainData(){
    const web3=window.web3
const DappTokenInstance=TruffleContract(DappToken)
DappTokenInstance.setProvider(window.web3.currentProvider)
DappTokenInstance.deployed().then(function(token){
 console.log("Your DappToken Address is : ", token.address)
})


const DappTokenSaleInstance=TruffleContract(DappTokenSale)
DappTokenSaleInstance.setProvider(window.web3.currentProvider)
DappTokenSaleInstance.deployed().then(function(token){
 console.log("Your DappTokenSale Address is : ", token.address)
})




  
 }

  




  





  





  return (
    <div className="App">
   
      <Home/>
    </div>
  );
}

export default App;