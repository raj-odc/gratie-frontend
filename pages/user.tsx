import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import NavBarWallet from './navBarWallet'

import UserForm from '@/src/components/user/index';
import React from 'react';
import { Box, Container, Grid } from '@mui/material';


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
        <Container className='' component="main" maxWidth="md">
          <Box component="form" noValidate sx={{ mt: 12 }}>
              <Grid container spacing={2}>
              </Grid>
              <UserForm/>
          </Box>
        </Container>
      </React.Fragment>
    </>
  )
}