import * as React from 'react';
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";
import Container from '@mui/material/Container';
import { Box, Button, CardContent, Grid, ListItem, TextField, Toolbar, Typography } from '@mui/material';
import { connectToGratieSolanaContract, connectToGratieSolanaContractWithKeypair } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { transferTokensToUser } from "@/src/gratie_solana_contract/gratie_solana_company";
import { claimUser, claimUserToHisOwnWallet, createUserRewardsBucket, getUser, getUserRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_user';
import { useWallet } from '@solana/wallet-adapter-react';
import { BN } from '@project-serum/anchor';
import { Keypair } from '@solana/web3.js';
import { getCompanyLicensePDA, getCompanyRewardsBucket, getUserPDA } from '@/src/gratie_solana_contract/gratie_solana_pda';

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

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({} as any);
  const [userRewards, setUserRewards] = React.useState({} as any);


  React.useEffect(() => {

    const checkIfWalletHasUser = async () => {
      const program = await connectToGratieSolanaContract();
      const users = await program.account.user.all();
      const user = users.find(u => u.account.owner == wallet.publicKey && u.account.claimedToHisOwnWallet);

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

  const claimToOwnWallet = async () => {
    try {

      console.log(`userEmail: ${userEmail} companyName: ${companyName}`);
      const program = await connectToGratieSolanaContract();
      const userID = sha256.hash(userEmail).substring(0, 16);
      const user = await getUser(program, companyName, userID);
      console.log(user);

      console.log(wallet.publicKey);
      await claimUserToHisOwnWallet(program, wallet.publicKey!, userPassword, companyName, userEmail);
      console.log('user successfully claimed to his own wallet');

    } catch (e) {
      console.log(e);
      alert(e);
    }

  };


  const loginUser = async () => {
    handleToggle();


    const tempKeypair = Keypair.generate();
    const program = await connectToGratieSolanaContractWithKeypair(tempKeypair);
    const userID = sha256.hash(userEmail).substring(0, 16);

    console.log(`userID: ${userID} companyName: ${companyName}`);

    try {
      const user = await getUser(program, companyName, userID);
      setUserData(user);
      const bucket = await getUserRewardsBucket(program, companyName, userID);
      console.log(bucket);

      setUserRewards(bucket);
      if (user.claimed) {
        setIsLoggedIn(true);
        handleClose();
        return;
      }
    } catch (e) {
      console.log(e);
      alert('user does not exist')
    }


    try {
      await claimUser(program, userPassword, userEmail, companyName);
    } catch (e) {
      console.log(e);
      alert('user does not exist')
    }

    setIsLoggedIn(true);

    console.log('user logged in');

    handleClose();
    return;
  };

  const userLoggedOutView = () => {
    return (
      <>
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
        <Box onClick={loginUser} className="form-box box-style">
          <CardContent>
            <Typography
              noWrap
              variant="h6"
              className='mint-nft-text'>
              Login
            </Typography>
          </CardContent>
        </Box>
      </>)
  };

  const userLoggedInView = () => {
    return (<div>
      <div>User Balance {userRewards.balance.toNumber()}</div>
      <div>{claimToOwnWalletView()}</div>
    </div>)
  };

  const claimToOwnWalletView = () => {
    if (userHashOwnWallet) {
      return <h1>User already has his own wallet</h1>
    }
    return (<Box onClick={claimToOwnWallet} className="form-box box-style">
      <CardContent>
        <Typography
          noWrap
          variant="h6"
          className='mint-nft-text'>
          ClaimToOwnWallet (optional)
        </Typography>
      </CardContent>
    </Box>);
  };

  const view = () => {
    if (isLoggedIn) {
      return userLoggedInView();
    }

    return userLoggedOutView();
  }



  return (
    <Container sx={{ mt: 2 }} className="create-user-container">
      {view()}
    </Container >
  )
}