import { faker } from "@faker-js/faker";
import * as anchor from "@project-serum/anchor";
import { sha256 } from "@project-serum/anchor/dist/cjs/utils";
import { createCompanyLicense, createCompanyRewardsBucket, listCompanyLicenses, verifyCompanyLicense } from "./gratie_solana_company";
import { checkAdmin } from "./gratie_solana_contract";
import { createUser, createUserRewardsBucket } from "./gratie_solana_user";
import { GratieSolana } from "./types/gratie_solana";

// Here all functions are tested on the browser frontend

export const testAllGratieSolanaFunctions = async (program: anchor.Program<GratieSolana>, walletPubKey: anchor.web3.PublicKey) => {
  const companyName = faker.company.name();
  const userEmail = faker.internet.email();
  const userId = sha256.hash(userEmail).substring(0, 16);

  console.log('is admin?');

  const isAdmin = await checkAdmin(program, walletPubKey);
  console.log('isadmin:', isAdmin);


  console.log('Creating Company License');

  const companyLicense = await createCompanyLicense(program, walletPubKey, {
    name: companyName,
    jsonMetadataUrl: faker.internet.url(),
    email: faker.internet.email(),
    evaluation: 10000,
    tierID: 1,
  });

  console.log(companyLicense);


  console.log('Verifying Company License');

  await verifyCompanyLicense(program, walletPubKey, companyName);


  console.log('Creating Company Rewards Bucket');

  const bucket = await createCompanyRewardsBucket(program, walletPubKey, companyName, {
    tokenName: faker.internet.userName(),
    tokenSymbol: faker.internet.userName(),
    tokenMetadataJsonUrl: faker.internet.url(),
  });

  console.log(bucket);



  console.log('Listing Company Licenses');

  const licenses = await listCompanyLicenses(program);
  console.log(licenses);


  console.log('Creating user');


  const user = await createUser(program, walletPubKey, companyName, {
    userId: userId,
    encryptedPassword: faker.internet.password(),
    encryptedPasswordAlgorithm: 0,
    encryptedPasswordSalt: faker.internet.password(),
  });
  console.log(user);

  console.log('Creating user reward bucket');

  const userRewardBucket = await createUserRewardsBucket(program, walletPubKey, companyName, userId);

  console.log(userRewardBucket);

}