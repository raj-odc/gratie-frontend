import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { Container } from '@mui/material'
import Upload from '@mui/icons-material/Upload';

export default function CreateToken() {
    return (
        <Container sx={{width:'65%', mt: 18}}>
            <Box className="form-box">
            <CardContent>
          <form className='form'>
            <Grid container spacing={1} sx={{ mt: 5, mb: 5 }}>
                <Grid item xs={12} md={6}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Enterprise Value
                </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='text'
                  autoComplete='off'
                  required
                  className='form-textfield'
                  focused sx={{ input: {color:'#fff', fontSize:'20px'}}}
                />
                </Grid>
            </Grid>
    
            <Grid container spacing={1} sx={{mb: 5 }}>
                <Grid item xs={12} md={6}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  Last Quarter Net Revenue
                </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='text'
                  autoComplete='off'
                  required
                  className='form-textfield'
                  focused sx={{ input: {color:'#fff', fontSize:'20px'}}}
                />
                </Grid>
            </Grid>
    
            <Grid container spacing={1} sx={{ mb: 5 }}>
                <Grid item xs={12} md={6}>
                <Typography
                  noWrap
                  variant="h6"
                  className='form-label'>
                  % Of Circulating Tokens
                </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                <Grid item xs={12} md={6}>
                    <Button variant='contained' className='form-upload-button'><Upload sx={{color:'#56e456'}} /></Button>
                </Grid>
                </Grid>
            </Grid>
    
            <Button variant='contained' className='create-token-btn'> Create Token</Button>
          </form>
        </CardContent>
        </Box>
        </Container>
      )
}