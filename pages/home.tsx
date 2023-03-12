import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NavBarWallet from './navBarWallet'
import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';


import Main from '@/src/components/company/main';

const inter = Inter({ subsets: ['latin'] })

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
                <p className='company-welcome-text'>
                    Welcome to next generation crypto reward management system !
                </p>
                <Grid className='company-main-content' item xs={12} md={12}>
                    <Link href="/company" passHref>
                        <Button className='company-enterprise-button' >
                            I am an Enterprise
                        </Button>
                    </Link>
                    <Link href="/user" passHref>
                        <Button className='company-user-button'>
                            I work for an Enterprise
                        </Button>
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Container>
      </React.Fragment>
    </>
  )
}