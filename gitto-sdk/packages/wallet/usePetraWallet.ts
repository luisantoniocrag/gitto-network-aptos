import { useState, useEffect } from 'react';

export default function usePetraWallet() {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [petraAvailable, setPetraAvailable] = useState(false);

  // Function to connect with the wallet
  const connectToPetra = async () => {
    if (window.aptos) {
      try {
        const result = await window.aptos.connect();
        setAccount(result.address);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to Petra wallet:', error);
      }
    } else {
      console.log('Petra wallet is not installed, please install it');
    }
  };

  useEffect(() => {
    // Verify if the Petra Wallet is available
    if (typeof window !== "undefined" && window.aptos) {
      setPetraAvailable(true);

      // Verify is you are currenlte logged in
      const checkConnection = async () => {
        const isAlreadyConnected = await window.aptos?.isConnected();
        if (isAlreadyConnected) {
          const account = await window.aptos?.account();
          setAccount(account?.address);
          setIsConnected(true);
        }
      };

      checkConnection();
    } else {
      console.log('Petra wallet not available on window object');
      setPetraAvailable(false);
    }
  }, []);

  return { account, isConnected, petraAvailable, connectToPetra };
}
