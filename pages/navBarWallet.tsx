import { AppBar, Stack, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import AccountInfo from "@/src/components/AccountInfo";
import DisconnectButton from '@/src/components/DisconnectButton';
import type { NextPage } from 'next';
import { styled } from '@mui/material/styles';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

const Offset = styled('div')(
    // @ts-ignore
    ({ theme }) => theme.mixins.toolbar,
);

const ConnectButtonDynamic = dynamic(() => import('@/src/components/ConnectButton'), { ssr: false });

const Home: NextPage = () => {
    const { publicKey } = useWallet();
    const [memoText, setMemoText] = useState('');
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       <Image width={105} height={95} src='/images/Logo.png' alt={''}></Image>
                    </Typography>
                    {publicKey ? (
                        <div className='top-wallet-section'>
                          <AccountInfo publicKey={publicKey} />
                          <DisconnectButton color="error" variant="outlined">
                            Disconnect
                          </DisconnectButton>
                        </div>
                    ) : (
                      <div className='top-wallet-section'>
                        <ConnectButtonDynamic color="inherit" variant="outlined">
                            Connect
                        </ConnectButtonDynamic>
                      </div>
                    )}
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default Home;
