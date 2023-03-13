import * as React from 'react';

import Container from '@mui/material/Container';

import { useState } from 'react';

import List from './list';

// todo:
// Add tier ID button

export default function Admin() {

  const [open, setOpen] = React.useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event:any, newTabIndex:number) => {
    setTabIndex(newTabIndex);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className=''>
      <React.Fragment>
        <Container className='' component="main" maxWidth="md">
           <List/>
        </Container>
      </React.Fragment>
    </div>
  );
}