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
import { delay } from '@/src/utils/util';
import Loading from '../Loading';
import ModalBox from '../Modal';


export default function CompanyIndex() {

  const { wallet } = useWallet();
  const [waitingPeriodOver, setWaitingPeriodOver] = React.useState(false);
  
  const [isDataFetched, setisDataFetched] = React.useState(false);
  const [companyLicense, setCompanyLicense] = React.useState(undefined);
  const [companyReward, setCompanyReward] = React.useState(undefined);
  const [usersList, setUsersList] = React.useState([]);

  const [tierList, setTierList] = React.useState({});

  const [openLoading, setOpenLoading] = React.useState(false);

  const handleLoaderToggle = (status:boolean) => {
    setOpenLoading(status)
  }

  const fetchContractData = async() => {
    handleLoaderToggle(true);
    const waiting = await delay(2000);
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
                    
                    const usersList = await getCompanyUser(program, publicKey);
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
    handleLoaderToggle(false);
    return;
  };

  const getCompanyLicense = async(program:any, publicKey:any) => {
    try {
      const allLicenses = await program.account.companyLicense.all();
      console.log(allLicenses);
      const userLicenses: any = allLicenses.filter((lic: any) => lic.account.owner.toString() == publicKey.toString());
      console.log("userLicenses", userLicenses.length);
      return userLicenses && userLicenses[userLicenses.length-1]
    }
    catch(err) {
        alert(err);
        return null;
    }
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
         !isDataFetched && waitingPeriodOver && <Container className='fetch-block-data' component="main">
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
        <Loading open={openLoading} handleClose={handleLoaderToggle} />
      </React.Fragment>
    </div>
  );
}