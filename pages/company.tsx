import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import NavBarWallet from './navBarWallet'

import Company from '@/src/components/company/index';


export default function Home() {
  return (
    <>
      <Head>
        <title>Gratie</title>
        <meta name="description" content="SASS Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarWallet/>
      <Company/>
    </>
  )
}