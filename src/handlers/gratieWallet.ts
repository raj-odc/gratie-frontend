import { getGratieWalletPDA } from "./pda";
import * as anchor from "@project-serum/anchor";
import { GratieSolana } from "../lib/types/gratie_solana";


export const withdrawFromGratieWallet = async (program: anchor.Program<GratieSolana> | any, wallet: anchor.Wallet, amount: number) => {
  const gratieWalletPDA = getGratieWalletPDA(program);

  await program.methods.withdrawFromGratieWallet(new anchor.BN(amount)).accounts({
    withdrawer: wallet.publicKey,
    gratieWallet: gratieWalletPDA,
  }).rpc();
};


export const createGratieWallet = async (program: anchor.Program<GratieSolana> | any, wallet: anchor.Wallet) => {
  const gratieWalletPDA = getGratieWalletPDA(program);
  await program.methods.createGratieWallet().accounts({
    owner: wallet.publicKey,
    gratieWallet: gratieWalletPDA,
  }).rpc();
};