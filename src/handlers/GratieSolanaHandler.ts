/*
  Handler for all communications to the contract
  use the connect function first and pass the program to the other functions

  you can find all the functions in the gratie-solana repository in tests/
  you might have to adjust them a bit to work in the browser
  but the general idea is the same

  to list all accounts of a specific type you can
  
  const accounts = await program.account.<name>.all();

  const companyLicenses = await program.account.companyLicense.all();


  const solanaPubkey = solana.publicKey;
  
  companyLicenses.filter(p => p.publicKey == solanaPublicky);

  //filter companyLicense and find the one with the license you want

  const companyLicensePubkey = companyLicenses[0].publicKey;

  try {
    // will fail when none exist
  const companyRewardsBucket = await getCompanyRewardsBucket(program, companyLicensePubkey);
  } catch (e) {
  }




*/



import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { GratieSolana } from "../lib/types/gratie_solana";
import idl from "../lib/idl/gratie_solana.json";
import { BN } from "bn.js";
import { createAssociatedTokenAccountInstruction, createInitializeMintInstruction, getAssociatedTokenAddress, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";

interface CreateCompanyLicenseForm {
  name: string;
  email: string;
  logoUri: string;
  evaluation: number;
  tierID: number;
}

export class GratieSolanaHandler {
  public static async connect(): Promise<anchor.Program<GratieSolana>> {
    // change this to devnet later when we use devnet
    const network = 'http://localhost:8899';

    // do some checks here if the wallet exists
    const { solana } = window as any;
    const response = await solana.connect();
    // once the user has connected for the first time you can use below
    //const response = await solana.connect({ onlyIfTrusted: true });

    console.log("Connected with public key: ", response.publicKey.toString());

    const connection = new Connection(network, "processed");
    const provider = new AnchorProvider(connection, solana, { preflightCommitment: 'processed' });
    const programID = new PublicKey(idl.metadata.address);
    const program: anchor.Program<GratieSolana> = new anchor.Program(idl as any, programID, provider);

    return program;
  }


  // solana is window.solana
  public static async createCompanyLicense(program: Program<GratieSolana>, solana: any, form: CreateCompanyLicenseForm) {
    const companyLicensePDA = getCompanyLicensePDA(program, form.name);

    const { mintKey, tokenAccount } = await createMintKeyAndTokenAccount(program, solana.publicKey);
    const tierPDA = getTierPDA(program, form.tierID);

    await program.methods.createCompanyLicense(form.name, form.email, form.logoUri, new BN(form.evaluation), form.tierID).accounts({
      mintAuthority: solana.publicKey,
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
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const createMintKeyAndTokenAccount = async (program: Program<GratieSolana>, walletPublicKey: anchor.web3.PublicKey) => {
  const mintKey: anchor.web3.Keypair = anchor.web3.Keypair.generate();

  const tokenAccount = await getAssociatedTokenAddress(
    mintKey.publicKey,
    walletPublicKey,
  );

  // TODO: move this to another function
  const lamports: number =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );

  const mint_tx = new anchor.web3.Transaction().add(
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: walletPublicKey,
      newAccountPubkey: mintKey.publicKey,
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
      lamports,
    }),
    createInitializeMintInstruction(
      mintKey.publicKey,
      0,
      walletPublicKey,
      walletPublicKey
    ),
    createAssociatedTokenAccountInstruction(
      walletPublicKey,
      tokenAccount,
      walletPublicKey,
      mintKey.publicKey
    )
  );

  await program.provider.sendAndConfirm!(mint_tx, [mintKey]);

  return { mintKey, tokenAccount };
}


// PDA helper functions you can get them from test/pda in gratie-solana

export const getCompanyLicense = async (program: Program<GratieSolana>, company_name: string) => {
  const companyLicensePDA = getCompanyLicensePDA(program, company_name);
  return await program.account.companyLicense.fetch(companyLicensePDA);
}

export const getTierPDA = (program: Program<GratieSolana>, tierID: number) => {
  return getPDA(program, 'tier', [tierID]);
}

const getCompanyLicensePDA = (program: Program<GratieSolana>, company_name: string) => {
  return getPDA(program, 'company_license', [company_name]);
}

export const getGratieWalletPDA = (program: Program<GratieSolana>) => {
  return getPDA(program, 'gratie_wallet', []);
};

export const getCompanyRewardsBucketPDA = (program: Program<GratieSolana>, companyLicensePDA: anchor.web3.PublicKey) => {
  return getPDA(program, 'company_rewards_bucket', [companyLicensePDA]);
}

const getPDA = (program: Program<GratieSolana>, id: string, keys: (anchor.web3.PublicKey | string | number)[]) => {
  const [pda, _] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode(id),
      ...keys.map((key) => {
        if (typeof key === 'string') {
          return anchor.utils.bytes.utf8.encode(key);
        } else if (typeof key === 'number') {
          if (key < 0) {
            throw new Error('negative number');
          }

          if (key <= 255) {
            return new Uint8Array([key]);
          }

          throw new Error('number too big');
        }
        else {
          return key.toBuffer()
        }
      }),
    ],
    program.programId
  );
  return pda;
}