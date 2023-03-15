import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function LightPaper(){
    return(
        <Box sx={{mt:10}}>
            <Typography
              noWrap
              variant="h2"
              className="core-values head-text"
            >Light Paper</Typography>
            <br/>
            <Container sx={{width:'80%'}}>
            <Typography
              variant="h6"
              sx={{
                fontSize:'25px',
                fontFamily: 'Book antique',
                color: 'inherit',
                textAlign:"justify",
                mt:5
              }}>To understand more about Gratie
              <Link target='_blank' href='https://drive.google.com/file/d/14VmP4UPiGYrgXhvqOs4uKx03xWwNr_t2/view?usp=sharing' style={{color:'#00FF01'}}> Read more</Link>
              </Typography>
            </Container>
        </Box>
    );
}