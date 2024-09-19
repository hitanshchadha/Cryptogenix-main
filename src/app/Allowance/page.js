"use client"
import { useState } from 'react';
import metamask from "@/assets/metamask.svg";
import Image from "next/image";
import Moralis from 'moralis';
import withAuth from '@/app/hoc/withAuth';
import Web3 from 'web3';
const Allowance = () => {
  const networks=[
    {
      "name":"Select Chain", 
    },
   
  {
    "name":"Linea ",
    "value":"0xe705"
  },
  {
    "name":"eth",
    "value":"0x1"
  },
  {
    "name":"bsc",
    "value":"0x38"
  
  },
  {
    "name":"bsc testnet",
    "value":"0x61"
  
  },
  {
    "name":"avalanche",
    "value":"0xa86a"
  },
  {
    "name":"fantom",
    "value":"0xfa"
  },
  {
    "name":"palm",
    "value":"0x2a15c308d"
  },
  {
    "name":"cronos",
    "value":"0x19"
  },
  {
    "name":"arbitrum",  
    "value":"0xa4b1"
  }
  
  ]
  let web3;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    {
            web3 = new Web3(window.ethereum);
    }
    const [address,setaddress]=useState();
    const [amount,setAmount]=useState();
    const [token,setToken]=useState();
    const[network,setNetwork]=useState();
    const [showBalance, setShowBalance] = useState(false);
    const getAllowance=async()=>{
    
      const accounts = await web3.eth.getAccounts();
    try {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });
      
      
      const response = await Moralis.EvmApi.token.getTokenAllowance({
        "chain": network,
        "ownerAddress": address,
        "spenderAddress": accounts[0],
        "address": token
      });
    
      console.log(response.raw);
      setAmount(response.raw);
      setShowBalance(true);
      
    } catch (e) {
      console.error(e);
    }}
    return ( <>
    
    <div className=" w-full h-screen flex flex-col items-center justify-evenly text-white">
        <h1 className='text-6xl font-mono'>Check ERC20 Token Allowance</h1>
    <div className=" connect w-40 h-20 flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]  ">
    <div className="flex flex-col justify-center items-center">
    <Image src={metamask} className="-mb-8 " alt='' />
    <form action="" style={{color:'black'}}>
      <select name="" id="" className='text-white bg-black mb-4' onChange={(e)=>{setNetwork(e.target.value)}}>
        {networks.map((items)=>{
          return<option className='bg-black ' key={items.value+items.name} value={items.value}>{items.name}</option>
        })}
      </select> <br />
      <input type="text" className='bg-black rounded-2xl text-white' placeholder="Enter Owner Address" onChange={(e)=>{setaddress(e.target.value)}} /> <br /> 
      <input type="text" className='bg-black mt-2 rounded-2xl text-white' placeholder="Enter Token Contract" onChange={(e)=>{setToken(e.target.value)}} />

    </form>
    
    <button className=" mt-10 bg-black py-3 px-6 border-2 border-sky-200 border-opacity-40 rounded-xl hover:border-opacity-100 transition-colors ease-in-out " onClick={getAllowance} >Check Allowance</button> <br />
    <button className='text-green-600'  >{showBalance? "Allowance:   "+String(amount.allowance):<></>}</button> <br />
    </div>

    </div>
    </div></> );
}
 
export default withAuth(Allowance,true);