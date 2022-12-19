import React from 'react'
import { useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { EthersContext } from '../context/Connector'
import { AddAddress, client } from '../lib/sanity'

function Main() {
    const Eth = useContext(EthersContext);
    const [res, setres] = useState('');
    const [isSubmitted, setisSubmitted] = useState(false);
    const SignMessage = async() => {
        const balance = await Eth.Provider.getBalance(Eth.address);
        if((Number(balance) / 1e18) >= 0.05) {
        toast.loading("Please Sign the message\nThere is no gas fee")
        const message = "This is my account";
        try {
            const sign = await Eth.Singer.signMessage(message).then(async(res) => {
                setres(res);
                await AddAddress("viktuY5px0NByhfmNuJr63", Eth.address);
                await getdata();
                toast.dismiss()
                toast.success("Wallet Submitted");
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
    };

    const getdata = async() => {
        const data = await client.fetch("*[_type == 'Addresses']");
        let lowered = data[0].address.map((addr) => {
            return (
                addr.toLowerCase()
            )
        });
        setisSubmitted(lowered.includes(Eth.address.toLowerCase()))
      };


    useEffect(() => {
        if(Eth.address) {
            getdata();
          }
    }, [Eth.address]);


  return (
    <div className=' text-center flex flex-col justify-center items-center space-y-2 min-h-[350px] w-[90%] md:w-[80%] p-5'>
    {!Eth.address ? (
        <p>
        Please Connect Your Wallet<br></br>
        You need to have 0.05 ETH in your wallet in order to submit your wallet
        </p>
    ) : (
        <>
        <p className={`${isSubmitted ? "hidden" : "flex"}`}>
        {Eth.address}
       </p>  

       {!isSubmitted ? (
        <>
        <button onClick={(e) => {
        e.preventDefault();
        SignMessage();
       }}>
        Submit
       </button>
       <p>
        You need to have 0.05 ETH in your wallet in order to submit your wallet
        </p>
       </>
       ) : (
        <p className='break-all'>
          You Already Submitted Your Wallet
        </p>
       )}
       </>
    )}



    
    
    </div>
  )
}

export default Main

