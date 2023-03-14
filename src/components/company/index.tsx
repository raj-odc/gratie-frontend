import * as React from 'react';

import Container from '@mui/material/Container';

import { useEffect, useState } from 'react'

import { useWallet } from '@solana/wallet-adapter-react';

import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { getCompanyLicensePDA, getCompanyRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_pda';
import { getCompanyUser } from '@/src/gratie_solana_contract/gratie_solana_user';
import { Backdrop, Button, CircularProgress } from '@mui/material';

import CompanyTab from '@/src/components/company/companyTab'
import { getAllTiers } from '@/src/gratie_solana_contract/gratie_solana_tier';


export default function CompanyIndex() {

  const { wallet } = useWallet();

  const [open, setOpen] = React.useState(false);

  const [waitingPeriodOver, setWaitingPeriodOver] = React.useState(false);
  
  const [isDataFetched, setisDataFetched] = React.useState(false);
  const [companyLicense, setCompanyLicense] = React.useState(undefined);
  const [companyReward, setCompanyReward] = React.useState(undefined);
  const [usersList, setUsersList] = React.useState([]);

  const [tierList, setTierList] = React.useState({});


  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

  const fetchContractData = async() => {
    handleToggle();
    const waiting = await sleep(2000)
    setWaitingPeriodOver(true)
    if(wallet && wallet?.adapter.publicKey){
        const publicKey:any = wallet?.adapter.publicKey;
        const program = await connectToGratieSolanaContract();
        const tiers = await getAllTiers(program)
        setTierList(tiers)
        const validLicense:any = await getCompanyLicense(program, publicKey)
        if (validLicense) {
            setCompanyLicense(validLicense);
            if(validLicense.account.verified) {
                const companyRewardsBucket:any = await getCompanyReward(program, validLicense.account.name)
                if(companyRewardsBucket) {
                    setCompanyReward(companyRewardsBucket);
                    console.log("publicKey", program)

                    const usersList = await getCompanyUser(program, publicKey);
                    console.log("usersList", usersList);
                    setUsersList(usersList);
                }
            }
        }
        setisDataFetched(true);
    } else {
      confirm("Please connect with your wallet");
      console.log("wallet loading, please wait")
        // alert("wallet should be present")
    }
    handleClose();
    return;
  };

  const getCompanyLicense = async(program:any, publicKey:any) => {
    const allLicenses = await program.account.companyLicense.all();
    console.log(allLicenses);
    const userLicenses: any = allLicenses.filter((lic: any) => lic.account.owner.toString() == publicKey.toString());
    console.log("userLicenses", userLicenses.length);
    return userLicenses && userLicenses[userLicenses.length-1]
  }

  const getCompanyReward = async(program:any, companyName:any) => {
    const companyLicensePDA = getCompanyLicensePDA(program, companyName);
    let companyRewardsBucket;
    try {
        companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePDA);
    }
    catch {
        console.log("Company rewards not yet created")
    }
    return companyRewardsBucket;
  }

  useEffect(() => {
    fetchContractData().then(() => {
      console.log("fetching Data")
    });
  }, []);

  const getBlockChainData = async() => {
    if(wallet && wallet?.adapter.publicKey){
      const data = await fetchContractData();
      console.log("data", data)
    }
    else {
      confirm("Please connect with your wallet");
      return false;
    }
    
  }

  return (
    <div className=''>
      <React.Fragment>
      {
         !isDataFetched && waitingPeriodOver && <Container className='form-outer' component="main" maxWidth="md">
              <Button
                onClick={getBlockChainData}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 6, mb: 4 }}
              >
                Please click here to get Blockchain data
              </Button>
            </Container>
        }
        { 
        isDataFetched && <Container className='' component="main" maxWidth="md">
           { 
            <CompanyTab 
              showProfile={companyLicense ? true : false} 
              handleChange = {fetchContractData} 
              license = {companyLicense} 
              reward = {companyReward} 
              users = {usersList}
              tiers = {tierList}
            /> 
           }
        </Container>
        }
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