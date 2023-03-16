import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { checkAdmin, connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { createTier, getAllTiers } from "@/src/gratie_solana_contract/gratie_solana_tier";
import { useWallet } from '@solana/wallet-adapter-react';
import { Box, Button, Container, Grid, ListItem, TextField, Typography } from '@mui/material';

export default function ListUserTable(props:any) {
    const wallet = useWallet();
    const [tierID, setTierID] = React.useState('');
    const [name, setName] = React.useState('');
    const [freeUserAmount, setFreeUserAmount] = React.useState('');
    const [platformFeePerMille, setPlatformFeePerMille] = React.useState('');
    

    const addTier = async() => {
        const program = await connectToGratieSolanaContract();
        const walletPubKey:any = wallet.publicKey;
        const isAdmin = await checkAdmin(program, walletPubKey);
        if(!isAdmin){
            confirm("You can't do Verify until you are admin");
            return;
        }
        const tier = await createTier(program, walletPubKey, parseInt(tierID), name, parseInt(freeUserAmount), parseInt(platformFeePerMille))
        console.log("tier",tier);
    }
  return (
    <>
       <React.Fragment>
        <Container className='form-outer' component="main" maxWidth="md">

          <Box component="form" noValidate sx={{ mt: 6 }}>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="tierID"
                  label="Unique Tier Id"
                  type="number"
                  fullWidth
                  autoComplete="tierID"
                  onChange={(e) => setTierID(e.target.value)}
                  value={tierID}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="name"
                  label="Name Of the Tier"
                  fullWidth
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="freeUserAmount"
                  label="FreeUserAmount"
                  type="number"
                  fullWidth
                  autoComplete="freeUserAmount"
                  onChange={(e) => setFreeUserAmount(e.target.value)}
                  value={freeUserAmount}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="platformFeePerMille"
                  label="platformFeePerMille"
                  type="number"
                  fullWidth
                  autoComplete="userEmail"
                  onChange={(e) => setPlatformFeePerMille(e.target.value)}
                  value={platformFeePerMille}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Button
              onClick={addTier}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 4 }}
            >
                Create Tier         
            </Button>
          </Box>
          </Container>
      </React.Fragment>
    </>
  );
}