import { Container, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import Twitter from './twitter';
import Discord from './discord';

 export default function Community(){
    return(
        <Container sx={{ mt: 10, itemAlign:'center' }}>
            <Typography
              noWrap
              variant="h2"
              className="core-values head-text"
            >Community</Typography>
            <Box borderRadius={20} border="2px solid white" width="80%" height={480} sx={{ mt: 5 }} className="box-color" >
                <div>
                <Twitter />
                <Discord />
                </div>
            </Box>
        </Container>
    );
 }