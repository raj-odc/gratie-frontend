import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { GratieSolana } from "./types/gratie_solana";
import idl from "./idl/gratie_solana.json";

console.log(process.env.NODE_ENV);

const NETWORK = process.env.NODE_ENV === 'development' ? "http://localhost:8899" : "https://api.devnet.solana.com";

const PROGRAM_ID = process.env.NODE_ENV === 'development' ? new PublicKey(idl.metadata.address) : new PublicKey("FmG2zTeSd4rStaj6FD9W8WipbXGjDyF3e3btXTqBFbky");

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