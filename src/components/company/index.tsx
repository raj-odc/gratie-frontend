import React, { useState, useEffect } from 'react'

import Container from '@mui/material/Container';

import { Backdrop, Button, CircularProgress } from '@mui/material';

import { delay } from '@/src/utils/util';
import Loading from '../Loading';
import ModalBox from '../Modal';

import Web3 from 'web3';

import CompanyTab from '@/src/components/company/companyTab'

declare const window: Window &
  typeof globalThis & {
    ethereum: any
  }

export default function CompanyIndex() {

  const [waitingPeriodOver, setWaitingPeriodOver] = React.useState(false);
  
  const [isDataFetched, setisDataFetched] = React.useState(false);
  const [companyLicense, setCompanyLicense] = React.useState(undefined);
  const [companyReward, setCompanyReward] = React.useState(undefined);
  const [usersList, setUsersList] = React.useState([]);

  const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const [tierList, setTierList] = React.useState({});

  const [openLoading, setOpenLoading] = React.useState(false);

  const [account, setAccount] = useState({})
  let [web3, setWeb3] = useState({})

  const handleLoaderToggle = (status:boolean) => {
    setOpenLoading(status)
  }

  const fetchContractData = async() => {
    handleLoaderToggle(true);
    const waiting = await delay(2000);
    setWaitingPeriodOver(true)
    if(isWalletConnected){
        const publicKey:any = window?.ethereum?.selectedaddress;
        // const program = await connectToGratieSolanaContract();
        // const tiers = await getAllTiers(program)
        // setTierList(tiers)
        // const validLicense:any = await getCompanyLicense(program, publicKey)
        // if (validLicense) {
        //     setCompanyLicense(validLicense);
        //     if(validLicense.account.verified) {
        //         const companyRewardsBucket:any = await getCompanyReward(program, validLicense.account.name)
        //         if(companyRewardsBucket) {
        //             setCompanyReward(companyRewardsBucket);
                    
        //             const usersList = await getCompanyUser(program, publicKey);
        //             setUsersList(usersList);
        //         }
        //     }
        // }
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

  // const getCompanyReward = async(program:any, companyName:any) => {
  //   const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  //   let companyRewardsBucket;
  //   try {
  //       companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePDA);
  //   }
  //   catch {
  //       console.log("Company rewards not yet created")
  //   }
  //   return companyRewardsBucket;
  // }

  useEffect(() => {
    activate().then(() => {
      console.log("fetching Data")
    });
  }, []);

  const checkAccount = async() => {
    let web3 = new Web3(window.ethereum)
    setWeb3(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    setIsWalletConnected(true)
  }

  const activate = async() => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        checkAccount()
      } catch (err) {
        console.log('user did not add account...', err)
      }
    }
  }

  return (
    <div className=''>
      <React.Fragment>
      {
         !isDataFetched && waitingPeriodOver && <Container className='fetch-block-data' component="main">
              <Button
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
              // license = {companyLicense} 
              // reward = {companyReward} 
              // users = {usersList}
              // tiers = {tierList}
            /> 
           }
        </Container>
        }
        <Loading open={openLoading} handleClose={handleLoaderToggle} />
      </React.Fragment>
    </div>
  );
}