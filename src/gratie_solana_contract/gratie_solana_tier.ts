import * as anchor from "@project-serum/anchor";
import { BN, Program } from "@project-serum/anchor";
import { program } from "@project-serum/anchor/dist/cjs/native/system";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getTierPDA } from "./gratie_solana_pda";
import { GratieSolana } from "./types/gratie_solana";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const createTier = async (program: Program<GratieSolana> | any, walletPubKey: anchor.web3.PublicKey, tierID: number, name: string, freeUserAmount: number, platformFeePerMille: number) => {
  const price = new BN(3 * LAMPORTS_PER_SOL);
  const priceForEachAdditionalUser = new BN(LAMPORTS_PER_SOL);
  // 15 is 1.5% here
  // const platformFeePerMille = 15;

  const tierPDA = getTierPDA(program, tierID);

  console.log("tierPDA", tierPDA.toBase58());

  const newTier = await program.methods.createTier(
    tierID,
    name,
    freeUserAmount,
    price,
    priceForEachAdditionalUser,
    platformFeePerMille,
  ).accounts({
    creator: walletPubKey,
    tier: tierPDA,
  }).rpc();
  return newTier;

}

export const getAllTiers = async (program: anchor.Program<GratieSolana>) => {
  const tiers = await program.account.tier.all();
  return tiers;
}