"use client"
import Image from "next/image";
import { useState } from "react";


import metamask from "@/assets/metamask.svg";

import logo from "@/assets/cryptogenix-high-resolution-logo-transparent.png"



export default function Home() {

  
  const [connectedStatus, setConnectedStatus] = useState("Connect with");
  
  


  return (
    <div className=" landing flex flex-col items-center justify-evenly text-white">
      <Image src={logo} className="w-3/5 " />
    <div className=" connect w-40 h-20 flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]  ">
    <div className="flex flex-col justify-center items-center">
    <Image src={metamask} className="mb-6" />
    <button className=" mt-10 bg-black py-3 px-6 border-2 border-sky-200 border-opacity-40 rounded-xl hover:border-opacity-100 transition-colors ease-in-out " >{connectedStatus} <span className="text-orange-400">Metamask</span> </button> <br />
    </div>

    </div>
    {/* {state} <br />
    {balance} <br /> */}
    {/* <form action="" style={{color:'black'}}>
      <input type="text" placeholder="Enter Address" onChange={(e)=>{setaddress(e.target.value)}} /> <br /> <br />
      <input type='number' onChange={(e)=>{setAmount(e.target.value)}} placeholder="Enter Amount" />

    </form>
    <button onClick={()=>{sendtransaction()}}>Send</button> */}
    

    </div>
  );
}
