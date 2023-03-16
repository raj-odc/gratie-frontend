import * as React from 'react';

import Container from '@mui/material/Container';

import List from './list';

// todo:
// Add tier ID button

export default function Admin() {

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