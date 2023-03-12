import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NavBarWallet from './navBarWallet'

import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Grid } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function User() {
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
        <Container className='' component="main" maxWidth="md">
          <Box component="form" noValidate sx={{ mt: 12 }}>
              <Grid container spacing={2}>
              <p className='company-welcome-text'>
                  Development in progress!
              </p>
              </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </>
  )
}