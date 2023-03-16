import Head from 'next/head'

import NavBarWallet from './navBarWallet'
import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';

import HomeContent from '@/src/components/home/index'

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
      <React.Fragment>
        <Container component="main" maxWidth="md">
          <HomeContent />
        </Container>
      </React.Fragment>
    </>
  )
}