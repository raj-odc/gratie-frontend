import '@/styles/globals.css'
import '@/styles/wallet.css'
import '@/styles/form.css'

import { ThemeProvider } from '@mui/material/styles';

import localFont from 'next/font/local'
const myFont = localFont({ src: './../fonts/BookAntiquaFont.ttf' })

import theme from '../src/theme';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <main className={myFont.className}>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </main>)
}
