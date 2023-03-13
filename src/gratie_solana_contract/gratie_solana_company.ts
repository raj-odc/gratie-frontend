import * as anchor from "@project-serum/anchor";
import { BN, Program } from "@project-serum/anchor";
import { program } from "@project-serum/anchor/dist/cjs/native/system";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getCompanyLicense, getCompanyLicensePDA, getCompanyRewardsBucket, getCompanyRewardsBucketPDA, getGratieWalletPDA, getTierPDA, getUserPDA, getUserRewardsBucketPDA } from "./gratie_solana_pda";
import { createMintKeyAndTokenAccount } from "./gratie_solana_util";
import { GratieSolana } from "./types/gratie_solana";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export interface CreateCompanyLicenseForm {
  name: string;
  email: string;
  jsonMetadataUrl: string;
  evaluation: number;
  tierID: number;
}

export interface CreateCompanyRewardsBucketForm {
  tokenName: string;
  tokenSymbol: string;
  tokenMetadataJsonUrl: string;
}


export const createCompanyLicense = async (program: anchor.Program<GratieSolana> | any, walletPubKey: anchor.web3.PublicKey, form: CreateCompanyLicenseForm) => {
  const companyLicensePDA = getCompanyLicensePDA(program, form.name);

  const { mintKey, tokenAccount } = await createMintKeyAndTokenAccount(program, walletPubKey);
  const tierPDA = getTierPDA(program, form.tierID);

  await program.methods.createCompanyLicense(form.name, form.email, form.jsonMetadataUrl, new anchor.BN(form.evaluation), form.tierID).accounts({
    mintAuthority: walletPubKey,
    companyLicense: companyLicensePDA,
    gratieWallet: getGratieWalletPDA(program),
    mint: mintKey.publicKey,
    tokenAccount: tokenAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
    tier: tierPDA,
    systemProgram: anchor.web3.SystemProgram.programId,
  }).rpc();

  const company = await getCompanyLicense(program, form.name);
  return company;
}

export const listCompanyLicenses = async (program: anchor.Program<GratieSolana>) => {
  const companyLicenses = await program.account.companyLicense.all();
  return companyLicenses;
};

export const getAllVerifiedLicenses = async (program: anchor.Program<GratieSolana>) => {
  const companyLicenses = await program.account.companyLicense.all();
  const verifiedCompanyLicenses = companyLicenses.filter(license => license.account.verified == true);
  return verifiedCompanyLicenses;
};

export const getAllPendingLicenses = async (program: anchor.Program<GratieSolana>) => {
  const companyLicenses = await program.account.companyLicense.all();
  const pendingCompanyLicenses = companyLicenses.filter(license => license.account.verified == false);
  return pendingCompanyLicenses;
};

export const verifyCompanyLicense = async (program: anchor.Program<GratieSolana>, walletPubKey: anchor.web3.PublicKey, companyName: string) => {
  const companyLicense = getCompanyLicensePDA(program, companyName);
  await program.methods.verifyCompanyLicense().accounts({ admin: walletPubKey, companyLicense: companyLicense }).rpc();

  const updatedLicense = await getCompanyLicense(program, companyName);
  return updatedLicense;
}

export const createCompanyRewardsBucket = async (program: anchor.Program<GratieSolana>, walletPubKey: anchor.web3.PublicKey, companyName: string, form: CreateCompanyRewardsBucketForm) => {

  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const companyRewardsBucketPDA = getCompanyRewardsBucketPDA(program, companyLicensePDA);

  const { mintKey, tokenAccount } = await createMintKeyAndTokenAccount(program, walletPubKey);


  await program.methods.createCompanyRewardsBucket(companyName, form.tokenName, form.tokenSymbol, form.tokenMetadataJsonUrl).accounts({
    mintAuthority: walletPubKey,
    companyLicense: companyLicensePDA,
    companyRewardsBucket: companyRewardsBucketPDA,
    mint: mintKey.publicKey,
    tokenAccount: tokenAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
  }).rpc();

  const bucket = await getCompanyRewardsBucket(program, companyLicensePDA);
  return bucket;

}

export const getCompanyRewardsBucketForCompany = async (program: anchor.Program<GratieSolana>, companyName: string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const bucket = await getCompanyRewardsBucket(program, companyLicensePDA);
  return bucket;
}

export const listCompanyRewardBuckets = async (program: anchor.Program<GratieSolana>) => {
  const buckets = await program.account.companyRewardsBucket.all();
  return buckets;
}

export const transferTokensToUser = async (program: anchor.Program<GratieSolana> | any, publicKey: anchor.web3.PublicKey, amount: anchor.BN, company_name:string, user_id:string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, company_name);
  const companyRewardsBucketPDA = getCompanyRewardsBucketPDA(program, companyLicensePDA);
  const companyRewardsBucket = await program.account.companyRewardsBucket.fetch(companyRewardsBucketPDA);

  const userPDA = getUserPDA(program, companyLicensePDA, user_id);
  const user = await program.account.user.fetch(userPDA);
  const userRewardsBucketPDA = getUserRewardsBucketPDA(program, userPDA);

  const userRewardsBucket = await program.account.userRewardsBucket.fetch(userRewardsBucketPDA);

  const transferRewards = await program.methods.transferCompanyRewardsToUserRewardsBucket(company_name, user_id, amount).accounts({
    sender: publicKey,
    companyLicense: companyLicensePDA,
    from: companyRewardsBucketPDA,
    fromTokenAccount: companyRewardsBucket.tokenAccount,
    to: userRewardsBucketPDA,
    toTokenAccount: userRewardsBucket.tokenAccount,
    user: userPDA,
    tokenProgram: TOKEN_PROGRAM_ID,
    userAccount: user.owner,
  }).rpc();
  return transferRewards;

}

export const createTier = async (program: Program<GratieSolana> | any, walletPubKey: anchor.web3.PublicKey, tierID: number, name: string, freeUserAmount: number, platformFeePerMille: number) => {
  
  console.log('tierID', tierID, freeUserAmount);
  console.log(platformFeePerMille, name);
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