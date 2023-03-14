import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Grid } from '@mui/material';
import Link from 'next/link';

import styles from './home.module.css'

export default function Home() {
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
                    <Link href="/company" passHref>
                        <Button>
                            I am an Enterprise
                        </Button>
                    </Link>
                    <Link href="/user" passHref>
                        <Button>
                            I work for an Enterprise
                        </Button>
                    </Link>
                </Grid>
                </Grid>
            </Box>
        </Container>
      </React.Fragment>
    </>
  )
}