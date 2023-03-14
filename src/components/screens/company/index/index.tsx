import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

export default function Index(){
    return(
        <Container sx={{width:'90%', mt:20}}>
            <br/>
            <Typography variant="h5"
                 sx={{
                   fontSize:'36px',
                   fontFamily: 'Book antique',
                   color: '#d9d9d9',
                   textAlign:"center",
                   mt:3
                }} >
                    Welcome to the next generation crypto reward 
                    <br/>
                    management system!
            </Typography>
        <Grid container spacing={7} sx={{margin:'auto', mt:5}}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button className="enterprise enterprise-btn"> I am an Enterprise </Button>
            </Grid>
            <br/>
            <br/>
            <Grid item xs={12} sm={6} md={6} lg={6}>
            <Button className="enterprise"> I work for an Enterprise </Button>
            </Grid>
        </Grid>
        </Container>
    );
}