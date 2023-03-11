import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function WhitePaper(){
    return(
        <Box sx={{mt:10}}>
            <Typography
              variant="h4"
              noWrap
              sx={{
                fontSize:'60px',
                flexGrow: 1,
                fontFamily: 'Book antique',
                color: '#fff',
                textAlign:"justify"
              }}
            >White Paper</Typography>
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
              }}>Dorem hgt fast mario lesiro gekko hgt fast mario lesiro gekko.
              <Link href='#' style={{color:'#00FF01'}}> Read more</Link>
              </Typography>
            </Container>
        </Box>
    );
}