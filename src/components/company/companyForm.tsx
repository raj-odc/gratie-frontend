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
import { createCompanyLicense, CreateCompanyLicenseForm } from '@/src/gratie_solana_contract/gratie_solana_company';
import { useWallet } from '@solana/wallet-adapter-react';

import UploadFile from '@/src/components/uploadFileS3';
import {uploadMetaDataToS3} from '@/src/utils/uploadMetaDataToS3';

// import '@/styles/form.css';

interface Values {
  email: string;
  password: string;
}

declare const window: Window &
  typeof globalThis & {
    solana: any
  }

export default function CompanyForm(props:any) {

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

    // // this gets all the licenses
    //   const licenses = await program.account.companyLicense.all();
    //   console.log(licenses);

      const publicKey = (wallet as any).publicKey;
      const company = await createCompanyLicense(program, publicKey, formVal);
      console.log("company", company)
    
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
    <div className=''>

      <React.Fragment>
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
                  label="Name Of the Company"
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
                  id="email"
                  label="email"
                  fullWidth
                  autoComplete="email"
                  onChange={onValChange}
                  value={formObject.email}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="evaluation"
                  label="evaluation"
                  fullWidth
                  autoComplete="evaluation"
                  onChange={onValChange}
                  value={formObject.evaluation}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  required
                  id="tierID"
                  label="tierID"
                  helperText="Fractal, Optical, Paradise, Cosmos"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  onChange={onValChange}
                  value={formObject.tierID}
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