import * as anchor from "@project-serum/anchor";
import { program } from "@project-serum/anchor/dist/cjs/native/system";
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";
import { base64 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getCompanyLicense, getCompanyLicensePDA, getCompanyRewardsBucket, getCompanyRewardsBucketPDA, getGratieWalletPDA, getTierPDA, getUserPDA, getUserRewardsBucketPDA } from "./gratie_solana_pda";
import { companyCreateInitialTokenAccountForUser, createMintKeyAndTokenAccount } from "./gratie_solana_util";
import { GratieSolana } from "./types/gratie_solana";
import AES from "crypto-js/aes";

export interface CreateUserForm {
  // sha256 hash of user email see gratie_solana_test.ts
  userId: string;
  encryptedPassword: string;
  encryptedPasswordAlgorithm: number,
  encryptedPasswordSalt: string,
}


export const createUser = async (program: anchor.Program<GratieSolana>, walletPubKey: anchor.web3.PublicKey, companyName: string, form: CreateUserForm) => {
  // password encryption
  //const encryptedPassword = await encryptUserPassword(USER_PASSWORD, USER_PASSWORD_SALT);

  const user = anchor.web3.Keypair.generate();

  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const companyLicense = await program.account.companyLicense.fetch(companyLicensePDA);
  const userPDA = getUserPDA(program, companyLicensePDA, form.userId);

  // encrypt the private key with the encrypted user password and the user id
  const encKey = sha256.hash(form.encryptedPassword + form.userId);
  const privKey = base64.encode(Buffer.from(user.secretKey));
  console.log("privKey: ", privKey);
  const encryptedPrivKey = AES.encrypt(privKey, encKey);

  console.log("encryptedPrivKey: ", encryptedPrivKey.toString());


  await program.methods.createUser(companyName, form.userId, encryptedPrivKey.toString(), form.encryptedPasswordAlgorithm, form.encryptedPasswordSalt).accounts({
    mintAuthority: walletPubKey,
    companyLicense: companyLicensePDA,
    tier: companyLicense.tier,
    userAccount: user.publicKey,
    user: userPDA,
  }).rpc();

  return await getUser(program, companyName, form.userId);
};

export const getUser = (program: anchor.Program<GratieSolana>, companyName: string, userId: string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const userPDA = getUserPDA(program, companyLicensePDA, userId);
  return program.account.user.fetch(userPDA);
};

export const getCompanyUser = async(program: anchor.Program<GratieSolana>, walletPubKey: anchor.web3.PublicKey) => {
  const users = await program.account.user.all()
  const usersList: any = users.filter(user => user.account.company.toString() == walletPubKey.toString());
  return usersList
}

export const createUserRewardsBucket = async (program: anchor.Program<GratieSolana>, walletPubKey: anchor.web3.PublicKey, companyName: string, userId: string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const companyRewardsBucketPDA = getCompanyRewardsBucketPDA(program, companyLicensePDA);
  const companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePDA);
  const userPDA = getUserPDA(program, companyLicensePDA, userId);
  const userRewardsBucketPDA = getUserRewardsBucketPDA(program, userPDA);
  const user = await program.account.user.fetch(userPDA);
  const tokenMintPubkey = companyRewardsBucket.tokenMintKey;

  const tokenAccount = await companyCreateInitialTokenAccountForUser(program, walletPubKey, tokenMintPubkey, user.owner);

  console.log("userRewardsBucketPDA: ", userRewardsBucketPDA.toBase58());


  await program.methods.createUserRewardsBucket(companyName, userId).accounts({
    mintAuthority: walletPubKey,
    user: userPDA,
    companyLicense: companyLicensePDA,
    companyRewardsBucket: companyRewardsBucketPDA,
    userRewardsBucket: userRewardsBucketPDA,
    tokenAccount: tokenAccount,
  }).rpc();

  return await program.account.userRewardsBucket.fetch(userRewardsBucketPDA);

}

export const getUserRewardsBucket = async (program: anchor.Program<GratieSolana>, companyName: string, userId: string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const userPDA = getUserPDA(program, companyLicensePDA, userId);
  const userRewardsBucketPDA = getUserRewardsBucketPDA(program, userPDA);
  return await program.account.userRewardsBucket.fetch(userRewardsBucketPDA);
}