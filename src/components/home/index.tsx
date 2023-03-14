import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';

import styles from './home.module.css'
import { useWallet } from '@solana/wallet-adapter-react';
import ModalBox from '../Modal';

export default function Home() {
    const { wallet } = useWallet();

    const [openMsg, setOpenMsg] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState('');
    const [modalDesc, setModalDesc] = React.useState('');
 
    const handleModalClose = () => {
      setOpenMsg(false);
      setModalTitle('');
      setModalDesc('');
    }

    const forceWalletConnection = (url:string) => {
        if(!wallet){
            setModalDesc('Please connect to the Wallet');
            setOpenMsg(true);
        }
        else{
            window.location.replace(url);
        }
    }

  return (
    <>
      <React.Fragment>
        <Container component="main" maxWidth="md">
        <Box className={styles.homeMainBox} component="form" noValidate sx={{ mt: 12 }}>
                <Grid container spacing={2}>
                    
                <p className='company-welcome-text'>
                    Welcome to next generation crypto reward management system !
                </p>
                <Grid className='company-main-content' item xs={12} md={12}>
                    {/* <Link href="/company" passHref> */}
                        <Button onClick={() => forceWalletConnection('/company')}>
                            I am an Enterprise
                        </Button>
                    {/* </Link> */}
                    {/* <Link href="/user" passHref> */}
                        <Button  onClick={() => forceWalletConnection('/user')}>
                            I work for an Enterprise
                        </Button>
                    {/* </Link> */}
                </Grid>
                </Grid>
            </Box>
        </Container>
        <ModalBox open={openMsg} handleClose={handleModalClose} heading={modalTitle} description={modalDesc}/>
      </React.Fragment>
    </>
  )
}