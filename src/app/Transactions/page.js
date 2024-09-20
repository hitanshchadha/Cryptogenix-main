'use client'
import { useEffect, useState,useRef } from 'react';
import Moralis from 'moralis';
import { Badge } from "@/components/Badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";


import Web3 from 'web3';
import withAuth from '@/app/hoc/withAuth';

 function Transactions() {
  
  
  const truncateAddress = (address, startLength = 10, endLength = 6) => {
    return `${address!=null?address.slice(0, startLength):<></>}...${address!=null?address.slice(-endLength):<></>}`;
  };

  const truncateDate = (address, startLength = 25) => {
    return `${address!=null?address.slice(0, startLength):<></>}`;
  }

  let web3;
  let account;
  let data1;
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
  {
          web3 = new Web3(window.ethereum);
          account=JSON.parse(localStorage.getItem('account'))
          data1=JSON.parse(localStorage.getItem('data1'))
      }
  
      
      const[currentAccount,setCurrentAccount]=useState( account || null);
      
      const [data,setData]=useState( data1 || null);


      
    const call = async (networkk)=> {    
      const account=  await web3.eth.getAccounts();
      setCurrentAccount(account);
    {
        
      
        const response = await Moralis.EvmApi.transaction.getWalletTransactions({
          "chain": networkk,
          "order": "DESC",
          "address": account[0],
        });
        console.log(response.result);

        localStorage.setItem('data1', JSON.stringify(response.result));

      }  
}
 

 
const networks=[
  {
    "name":"Select Chain", 
  },
  {

  "name":"Sepolia",
  "value":"0xaa36a7"
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



const[network,setNetwork]=useState();
  return (
    <div className='bg-black'>

      <h1 className='text-white mt-12 text-4xl flex justify-between font-mono'> Transaction History
        <div>
          <select className='bg-black mr-8 '  onChange={(e)=>{setNetwork(e.target.value);call(e.target.value).then(()=>{const data1 = localStorage.getItem('data1');
  setData(JSON.parse(data1))}) ;}} >
            {networks.map((items)=>{
              return<option className='bg-black 'onChange={(e)=>{setNetwork(e.target.value)}} value={items.value} key={items.name+items.value}>{items.name}</option>
            })}
          </select>
       
        </div>
        
        </h1>
      <TableRoot className="mt-8">
        <Table>
          <TableHead >
            <TableRow>
              <TableHeaderCell>From</TableHeaderCell>
              <TableHeaderCell>To</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Timestamp</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data!=null?data.map((item) => (
              <Dialog key={item.from+item.value+item.blockTimestamp}>
              <DialogTrigger asChild>
              <TableRow key={item.from}>
                <TableCell >{truncateAddress(item.from) }</TableCell>
                <TableCell>{typeof item.to== 'undefined'? "" :truncateAddress(item.to)}</TableCell> 
                 <TableCell>
                  <Badge
                    variant={String(currentAccount[0]).toLowerCase()==item.from ? "error" : "success"}
                  >
                    {String(currentAccount[0]).toLowerCase()==item.from ? "Sent" : "Received"}
                    
                  </Badge>
                </TableCell>
                <TableCell>{truncateDate(item.blockTimestamp)}</TableCell>
                <TableCell>{item.value!=null?web3.utils.fromWei(item.value,'ether'):<></>}</TableCell>
                
              </TableRow>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Transaction Details</DialogTitle>
                  <DialogDescription className="mt-1 text-sm leading-6">
                    <p>
                      <span className="font-semibold">From:</span> {item.from}
                    </p>
                    <p>
                      <span className="font-semibold">To:</span> {item.to}
                    </p>
                    <p>
                      <span className="font-semibold">Amount:</span> {item.value!=null?web3.utils.fromWei(item.value,'ether'):<></>} ETH
                    </p>
                    <p>
                      <span className="font-semibold">Block:</span> {item.blockNumber}
                    </p>
                    <p>
                      <span className="font-semibold">Gas:</span> {item.gas}
                    </p>
                    <p>
                      <span className="font-semibold">Gas Price:</span> {item.value!=null?web3.utils.fromWei(item.gasPrice,'gwei'):<></>} Gwei
                    </p>
                    <p>
                      <span className="font-semibold">Gas Used:</span> {item.gasUsed}
                    </p>
                    
                    <p>
                      <span className="font-semibold">Transaction Hash:</span> {item.hash}
                    </p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6">
                  
                
                  <DialogClose asChild>
                    <button className="w-full text-white px-4   sm:w-fit">Ok, got it!</button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            )):<></>}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );}
  export default withAuth(Transactions,true);
