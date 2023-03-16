import * as React from 'react';
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";


import Container from '@mui/material/Container';
import { Box, Button, CardContent, Grid, ListItem, TextField, Typography } from '@mui/material';

import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { createUser, createUserRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_user';
import { useWallet } from '@solana/wallet-adapter-react';
import { encryptPassword } from '@/src/utils/encryption';
import { listCompanyLicenses } from '@/src/gratie_solana_contract/gratie_solana_company';
import { base64 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { Keypair } from '@solana/web3.js';
import { AES } from 'crypto-js';
import { delay } from '@/src/utils/util';
import Loading from '../Loading';
import ModalBox from '../Modal';


export default function CreateUsers(props: any) {
  const wallet = useWallet();
  const [email, setEmail] = React.useState('');
  const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);
  const [encryptedPassword, setEncryptedPassword] = React.useState('');
  const [salt, setSalt] = React.useState('salt');
  const [password, setPassword] = React.useState('');
  
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


  const handleClick = async () => {
    console.log("wallet", wallet)
    if (!email) {
      alert('Enter user email to add')
      return false;
    }
    const userId = sha256.hash(email).substring(0, 16);

    if(!props.license){
      alert('Please create company license before inviting user')
      return false;
    }
    handleLoaderToggle(true)


    console.log("props", props.license);

    const program = await connectToGratieSolanaContract();

    if (wallet && wallet.publicKey) {

      const companyName = props.license.account.name
      const user = await createUser(program, wallet.publicKey, companyName, {
        userId: userId,
        encryptedPassword: encryptedPassword,
        encryptedPasswordAlgorithm: 0,
        encryptedPasswordSalt: salt,
      });
      
      console.log(user)

      try {
        await delay(1000);
        const rewardBucket = await createUserRewardsBucket(program, wallet.publicKey, companyName, userId)
        console.log("rewardBucket", rewardBucket);
        setModalTitle('Reward created Successfully')
        setOpenMsg(true);
        setEmail('');
        setShowSuccessMsg(true);
      }
      catch (err) {
        alert(err);
      }

    } else {
      console.error("CAN'T RUN TESTS: No wallet connected");
    }
    handleLoaderToggle(false)


  }

  const generateEncryptedPassword = async () => {
    const pw = await encryptPassword(password, salt);
    setEncryptedPassword(pw);
  };


  return (
    <Container sx={{ mt: 3 }} className="create-user-container">
      
      <Box className="form-box">
        <CardContent>
          <form className='form'>
            <Grid container spacing={1} sx={{ mt: 5, mb: 5 }}>
              <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  User Email
                </Typography>
              </Grid>
              <Grid item xs={12} md={5} className="user-grid">
                <TextField
                  fullWidth
                  type='text'
                  id="email"
                  autoComplete='off'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='form-textfield'
                  focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  encryption algorithm
                </Typography>
              </Grid>
              <Grid item xs={12} md={5} className="user-grid">
                <TextField
                  fullWidth
                  type='text'
                  id="email"
                  autoComplete='off'
                  required
                  value={'script-pkdf (keyLen 32)'}
                  className='form-textfield'
                  helperText='find in company database'
                  focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  salt
                </Typography>
              </Grid>
              <Grid item xs={12} md={5} className="user-grid">
                <TextField
                  fullWidth
                  type='text'
                  id="email"
                  autoComplete='off'
                  required
                  onChange={(e) => setSalt(e.target.value)}
                  value={salt}
                  className='form-textfield'
                  helperText='find in company database'
                  focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Password is only here for testing, usually the company would just add the salt, encryption algorithm and encrypted password here.
                  right now the encrypted password is also generated for convenience and testing purposes.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  password (testing)
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} className="user-grid">
                <TextField
                  fullWidth
                  type='text'
                  id="email"
                  autoComplete='off'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className='form-textfield'
                  helperText='find in company database'
                  focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                />
              </Grid>
              <Grid item md={2}>
                <Button onClick={generateEncryptedPassword} variant='contained' color='success'>
                  encrypt
                </Button>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  User Encrypted Password
                </Typography>
              </Grid>
              <Grid item xs={12} md={5} className="user-grid">
                <TextField
                  fullWidth
                  type='text'
                  id="email"
                  autoComplete='off'
                  required
                  onChange={(e) => setEncryptedPassword(e.target.value)}
                  value={encryptedPassword}
                  className='form-textfield'
                  helperText='find in company database'
                  focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                />
              </Grid>
            </Grid>
            <Button onClick={handleClick} variant='contained' className='create-token-btn' sx={{ mt: 2, mb: 5 }}>
              Add User
            </Button>
          </form>
          {showSuccessMsg && <Box>
            User Id has been sucessfully created 
            Service providers can mint their NFT to claim rewards using their Email Id  
          </Box>}
        </CardContent>
      </Box>
      <Loading open={openLoading} handleClose={handleLoaderToggle} />
      <ModalBox open={openMsg} handleClose={handleModalClose} heading={modalTitle} description={modalDesc}/>
    </Container>
  )
}