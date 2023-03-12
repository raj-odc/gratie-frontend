import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import { List, ListItem } from '@mui/material';
import Link from 'next/link';

export default function CoreValue(){
    return(
        <Grid container spacing={10} sx={{ mt: 10 }} item xs={12}>
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
            <Grid item xs={12}>
            <Typography
              variant="h2"
              className="core-values head-text"
              noWrap
            >How we work </Typography>
            <br/>
            <Grid item xs={12} sx={{ margin:'auto', pl:10, pr:5}}>
            <List className="core-values sub-text"
              sx = {{
              listStyleType: 'number',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
              }}>
              <ListItem>
              Come to Gratie , purchase your tiered NFT according to your company needs
              </ListItem>
              <ListItem>
              Enter the application , connect your non custodial wallet which owns the NFT 
              </ListItem>
              <ListItem>
              Post verification you can use our application to start incentivising your service providers / users 
              </ListItem>
              <ListItem>
              Click on issue rewards , give required inputs ( company valuation, net revenue of last quarter, % of distribution, no of users )
              </ListItem>
              <ListItem>
              Based on your inputs your own enterprise&apos;s cryptocurrency is issued and supplied to the circulation , click on submit button and complete the transaction in blockchain.
              </ListItem>
              <ListItem>
              A magic link for minting user NFT&apos;s is created , share it to the necessary and they can claim the rewards within our dashboard itself.
              </ListItem>
              <ListItem>
              Enjoy hassle free maintenance of your ecosystem
              </ListItem>
            </List>
            </Grid>
            </Grid>
        </Grid>
    );
}