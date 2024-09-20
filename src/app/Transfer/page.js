'use client'
import React from 'react';
import Web3 from 'web3';
import { useState } from 'react';
import metamask from "@/assets/metamask.svg";
import Image from "next/image";
import withAuth from '@/app/hoc/withAuth';
import ParticlesBackground from "@/components/Particles.jsx";

const Transfer = () => {
    const [address,setaddress]=useState();
    const[Amount,setAmount]=useState();
    const sendtransaction = async() => {
        let web3;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
        {
            web3 = new Web3(window.ethereum);
        }
    const accounts = await web3.eth.getAccounts();
    const tx = {
        from: accounts[0],
        to: address,
        value: web3.utils.toWei(String(Amount), "ether"), // Convert value to Wei
        gas: 25000,  // Estimated gas limit for a simple transaction
        gasPrice: await web3.eth.getGasPrice(),} // Get the current gas price from the network

    const txHash = await web3.eth.sendTransaction(tx);
      
    console.log("Transaction hash:", txHash);  
}
    
    return ( <>
    <div className=" w-full h-screen flex flex-col items-center justify-evenly text-white">
        <h1 className='text-6xl font-mono'>Token Transfer</h1>
        <div className=" connect w-40 h-20 flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]  ">
            <div className="flex flex-col justify-center items-center">
            <Image src={metamask} className="-mb-1 " />
            <form action="" style={{color:'black'}}>
                <input type="text" className='bg-black rounded-2xl text-white' placeholder="Enter Address" onChange={(e)=>{setaddress(e.target.value)}} /> <br /> <br />
                <input type='number' className='bg-black rounded-2xl text-white' onChange={(e)=>{setAmount(e.target.value)}} placeholder="Enter Amount" />
            </form>
            <button className=" mt-10 bg-black py-3 px-6 border-2 border-sky-200 border-opacity-40 rounded-xl hover:border-opacity-100 transition-colors ease-in-out " onClick={sendtransaction}>Transfer</button> <br />
            </div>

        </div>
    </div>
    <ParticlesBackground/>
    
    </> );
}
 
export default withAuth(Transfer,true);