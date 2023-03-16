import Container from '@mui/material/Container';
import Reward from './reward';
import Chip from './chip';
import CoreValue from './coreValue';
import Working from './howWeWorks';
import UseCase from './useCase';
import Pricing from './pricing';
import TimeLine from './timeLine';
import Community from './community';
import Team from './team';
import LightPaper from './lightPaper';

export default function LandingPage(){
    return(
        <Container sx={{width:'90%', fontFamily: 'Book antique', pb:18}}>
          <Reward />
          <Chip />
          <Container id="core">
            <CoreValue />
          </Container>
          <Container id="working">
            <Working />
          </Container>
          <Container id="useCase">
            <UseCase />
          </Container>
          <Container id="price">
            <Pricing />
          </Container>
          <Container id="timeLine" sx={{mt: 20,mb:20}}>
            <TimeLine />
          </Container>
          <Container id="community">
            <Community />
          </Container>
          <Container id="white">
            <LightPaper />
          </Container>
          <Container sx={{mb:'50px', mt:'25px'}}>
            <div className='line-end'/>
          </Container>
        </Container>
    );
}