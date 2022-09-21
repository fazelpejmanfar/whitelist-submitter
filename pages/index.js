import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import Header from '../components/Header';
import Main from '../components/Main';
import { EthersContext } from '../context/Connector'

export default function Home() {
  const Eth = useContext(EthersContext);


  
  return (
    <div className='flex flex-col w-full min-h-screen justify-center items-center bg-[#326789]'>
      <Head>
        <title>Whitelist Submitter</title>
        <meta name="description" content="Submit Your Address for WL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Main/>

 
      
    </div>
  )
}

