'use client'

import React, { useEffect } from 'react';

import { useState,useRef } from 'react';
import withAuth from '@/app/hoc/withAuth';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
  } from "@/components/Table"



const Watchlist = () => {
    const {Web3} = require('web3')

const provider = 'https://mainnet.infura.io/v3/948ba935d885443cbd73d68301eee92f'

const client=new Web3.providers.HttpProvider(provider)
const Web3Client = new Web3(client )
let web3;
let watch;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    {
            web3 = new Web3(window.ethereum);
            watch=JSON.parse(localStorage.getItem('watchlist'))
        }

const[address,setAddress]=useState();
const [account,setaccount]=useState();
const [watchlist,setWatchlist]=useState(watch|| [""]);
const isMounted = useRef(false);




  
  // Function to get token details (name, symbol, balance, decimals)
  const getTokenDetails = async (tokenAddress, walletAddress) => {
    
    const erc20Abi = [
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "balance",
              "type": "uint256"
            }
          ],
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "name": "",
              "type": "uint8"
            }
          ],
          "type": "function"
        }
      ];
    const tokenContract = new Web3Client.eth.Contract(erc20Abi, tokenAddress);
    
        const accounts = await web3.eth.getAccounts();
        setaccount(accounts[0]);
    try {
      const [name, symbol, decimals, balance] = await Promise.all([
        tokenContract.methods.name().call(),
        tokenContract.methods.symbol().call(),
        tokenContract.methods.decimals().call(),
        tokenContract.methods.balanceOf(walletAddress).call()
      ]);
  
      const humanReadableBalance = convertBigIntBalance(balance, decimals);
      const etherValue = web3.utils.fromWei(balance.toString(), 'ether');
      
      return {
        name,
        symbol,
        balance:etherValue,
       
        
        
      };
    } catch (error) {
      console.error('Error fetching token details:', error);
    }
  };
  function convertBigIntBalance(balance, decimals) {
    const bigBalance = BigInt(balance);  // Convert balance to BigInt if not already
    const divisor = BigInt(10) ** BigInt(decimals);  // 10^decimals

    const wholePart = bigBalance / divisor;  // Whole number part
    const fractionalPart = bigBalance % divisor;  // Fractional part

    // Convert fractional part to a string and pad with leading zeros if necessary
    const fractionalStr = fractionalPart.toString().padStart(Number(decimals), '0');

    // Combine the whole and fractional parts for the human-readable format
    return `${wholePart}.${fractionalStr}`;
}

      
  
  
    
    return ( <>
    
    <h1 className='text-white mt-12 flex justify-between font-mono' ><span className='text-4xl'>Watchlist</span>
        <div className='flex mr-8'>
        <form action="" className='bg-black'>
            <input placeholder='Enter Token Address' className='bg-black' type="text" onChange={(e)=>{setAddress(e.target.value)}} />
        </form>
        <button className='text-white border-2 px-4 py-1 ml-2' onClick={(e)=>{getTokenDetails(address, account).then((tokenDetails) => {
            setWatchlist([...watchlist, tokenDetails]);
            localStorage.setItem('watchlist', JSON.stringify([...watchlist, tokenDetails]));
    console.log('Token Details:', tokenDetails);
  });}}>Add</button>
        </div>
        </h1>
        <div className='text-white'>
        <TableRoot className="mt-8 text-black">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Token Name</TableHeaderCell>
              <TableHeaderCell>Token Symbol</TableHeaderCell>
              <TableHeaderCell>Balance</TableHeaderCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {watchlist.map((item) => (
              typeof item === 'object' && item != null ? (
                <TableRow key={item.name+item.symbol+item.balance}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.symbol}</TableCell>
                  <TableCell>{item.balance}</TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
        </TableRoot>
        </div>
    </> );
}
 
export default withAuth(Watchlist,true);


