import CardContent from '@mui/material/CardContent'
import { Box, Container } from '@mui/material'
import Upload from '@mui/icons-material/Upload';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import { useState } from 'react'
import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { createCompanyLicense, CreateCompanyLicenseForm } from '@/src/gratie_solana_contract/gratie_solana_company';
import { useWallet } from '@solana/wallet-adapter-react';

import UploadFile from '@/src/components/uploadFileS3';
import {uploadMetaDataToS3} from '@/src/utils/uploadMetaDataToS3';
import React from 'react';
import { addCompanyLicenseToMetaplex } from '@/src/gratie_solana_contract/gratie_solana_metaplex';
import { PRODUCTION } from '@/src/config';


declare const window: Window &
  typeof globalThis & {
    solana: any
  }


export default function FormPage(props:any) {
  const wallet = useWallet();

  const [open, setOpen] = React.useState(false);

  const [logoUrl, setLogoUrl] = React.useState('');

  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const [formObject, setFormObject] = useState({
    name: "",
    email: "",
    evaluation: "",
    tierID: "",
    jsonMetadataUrl: '',
  });

  React.useEffect(() => {
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
    console.log("event", event.target.value)
    
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

   const getMetaJsonUrl = async (name:string, email:string) => {
      const jsonData =  {
        "name": name,
        "symbol": "GRATIE",
        "description": email,
        "seller_fee_basis_points": 5,
        "external_url": "",
        "edition": "",
        "background_color": "000000",
        "image": logoUrl
      }
      const jsonUrl = await uploadMetaDataToS3(jsonData);
      return jsonUrl;
   }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!wallet){
      console.log("Please connect to wallet");
      return false;
    }
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

    formVal['tierID'] = parseInt(formVal.tierID)
    formVal['evaluation'] = parseInt(formVal.evaluation)

  

    const jsonMetadataUrl = await getMetaJsonUrl(formVal.name, formVal.email);
    formVal['jsonMetadataUrl'] = jsonMetadataUrl;
    try {
      const program = await connectToGratieSolanaContract();

      const publicKey = (wallet as any).publicKey;
      const company = await createCompanyLicense(program, publicKey, formVal);
      console.log("company", company)
    
      // adding company license to metaplex (only works on devnet not localnet)

      if (PRODUCTION) {
        console.log('adding company license to metaplex');
        await addCompanyLicenseToMetaplex(program, publicKey, company.name);
      }
      
      confirm("Thanks for Submitting your details, Gratie Admin will be verified soon");
      
      setFormSubmitted(true)
      
    }
    catch(err) {
      console.log("err",err);
      alert("Company should be unique, please add valid name and email");
    }
    
    // props.handleChange();

    handleClose()
  };
    return (
        <React.Fragment>
        <Container>
            <CardContent>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 6 }}>
            <Grid container spacing={1} sx={{ mt: 5, mb: 5 }}>
                <Grid item xs={12} md={5}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Name of the company
                </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  type='text'
                  id="name"
                  autoComplete='off'
                  required
                  onChange={onValChange}
                  value={formObject.name}
                  className='form-textfield'
                  focused sx={{ input: {color:'#fff', fontSize:'20px'}}}
                />
                </Grid>
                <Grid item xs={12} md={2}>
                    
                </Grid>
            </Grid>
    
            <Grid container spacing={1} sx={{mb: 5 }}>
                <Grid item xs={12} md={5}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Official mail of the company
                </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  type='text'
                  id="email"
                  autoComplete='off'
                  required
                  onChange={onValChange}
                  value={formObject.email}
                  className='form-textfield'
                  focused sx={{ input: {color:'#fff', fontSize:'20px'}}}
                />
                </Grid>
                <Grid item xs={12} md={2}>
                    
                </Grid>
            </Grid>
    
            <Grid container spacing={1} sx={{ mb: 5 }}>
                <Grid item xs={12} md={5}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Valuation of the company
                </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  type='text'
                  id="evaluation"
                  autoComplete='off'
                  required
                  onChange={onValChange}
                  value={formObject.evaluation}
                  className='form-textfield'
                  focused sx={{ input: {color:'#fff', fontSize:'20px'}}}
                />
                </Grid>
                <Grid item xs={12} md={2}>
                    <UploadFile updateImage={updateImageUrl} />
                    {/* <Button variant='contained' className='form-upload-button'><Upload sx={{color:'#56e456'}} /></Button> */}
                </Grid>
            </Grid>
    
            <Grid container spacing={1} sx={{ mb: 5 }}>
                <Grid item xs={12} md={5}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  My subscription
                </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  type='text'
                  id="tierID"
                  autoComplete='off'
                  required
                  onChange={onValChange}
                  value={formObject.tierID}
                  className='form-textfield'
                  focused sx={{ input: {color:'#fff', fontSize:'20px'}}}
                />
                </Grid>
                <Grid item xs={12} md={2}>
                    
                </Grid>
            </Grid>
            <Button type='submit' variant='contained' className='form-wallet-button'> Create License</Button>
          </Box>
        </CardContent>
        </Container>
        </React.Fragment>
      )
}