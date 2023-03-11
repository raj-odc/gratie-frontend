export type GratieSolana = {
  "version": "0.1.0",
  "name": "gratie_solana",
  "instructions": [
    {
      "name": "withdrawFromGratieWallet",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gratieWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountLamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createGratieWallet",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gratieWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createCompanyLicense",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gratieWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tier",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "logoUri",
          "type": "string"
        },
        {
          "name": "evaluation",
          "type": "u64"
        },
        {
          "name": "tierId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUserRewardsBucket",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCompanyRewardsBucket",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        }
      ]
    },
    {
      "name": "transferCompanyRewardsToUserRewardsBucket",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimUser",
      "accounts": [
        {
          "name": "claimer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newUserEncryptedPrivateKey",
          "type": "string"
        }
      ]
    },
    {
      "name": "claimUserToHisOwnWallet",
      "accounts": [
        {
          "name": "claimer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newUserPublicKey",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        },
        {
          "name": "encryptedPrivateKey",
          "type": "string"
        },
        {
          "name": "userPasswordEncryptionAlgorithm",
          "type": "u8"
        },
        {
          "name": "userPasswordSalt",
          "type": "string"
        }
      ]
    },
    {
      "name": "verifyCompanyLicense",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintCompanyLicenseMetaplex",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "creatorKey",
          "type": "publicKey"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTier",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "freeUserLimit",
          "type": "u32"
        },
        {
          "name": "priceLamports",
          "type": "u64"
        },
        {
          "name": "additionalUserPriceLamports",
          "type": "u64"
        },
        {
          "name": "platformFeePermille",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "companyLicense",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tier",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "logoUri",
            "type": "string"
          },
          {
            "name": "evaluation",
            "type": "u64"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "tokenAccount",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "userCount",
            "type": "u64"
          },
          {
            "name": "paidUserLimit",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "companyRewardsBucket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "companyLicense",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenMintKey",
            "type": "publicKey"
          },
          {
            "name": "userRewardsBucketCount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gratieWallet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "amountEarned",
            "type": "u128"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "freeUserLimit",
            "type": "u32"
          },
          {
            "name": "priceLamports",
            "type": "u64"
          },
          {
            "name": "additionalUserPriceLamports",
            "type": "u64"
          },
          {
            "name": "platformFeePermille",
            "type": "u16"
          },
          {
            "name": "companyLicenseCount",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userRewardsBucket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "claimedAt",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "company",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "userId",
            "type": "string"
          },
          {
            "name": "encryptedPrivateKey",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "userPasswordEncryptionAlgorithm",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "userPasswordSalt",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "claimed",
            "type": "bool"
          },
          {
            "name": "claimedToHisOwnWallet",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NameTooLong",
      "msg": "Name needs to be less than 200 characters"
    },
    {
      "code": 6001,
      "name": "EmailTooLong",
      "msg": "Email needs to be less than 200 characters"
    },
    {
      "code": 6002,
      "name": "UriTooLong",
      "msg": "Uri needs to be less than 200 characters"
    },
    {
      "code": 6003,
      "name": "CompanyLicenseAlreadyExists",
      "msg": "Your company license already exists!"
    },
    {
      "code": 6004,
      "name": "CompanyLicenseNotVerified",
      "msg": "Your company license is not verified yet!"
    },
    {
      "code": 6005,
      "name": "CompanyLicenseAlreadyMintedRewards",
      "msg": "Your company license has already minted rewards!"
    },
    {
      "code": 6006,
      "name": "CompanyLicenseHasNotMintedRewards",
      "msg": "Your company license has not minted any rewards yet!"
    },
    {
      "code": 6007,
      "name": "NotAdmin",
      "msg": "Unauthorized, You are not an admin"
    },
    {
      "code": 6008,
      "name": "BumpNotFound",
      "msg": "Bump was not found on object in context"
    },
    {
      "code": 6009,
      "name": "MaxUsersReached",
      "msg": "max users reached"
    },
    {
      "code": 6010,
      "name": "InsufficientFunds",
      "msg": "Account has insufficient funds"
    },
    {
      "code": 6011,
      "name": "EncryptedPrivateKeyTooLong",
      "msg": "Encrypted Private Key is too long"
    },
    {
      "code": 6012,
      "name": "InvalidTokenAccount",
      "msg": "Invalid Token Account"
    },
    {
      "code": 6013,
      "name": "InvalidOldTokenAccount",
      "msg": "Invalid Old Token Account"
    },
    {
      "code": 6014,
      "name": "InvalidNewTokenAccount",
      "msg": "Invalid New Account"
    },
    {
      "code": 6015,
      "name": "InvalidTier",
      "msg": "Invalid Tier"
    },
    {
      "code": 6016,
      "name": "UserAlreadyClaimed",
      "msg": "User has already been claimed"
    },
    {
      "code": 6017,
      "name": "UserNotClaimedYet",
      "msg": "User has not been claimed yet, user needs to be claimed in order to claim to his own wallet"
    },
    {
      "code": 6018,
      "name": "UserAlreadyClaimedToHisOwnWallet",
      "msg": "User has already been claimed to his own wallet"
    }
  ]
};

