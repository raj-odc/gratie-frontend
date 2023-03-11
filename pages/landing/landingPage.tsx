import Container from '@mui/material/Container';
import Reward from './reward';
import Chip from './chip';
import CoreValue from './coreValue';
import UseCase from './useCase';
import Pricing from './pricing';
import TimeLine from './timeLine';
import Community from './community';
import Team from './team';
import WhitePaper from './whitePaper';

export default function LandingPage(){
    return(
        <Container sx={{width:'90%', fontFamily: 'Book antique'}}>
          <Reward />
          <Chip />
          <div id="core">
            <CoreValue />
          </div>
          <div id="useCase">
            <UseCase />
          </div>
          <div id="price">
            <Pricing />
          </div>
          <div id="timeLine">
            <TimeLine />
          </div>
          <div id="community">
            <Community />
          </div>
          <div id="team">
            <Team />
          </div>
          <div id="white">
            <WhitePaper />
          </div>
          <div style={{marginBottom:'50px', marginTop:'25px'}}>
            <div className='line-end'/>
          </div>
        </Container>
    );
}