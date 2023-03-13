import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import NavBar from './navBar'

import { HomeView } from "./../src/views";
import ConnectWallet from "../src/views/WalletView/connectWallet";
import LandingPage from './landing/landingPage'


export default function Home() {
  return (
    <>
      <Head>
        <title>Gratie</title>
        <meta name="description" content="SASS Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <LandingPage />
    </>
  )
}
