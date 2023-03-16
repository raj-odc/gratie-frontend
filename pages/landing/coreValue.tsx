import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

export default function CoreValue(){
    return(
        <Grid container spacing={10} sx={{ mt: 8 }} item xs={12}>
            <Grid item xs={12}>
            <Typography
              variant="h2"
              className="core-values head-text"
              noWrap
            >Core Values</Typography>
            <br/>
            <Grid item xs={12} sx={{ margin:'auto', pl:10, pr:5}}>
            <Typography
              variant="body2"
              className="core-values sub-text"
              > As an enterprise which follows a shared economy business model, retaining your users who provide the service within the platform is very difficult , and also maintaining a healthy ecosystem is very hectic . This is where Gratie comes into picture to help you out . We offer one of the kind reward system for your users which will help them stay loyal, motivated and maintain a healthy ecosystem within your company.
              </Typography>
            </Grid>
            </Grid>
        </Grid>
    );
}