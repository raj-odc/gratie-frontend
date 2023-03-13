import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system';

export default function TimeLine(){
    return(
        <>
            <Typography
        noWrap
        variant="h2"
        className="core-values head-text"
      >Time Line</Typography>
      <br/>
        <Container sx={{width:'90%'}}>
        <Grid container spacing={1} sx={{margin:'auto'}}>
        <Grid item xs={12} md={6}>
          <img alt='not gotten' src='/images/bulb.png' />
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography
              variant="h6"
              sx={{
                fontSize:'26px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}><ul>
                <li>Ideation and planning of Gratie</li>
                <li>Initial Consumer research</li>
                <li>MVP soft launch</li>
                <li>Beta user launch</li>
                <li>Participation in hackathon</li>
                </ul></Typography>
        </Grid>
        </Grid>
        <Grid container spacing={1} sx={{margin:'auto', mt:5}}>
        <Grid item xs={12} md={6}>
        <Typography
              variant="h6"
              sx={{
                fontSize:'26px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}><ul>
                <li>Consumer feedback based on beta launch and changes</li>
                <li>Integrating web3auth for service providers ease of onboarding</li>
                <li>Launch of NFTs</li>
                <li>Implementation of seperate service provider dashboard</li>
                </ul></Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img alt='not gotten' src='/images/NewNFT.png' />
        </Grid>
        </Grid>
        <Grid container spacing={1} sx={{margin:'auto', mt:5}}>
        <Grid item xs={12} md={6}>
          <img alt='not gotten' src="/images/userIcon.png" />
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography
              variant="h6"
              sx={{
                fontSize:'26px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}><ul>
                <li>Onboarding first 250 clients</li>
                <li>Collaborating with utility companies for token</li>
                <li>Introduction stripe payments</li>
                <li>One click token public sale</li>
                </ul></Typography>
        </Grid>
        </Grid>
        <Grid container spacing={1} sx={{margin:'auto', mt:5}}>
        <Grid item xs={12} md={6}>
        <Typography
              variant="h6"
              sx={{
                fontSize:'26px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify"
              }}><ul>
                <li>Introducing enterprise token staking</li>
                <li>Integrating web3auth for service providers ease of onboarding</li>
                <li>Launch of NFTs</li>
                <li>Implementation of seperate service provider dashboard</li>
                </ul></Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img alt='PiggySaver' src='/images/PiggySaver.png' />
        </Grid>
        </Grid>
        </Container>
        </>
    );
}