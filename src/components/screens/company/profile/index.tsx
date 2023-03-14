import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { Container } from '@mui/material'
import Upload from '@mui/icons-material/ArrowUpward';
import Edit from '@mui/icons-material/Edit';

export default function Profile() {
    const email = 'xyz@gmail.com';
    const token = 175990;
    const subscription = 'Optical';
    return (
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
                  Email Id
                </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
                <Typography
                  noWrap
                  variant="h6"
                  className='profile-label'>
                  {email}
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
                <Grid item xs={12} md={3} className="user-grid">
                <Typography
                  noWrap
                  variant="h6"
                  className='profile-label'>
                  {token}
                </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant='contained' className='profile-btn'><Upload sx={{color:'#56e456',fontWeight:'700'}} /></Button>
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5, mb: 5 }}>
                <Grid item xs={12} md={7}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Service Provider Email Id
                </Typography>
                </Grid>
                <Grid item xs={12} md={3} className="user-grid">
                <Typography
                  noWrap
                  variant="h6"
                  className='profile-label'>
                  {subscription}
                </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button variant='contained' className='profile-btn'><Upload sx={{color:'#56e456',fontWeight:'700'}} /></Button>
                </Grid>
            </Grid>
            <Button variant='contained' className='create-token-btn' sx={{mt:2, mb:5}}>
                Invite Users
            </Button>
          </form>
        </CardContent>
        </Box>
        </Container>
      )
}