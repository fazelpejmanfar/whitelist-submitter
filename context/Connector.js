import { createContext, useState } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
//import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3Modal from "web3modal";
import { toast } from 'react-hot-toast'



export const EthersContext = createContext({});

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      display: {
        name: "Wallet Connect",
        description: "Scan qrcode with your mobile wallet"
      },
      options: {
        infuraId: "INFURA_ID" // required
      }
    },
   //coinbasewallet: {
   //    package: CoinbaseWalletSDK, // Required
   //    options: {
   //      appName: "Fazel", // Required
   //      infuraId: "INFURA_ID", // Required
   //      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
   //      chainId: 1, // Optional. It defaults to 1 if not provided
   //      darkMode: true // Optional. Use dark theme, defaults to false
   //    }
   //  },
   // binancechainwallet: {
   //   package: true
   // }
  };



export default function Wrapper({ children }) {


  const [address, setaddress] = useState();
  const [isConnected, setisConnected] = useState(false);
  const [Singer, setSigner] = useState();
  const [Provider, setProvider] = useState();

  const connect = async () => {
    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: false, // optional
        providerOptions,
        theme: 'dark'
      });
      try {
        toast.loading("Connecting...")
        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        setProvider(provider);
        const signer = await provider.getSigner();
        setSigner(signer);
        const account = await provider.listAccounts();
        setaddress(account[0])
        setisConnected(true);
        toast.dismiss();
        toast.success(`Connected to ${provider.connection.url === 'metamask' ? "MetaMask" : "Wallet Connect"}`);
      } catch (e) {
        toast.dismiss();
        toast.error(e.message)
      }
  };

  const disconnect = () => {
    setaddress();
    setisConnected(false);
  };

  return (
    <EthersContext.Provider value={{ connect, disconnect, address, isConnected, Singer, Provider }}>
      {children}
    </EthersContext.Provider>
  );
}
