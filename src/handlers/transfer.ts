import * as anchor from "@project-serum/anchor";
import { getCompanyLicense, getCompanyLicensePDA, getCompanyRewardsBucketPDA, getGratieWalletPDA, getTierPDA, getUserPDA, getUserRewardsBucketPDA } from "./pda";

import { GratieSolana } from "../lib/types/gratie_solana";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";


export const transferTokensToUser = async (program: anchor.Program<GratieSolana> | any, wallet: anchor.Wallet, amount: anchor.BN, company_name:string, user_id:string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, company_name);
  const companyRewardsBucketPDA = getCompanyRewardsBucketPDA(program, companyLicensePDA);
  const companyRewardsBucket = await program.account.companyRewardsBucket.fetch(companyRewardsBucketPDA);

  const userPDA = getUserPDA(program, companyLicensePDA, user_id);
  const user = await program.account.user.fetch(userPDA);
  const userRewardsBucketPDA = getUserRewardsBucketPDA(program, userPDA);

  const userRewardsBucket = await program.account.userRewardsBucket.fetch(userRewardsBucketPDA);


  await program.methods.transferCompanyRewardsToUserRewardsBucket(company_name, user_id, amount).accounts({
    sender: wallet.publicKey,
    companyLicense: companyLicensePDA,
    from: companyRewardsBucketPDA,
    fromTokenAccount: companyRewardsBucket.tokenAccount,
    to: userRewardsBucketPDA,
    toTokenAccount: userRewardsBucket.tokenAccount,
    user: userPDA,
    tokenProgram: TOKEN_PROGRAM_ID,
    userAccount: user.owner,
  }).rpc();

}