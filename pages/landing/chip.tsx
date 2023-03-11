import Grid from '@mui/material/Grid'

export default function Chip(){
    return(
        <Grid container spacing={1} sx={{margin:'auto'}}>
            <Grid item xs={12} md={4}>
                <div className='line' />
            </Grid>
            <Grid item xs={12} md={4} className="rotate">
                <div className='circle'>
                    <div className='dotted-circle'>
                        <div className='faded-circle' />
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <div className='line' />
            </Grid>
        </Grid>
    );
}