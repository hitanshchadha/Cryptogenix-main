'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Web3 from "web3";

const withAuth = (WrappedComponent, requireAuth = false) => {
  const AuthenticatedComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
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
            }
          } catch (e) {
            console.error(e);
          }
        }
        
        setLoading(false); // Done checking authentication
      };

      authenticateWallet();
    }, []);

    useEffect(() => {
      // Redirect logic only if authentication is required
      if (!loading && requireAuth && !isAuthenticated) {
        router.push("/");  // Redirect to login if not authenticated
      }
    }, [loading, isAuthenticated, router, requireAuth]);

    // if (loading) {
    //   // Show a loading spinner or message until authentication is verified
    //   return <div>Loading...</div>;
    // }

    // Render the wrapped component if authenticated or no authentication is required
    return <WrappedComponent {...props} />;
  };

  // Add a display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;

