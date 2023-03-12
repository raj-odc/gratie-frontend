import '@/styles/globals.css'
import '@/styles/wallet.css'
import '@/styles/form.css'

import { ThemeProvider } from '@mui/material/styles';

import localFont from 'next/font/local'
const myFont = localFont({ src: './../fonts/BookAntiquaFont.ttf' })

import theme from '../src/theme';

// import type { AppProps } from 'next/app'


import '@solana/wallet-adapter-react-ui/styles.css';
import '../styles/globals.css';

import { ConnectionConfig, clusterApiUrl } from '@solana/web3.js';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import type { AppProps } from 'next/app';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { createTheme } from '@mui/material';
import { ReactNode, useCallback, useMemo } from 'react';

const CLUSTER = WalletAdapterNetwork.Devnet;
const CONNECTION_CONFIG: ConnectionConfig = { commitment: 'processed' };
// const ENDPOINT = /*#__PURE__*/ clusterApiUrl(CLUSTER);
const ENDPOINT = 'http://localhost:8899';

// const theme = /*#__PURE__*/ createTheme();

function App({ children }: { children: ReactNode }) {
    const { enqueueSnackbar } = useSnackbar();
    const handleWalletError = useCallback(
        (e: WalletError) => {
            enqueueSnackbar(`${e.name}: ${e.message}`, { variant: 'error' });
        },
        [enqueueSnackbar],
    );
    const adapters = useMemo(
        () =>
            typeof window === 'undefined'
                ? [] // No wallet adapters when server-side rendering.
                : [
                      /**
                       * Note that you don't have to include the SolanaMobileWalletAdapter here;
                       * It will be added automatically when this app is running in a compatible mobile context.
                       */
                  ],
        [],
    );
    return (
      <main className={myFont.className}>
        <ThemeProvider theme={theme}>
          <ConnectionProvider config={CONNECTION_CONFIG} endpoint={ENDPOINT}>
                <WalletProvider autoConnect={true} onError={handleWalletError} wallets={adapters}>
                    <WalletModalProvider>{children}</WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
      </main>)
}

function ExampleMobileDApp({ Component, pageProps }: AppProps) {
    return (
        <SnackbarProvider autoHideDuration={10000}>
            <App>
                <Component {...pageProps} />
            </App>
        </SnackbarProvider>
    );
}

export default ExampleMobileDApp;

