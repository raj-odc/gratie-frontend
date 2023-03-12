import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default function Pricing(){
    return(
        <div>
            <Typography
        variant="h4"
        noWrap
        
      >Pricing</Typography>
        <Grid container spacing={1} sx={{margin:'auto'}}>
            <Grid item xs={12} md={3}>
                <Box sx={{ width:210, height:210, border:'2px solid #00FF01', borderRadius:'12px'}} 
                />
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12,
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > Platinum</Typography>
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12,
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > $ 1000.00</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
                <Box sx={{ width:210, height:210, border:'2px solid #00FF01', borderRadius:'12px'}} 
                />
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12,
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > Gold</Typography>
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12,
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > $ 900.00</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
                <Box sx={{ width:210, height:210, border:'2px solid #00FF01', borderRadius:'12px'}} 
                />
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12, 
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > Silver</Typography>
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12,
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > $ 800.00</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
                <Box sx={{ width:210, height:210, border:'2px solid #00FF01', borderRadius:'12px'}} 
                />
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12,
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > Bronze</Typography>
                <br/>
                <Typography variant="h5"
                 sx={{
                   fontSize:'40px', ml:-12,
                   fontFamily: 'Book antique',
                   color: 'inherit',
                   textAlign:"center"
                }} > $ 700.00</Typography>
            </Grid>
        </Grid>
        </div>
    );
}