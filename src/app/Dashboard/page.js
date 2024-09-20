'use client'
import withAuth from "@/app/hoc/withAuth";
import Web3 from 'web3';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import Moralis from 'moralis';
import ParticlesBackground from "@/components/Particles.jsx";

function UserDashboard() {
    const [account,setAccount]=useState();
    const [balance,setbalance]=useState();
    const [networth,setnetworth]=useState();
    const isMounted = useRef(false);
    //initialize web3
    let web3;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    {
            web3 = new Web3(window.ethereum);
        }
    
    const call= async() => {
        //get account
        const account=  await web3.eth.getAccounts();
       //get networth
        try {
            const response = await Moralis.EvmApi.wallets.getWalletNetWorth({
                "excludeSpam": true,
                "excludeUnverifiedContracts": true,
                "address": account[0]
              });
              localStorage.setItem('networth', JSON.stringify(response.raw.total_networth_usd));
              console.log(response.raw);
        
        }
            catch (e) {
                console.error(e);
            }
        const balance= await web3.eth.getBalance(account[0]);
        localStorage.setItem('balance', JSON.stringify(web3.utils.fromWei(balance.toString(), 'ether')));
        localStorage.setItem('account', JSON.stringify(account[0]));
        
    }
    const load=()=> { 
        //set local storage
        const networth = localStorage.getItem('networth');
        const account = localStorage.getItem('account');
        const balance = localStorage.getItem('balance');
        setAccount(JSON.parse(account));
        setbalance(JSON.parse(balance));
        setnetworth(JSON.parse(networth));
      }
useEffect(() => {

    if (isMounted.current) {
        load();
      } else {
        call().then(()=>{load()});
        isMounted.current = true;
      }

},[])

    return ( <div className="z-50">
    
    <h1 className='text-white mt-12 text-5xl flex justify-between font-mono' >Welcome 👋</h1>
    <div className="text-white  font-mono flex">
        <div className="w-2/4 h-[20vh] rounded-3xl mt-6 text-2xl bg-white p-4 text-black flex flex-col">
          <span className=" font-bold text-4xl">Connected Account:</span> 
          <span className="mt-4">{account} </span>  
           
        </div>
        <div className=" h-[20vh] w-[30vw] rounded-3xl mt-6 ml-16 text-2xl bg-white p-4 text-black flex flex-col">
        <span className="font-bold text-3xl ">Current Balance:</span> <span className="text-center text-5xl mt-4">{String(balance).slice(0,6)} ETH
        </span>
        </div>
    </div>
    <div className=" h-[20vh] w-[30vw] rounded-3xl mt-6 text-2xl bg-white p-4 text-black flex flex-col"> 
    <span className="font-bold text-4xl font-mono">Net Worth:</span> <span className="text-center text-5xl mt-4">$ {String(networth).slice(0,8)} </span>
    </div>
    <ParticlesBackground/>
    </div> );
}
 
export default withAuth(UserDashboard,true);