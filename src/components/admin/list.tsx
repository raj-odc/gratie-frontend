import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { listCompanyLicenses, verifyCompanyLicense, getAllVerifiedLicenses, getAllPendingLicenses } from "@/src/gratie_solana_contract/gratie_solana_company";
import { useEffect } from 'react';
import ListUserTable from './table';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [pendingLicenses, setPendingLicenses] = React.useState(null);
  const [approvedLicenses, setApprovedLicenses] = React.useState(null);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getAllPendingCompanies = async () => {
    console.log("sdfsfsd--------")
    const program = await connectToGratieSolanaContract();
    const pendingLics = await getAllPendingLicenses(program);
    setPendingLicenses(pendingLics);
    return pendingLics;
  }

  const approveCompanyLicense = async () => {
    const program = await connectToGratieSolanaContract();
    const verifiedLics = await getAllVerifiedLicenses(program);
    setApprovedLicenses(verifiedLics);
    console.log("verifiedLics", verifiedLics)
    return verifiedLics;
  }

  useEffect(() => {
    approveCompanyLicense();
    getAllPendingCompanies();
  }, []);

  return (
    <Container className='admin-list' component="main" maxWidth="md">
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab className={value==0 ? 'selected-tab' : 'non-selected-tab'} label="Pending Company" {...a11yProps(0)} />
            <Tab className={value==1 ? 'selected-tab' : 'non-selected-tab'} label="Verified Company" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
           {
             pendingLicenses && <ListUserTable data={pendingLicenses} getAllPendingCompanies={getAllPendingCompanies}/>
           }
        </TabPanel>
        <TabPanel value={value} index={1}>
            {
             approvedLicenses && <ListUserTable data={approvedLicenses} />
           }
            Item Two
        </TabPanel>
        </Box>
    </Container>
  );
}