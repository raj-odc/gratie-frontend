import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

export default function Team(){
    return(
        <Grid container spacing={2} sx={{ mt: 10}}>
            <Typography
              variant="h2"
              className="core-values head-text"
              noWrap
            >Team</Typography>
            <br/>
            <Grid container spacing={0} sx={{ mt: 5}}>
              <Grid item xs={12} sm={6} md={6} lg={3} className='team-img'>
                <img width={200} height={200} alt="team1" src='/images/Team1.png' />
                <Typography
              variant="h6" className="team-name"> Ragul Vasudevan
              </Typography>
              <Typography
              variant="h6" className="team-info">
                Founder
                <br/>
                Block Chain Product Manager
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} className='team-img'>
              <img width={200} height={200} alt="team1" src='/images/Team2.png' />
                <Typography
              variant="h6" className="team-name"> &nbsp;&nbsp;&nbsp;&nbsp; Max
              </Typography>
              <Typography
              variant="h6" className="team-info">
                Solana Developer 
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} className='team-img'>
              <img width={200} height={200} alt="team1" src='/images/Team3.png' />
                <Typography
              variant="h6" className="team-name"> Selva Raj
              </Typography>
              <Typography
              variant="h6" className="team-info">
                Web 3 Full Stack Engineer
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3} className='team-img'>
              <img width={200} height={200} alt="team1" src='/images/Team4.png' />
                <Typography
              variant="h6" className="team-name"> Nishintha
              </Typography>
              <Typography
              variant="h6" className="team-info">
                Ui/Ux Designer
              </Typography>
              </Grid>
            </Grid>
        </Grid>
    );
}