import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import DiscordIcon from '@mui/icons-material/Facebook'
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Discord(){
    return(
        <Box borderRadius={20} border="2px solid black" width="70%" height={180} sx={{ mt: 5, opacity:1, background:'#000', float:'right' }} className="community-right">
            <Grid container spacing={1} sx={{ mt: 2, pr:5}}>
            <Grid item xs={12} sm={12} md={6}>
              <div className='icon-circle'>
                <img alt="discord" src="/images/Discord icon.png" width={150} height={100} />
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="discord">
        <Typography
              variant="h6"
              sx={{
                fontSize:'20px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}>To join our community</Typography>
              <br/>
              <Link target='_blank' href='https://discord.gg/wDwygmxH'>
                <Button className="social-button"> Join Us</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
    );
}