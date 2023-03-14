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
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { transferTokensToUser } from '@/src/gratie_solana_contract/gratie_solana_company';
import { BN } from '@project-serum/anchor';
import ModalBox from '../Modal';
import Loading from '../Loading';


// import '@/styles/form.css';


declare const window: Window &
  typeof globalThis & {
    solana: any
  }

export default function List(props:any) {
  const { wallet } = useWallet();
  const [openMsg, setOpenMsg] = React.useState(false);
  const [openLoading, setOpenLoading] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalDesc, setModalDesc] = React.useState('');

  const handleModalClose = () => {
    setOpenMsg(false);
    setModalTitle('')
    setModalDesc('');
  }
  const handleLoaderToggle = (status:boolean) => {
    setOpenLoading(status)
  }

  const transferToken = async (event:any, userId:string) => {
    event.preventDefault();
    handleLoaderToggle(true)
    // const userIdCCC = sha256.hash('test@tets.com').substring(0, 16);
    console.log("userId", userId);
    if (wallet && wallet.adapter.publicKey) {
      const publicKey: any = wallet.adapter.publicKey;
      const companyName:string = props.license.account.name
      const program = await connectToGratieSolanaContract();
      try {
        const transferToken = await transferTokensToUser(program, publicKey, new BN(1), companyName, userId);
        console.log("transferToken", transferToken);
        setModalTitle('Transfer Token Success')
        setOpenMsg(true);
      }
      catch (err:any) {
        alert(err);
      }
    } else {
      alert('Wallet should be present');
    }
    handleLoaderToggle(false);
    return;
  };

  return (
    <div className=''>

      <React.Fragment>
        <Container component="main" maxWidth="md" sx={{ mt: 4}}>
          <Box className="form-box">
            <CardContent>
            <Box component="form" noValidate sx={{ mt: 5 }}>
              {
                props.users && props.users.map((user:any) => {
                  return (<Grid item xs={12} md={12} sx={{display: 'flex', mb: 2}}>
                    <Typography
                      noWrap
                      variant="h6"
                      className='form-label'>
                      {user.account.userId}
                    </Typography>
                      <Button onClick={(e) => transferToken(e, user.account.userId)} variant='contained' className='create-token-btn'>Send Tokens</Button>
                    </Grid>
                  )
                })
              }    
          </Box>
          <Box>
            {
              props.users.length == 0 && <Typography
              noWrap
              variant="h6"
              className='form-label'>
              Users Not Found</Typography>
            }
          </Box>
        </CardContent>
          </Box>
        </Container>
        
        <Loading open={openLoading} handleClose={handleLoaderToggle} />
        <ModalBox open={openMsg} handleClose={handleModalClose} heading={modalTitle} description={modalDesc}/>
      </React.Fragment>

    </div>
  );
}