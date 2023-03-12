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
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";


import { createUser } from '@/src/gratie_solana_contract/gratie_solana_user';
import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { faker } from '@faker-js/faker';
import { useWallet } from '@solana/wallet-adapter-react';





// import '@/styles/form.css';

interface Values {
  email: string;
  password: string;
}

declare const window: Window &
  typeof globalThis & {
    solana: any
  }

export default function List() {

  const [open, setOpen] = React.useState(false);

  const [validCompany, setValidCompany] = React.useState(undefined);

  const [formObject, setFormObject] = useState({
    name: "",
    email: "",
    evaluation: "",
    tierID: "",
    logoUri: '',
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [akord, setAkord] = useState<Akord | null>()

  React.useEffect(() => {
    // handleToggle();
    console.log("coming in the test")
    // if (userLicenses.length > 0) {
    //     const companyLicensePDA = await getCompanyLicensePDA(program, userLicenses[0].account.name);

    //     let companyRewardsBucket;
    //     try {
    //         companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePDA);
    //     }
    //     catch {
    //         console.log("Company rewards not yet created")
    //     }
    //     if (!companyRewardsBucket) {
    //         // const provider = anchor.AnchorProvider.env();
    //         // anchor.setProvider(provider);
    //         // const wallet = anchor.AnchorProvider.env().wallet as Wallet;

    //         // await createUserRewardsBucket(program, wallet);
    //         // console.log("companyRewardsBucket", companyRewardsBucket)
    //     }

    //     console.log("companyRewardsBucket", companyRewardsBucket);

    // }
  });


  const onValChange = (event: any) => {
    const value = (res: any) => ({
      ...res,
      [event.target.id]: event.target.value,
    });
    setFormObject(value);
  };

  const { wallet } = useWallet();

  const createCompanyUser = async () => {
    if (wallet) {
      const userEmail = faker.internet.email();
      const program = await connectToGratieSolanaContract();
      const allLicenses = await program.account.companyLicense.all();
      const companyName = allLicenses[0].account.name
      const user = await createUser(program, wallet.adapter.publicKey!, companyName, {
        userId: sha256.hash(userEmail).substring(0, 16),
        encryptedPassword: faker.internet.password(),
        encryptedPasswordAlgorithm: 0,
        encryptedPasswordSalt: faker.internet.password(),
      });
      console.log("createCompanyUser", user)
    }
  }

  return (
    <div className=''>

      <React.Fragment>
        <Container className='form-outer' component="main" maxWidth="md">

          <Typography component="h1" variant="h5">
            Registration
          </Typography>

          <Box component="form" noValidate sx={{ mt: 6 }}>

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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="terms" value="yes" />}
                  label="Agree terms and conditions"
                />
              </Grid>
            </Grid>

            <Button
              onClick={createCompanyUser}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 4 }}
            >
              Create the Company user
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