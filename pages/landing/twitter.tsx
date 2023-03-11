import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter' 
import { Button } from '@mui/material';

export default function Twitter(){
    return(
        <Box borderRadius={20} border="2px solid black" width="70%" height={180} sx={{ mt: 5, opacity:1, background:'#000' }} className="community-left">
        <Grid container spacing={1} sx={{ mt: 2, pl:5 }}>
        <Grid item xs={12} md={6}>
        <Typography
              variant="h6"
              sx={{
                fontSize:'20px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}>Dorem hgt fast mario lesiro gekko.</Typography>
              <br/>
              <Button className="social-button"> Join Us</Button>
        </Grid>
        <Grid item xs={12} md={6}>
            <div className='icon-circle'>
            <TwitterIcon sx={{color:'#00FF01', fontSize:60, position: 'absolute', bottom:'16%', left:'16%'}} />
            </div>
        </Grid>
      </Grid>
    </Box>
    );
}