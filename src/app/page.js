"use client"
import Image from "next/image";
import { useState } from "react";
import Web3 from 'web3';
import metamask from "@/assets/metamask.svg";
import logo from "@/assets/cryptogenix-high-resolution-logo-transparent.png"



export default function Home() {

  // State to store the wallet connection status
  const [connectedStatus, setConnectedStatus] = useState("Connect with");
  
  // Function to connect to the user's Ethereum wallet
  const connectWallet= async ()=>{
    
    const web3 = new Web3(window.ethereum); // Initialize Web3 instance with the injected Ethereum provider (Metamask)
    try {
      
      // Request account access
      await window.ethereum.enable();
      setConnectedStatus("Connected to");
      
      // Account now exposed
      const accounts = await web3.eth.getAccounts(); // Get the user's Ethereum accounts (returns an array of accounts)
      localStorage.setItem('account', JSON.stringify(accounts[0]));
      const balance= await web3.eth.getBalance(accounts[0]); // Get the user's Ethereum balance
      
    } catch(e) {
      // User denied access
      return false
    }
  }
    

  return (
    <div className=" landing flex flex-col items-center justify-evenly text-white">
      <Image src={logo} className="w-3/5 " />
      <div className=" connect w-40 h-20 flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]  ">
        <div className="flex flex-col justify-center items-center">
          <Image src={metamask} className="mb-6" />
          <button className=" mt-10 bg-black py-3 px-6 border-2 border-sky-200 border-opacity-40 rounded-xl hover:border-opacity-100 transition-colors ease-in-out " onClick={connectWallet}>{connectedStatus} <span className="text-orange-400">Metamask</span> </button> <br />
        </div>
      </div>
    </div>
  );
}
