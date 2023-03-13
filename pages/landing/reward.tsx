import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button  from '@mui/material/Button';
import Arrow from '@mui/icons-material/ArrowRightAlt';
import Link from 'next/link';


export default function Reward(){
    return(
        <Grid container spacing={2} sx={{ mt: 10}}>
            <Grid item xs={12} md={6} sx={{ml:-10, mr:5}}>
                <div className='image-container'>
                  <img alt="rewardBox" src='/images/Reward box.png' className='image'/>
                </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{mt:25}}>
                
            <Typography
              variant="body2"
              sx={{
                fontSize:'38px',
                fontFamily: 'Book antique',
                lineHeight: '45.55px',
              }}>
                A next generation SaaS infrastructure platform for your enterprise reward management.
              </Typography>
              <br/>
                <Link href="/home" passHref>
                  <Button variant='contained' className="button-arrow"> Explore <Arrow sx={{color:'#00FF01'}} /></Button>
                </Link>
                </Grid>
            </Grid>
    );
}