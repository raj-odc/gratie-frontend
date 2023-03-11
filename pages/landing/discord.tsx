import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import DiscordIcon from '@mui/icons-material/Facebook'
import Button from '@mui/material/Button';

export default function Discord(){
    return(
        <Box borderRadius={20} border="2px solid black" width="70%" height={180} sx={{ mt: 5, opacity:1, background:'#000', float:'right' }} className="community-right">
            <Grid container spacing={1} sx={{ mt: 2, pr:5}}>
            <Grid item xs={12} md={6}>
                <div className='icon-circle'>
                    <DiscordIcon sx={{color:'#00FF01', fontSize:60, position: 'absolute', bottom:'16%', left:'16%'}} />
                </div>
            </Grid>
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
          </Grid>
        </Box>
    );
}