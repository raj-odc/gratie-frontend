import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

export default function UseCase(){
    return(
        <Grid container spacing={1} sx={{ mt: 18, mb: 18 }}>
            <Typography
              noWrap
              variant="h2"
              className="core-values head-text"
            >Use Case</Typography>
            <br/>
            <Grid container spacing={2} sx={{ mt: 5}}>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} alt="reward" src="/images/Gift box.png" />
              </Grid>
              <Grid item xs={12} md={6} className="grid-part" sx={{ml:3}}>
              <Typography
              variant="h5"
              sx={{
                fontSize:'40px',
                flexGrow: 1,
                fontFamily: 'Book antique',
                color: '#00FF01',
                textAlign:"justify"
              }}
            >Reward Incentivization</Typography>
            <br/>
            <Typography
              variant="h6"
              sx={{
                fontSize:'30px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}>
                Decentralized infrastructure where enterprise can create reward incentivization using cryptocurrency which will keep the service providers loyal and motivated to stay within the enterprise.
              </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 8}}>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} alt="reward" src="/images/UserIcon.png" />
              </Grid>
              <Grid item xs={12} md={6} className="grid-part">
              <Typography
               variant="h5"
               sx={{
                 fontSize:'40px',
                 flexGrow: 1,
                 fontFamily: 'Book antique',
                 color: '#00FF01',
                 textAlign:"justify"
               }}
            >Maintaining healthy ecosystem</Typography>
            <br/>
            <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>
                Retaining service providers is difficult for shared economy businesses , where they tend to find loopholes to eliminate platform fees. By using our infrastructure enterprises can reward back to the service providers and maintain a healthy ecosystem.
              </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 5}}>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={250} alt="reward" src="/images/Crypto machine.png" />
              </Grid>
              <Grid item xs={12} md={6} className="grid-part">
              <Typography
              variant="h5"
              sx={{
                fontSize:'40px',
              }}
            >In depth consumer analysis</Typography>
            <br/>
            <Typography
              variant="h6"
              sx={{
                fontSize:'30px',
              }}>
                Enterprises can list their rewarding token to open markets where new consumers can invest and trade. Collaborating with co-relating services to use rewarded tokens.
              </Typography>
              </Grid>
            </Grid>
            </Grid>
    );
}