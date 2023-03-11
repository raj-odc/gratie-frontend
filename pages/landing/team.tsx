import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

export default function Team(){
    return(
        <Grid container spacing={2} sx={{ mt: 10}}>
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
            >Team</Typography>
        </Grid>
    );
}