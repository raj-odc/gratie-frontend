import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Akord } from '@akord/akord-js'
import { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import * as anchor from "@project-serum/anchor";

import { Program, Wallet } from "@project-serum/anchor";


import RegForm from '@/src/components/company/form';

import CompanyList from '@/src/components/company/list';
import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { getCompanyLicensePDA, getCompanyRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_pda';
import { createCompanyRewardsBucket, CreateCompanyRewardsBucketForm } from '@/src/gratie_solana_contract/gratie_solana_company';

import GratieSolanaTest from "../../gratie_solana_contract/gratieSolanaContractTest";

// import '@/styles/form.css';

interface Values {
  email: string;
  password: string;
}

declare const window: Window &
  typeof globalThis & {
    solana: any
  }

export default function CompanyForm() {
  const { wallet } = useWallet();
  const { connection } = useConnection();

  const [open, setOpen] = React.useState(false);

  const [validCompany, setValidCompany] = React.useState(false);

  const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const [users, setUsers] = React.useState([]);

  const [walletAddress, setWalletAdresss] = useState("");
  const [Loding, setLoading] = useState(false)
  const [solana, setSolana] = useState({})


  // todo:
  // Check for wallet present, else wallet connect
  // Get all license, -> if this user has already company license 
  //  -> Check for the reward token if its present then promt to list  else create reard token
  //  -> Else -> Add company screen ()
  // Pass the list of licenses to list component ,also show add user


  const initWallet = async () => {
    handleToggle();

    console.log("useWalletuseWallet", wallet);
    console.log("user--", connection);
    const solanaPubKey = localStorage.getItem('solanaPubKey')

    const program = await connectToGratieSolanaContract();

    console.log("program", program);
    setIsWalletConnected(true)
    // this gets all the licenses
    const allLicenses = await program.account.companyLicense.all();
    console.log(allLicenses);
    const userLicenses: any = allLicenses.filter(p => p.account.owner.toString() == solanaPubKey);
    console.log("userLicenses", userLicenses.length);
    setIsWalletConnected(true)
    setValidCompany(userLicenses.length > 0)

    if (userLicenses.length > 0) {
      const companyLicensePDA = getCompanyLicensePDA(program, userLicenses[0].account.name);

      let companyRewardsBucket;
      try {
        companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePDA);
      }
      catch {
        console.log("Company rewards not yet created")
      }
      // if (companyRewardsBucket) {
      // const provider = anchor.AnchorProvider.env();
      // anchor.setProvider(provider);
      // const wallet = anchor.AnchorProvider.env().wallet as Wallet;
      // console.log('program',program);
      console.log(wallet)
      // console.log("solana", window.solana.wallet);

      const companyRewardsBucketForm: CreateCompanyRewardsBucketForm = {
        tokenName: 'test',
        tokenSymbol: 'test',
        tokenMetadataJsonUrl: 'https://test.com/testconfig.json',

      };

      await createCompanyRewardsBucket(program, wallet?.adapter.publicKey!, 'test', companyRewardsBucketForm);
      console.log("companyRewardsBucket", companyRewardsBucket)
      // }

      console.log("companyRewardsBucket", companyRewardsBucket);

    }


    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };



  const createRewardToken = async () => {
    console.log("wallet", wallet)


    if (wallet) {
      const program = await connectToGratieSolanaContract();
      const allLicenses = await program.account.companyLicense.all();
      console.log(allLicenses);
      console.log("connection", program)
      console.log("wallet", wallet)

      const companyRewardsBucketForm: CreateCompanyRewardsBucketForm = {
        tokenName: 'test',
        tokenSymbol: 'test',
        tokenMetadataJsonUrl: 'https://test.com/testconfig.json',

      };

      const companyRewards = await createCompanyRewardsBucket(program, (wallet as any).adapter.publicKey, 'test comopany1', companyRewardsBucketForm);
      console.log("companyRewards", companyRewards);
    }
    else {
      confirm("First connect to the wallet");
    }
    // const provider = anchor.AnchorProvider.env();
    // anchor.setProvider(provider);
    // const wallet = anchor.AnchorProvider.env().wallet as Wallet;
    // console.log('program',program);
    console.log(wallet)
    // console.log("solana", window.solana.wallet);


    // console.log("companyRewardsBucket", companyRewardsBucket)
    // console.log("createRewardToken", createRewardToken)
  }

  const getAllUser = async () => {
    console.log("getAllUser", getAllUser)
  }

  return (
    <div className=''>
      {/* Here we test the contract */}

      <React.Fragment>
        {!isWalletConnected ?
          <Container className='form-outer' component="main" maxWidth="md">
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
            <Button
              onClick={initWallet}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 4 }}
            >
              Connect With Wallet
            </Button>
          </Container>
          : validCompany ? <CompanyList /> : <RegForm />
        }

        <GratieSolanaTest />

        <Button
          onClick={createRewardToken}
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 6, mb: 4 }}
        >
          Create the Company Reward Token
        </Button>

        <Button
          onClick={getAllUser}
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 6, mb: 4 }}
        >
          List the User
        </Button>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>


    </div>
  );
}