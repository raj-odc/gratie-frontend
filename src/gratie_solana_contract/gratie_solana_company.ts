import * as anchor from "@project-serum/anchor";
import { program } from "@project-serum/anchor/dist/cjs/native/system";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getCompanyLicense, getCompanyLicensePDA, getCompanyRewardsBucket, getCompanyRewardsBucketPDA, getGratieWalletPDA, getTierPDA } from "./gratie_solana_pda";
import { createMintKeyAndTokenAccount } from "./gratie_solana_util";
import { GratieSolana } from "./types/gratie_solana";

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