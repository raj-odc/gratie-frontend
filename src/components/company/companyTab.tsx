import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Token from './token'
import Profile from './profile'
import Users from './users'
import Subscription from './subscription'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{marginLeft: '0px'}}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, ml: 0}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CompanyTab(props:any) {

  const [value, setValue] = React.useState(props.showProfile ? 3 : 0 );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickTab = (tabNo: number) => {
    setValue(tabNo);
  }

  return (
    <Container className='admin-list' component="main" maxWidth="md">
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className={value==0 ? 'selected-tab' : 'non-selected-tab'} label="Subscription" {...a11yProps(0)} />
              <Tab className={value==1 ? 'selected-tab' : 'non-selected-tab'} label="Issue Reward" {...a11yProps(1)} />
              <Tab className={value==2 ? 'selected-tab' : 'non-selected-tab'} label="My Rewards" {...a11yProps(2)} />
              <Tab className={value==3 ? 'selected-tab' : 'non-selected-tab'} label="Profile" {...a11yProps(3)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
           {
             <Subscription handleClickTab={handleClickTab}/>
           }
        </TabPanel>
        <TabPanel value={value} index={1}>
            {
              <Users {...props}/>
            }
        </TabPanel>
        <TabPanel value={value} index={2}>
            {
             <Token {...props}/>
            }
        </TabPanel>
        <TabPanel value={value} index={3}>
            {
              <Profile companyLicense = {props.license}/>
            }
        </TabPanel>
        </Box>
    </Container>
  );
}