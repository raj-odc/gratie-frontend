import { Roboto } from 'next/font/google';


import localFont from 'next/font/local'
const myFont = localFont({ src: './../fonts/BookAntiquaFont.ttf' })


import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#00FF01',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: myFont,
  },
});

export default theme;
