import * as React from 'react';
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";


import Container from '@mui/material/Container';
import { Box, Button, Grid, ListItem, TextField, Typography } from '@mui/material';

import { useState } from 'react'

import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { getCompanyLicensePDA, getCompanyRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_pda';

import { listCompanyLicenses, getAllVerifiedLicenses, getAllPendingLicenses } from "@/src/gratie_solana_contract/gratie_solana_company";

import List from './list'
import Link from 'next/link';
import { createUser } from '@/src/gratie_solana_contract/gratie_solana_user';
import { faker } from '@faker-js/faker';
import { useWallet } from '@solana/wallet-adapter-react';

// import '@/styles/form.css';

  // todo:
  // Add tier ID button


export default function Users(props:any) {
  const wallet = useWallet();

  const [open, setOpen] = React.useState(false);

  const [email, setEmail] = React.useState('');

  const [openAddUser, setOpenAddUser] = React.useState(false);

  const handleClick = async() => {
    console.log("wallet", wallet)
    if(!email){
      alert('Enter user email to add')
      return false;
    } 
    const userId = sha256.hash(email).substring(0, 16);
    const password = faker.internet.password()

    const program = await connectToGratieSolanaContract();
    if(wallet && wallet.publicKey){
      const companyName = props.license.account.name
      const user = await createUser(program, wallet.publicKey, companyName, {
        userId: userId,
        encryptedPassword: password,
        encryptedPasswordAlgorithm: 0,
        encryptedPasswordSalt: password,
      });
      console.log(user)
    } else {
      console.error("CAN'T RUN TESTS: No wallet connected");
    }
    
  }

console.log("props", props)
  return (
    <div className=''>
      <Button
        onClick={() => {setOpenAddUser(true)}}
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 6, mb: 4 }}
      >
        Invite user
      </Button>
       {
        props.users.length > 0 &&
        <Grid item xs={12} sx={{ margin:'auto', pl:10, pr:5}}>
            <Typography component="h1" variant="h5">
              List users        
            </Typography>
             First User: { props.users[props.users.length-1].account.userId }
            </Grid>}
        <Container className='form-outer' component="main" maxWidth="md">
        {(openAddUser || props.users.length == 0) && <Box component="form" noValidate sx={{ mt: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="email"
                label="email"
                fullWidth
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                variant="standard"
              />
            </Grid>
            
          </Grid>
          <Button
            onClick={handleClick}
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 6, mb: 4 }}
          >
            Invite user
          </Button>
        </Box>}
      </Container>
    </div>
  );
}