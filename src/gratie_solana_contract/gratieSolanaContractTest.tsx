// This view is to test the contract in the frontend

import Button from '@mui/material/Button';
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { connectToGratieSolanaContract } from "./gratie_solana_contract";
import { testAllGratieSolanaFunctions } from "./gratie_solana_test";

const gratieSolonaContractTest = () => {
  const wallet = useWallet();

  const runTests = async () => {
    if (wallet.publicKey) {
      console.log('RUNNING SOLANA CONTRACT TESTS');
      const program = await connectToGratieSolanaContract();
      await testAllGratieSolanaFunctions(program, wallet.publicKey);
    } else {
      console.error("CAN'T RUN TESTS: No wallet connected");
    }

  };


  return (<div>
    <Button color="primary" type="button" variant="contained" onClick={runTests}>Run tests</Button>
  </div>)
};

export default gratieSolonaContractTest;