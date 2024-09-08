interface PetraWallet {
  connect: () => Promise<{ address: string }>;
  account: () => Promise<{ address: string }>;
  isConnected: () => Promise<boolean>;
  signAndSubmitTransaction: (transaction: any) => Promise<any>;
}

interface Window {
  aptos?: PetraWallet;
}
