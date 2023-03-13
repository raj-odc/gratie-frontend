import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Grid } from '@mui/material';

import { useState } from 'react'

import { connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { getCompanyLicensePDA, getCompanyRewardsBucket } from '@/src/gratie_solana_contract/gratie_solana_pda';

import { listCompanyLicenses, getAllVerifiedLicenses, getAllPendingLicenses } from "@/src/gratie_solana_contract/gratie_solana_company";

import List from './list'
import Link from 'next/link';

// import '@/styles/form.css';

  // todo:
  // Add tier ID button


export default function Tier(props:any) {

  console.log("Tier props", props);
  return (
    <div className=''>
      
    </div>
  );
}