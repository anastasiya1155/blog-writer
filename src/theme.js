import { createTheme } from '@mui/material';
import { lightGreen, purple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      light: purple['A200'],
      main: purple['A400'],
      dark: purple['A700'],
    },
    secondary: {
      light: lightGreen['A200'],
      main: lightGreen['A400'],
      dark: lightGreen['A700'],
    },
  },
  typography: {
    fontFamily: ['Andika', 'sans-serif'].join(','),
    button: {
      fontFamily: ['Rubik Vinyl', 'sans-serif'].join(','),
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: [
    'none',
    '0px 2px 0px -1px rgba(0,0,0,0.2),0px 1px 0px 0px rgba(0,0,0,0.14),0px 1px 0px 0px rgba(0,0,0,0.12)',
    '0px 3px 0px -2px rgba(0,0,0,0.2),0px 2px 0px 0px rgba(0,0,0,0.14),0px 1px 0px 0px rgba(0,0,0,0.12)',
    '0px 3px 0px -2px rgba(0,0,0,0.2),0px 3px 0px 0px rgba(0,0,0,0.14),0px 1px 0px 0px rgba(0,0,0,0.12)',
    '0px 2px 0px -1px rgba(0,0,0,0.2),0px 4px 0px 2px rgba(0,0,0,0.14),0px 1px 0px 1px rgba(0,0,0,0.12)',
    '0px 3px 0px -1px rgba(0,0,0,0.2),0px 5px 0px 0px rgba(0,0,0,0.14),0px 1px 0px 0px rgba(0,0,0,0.12)',
    '0px 3px 0px -1px rgba(0,0,0,0.2),0px 6px 0px 0px rgba(0,0,0,0.14),0px 1px 0px 0px rgba(0,0,0,0.12)',
    '0px 4px 0px -2px rgba(0,0,0,0.2),0px 7px 0px 1px rgba(0,0,0,0.14),0px 2px 0px 1px rgba(0,0,0,0.12)',
    '0px 5px 0px -3px rgba(0,0,0,0.2),0px 8px 0px 1px rgba(0,0,0,0.14),0px 3px 0px 2px rgba(0,0,0,0.12)',
    '0px 5px 0px -3px rgba(0,0,0,0.2),0px 9px 0px 1px rgba(0,0,0,0.14),0px 3px 0px 2px rgba(0,0,0,0.12)',
    '0px 6px 0px -3px rgba(0,0,0,0.2),0px 10px 0px 1px rgba(0,0,0,0.14),0px 4px 0px 3px rgba(0,0,0,0.12)',
    '0px 6px 0px -4px rgba(0,0,0,0.2),0px 11px 0px 1px rgba(0,0,0,0.14),0px 4px 0px 3px rgba(0,0,0,0.12)',
    '0px 7px 0px -4px rgba(0,0,0,0.2),0px 12px 0px 2px rgba(0,0,0,0.14),0px 5px 0px 4px rgba(0,0,0,0.12)',
    '0px 7px 0px -4px rgba(0,0,0,0.2),0px 13px 0px 2px rgba(0,0,0,0.14),0px 5px 0px 4px rgba(0,0,0,0.12)',
    '0px 7px 0px -4px rgba(0,0,0,0.2),0px 14px 0px 2px rgba(0,0,0,0.14),0px 5px 0px 4px rgba(0,0,0,0.12)',
    '0px 8px 0px -5px rgba(0,0,0,0.2),0px 15px 0px 2px rgba(0,0,0,0.14),0px 6px 0px 5px rgba(0,0,0,0.12)',
    '0px 8px 0px -5px rgba(0,0,0,0.2),0px 16px 0px 2px rgba(0,0,0,0.14),0px 6px 0px 5px rgba(0,0,0,0.12)',
    '0px 8px 0px -5px rgba(0,0,0,0.2),0px 17px 0px 2px rgba(0,0,0,0.14),0px 6px 0px 5px rgba(0,0,0,0.12)',
    '0px 9px 0px -5px rgba(0,0,0,0.2),0px 18px 0px 2px rgba(0,0,0,0.14),0px 7px 0px 6px rgba(0,0,0,0.12)',
    '0px 9px 0px -6px rgba(0,0,0,0.2),0px 19px 0px 2px rgba(0,0,0,0.14),0px 7px 0px 6px rgba(0,0,0,0.12)',
    '0px 10px 0px -6px rgba(0,0,0,0.2),0px 20px 0px 3px rgba(0,0,0,0.14),0px 8px 0px 7px rgba(0,0,0,0.12)',
    '0px 10px 0px -6px rgba(0,0,0,0.2),0px 21px 0px 3px rgba(0,0,0,0.14),0px 8px 0px 7px rgba(0,0,0,0.12)',
    '0px 10px 0px -6px rgba(0,0,0,0.2),0px 22px 0px 3px rgba(0,0,0,0.14),0px 8px 0px 7px rgba(0,0,0,0.12)',
    '0px 11px 0px -7px rgba(0,0,0,0.2),0px 23px 0px 3px rgba(0,0,0,0.14),0px 9px 0px 8px rgba(0,0,0,0.12)',
    '0px 11px 0px -7px rgba(0,0,0,0.2),0px 24px 0px 3px rgba(0,0,0,0.14),0px 9px 0px 8px rgba(0,0,0,0.12)',
  ],
});
