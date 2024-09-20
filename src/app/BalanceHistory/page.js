'use client'
import Web3 from "web3";
import { BarChart } from "@/components/BarChart";
import React, { useState } from "react";
import Moralis from "moralis";
import { DateRange, DateRangePicker } from "@/components/DatePicker"


    


    let web3;
    let account;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    {
            web3 = new Web3(window.ethereum);
            account=JSON.parse(localStorage.getItem('account'))
        }


const BalanceHistory = () => {
    const [dateRange, setDateRange] = useState();
      
    const [data,setdata]=useState()
    const[network,setNetwork]=useState();
    const [Accounts,setAccounts]=useState(account||null);
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
    
    const call2 = async (networkk)=> {    

    {
        const account=  await web3.eth.getAccounts()
        localStorage.setItem('account1', JSON.stringify(account[0]));
        setAccounts(account);
            
      
        const response = await Moralis.EvmApi.transaction.getWalletTransactions({
          "chain": networkk,
          "toDate":dateRange.to?.toLocaleDateString('af-ZA'),
    "fromDate": dateRange.from?.toLocaleDateString('af-ZA'),
          "order": "DESC",
          "address": account[0],
        });
        console.log(response.result);
        localStorage.setItem('dataBal', JSON.stringify(response.result));


        

        

      }  
}
    const [data3,setdata3]=useState([]);
    const call=async(networkk)=>{
        const dataBal=localStorage.getItem('dataBal')
        const account1=JSON.parse(localStorage.getItem('account1'))
        const data=JSON.parse(dataBal)
        const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
            "chain": networkk,
            "toBlock":parseInt(data[data.length-1].blockNumber),
            "address": account1,
          });
          console.log(response.result[0].balanceFormatted);

         var bal=response.result[0].balanceFormatted;
        const data2=[];
        data2.push({name:data[data.length-1].blockTimestamp.slice(0,25),balance:bal})
        for(let i=data.length-2;i>=0;i--){
            if(String(account1).toLowerCase()==data[i].from){
                bal-=parseFloat(web3.utils.fromWei(data[i].value,'ether'));
                bal-=(parseFloat(web3.utils.fromWei(data[i].gasPrice,'ether'))*data[i].gasUsed)
                console.log("minus",bal)    
            }
            else{
                bal+=parseFloat(web3.utils.fromWei(data[i].value,'ether'));
                console.log("plus",bal)
            }
            data2.push({name:data[i].blockTimestamp.slice(0,25),balance:bal})

        }
        setdata3(data2);
        console.log(data2);
    }

    return ( <>
    <div>
    <h1 className='text-white mt-12 text-5xl flex justify-between font-mono' ><span className='text-5xl'>Wallet Balance History</span></h1>
    </div>
    <div className="flex justify-evenly mt-12">
    
    <select  className='bg-black mr-8  text-white'  onChange={(e)=>{setNetwork(e.target.value);}} >
            {networks.map((items)=>{
              return<option className='bg-black 'onChange={(e)=>{setNetwork(e.target.value)}} value={items.value} key={items.name+items.value}>{items.name}</option>
            })}
          </select>
          <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        className="w-60"
      />
      <div className="text-white border-2 border-white px-4 py-2">
      Selected Range:{" "}
        {dateRange
          ? `${dateRange.from?.toLocaleDateString('af-ZA')} ${dateRange.to?.toLocaleDateString('af-ZA') ?? ""}`
          : "None"}
      </div>
          <button className="text-white border-2 border-white border-opacity-55 px-3 py-2  hover:border-opacity-100  "onClick={()=>{call2(network).then(()=>{call(network)})}}>Get History</button>


    </div>
    
    <BarChart
            
            type={"default"}
            className="h-[40vh] mt-[20vh]"
            data={data3}
            index="name"
            categories={["balance"]}
            showLegend={false}
          />
    </> );
}
 
export default BalanceHistory;