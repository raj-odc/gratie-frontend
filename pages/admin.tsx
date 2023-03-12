import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NavBar from './navBar'

import AdminForm from '@/src/components/admin/index';

import SolanaTest from '@/src/components/solana-test';
import Head from 'next/head';
import NavBarWallet from './navBarWallet';



export default function Admin() {
  return (
    <>
      <Head>
        <title>Gratie</title>
        <meta name="description" content="SASS Product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarWallet/>
      <AdminForm/>
    </>
  );
}