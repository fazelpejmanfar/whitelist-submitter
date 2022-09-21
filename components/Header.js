import React from 'react'
import { useContext } from 'react'
import { EthersContext } from '../context/Connector'

function Header() {
    const Eth = useContext(EthersContext);
  return (
    <div className='w-full h-20 flex justify-between items-center p-5 absolute top-0 border-b-2'>
    <h1>
    Whitelist Submitter
    </h1>

    <button onClick={(e) => {
        e.preventDefault();
        if(!Eth.isConnected) {
        Eth.connect()
    } else {
        Eth.disconnect();
    }
    }}>
    {Eth.isConnected ? "Disconnect" : "Connect Wallet"}
    </button>
    </div>
  )
}

export default Header