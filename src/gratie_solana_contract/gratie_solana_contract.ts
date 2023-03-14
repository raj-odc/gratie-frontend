import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { GratieSolana } from "./types/gratie_solana";
import idl from "./idl/gratie_solana.json";
import { PRODUCTION } from "../config";

console.log(process.env.NODE_ENV);

const NETWORK = PRODUCTION ? "https://api.devnet.solana.com" : "http://localhost:8899";

const PROGRAM_ID = PRODUCTION ? new PublicKey("FmG2zTeSd4rStaj6FD9W8WipbXGjDyF3e3btXTqBFbky") : new PublicKey(idl.metadata.address);

export const connectToGratieSolanaContract = async (): Promise<anchor.Program<GratieSolana>> => {
  const connection = new Connection(NETWORK, "processed");
  const provider = new anchor.AnchorProvider(connection, (window as any).solana, { preflightCommitment: 'processed' });

  const program: anchor.Program<GratieSolana> | any = new anchor.Program(idl as any, PROGRAM_ID, provider);

  return program;
}

export const checkAdmin = async (program: anchor.Program<GratieSolana>, admin: anchor.web3.PublicKey): Promise<boolean> => {
  try {
    await program.methods.isAdmin(admin).rpc();
    return true;
  } catch (e) {
    return false;

  }
}