export const IDL: GratieSolana = {
  "version": "0.1.0",
  "name": "gratie_solana",
  "instructions": [
    {
      "name": "withdrawFromGratieWallet",
      "accounts": [
        {
          "name": "withdrawer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gratieWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amountLamports",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createGratieWallet",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "gratieWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createCompanyLicense",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gratieWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tier",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "logoUri",
          "type": "string"
        },
        {
          "name": "evaluation",
          "type": "u64"
        },
        {
          "name": "tierId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUserRewardsBucket",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCompanyRewardsBucket",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "companyRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        }
      ]
    },
    {
      "name": "transferCompanyRewardsToUserRewardsBucket",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimUser",
      "accounts": [
        {
          "name": "claimer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newUserEncryptedPrivateKey",
          "type": "string"
        }
      ]
    },
    {
      "name": "claimUserToHisOwnWallet",
      "accounts": [
        {
          "name": "claimer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardsBucket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oldTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newUserPublicKey",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tier",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        },
        {
          "name": "userId",
          "type": "string"
        },
        {
          "name": "encryptedPrivateKey",
          "type": "string"
        },
        {
          "name": "userPasswordEncryptionAlgorithm",
          "type": "u8"
        },
        {
          "name": "userPasswordSalt",
          "type": "string"
        }
      ]
    },
    {
      "name": "verifyCompanyLicense",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "companyLicense",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintCompanyLicenseMetaplex",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "creatorKey",
          "type": "publicKey"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTier",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tier",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "freeUserLimit",
          "type": "u32"
        },
        {
          "name": "priceLamports",
          "type": "u64"
        },
        {
          "name": "additionalUserPriceLamports",
          "type": "u64"
        },
        {
          "name": "platformFeePermille",
          "type": "u16"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "companyLicense",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "tier",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "logoUri",
            "type": "string"
          },
          {
            "name": "evaluation",
            "type": "u64"
          },
          {
            "name": "verified",
            "type": "bool"
          },
          {
            "name": "tokenAccount",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "userCount",
            "type": "u64"
          },
          {
            "name": "paidUserLimit",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "companyRewardsBucket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "companyLicense",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenMintKey",
            "type": "publicKey"
          },
          {
            "name": "userRewardsBucketCount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gratieWallet",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "amountEarned",
            "type": "u128"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tier",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "freeUserLimit",
            "type": "u32"
          },
          {
            "name": "priceLamports",
            "type": "u64"
          },
          {
            "name": "additionalUserPriceLamports",
            "type": "u64"
          },
          {
            "name": "platformFeePermille",
            "type": "u16"
          },
          {
            "name": "companyLicenseCount",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userRewardsBucket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "tokenAccount",
            "type": "publicKey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "claimedAt",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "company",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "userId",
            "type": "string"
          },
          {
            "name": "encryptedPrivateKey",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "userPasswordEncryptionAlgorithm",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "userPasswordSalt",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "claimed",
            "type": "bool"
          },
          {
            "name": "claimedToHisOwnWallet",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NameTooLong",
      "msg": "Name needs to be less than 200 characters"
    },
    {
      "code": 6001,
      "name": "EmailTooLong",
      "msg": "Email needs to be less than 200 characters"
    },
    {
      "code": 6002,
      "name": "UriTooLong",
      "msg": "Uri needs to be less than 200 characters"
    },
    {
      "code": 6003,
      "name": "CompanyLicenseAlreadyExists",
      "msg": "Your company license already exists!"
    },
    {
      "code": 6004,
      "name": "CompanyLicenseNotVerified",
      "msg": "Your company license is not verified yet!"
    },
    {
      "code": 6005,
      "name": "CompanyLicenseAlreadyMintedRewards",
      "msg": "Your company license has already minted rewards!"
    },
    {
      "code": 6006,
      "name": "CompanyLicenseHasNotMintedRewards",
      "msg": "Your company license has not minted any rewards yet!"
    },
    {
      "code": 6007,
      "name": "NotAdmin",
      "msg": "Unauthorized, You are not an admin"
    },
    {
      "code": 6008,
      "name": "BumpNotFound",
      "msg": "Bump was not found on object in context"
    },
    {
      "code": 6009,
      "name": "MaxUsersReached",
      "msg": "max users reached"
    },
    {
      "code": 6010,
      "name": "InsufficientFunds",
      "msg": "Account has insufficient funds"
    },
    {
      "code": 6011,
      "name": "EncryptedPrivateKeyTooLong",
      "msg": "Encrypted Private Key is too long"
    },
    {
      "code": 6012,
      "name": "InvalidTokenAccount",
      "msg": "Invalid Token Account"
    },
    {
      "code": 6013,
      "name": "InvalidOldTokenAccount",
      "msg": "Invalid Old Token Account"
    },
    {
      "code": 6014,
      "name": "InvalidNewTokenAccount",
      "msg": "Invalid New Account"
    },
    {
      "code": 6015,
      "name": "InvalidTier",
      "msg": "Invalid Tier"
    },
    {
      "code": 6016,
      "name": "UserAlreadyClaimed",
      "msg": "User has already been claimed"
    },
    {
      "code": 6017,
      "name": "UserNotClaimedYet",
      "msg": "User has not been claimed yet, user needs to be claimed in order to claim to his own wallet"
    },
    {
      "code": 6018,
      "name": "UserAlreadyClaimedToHisOwnWallet",
      "msg": "User has already been claimed to his own wallet"
    }
  ]
};