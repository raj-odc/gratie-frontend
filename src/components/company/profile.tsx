import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { Container } from '@mui/material'
import Upload from '@mui/icons-material/ArrowUpward';
import Edit from '@mui/icons-material/Edit';
import CompanyForm from './companyNewForm';
import React from 'react';
import { TierInfo } from '@/src/constants';

export default function Profile(props:any) {
    
  console.log("props license", props);
    return (
      <>
      <React.Fragment>
        { props.companyLicense ?
        <Container sx={{ mt: 3}} className="create-user-container">
            <Box className="form-box">
            <CardContent>
          <form className='form'>
            <Grid container spacing={1} sx={{ mt: 5, mb: 5 }}>
                <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Company Name
                </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
                <Typography
                  noWrap
                  variant="h6"
                  className='profile-label'>
                  {props.companyLicense.account.name}
                </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5, mb: 5 }}>
                <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Company Email
                </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
                <Typography
                  noWrap
                  variant="h6"
                  className='profile-label'>
                  {props.companyLicense.account.email}
                </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5, mb: 5 }}>
                <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Total Token Supply
                </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
                <Typography
                  noWrap
                  variant="h6"
                  className='profile-label'>
                  {props.companyLicense.account.evaluation.toNumber()}
                </Typography>
                </Grid>
            </Grid>
          </form>
        </CardContent>
        </Box>
        </Container> :
        <CompanyForm />
        }
        
        </React.Fragment>
      </>
      )
}