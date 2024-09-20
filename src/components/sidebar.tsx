
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { usePathname } from 'next/navigation'
import logo from "@/assets/cryptogenix-high-resolution-logo-transparent.png"
import Image from "next/image";
import Moralis from 'moralis';


import Web3 from 'web3';
import { useState } from "react";



const Sidebar = () => {
const [data, setData] = React.useState([]);

useEffect(() => {
  const start= async()=>{
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });}
    
    
  
  start();
},[])
  
  
    

    const currentPath = usePathname();
  const { theme } = useTheme();
  const [active, setActive] = React.useState();
  return (
    <div className="flex sticky top-0 left-0 flex-col items-center h-screen bg-black text-white w-[307px] border-r-2 border-0 border-black">
      {/* sidebar logo */}
      <div className="flex p-10">
        <Image src={logo} alt="logo"  />
      </div>

      {/* side nav */}
      <nav className="flex flex-col p-8 space-y-4 text-lg ">
        <Link
          href={"/Dashboard"}
          className={" hover:bg-[#062141] text-primary rounded-lg " + (currentPath=="/Dashboard" ? " bg-[#062141] text-primary" : "")}
        >
          <div className="flex items-center gap-4 py-3 px-8 font-medium w-[208px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1.03517 8.94988H6.31164C6.79532 8.94988 7.19106 8.55414 7.19106 8.07047V1.03517C7.19106 0.551497 6.79532 0.155762 6.31164 0.155762H1.03517C0.551497 0.155762 0.155762 0.551497 0.155762 1.03517V8.07047C0.155762 8.55414 0.551497 8.94988 1.03517 8.94988ZM1.03517 15.9852H6.31164C6.79532 15.9852 7.19106 15.5894 7.19106 15.1058V11.5881C7.19106 11.1044 6.79532 10.7087 6.31164 10.7087H1.03517C0.551497 10.7087 0.155762 11.1044 0.155762 11.5881V15.1058C0.155762 15.5894 0.551497 15.9852 1.03517 15.9852ZM9.82929 15.9852H15.1058C15.5894 15.9852 15.9852 15.5894 15.9852 15.1058V8.07047C15.9852 7.58679 15.5894 7.19106 15.1058 7.19106H9.82929C9.34561 7.19106 8.94988 7.58679 8.94988 8.07047V15.1058C8.94988 15.5894 9.34561 15.9852 9.82929 15.9852ZM8.94988 1.03517V4.55282C8.94988 5.0365 9.34561 5.43223 9.82929 5.43223H15.1058C15.5894 5.43223 15.9852 5.0365 15.9852 4.55282V1.03517C15.9852 0.551497 15.5894 0.155762 15.1058 0.155762H9.82929C9.34561 0.155762 8.94988 0.551497 8.94988 1.03517Z"
                fill={currentPath=="/Dashboard" ? "#0060FF" : "white"}
              />
            </svg>
            <span>Dashboard</span>
          </div>
        </Link>
        <Link
          href={"/Markets"}
          className={" hover:bg-[#062141] text-primary rounded-lg " + (currentPath=="/Markets" ? " bg-[#062141] text-primary" : "")}
        >
          <div className="flex items-center gap-4 py-3 px-6 rounded-2xl font-medium w-[208px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
            >
              <path
                d="M3.99275 0.155762H2.01408V2.13444H0.0354004V14.0065H2.01408V15.9852H3.99275V14.0065H5.97143V2.13444H3.99275V0.155762ZM13.8861 4.11311H11.9075V0.155762H9.92878V4.11311H7.95011V11.0385H9.92878V15.9852H11.9075V11.0385H13.8861V4.11311Z"
                fill={currentPath=="/Markets" ? "#0060FF" : "white"}
              />
            </svg>
            <span className="">Market Insights</span>
          </div>
        </Link>
        <Link
          href={"/Watchlist"}
          className={" hover:bg-[#062141] text-primary rounded-lg " + (currentPath=="/Watchlist" ? " bg-[#062141] text-primary" : "")}
        >
          <div className="flex items-center gap-4 py-3 px-6 rounded-2xl font-medium w-[208px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
            >
              <path
                d="M3.99275 0.155762H2.01408V2.13444H0.0354004V14.0065H2.01408V15.9852H3.99275V14.0065H5.97143V2.13444H3.99275V0.155762ZM13.8861 4.11311H11.9075V0.155762H9.92878V4.11311H7.95011V11.0385H9.92878V15.9852H11.9075V11.0385H13.8861V4.11311Z"
                fill={currentPath=="/Watchlist" ? "#0060FF" : "white"}
              />
            </svg>
            <span className="">Watchlist</span>
          </div>
        </Link>
        <Link
          href={"/Transactions"}
          className=" hover:bg-[#062141] rounded-lg"
        >
          <div className="flex items-center gap-4 py-3 px-6 rounded-2xl font-medium w-[208px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M16.509 6.551C16.5868 6.3633 16.6071 6.15676 16.5674 5.9575C16.5278 5.75825 16.4299 5.57524 16.2862 5.43163L11.1514 0.296875L9.69933 1.74898L13.0811 5.13073H0.155881V7.18463H15.5601C15.7632 7.18468 15.9618 7.12451 16.1307 7.01173C16.2996 6.89894 16.4312 6.73861 16.509 6.551V6.551ZM0.233929 9.87216C0.156184 10.0599 0.135859 10.2664 0.175527 10.4657C0.215195 10.6649 0.313073 10.8479 0.456777 10.9915L5.59153 16.1263L7.04364 14.6742L3.66189 11.2924H16.5871V9.23853H1.18283C0.979705 9.23834 0.781095 9.29846 0.612168 9.41126C0.443241 9.52406 0.311601 9.68447 0.233929 9.87216V9.87216Z"
                fill={currentPath=="/Transactions" ? "#0060FF" : "white"}
              />
            </svg>
            <span>Transactions</span>
          </div>
        </Link>
        <Link
          href={"/BalanceHistory"}
          className=" hover:bg-[#062141] rounded-lg"
        >
          <div className="flex items-center gap-4 py-3 px-6 rounded-2xl font-medium w-[208px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M16.509 6.551C16.5868 6.3633 16.6071 6.15676 16.5674 5.9575C16.5278 5.75825 16.4299 5.57524 16.2862 5.43163L11.1514 0.296875L9.69933 1.74898L13.0811 5.13073H0.155881V7.18463H15.5601C15.7632 7.18468 15.9618 7.12451 16.1307 7.01173C16.2996 6.89894 16.4312 6.73861 16.509 6.551V6.551ZM0.233929 9.87216C0.156184 10.0599 0.135859 10.2664 0.175527 10.4657C0.215195 10.6649 0.313073 10.8479 0.456777 10.9915L5.59153 16.1263L7.04364 14.6742L3.66189 11.2924H16.5871V9.23853H1.18283C0.979705 9.23834 0.781095 9.29846 0.612168 9.41126C0.443241 9.52406 0.311601 9.68447 0.233929 9.87216V9.87216Z"
                fill={currentPath=="/BalanceHistory" ? "#0060FF" : "white"}
              />
            </svg>
            <span>Balance History</span>
          </div>
        </Link>
        <Link
          href={"/Transfer"}
          className=" hover:bg-[#062141] rounded-lg"
        >
          <div className="flex items-center gap-4 py-3 px-7 rounded-2xl font-medium w-[208px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
            >
              <path
                d="M14.4032 13.3561C14.0281 12.4675 13.4837 11.6604 12.8004 10.9797C12.1192 10.297 11.3122 9.75269 10.424 9.37683C10.416 9.37286 10.4081 9.37087 10.4001 9.36689C11.639 8.47201 12.4444 7.01435 12.4444 5.36976C12.4444 2.64536 10.2371 0.437988 7.51266 0.437988C4.78825 0.437988 2.58088 2.64536 2.58088 5.36976C2.58088 7.01435 3.38627 8.47201 4.62518 9.36888C4.61723 9.37286 4.60928 9.37484 4.60132 9.37882C3.71042 9.75467 2.91099 10.2936 2.22492 10.9816C1.54225 11.6629 0.997951 12.4699 0.622093 13.358C0.25285 14.2276 0.0537095 15.1598 0.0354501 16.1043C0.0349193 16.1256 0.0386421 16.1467 0.0463991 16.1664C0.0541561 16.1862 0.0657904 16.2042 0.0806164 16.2194C0.0954425 16.2346 0.11316 16.2467 0.132726 16.2549C0.152291 16.2632 0.173309 16.2674 0.19454 16.2674H1.38771C1.47521 16.2674 1.54481 16.1978 1.5468 16.1123C1.58657 14.5771 2.20305 13.1393 3.29281 12.0495C4.42036 10.922 5.91779 10.3015 7.51266 10.3015C9.10753 10.3015 10.605 10.922 11.7325 12.0495C12.8223 13.1393 13.4387 14.5771 13.4785 16.1123C13.4805 16.1998 13.5501 16.2674 13.6376 16.2674H14.8308C14.852 16.2674 14.873 16.2632 14.8926 16.2549C14.9122 16.2467 14.9299 16.2346 14.9447 16.2194C14.9595 16.2042 14.9712 16.1862 14.9789 16.1664C14.9867 16.1467 14.9904 16.1256 14.9899 16.1043C14.97 15.1538 14.7731 14.2291 14.4032 13.3561V13.3561ZM7.51266 8.79019C6.59988 8.79019 5.7408 8.43423 5.0945 7.78793C4.4482 7.14162 4.09223 6.28254 4.09223 5.36976C4.09223 4.45699 4.4482 3.5979 5.0945 2.9516C5.7408 2.3053 6.59988 1.94934 7.51266 1.94934C8.42544 1.94934 9.28452 2.3053 9.93082 2.9516C10.5771 3.5979 10.9331 4.45699 10.9331 5.36976C10.9331 6.28254 10.5771 7.14162 9.93082 7.78793C9.28452 8.43423 8.42544 8.79019 7.51266 8.79019Z"
                fill={currentPath=="/Markets" ? "#0060FF" : "white"}
              />
            </svg>
            <span>Token Transfer</span>
          </div>
        </Link>
        


        <Link
          href={"/Allowance"}
          className=" hover:bg-[#062141] rounded-lg"
        >
          <div className="flex items-center gap-4 py-3 px-6 rounded-2xl font-medium w-[208px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.07068 3.32178C7.24521 3.32282 6.45385 3.6512 5.87015 4.2349C5.28646 4.81859 4.95808 5.60995 4.95703 6.43542H6.53997C6.53997 5.59092 7.22697 4.90472 8.07068 4.90472C8.91438 4.90472 9.60138 5.59092 9.60138 6.43542C9.60138 6.90872 9.22068 7.25222 8.63895 7.72235C8.44891 7.87123 8.26638 8.02945 8.09205 8.19645C7.30216 8.98554 7.27921 9.82371 7.27921 9.9171V10.445H8.86215L8.86136 9.94401C8.86215 9.93135 8.88747 9.6385 9.21039 9.31638C9.32911 9.19766 9.4787 9.07893 9.63383 8.95388C10.2504 8.45446 11.1835 7.70019 11.1835 6.43542C11.1829 5.60996 10.8548 4.81848 10.2712 4.23472C9.68754 3.65095 8.89614 3.32262 8.07068 3.32178ZM7.27921 11.2365H8.86215V12.8194H7.27921V11.2365Z"
                fill={currentPath=="/Markets" ? "#0060FF" : "white"}
              />
              <path
                d="M8.07047 0.155762C3.7063 0.155762 0.155762 3.7063 0.155762 8.07047C0.155762 12.4346 3.7063 15.9852 8.07047 15.9852C12.4346 15.9852 15.9852 12.4346 15.9852 8.07047C15.9852 3.7063 12.4346 0.155762 8.07047 0.155762ZM8.07047 14.4022C4.57929 14.4022 1.7387 11.5616 1.7387 8.07047C1.7387 4.57929 4.57929 1.7387 8.07047 1.7387C11.5616 1.7387 14.4022 4.57929 14.4022 8.07047C14.4022 11.5616 11.5616 14.4022 8.07047 14.4022Z"
                fill={currentPath=="/Markets" ? "#0060FF" : "white"}
              />
            </svg>
            <span>Allowance</span>
          </div>
        </Link>
        
         
        
      </nav>

      
    </div>
  );
};

export default Sidebar;