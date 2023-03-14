import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { checkAdmin, connectToGratieSolanaContract } from '@/src/gratie_solana_contract/gratie_solana_contract';
import { verifyCompanyLicense } from '@/src/gratie_solana_contract/gratie_solana_company';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function ListUserTable(props:any) {
    const wallet = useWallet();

    const handleVerify = async(companyName:string) => {
        const program = await connectToGratieSolanaContract();
        const walletPubKey:any = wallet.publicKey;
        const isAdmin = await checkAdmin(program, walletPubKey);
        if(!isAdmin){
            confirm("You can't do Verify until you are admin");
            return;
        }
        await verifyCompanyLicense(program, walletPubKey, companyName);
        await props.getAllPendingCompanies();
    }
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440, overflow: 'scroll' }} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell align="right">Company Email</TableCell>
            <TableCell align="right">Company Evaluation</TableCell>
            <TableCell align="right">Company TierID</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row:any) => (
            <TableRow
              key={row.account.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.account.name}
              </TableCell>
              <TableCell align="right">{row.account.email}</TableCell>
              <TableCell align="right">{row.account.evaluation?.toNumber()}</TableCell>
              <TableCell align="right">1</TableCell>
              {
                row.account.verified ? 
                <TableCell align="right">Verified</TableCell> :
                <TableCell align="right" onClick={() => handleVerify(row.account.name)}><Button sx={{border: '2px solid #00FF01'}}>Verify</Button></TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}