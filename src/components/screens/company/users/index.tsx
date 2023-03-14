import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { Container } from '@mui/material'

export default function CreateUsers() {
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
                  Service Provider Email Id
                </Typography>
                </Grid>
                <Grid item xs={12} md={5} className="user-grid">
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
            <Button variant='contained' className='create-token-btn' sx={{mt:2, mb:5}}>
                Invite Users
            </Button>
          </form>
        </CardContent>
        </Box>
        </Container>
      )
}