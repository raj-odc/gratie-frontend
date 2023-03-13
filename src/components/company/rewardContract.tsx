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
import { redirect } from 'next/navigation';
import { useState } from 'react'
import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { createCompanyLicense, CreateCompanyLicenseForm, createCompanyRewardsBucket, CreateCompanyRewardsBucketForm, getCompanyRewardsBucketForCompany } from '@/src/gratie_solana_contract/gratie_solana_company';
import { useWallet } from '@solana/wallet-adapter-react';

import UploadFile from '@/src/components/uploadFileS3';
import {parseDataFromJsonUrl, uploadMetaDataToS3} from '@/src/utils/uploadMetaDataToS3';

// import '@/styles/form.css';

interface Values {
  email: string;
  password: string;
}

declare const window: Window &
  typeof globalThis & {
    solana: any
  }

export default function RewardContract(props:any) {


  console.log("props", props);
  const wallet = useWallet();

  const [open, setOpen] = React.useState(false);

  const [logoUrl, setLogoUrl] = React.useState('');

  const [rewardData, setRewardData] = React.useState({});

  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const [formObject, setFormObject] = useState({
    name: "",
    symbol: "",
    description: "",
  });

  const [rewards, setRewards] = React.useState({});


  React.useEffect(() => {
    if (props.reward && props.reward.tokenName && Object.keys(rewardData).length == 0) {
      handleToggle();
      parseDataFromJsonUrl(props.reward.tokenMetadataJsonUri).then((data) => {
        console.log('data', data);
        setRewardData(data)
        handleClose()
      });  
    } 
    if(formSubmitted){
      window.location.replace('/');
    }
  })
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const onValChange = (event: any) => {
    const value = (res: any) => ({
      ...res,
      [event.target.id]: event.target.value,
    });
    setFormObject(value);
  };

  const updateImageUrl = (url:string) =>{
    console.log("setLogoUrl", setLogoUrl);
    if(url && url!=''){
      setLogoUrl(url)
    }
  }

  const showContractInfo = async () => {
    handleToggle()
    if (props.contract && props.contract.token) {
      const jsonData = await parseDataFromJsonUrl(props.contract.token.tokenMetadataJsonUri);
      return (<div>{jsonData.name}<img src={jsonData.image}></img></div>)
    } else {
      return <div>No data</div>
    }
  }

   const getMetaJson = async (name:string, symbol:string, description:string) => {
      const jsonData =  {
        "name": name,
        "symbol": symbol,
        "description": description,
        "seller_fee_basis_points": 5,
        "external_url": "",
        "edition": "",
        "background_color": "000000",
        "image": logoUrl
      }
      const jsonUrl = await uploadMetaDataToS3(jsonData);
      return [jsonUrl, jsonData];
   }

   const createRewardToken = async (name:string, symbol:string, url:string) => {
    if (wallet) {
      console.log("wallet",wallet);
      const program = await connectToGratieSolanaContract();
      // const allLicenses = await program.account.companyLicense.all();
      console.log("program", program);
      const companyName = props.license.account.name
      try {
        const rewards: any = await getCompanyRewardsBucketForCompany(program, companyName)
        if (rewards) {
          confirm("already rewards present for the company");
          return;
        }
      } catch(err:any) {
        console.log("rewards", companyName, rewards);
      }
      const companyRewardsBucketForm: CreateCompanyRewardsBucketForm = {
        tokenName: name,
        tokenSymbol: symbol,
        tokenMetadataJsonUrl: url,
      };
      console.log("companyRewardsBucketForm", companyRewardsBucketForm);
      const companyRewards = await createCompanyRewardsBucket(program, (wallet as any).publicKey, companyName, companyRewardsBucketForm);
      setRewards(companyRewards);
      console.log("companyRewards created", companyRewards);

    }
    else {
      confirm("First connect to the wallet");
    }
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("wallet",wallet);

    if (logoUrl === '') {
      confirm("Please upload the logo before proceed");
      console.log("Please upload the logo before proceed");
      return false;
    }
    const data = new FormData(event.currentTarget);
    const formVal: any = new Object(formObject);
    
    if (formVal['name']=='' || formVal['email']=='' || formVal['tierID']=='' || formVal['evaluation']==''){
      confirm("Please enter all the form values");
      return false;
    }
    handleToggle()

    const [jsonMetadataUrl, jsonMetadata] = await getMetaJson(formVal.name, formVal.symbol, formVal.description);
    formVal['jsonMetadataUrl'] = jsonMetadataUrl;
    try {
      const reward = await createRewardToken(formVal.name, formVal.symbol, jsonMetadataUrl)
      console.log("reward",reward);
      setRewardData(jsonMetadata);
      confirm("Created Reward for company, now you can invite users");
      
      // setFormSubmitted(true)
    }
    catch(err) {
      console.log("err",err);
      alert("Company should be unique, please add valid name and email");
    }
    
    // props.handleChange();

    handleClose()
  };
  return (
    <div className=''>

      <React.Fragment>
        {
           Object.keys(rewardData).length!==0 ? 
           <Container>
              <Typography component="h1" variant="h5">
               Rewards
              </Typography>
              <div> {rewardData.name}</div>
              <image src={rewardData.image}></image>
            </Container> :
           <Container className='form-outer' component="main" maxWidth="md">

            <Typography component="h1" variant="h5">
              Registration
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="name"
                    label="Name Of the Token"
                    fullWidth
                    autoComplete="name"
                    onChange={onValChange}
                    value={formObject.name}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="symbol"
                    label="symbol"
                    fullWidth
                    autoComplete="email"
                    onChange={onValChange}
                    value={formObject.email}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={4}>
                  <UploadFile updateImage={updateImageUrl} />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="terms" value="yes" />}
                    label="Agree terms and conditions"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 6, mb: 4 }}
              >
                Register Here
              </Button>
            </Box>
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