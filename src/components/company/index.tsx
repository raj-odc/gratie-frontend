import * as React from 'react';

import Container from '@mui/material/Container';

import { useEffect, useState } from 'react'

import List from './list'
import { profile } from 'console';
import { useWallet } from '@solana/wallet-adapter-react';

import CompanyList from '@/src/components/company/list';
import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { getCompanyLicensePDA, getCompanyRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_pda';
import { createCompanyRewardsBucket, CreateCompanyRewardsBucketForm, getCompanyRewardsBucketForCompany, listCompanyLicenses } from '@/src/gratie_solana_contract/gratie_solana_company';
import { getCompanyUser } from '@/src/gratie_solana_contract/gratie_solana_user';
import { Backdrop, CircularProgress } from '@mui/material';

import CompanyForm from '@/src/components/company/companyForm';

import CompanyTab from '@/src/components/company/companyTab'
import { getAllTiers } from '@/src/gratie_solana_contract/gratie_solana_tier';

// todo:
// Add tier ID button

export default function Admin() {

  const { wallet } = useWallet();

  const [open, setOpen] = React.useState(false);

  const [loggedIn, setLoggedId] = React.useState(false);
  
  const [isDataFetched, setisDataFetched] = React.useState(false);
  const [companyLicense, setCompanyLicense] = React.useState(undefined);
  const [companyReward, setCompanyReward] = React.useState(undefined);
  const [usersList, setUsersList] = React.useState([]);

  const [tierList, setTierList] = React.useState({});


  const [isLicenseVerified, setIsLicenseVerified] = React.useState(false);

  

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event:any, newTabIndex:number) => {
    setTabIndex(newTabIndex);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const updateVerifiedStatus = (status:boolean) => {
    setIsLicenseVerified(status)
  }

  function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

  const fetchContractData = async() => {
    handleToggle();
    await sleep(3000);
    if(wallet && wallet?.adapter.publicKey){
        const publicKey:any = wallet?.adapter.publicKey;
        setLoggedId(true);
        const program = await connectToGratieSolanaContract();
        const tiers = await getAllTiers(program)
        setTierList(tiers)
        const validLicense:any = await getCompanyLicense(program, publicKey)
        
        console.log("publicKey", program)
        if (validLicense) {
            setIsLicenseVerified(validLicense.account.verified)
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
        alert("wallet should be present")
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
    fetchContractData();
  }, []);

// state: license, licenseVerified, rewardtoken, companyUsers, 

  // Todo:
  // 1) Company license present ah ? -> create company Reward bucket form
  // 2) else -> open form for registration
  // 3) create user form -> create user bucket reward
  // 4) list of users for the company.



  return (
    <div className=''>
      <React.Fragment>
        { 
        isDataFetched && <Container className='' component="main" maxWidth="md">
           { companyLicense ? 
            <CompanyTab handleChange = {fetchContractData} license = {companyLicense} reward = {companyReward} users = {usersList}/> 
            : <CompanyForm tiers={tierList} handleChange = {updateVerifiedStatus}/>
           }
        </Container>
        }
        {/* {
         isDataFetched && !companyLicense && isLicenseVerified && <Container className='form-outer' component="main" maxWidth="md">
                Need to Approve the License, waiting for Approval
            </Container>
        } */}
        
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