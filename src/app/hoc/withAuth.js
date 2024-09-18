'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Web3 from "web3";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const authenticateWallet = async () => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== "undefined") {
          const web3 = new Web3(window.ethereum);
          
          try {
            // Request wallet connection
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();

            // If wallet is connected and account is available
            if (accounts.length > 0) {
              setIsAuthenticated(true);  // Set authenticated state to true
              router.push("/Dashboard");
            } else {
              // Redirect to login if no account is found
              router.push("/");
            }
          } catch (e) {
            // If user denies access or another error occurs
            router.push("/");
          }
        } else {
          // MetaMask is not installed, redirect to login
          router.push("/");
        }
      };

      authenticateWallet();
    }, []);

    // if (!isAuthenticated) {
    //   // Optionally show a loading spinner until authenticated
    //   return <div>Loading...</div>;
    // }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
