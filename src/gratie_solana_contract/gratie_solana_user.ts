import * as anchor from "@project-serum/anchor";
import { program } from "@project-serum/anchor/dist/cjs/native/system";
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";
import { base64 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getCompanyLicense, getCompanyLicensePDA, getCompanyRewardsBucket, getCompanyRewardsBucketPDA, getGratieWalletPDA, getTierPDA, getUserPDA, getUserRewardsBucketPDA } from "./gratie_solana_pda";
import { companyCreateInitialTokenAccountForUser, createMintKeyAndTokenAccount, userCreateTokenAccount } from "./gratie_solana_util";
import { GratieSolana } from "./types/gratie_solana";
import AES from "crypto-js/aes";
import { encryptPassword } from "../utils/encryption";
import { enc } from "crypto-js";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { connectToGratieSolanaContract, connectToGratieSolanaContractWithKeypair } from "./gratie_solana_contract";

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

export const getCompanyUser = async (program: anchor.Program<GratieSolana>, walletPubKey: anchor.web3.PublicKey) => {
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

// the user needs to have the encrypted user password to decrypt the private key
export const userGetPrivateKey = async (program: anchor.Program<GratieSolana>, userPasswordPlaintext: string, userEmail: string, companyName: string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, companyName);

  const email_sha = sha256.hash(userEmail);
  const userId = email_sha.substring(0, 16);
  const userPDA = getUserPDA(program, companyLicensePDA, userId);
  const user = await program.account.user.fetch(userPDA);

  let encKey = "";

  if (user.claimed) {
    encKey = sha256.hash(userPasswordPlaintext + userId);
  } else {
    const encryptedUserPassword = await encryptPassword(userPasswordPlaintext, user.userPasswordSalt!);

    // there's gonna be a lot of coading required to support different encryption algorithms
    // maybe store these config settings as json in the user account
    console.log("encryptedUserPassword: ", encryptedUserPassword);

    encKey = sha256.hash(encryptedUserPassword + userId);

  }

  const decryptedPrivKey = AES.decrypt(user.encryptedPrivateKey!, encKey).toString(enc.Utf8);

  console.log('decryptedPrivateKey:', decryptedPrivKey);

  const buffer = base64.decode(decryptedPrivKey);
  const keypair = anchor.web3.Keypair.fromSecretKey(buffer);


  return keypair;

};


// claims the user to a new private key that is generated here
export const claimUser = async (program: anchor.Program<GratieSolana>, userPassword: string, userEmail: string, companyName: string) => {
  const newUserKeypair = anchor.web3.Keypair.generate();

  const userId = sha256.hash(userEmail).substring(0, 16);

  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePDA);
  const tokenMintPubkey = companyRewardsBucket.tokenMintKey;
  const userPDA = getUserPDA(program, companyLicensePDA, userId);
  const user = await program.account.user.fetch(userPDA);

  if (user.claimed) {
    throw new Error("User already claimed");
  }


  const userRewardsBucketPDA = getUserRewardsBucketPDA(program, userPDA);
  const userRewardsBucket = await program.account.userRewardsBucket.fetch(userRewardsBucketPDA);


  const encKey = sha256.hash(userPassword + userId);
  const privKey = base64.encode(Buffer.from(newUserKeypair.secretKey));

  const encryptedPrivateKey = AES.encrypt(privKey, encKey).toString();

  const oldUser = await userGetPrivateKey(program, userPassword, userEmail, companyName);


  const userProgram = await connectToGratieSolanaContractWithKeypair(oldUser);

  const tokenAccount = await userCreateTokenAccount(userProgram, oldUser, tokenMintPubkey, newUserKeypair.publicKey);

  console.log("newUserKeypair.publicKey: ", newUserKeypair.publicKey.toBase58());
  console.log('newTokenAccount:', tokenAccount.toBase58());

  //TODO: add the signer to anchor somehow
  // so that the tests can sign with diffrent accounts


  console.log('SENDING CLAIM USER TX');

  await userProgram.methods.claimUser(encryptedPrivateKey).accounts({
    claimer: user.owner,
    user: userPDA,
    userRewardsBucket: userRewardsBucketPDA,
    userAccount: newUserKeypair.publicKey,
    oldTokenAccount: userRewardsBucket.tokenAccount,
    newTokenAccount: tokenAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
  }).signers([oldUser]).rpc();

};

export const claimUserToHisOwnWallet = async (program: anchor.Program<GratieSolana>, newUserPubKey: anchor.web3.PublicKey, userPassword: string, companyName: string, userEmail: string) => {

  const userId = sha256.hash(userEmail).substring(0, 16);
  const companyLicensePDA = getCompanyLicensePDA(program, companyName);
  const companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePDA);
  const tokenMintPubkey = companyRewardsBucket.tokenMintKey;
  const userPDA = getUserPDA(program, companyLicensePDA, userId);
  const user = await program.account.user.fetch(userPDA);

  if (!user.claimed) {
    throw new Error("User not claimed yet, user needs to be claimed before being able to claim to his own wallet");
  }

  if (user.claimedToHisOwnWallet) {
    throw new Error("User already claimed to his own wallet");
  }


  const userRewardsBucketPDA = getUserRewardsBucketPDA(program, userPDA);
  const userRewardsBucket = await program.account.userRewardsBucket.fetch(userRewardsBucketPDA);

  const oldUser = await userGetPrivateKey(program, userPassword, userEmail, companyName);

  // create tokenaccount with fees from olduser account and associat token to new account
  const tokenAccount = await userCreateTokenAccount(program, oldUser, tokenMintPubkey, newUserPubKey);


  await program.methods.claimUserToHisOwnWallet(
    newUserPubKey,
  ).accounts({
    claimer: user.owner,
    user: userPDA,
    userAccount: newUserPubKey,
    userRewardsBucket: userRewardsBucketPDA,
    oldTokenAccount: userRewardsBucket.tokenAccount,
    newTokenAccount: tokenAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
  }).signers([oldUser]).rpc();

};