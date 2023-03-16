import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

export default function Working(){
    return(
        <Grid container spacing={5} sx={{ mt: 8 }}>
            <Grid item xs={12}>
            <Typography
              variant="h2"
              className="core-values head-text"
              noWrap
            >How we work </Typography>
            <br/>
            <Grid container spacing={1} sx={{ mt: 5}}>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={100} height={100} alt="reward" src="/images/1.png" />
              </Grid>
              <Grid item xs={12} md={6} className="grid-part" sx={{ml:3}}>
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>
               Come to Gratie , purchase your tiered NFT according to your needs
            </Typography>
           </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5}}>
              <Grid item xs={12} md={6} className="grid-right">
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>
                Enter the application , connect your non custodial wallet which owns the NFT 
              </Typography>
              </Grid>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={100} height={100} alt="reward" src="/images/2.png" />
              </Grid>
              <Grid item xs={12} md={6} className="grid-right">
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}></Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5}}>
            <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={100} height={100} alt="reward" src="/images/3.png" />
              </Grid>
            <Grid item xs={12} md={6} className="grid-right">
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>
                Post verification you can use our application to start incentivising your service providers / users 
              </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5}}>
              <Grid item xs={12} md={6} className="grid-right">
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>
                Click on issue rewards , give required inputs ( company valuation, net revenue of last quarter, % of distribution, no of users )
              </Typography>
              </Grid>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={100} height={100} alt="reward" src="/images/4.png" />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5}}>
            <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={100} height={100} alt="reward" src="/images/5.png" />
              </Grid>
            <Grid item xs={12} md={6} className="grid-right">
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>
                Based on your inputs your own enterprise's cryptocurrency is issued and supplied to the circulation , click on submit button and complete the transaction in blockchain.
              </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5}}>
            <Grid item xs={12} md={6} className="grid-right">
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>
                A magic link for minting user NFT's is created , share it to the necessary and they can claim the rewards within our dashboard itself.
              </Typography>
              </Grid>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={100} height={100} alt="reward" src="/images/6.png" />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: 5}}>
              <Grid item xs={12} md={6} className='grid-img'>
                <img style={{marginLeft:'150px' }} width={100} height={100} alt="reward" src="/images/7.png" />
              </Grid>
              <Grid item xs={12} md={6} className="grid-right">
              <Typography
              variant="h6"
              sx={{
                fontSize:'30px'
              }}>               
              Enjoy hassle free maintenance of your ecosystem
              </Typography>
              </Grid>
            </Grid>
            </Grid>
        </Grid>
    );
}