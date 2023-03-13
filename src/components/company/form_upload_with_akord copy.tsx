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
import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { createCompanyLicense, CreateCompanyLicenseForm } from '@/src/gratie_solana_contract/gratie_solana_company';
import { useWallet } from '@solana/wallet-adapter-react';

``

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

  const wallet = useWallet();

  const [open, setOpen] = React.useState(false);

  const [validCompany, setValidCompany] = React.useState(undefined);

  const [formObject, setFormObject] = useState({
    name: "",
    email: "",
    evaluation: "",
    tierID: "",
    jsonMetadataUrl: '',
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [akord, setAkord] = useState<Akord | null>()

  const upload = async (files: FileList | null) => {
    handleToggle()
    const { jwtToken, wallet } = await Akord.auth.signIn(
      'selvaraj.ror@gmail.com',
      'hBVp8i3KxtPM6zb'
    );
    const akord = await Akord.init(wallet, jwtToken)
    if (!files || !files.length) {
      throw new Error('Failed uploading the file')
    }
    const file = files[0]
    const vaults = await akord?.vault.list()
    if (!vaults || !vaults.length) {
      throw new Error('User does not have any vaults')
    }
    const vault = vaults[0]
    // confirm("Uploading file to vault: " + vault.name)
    const { stackId } = await akord.stack.create(vault.id, file, file.name)
    console.log("stackId", stackId);

    const value = (res: any) => ({
      ...res,
      ['logoUri']: stackId,
    });
    setFormObject(value);

    // const { data: getfile } = await akord.stack.getVersion(stackId);
    // const fileUrl = URL.createObjectURL(new Blob([getfile]));

    // console.log("akord.stack", fileUrl);

    // confirm("Created stack: " + stackId)
    setAkord(null)
    handleClose()
  }

  const onValChange = (event: any) => {
    const value = (res: any) => ({
      ...res,
      [event.target.id]: event.target.value,
    });
    setFormObject(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formObject.jsonMetadataUrl === '') {
      console.log("Please upload the logo before proceed");
      return false;
    }
    handleToggle()

    console.log("event.currentTarget", event.currentTarget);
    const data = new FormData(event.currentTarget);
    console.log(formObject);
    const formVal: any = new Object(formObject);
    formVal['tierID'] = parseInt(formVal.tierID)
    formVal['evaluation'] = parseInt(formVal.evaluation)

    console.log(formVal);

    const program = await connectToGratieSolanaContract();

    // this gets all the licenses
    const licenses = await program.account.companyLicense.all();
    console.log(licenses);


    const company = await createCompanyLicense(program, wallet.publicKey!, formVal);
    console.log(company)

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
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload File
                  <input onChange={(e) => upload(e.target.files)}
                    type="file"
                    hidden
                  />
                </Button>
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