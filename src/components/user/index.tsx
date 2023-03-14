import * as React from 'react';
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";
import Container from '@mui/material/Container';
import { Box, Button, CardContent, Grid, ListItem, TextField, Toolbar, Typography } from '@mui/material';
import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { transferTokensToUser } from "@/src/gratie_solana_contract/gratie_solana_company";
import { claimUser, createUserRewardsBucket, getUser } from '@/src/gratie_solana_contract/gratie_solana_user';
import { useWallet } from '@solana/wallet-adapter-react';
import { BN } from '@project-serum/anchor';

// on this page we don't need a wallet connected for the user to connect
// the wallet is saved on chain but it's encrypted
// the user will be able to decrypt it with his email & password-(which we encrypt client side)
// after login a new private key is generated with the users email & users 
// plaintext password and now the user can decrypt the wallet and use it
// after that the user can chose to claim the account again using his
// own wallet if he so choses, this is so that the user doesn't have to
// setup his own wallet if he doesn't want to and he can do everything
// on this site without having to setup a wallet on his own
// but he can of course

// import '@/styles/form.css';

// todo:
// Add tier ID button


export default function Users(props: any) {
  const wallet = useWallet();

  const [open, setOpen] = React.useState(false);

  const [isTokenClaimed, setIsTokenClaimed] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');

  const [userHashOwnWallet, setUserHashOwnWallet] = React.useState(false);


  React.useEffect(() => {

    const checkIfWalletHasUser = async () => {
      const program = await connectToGratieSolanaContract();
      const users = await program.account.user.all();
      const user = users.find(u => u.account.owner == wallet.publicKey);

      setUserHashOwnWallet(user ? true : false);

    };

    checkIfWalletHasUser();
  });


  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const transferToken = async () => {
    handleToggle();
    const userId = sha256.hash(userEmail).substring(0, 16);

    if (wallet && wallet.publicKey) {
      const publicKey: any = wallet.publicKey;
      const program = await connectToGratieSolanaContract();
      try {
        const transferToken = await transferTokensToUser(program, publicKey, new BN(1), companyName, userId);
        console.log("transferToken", transferToken);
      }
      catch (err) {
        alert(err);
      }
    } else {
      alert("wallet should be present")
    }
    handleClose();
    return;
  };




  const loginUser = async () => {
    handleToggle();
    console.log("props", wallet)

    console.log("comoany", companyName);
    console.log('user', userEmail);

    const program = await connectToGratieSolanaContract();

    try {
      await claimUser(program, userPassword, userEmail, companyName);
    } catch (e) {
      console.log(e);
    }

    handleClose();
    return;
  };

  return (
    <>
      <Container sx={{ mt: 2 }} className="create-user-container">
        <Box className="form-box user-box">
          <CardContent>
            <Box component="form" noValidate sx={{ mt: 6 }}>
              <Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
                <Grid item xs={12} md={7}>
                  <Typography
                    noWrap
                    variant="h6"
                    className='form-label'>
                    Enter Email
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
                  <TextField
                    fullWidth
                    id="userEmail"
                    type='text'
                    autoComplete='off'
                    required
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    className='form-textfield'
                    focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ mt: 2, mb: 1 }}>
                <Grid item xs={12} md={7}>
                  <Typography
                    noWrap
                    variant="h6"
                    className='form-label'>
                    Enter Password
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
                  <TextField
                    fullWidth
                    id="userEmail"
                    type='text'
                    autoComplete='off'
                    required
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                    className='form-textfield'
                    focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={12} md={7}>
                  <Typography
                    noWrap
                    variant="h6"
                    className='form-label'>
                    Company Name
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
                  <TextField
                    fullWidth
                    type='text'
                    id="CompanyName"
                    autoComplete='off'
                    required
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                    className='form-textfield'
                    focused sx={{ input: { color: '#fff', fontSize: '20px' } }}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Box>
        <br />
        {userHashOwnWallet ? <>
          <h1>User already has his own wallet</h1>
        </> : <>
          < Box onClick={loginUser} className="form-box box-style">
            <CardContent>
              <Typography
                noWrap
                variant="h6"
                className='mint-nft-text'>
                Login
              </Typography>
            </CardContent>
          </Box>
          <Box className="form-box box-style" onClick={transferToken}>
            <CardContent>
              <Typography
                noWrap
                variant="h6"
                className='mint-nft-text'>
                Mint NFT
              </Typography>
            </CardContent>
          </Box>
          <br />
        </>
        }

      </Container >
    </>
  )
}