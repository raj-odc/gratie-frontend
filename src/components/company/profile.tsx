import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Grid, Typography } from '@mui/material';

import { useState } from 'react'

import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { getCompanyLicensePDA, getCompanyRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_pda';

import { listCompanyLicenses, getAllVerifiedLicenses, getAllPendingLicenses } from "@/src/gratie_solana_contract/gratie_solana_company";

import List from './list'
import Link from 'next/link';

// import '@/styles/form.css';

  // todo:
  // Add tier ID button

export interface Props {
  license: any;
}

export default function Profile(props: Props) {

  console.log("props",props)

  return (
    <div className=''>
      {
        props.license && <Grid>
          <Typography
              variant="body2"
              className="core-values sub-text"
              > {props.license.account.name}
              </Typography>
              <Typography
              variant="body2"
              className="core-values sub-text"
              > {props.license.account.email}
              </Typography>
              <Typography
              variant="body2"
              className="core-values sub-text"
              > {props.license.account.evaluation.toNumber()}
              </Typography>
        </Grid> 
      }
    </div>
  );
}