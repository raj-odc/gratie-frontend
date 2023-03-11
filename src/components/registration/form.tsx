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

import * as anchor from "@project-serum/anchor";
import idl from './../../lib/gratie_solana.json'
import { GratieSolana } from '@/src/lib/types/gratie_solana';

import { Akord } from '@akord/akord-js'
import { useState } from 'react'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider } from '@project-serum/anchor';
import { createMintKeyAndTokenAccount } from '@/src/lib/util';
import { getCompanyLicensePDA, getGratieWalletPDA, getTierPDA } from '@/src/tests/pda';

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";



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

    const [open, setOpen] = React.useState(false);
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
        const newVaults = await akord?.vault.list()
        console.log("newVaults", newVaults[0]);
        // confirm("Created stack: " + stackId)
        setAkord(null)
        handleClose()
      }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    const formVal = {
        name: 'Test', 
        email: 'test@tes.com', 
        logoUri: 'test.png', 
        evaluation: 1000,
        tierType: 1
    }

    const network = 'http://localhost:8899';

    const opts:any = {
        preFlightCommitment: 'processed',
    };

    console.log(window.solana);

    const connectWallet = async () => {
        const { solana } = window;
        if (solana) {
        const response = await solana.connect();
        console.log("Connected with public key: ", response.publicKey.toString());
        // setWalletAddress(response.publicKey.toString());
        }
    };
    await connectWallet();



    // maybe put this into a function
    const connection = new Connection(network, opts.preFlightCommitment);

    const provider = new AnchorProvider(connection, window.solana, opts.preFlightCommitment);

    const programID = new PublicKey(idl.metadata.address);
    const program: anchor.Program<GratieSolana> = new anchor.Program(idl as any, programID, provider);
    //

    const publicKey  = new PublicKey(window.solana.publicKey);

    const { mintKey, tokenAccount } = await createMintKeyAndTokenAccount(program, publicKey);

  const gratieWalletBefore = await program.account.gratieWallet.fetch(getGratieWalletPDA(program));
  const oldAmountEarned = gratieWalletBefore.amountEarned.toNumber();

  const url = "http://example.com/example.png";

  const companyLicensePDA = getCompanyLicensePDA(program, formVal.name);
  const tierPDA = getTierPDA(program, formVal.tierType);


  await program.methods.createCompanyLicense(formVal.name, formVal.email, url, new anchor.BN(1000), formVal.tierType).accounts({
    mintAuthority: publicKey,
    companyLicense: companyLicensePDA,
    gratieWallet: getGratieWalletPDA(program),
    mint: mintKey.publicKey,
    tokenAccount: tokenAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
    tier: tierPDA,
  }).rpc();
  
  const companyLicensePDAAfterCreation = getCompanyLicensePDA(program, formVal.name);
  const companyLicense = await program.account.companyLicense.fetch(companyLicensePDAAfterCreation);
  console.log("companyLicense", companyLicense);







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
                variant="standard"
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                required
                id="tierType"
                label="tierType"
                helperText="Fractal, Optical, Paradise, Cosmos"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
            />
            </Grid>
            <Grid  item xs={4}>
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