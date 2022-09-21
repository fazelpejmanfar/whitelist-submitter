import React from 'react'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { EthersContext } from '../context/Connector'
import { sanity, client } from '../lib/sanity'

function Main() {
    const Eth = useContext(EthersContext);
    const [res, setres] = useState('');

    const SignMessage = async() => {
        const balance = await Eth.Provider.getBalance(Eth.address);
        console.log()
        if((Number(balance) / 1e18) >= 0.05) {
        toast.loading("Please Sign the message\nThere is no gas fee")
        const message = "This is my account";
        try {
            const sign = await Eth.Singer.signMessage(message).then((res) => {
                console.log(res)
                setres(res);
                toast.dismiss()
                toast.success("Wallet Submitted");
                sanity(Eth.address);
            })
        } catch (e) {
            toast.dismiss()
            console.log(e)
            toast.error("User Denied");
        }
    } else {
        toast.dismiss()
        toast.error("Not enough Funds\nYou need to have 0.05 ETH in your wallet");   
    }
    }


  return (
    <div className=' text-center flex flex-col justify-center items-center space-y-2 min-h-[350px] w-[90%] md:w-[80%] p-5 bg-[#78A6C8] rounded-lg'>
    {!Eth.address ? (
        <p>
        Please Connect Your Wallet<br></br>
        You need to have 0.05 ETH in your wallet in order to submit your wallet
        </p>
    ) : (
        <>
        <p>
        {Eth.address}
       </p>  


       <button onClick={(e) => {
        e.preventDefault();
        SignMessage();
       }}>
        Submit
       </button>
       {res ? (
        <div className='flex justify-center items-center'>
        <p className='break-all'>
        Signature Hash: <br></br>
          <span className='text-xs'>{res}</span>  <br></br>
          Address added
        </p>
       </div>
       ) : (
        <></>
       )}

        </>
    )}

    
    
    </div>
  )
}

export default Main

