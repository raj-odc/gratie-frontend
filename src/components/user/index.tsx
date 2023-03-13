import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";


import Container from '@mui/material/Container';
import { Box, Button, Grid, ListItem, TextField, Typography } from '@mui/material';

import { useState } from 'react'

import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { getCompanyLicensePDA, getCompanyRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_pda';

import { transferTokensToUser } from "@/src/gratie_solana_contract/gratie_solana_company";

import { createUser, createUserRewardsBucket, getUser } from '@/src/gratie_solana_contract/gratie_solana_user';
import { faker } from '@faker-js/faker';
import { useWallet } from '@solana/wallet-adapter-react';
import { BN } from '@project-serum/anchor';

// import '@/styles/form.css';

  // todo:
  // Add tier ID button


export default function Users(props:any) {
  const wallet = useWallet();

  const [open, setOpen] = React.useState(false);

  const [isTokenClaimed, setIsTokenClaimed] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const transferToken = async() => {
    handleToggle();
    const userId = sha256.hash(userEmail).substring(0, 16);

    if(wallet && wallet.publicKey){
        const publicKey:any = wallet.publicKey;
        const program = await connectToGratieSolanaContract();
        try{
          const transferToken = await transferTokensToUser(program, publicKey, new BN(1), companyName, userId);
          console.log("transferToken", transferToken);
        }
        catch(err) {
          alert(err);
        }
    } else {
        alert("wallet should be present")
    }
    handleClose();
    return;
  };


  const claimToken = async() => {
    handleToggle();
    console.log("props", wallet)

    console.log("comoany",companyName);
    console.log('user', userEmail);
    const userId = sha256.hash(userEmail).substring(0, 16);

    if(wallet && wallet.publicKey){
        const publicKey:any = wallet.publicKey;
        const program = await connectToGratieSolanaContract();
        // const usersList = await getUser(program, publicKey, userId);
        try{
          const rewardBucket = await createUserRewardsBucket(program, publicKey, companyName, userId)
          console.log("rewardBucket", rewardBucket);
        }
        catch(err) {
          alert(err);
        }
    } else {
        alert("wallet should be present")
    }
    handleClose();
    return;
  };

  return (
    <div>
      <React.Fragment>
        <Container className='form-outer' component="main" maxWidth="md">

          <Box component="form" noValidate sx={{ mt: 6 }}>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="CompanyName"
                  label="Name Of the Company"
                  fullWidth
                  autoComplete="CompanyName"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="userEmail"
                  label="userEmail"
                  fullWidth
                  autoComplete="userEmail"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Button
              onClick={claimToken}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 4 }}
            >
              Claim Reward
            </Button>

            <Button
              onClick={transferToken}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 4 }}
            >
              Claim NFT
            </Button>
          </Box>
          </Container>
      </React.Fragment>
    </div>
  );
}