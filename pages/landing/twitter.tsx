import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter' 
import { Button } from '@mui/material';
import Link from 'next/link';

export default function Twitter(){
    return(
        <Box borderRadius={20} border="2px solid black" width="70%" height={180} sx={{ mt: 5, opacity:1, background:'#000' }} className="community-left">
        <Grid container spacing={1} sx={{ mt: 2, pl:5 }}>
        <Grid item xs={12} sm={12} md={6} className="twitter">
        <Typography
              variant="h6"
              sx={{
                fontSize:'20px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}>To get more updates</Typography>
              <br/>
              <Link target='_blank' href='https://twitter.com/Gratie_'>
              <Button className="social-button"> Join Us</Button>
              </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
              <div className='icon-circle'>
                <img alt="discord" src="/images/Twitter icon.png" width={105} height={100} />
              </div>
        </Grid>
      </Grid>
    </Box>
    );
}