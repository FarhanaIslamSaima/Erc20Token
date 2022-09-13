import Home from "./components/Home";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DappToken from  './contracts/DappToken.json'


import Web3 from 'web3';
var web3 = new Web3();





function App() {
  
useEffect(()=>{
  const loadData=async()=>{
    await loadWeb3()
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




  





  





  return (
    <div className="App">
   
      <Home/>
    </div>
  );
}

export default App;