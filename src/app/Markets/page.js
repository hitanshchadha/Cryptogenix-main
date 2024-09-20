"use client"
import { useEffect, useState,useRef } from 'react';
import Moralis from 'moralis';
import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"



import withAuth from '@/app/hoc/withAuth';

import Web3 from 'web3';
import Image from "next/image";

 function Markets() {
    let web3;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    {
            web3 = new Web3(window.ethereum);
        }
  const[currentAccount,setCurrentAccount]=useState([]);
    const [data2,setData2]=useState([""]);
    const [data,setData]=useState(null);
    const [mode, setMode] = useState("ERC 20");
    const isMounted = useRef(false);
const call= async()=> {    

    
    try {
        
        
        const response1 =  await Moralis.EvmApi.marketData.getTopERC20TokensByMarketCap({});
         const response2= await Moralis.EvmApi.marketData.getTopCryptoCurrenciesByMarketCap({});
        console.log(response1.raw);
        console.log(response2.raw);

        localStorage.setItem('MarketdataToken', JSON.stringify(response1.result));
        localStorage.setItem('MarketdataCrypto', JSON.stringify(response2.result));
        load();
      } catch (e) {
        console.error(e);
      }   
}
async function load() { 
    const data1 = localStorage.getItem('MarketdataToken');
    const data2 = localStorage.getItem('MarketdataCrypto');
    setData(JSON.parse(data1))
    setData2(JSON.parse(data2));
    console.log(JSON.parse(data1));
    const account= await web3.eth.getAccounts();
    setCurrentAccount(account);
  }

useEffect(() => {
  
  if (isMounted.current) {
        load();
      } else {
        call();
        isMounted.current = true;
      }
},[])

 
const data1 = ["ERC 20","Cryptocurrencies"];
  

  return (
    <div className='bg-black overflow-x-auto'>
      
        <h1 className='text-white mt-12 text-4xl flex justify-between font-mono' >{mode=="ERC 20"?<>Top ERC20 Tokens (By Market Cap)</>:<>Top Cryptocurrencies(By Market Cap)</>}

        <select name="" id="" className="bg-black mr-5" onChange={(e)=>{setMode(e.target.value) 
                console.log(mode)}}>
            {data1.map((item) => {
            return <option key={item} className='text-white' value={item} onChange={(e)=>{setMode(e.target.value); 
                console.log(mode)}}>{item}</option>                
            })}
        </select>
        </h1>
      <TableRoot className="mt-8 text-black">
        <Table>
          {mode=="ERC 20"?<><TableHead>
            <TableRow>
              <TableHeaderCell>Token Name</TableHeaderCell>
              <TableHeaderCell>Token Symbol</TableHeaderCell>
              <TableHeaderCell>Price(USD)</TableHeaderCell>
              <TableHeaderCell>Market Cap(USD)</TableHeaderCell>
              <TableHeaderCell>7d % Change</TableHeaderCell>
              <TableHeaderCell >24h % Change</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data!=null? data.map((item) => (
              
              <TableRow key={item.token_symbol+item.price_usd}>
                <TableCell ><div className='flex items-center'><Image src={item.token_logo} className='mr-2' width={50} height={50} alt=''></Image>{item.token_name}</div></TableCell>
                <TableCell >{item.token_symbol}</TableCell>
                <TableCell >{"$"+ item.price_usd}</TableCell>
                <TableCell>{"$"+ item.market_cap_usd}</TableCell> 
                <TableCell>{item.price_7d_percent_change + "%"}</TableCell>
                <TableCell>{item.price_24h_percent_change + "%"}</TableCell>
                
                
              </TableRow>
              
            )):<></>}
          </TableBody></>:<>

          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Symbol</TableHeaderCell>
              <TableHeaderCell>Price(USD)</TableHeaderCell>
              <TableHeaderCell>Market Cap(USD)</TableHeaderCell>
              <TableHeaderCell>7d % Change</TableHeaderCell>
              <TableHeaderCell >24h % Change</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((item) => (
              <TableRow key={item.name}>
                <TableCell ><div className='flex items-center'><Image src={item.logo} className='mr-2' width={50} height={50} alt=''></Image>{item.name}</div></TableCell>
                <TableCell >{item.symbol}</TableCell>
                <TableCell >{"$"+ item.usd_price}</TableCell>
                <TableCell>{"$"+ item.market_cap_usd}</TableCell> 
                <TableCell>{item.usd_price_7d_percent_change + "%"}</TableCell>
                <TableCell>{item.usd_price_24h_percent_change + "%"}</TableCell>
                
                
              </TableRow>
            ))}
          </TableBody>
          
          </>}
        </Table>
      </TableRoot>
    </div>
  )
}
export default withAuth(Markets,true);
